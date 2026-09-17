import { matchLegacyRoute } from "@/server/legacy-route-manifest";
import { authService } from "@/server/services/auth.service";
import {
  buildLegacyLoginCookies,
  buildLegacyLogoutCookies,
  legacyApiLoginPayload,
  legacyLoginPayload,
} from "@/server/compat/legacy-auth-contract";

const AUTH_HANDLERS = new Set([
  "do_login",
  "api_login",
  "user_register",
  "do_logout",
  "api_logout",
  "analitics",
]);

export async function handleLegacyAuth(request) {
  const url = new URL(request.url);
  const route = matchLegacyRoute(request.method, url.pathname);
  if (!route || !AUTH_HANDLERS.has(route.handler)) return null;

  if (route.handler === "do_logout") {
    return redirectWithClearedAuthCookies(new URL("/", request.url), { crossSite: false });
  }

  if (route.handler === "api_logout") {
    const origin = process.env.SSO_LOGOUT_ORIGIN || "https://sso-dev.kneks.go.id";
    return redirectWithClearedAuthCookies(new URL("/login", origin), { crossSite: true });
  }

  if (route.handler === "analitics") {
    const cookies = parseCookies(request.headers.get("cookie"));
    return Response.json(await authService.getAnalytics(cookies.id));
  }

  const body = await readAuthBody(request);

  if (route.handler === "user_register") {
    return Response.json(await authService.register(body));
  }

  if (route.handler === "do_login") {
    const result = await authService.login(body.email, body.password);
    return jsonWithAuthCookies(legacyLoginPayload(result), buildLegacyLoginCookies(result));
  }

  const result = await authService.apiLogin(body.email, body.url || "");
  return jsonWithAuthCookies(
    legacyApiLoginPayload(result),
    buildLegacyLoginCookies(result, { crossSite: true }),
  );
}

function jsonWithAuthCookies(payload, cookies) {
  const headers = new Headers();
  cookies.forEach((cookie) => headers.append("Set-Cookie", cookie));
  return Response.json(payload, { status: 200, headers });
}

function redirectWithClearedAuthCookies(location, options) {
  const headers = new Headers({ Location: location.toString() });
  buildLegacyLogoutCookies(options).forEach((cookie) => headers.append("Set-Cookie", cookie));
  return new Response(null, { status: 302, headers });
}

async function readAuthBody(request) {
  const contentType = request.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    try {
      return await request.json();
    } catch {
      return {};
    }
  }

  if (contentType.includes("application/x-www-form-urlencoded")) {
    return Object.fromEntries(new URLSearchParams(await request.text()));
  }

  if (contentType.includes("multipart/form-data")) {
    const formData = await request.formData();
    return Object.fromEntries(
      [...formData.entries()].filter(([, value]) => typeof value === "string"),
    );
  }

  return {};
}

function parseCookies(header) {
  if (!header) return {};
  return Object.fromEntries(
    header.split(";").map((cookie) => {
      const [name, ...value] = cookie.trim().split("=");
      return [name, decodeURIComponent(value.join("="))];
    }),
  );
}
