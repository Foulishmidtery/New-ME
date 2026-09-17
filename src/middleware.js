import { NextResponse } from "next/server";
import { evaluateCmsPathAccess } from "./server/auth/authorization.js";
import { extractLegacyCmsSession } from "./server/auth/session.js";

const trustedOrigins = new Set([
  "https://cms-demo.kneks.go.id",
  "https://demo.kneks.go.id",
  "https://cms-dev.kneks.go.id",
  "https://dev.kneks.go.id",
  "https://webdev.rifhandi.com",
  "https://metabase.kneks.go.id",
  "https://tes.kneks.go.id",
  "https://cms.kneks.go.id",
  "https://kneks.go.id",
  "https://www.kneks.go.id",
  "https://cms-kneks.palapacloud.id",
  "https://www.cms-kneks.palapacloud.id",
  "https://kneks.palapacloud.id",
  "https://www.kneks.palapacloud.id",
  "http://76.13.18.27",
  "http://76.13.18.27:10371",
  "http://10.106.0.42:14061",
  "http://10.106.0.42:4000",
  "http://10.106.0.40:21943",
  "http://10.106.0.43:10371",
  "http://10.106.0.45:13249",
]);

for (const origin of (process.env.CORS_ORIGINS || "").split(",")) {
  if (origin.trim()) trustedOrigins.add(origin.trim());
}

function isAllowedOrigin(origin) {
  if (!origin) return false;
  if (trustedOrigins.has(origin)) return true;
  return process.env.NODE_ENV !== "production" && /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
}

function applySecurityHeaders(response) {
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  response.headers.set("X-Permitted-Cross-Domain-Policies", "none");
  response.headers.set("Cross-Origin-Resource-Policy", "cross-origin");

  // CMS lama sengaja dapat di-embed. Jangan set DENY/SAMEORIGIN karena akan
  // mengubah alur dashboard yang dipasang pada host lain.
  response.headers.set("Content-Security-Policy", "frame-ancestors *");

  if (process.env.NODE_ENV === "production") {
    response.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  }
}

function applyCorsHeaders(request, response) {
  const origin = request.headers.get("origin");
  if (!isAllowedOrigin(origin)) return;

  response.headers.set("Access-Control-Allow-Origin", origin);
  response.headers.set("Access-Control-Allow-Credentials", "true");
  response.headers.set("Access-Control-Allow-Methods", "GET,HEAD,POST,OPTIONS,PUT,PATCH,DELETE");
  response.headers.set(
    "Access-Control-Allow-Headers",
    request.headers.get("access-control-request-headers") || "Content-Type, Authorization, X-Requested-With",
  );
  response.headers.append("Vary", "Origin");
}

function authorizeCmsPage(request) {
  const decision = evaluateCmsPathAccess(
    request.nextUrl.pathname,
    extractLegacyCmsSession(request),
  );

  if (!decision.protected || decision.allowed) return null;

  const location = decision.policy?.unauthorized?.location || "/";
  const status = decision.policy?.unauthorized?.status || 302;
  return NextResponse.redirect(new URL(location, request.url), status);
}

export function middleware(request) {
  const isPreflight = request.method === "OPTIONS";
  const response = isPreflight
    ? new NextResponse(null, { status: 204 })
    : authorizeCmsPage(request) || NextResponse.next();

  applySecurityHeaders(response);
  applyCorsHeaders(request, response);
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
