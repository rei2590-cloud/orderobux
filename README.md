# Robux Visend Store

Ini adalah source code website toko Robux berbasis Next.js. Semua file dapat dibuka dan diedit.

## Edit toko
Buka `app/page.js`, lalu ubah bagian `PENGATURAN TOKO`:
- `STORE_NAME`: nama toko.
- `WHATSAPP_ADMIN`: nomor WhatsApp admin format internasional tanpa tanda +, contoh `6281234567890`.
- `PRODUCTS`: daftar paket, jumlah Robux, harga, label, dan emoji.

Harga ditulis sebagai angka tanpa titik. Contoh `15000` akan tampil sebagai Rp15.000.

## Jalankan di komputer
1. Install Node.js versi LTS.
2. Buka terminal pada folder project.
3. Jalankan `npm install`.
4. Jalankan `npm run dev`.
5. Buka `http://localhost:3000`.

## Deploy ke Vercel
Upload semua isi folder ini ke repository GitHub. Di Vercel pilih Add New > Project > Import repository > Deploy.

## Catatan
Versi ini mengirim pesanan ke WhatsApp. Belum ada database, login admin, atau pembayaran otomatis. Ubah harga dan nomor WhatsApp sebelum website dipublikasikan.