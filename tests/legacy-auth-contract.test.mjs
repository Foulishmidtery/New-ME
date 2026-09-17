import assert from "node:assert/strict";
import test from "node:test";
import {
  LEGACY_AUTH_COOKIE_NAMES,
  LEGACY_SSO_COOKIE_LIFETIME_MS,
  buildLegacyLoginCookies,
  buildLegacyLogoutCookies,
  legacyApiLoginPayload,
  legacyLoginPayload,
} from "../src/server/compat/legacy-auth-contract.js";

const user = {
  id: 10,
  name: "CMS User",
  roles_id: 2,
  id_province: null,
  directorat_id: 4,
};

test("legacy local login keeps Old-BE response shape and host-only cookie attributes", () => {
  const result = { success: "true", user };
  assert.deepEqual(legacyLoginPayload(result), { success: "true" });

  const cookies = buildLegacyLoginCookies(result, { now: 0 });
  assert.equal(cookies.length, LEGACY_AUTH_COOKIE_NAMES.length);
  for (const cookie of cookies) {
    assert.match(cookie, /; Path=\/$/);
    assert.doesNotMatch(cookie, /Domain=/);
    assert.doesNotMatch(cookie, /Expires=/);
    assert.doesNotMatch(cookie, /HttpOnly/);
    assert.doesNotMatch(cookie, /SameSite=/);
    assert.doesNotMatch(cookie, /Secure/);
  }
  assert.ok(cookies.some((cookie) => cookie.startsWith("id_province=null;")));
});

test("legacy SSO login keeps 24-day expiry and cross-domain attributes", () => {
  const now = Date.UTC(2026, 8, 17, 0, 0, 0);
  const result = {
    success: true,
    callback: "https://frontend.example/dashboard",
    user,
  };

  assert.deepEqual(legacyApiLoginPayload(result), {
    success: true,
    callback: "https://frontend.example/dashboard",
  });

  const cookies = buildLegacyLoginCookies(result, { crossSite: true, now });
  const expectedExpiry = new Date(now + LEGACY_SSO_COOKIE_LIFETIME_MS).toUTCString();

  for (const cookie of cookies) {
    assert.match(cookie, /Domain=\.kneks\.go\.id/);
    assert.match(cookie, /Secure/);
    assert.match(cookie, /SameSite=None/);
    assert.match(cookie, new RegExp(`Expires=${expectedExpiry.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`));
    assert.doesNotMatch(cookie, /HttpOnly/);
    assert.doesNotMatch(cookie, /Max-Age=/);
  }
});

test("failed and superadmin compatibility responses do not emit auth cookies", () => {
  assert.deepEqual(buildLegacyLoginCookies({ success: "false" }), []);
  assert.deepEqual(buildLegacyLoginCookies({ success: "super" }), []);
  assert.deepEqual(legacyLoginPayload({ success: "super" }), { success: "super" });
});

test("logout clears host-only cookies locally and domain cookies for SSO", () => {
  const localCookies = buildLegacyLogoutCookies();
  const ssoCookies = buildLegacyLogoutCookies({ crossSite: true });

  assert.equal(localCookies.length, LEGACY_AUTH_COOKIE_NAMES.length);
  assert.equal(ssoCookies.length, LEGACY_AUTH_COOKIE_NAMES.length);

  for (const cookie of localCookies) {
    assert.match(cookie, /Expires=Thu, 01 Jan 1970 00:00:00 GMT/);
    assert.doesNotMatch(cookie, /Domain=/);
  }
  for (const cookie of ssoCookies) {
    assert.match(cookie, /Expires=Thu, 01 Jan 1970 00:00:00 GMT/);
    assert.match(cookie, /Domain=\.kneks\.go\.id/);
  }
});
