export const LEGACY_ROLE_COOKIE = "roles_id";

export function normalizeLegacyRole(value) {
  if (value === undefined || value === null) return null;
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : null;
}

/**
 * Old-BE page guards only read req.cookies.roles_id. Keep this intentionally
 * narrower than the login/session model so compatibility does not invent an
 * islogin/id requirement that the legacy page routes did not enforce.
 */
export function extractLegacyCmsSession(request) {
  const cookieValue = request?.cookies?.get?.(LEGACY_ROLE_COOKIE)?.value
    ?? readCookieHeader(request?.headers?.get?.("cookie"), LEGACY_ROLE_COOKIE);

  return Object.freeze({
    roleId: normalizeLegacyRole(cookieValue),
    rawRoleId: cookieValue ?? null,
  });
}

export function readCookieHeader(header, name) {
  if (!header || !name) return null;
  for (const part of String(header).split(";")) {
    const [rawName, ...rawValue] = part.trim().split("=");
    if (rawName !== name) continue;
    try {
      return decodeURIComponent(rawValue.join("="));
    } catch {
      return rawValue.join("=");
    }
  }
  return null;
}
