import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { legacyPages } from "../src/config/legacy-pages.js";
import { legacyPageRolePolicies } from "../src/config/role-policies.js";
import {
  cmsRouteForPageKey,
  evaluateCmsPathAccess,
  evaluateLegacyPageAccess,
  findCmsPagePolicy,
} from "../src/server/auth/authorization.js";
import {
  extractLegacyCmsSession,
  normalizeLegacyRole,
} from "../src/server/auth/session.js";

function session(roleId) {
  return { roleId, rawRoleId: roleId == null ? null : String(roleId) };
}

test("every configured protected page exists in migrated legacy metadata", () => {
  for (const pageKey of Object.keys(legacyPageRolePolicies)) {
    assert.ok(legacyPages[pageKey], `missing migrated page metadata for ${pageKey}`);
    assert.equal(legacyPages[pageKey].source, `${pageKey}.html`, `source mismatch for ${pageKey}`);
    assert.ok(cmsRouteForPageKey(pageKey)?.startsWith("/cms"), `missing CMS route for ${pageKey}`);
  }
});

test("anonymous, missing, and invalid roles_id are denied on protected pages", () => {
  for (const roleId of [null, undefined, Number.NaN]) {
    const decision = evaluateLegacyPageAccess("agenda/list", session(roleId));
    assert.equal(decision.protected, true);
    assert.equal(decision.allowed, false);
    assert.equal(decision.policy.unauthorized.status, 302);
    assert.equal(decision.policy.unauthorized.location, "/");
  }
  assert.equal(normalizeLegacyRole("invalid"), null);
});

test("legacy loose numeric cookie behavior is retained without widening roles", () => {
  assert.equal(normalizeLegacyRole("01"), 1);
  assert.equal(normalizeLegacyRole(" 1 "), 1);
  assert.equal(normalizeLegacyRole("1x"), null);
  assert.equal(evaluateLegacyPageAccess("user_management/users/list", session(1)).allowed, true);
  assert.equal(evaluateLegacyPageAccess("user_management/users/list", session(2)).allowed, false);
});

test("different pages keep different Old-BE role matrices", () => {
  assert.equal(evaluateLegacyPageAccess("tagging/list", session(4)).allowed, true);
  assert.equal(evaluateLegacyPageAccess("tagging/add", session(4)).allowed, false);
  assert.equal(evaluateLegacyPageAccess("opini/opini", session(7)).allowed, true);
  assert.equal(evaluateLegacyPageAccess("agenda/list", session(7)).allowed, false);
  assert.equal(evaluateLegacyPageAccess("directorat/list", session(3)).allowed, true);
  assert.equal(evaluateLegacyPageAccess("directorat/add", session(3)).allowed, false);
});

test("all actual Old-BE roles relevant to Agenda are preserved", () => {
  for (const roleId of [1, 2, 3, 4, 6]) {
    assert.equal(evaluateLegacyPageAccess("agenda/list", session(roleId)).allowed, true, `Agenda denied role ${roleId}`);
  }
  for (const roleId of [5, 7, 8, 0]) {
    assert.equal(evaluateLegacyPageAccess("agenda/list", session(roleId)).allowed, false, `Agenda widened to role ${roleId}`);
  }
});

test("dynamic New-ME CMS paths resolve to the correct page policy", () => {
  const editRoute = cmsRouteForPageKey("agenda/edit");
  assert.ok(editRoute.includes("[id]"));
  const concrete = editRoute.replace("[id]", "123");
  assert.equal(findCmsPagePolicy(concrete)?.pageKey, "agenda/edit");
  assert.equal(evaluateCmsPathAccess(concrete, session(6)).allowed, true);
  assert.equal(evaluateCmsPathAccess(concrete, session(7)).allowed, false);
});

test("unprotected CMS shell page remains unmodified when Old-BE had no role guard", () => {
  const decision = evaluateCmsPathAccess("/cms/dashboard", session(null));
  assert.equal(decision.protected, false);
  assert.equal(decision.allowed, true);
});

test("session extraction reads only the Old-BE roles_id page-guard cookie", () => {
  const request = {
    cookies: { get: (name) => name === "roles_id" ? { value: "4" } : undefined },
    headers: { get: () => "islogin=true; id=99; roles_id=2" },
  };
  assert.deepEqual(extractLegacyCmsSession(request), { roleId: 4, rawRoleId: "4" });

  const headerOnly = {
    headers: { get: (name) => name === "cookie" ? "islogin=true; roles_id=6; id=99" : null },
  };
  assert.deepEqual(extractLegacyCmsSession(headerOnly), { roleId: 6, rawRoleId: "6" });
});

test("middleware keeps explicit 302 legacy redirect semantics", () => {
  const middleware = fs.readFileSync(path.join(process.cwd(), "src/middleware.js"), "utf8");
  assert.match(middleware, /NextResponse\.redirect\(new URL\(location, request\.url\), status\)/);
  assert.match(middleware, /status = decision\.policy\?\.unauthorized\?\.status \|\| 302/);
});
