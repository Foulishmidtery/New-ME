# Migration Progress — Old-BE → New-ME

Last updated: 2026-09-17

Compatibility baseline: `Foulishmidtery/Old-BE@0984f0182738303627dab16fbec60c948e926e01`

Latest verified compatibility workflow: **run #131 — success** (`8014b3d120d6c9262b88c4718a4aabaea2e72cae`).

## Status model

A migrated domain is tracked separately at four levels:

- **Source migration** — native controller/service/repository or static compatibility path exists.
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
| KDEKS About / History / Maps reads | ✅ | ✅ | 🟡 | 🟡 | Native read slice active. |
| KDEKS province About / History reads | ✅ | ✅ | 🟡 | 🟡 | Province-specific response shapes are gated separately. |
| Web Profile reads | ✅ | ✅ | 🟡 | 🟡 | `/api_web_profile` and detail route are native. |
| Web Profile settings mutations | ✅ | ✅ | 🟡 | 🟡 | Title/logo/header/color DB-only POST routes are native; no filesystem behavior involved. |
| Menu / Submenu settings | ✅ | ✅ | 🟡 | 🟡 | Read/detail/insert/update routes are native; raw `menu_id.split('-')` behavior retained. |
| Institution read-only | ✅ | ✅ | 🟡 | 🟡 | List/detail are native and gated; `logo_member` insert/update/delete filesystem flow remains fallback. |
| KBLI reference | ✅ | ✅ | — | 🟡 | `GET /kbli` serves the locked static JSON contract with exact ordering/types. |
| Peserta reference | ✅ | ✅ | — | 🟡 | `GET /peserta` serves the locked static JSON contract. |
| Area reference | ✅ | ✅ | — | 🟡 | `GET /area` serves the locked static JSON contract. |
| Gender reference | ✅ | ✅ | — | 🟡 | `GET /gender` serves the locked static JSON contract. |
| Negara reference | ✅ | ✅ | — | 🟡 | `GET /negara` serves the locked static JSON contract. |
| Pembuka reference | ✅ | ✅ | — | 🟡 | `GET /pembuka` serves the locked static JSON contract. |
| Prioritas reference | ✅ | ✅ | — | 🟡 | `GET /prioritas` serves the locked static JSON contract. |
| Usia reference | ✅ | ✅ | — | 🟡 | `GET /usia` preserves ordering and repeated legacy IDs exactly. |
| Roles lookup | ✅ | ✅ | 🟡 | 🟡 | `GET /roles` now uses a dedicated repository/service/controller with `SELECT * FROM roles`. |
| Hot Issue Category CRUD | ✅ | ✅ | 🟡 | 🟡 | Five legacy category routes are native; no upload/filesystem side effect exists in this slice. |
| Route-specific upload parity | ❌ | ❌ | ❌ | ❌ | Must inventory each multipart route before migration. |
| Legacy `.cjs` / adapter fallback | ⚠️ Active | ✅ covered as fallback | 🟡 | 🟡 | Still required for unmigrated domains, especially upload-heavy/security-sensitive flows. Native routes dispatch before this fallback. |

## Institution boundary

Native read-only routes:

- list Institution route from the locked Old-BE manifest;
- Institution detail route from the locked Old-BE manifest.

Preserved by CI:

- Old-BE list SQL/order semantics;
- detail array shape;
- empty-result behavior;
- HTTP 200 behavior;
- field/type source boundary.

Not migrated:

- insert Institution;
- update Institution;
- delete behavior with filesystem consequences;
- any `logo_member` upload/replacement/delete flow.

Current status:

```text
Source: ✅
CI: ✅
Runtime DB: 🟡
Browser: 🟡
Upload mutation: legacy/fallback
```

## Reference/read-only extraction

The safe reference group requested for this phase is now source/CI complete:

- `GET /kbli`
- `GET /peserta`
- `GET /area`
- `GET /gender`
- `GET /negara`
- `GET /pembuka`
- `GET /prioritas`
- `GET /usia`
- `GET /roles`

The eight static JSON routes use dedicated compatibility controllers and the exact JSON already copied from the locked Old-BE baseline. Their tests lock ordering, field names, field types and important historical quirks. In particular, `/usia` intentionally preserves the repeated `1,2,3` IDs rather than normalizing them.

`GET /roles` uses:

```sql
SELECT * FROM roles
```

No filtering or ordering was added. Empty result remains HTTP 200 with `{ "success": false }`.

Runtime DB remains 🟡 for `/roles`; the static JSON references do not require DB parity, but browser/runnable-app verification remains 🟡.

## Hot Issue Category DB-only CRUD

This task migrated exactly one low/medium-risk CRUD after the reference/read-only audit completed.

Native legacy routes:

- `GET /hotissuecategory`
- `GET /detailhotissuecategory/:id`
- `POST /inserthotissuecategory`
- `POST /updatehotissuecategory`
- `GET /deletehotissuecategory/:id`

Old-BE behavior retained:

- source table: `hot_categories`;
- list has no added `ORDER BY`;
- fields remain `title` and `title_en` for insert/update;
- update ID remains body `id`;
- delete ID remains path parameter;
- list/detail empty result remains HTTP 200 `{ "success": false }`;
- detail success remains an array containing the row;
- insert/update/delete redirect to `/hic` with HTTP 302;
- no auth/cookie requirement was added to these API routes;
- no upload, file write, file delete or filesystem behavior was introduced.

Implementation uses the existing HTTP-independent `hotissueService` and `hotissueRepository`, with a dedicated thin compatibility controller in `src/server/controllers/legacy-hotissue-category.controller.js`.

`/hotissuesubcategory` and `/hotissue` media/content routes were intentionally not taken over by this controller.

Current status:

```text
Source: ✅
CI: ✅
Runtime DB: 🟡
Browser: 🟡
```

CI run #130 initially failed because a negative test regex matched the valid string `inserthotissuecategory`. That was a test false-negative, not a source regression. The assertion was narrowed to exact sibling route boundaries; run #131 then passed without changing the controller or SQL implementation.

## Native compatibility dispatch

`src/app/[...legacy]/route.js` dispatches native compatibility handlers before `legacy-handler-adapter.js`, including:

1. Auth
2. About / Ekonomi Syariah reads
3. Agenda
4. Area reference
5. Contacts / Questbook
6. Data Menu
7. Gender reference
8. Hot Issue Category CRUD
9. Institution reads
10. KBLI reference
11. KDEKS profile/reference reads
12. KDEKS province profile reads
13. Maps
14. Menu / Submenu settings
15. Negara reference
16. Pembuka reference
17. Peserta reference
18. Prioritas reference
19. Province
20. Roles lookup
21. Scopes
22. Social Media / Post Social Media
23. Tagging
24. Usia reference
25. Web Profile reads
26. Web Profile DB-only settings
27. Zona KHAS
28. remaining routes → `legacy-handler-adapter.js`

The fallback remains intentional until each remaining domain has its own parity gate and runtime-sensitive behavior is verified. Native routes are intercepted before fallback; keeping the fallback code present is currently a safety measure, not evidence that the native route is unused.

## Automated compatibility gate

`.github/workflows/compatibility-baseline.yml` currently validates:

- migrated source syntax with `node --check`;
- all registered Node contract/regression tests;
- locked Old-BE route compatibility via `compare-old-be-routes.mjs`;
- exact per-page role authorization compatibility via `compare-old-be-role-policies.mjs`.

Latest verified result: **GitHub Actions run #131 — SUCCESS** at commit `8014b3d120d6c9262b88c4718a4aabaea2e72cae`.

This is source/static/automated parity only. It does not replace real DB/browser testing.

## Upload boundary

Upload-heavy endpoints remain intentionally outside this phase. No global upload validator or new upload migration was introduced here.

Still excluded include News upload, Files upload, Photo upload, Video upload, Institution `logo_member`, Structure, Directorate, KDEKS upload, banners/slideshow, Opini and other media/file mutations.

Before any future upload domain is changed, inventory each Old-BE route for:

`method → multipart field → single/multiple → filter/MIME behavior → destination → filename → DB URL/value → replacement → delete semantics → no-file behavior → errors → redirect`.

## Remaining blockers / next safe work

1. Recover the real New-ME `package.json` and lockfile from the actual development source; dependency reconstruction remains blocked until then.
2. Keep runtime DB/browser verification 🟡 for source/CI-complete DB-backed slices until a runnable environment exists.
3. Keep Institution `logo_member` and all other upload-heavy mutations on fallback.
4. After this task, the next exact non-upload candidate should be audited from current Old-BE/New-ME source before implementation; do not infer safety from the domain name alone.

No domain above with 🟡 runtime status is considered fully production-complete yet.
