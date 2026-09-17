# Migration Progress — Old-BE → New-ME

Last updated: 2026-09-17

Compatibility baseline: `Foulishmidtery/Old-BE@0984f0182738303627dab16fbec60c948e926e01`

Latest substantive compatibility gate before this documentation-only commit: **run #139 — success** (`b98d4af2b36a6585fd61e8e8382c213abac63efb`).

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
| Hot Issue Subcategory CRUD | ✅ | ✅ | 🟡 | 🟡 | Five exact Old-BE routes are native; historical insert-path typo and raw `hot_category_id.split('-')` semantics are retained. |
| Hot Issue main CRUD | ❌ | ❌ | ❌ | ❌ | Upload-heavy: insert/update use `photo`, DB stores public upload URL, delete removes filesystem image. |
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

Current status:

```text
Source: ✅
CI: ✅
Runtime DB: 🟡
Browser: 🟡
```

## Hot Issue Subcategory DB-only CRUD

Native legacy routes are the exact locked Old-BE contract:

- `GET /hotissuesubcategory`
- `GET /detailhotissuesubcategory/:id`
- `POST /inserthotissubcategory`
- `POST /updatehotissuesubcategory`
- `GET /deletehotissuesubcategory/:id`

Important compatibility note: Old-BE really exposes the historical typo **`/inserthotissubcategory`**. New-ME does not silently add the corrected `/inserthotissuesubcategory` path.

Preserved behavior:

- source table `hot_subcategories`;
- no added list ordering;
- list empty result is HTTP 200 `{ "success": false }`;
- detail success remains an array; missing detail remains HTTP 200 `{ "success": false }`;
- insert fields are `title`, `title_en`, `hot_category_id`, with raw `hot_category_id.split('-')` producing `hot_category_id = hcid[0]` and `hot_category_name = hcid[1]`;
- update uses body `id` and the same raw split behavior;
- delete uses the path `id`;
- insert/update/delete redirect to `/hisc` with HTTP 302;
- compatibility mutation SQL intentionally uses no `RETURNING`;
- no multipart parser, upload, file deletion, filesystem write or external service behavior exists in this slice.

Native flow:

```text
legacy route
  → legacy-hotissue-subcategory.controller.js
  → hotissueService.legacySubcategory
  → legacy Hot Issue Subcategory methods in hotissue.repository.js
  → hot_subcategories
```

The generic adapter still contains the older Hot Issue routing block because the sibling `/hotissue` main domain remains upload-heavy. The five Subcategory request paths are nevertheless intercepted by the native controller before `handleLegacyApi`, so the adapter branch is inactive for these routes.

Current status:

```text
Source: ✅
CI: ✅
Runtime DB: 🟡
Browser: 🟡
```

CI run #138 initially failed only because the regression test searched the word `RETURNING` in a source comment that explicitly said the legacy SQL had no `RETURNING`. Executable SQL was already correct. The assertion was changed to inspect comment-stripped executable source; no production source change was needed. Run #139 then passed all syntax, regression, route-baseline and authorization-baseline checks.

## Hot Issue main audit

The main `/hotissue` CRUD is **not DB-only** and was not migrated in this task.

Locked Old-BE behavior includes:

- `POST /inserthotissue` → `hotissue_path.single("photo")`;
- insert constructs `site_url + "/uploads/hot_issue/" + req.file.filename` and stores that public URL in `hot_issues.image`;
- `POST /updatehotissue` also uses `hotissue_path.single("photo")` and has separate file/no-file SQL branches;
- `GET /deletehotissue/:id/:foto` accepts the filename in the path and performs filesystem deletion with `fs.existsSync` / `fs.unlink` before/alongside DB deletion;
- therefore its upload, replacement, public URL and delete semantics must be handled in the later route-specific upload-parity phase.

It must stay on legacy/fallback for now.

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
9. Hot Issue Subcategory CRUD
10. Institution reads
11. KBLI reference
12. KDEKS profile/reference reads
13. KDEKS province profile reads
14. Maps
15. Menu / Submenu settings
16. Negara reference
17. Pembuka reference
18. Peserta reference
19. Prioritas reference
20. Province
21. Roles lookup
22. Scopes
23. Social Media / Post Social Media
24. Tagging
25. Usia reference
26. Web Profile reads
27. Web Profile DB-only settings
28. Zona KHAS
29. remaining routes → `legacy-handler-adapter.js`

The fallback remains intentional until each remaining domain has its own parity gate and runtime-sensitive behavior is verified. Native routes are intercepted before fallback; keeping sibling fallback code present is currently a safety measure, not evidence that the native route is unused.

## Automated compatibility gate

`.github/workflows/compatibility-baseline.yml` currently validates:

- migrated source syntax with `node --check`;
- all registered Node contract/regression tests, including Hot Issue Category and Subcategory;
- locked Old-BE route compatibility via `compare-old-be-routes.mjs`;
- exact per-page role authorization compatibility via `compare-old-be-role-policies.mjs`.

Latest substantive migration result: **GitHub Actions run #139 — SUCCESS** at commit `b98d4af2b36a6585fd61e8e8382c213abac63efb`.

This is source/static/automated parity only. It does not replace real DB/browser testing.

## Upload boundary

Upload-heavy endpoints remain intentionally outside this phase. No global upload validator or new upload migration was introduced here.

Still excluded include the main Hot Issue CRUD, News upload, Files upload, Photo upload, Video upload, Institution `logo_member`, Structure, Directorate media uploads, KDEKS upload, banners/slideshow, Opini and other media/file mutations.

Before any future upload domain is changed, inventory each Old-BE route for:

`method → multipart field → single/multiple → filter/MIME behavior → destination → filename → DB URL/value → replacement → delete semantics → no-file behavior → errors → redirect`.

## Remaining blockers / next safe work

1. Recover the real New-ME `package.json` and lockfile from the actual development source; dependency reconstruction remains blocked until then.
2. Keep runtime DB/browser verification 🟡 for source/CI-complete DB-backed slices until a runnable environment exists.
3. Keep Institution `logo_member`, main Hot Issue, and all other upload-heavy mutations on fallback.
4. **Next exact target: Directorate Division (`devisi`) DB-only CRUD.** Locked Old-BE routes use plain DB handlers without multer/filesystem calls; list reads `devisi`, insert/update preserve raw `directorats_id.split('-')`, delete is DB-only, and mutations redirect to `/devision`. This candidate must still receive its own audit → implementation → regression → CI cycle before being marked migrated.

No domain above with 🟡 runtime status is considered fully production-complete yet.
