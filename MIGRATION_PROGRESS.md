# Migration Progress — Old-BE → New-ME

Last updated: 2026-09-17

Compatibility baseline: `Foulishmidtery/Old-BE@0984f0182738303627dab16fbec60c948e926e01`

Latest verified compatibility workflow: **run #75 — success** (`8ff3e2717cf76d907e5cf40ef819c923ae958d3f`).

## Status model

A migrated domain is tracked separately at four levels:

- **Source migration** — native controller/service/repository compatibility path exists.
- **CI contract** — syntax, regression/contract tests and baseline comparisons are green.
- **Runtime DB parity** — real database request/side-effect parity against Old-BE.
- **Browser/frontend parity** — production-style browser/session/frontend behavior.

Source/CI completion does not imply runtime completion.

## Current status

| Area | Source migration | CI contract | Runtime DB parity | Browser/frontend parity | Notes |
| --- | --- | --- | --- | --- | --- |
| Dependency reproducibility | 🔴 Blocked | 🔴 Blocked | — | — | Real `package.json` / lockfile are not tracked. Do not reconstruct versions by guessing. |
| Old-BE baseline lock | ✅ | ✅ | — | — | `migration/old-be-baseline.json` locks the reference commit. |
| Route baseline checker | ✅ | ✅ | — | — | `scripts/compare-old-be-routes.mjs` compares Old-BE routes with the New-ME manifest. |
| CMS per-page authorization | ✅ | ✅ | — | 🟡 | Policy is extracted from Old-BE `roles_id` guards; live browser cookie/navigation parity still required. |
| Auth / local cookies | ✅ | ✅ | 🟡 | 🟡 | Legacy response/cookie contract is native; real DB/browser login still required. |
| SSO expiry / cross-domain logout | ✅ | ✅ | — | 🟡 | 24-day expiry and `.kneks.go.id` cookie clearing restored; browser verification required. |
| `/storage/*` compatibility | ✅ | ✅ | — | 🟡 | Old aliases restored; live file delivery/cache/range behavior still requires runnable app. |
| Data Menu | ✅ | ✅ | 🟡 | 🟡 | Legacy behavior separated from additive modern API. |
| Agenda | ✅ | ✅ | 🟡 | 🟡 | Native compatibility includes graph/search/timestamp quirks. |
| Province | ✅ | ✅ | 🟡 | 🟡 | Native compatibility path active. |
| Tagging | ✅ | ✅ | 🟡 | 🟡 | Native compatibility path active. |
| Zona KHAS | ✅ | ✅ | 🟡 | 🟡 | Dedicated repository/service preserves ordering/nested/date semantics. |
| Contacts / Questbook | ✅ | ✅ | 🟡 | 🟡 | Native compatibility path active. |
| Maps | ✅ | ✅ | 🟡 | 🟡 | Native compatibility path active. |
| Social Media / Post Social Media | ✅ | ✅ | 🟡 | 🟡 | Native compatibility path active. |
| Scopes | ✅ | ✅ | 🟡 | 🟡 | Historical Old-BE update quirk retained on legacy path. |
| About / Ekonomi Syariah reads | ✅ | ✅ | 🟡 | 🟡 | Four read-only endpoints are native; upload mutations intentionally remain fallback. |
| KDEKS profile/reference reads | ✅ | ✅ | 🟡 | 🟡 | About/History/Maps static read slice is native; province-specific and mutation endpoints remain separate. |
| Web Profile reads | ✅ | ✅ | 🟡 | 🟡 | `/api_web_profile` and detail route are native. |
| Web Profile settings mutations | ✅ | ✅ | 🟡 | 🟡 | title/logo/header/color DB-only POST routes are native; no filesystem behavior involved. |
| Menu / Submenu settings | ✅ | ✅ | 🟡 | 🟡 | Read/detail/insert/update routes are native; raw `menu_id.split('-')` behavior retained. |
| Route-specific upload parity | ❌ | ❌ | ❌ | ❌ | Must inventory each multipart route before migration. |
| Legacy `.cjs` fallback | ⚠️ Active | ✅ covered as fallback | 🟡 | 🟡 | Still required for unmigrated domains, especially upload-heavy/security-sensitive flows. |

## CMS authorization

Authorization is no longer a generic `/cms` guard.

Implemented structure:

- `src/config/role-policies.js` — per-page policy keyed by legacy page/view key.
- `src/server/auth/session.js` — extracts the exact Old-BE page-guard cookie, `roles_id`.
- `src/server/auth/authorization.js` — maps migrated CMS paths to page-specific policies.
- `src/middleware.js` — applies the policy and returns the Old-BE-compatible **302 redirect to `/`** when denied.
- `scripts/compare-old-be-role-policies.mjs` — parses the locked Old-BE `app.js` and rejects missing, extra or widened page policies.
- `tests/cms-authorization.test.mjs` — covers anonymous, invalid cookie, allowed/denied roles, dynamic routes and pages with different role matrices.

Important compatibility rule retained: Old-BE page guards check `req.cookies.roles_id`; New-ME does not invent a new `islogin` requirement for those page routes.

## Native compatibility dispatch

`src/app/[...legacy]/route.js` currently dispatches native compatibility handlers before `legacy-handler-adapter.js`, including:

1. Auth
2. About / Ekonomi Syariah read-only
3. Agenda
4. Contacts / Questbook
5. Data Menu
6. KDEKS profile/reference read-only
7. Maps
8. Menu / Submenu settings
9. Province
10. Scopes
11. Social Media / Post Social Media
12. Tagging
13. Web Profile reads
14. Web Profile DB-only settings
15. Zona KHAS
16. remaining routes → `legacy-handler-adapter.js`

The fallback remains intentional until each remaining domain has its own parity gate.

## Latest Profile/reference extraction

### About / Ekonomi Syariah read-only

Native routes:

- `GET /es_abouts`
- `GET /es_detailabouts/:id`
- `GET /abouts`
- `GET /detailabouts/:id`

Preserved:

- exact `web_identity` filters;
- detail query by `id`;
- HTTP 200 with `{ "success": false }` when empty.

Not migrated in this slice:

- `POST /es_updateabout`
- `POST /updateabout`
- destructive KDEKS about mutations

These stay on fallback because upload/destructive contracts must be audited separately.

### KDEKS profile/reference reads

Native routes:

- `GET /api_kdeks_list`
- `GET /api_about_kdeks`
- `GET /api_history_kdeks`
- `GET /api_maps_kdeks`

Preserved:

- KDEKS `web_identity` + `tag` filters;
- array response for About/History, including empty arrays;
- map JOIN/shape through the existing Abouts service;
- map error response `{ success:false, message:"Terjadi kesalahan server" }` with HTTP 500.

Province-specific KDEKS About/History endpoints remain a separate future slice because their response shaping differs.

### Web Profile

Native read routes:

- `GET /api_web_profile`
- `GET /api_detail_webprofile/:id`

Native DB-only mutation routes:

- `POST /updatewebtitle` → `/titleweb`
- `POST /updateweblogo` → `/logo`
- `POST /updatewebheader` → `/header`
- `POST /updatewebcolor` → `/color`

The legacy SQL field names, request body names and 302 redirects are retained without adding validation or `RETURNING` behavior.

### Menu / Submenu settings

Native routes:

- `GET /api_menu`
- `GET /api_menu_detail/:id`
- `GET /api_submenu`
- `GET /api_submenu_detail/:id`
- `POST /insertmenu`
- `POST /updatemenu`
- `POST /insertsubmenu`
- `POST /updatesubmenu`

The Old-BE `menu_id.split('-')` behavior is preserved directly. It is intentionally not normalized/coerced on the legacy path.

## Automated compatibility gate

`.github/workflows/compatibility-baseline.yml` currently validates:

- migrated source syntax with `node --check`;
- all registered Node contract/regression tests;
- locked Old-BE route compatibility via `compare-old-be-routes.mjs`;
- exact per-page role authorization compatibility via `compare-old-be-role-policies.mjs`.

Latest verified result: **GitHub Actions run #75 — SUCCESS**.

This is source/static/automated parity only. It does not replace real DB/browser testing.

## Upload boundary

Upload-heavy endpoints are intentionally not migrated by applying one global policy. Before the next upload domain is changed, inventory each Old-BE route for:

`method → multipart field → single/multiple → filter/MIME behavior → destination → filename → DB URL/value → replacement → delete semantics → no-file behavior → errors → redirect`.

Likely domains include News, Files, Photo, Structure, KDEKS, Directorate, Banners, Institutions, Opini and slider/media routes.

## Remaining blockers / next safe work

1. Recover the real New-ME `package.json` and lockfile from the actual development source; keep dependency reconstruction blocked until then.
2. Continue non-upload extraction one domain at a time. The next low-risk target is the **province-specific KDEKS profile/reference read slice** (`/api_history_province_kdeks/:id`, `/api_about_province_kdeks/:id`) after auditing its exact output shape.
3. Keep Users/security-sensitive mutation flows later than reference/content reads.
4. Build per-route upload inventory before touching any upload-heavy endpoint.
5. When a runnable dependency manifest + dev DB/browser environment are available, execute runtime golden-master comparisons for all source/CI-complete domains.

No domain above with 🟡 runtime status is considered fully production-complete yet.
