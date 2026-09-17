# Laporan Migrasi Next.js CMS KNEKS

Tanggal verifikasi: 2026-09-18

Compatibility baseline: `Foulishmidtery/Old-BE@0984f0182738303627dab16fbec60c948e926e01`

`MIGRATION_PROGRESS.md` adalah **source of truth detail**. Dokumen ini hanya merangkum status terbaru dan tidak boleh digunakan untuk mengoverride progress/source aktual.

## Ringkasan terkini

Migrasi New-ME dilakukan secara bertahap dengan Old-BE sebagai reference implementation karena kontrak API masih dipakai frontend production. Native compatibility path dijalankan sebelum `legacy-handler-adapter.js`; fallback tetap dipertahankan untuk domain yang belum memiliki parity gate sendiri, terutama upload-heavy dan runtime-sensitive flows.

Source/CI compatibility yang saat ini sudah tersedia mencakup antara lain:

- Auth dan legacy cookie/SSO contract;
- storage aliases;
- CMS per-page authorization;
- Data Menu;
- Agenda;
- Province;
- Tagging;
- Zona KHAS;
- Contacts / Questbook;
- Maps;
- Social Media / Post Social Media;
- Scopes;
- About / Ekonomi Syariah read-only;
- KDEKS About / History / Maps reads;
- KDEKS province About / History reads;
- Web Profile reads dan DB-only settings;
- Menu / Submenu settings;
- Institution read-only;
- static/reference slices (`kbli`, `peserta`, `area`, `gender`, `negara`, `pembuka`, `prioritas`, `usia`);
- Roles lookup;
- Hot Issue Category CRUD;
- Hot Issue Subcategory CRUD;
- Directorate Division (`devisi`) CRUD;
- News Category CRUD;
- News category/date read-filter;
- `GET /posts/type/:name` untuk production values yang terbukti digunakan: `photos` dan `videos`;
- `GET /photodetail/:id` sebagai native raw-row Photo detail read;
- `GET /videodetail/:id` sebagai native raw-row Video detail read.

Status Source ✅ / CI ✅ pada slice DB-backed di atas tidak otomatis berarti live DB/browser parity. Runtime DB/browser tetap 🟡 sampai environment nyata tersedia dan diuji.

Full reproducible application build juga masih **blocked** karena `package.json` / lockfile asli belum tracked pada snapshot repository. Dependency tidak boleh direkonstruksi dengan menebak versi.

## Automated compatibility baseline

`.github/workflows/compatibility-baseline.yml` menjalankan:

1. `node --check` terhadap source migrasi yang terdaftar;
2. Node contract/regression tests;
3. `scripts/compare-old-be-routes.mjs` terhadap Old-BE commit terkunci;
4. `scripts/compare-old-be-role-policies.mjs` untuk authorization parity.

Latest substantive verified result:

- **GitHub Actions run #185**
- commit `e0cc06dabefaa06bf21d4fbc3417641a4ee6f872`
- conclusion: **SUCCESS**

Run tersebut sudah mencakup regression Video detail dan Photo detail selain regression lama seperti News post-type, News Category, News read-filter, Directorate Division, Hot Issue Category/Subcategory, route comparator dan role-policy comparator.

CI ini membuktikan source/static/automated compatibility pada scope yang terdaftar. CI tidak membuktikan live PostgreSQL side effects, browser cookies, production frontend behavior, real upload, atau external integration parity.

## Native compatibility architecture

Pola target untuk slice yang diekstrak:

```text
legacy route
   ↓
thin compatibility controller
   ↓
domain service
   ↓
domain repository
   ↓
PostgreSQL
```

Controller native dijalankan sebelum generic adapter. Service/repository tidak menerima `req/res` pada compatibility path yang sudah diekstrak.

## News compatibility status terbaru

### News Category CRUD

Native compatibility sudah mencakup:

- `GET /categories`
- `GET /detailnewscategory/:id`
- `POST /insertnewscategory`
- `POST /updatenewscategory`
- `GET /deletenewscategory/:id`

Old-BE empty behavior, field mapping, ID source, redirects dan no-`RETURNING` mutation semantics dipertahankan. Main News upload tidak ikut dipindahkan.

### News category/date read-filter

Native compatibility sudah mencakup:

- `GET /news_category/cat/:id`
- `GET /news/search/:date`

Category filter tetap `ORDER BY news_datetime DESC` dan empty `[]`. Date filter tetap `LIKE '%date%'`, tanpa ordering, dengan empty `{success:false}`. Existing modern keyword `newsService.search()` tetap terpisah.

### `GET /posts/type/:name`

Endpoint ini baru dipindahkan setelah compatibility evidence audit menemukan consumer nyata untuk:

```text
photos
videos
```

Evidence berasal dari source frontend React KNEKS dan legacy CMS views yang secara eksplisit memakai `/posts/type/photos` dan `/posts/type/videos`.

Old-BE sebelumnya membentuk SQL identifier secara langsung dengan `SELECT * FROM news_ + name`. New-ME tidak mewarisi konstruksi unsafe tersebut. Repository menggunakan fixed query mapping:

```text
photos → SELECT * FROM news_photos
videos → SELECT * FROM news_videos
```

Observable contract legitimate values tetap dipertahankan:

- tidak menambah `ORDER BY`, `LIMIT`, `OFFSET`, atau pagination;
- zero rows → HTTP 200 `{success:false}`;
- `photos` memakai historical photo response mapping, termasuk `ph = photo?.split('/')[5]`;
- `videos` memakai historical non-photo/video response mapping, termasuk `video`, `duration`, dan `videos_datetime`;
- tidak ada multipart/filesystem behavior pada read endpoint ini.

Unsupported `:name` sekarang ditolak sebelum repository access. Ini adalah intentional security boundary; parity penuh tidak diklaim untuk unsupported/malicious input yang Old-BE sebelumnya teruskan ke dynamic SQL.

### `GET /photodetail/:id`

Photo detail native mempertahankan:

```sql
SELECT * FROM  news_photos where id=$1
```

- path ID;
- raw rows array HTTP 200;
- empty `{success:false}` HTTP 200;
- tanpa ordering/pagination/custom mapping;
- tidak menambahkan `ph`;
- Photo mutations tetap fallback.

### `GET /videodetail/:id`

Video detail sekarang native dan sengaja terpisah dari mapped list `/posts/type/videos`:

```sql
SELECT * FROM  news_videos where id=$1
```

- path ID;
- raw rows array HTTP 200;
- empty `{success:false}` HTTP 200;
- tanpa `ORDER BY`, `LIMIT`, `OFFSET`, pagination, atau custom mapping;
- tidak menggunakan auth/cookie, multipart, filesystem, atau upload URL logic pada read handler;
- `insertvideo`, `updatevideo`, dan `deletevideo` tetap fallback.

Status:

```text
Source: ✅
CI: ✅
Runtime DB: 🟡
Browser: 🟡
```

## Upload parity boundary

Upload-heavy routes tetap tidak boleh dianggap selesai hanya karena sibling read route sudah native.

Tetap fallback antara lain:

- Main News `POST /insertnews`, `POST /updatenews`, `GET /deletenews/:id/:foto`;
- Hot Issue main upload CRUD;
- Files upload/update/delete;
- Photo insert/update/delete;
- Video mutations;
- Institution `logo_member` mutations;
- Structure dan Structure KDEKS media;
- Directorate images/banner;
- KDEKS upload;
- banners/slideshow;
- Opini upload.

Setiap route upload harus diaudit individual: multipart field, single/multiple, filter/MIME, destination, filename, DB/public URL, replacement, deletion, no-file behavior, error response dan redirect.

## Runtime verification yang belum tersedia

Karena dependency manifest asli dan runnable verification environment belum tersedia, hal berikut tetap pending:

- clean install/build dari repository saja;
- live PostgreSQL query/side-effect parity;
- browser login/SSO/session behavior;
- production frontend smoke test;
- real multipart upload/replace/delete;
- upstream integration behavior.

Untuk slice dengan source/CI hijau, runtime/browser tetap **🟡 perlu verifikasi** kecuali sudah diuji langsung.

## Next safe migration stage

Audit remaining DB-only/read-only sudah dilakukan setelah Video detail selesai. Kandidat seperti public News detail, KDEKS News/category reads, dashboard reads, Opini reads, dan slideshow reads masih fallback. Public News detail mempunyai custom mapping/derived `img`; KDEKS News list mempunyai per-row category lookup; slideshow/Opini mempunyai sibling media mutations; `/posts` bergantung cookie role; `/search_posts` memakai dynamic string SQL.

Next exact target yang dipilih karena paling isolated adalah:

```text
GET /api_news_detail_kdeks/:id
```

Old-BE route/handler:

```text
GET /api_news_detail_kdeks/:id → news_details_kdeks
```

Old-BE query:

```sql
SELECT * FROM news where id = $1 AND web_identity = 'kdeks' 
```

Contract:

- path `id` → `$1`;
- found → raw rows array HTTP 200;
- empty → HTTP 200 `{success:false}`;
- tanpa ordering/pagination;
- tanpa auth/cookie branch;
- tanpa multipart/filesystem/public upload URL/external upstream;
- New-ME masih menjalankannya melalui `handlers/news.cjs` / generic fallback;
- native KDEKS profile controller yang sudah ada tidak menangani KDEKS News routes.

Target ini **belum diimplementasikan** pada task Video detail ini.