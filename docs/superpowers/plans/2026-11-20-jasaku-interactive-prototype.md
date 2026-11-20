# JASAKU Interactive UI/UX Prototype Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Membangun prototipe web interaktif skala besar (Unified Interactive Studio) untuk platform startup "JASAKU" (PT Jasaku Solusi Digital) yang mencakup Gerbang Pemilihan Peran Demo, Aplikasi Mobile Pelanggan (4 Bottom Nav: HOME, PESANAN, CHAT, PROFIL), dan Web Dashboard Administrator (Fixed Left Sidebar dengan 10 modul terintegrasi) dengan sinkronisasi data reaktif *real-time* berbasis Rekening Bersama (*Escrow Vault*).

**Architecture:** Single-file HTML5/CSS3/JavaScript yang mandiri (`jasaku_interactive_prototype.html`) didukung oleh Tailwind CSS CDN, Font Inter, inline SVG icons beresolusi tinggi, logo resmi `logo_jasaku_extracted.png` (disematkan sebagai Base64 dan fallback path lokal), serta arsitektur state management reaktif dalam memori yang menghubungkan alur transaksi pelanggan dengan modul pemantauan dan intervensi admin secara instan.

**Tech Stack:** HTML5, CSS3, Tailwind CSS (CDN), Vanilla JavaScript (ES6+ Reactive State Machine), inline SVG icons (Lucide/Heroicons inspired), Base64 Image Inlining, Local Storage persistence.

**Spec:** [PRD_USERFLOW_DAN_ADMIN_PANEL_JASAKU.md](file:///c:/Users/krisn/Desktop/PROTOTYPE%20JASAKU/PRD_USERFLOW_DAN_ADMIN_PANEL_JASAKU.md) dan [PROMPT_SIAP_KIRIM_KE_AI_JASAKU.md](file:///c:/Users/krisn/Desktop/PROTOTYPE%20JASAKU/PROMPT_SIAP_KIRIM_KE_AI_JASAKU.md).

## Global Constraints

- Halaman Awal wajib menyajikan Role Gate DEMO tanpa form login/password/OTP/registrasi (Hanya 2 tombol: USER dan ADMIN).
- Customer App wajib memiliki Bottom Navigation Bar fixed di bagian bawah layar dengan TEPAT 4 MENU: HOME, PESANAN, CHAT, PROFIL.
- Admin Panel wajib memiliki Fixed Left Sidebar navigation (lebar 250px-260px) dengan tepat 10 modul fungsional dan tombol keluar di bagian paling bawah.
- Palet warna resmi: Deep Teal `#16627A` (Primary), Vibrant Orange `#EE7A34` (Secondary/Accent), Soft Slate `#F8FAFC` / `#FFFFFF` (Surfaces), Dark Charcoal `#161717` (Text), Emerald Green `#10B981` (Escrow Safe), Amber `#F59E0B` (Dispute), Crimson `#EF4444` (Batal/Reject).
- Logo resmi JASAKU dari `logo_jasaku_extracted.png` wajib ditampilkan pada header, splash, dan profil.
- Logika transaksi wajib menerapkan Escrow Vault: Biaya Proteksi Rp2.000, Kupon MHSBARU -Rp15.000, komisi platform 10%, margin bersih per order Rp12.800, target BEP 415 transaksi/bulan.
- Dispute Resolution Center wajib memuat ruang investigasi komplain 1x24 jam dengan 3 opsi putusan admin: Refund 100%, Rilis 100%, dan Split Settlement.

## Review Focus

1. **Sinkronisasi Escrow & Live Order:** Pesanan baru yang dibuat di Customer App harus langsung terdaftar di Admin Live Order Feed (Modul 6) dan menambah saldo Escrow Vault tanpa perlu refresh halaman.
2. **Kupon Promo & Proteksi Biaya:** Validasi input kupon "MHSBARU" harus memotong tepat Rp15.000 dari subtotal, ditambah biaya proteksi Rp2.000, dan tercermin pada rincian tagihan checkout.
3. **Alur Komplain Garansi 1x24 Jam:** Ketika konsumen mengklik "Ajukan Komplain", status pesanan berubah menjadi `DISPUTE_OPENED`, dana di escrow dibekukan, dan tiket masuk ke Dispute Center (Modul 7) dengan timer SLA 24 jam.
4. **Tiga Putusan Sengketa Admin:** Eksekusi Putusan 1 (Refund), Putusan 2 (Rilis), atau Putusan 3 (Split rasio 50:50) harus mendistribusikan dana secara presisi dan mengubah status pesanan pelanggan.
5. **Kurasi KYC & Pencairan Payout:** Approval KYC di Modul 2 harus mempublikasikan mitra ke pencarian Customer; Approval Payout di Modul 8 harus memvalidasi nama KTP vs nama rekening bank sebelum mendebet saldo dompet mitra.

---

### Task 1: Environment & Asset Inlining Scaffolding
**Files:**
- Create: `scripts/prepare_assets.py`
- Test: Verify Base64 string generation from `logo_jasaku_extracted.png`
- Produces: Base64 data URI of `logo_jasaku_extracted.png` and color theme tokens.

- [ ] **Step 1: Write script to convert `logo_jasaku_extracted.png` into clean base64 string**
- [ ] **Step 2: Run script and verify output size and validity**
- [ ] **Step 3: Document Base64 snippet for inclusion in prototype HTML**

---

### Task 2: Core State Engine & Realistic Mock Data Setup
**Files:**
- Create: `jasaku_interactive_prototype.html` (State Engine block)
- Test: Console verification of initial state (5 Categories, 6 Partners, 4 Mock Orders, 3 KYC applicants, 2 Disputes, 2 Payouts, Financial Ledger).

- [ ] **Step 1: Define comprehensive reactive state structure with 15 state machine codes**
- [ ] **Step 2: Seed realistic mock data (AC, Cleaning, Elektronik, Tukang, Pindahan) with verified partner profiles**
- [ ] **Step 3: Implement state mutation helpers (`createOrder`, `updateOrderStatus`, `applyVoucher`, `submitDispute`, `executeDisputeVerdict`, `approveKYC`, `rejectKYC`, `processPayout`)**

---

### Task 3: Demo Role Gate Screen (SCR-01) & Global Navigation Switcher
**Files:**
- Modify: `jasaku_interactive_prototype.html` (Role Gate component & Shell container)
- Test: Clicking USER switches to Customer Mobile Shell; clicking ADMIN switches to Admin Web Dashboard; clicking "Ganti Peran" returns to Gate.

- [ ] **Step 1: Build Role Gate layout with JASAKU official logo, modern background, and value proposition highlights**
- [ ] **Step 2: Create two primary interactive cards: [MASUK SEBAGAI PELANGGAN / USER] and [MASUK SEBAGAI ADMINISTRATOR / ADMIN]**
- [ ] **Step 3: Implement persistent "Ganti Peran Demo" button and Quick Scenario Jumper floating toolbar**

---

### Task 4: Customer Mobile View: 4 Fixed Bottom Nav Tabs & Discovery
**Files:**
- Modify: `jasaku_interactive_prototype.html` (Customer View & Bottom Nav)
- Test: Verify fixed bottom navigation has exactly 4 tabs (HOME, PESANAN, CHAT, PROFIL) with Deep Teal active styling.

- [ ] **Step 1: Render persistent Bottom Navigation Bar with 4 tabs and dynamic notification badge counters**
- [ ] **Step 2: Build HOME Screen with address header, search bar, Escrow Trust Banner, 5 Category Cards, and promo banner**
- [ ] **Step 3: Build PESANAN Tab with filter chips ('Semua', 'Berlangsung', 'Selesai', 'Sengketa')**
- [ ] **Step 4: Build CHAT Tab and interactive Chat Room with technician (complete with UU PDP bank privacy filter)**
- [ ] **Step 5: Build PROFIL Tab with user stats, promo vouchers, security settings, and demo switcher**

---

### Task 5: Customer Booking, Escrow Checkout & Tracking Lifecycle
**Files:**
- Modify: `jasaku_interactive_prototype.html` (Service Detail, Checkout, Payment, Tracking)
- Test: Full end-to-end booking: Pick Service -> Select Schedule -> Pin Map Address -> Apply 'MHSBARU' (-Rp15.000) + Rp2.000 fee -> Pay QRIS -> Escrow Locked -> Advance Status to Completed or Dispute.

- [ ] **Step 1: Build Service Detail Screen with package options, included tasks, rating reviews, and verified partner info**
- [ ] **Step 2: Build Checkout Screen with date/time picker, interactive map coordinate pin, transparent pricing breakdown, and voucher coupon input**
- [ ] **Step 3: Build Dynamic QRIS & VA Payment Modal with instant simulation trigger**
- [ ] **Step 4: Build Tracking & Escrow Lifecycle Screen with real-time status tracker, step advancement simulator, Before/After photo viewer, "Konfirmasi Selesai" button, and "Ajukan Komplain 1x24 Jam" modal**
- [ ] **Step 5: Build Rating & Review Screen (1-5 stars, feedback chips, photo upload)**

---

### Task 6: Admin Web Dashboard: Left Sidebar & Modul 1-5
**Files:**
- Modify: `jasaku_interactive_prototype.html` (Admin Layout & Modules 1-5)
- Test: 260px fixed left sidebar, Module 1 KPIs with BEP 415 order tracker, Module 2 KYC approval/rejection modal, Module 3 Partner directory with <4.0 rating badge, Module 4 Customer directory, Module 5 Service catalog & 10% commission config.

- [ ] **Step 1: Build Admin Desktop Shell with fixed 260px Left Sidebar, top utility bar, and live Escrow Vault ticker**
- [ ] **Step 2: Implement Modul 1: Dashboard Overview (5 KPI metric cards, BEP 415 order progress bar, SVG charts, Urgent Task Feed)**
- [ ] **Step 3: Implement Modul 2: Verifikasi Mitra KYC (Queue table, modal with KTP zoom inspection, selfie with KTP, Approve/Reject with reason)**
- [ ] **Step 4: Implement Modul 3: Manajemen Master Mitra (Directory table, rating <4.0 amber badge, Suspend/Reactivate actions)**
- [ ] **Step 5: Implement Modul 4: Manajemen Pengguna Customer (Customer directory, GMV tracking, Blacklist/Unblock dialog)**
- [ ] **Step 6: Implement Modul 5: Katalog Layanan & Konfigurasi Tarif (5 Categories, floor/ceiling price, 10% platform fee, emergency toggle)**

---

### Task 7: Admin Web Dashboard: Modul 6-10 (Escrow, Disputes, Payouts, Ledger, Audit)
**Files:**
- Modify: `jasaku_interactive_prototype.html` (Admin Modules 6-10)
- Test: Modul 6 Live Order Feed & Escrow balance match; Modul 7 Dispute Center with 3 verdict choices; Modul 8 Payout queue with KTP matching; Modul 9 Financial Ledger with simulated export; Modul 10 Settings & PDP Audit Trail.

- [ ] **Step 1: Implement Modul 6: Live Order Feed & Audit Escrow Vault (Real-time order statuses, escrow vault balance sync, emergency manual override)**
- [ ] **Step 2: Implement Modul 7: Dispute Resolution Center (SLA countdown, inspection room comparing Customer photo vs Partner photo vs Chat audit, 3 verdict actions: 100% refund, 100% release, split settlement)**
- [ ] **Step 3: Implement Modul 8: Manajemen Payout Mitra (Disbursement queue, KTP vs bank name check, Approve & Transfer API simulation, Reject modal)**
- [ ] **Step 4: Implement Modul 9: Rekonsiliasi Finansial & Laporan (General Ledger: Escrow, 10% commission, Rp2.000 fee, Rp1.200 gateway cost, Net contribution Rp12.800/order, simulated Excel/PDF export)**
- [ ] **Step 5: Implement Modul 10: Pengaturan Global & Log Keamanan (System parameters form, immutable PDP audit log table)**
- [ ] **Step 6: Implement bottom "Keluar ke Pemilihan Demo" button in Left Sidebar**

---

### Task 8: Verification, Cross-Role Data Reactivity & Polish
**Files:**
- Test: Open `jasaku_interactive_prototype.html` in browser, verify layout responsiveness, test cross-role reactive state synchronization, test quick scenario shortcuts, and verify zero console errors.

- [ ] **Step 1: Verify all 15 state machine transitions and reactive data synchronization between Customer and Admin**
- [ ] **Step 2: Verify visual design system fidelity: Deep Teal (`#16627A`), Vibrant Orange (`#EE7A34`), high-resolution official logo rendering, and typography**
- [ ] **Step 3: Verify no dead-end navigation on any screen**
- [ ] **Step 4: Provide comprehensive user guide and testing scenarios for the user**
