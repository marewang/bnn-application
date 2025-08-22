# ASN CRUD (Next.js + Prisma + Tailwind)

Aplikasi CRUD untuk data ASN berikut perhitungan otomatis:
- **Jadwal KGB Berikutnya** = 2 tahun setelah *Riwayat TMT KGB*
- **Jadwal Kenaikan Pangkat Berikutnya** = 4 tahun setelah *Riwayat TMT Pangkat*

## Jalankan Lokal
1. Salin `.env.example` menjadi `.env` dan isi `DATABASE_URL` Postgres (Neon/Supabase):
   ```bash
   cp .env.example .env
   # edit .env
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

## Deploy ke Vercel
1. Tambah Environment Variable (Preview & Production):
   - `DATABASE_URL=postgresql://<user>:<pass>@<host>:5432/<db>?sslmode=require`
2. Build Command (disarankan):
   ```
   npx prisma migrate deploy && next build
   ```
3. Deploy.

> Catatan:
> - Prisma tidak mengizinkan `env()` pada `provider`, sehingga schema ini memakai `provider = "postgresql"`.
> - API route diset `runtime = 'nodejs'` agar kompatibel dengan Prisma di serverless.
