# Arsip aplikasi Express

Folder ini menyimpan sumber aplikasi sebelum migrasi Next.js:

- `app.js` — server Express dan route lama.
- `views/` — halaman HTML lama.

Handler query lama telah dipindahkan ke `src/server/legacy-db/` dan dijalankan
oleh adapter Next.js untuk menjaga URL API lama tetap sama. Implementasi baru
sekarang dipisahkan menurut domain di `src/server/repositories/handlers/`.
Folder `public` berada di root dan sengaja tidak dipindahkan.
