# Laporan Migrasi Next.js CMS KNEKS

Tanggal verifikasi: 2026-09-17

## Ringkasan

- Seluruh 149 file HTML pada `legacy/views` telah dipetakan ke halaman App Router/JSX. `legacy/views/home.html` direpresentasikan oleh halaman `/dashboard` yang sudah ada; 148 wrapper JSX tambahan dibuat untuk view lainnya.
- Seluruh halaman CMS menggunakan layout reusable `CmsShell` dengan topbar, sidebar, navigasi, dan area konten.
- Komponen reusable ditambahkan untuk form, tabel/list, tombol aksi, serta search/pagination dasar.
- Manifest kompatibilitas API sekarang statis: 276 route lama / 273 handler unik. Runtime tidak membaca atau mem-parsing `legacy/app.js`.
- Folder/kode lama tidak dihapus.
- `public` tidak terdapat pada ZIP sumber. Tidak ada file `public` yang dibuat atau dimodifikasi selama migrasi/verifikasi; runtime upload tetap menargetkan `public/uploads`.

## Struktur halaman JSX

Kelompok route yang telah dibuat meliputi:

- `/news`, `/news/create`, `/news/[id]/edit`, dan `/news/categories/...`
- `/agenda`, `/agenda/create`, `/agenda/[id]/edit`
- `/users`, `/users/create`, `/users/[id]/edit`, serta new-user/approve/rejected/change-password/whitelist
- `/profile/...` untuk contacts, ekonomi-syariah, institutions, maps, social-posts, scope, social-media, tentang-kami
- `/banners`, `/banners/login`, `/banners/welcome`
- `/kdeks/...` untuk master, provinces, pejabat, anggota, sub-anggota
- `/struktur/...` untuk pejabat, anggota, sub-anggota, dan logo struktur
- `/data/...` untuk menu, submenu, dashboard, datasets, sliders
- `/pengaturan/...` untuk menu, sub-menu, serta identitas-web (color/header/logo/title)
- `/files` dan `/files/categories`; backup view lama dipisahkan di `/files/legacy-backup`
- `/photos`, `/videos`, `/tagging`, `/opini`, `/zona-khas`, `/directorates`, `/divisions`, `/hot-issues/...`
- `/login` dan `/register`

Metadata field, tabel, dan referensi endpoint dari HTML lama disimpan statis di `src/config/legacy-pages.js`, sehingga halaman baru tidak membaca HTML legacy saat runtime.

## API compatibility

`src/server/legacy-route-manifest.js` berisi manifest statis 276 route. Perbandingan statis dengan deklarasi `legacy/app.js` menunjukkan seluruh 273 nama handler unik yang dirujuk manifest tersedia pada handler domain.

Representative route yang diverifikasi keberadaannya pada manifest:

- Login: `POST /do_login`, `POST /act_login`
- News: `POST /insertnews`, `POST /updatenews`, `GET /newsdetail/:id`, `GET /deletenews/:id/:foto`
- Users: `GET /users`, `GET /users_detail/:id`, `POST /insertusers`, `POST /updateusers`
- Agenda: `GET /agenda`, `POST /insertagenda`, `GET /agendadetails/:id`, `POST /updateagenda`, `GET /deleteagenda/:id`
- Data Menu legacy: `GET /data_menu`, `GET /detail_data_menus/:id`, `POST /insert_data_menu`, `POST /update_data_menu`, `GET /delete_data_menu/:id`
- Files: `GET /files`, `POST /insertfiles`, `GET /filesdetails/:id`, `GET /deletefilesupload/:id/:file`
- KDEKS representative: `GET /api_kdeks`, `POST /insertkdeks`, `POST /updatekdeks`
- Struktur representative: `GET /structure`
- Profile representative: `GET /institutions`
- Hot Issue representative: `GET /hotissue`
- Banner representative: `GET /slideshow`
- Directorate representative: `GET /directorat`
- Zona KHAS representative: `GET /zona_khas`

Catatan: verifikasi di atas adalah verifikasi struktur/manifest, bukan request HTTP live ke database, karena dependency aplikasi tidak dapat diinstal pada sandbox verifikasi.

## Repository / service / route

Pola bersih repository-service-route diterapkan penuh pada Data Menu:

- `src/server/repositories/data-menu.repository.js` — SQL/database saja.
- `src/server/services/data-menu.service.js` — validasi dan logika bisnis.
- `src/app/api/data-menus/route.js` dan `src/app/api/data-menus/[id]/route.js` — HTTP Next.js.

Handler domain lama tetap dipertahankan aktif melalui compatibility adapter agar URL/method/request/response frontend lama tidak terputus. Karena handler lama masih berisi campuran SQL dan `req/res`, migrasi repository/service untuk domain News, Users, Agenda, Files, KDEKS, dsb. masih harus dilanjutkan satu per satu sebelum compatibility layer dapat dilepas. Tidak ada handler lama yang dihapus.

## Upload

`src/server/upload-policy.js` dan adapter kompatibilitas sekarang melakukan:

- batas ukuran default 50 MB (`MAX_UPLOAD_BYTES`);
- whitelist ekstensi dan pemeriksaan MIME;
- sanitasi field/filename dan nama file acak;
- validasi folder relatif dan proteksi path traversal;
- penyimpanan hanya di `<project>/public/uploads/<folder>`;
- cleanup file yang baru disimpan bila parsing/upload atau handler gagal / menghasilkan status >= 400;
- dukungan field multipart tunggal maupun multi-file sesuai adapter lama.

Path penghapusan file pada handler lama tidak lagi hardcoded ke `/var/www/html/...`; default memakai `<project>/public/uploads` dan dapat dioverride dengan `PUBLIC_UPLOADS_DIR`.

## Keamanan dan konfigurasi

- Daftar origin lama dan `CORS_ORIGINS` pada `src/middleware.js` dipertahankan.
- Preflight `OPTIONS` tetap dibalas 204 oleh middleware.
- CSP tetap longgar (`frame-ancestors *`) sehingga tidak memblokir iframe/aset legacy.
- Adapter cookie sekarang meneruskan `domain`, `secure`, `httpOnly`, `sameSite`, `expires`, dan clear-cookie options yang sebelumnya hilang.
- Password MySQL hardcoded di `src/server/legacy-db/config.js` dihapus dari source dan diganti `LEGACY_MYSQL_*` environment variables.
- `.env.example` diperbarui tanpa kredensial asli.
- Proxy Tax Holiday, Tax Allowance, Tax Super Deduction, Tax Bea Masuk, KHAS, dan SPES tetap ada di `next.config.js`.

## Hasil verifikasi

Berhasil:

- `node --check` pada manifest, adapter, upload policy, repository/service Data Menu, middleware, dan `next.config.js`.
- 149/149 legacy view memiliki definisi migrasi dan route JSX yang sesuai.
- 276/276 route compatibility termanifestasi secara statis; seluruh 273 handler unik terpetakan ke export handler domain.
- Tidak ada runtime parser/read terhadap `legacy/app.js`.
- Tidak ada password literal hardcoded yang ditemukan lagi pada source `src` dengan scan pola sederhana.
- Konfigurasi proxy Tax/KHAS/SPES terdeteksi tetap ada.
- Tidak ada file lama yang dihapus.

Tidak dapat diselesaikan di sandbox ini:

- `npm ci` sudah dijalankan dua kali tetapi keduanya timeout sebelum dependency terpasang.
- Akibat dependency Next.js tidak tersedia, `npm run build` berhenti dengan `next: not found`; ini bukan hasil kompilasi aplikasi.
- Aplikasi tidak dapat dijalankan sehingga request HTTP live, koneksi database, login real, cookie browser, CRUD database, upload real, dan proxy upstream tidak dapat diuji end-to-end.

## Pekerjaan lanjutan sebelum compatibility layer dilepas

1. Jalankan `npm ci && npm run build` pada lingkungan dengan akses registry npm dan Node 20-22.
2. Sediakan PostgreSQL/DB dev yang sesuai `.env`, kemudian jalankan `npm start` dan smoke-test endpoint representative di atas.
3. Migrasikan handler domain yang masih aktif di `src/server/repositories/handlers` satu domain per tahap menjadi repository murni + service + route handler; pertahankan compatibility manifest sampai frontend tidak lagi memakai endpoint legacy.
4. Setelah domain tertentu lulus test parity request/response/status/cookie/upload, baru pindahkan handler legacy domain tersebut menjadi arsip.
