# ASN CRUD (Next.js + Prisma + Tailwind)

Aplikasi CRUD untuk data ASN berikut perhitungan otomatis:
- **Jadwal KGB Berikutnya** = 2 tahun setelah *Riwayat TMT KGB*
- **Jadwal Kenaikan Pangkat Berikutnya** = 4 tahun setelah *Riwayat TMT Pangkat*

## Jalankan Lokal (SQLite)
1. Salin `.env.example` menjadi `.env` (biarkan default SQLite):
   ```bash
   cp .env.example .env
   ```
2. Install dependency:
   ```bash
   npm install
   ```
3. Generate & migrasi database:
   ```bash
   npx prisma migrate dev --name init
   ```
4. Jalankan:
   ```bash
   npm run dev
   ```
   Buka http://localhost:3000

## Deploy ke Vercel (Postgres/Neon)
1. Buat database Postgres (mis. Neon/Supabase).
2. Set Environment Variables di Vercel:
   - `DATABASE_PROVIDER=postgresql`
   - `DATABASE_URL=postgresql://<user>:<pass>@<host>:5432/<db>?sslmode=require`
3. Deploy. (Prisma `generate` berjalan otomatis pada build; lakukan migrasi via Vercel CLI atau jalankan sekali secara lokal lalu deploy).

> Catatan: SQLite tidak persisten di Vercel. Gunakan Postgres agar data tersimpan.

## Endpoint API
- `GET /api/asn` — list data
- `POST /api/asn` — buat data
- `GET /api/asn/:id` — detail
- `PUT /api/asn/:id` — update
- `DELETE /api/asn/:id` — hapus
