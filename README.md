# CMS KNEKS

## Struktur Next.js (baru)

Antarmuka CMS sekarang dimulai dari `src/app` menggunakan Next.js App Router dan JSX.
Folder `public` tetap dipertahankan tanpa perubahan. Antarmuka dan backend
Express lama telah dipindahkan ke `legacy/` dan bukan bagian dari aplikasi aktif.

Struktur utama:

```
src/app/                  # route dan API Next.js
src/components/           # topbar, sidebar, tabel, dan form reusable
src/config/resources.js   # definisi modul/kolom/form
src/lib/                  # koneksi dan repository PostgreSQL
src/server/legacy-db/     # handler database lama yang dipanggil adapter Next.js
legacy/                   # arsip app.js dan views HTML lama
```

Contoh modul yang sudah dipindahkan adalah **Data Menu**:

- `/data-menu` — daftar data dalam tabel
- `/data-menu/create` — formulir tambah
- `/data-menu/:id/edit` — formulir ubah
- `/api/data-menus` — API Next.js untuk daftar dan tambah data

Jalankan aplikasi baru dengan `npm run dev`.

## Keamanan dan CORS

`src/middleware.js` menjaga CORS lama yang menggunakan `CORS_ORIGINS`, menangani
preflight `OPTIONS`, dan menerapkan header keamanan yang aman untuk CMS tanpa
menutup kemampuan halaman untuk di-embed. Tambahkan origin frontend baru dalam
`CORS_ORIGINS` dengan pemisah koma.

---

# Arsip Express lama

Kode Express lama kini berada di `legacy/app.js` dan `legacy/views/`. Handler
database dipindahkan ke `src/server/legacy-db/` dan dipanggil melalui adapter
Next.js agar URL API lama tetap tersedia tanpa server Express.

## Menjalankan di Windows

1. Pastikan `node --version` dan `npm --version` berhasil.
2. Buat database PostgreSQL kosong, misalnya `kneks_new`.
3. Import `dump.sql` ke database tersebut.
4. Salin `.env.example` menjadi `.env`, lalu isi kredensial PostgreSQL lokal.
5. Pasang dependency dan jalankan aplikasi.

```powershell
cd backend-cms-kneks
Copy-Item .env.example .env
psql -U postgres -d kneks_new -f dump.sql
npm ci
npm run dev
```

UI Next.js tersedia di http://localhost:3000.

Saat `NODE_ENV=development`, request dari `localhost` dan `127.0.0.1` di semua
port lokal diterima. Origin tambahan dapat dimasukkan ke `CORS_ORIGINS` dengan
pemisah koma. Pada production, hanya whitelist bawaan dan `CORS_ORIGINS` yang
diterima.

## Service opsional

- Tax simulator menggunakan service terpisah pada port 8000 dan MySQL. CMS akan
  meneruskan route tax ke port tersebut; halaman selain tax tetap dapat berjalan
  ketika service tax belum aktif.
- Zona KHAS disarankan berjalan sebagai service terpisah pada port 4001. Jika
  ingin memasangnya langsung ke CMS, set `ENABLE_KHAS_IN_CMS=true` dan pastikan
  dependency serta konfigurasi `kneks_react/backend-khas` sudah tersedia.
- Quiz SPES disajikan dari `kneks_react/quiz-kneks/dist` pada route `/spes`.

Jangan commit file `.env` atau kredensial database asli.
# New-ME
