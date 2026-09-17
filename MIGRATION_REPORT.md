# Laporan Migrasi Next.js CMS KNEKS

Tanggal verifikasi: 2026-09-17

Compatibility baseline: `Foulishmidtery/Old-BE@0984f0182738303627dab16fbec60c948e926e01`

Laporan ini membedakan **source/CI parity** dari **runtime DB/browser parity**. Status detail per domain tersedia di `MIGRATION_PROGRESS.md`.

## Ringkasan terkini

- 149 legacy HTML view tetap telah dipetakan ke App Router/JSX; pemetaan view **tidak dianggap sebagai bukti behavior parity**.
- Manifest route legacy tetap dipertahankan dan dibandingkan otomatis dengan Old-BE yang dikunci.
- Compatibility migration sudah bergerak dari satu contoh Data Menu menjadi beberapa native compatibility controller/service/repository.
- CMS per-page role authorization sekarang diambil dari policy aktual Old-BE, bukan satu guard generik untuk seluruh `/cms`.
- Source/contract migration sudah tersedia untuk Auth, storage alias, Data Menu, Agenda, Province, Tagging, Zona KHAS, Contacts/Questbook, Maps, Social Media/Post Social Media, Scopes, beberapa Profile/reference read, Web Profile, dan Menu/Submenu settings.
- `legacy-handler-adapter.js` tetap aktif sebagai fallback untuk route/domain yang belum dinyatakan parity.
- Upload-heavy domain belum boleh dianggap selesai; setiap route upload harus diaudit secara individual sebelum dipindahkan dari fallback.
- Full reproducible application build masih **blocked** karena `package.json` / lockfile asli belum tracked pada snapshot repository. Dependency tidak direkonstruksi dengan menebak versi.

## Automated compatibility baseline

`.github/workflows/compatibility-baseline.yml` sekarang menjalankan:

1. `node --check` terhadap source migrasi yang terdaftar;
2. Node contract/regression tests;
3. `scripts/compare-old-be-routes.mjs` terhadap checkout Old-BE commit terkunci;
4. `scripts/compare-old-be-role-policies.mjs` untuk membandingkan page authorization New-ME dengan `Old-BE/app.js`.

Latest verified result:

- **GitHub Actions run #75**
- commit `8ff3e2717cf76d907e5cf40ef819c923ae958d3f`
- conclusion: **SUCCESS**

Hasil ini membuktikan source/static/automated contract pada scope yang terdaftar. Hasil tersebut **bukan** bukti live PostgreSQL, cookie browser, frontend production, upload real, atau upstream integration parity.

## CMS per-page authorization

Old-BE tidak menggunakan satu role rule untuk semua halaman. Setiap page route membaca `req.cookies.roles_id` dengan kombinasi role yang berbeda dan, jika ditolak, melakukan `res.redirect('/')`.

New-ME sekarang memakai:

- `src/config/role-policies.js`
- `src/server/auth/session.js`
- `src/server/auth/authorization.js`
- `src/middleware.js`
- `tests/cms-authorization.test.mjs`
- `scripts/compare-old-be-role-policies.mjs`

Behavior yang dipertahankan:

- cookie page guard: `roles_id`;
- missing/invalid role ditolak pada protected page;
- role matrix berbeda per halaman;
- unauthorized response menggunakan **302** ke `/`;
- halaman Old-BE yang tidak mempunyai role guard tidak otomatis diberi requirement `islogin` baru;
- dynamic New-ME page route dipetakan kembali ke legacy page policy yang tepat.

Policy checker membaca source Old-BE yang dikunci dan membuat CI gagal bila ada policy yang hilang, ditambah tanpa baseline, atau role-nya melebar/menyempit.

## Native compatibility architecture

Target flow yang digunakan pada domain yang sudah diekstrak:

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

Controller native dijalankan sebelum `legacy-handler-adapter.js`. Fallback hanya menangani route yang belum dipindahkan.

Domain/slice yang saat ini memiliki native compatibility path mencakup:

- Auth;
- About / Ekonomi Syariah read-only;
- Agenda;
- Contacts / Questbook;
- Data Menu;
- KDEKS About/History/Maps reference reads;
- Maps;
- Menu / Submenu settings;
- Province;
- Scopes;
- Social Media / Post Social Media;
- Tagging;
- Web Profile reads + DB-only settings mutations;
- Zona KHAS.

## Compatibility behavior yang sudah dikunci

### Auth

- local login response tidak menambah internal `user` object;
- host-only local cookie contract dipertahankan;
- SSO cookie tetap domain `.kneks.go.id`, `Secure`, `SameSite=None`;
- SSO expiry dikembalikan ke behavior Old-BE sekitar 24 hari;
- SSO logout membersihkan cookie dengan domain scope yang sama.

### Storage aliases

Alias Old-BE berikut kembali tersedia pada source compatibility path:

- `/storage/news`
- `/storage/hot_issue`
- `/storage/photo`
- `/storage/structure`
- `/storage/filesupload`

Traversal diblok dan file serving mendukung HEAD/range behavior. Live file parity tetap perlu runtime environment.

### Data Menu

Legacy path mempertahankan:

- `SELECT * FROM data_menu` tanpa menambah ordering;
- tidak menambah required-field validation baru;
- HTTP 200 + `{success:false}` untuk empty result;
- redirect mutation ke `/menu_data`.

Modern `/api/data-menus` tetap additive dan terpisah.

### Agenda

Legacy path mempertahankan:

- `ORDER BY agenda_datetime DESC`;
- search `LIKE` + historical search cap;
- create/update datetime quirks;
- update side effect pada `created_at`/`updated_at`;
- historical `/agenda_graph` response mapping;
- redirect `/a`.

### Zona KHAS

Legacy path mempertahankan:

- province `ORDER BY id DESC`;
- nested `zonakhas` per province;
- inauguration/inaugurated NULL semantics berdasarkan status;
- legacy empty result behavior;
- redirect `/zk`.

### Scopes

Legacy Scope path mempertahankan historical update behavior Old-BE, termasuk kondisi lama yang secara praktis selalu menulis `icon` dan `image` dari field `images`. Modern path tidak dipaksa mewarisi quirk tersebut.

### About / Ekonomi Syariah

Native read-only endpoints:

- `GET /es_abouts`
- `GET /es_detailabouts/:id`
- `GET /abouts`
- `GET /detailabouts/:id`

Upload-capable update routes sengaja tetap fallback.

### KDEKS profile/reference reads

Native read-only endpoints:

- `GET /api_kdeks_list`
- `GET /api_about_kdeks`
- `GET /api_history_kdeks`
- `GET /api_maps_kdeks`

Static About/History endpoints mempertahankan array response, termasuk empty array. Maps mempertahankan success/data shape dan historical 500 failure response.

Province-specific KDEKS About/History route belum digabung ke slice ini karena response shaping-nya berbeda dan harus diuji terpisah.

### Web Profile

Native reads:

- `GET /api_web_profile`
- `GET /api_detail_webprofile/:id`

Native DB-only mutations:

- `POST /updatewebtitle` → `/titleweb`
- `POST /updateweblogo` → `/logo`
- `POST /updatewebheader` → `/header`
- `POST /updatewebcolor` → `/color`

SQL field/request body/302 redirect semantics mengikuti Old-BE dan tidak menambah `RETURNING` atau validation baru.

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

Old-BE `menu_id.split('-')` behavior dipertahankan tanpa coercion baru. Mutations tetap redirect ke `/menu` atau `/submenu`.

## Upload parity boundary

Existing transitional upload helpers **tidak boleh dianggap satu global contract untuk seluruh endpoint legacy**.

Sebelum suatu upload-heavy domain dipindahkan dari fallback, wajib dibuat inventory per route:

```text
Route
HTTP method
multipart field name
single/multiple
accepted file behavior
filter/MIME behavior
destination folder
filename behavior
DB value/public URL
replace semantics
delete semantics
no-file behavior
error behavior
redirect
```

Domain yang termasuk upload-heavy antara lain News, Files, Photo, Structure, KDEKS, Directorate, Banners, Institutions, Opini dan slider/media lain.

Shared helper hanya boleh dibuat setelah inventory domain menunjukkan bahwa helper tersebut dapat mempertahankan variasi contract masing-masing route.

## Runtime verification yang belum tersedia

Karena dependency manifest asli belum tracked dan dev runtime/database belum tersedia pada verification environment, hal berikut belum dapat dinyatakan parity penuh:

- clean `npm ci` + production build dari repository saja;
- live PostgreSQL CRUD side effects;
- real login/SSO cookie behavior di browser;
- frontend production smoke test;
- real multipart upload/replace/delete;
- Tax/KHAS/SPES upstream integration behavior.

Untuk domain yang source/CI sudah hijau, status runtime tetap **🟡 perlu verifikasi**.

## Next safe migration target

Urutan berikutnya tetap mengikuti dependency dan risiko:

1. audit + migrate **province-specific KDEKS profile/reference reads** (`/api_history_province_kdeks/:id`, `/api_about_province_kdeks/:id`) sebagai slice terpisah;
2. lanjutkan non-upload/reference domain lain satu per satu dengan gate yang sama;
3. tunda Users/security-sensitive mutations sampai reference/content reads stabil;
4. setelah non-upload stabil, mulai upload inventory per domain; jangan mengaktifkan global upload behavior sebagai pengganti contract route-specific;
5. lakukan runtime golden-master test saat manifest dependency asli, DB dev dan browser environment tersedia.

Tidak ada upload-heavy fallback yang dilepas pada tahap ini.
