export const LEGACY_AUTH_COOKIE_NAMES = [
  "islogin",
  "id",
  "name",
  "roles_id",
  "id_province",
  "directorat_id",
];

export const LEGACY_SSO_COOKIE_DOMAIN = ".kneks.go.id";
export const LEGACY_SSO_COOKIE_LIFETIME_MS = 86_400_000 * 24;

function serializeCookie(name, value, options = {}) {
  const parts = [`${name}=${encodeURIComponent(String(value))}`];
  parts.push(`Path=${options.path || "/"}`);

  if (options.domain) parts.push(`Domain=${options.domain}`);
  if (options.expires) parts.push(`Expires=${new Date(options.expires).toUTCString()}`);
  if (options.secure) parts.push("Secure");
  if (options.httpOnly) parts.push("HttpOnly");
  if (options.sameSite) parts.push(`SameSite=${options.sameSite}`);

  return parts.join("; ");
}

export function isSuccessfulAuth(result) {
  return result?.success === "true" || result?.success === true;
}

export function legacyLoginPayload(result) {
  return { success: result?.success };
}

export function legacyApiLoginPayload(result) {
  return {
    success: result?.success,
    callback: result?.callback,
  };
}

export function buildLegacyLoginCookies(result, { crossSite = false, now = Date.now() } = {}) {
  if (!isSuccessfulAuth(result) || !result?.user) return [];

  const user = result.user;
  const values = {
    islogin: true,
    id: user.id,
    name: user.name,
    roles_id: user.roles_id,
    id_province: user.id_province,
    directorat_id: user.directorat_id,
  };

  const options = crossSite
    ? {
        domain: LEGACY_SSO_COOKIE_DOMAIN,
        expires: new Date(now + LEGACY_SSO_COOKIE_LIFETIME_MS),
        secure: true,
        sameSite: "None",
      }
    : {};

  return Object.entries(values).map(([name, value]) => serializeCookie(name, value, options));
}

export function buildLegacyLogoutCookies({ crossSite = false } = {}) {
  const options = {
    expires: new Date(1),
    ...(crossSite ? { domain: LEGACY_SSO_COOKIE_DOMAIN } : {}),
  };

  return LEGACY_AUTH_COOKIE_NAMES.map((name) => serializeCookie(name, "", options));
}
