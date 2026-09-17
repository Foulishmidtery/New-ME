# Migration Progress — Old-BE → New-ME

Last updated: 2026-09-18

Compatibility baseline: `Foulishmidtery/Old-BE@0984f0182738303627dab16fbec60c948e926e01`

Latest substantive compatibility gate: **run #161 — success** (`8fabc6a32e2d1ca06aee7a2017e6d9c37f9f39db`).

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
| Directorate Division (`devisi`) CRUD | ✅ | ✅ | 🟡 | 🟡 | Five legacy Division routes are native; legacy SQL is isolated from modern `RETURNING` methods and raw `directorats_id.split('-')` is retained. |
| News Category CRUD | ✅ | ✅ | 🟡 | 🟡 | Five exact category routes are native; legacy SQL uses `news_categories`, preserves `{success:false}` empty behavior, and remains isolated from main News upload logic. |
| News category/date read-filter | ✅ | ✅ | 🟡 | 🟡 | `/news_category/cat/:id` and `/news/search/:date` are native with their different Old-BE empty-result and ordering semantics preserved. |
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

## Directorate Division (`devisi`) DB-only CRUD

Native legacy routes:

- `GET /directorat_devisi`
- `POST /directorats_devisi_add`
- `GET /directorats_devisi_detail/:id`
- `GET /division_delete/:id`
- `POST /directorats_devisi_edit`

Locked Old-BE behavior retained:

- source table `devisi`;
- list SQL remains `SELECT * FROM devisi` with no `ORDER BY`;
- list empty result remains HTTP 200 `[]`;
- detail ID comes from the path and response remains the raw rows array, including `[]` when no row matches;
- insert/update preserve raw `directorats_id.split('-')`;
- `bbb[0]` remains `directorats_id` and `bbb[1]` remains `directorats_name`;
- insert field order remains `title`, `title_en`, `description`, `description_en`, `directorats_id`, `directorats_name`;
- update keeps Old-BE field ordering and takes the update ID from body `id`;
- delete remains `GET /division_delete/:id` and uses the path ID;
- insert/update/delete redirect to `/devision` with HTTP 302;
- compatibility mutation SQL intentionally has no `RETURNING`;
- no cookie/role requirement was added to the API routes;
- no multipart parser, upload, file write/delete, public upload URL or external service exists in this slice.

Native flow:

```text
legacy route
  → legacy-directorate-division.controller.js
  → directoratService.legacyDivision
  → legacy Division methods in directorat.repository.js
  → devisi
```

The modern Division methods (`getDevisi`, `getDevisiById`, `createDevisi`, `updateDevisi`, `deleteDevisi`) remain separate and retain their existing modern `RETURNING` semantics. The compatibility migration did not rewrite them.

The five Division paths are intercepted in `src/app/[...legacy]/route.js` before `handleLegacyApi`; the generic Directorate fallback remains available for Directorate main/media routes that are outside this DB-only slice.

Current status:

```text
Source: ✅
CI: ✅
Runtime DB: 🟡
Browser: 🟡
```

Compatibility gate: **run #146 — SUCCESS** at commit `44ef62b9eaac914e88d4c5923053d18bebaf5419`.

## News Category DB-only CRUD

Native legacy routes:

- `GET /categories`
- `GET /detailnewscategory/:id`
- `POST /insertnewscategory`
- `POST /updatenewscategory`
- `GET /deletenewscategory/:id`

Locked Old-BE behavior retained:

- source table `news_categories`;
- list SQL remains `SELECT * FROM news_categories` with no `ORDER BY`, `LIMIT`, or `OFFSET`;
- list success remains raw rows and an empty list remains HTTP 200 `{ "success": false }`;
- detail ID comes from the path and detail success remains the raw rows array; empty detail remains HTTP 200 `{ "success": false }`;
- insert fields remain `title`, `title_en`, `description`, `description_en`;
- update writes those same fields and takes the update ID from body `id`;
- delete remains `GET /deletenewscategory/:id` and takes the ID from the path;
- insert/update/delete redirect to `/nc` with HTTP 302;
- compatibility mutation SQL intentionally has no `RETURNING`;
- no auth/cookie requirement was added to these API routes;
- no multipart parser, `news_path`, upload, filesystem write/delete, public upload URL, or external service exists in this Category slice.

Native flow:

```text
legacy News Category route
  → legacy-news-category.controller.js
  → newsService.legacyCategory
  → legacy Category methods in news.repository.js
  → news_categories
```

Main News methods (`list`, `search`, `get`, `create`, `update`, `remove`) remain separate and were not rewritten. Main News insert/update/delete upload behavior therefore remains outside this native Category slice.

The five Category paths are intercepted in `src/app/[...legacy]/route.js` before `handleLegacyApi`. The older News fallback remains available for main News and other unmigrated News-related routes.

Current status:

```text
Source: ✅
CI: ✅
Runtime DB: 🟡
Browser: 🟡
```

Compatibility gate: **run #153 — SUCCESS** at commit `caaf3bd464168de1ab3a980a1df51575ae47de0a`.

## News category/date read-filter

Native legacy routes:

- `GET /news_category/cat/:id`
- `GET /news/search/:date`

Locked Old-BE behavior retained for the category filter:

- source table `news`;
- ID comes from the path parameter;
- SQL remains `SELECT * FROM  news where category_id=$1 ORDER BY news_datetime DESC`;
- bind remains `[id]`;
- no pagination, `LIMIT`, or `OFFSET` was introduced;
- successful response is the raw rows array;
- empty response remains HTTP 200 `[]`.

Locked Old-BE behavior retained for the date filter:

- source table `news`;
- date comes from the path parameter;
- SQL remains `SELECT * FROM  news where news_datetime LIKE $1`;
- bind remains `'%' + date + '%'`;
- no date parser, date range, `DATE(...)`, equality comparison, `ILIKE`, or added `ORDER BY` was introduced;
- successful response is the raw rows array;
- empty response remains HTTP 200 `{ "success": false }`.

The date compatibility path intentionally does **not** reuse modern `newsRepository.search()` / `newsService.search()`. The existing modern keyword search still queries title fields across `news`, `news_photos`, and `news_videos` using `ILIKE`, `ORDER BY id ASC`, `LIMIT 5`, and a combined response.

Native flow:

```text
legacy News read/filter route
  → legacy-news-read-filter.controller.js
  → newsService.legacyFilters
  → getLegacyNewsByCategory / getLegacyNewsByDate in news.repository.js
  → news
```

The dedicated controller is GET-only and contains no multipart parsing, filesystem logic, upload handling, cookie/auth dependency, or public upload URL construction. Both paths are intercepted before `handleLegacyApi`.

Current status:

```text
Source: ✅
CI: ✅
Runtime DB: 🟡
Browser: 🟡
```

Compatibility gate: **run #161 — SUCCESS** at commit `8fabc6a32e2d1ca06aee7a2017e6d9c37f9f39db`.

## Hot Issue main audit

The main `/hotissue` CRUD is **not DB-only** and was not migrated in this task.

Locked Old-BE behavior includes:

- `POST /inserthotissue` → `hotissue_path.single("photo")`;
- insert constructs `site_url + "/uploads/hot_issue/" + req.file.filename` and stores that public URL in `hot_issues.image`;
- `POST /updatehotissue` also uses `hotissue_path.single("photo")` and has separate file/no-file SQL branches;
- `GET /deletehotissue/:id/:foto` accepts the filename in the path and performs filesystem deletion with `fs.existsSync` / `fs.unlink` before/alongside DB deletion;
- therefore its upload, replacement, public URL and delete semantics must be handled in the later route-specific upload-parity phase.

It must stay on legacy/fallback for now.

## Audit — `GET /posts/type/:name`

This endpoint remains legacy/fallback and was audited without implementation.

Locked Old-BE route:

```text
GET /posts/type/:name
```

Handler behavior:

- `name` comes directly from `req.params.name`;
- SQL is built dynamically as `SELECT * FROM news_` + `name`;
- the table identifier is therefore **not parameterized**;
- no `ORDER BY`, pagination, `LIMIT`, or `OFFSET` is present;
- the read handler itself has no multer, upload, file write/delete, or public URL construction;
- empty SQL result returns HTTP 200 `{ "success": false }`.

Observed source behavior by `name`:

- when `name === "photos"`, the selected table is `news_photos` and each row is remapped to: `id`, `title`, `photo`, `content`, `photos_datetime`, `title_en`, `content_en`, `ph` (filename derived from `photo.split('/')[5]`), `web_identity`, `tag`, `directorat`, `id_province`, `is_publish`, and `users_name`;
- for **every non-`photos` value**, Old-BE enters the video-shaped mapping branch. For the normal `videos` case this means table `news_videos` and fields `id`, `title`, `video`, `duration`, `content`, `videos_datetime`, `title_en`, `content_en`, `web_identity`, `tag`, `directorat`, `id_province`, `is_publish`, and `users_name`;
- Old-BE source does not contain an allowlist restricting `name` to `photos` / `videos`; any value is concatenated into a `news_<name>` table identifier and then, if rows are returned, all non-`photos` values receive the video-shaped mapping.

Security/compatibility concern:

- concatenating an untrusted path value into an SQL identifier creates a dynamic-identifier SQL risk and can address other `news_*` tables available to the DB user;
- this must not be silently "fixed" by changing the observable contract before legitimate production `name` values are known;
- New-ME may later replace the dynamic identifier with an internal allowlist/mapping **only after** frontend/runtime evidence establishes the legitimate values, while preserving the same response mapping and empty behavior for those values.

Frontend-consumer audit:

- no direct `/posts/type/...` consumer was found by code search in `Old-BE`, `New-ME`, or the additional KNEKS repository available through the connected GitHub account;
- therefore the production caller and the full set of legitimate `name` values remain 🟡 and require the actual production frontend repository, browser/network trace, or equivalent runtime evidence before compatibility implementation is finalized.

Relationship with media tables:

- `photos` naturally resolves to `news_photos` and receives the special photo mapping;
- `videos` naturally resolves to `news_videos` and receives the non-photo/video mapping;
- other `news_*` tables are technically addressable by the legacy dynamic SQL if the database contains them, which is precisely why implementation must separate the legacy observable contract from a safer internal identifier mapping.

Audit status:

```text
Source contract: ✅ audited
Frontend legitimate values: 🟡 requires verification
Implementation: ❌ not started in this task
```

## Native compatibility dispatch

`src/app/[...legacy]/route.js` dispatches native compatibility handlers before `legacy-handler-adapter.js`, including:

1. Auth
2. About / Ekonomi Syariah reads
3. Agenda
4. Area reference
5. Contacts / Questbook
6. Data Menu
7. Directorate Division CRUD
8. Gender reference
9. Hot Issue Category CRUD
10. Hot Issue Subcategory CRUD
11. Institution reads
12. KBLI reference
13. KDEKS profile/reference reads
14. KDEKS province profile reads
15. Maps
16. Menu / Submenu settings
17. Negara reference
18. News Category CRUD
19. News category/date read-filter
20. Pembuka reference
21. Peserta reference
22. Prioritas reference
23. Province
24. Roles lookup
25. Scopes
26. Social Media / Post Social Media
27. Tagging
28. Usia reference
29. Web Profile reads
30. Web Profile DB-only settings
31. Zona KHAS
32. remaining routes → `legacy-handler-adapter.js`

The fallback remains intentional until each remaining domain has its own parity gate and runtime-sensitive behavior is verified. Native routes are intercepted before fallback; keeping sibling fallback code present is currently a safety measure, not evidence that the native route is unused.

## Automated compatibility gate

`.github/workflows/compatibility-baseline.yml` currently validates:

- migrated source syntax with `node --check`;
- all registered Node contract/regression tests, including Hot Issue Category, Hot Issue Subcategory, Directorate Division, News Category, and News category/date read-filter;
- locked Old-BE route compatibility via `compare-old-be-routes.mjs`;
- exact per-page role authorization compatibility via `compare-old-be-role-policies.mjs`.

Latest substantive migration result: **GitHub Actions run #161 — SUCCESS** at commit `8fabc6a32e2d1ca06aee7a2017e6d9c37f9f39db`.

This is source/static/automated parity only. It does not replace real DB/browser testing.

## Upload boundary

Upload-heavy endpoints remain intentionally outside this phase. No global upload validator or new upload migration was introduced here.

Still excluded include the main Hot Issue CRUD, main News upload, Files upload, Photo upload, Video upload, Institution `logo_member`, Structure, Directorate media uploads, KDEKS upload, banners/slideshow, Opini and other media/file mutations.

Before any future upload domain is changed, inventory each Old-BE route for:

`method → multipart field → single/multiple → filter/MIME behavior → destination → filename → DB URL/value → replacement → delete semantics → no-file behavior → errors → redirect`.

## Remaining blockers / next safe work

1. Recover the real New-ME `package.json` and lockfile from the actual development source; dependency reconstruction remains blocked until then.
2. Keep runtime DB/browser verification 🟡 for source/CI-complete DB-backed slices until a runnable environment exists.
3. Keep Institution `logo_member`, main Hot Issue, main News upload, Directorate media and all other upload-heavy mutations on fallback.
4. **Next exact target: `GET /posts/type/:name` compatibility.** Before implementation, verify the legitimate production `name` values from the actual frontend/runtime. Preserve the Old-BE photo mapping, non-photo/video-shaped mapping, empty `{ "success": false }`, and lack of ordering. If frontend evidence confirms a finite legitimate set (for example `photos` and `videos`), implement an internal allowlist/mapping rather than raw dynamic SQL while keeping observable behavior identical for those legitimate values.

No domain above with 🟡 runtime status is considered fully production-complete yet.
