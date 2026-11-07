# REI ROBUX Racing Club

Website toko Robux berbasis Next.js dengan checkout WhatsApp, pencatatan pesanan di Supabase, halaman admin, dan stok publik.

## Hosting Netlify
Repository ini dikonfigurasi untuk Netlify melalui GitHub. Netlify membangun aplikasi dengan `npm run build` dan plugin Next.js Netlify.

## Environment variables
Di Netlify > Project configuration > Environment variables, atur variabel untuk Production:

- `ADMIN_PASSWORD`: password login admin.
- `ADMIN_SESSION_SECRET`: secret acak panjang untuk sesi admin.
- `SUPABASE_URL`: Project URL dari Supabase.
- `SUPABASE_SERVICE_ROLE_KEY`: service_role key Supabase. Rahasiakan; jangan pernah letakkan di kode frontend atau kirim lewat chat.

Setelah mengubah environment variables, jalankan deploy ulang.

## Setup database (wajib satu kali)
1. Buka Supabase Dashboard untuk project yang URL-nya cocok dengan `SUPABASE_URL`.
2. Masuk ke SQL Editor.
3. Buka file `supabase/schema.sql` di repository ini, salin seluruh isinya, lalu jalankan di SQL Editor.
4. Pastikan query selesai tanpa error.

File SQL membuat tabel `robux_stock` dan `robux_orders`, menginisialisasi baris stok awal jika belum ada, serta membuat fungsi transaksi `complete_robux_order` untuk menyelesaikan pesanan dan mengurangi stok secara atomik. Baris stok yang sudah ada tidak ditimpa.

Setelah database siap, buka `/admin`, login, lalu masukkan stok tersedia awal melalui panel **ATUR STOK ROBUX**.

## Alur pesanan
- Pembeli memilih nominal dan mengisi username serta display name.
- Website menyimpan pesanan berstatus pending ke Supabase.
- Setelah pesanan tersimpan, WhatsApp terbuka dengan ID pesanan.
- Admin memeriksa pembayaran dan pengiriman Robux, lalu menandai pesanan selesai.
- Fungsi database mengurangi stok secara atomik; stok publik dibaca dari endpoint `/api/stock`.

## Jalankan lokal
1. Install Node.js LTS.
2. Jalankan `npm install`.
3. Atur environment variables pada `.env.local` (jangan commit file ini).
4. Jalankan `npm run dev`.
5. Buka `http://localhost:3000`.

## Keamanan
Jangan pernah mengekspos atau membagikan `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_PASSWORD`, atau `ADMIN_SESSION_SECRET`. Akses database admin dilakukan dari server.
