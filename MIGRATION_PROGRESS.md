# Migration Progress — Old-BE → New-ME

Last updated: 2026-09-18

Compatibility baseline: `Foulishmidtery/Old-BE@0984f0182738303627dab16fbec60c948e926e01`

Latest substantive compatibility gate: **run #177 — SUCCESS** (`93153934b6261ea739d5f1a9b6cac8cd8a08e4b1`).

`MIGRATION_PROGRESS.md` is the detailed source of truth. `MIGRATION_REPORT.md` is a shorter status report and must not override this file.

## Status model

A domain is tracked separately at four levels:

- **Source migration** — dedicated native compatibility controller/service/repository or locked static compatibility path exists.
- **CI contract** — syntax, dedicated regression tests, Old-BE route comparison and relevant policy checks are green.
- **Runtime DB parity** — request/result/side-effect parity has been verified against a real database.
- **Browser/frontend parity** — production-style browser/session/frontend behavior has been verified.

Source/CI completion never implies runtime completion.

## Current status

| Area | Source migration | CI contract | Runtime DB parity | Browser/frontend parity | Notes |
| --- | --- | --- | --- | --- | --- |
| Dependency reproducibility | 🔴 Blocked | 🔴 Blocked | — | — | Real `package.json` / lockfile are still not tracked. Do not reconstruct dependency versions by guessing. |
| Old-BE baseline lock | ✅ | ✅ | — | — | `migration/old-be-baseline.json` locks `0984f0182738303627dab16fbec60c948e926e01`. |
| Route baseline checker | ✅ | ✅ | — | — | `scripts/compare-old-be-routes.mjs` compares locked Old-BE routes with the New-ME manifest. |
| CMS per-page authorization | ✅ | ✅ | — | 🟡 | Exact Old-BE `roles_id` page-policy comparison remains gated. |
| Auth / local cookies | ✅ | ✅ | 🟡 | 🟡 | Native compatibility contract exists; real DB/browser login still required. |
| SSO expiry / cross-domain logout | ✅ | ✅ | — | 🟡 | `.kneks.go.id`, Secure, SameSite=None and historical expiry/clear scope are preserved. |
| `/storage/*` compatibility | ✅ | ✅ | — | 🟡 | Legacy aliases and range/cache behavior are source/CI gated. |
| Data Menu | ✅ | ✅ | 🟡 | 🟡 | Legacy SQL/redirect behavior remains isolated from additive modern APIs. |
| Agenda | ✅ | ✅ | 🟡 | 🟡 | Search, timestamp and graph quirks are preserved. |
| Province | ✅ | ✅ | 🟡 | 🟡 | Native compatibility path active. |
| Tagging | ✅ | ✅ | 🟡 | 🟡 | Native compatibility path active. |
| Zona KHAS | ✅ | ✅ | 🟡 | 🟡 | Ordering/nested/date semantics gated. |
| Contacts / Questbook | ✅ | ✅ | 🟡 | 🟡 | Native compatibility path active. |
| Maps | ✅ | ✅ | 🟡 | 🟡 | Native compatibility path active. |
| Social Media / Post Social Media | ✅ | ✅ | 🟡 | 🟡 | Native compatibility path active. |
| Scopes | ✅ | ✅ | 🟡 | 🟡 | Historical Old-BE update quirk retained on compatibility path. |
| About / Ekonomi Syariah reads | ✅ | ✅ | 🟡 | 🟡 | Four read-only endpoints native; upload mutations remain fallback. |
| KDEKS About / History / Maps reads | ✅ | ✅ | 🟡 | 🟡 | Native read slice active. |
| KDEKS province About / History reads | ✅ | ✅ | 🟡 | 🟡 | Province-specific shapes are gated separately. |
| Web Profile reads | ✅ | ✅ | 🟡 | 🟡 | List/detail native. |
| Web Profile DB-only settings | ✅ | ✅ | 🟡 | 🟡 | Title/logo/header/color DB-only POST routes native. |
| Menu / Submenu settings | ✅ | ✅ | 🟡 | 🟡 | Read/detail/insert/update native; raw split semantics retained. |
| Institution read-only | ✅ | ✅ | 🟡 | 🟡 | List/detail native; `logo_member` mutations remain fallback. |
| KBLI reference | ✅ | ✅ | — | 🟡 | Locked static JSON contract. |
| Peserta reference | ✅ | ✅ | — | 🟡 | Locked static JSON contract. |
| Area reference | ✅ | ✅ | — | 🟡 | Locked static JSON contract. |
| Gender reference | ✅ | ✅ | — | 🟡 | Locked static JSON contract. |
| Negara reference | ✅ | ✅ | — | 🟡 | Locked static JSON contract. |
| Pembuka reference | ✅ | ✅ | — | 🟡 | Locked static JSON contract. |
| Prioritas reference | ✅ | ✅ | — | 🟡 | Locked static JSON contract. |
| Usia reference | ✅ | ✅ | — | 🟡 | Historical repeated IDs retained. |
| Roles lookup | ✅ | ✅ | 🟡 | 🟡 | Dedicated `SELECT * FROM roles` compatibility path. |
| Hot Issue Category CRUD | ✅ | ✅ | 🟡 | 🟡 | Five DB-only category routes native. |
| Hot Issue Subcategory CRUD | ✅ | ✅ | 🟡 | 🟡 | Historical insert-path typo and raw split behavior retained. |
| Directorate Division (`devisi`) CRUD | ✅ | ✅ | 🟡 | 🟡 | Five DB-only routes native; modern `RETURNING` methods remain separate. |
| News Category CRUD | ✅ | ✅ | 🟡 | 🟡 | Five DB-only category routes native. |
| News category/date read-filter | ✅ | ✅ | 🟡 | 🟡 | `/news_category/cat/:id` and `/news/search/:date` native with distinct Old-BE empty/order semantics. |
| News post-type read | ✅ | ✅ | 🟡 | 🟡 | `GET /posts/type/:name` native for evidence-backed production values `photos` and `videos`; unsupported names are intentionally security-hardened. |
| Photo detail read | ✅ | ✅ | 🟡 | 🟡 | `GET /photodetail/:id` native with exact raw-row SQL/empty response contract; Photo mutations remain fallback. |
| Hot Issue main CRUD | ❌ | ❌ | ❌ | ❌ | Upload-heavy; stays fallback. |
| Main News upload CRUD | ❌ | ❌ | ❌ | ❌ | `insertnews`, `updatenews`, `deletenews` remain fallback/upload boundary. |
| Photo mutations | ❌ | ❌ | ❌ | ❌ | Multipart/filesystem behavior not migrated. |
| Video mutations | ❌ | ❌ | ❌ | ❌ | Kept outside current read-only extraction. |
| Route-specific upload parity | ❌ | ❌ | ❌ | ❌ | Must inventory every multipart route before migration. |
| Legacy `.cjs` / adapter fallback | ⚠️ Active | ✅ covered as fallback | 🟡 | 🟡 | Still required for unmigrated and runtime-sensitive domains. |

## Compatibility architecture

Preferred native flow:

```text
legacy route
  → thin compatibility controller
  → domain service
  → domain repository
  → PostgreSQL
```

Controllers read HTTP inputs and shape HTTP responses. Services/repositories do not receive `req`/`res`. Native compatibility handlers dispatch before `handleLegacyApi`; the generic fallback is retained until each remaining slice has its own evidence, contract test and gate.

## Native compatibility dispatch

`src/app/[...legacy]/route.js` currently dispatches native compatibility handlers before the generic adapter, including:

1. Auth
2. About / Ekonomi Syariah reads
3. Agenda
4. Area reference
5. Contacts / Questbook
6. Data Menu
7. Directorate Division
8. Gender reference
9. Hot Issue Category
10. Hot Issue Subcategory
11. Institution reads
12. KBLI reference
13. KDEKS profile/reference reads
14. KDEKS province profile reads
15. Maps
16. Menu / Submenu settings
17. Negara reference
18. News Category CRUD
19. News category/date read-filter
20. News post-type read (`/posts/type/:name`)
21. Photo detail read (`/photodetail/:id`)
22. Pembuka reference
23. Peserta reference
24. Prioritas reference
25. Province
26. Roles lookup
27. Scopes
28. Social Media / Post Social Media
29. Tagging
30. Usia reference
31. Web Profile reads
32. Web Profile DB-only settings
33. Zona KHAS
34. remaining routes → `legacy-handler-adapter.js`

Keeping sibling fallback code present is intentional; it does not mean the native paths above are unused.

## News Category DB-only CRUD

Native routes:

- `GET /categories`
- `GET /detailnewscategory/:id`
- `POST /insertnewscategory`
- `POST /updatenewscategory`
- `GET /deletenewscategory/:id`

Preserved Old-BE behavior includes `news_categories`, no added list ordering, `{success:false}` on empty list/detail, body `id` on update, path `id` on delete, mutation redirects to `/nc`, and no `RETURNING` on compatibility mutations. Main News upload behavior is not part of this slice.

Status:

```text
Source: ✅
CI: ✅
Runtime DB: 🟡
Browser: 🟡
```

## News category/date read-filter

Native routes:

- `GET /news_category/cat/:id`
- `GET /news/search/:date`

Category filter preserves:

```sql
SELECT * FROM  news where category_id=$1 ORDER BY news_datetime DESC
```

- path `id` bind;
- success raw rows;
- empty HTTP 200 `[]`;
- no limit/offset/pagination.

Date filter preserves:

```sql
SELECT * FROM  news where news_datetime LIKE $1
```

with `['%' + date + '%']`:

- path `date` remains a LIKE fragment, not a date range;
- no `ORDER BY`, `LIMIT`, `OFFSET` or `ILIKE`;
- success raw rows;
- empty HTTP 200 `{ "success": false }`.

`newsService.search()` remains a separate keyword-search contract and was not reused.

Status:

```text
Source: ✅
CI: ✅
Runtime DB: 🟡
Browser: 🟡
```

## News post-type read — `GET /posts/type/:name`

### Compatibility evidence

The legitimate production values were established before native migration rather than inferred from database table names.

Evidence reviewed:

- `muhammad-rifqi/kneks_react@433972d7efe591330570cbe0ac7d625229c9986e`
  - `.env`, `.env.dev`, and `env.txt` define `REACT_APP_API_PHOTO=/posts/type/photos` and `REACT_APP_API_VIDEO=/posts/type/videos`;
  - `GaleriFoto.js` consumes `REACT_APP_API_PHOTO` through axios;
  - `GaleriVideo.js` consumes `REACT_APP_API_VIDEO` through axios.
- `muhammad-rifqi/webdevkneks@c5939440427a48930cdbf2ff6d9db54658d0a6be`
  - `views/photos/list.html` hardcodes `/posts/type/photos`;
  - `views/videos/list.html` hardcodes `/posts/type/videos`.
- `muhammad-rifqi/super_kneks@03217e87e8c8b5b3bdcf1dfd0b3a64b3ae388751`
  - corresponding CMS photo/video views use the same two endpoint values.

No additional `/posts/type/<value>` consumer or constructed `/posts/type/${...}` value was found in the accessible KNEKS source audit. Therefore the compatibility implementation treats `photos` and `videos` as the evidence-backed legitimate production set.

### Locked Old-BE behavior

Old-BE route:

```text
GET /posts/type/:name → categories
```

Historical implementation dynamically executed `SELECT * FROM news_` + `name`, had no `ORDER BY`, `LIMIT`, `OFFSET`, pagination, auth/cookie requirement, multipart middleware or filesystem side effect.

For `photos`, Old-BE maps each row to:

- `id`
- `title`
- `photo`
- `content`
- `photos_datetime`
- `title_en`
- `content_en`
- `ph = photo?.split('/')[5]`
- `web_identity`
- `tag`
- `directorat`
- `id_province`
- `is_publish`
- `users_name`

For the non-photo branch used by the verified `videos` consumer, Old-BE maps:

- `id`
- `title`
- `video`
- `duration`
- `content`
- `videos_datetime`
- `title_en`
- `content_en`
- `web_identity`
- `tag`
- `directorat`
- `id_province`
- `is_publish`
- `users_name`

Success remains HTTP 200 mapped array. Zero rows remain HTTP 200:

```json
{"success":false}
```

### Native implementation

Native flow:

```text
GET /posts/type/:name
  → legacy-posts-type.controller.js
  → newsService.legacyPostTypes
  → newsRepository.getLegacyPostTypeRows(name)
  → fixed news_photos / news_videos query
```

The repository never concatenates request input into an SQL identifier. It uses a fixed complete-query map:

```text
photos → SELECT * FROM news_photos
videos → SELECT * FROM news_videos
```

This preserves the legitimate observable production behavior while removing the raw dynamic-identifier injection surface.

Unsupported names are intentionally rejected before repository access with HTTP 400. That behavior is a documented security boundary; full parity is **not** claimed for unsupported or malicious values that Old-BE would have passed into dynamic SQL.

No main News upload, Photo mutation or Video mutation was migrated as part of this read slice.

Compatibility gate:

```text
GitHub Actions run #169
HEAD: 16a4c7689c6b3b07405242cbe8e524e6381f8af4
Conclusion: SUCCESS
```

Status:

```text
Source: ✅
CI: ✅
Runtime DB: 🟡
Browser: 🟡
```

## Photo detail read — `GET /photodetail/:id`

Locked Old-BE route:

```text
GET /photodetail/:id → photodetail
```

Exact compatibility SQL:

```sql
SELECT * FROM  news_photos where id=$1
```

with path `id` bound directly to `$1`.

Preserved observable contract:

- matching row(s) → raw DB rows array, HTTP 200;
- no row → HTTP 200 `{ "success": false }`;
- no `ORDER BY`, `LIMIT`, `OFFSET` or pagination;
- no custom mapping;
- no derived `ph` field;
- no auth/cookie requirement in this API handler;
- no multipart/file processing, filesystem side effect or upload URL generation.

This route deliberately does **not** reuse `/posts/type/photos`, because that endpoint has a different historical contract and adds `ph = photo?.split('/')[5]`.

Native flow:

```text
GET /photodetail/:id
  → legacy-photo-detail.controller.js
  → newsService.legacyPhoto.detail(id)
  → newsRepository.getLegacyPhotoDetailRows(id)
  → news_photos
```

Sibling Photo mutations remain on the generic fallback and were not modified:

- `POST /insertphoto` (`photo_path.single("photo")`);
- `POST /updatephoto` (`photo_path.single("photo")`, with file/no-file branches);
- `GET /deletephoto/:id/:foto` (filesystem deletion semantics).

Compatibility gate:

```text
GitHub Actions run #177
HEAD: 93153934b6261ea739d5f1a9b6cac8cd8a08e4b1
Conclusion: SUCCESS
```

Status:

```text
Source: ✅
CI: ✅
Runtime DB: 🟡
Browser: 🟡
```

## Selected earlier DB-only slices

The following important slices remain source/CI complete under their existing dedicated regression gates:

- Hot Issue Category CRUD;
- Hot Issue Subcategory CRUD, including historical `/inserthotissubcategory` typo;
- Directorate Division (`devisi`) CRUD;
- News Category CRUD;
- Roles lookup;
- Institution read-only;
- KDEKS province About/History reads;
- all static/reference reads listed in the status table.

Their runtime DB/browser statuses remain 🟡 unless explicitly verified in a real environment.

## Upload boundary

Do not treat existing upload helpers as a universal legacy upload contract.

Still outside the current migration phase include:

- main Hot Issue insert/update/delete image flow;
- main News `POST /insertnews`, `POST /updatenews`, `GET /deletenews/:id/:foto`;
- Files upload/update/delete;
- Photo insert/update/delete;
- Video mutation flows;
- Institution `logo_member` mutations;
- Structure / Structure KDEKS media flows;
- Directorate images/banner flows;
- KDEKS file/logo/SK/structure upload;
- banners/slideshow;
- Opini upload;
- other media/file mutations.

Before any upload-heavy slice moves from fallback, audit each route for:

```text
method → multipart field → single/multiple → MIME/filter behavior → destination
→ filename → stored DB/public URL → replacement behavior → delete behavior
→ no-file behavior → errors/status/redirect
```

## Remaining runtime blockers

Runtime DB/browser parity remains pending because the repository snapshot does not yet provide a reproducible dependency manifest/runtime environment.

Do not raise 🟡 to ✅ without real verification of the applicable behavior, including where relevant:

- PostgreSQL query/result/side-effect parity;
- login/session/cookie behavior in a browser;
- production frontend requests;
- multipart upload/replace/delete;
- upstream integrations.

The missing real `package.json` / lockfile remains a dependency reproducibility blocker. Do not create guessed manifests.

## Next target audit — Video detail read

Exactly one next DB-only candidate has been audited; it is **not implemented in this task**.

### Next exact target

```text
GET /videodetail/:id
```

Locked Old-BE route:

```text
GET /videodetail/:id → videodetail
```

Old-BE handler behavior:

```sql
SELECT * FROM  news_videos where id=$1
```

with path `id` bound as `[id_vid]`.

Observable response contract:

- matching row(s) → raw rows array, HTTP 200;
- no row → HTTP 200 `{ "success": false }`;
- no `ORDER BY`, `LIMIT`, `OFFSET` or pagination;
- no cookie/auth logic in the API handler;
- no multipart, filesystem write/delete or public upload URL generation in this read handler.

New-ME still exposes `videodetail` from `src/server/repositories/handlers/news.cjs` through `legacyHandlers`; there is no dedicated Video detail controller/service/repository compatibility method yet. Existing `getLegacyPostTypeRows("videos")` is a list contract and must not be reused for detail filtering in memory.

Sibling Video mutations remain outside this target:

- `POST /insertvideo`;
- `POST /updatevideo`;
- `GET /deletevideo/:id`.

The Video mutations are DB-backed rather than multipart in the locked Old-BE source, but they are explicitly outside the current task and require their own later audit/slice decision.

Therefore the next exact target, if continued, is **only `GET /videodetail/:id`**.

## Automated compatibility gate

`.github/workflows/compatibility-baseline.yml` validates:

- `node --check` for registered migrated source;
- all registered Node compatibility/regression tests, including News Category, News read-filter, News post-type and Photo detail;
- locked Old-BE route comparison;
- CMS role-policy comparison.

Latest substantive result:

```text
Run #177 — SUCCESS
Commit: 93153934b6261ea739d5f1a9b6cac8cd8a08e4b1
```

This remains source/static/automated parity only. It does not replace real DB/browser verification.
