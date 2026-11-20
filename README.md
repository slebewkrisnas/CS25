# JASAKU — Prototipe Aplikasi Layanan Jasa & Admin Panel

Prototipe interaktif platform on-demand jasa teknisi dan rumah tangga (Manado, Sulawesi Utara) dengan proteksi Rekening Bersama (*Escrow Vault*) serta 10 modul pengawasan Admin Panel.

---

## 🚀 Live Demo (GitHub Pages)

Buka prototipe langsung di browser:
👉 **[https://<username>.github.io/<repository-name>/](https://<username>.github.io/<repository-name>/)**

*(Atau cukup buka file `index.html` langsung di browser Chrome / Edge / Safari Anda).*

---

## 📱 Fitur Utama Prototipe

### 1. Aplikasi Pelanggan (Mobile Shell Simulator)
- **4 Tab Navigasi Murni:** HOME, PESANAN, CHAT, PROFIL.
- **5 Kategori Layanan:** Service AC, Cleaning Service, Perbaikan Elektronik, Perbaikan Rumah, Jasa Pindahan.
- **Peta Interaktif Manado:** Penyesuaian titik GPS realistis wilayah **Tikala Ares**, **Teling**, dan **Koka**.
- **Checkout & Kupon:** Stepper unit, pilihan jam WITA, voucher promo `MHSBARU` (-Rp15.000), serta QRIS Dinamis.
- **Pelacakan Bertahap:** 5 status eksekusi layanan berurutan dengan konfirmasi penyelesaian kerja & rilis dana escrow.

### 2. Admin Panel Terintegrasi (10 Modul Fungsional)
1. **Dashboard Overview:** Metrik real-time & pelacak BEP 415 order.
2. **Verifikasi Mitra KYC:** Zoom inspeksi foto KTP & sertifikasi kompetensi.
3. **Manajemen Master Mitra:** Status blokir/aktifasi & rating performa.
4. **Manajemen Pengguna:** Database pelanggan & rekam jejak pesanan.
5. **Katalog Layanan & Tarif:** Manajemen harga & kuota harian.
6. **Live Order & Escrow Vault:** Audit dana tertahan & nomor rekening penampungan.
7. **Dispute Resolution Center:** Mediasi sengketa pelanggan-mitra dengan 3 putusan (Refund 100%, Rilis 100%, Split 50:50).
8. **Manajemen Payout Mitra:** Verifikasi pencairan saldo ke Bank SulutGo (BSG) / BCA / Mandiri.
9. **Rekonsiliasi & Laporan Keuangan:** Laba/rugi kotor dan pembagian komisi 80:20.
10. **Pengaturan & Audit Trail UU PDP:** Log aktivitas *immutable* kepatuhan UU No. 27/2022.

---

## 🛠️ Struktur Repositori

```text
├── index.html            # File mandiri (Zero-Dependency) untuk GitHub Pages
├── src/                  # Kode sumber modular
│   ├── styles.css        # Token desain, animasi pin, & shadow CS25
│   ├── icons.js          # SVG Icon Lucide registry
│   ├── state.js          # Reactive state engine & mock data Manado
│   ├── customer_views.js # Tampilan antarmuka Customer App
│   ├── admin_views.js    # 10 modul tampilan Admin Panel
│   └── app_controller.js # Action controller & logika bisnis
├── scripts/
│   └── build_prototype.py # Skrip compiler otomatis ke index.html
└── logo_jasaku_extracted.png # Master aset logo JASAKU
```

---

## 🌐 Cara Mengaktifkan GitHub Pages
1. Masuk ke halaman repositori di GitHub.
2. Buka tab **Settings** -> pilih menu **Pages** di sebelah kiri.
3. Pada bagian **Build and deployment > Branch**, pilih:
   - Branch: `main`
   - Folder: `/(root)`
4. Klik **Save**. Tunggu 1–2 menit, link demo prototipe Anda akan aktif!
