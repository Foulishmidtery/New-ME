import { legacyPages } from "../../config/legacy-pages.js";
import { legacyPageRolePolicies } from "../../config/role-policies.js";

const routePolicies = buildRoutePolicies();

export function getLegacyPagePolicy(pageKey) {
  return legacyPageRolePolicies[pageKey] ?? null;
}

export function evaluateLegacyPageAccess(pageKey, session) {
  const policy = getLegacyPagePolicy(pageKey);
  if (!policy) {
    return Object.freeze({ protected: false, allowed: true, pageKey, policy: null });
  }

  const allowed = session?.roleId !== null
    && session?.roleId !== undefined
    && policy.allowedRoles.includes(session.roleId);

  return Object.freeze({
    protected: true,
    allowed,
    pageKey,
    policy,
    roleId: session?.roleId ?? null,
  });
}

export function findCmsPagePolicy(pathname) {
  const normalized = normalizePathname(pathname);
  for (const entry of routePolicies) {
    if (entry.matcher.test(normalized)) return entry;
  }
  return null;
}

export function evaluateCmsPathAccess(pathname, session) {
  const routePolicy = findCmsPagePolicy(pathname);
  if (!routePolicy) {
    return Object.freeze({ protected: false, allowed: true, pageKey: null, policy: null });
  }

  const decision = evaluateLegacyPageAccess(routePolicy.pageKey, session);
  return Object.freeze({ ...decision, cmsRoute: routePolicy.cmsRoute });
}

export function cmsRouteForPageKey(pageKey) {
  const definition = legacyPages[pageKey];
  if (!definition?.route) return null;
  const route = definition.route === "/" ? "" : definition.route;
  return normalizePathname(`/cms${route}`);
}

function buildRoutePolicies() {
  const entries = [];
  for (const [pageKey, policy] of Object.entries(legacyPageRolePolicies)) {
    const cmsRoute = cmsRouteForPageKey(pageKey);
    if (!cmsRoute) continue;
    entries.push(Object.freeze({
      pageKey,
      policy,
      cmsRoute,
      matcher: compileRoute(cmsRoute),
    }));
  }

  // Static routes first, then the more generic dynamic patterns.
  return Object.freeze(entries.sort((a, b) => routeSpecificity(b.cmsRoute) - routeSpecificity(a.cmsRoute)));
}

function compileRoute(route) {
  const segments = normalizePathname(route).split("/").filter(Boolean);
  const pattern = segments.map((segment) => {
    if (/^\[\.\.\.[^\]]+\]$/.test(segment)) return ".+";
    if (/^\[\[\.\.\.[^\]]+\]\]$/.test(segment)) return ".*";
    if (/^\[[^\]]+\]$/.test(segment)) return "[^/]+";
    return escapeRegex(segment);
  }).join("/");
  return new RegExp(`^/${pattern}/?$`);
}

function routeSpecificity(route) {
  return normalizePathname(route)
    .split("/")
    .filter(Boolean)
    .reduce((score, segment) => score + (segment.startsWith("[") ? 1 : 10), 0);
}

function normalizePathname(pathname) {
  const raw = typeof pathname === "string" && pathname ? pathname : "/";
  const withSlash = raw.startsWith("/") ? raw : `/${raw}`;
  return withSlash.length > 1 ? withSlash.replace(/\/+$/, "") : withSlash;
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
