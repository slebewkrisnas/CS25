// JASAKU Admin Web Dashboard Views (Fixed 250-260px Left Sidebar + 10 Functional Modules)

function renderAdminShell() {
  const activeModule = appState.adminModule || 1;

  // Compute live financial summary for top bar & overview
  const totalGmv = appState.orders.reduce((sum, o) => sum + (o.totalInvoice || 0), 0);
  const completedOrders = appState.orders.filter(o => o.status === 'ORDER_COMPLETED');
  const netPlatformRevenue = completedOrders.length * 14000; // 10% (~Rp12k) + Rp2.000 protection
  const escrowHeld = appState.orders
    .filter(o => ['FUNDS_DEPOSITED_ESCROW', 'FUNDS_FROZEN_ESCROW'].includes(o.escrowStatus))
    .reduce((sum, o) => sum + (o.totalInvoice || 0), 0);

  return `
    <div class="min-h-screen bg-[#F1F5F9] flex flex-col font-sans select-none text-[#161717]">
      
      <!-- Top Global Bar (Header) -->
      <header class="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-40 shadow-sm">
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-3">
            <img src="logo_jasaku_extracted.png" alt="Logo" class="h-9 w-auto rounded object-contain" onerror="this.src=window.JASAKU_LOGO_BASE64">
            <div>
              <span class="text-base font-black tracking-tight text-[#16627A]">JASAKU • Admin Control Center</span>
              <span class="text-[10px] block text-slate-500 font-semibold">Sistem Pengawasan Transaksi & Escrow Vault</span>
            </div>
          </div>
        </div>

        <!-- Top Right Utilities -->
        <div class="flex items-center gap-4">
          
          <!-- Live Escrow Vault Indicator -->
          <div class="hidden md:flex items-center gap-2 bg-[#E8F4F8] border border-teal-200 px-3 py-1.5 rounded-xl">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <div class="text-left">
              <span class="text-[9px] uppercase font-extrabold text-[#16627A] block">Escrow Vault Aktif</span>
              <span class="text-xs font-black text-[#16627A]">${formatRupiah(escrowHeld)}</span>
            </div>
          </div>

          <!-- Switch to Customer View & Gate -->
          <button onclick="switchRole('customer')" class="px-2.5 sm:px-3 py-1.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-[#EE7A34] text-xs font-bold border border-orange-200 transition flex items-center gap-1.5 shadow-sm">
            ${ICONS.home}
            <span class="hidden sm:inline">Buka Aplikasi Pelanggan →</span>
            <span class="sm:hidden">App Pelanggan</span>
          </button>
          <button onclick="switchRole('gate')" class="sm:hidden px-2 py-1.5 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold border border-slate-200 transition" title="Ganti Peran">
            ${ICONS.exit}
          </button>

          <!-- Admin Profile Badge -->
          <div class="flex items-center gap-2.5 pl-2 sm:pl-3 border-l border-slate-200">
            <div class="w-8 h-8 rounded-full bg-[#16627A] text-white flex items-center justify-center text-xs font-black shadow-sm shrink-0">
              KA
            </div>
            <div class="hidden lg:block text-left leading-tight">
              <span class="text-xs font-black text-slate-800 block">Krisna Anugrah</span>
              <span class="text-[10px] text-emerald-600 font-bold">Super Admin • CEO</span>
            </div>
          </div>

        </div>
      </header>

      <!-- Main Admin Body (Fixed Left Sidebar + Scrollable Content) -->
      <div class="flex-1 flex flex-col md:flex-row overflow-hidden">
        
        <!-- FIXED LEFT SIDEBAR (PRD Rule 1.C: Width 250px-260px with 10 Modules, Responsive Horizontal on Mobile) -->
        <aside class="w-full md:w-[260px] bg-white border-b md:border-b-0 md:border-r border-slate-200 flex flex-col justify-between shrink-0 select-none shadow-sm md:h-[calc(100vh-64px)] md:sticky md:top-16">
          
          <!-- Navigation Menu Modules List -->
          <div class="py-2.5 md:py-4 px-3 flex md:flex-col overflow-x-auto md:overflow-y-auto no-scrollbar custom-scrollbar gap-1.5 md:gap-0 md:space-y-1 shrink-0">
            <span class="hidden md:block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider px-3 mb-2">
              10 Modul Manajemen
            </span>

            ${[
              { id: 1, name: 'Dashboard Overview', icon: 'dashboard', badge: 'Live' },
              { id: 2, name: 'Verifikasi Mitra KYC', icon: 'kyc', badge: appState.partners.filter(p=>p.kycStatus==='PENDING').length || null, badgeColor: 'bg-amber-500' },
              { id: 3, name: 'Manajemen Master Mitra', icon: 'partners', badge: null },
              { id: 4, name: 'Manajemen Pengguna', icon: 'customers', badge: null },
              { id: 5, name: 'Katalog Layanan & Tarif', icon: 'catalog', badge: '10%' },
              { id: 6, name: 'Live Order & Escrow Vault', icon: 'liveOrder', badge: appState.orders.filter(o=>!['ORDER_COMPLETED', 'RESOLVED_REFUNDED'].includes(o.status)).length || null, badgeColor: 'bg-teal-600' },
              { id: 7, name: 'Dispute Resolution Center', icon: 'dispute', badge: appState.disputes.filter(d=>d.status==='OPEN').length || null, badgeColor: 'bg-red-500' },
              { id: 8, name: 'Manajemen Payout Mitra', icon: 'payout', badge: appState.payouts.filter(p=>p.status==='PENDING').length || null, badgeColor: 'bg-orange-500' },
              { id: 9, name: 'Rekonsiliasi & Laporan', icon: 'ledger', badge: null },
              { id: 10, name: 'Pengaturan & Log Keamanan', icon: 'settings', badge: 'PDP' }
            ].map(mod => `
              <button onclick="showAdminModule(${mod.id})" class="whitespace-nowrap md:whitespace-normal md:w-full flex items-center justify-between px-3 py-2 md:py-2.5 rounded-xl text-xs font-bold transition text-left shrink-0 ${activeModule === mod.id ? 'bg-[#16627A] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 bg-slate-50 md:bg-transparent border border-slate-200 md:border-transparent'}">
                <div class="flex items-center gap-2.5 truncate">
                  <span class="${activeModule === mod.id ? 'text-white' : 'text-slate-400'}">
                    ${ICONS[mod.icon] || ICONS.dashboard}
                  </span>
                  <span class="truncate">${mod.name}</span>
                </div>
                ${mod.badge ? `
                  <span class="ml-2 text-[9px] font-black px-1.5 py-0.2 rounded-full text-white ${mod.badgeColor || (activeModule === mod.id ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700')}">
                    ${mod.badge}
                  </span>
                ` : ''}
              </button>
            `).join('')}
          </div>

          <!-- Bottom Exit Button (PRD Requirement: Keluar ke Pemilihan Demo) -->
          <div class="hidden md:block p-3 border-t border-slate-200 shrink-0 bg-slate-50">
            <button onclick="switchRole('gate')" class="w-full py-2.5 px-3 rounded-xl bg-white hover:bg-red-50 border border-slate-200 hover:border-red-300 text-red-600 font-extrabold text-xs transition flex items-center justify-center gap-2 shadow-sm">
              ${ICONS.exit}
              Keluar ke Pemilihan Demo
            </button>
          </div>

        </aside>

        <!-- Right Main Content Area -->
        <main class="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
          ${renderAdminModuleContent(activeModule)}
        </main>

      </div>

      <!-- Dynamic Admin Modal Layer (KYC Zoom & Dispute Room) -->
      <div id="admin-modal-layer"></div>

    </div>
  `;
}

// Module Dispatcher
function renderAdminModuleContent(modId) {
  switch (modId) {
    case 1: return renderModul1_Dashboard();
    case 2: return renderModul2_KYC();
    case 3: return renderModul3_Mitra();
    case 4: return renderModul4_Customer();
    case 5: return renderModul5_Catalog();
    case 6: return renderModul6_LiveOrder();
    case 7: return renderModul7_Dispute();
    case 8: return renderModul8_Payout();
    case 9: return renderModul9_Financial();
    case 10: return renderModul10_Settings();
    default: return renderModul1_Dashboard();
  }
}

// MODUL 1: DASHBOARD OVERVIEW & LIVE KPIS (PRD 4.1 & Model Finansial Proposal Bab XI)
function renderModul1_Dashboard() {
  const totalOrders = appState.orders.length;
  const completedOrders = appState.orders.filter(o => o.status === 'ORDER_COMPLETED').length;
  const totalGmv = appState.orders.reduce((sum, o) => sum + (o.totalInvoice || 0), 0);
  const netPlatformRevenue = completedOrders * 14000;
  const escrowHeld = appState.orders
    .filter(o => ['FUNDS_DEPOSITED_ESCROW', 'FUNDS_FROZEN_ESCROW'].includes(o.escrowStatus))
    .reduce((sum, o) => sum + (o.totalInvoice || 0), 0);

  const bepTarget = appState.systemSettings.bepTargetMonthlyOrders; // 415 order
  const bepPercentage = Math.min(100, Math.round((totalOrders / bepTarget) * 100));

  return `
    <div class="space-y-6 animate-fade-in">
      
      <!-- Module Header -->
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 class="text-xl font-black text-[#161717]">Dashboard Overview & Real-Time KPIs</h1>
          <p class="text-xs text-slate-500">Pemantauan traksi startup JASAKU, perputaran GMV, dan kesehatan saldo Escrow Vault.</p>
        </div>
        <div class="flex items-center gap-2">
          <button onclick="resetAppState()" class="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shadow-sm flex items-center gap-1.5">
            ${ICONS.refresh} Reset Data Demo
          </button>
        </div>
      </div>

      <!-- 5 KPI METRIC CARDS (PRD Section 4.1) -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        
        <!-- CARD 1: GMV -->
        <div class="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-1">
          <div class="flex items-center justify-between text-slate-400">
            <span class="text-[10px] font-extrabold uppercase tracking-wider">Gross GMV</span>
            <span class="text-teal-600">${ICONS.dashboard}</span>
          </div>
          <p class="text-lg font-black text-[#16627A]">${formatRupiah(totalGmv)}</p>
          <span class="text-[10px] text-emerald-600 font-bold flex items-center gap-1">↑ 18.4% vs bulan lalu</span>
        </div>

        <!-- CARD 2: NET PLATFORM REVENUE -->
        <div class="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-1">
          <div class="flex items-center justify-between text-slate-400">
            <span class="text-[10px] font-extrabold uppercase tracking-wider">Net Revenue</span>
            <span class="text-[#EE7A34]">${ICONS.ledger}</span>
          </div>
          <p class="text-lg font-black text-[#EE7A34]">${formatRupiah(netPlatformRevenue)}</p>
          <span class="text-[10px] text-slate-500 font-medium">Komisi 10% + Fee Rp2rb</span>
        </div>

        <!-- CARD 3: ESCROW VAULT -->
        <div class="bg-white rounded-2xl p-4 border-2 border-emerald-200 bg-emerald-50/30 shadow-sm space-y-1">
          <div class="flex items-center justify-between text-emerald-700">
            <span class="text-[10px] font-extrabold uppercase tracking-wider">Saldo Escrow Vault</span>
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>
          <p class="text-lg font-black text-emerald-700">${formatRupiah(escrowHeld)}</p>
          <span class="text-[10px] text-emerald-800 font-bold">100% Terkunci Aman</span>
        </div>

        <!-- CARD 4: BEP TARGET MONITOR (PRD: 415 ORDER/BULAN) -->
        <div class="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-1">
          <div class="flex items-center justify-between text-slate-400">
            <span class="text-[10px] font-extrabold uppercase tracking-wider">Target BEP Bulanan</span>
            <span class="text-indigo-600 font-bold text-xs">${bepPercentage}%</span>
          </div>
          <p class="text-lg font-black text-slate-800">${totalOrders} / ${bepTarget} Order</p>
          <div class="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div class="bg-indigo-600 h-full rounded-full" style="width: ${bepPercentage}%"></div>
          </div>
        </div>

        <!-- CARD 5: MITRA & USER AKTIF -->
        <div class="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-1">
          <div class="flex items-center justify-between text-slate-400">
            <span class="text-[10px] font-extrabold uppercase tracking-wider">Mitra & Pengguna</span>
            <span class="text-sky-600">${ICONS.partners}</span>
          </div>
          <p class="text-lg font-black text-slate-800">${appState.partners.filter(p=>p.kycStatus==='APPROVED').length} Mitra • ${appState.customers.length} User</p>
          <span class="text-[10px] text-slate-500 font-medium">${appState.partners.filter(p=>p.kycStatus==='PENDING').length} Calon KYC Pending</span>
        </div>

      </div>

      <!-- CHARTS & URGENT ACTIONS -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <!-- Left: Transaction Volume Chart Simulation (SVG) -->
        <div class="lg:col-span-2 bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-sm font-extrabold text-[#161717]">Tren Volume Transaksi Mingguan</h2>
              <p class="text-xs text-slate-500">Pergerakan order selesai dan dana rekening bersama</p>
            </div>
            <span class="text-xs font-bold text-[#16627A] bg-teal-50 px-2.5 py-1 rounded-xl">November 2026</span>
          </div>

          <!-- SVG Bar Chart -->
          <div class="h-44 w-full flex items-end justify-between gap-3 pt-6 pb-2 px-4 border-b border-slate-100">
            ${[
              { day: 'Sen', val: 35, h: '55%' },
              { day: 'Sel', val: 42, h: '65%' },
              { day: 'Rab', val: 58, h: '85%' },
              { day: 'Kam', val: 48, h: '72%' },
              { day: 'Jum', val: 65, h: '95%' },
              { day: 'Sab', val: 78, h: '100%' },
              { day: 'Min', val: 70, h: '90%' }
            ].map(b => `
              <div class="flex-1 flex flex-col items-center gap-1 group cursor-pointer">
                <span class="text-[10px] font-extrabold text-slate-500 group-hover:text-[#16627A] transition">${b.val}</span>
                <div class="w-full bg-[#E8F4F8] group-hover:bg-[#16627A] rounded-t-lg transition-all" style="height: ${b.h}"></div>
                <span class="text-[11px] font-bold text-slate-400 group-hover:text-slate-800 transition">${b.day}</span>
              </div>
            `).join('')}
          </div>
          <div class="flex items-center justify-between text-xs text-slate-500 pt-1">
            <span>Rata-rata Nilai Order (AOV): <strong>Rp120.000</strong></span>
            <span>Margin Bersih Startup: <strong>Rp12.800 / transaksi</strong></span>
          </div>
        </div>

        <!-- Right: Urgent Task Feed -->
        <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
          <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <h2 class="text-sm font-extrabold text-[#161717]">Antrean Aksi Prioritas</h2>
            <span class="text-[10px] font-bold bg-red-100 text-red-600 px-2 py-0.5 rounded-full">3 Butuh Tindakan</span>
          </div>

          <div class="space-y-2.5">
            
            <div onclick="showAdminModule(2)" class="p-3 rounded-xl bg-amber-50 border border-amber-200 hover:border-amber-400 cursor-pointer transition">
              <div class="flex items-center justify-between mb-1">
                <span class="text-[10px] font-extrabold uppercase text-amber-800">Verifikasi KYC Mitra</span>
                <span class="text-[10px] text-amber-600 font-bold">2 Berkas</span>
              </div>
              <p class="text-xs text-amber-950 font-medium">Ilham Ramadhan & Siti Aminah mengajukan pendaftaran KTP.</p>
            </div>

            <div onclick="showAdminModule(7)" class="p-3 rounded-xl bg-rose-50 border border-rose-200 hover:border-rose-400 cursor-pointer transition">
              <div class="flex items-center justify-between mb-1">
                <span class="text-[10px] font-extrabold uppercase text-rose-800">Tiket Sengketa (SLA 18j)</span>
                <span class="text-[10px] text-rose-600 font-bold">DSP-104</span>
              </div>
              <p class="text-xs text-rose-950 font-medium">Komplain laptop berisik Nadia Safira vs Fajar Nugroho.</p>
            </div>

            <div onclick="showAdminModule(8)" class="p-3 rounded-xl bg-blue-50 border border-blue-200 hover:border-blue-400 cursor-pointer transition">
              <div class="flex items-center justify-between mb-1">
                <span class="text-[10px] font-extrabold uppercase text-blue-800">Pencairan Payout Mitra</span>
                <span class="text-[10px] text-blue-600 font-bold">PO-901</span>
              </div>
              <p class="text-xs text-blue-950 font-medium">Bagus Setiawan meminta penarikan dompet Rp500.000 ke BCA.</p>
            </div>

          </div>
        </div>

      </div>

    </div>
  `;
}

// MODUL 2: VERIFIKASI MITRA KYC (PRD 4.2 & Alur 5.1)
function renderModul2_KYC() {
  const pendingApplicants = appState.partners.filter(p => p.kycStatus === 'PENDING');
  const approvedPartners = appState.partners.filter(p => p.kycStatus === 'APPROVED');

  return `
    <div class="space-y-6 animate-fade-in">
      
      <div class="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 class="text-xl font-black text-[#161717]">Verifikasi Berkas Mitra KYC</h1>
          <p class="text-xs text-slate-500">Kurasi identitas legalitas KTP resmi dan sertifikasi keahlian untuk mengeliminasi 30% ketakutan penipuan pelanggan.</p>
        </div>
        <span class="text-xs font-bold bg-amber-100 text-amber-800 px-3 py-1.5 rounded-xl">
          ${pendingApplicants.length} Pengajuan Menunggu Kurasi
        </span>
      </div>

      <!-- Table Queue -->
      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div class="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <h2 class="text-xs font-extrabold uppercase tracking-wider text-slate-700">Antrean Pengajuan Mitra Baru (KYC_PENDING)</h2>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead class="bg-slate-100 text-slate-600 uppercase font-bold text-[10px] border-b border-slate-200">
              <tr>
                <th class="py-3 px-4">Calon Mitra</th>
                <th class="py-3 px-4">Spesialisasi</th>
                <th class="py-3 px-4">NIK KTP</th>
                <th class="py-3 px-4">Waktu Submit</th>
                <th class="py-3 px-4">Status Berkas</th>
                <th class="py-3 px-4 text-right">Aksi Tindakan</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 font-medium">
              ${pendingApplicants.map(p => `
                <tr class="hover:bg-slate-50 transition">
                  <td class="py-3.5 px-4 font-bold text-[#161717]">
                    ${p.name}
                    <span class="block text-[11px] text-slate-400 font-normal">${p.phone}</span>
                  </td>
                  <td class="py-3.5 px-4 text-slate-700">${p.category}</td>
                  <td class="py-3.5 px-4 font-mono text-slate-600">${p.nik}</td>
                  <td class="py-3.5 px-4 text-slate-500">${p.submittedAt}</td>
                  <td class="py-3.5 px-4">
                    <span class="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-700">
                      MENUNGGU TINJAUAN
                    </span>
                  </td>
                  <td class="py-3.5 px-4 text-right">
                    <button onclick="openKYCInspectionModal('${p.id}')" class="px-3.5 py-1.5 rounded-xl bg-[#16627A] hover:bg-[#0F495B] text-white text-xs font-extrabold shadow-sm transition">
                      Tinjau Berkas Digital →
                    </button>
                  </td>
                </tr>
              `).join('')}
              ${pendingApplicants.length === 0 ? `
                <tr><td colspan="6" class="py-8 text-center text-slate-400">Tidak ada pengajuan KYC yang tertunda. Semua berkas telah dikurasi.</td></tr>
              ` : ''}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  `;
}

// MODAL INSPEKSI KYC (KTP ZOOM, VERIFIKASI NIK, APPROVE/REJECT)
function renderKYCInspectionModal(partnerId) {
  const p = appState.partners.find(part => part.id === partnerId);
  if (!p) return '';

  return `
    <div class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in select-none">
      <div class="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
        
        <!-- Modal Header -->
        <div class="bg-gradient-to-r from-[#16627A] to-[#124D60] text-white p-5 flex items-center justify-between">
          <div>
            <span class="text-[10px] uppercase tracking-wider font-extrabold text-teal-200">Inspeksi Berkas Digital KYC (SCR-A03)</span>
            <h3 class="text-base font-black">${p.name} • ${p.category}</h3>
          </div>
          <button onclick="closeAdminModal()" class="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition">
            ${ICONS.close}
          </button>
        </div>

        <!-- Body Content -->
        <div class="p-6 space-y-4 max-h-[75vh] overflow-y-auto custom-scrollbar">
          
          <!-- Identity Summary -->
          <div class="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
            <div>
              <span class="text-slate-400 block text-[10px] uppercase font-bold">Nomor Induk Kependudukan (NIK)</span>
              <span class="font-mono font-black text-slate-800 text-sm">${p.nik}</span>
            </div>
            <div>
              <span class="text-slate-400 block text-[10px] uppercase font-bold">Nomor Kontak / WhatsApp</span>
              <span class="font-bold text-slate-800">${p.phone}</span>
            </div>
            <div>
              <span class="text-slate-400 block text-[10px] uppercase font-bold">Alamat Terdaftar</span>
              <span class="font-medium text-slate-700">${p.address}</span>
            </div>
            <div>
              <span class="text-slate-400 block text-[10px] uppercase font-bold">Rekening Bank Tujuan</span>
              <span class="font-bold text-slate-800">${p.bankName} ${p.bankAccount} (a/n ${p.bankHolder})</span>
            </div>
          </div>

          <!-- Document Media Viewer (Simulated) -->
          <div class="grid grid-cols-2 gap-4">
            
            <div class="space-y-1.5">
              <span class="text-xs font-extrabold text-slate-700 block">1. Foto KTP Asli (High-Resolution Zoom)</span>
              <div class="h-44 bg-slate-100 rounded-2xl border-2 border-slate-200 flex flex-col items-center justify-center p-3 text-center">
                <span class="text-2xl mb-1">🪪</span>
                <span class="text-xs font-bold text-slate-700">REPUBLIK INDONESIA - KTP ELEKTRONIK</span>
                <span class="text-[11px] font-mono text-slate-500 mt-1">NIK: ${p.nik}</span>
                <span class="text-[10px] text-emerald-600 font-bold mt-2">✓ NIK Terverifikasi Dukcapil</span>
              </div>
            </div>

            <div class="space-y-1.5">
              <span class="text-xs font-extrabold text-slate-700 block">2. Foto Selfie Memegang KTP Asli</span>
              <div class="h-44 bg-slate-100 rounded-2xl border-2 border-slate-200 flex flex-col items-center justify-center p-3 text-center">
                <span class="text-2xl mb-1">🤳</span>
                <span class="text-xs font-bold text-slate-700">Kesesuaian Wajah & KTP</span>
                <span class="text-[11px] text-slate-500 mt-1">${p.name} (Cocok 99.2%)</span>
                <span class="text-[10px] text-emerald-600 font-bold mt-2">✓ Liveness Detection Valid</span>
              </div>
            </div>

          </div>

          <!-- Rejection Reason Input -->
          <div class="space-y-1">
            <label class="text-xs font-extrabold text-slate-700">Catatan Verifikator (Wajib diisi jika menolak berkas):</label>
            <input type="text" id="kyc-reject-reason" placeholder="Contoh: Foto KTP sedikit buram pada bagian masa berlaku..." class="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#16627A]">
          </div>

        </div>

        <!-- Modal Footer Actions (PRD 5.1 Approve vs Reject) -->
        <div class="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button onclick="rejectKYCApplicant('${p.id}')" class="px-4 py-2 rounded-xl bg-white hover:bg-red-50 text-red-600 border border-red-200 font-bold text-xs transition">
            Tolak Pengajuan (Minta Revisi)
          </button>
          <button onclick="approveKYCApplicant('${p.id}')" class="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md transition transform active:scale-95 flex items-center gap-1.5">
            ${ICONS.check}
            Setujui Mitra (Publish ke Katalog)
          </button>
        </div>

      </div>
    </div>
  `;
}

// MODUL 3: MANAJEMEN MASTER MITRA (PRD 4.3 - Warning < 4.0 Rating)
function renderModul3_Mitra() {
  return `
    <div class="space-y-6 animate-fade-in">
      
      <div class="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 class="text-xl font-black text-[#161717]">Direktori Master Teknisi & Mitra</h1>
          <p class="text-xs text-slate-500">Pengawasan standar mutu pelayanan, riwayat pengerjaan, saldo dompet, dan sanksi disiplin.</p>
        </div>
        <span class="text-xs font-bold text-slate-500">${appState.partners.length} Mitra Terdaftar</span>
      </div>

      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead class="bg-slate-100 text-slate-600 uppercase font-bold text-[10px] border-b border-slate-200">
              <tr>
                <th class="py-3 px-4">Nama Mitra</th>
                <th class="py-3 px-4">Kategori Jasa</th>
                <th class="py-3 px-4">Rating Mutu</th>
                <th class="py-3 px-4">Pekerjaan Beres</th>
                <th class="py-3 px-4">Saldo Dompet</th>
                <th class="py-3 px-4">Status Akun</th>
                <th class="py-3 px-4 text-right">Aksi Intervensi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 font-medium">
              ${appState.partners.map(p => `
                <tr class="hover:bg-slate-50 transition ${p.rating > 0 && p.rating < 4.0 ? 'bg-amber-50/50' : ''}">
                  <td class="py-3.5 px-4 font-bold text-[#161717]">
                    ${p.name}
                    <span class="block text-[11px] text-slate-400 font-normal">${p.plate} • ${p.phone}</span>
                  </td>
                  <td class="py-3.5 px-4 text-slate-700">${p.category}</td>
                  <td class="py-3.5 px-4">
                    ${p.rating > 0 ? `
                      <span class="inline-flex items-center gap-1 font-bold ${p.rating < 4.0 ? 'text-amber-600 bg-amber-100 px-2 py-0.5 rounded-md' : 'text-slate-800'}">
                        ${ICONS.star} ${p.rating}
                        ${p.rating < 4.0 ? '<span class="text-[9px] uppercase font-black">(Peringatan Mutu)</span>' : ''}
                      </span>
                    ` : '<span class="text-slate-400 italic">Baru (Belum ada ulasan)</span>'}
                  </td>
                  <td class="py-3.5 px-4 text-slate-700">${p.jobsDone} Order</td>
                  <td class="py-3.5 px-4 font-extrabold text-[#16627A]">${formatRupiah(p.walletBalance)}</td>
                  <td class="py-3.5 px-4">
                    <span class="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${p.accountStatus === 'ACTIVE' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}">
                      ${p.accountStatus}
                    </span>
                  </td>
                  <td class="py-3.5 px-4 text-right">
                    ${p.accountStatus === 'ACTIVE' ? `
                      <button onclick="toggleSuspendPartner('${p.id}')" class="px-3 py-1 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 font-bold text-[11px] transition">
                        Suspend
                      </button>
                    ` : `
                      <button onclick="toggleSuspendPartner('${p.id}')" class="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold text-[11px] transition">
                        Aktifkan
                      </button>
                    `}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  `;
}

// MODUL 4: MANAJEMEN PENGGUNA CUSTOMER (PRD 4.4)
function renderModul4_Customer() {
  return `
    <div class="space-y-6 animate-fade-in">
      
      <div class="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 class="text-xl font-black text-[#161717]">Direktori Basis Data Pelanggan</h1>
          <p class="text-xs text-slate-500">Monitoring frekuensi pemesanan, riwayat belanja, dan pencegahan tindakan pemesanan fiktif (fraud).</p>
        </div>
        <span class="text-xs font-bold text-slate-500">${appState.customers.length} Pengguna Terdaftar</span>
      </div>

      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead class="bg-slate-100 text-slate-600 uppercase font-bold text-[10px] border-b border-slate-200">
              <tr>
                <th class="py-3 px-4">Nama Pelanggan</th>
                <th class="py-3 px-4">Alamat Domisili</th>
                <th class="py-3 px-4">Total Order</th>
                <th class="py-3 px-4">Akumulasi Belanja</th>
                <th class="py-3 px-4">Komplain</th>
                <th class="py-3 px-4">Status Akun</th>
                <th class="py-3 px-4 text-right">Tindakan</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 font-medium">
              ${appState.customers.map(c => `
                <tr class="hover:bg-slate-50 transition ${c.status === 'BLOCKED' ? 'bg-red-50/40' : ''}">
                  <td class="py-3.5 px-4 font-bold text-[#161717]">
                    ${c.name}
                    <span class="block text-[11px] text-slate-400 font-normal">${c.phone}</span>
                  </td>
                  <td class="py-3.5 px-4 text-slate-600">${c.address}</td>
                  <td class="py-3.5 px-4 text-slate-800 font-bold">${c.ordersCount} Transaksi</td>
                  <td class="py-3.5 px-4 font-extrabold text-[#16627A]">${formatRupiah(c.totalGmvSpent)}</td>
                  <td class="py-3.5 px-4 text-slate-600">${c.complaintsCount} Kali</td>
                  <td class="py-3.5 px-4">
                    <span class="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${c.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}">
                      ${c.status}
                    </span>
                  </td>
                  <td class="py-3.5 px-4 text-right">
                    <button onclick="toggleBlockCustomer('${c.id}')" class="px-3 py-1 rounded-lg text-[11px] font-bold transition ${c.status === 'ACTIVE' ? 'bg-slate-100 text-red-600 hover:bg-red-50' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'}">
                      ${c.status === 'ACTIVE' ? 'Blacklist Akun' : 'Buka Blokir'}
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  `;
}

// MODUL 5: KATALOG LAYANAN & KONFIGURASI TARIF (PRD 4.5 - Komisi 10%)
function renderModul5_Catalog() {
  return `
    <div class="space-y-6 animate-fade-in">
      
      <div class="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 class="text-xl font-black text-[#161717]">Katalog Layanan & Konfigurasi Tarif</h1>
          <p class="text-xs text-slate-500">Pengendalian harga dasar transparan, persentase komisi platform (10%), dan toggle darurat penonaktifan layanan.</p>
        </div>
        <button onclick="showToast('Parameter tarif berhasil disimpan')" class="px-4 py-2 rounded-xl bg-[#16627A] hover:bg-[#0F495B] text-white text-xs font-extrabold shadow-sm transition">
          Simpan Seluruh Parameter
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        ${appState.categories.map(cat => `
          <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2.5">
                <div class="w-10 h-10 rounded-xl ${cat.bg} ${cat.color} flex items-center justify-center p-2">
                  ${ICONS[cat.icon] || ICONS.home}
                </div>
                <div>
                  <h3 class="text-sm font-black text-[#161717]">${cat.name}</h3>
                  <span class="text-[10px] text-slate-400">ID: ${cat.id}</span>
                </div>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" ${cat.active ? 'checked' : ''} onchange="toggleCategoryActive('${cat.id}')" class="sr-only peer">
                <div class="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#16627A]"></div>
              </label>
            </div>

            <p class="text-xs text-slate-500 leading-relaxed">${cat.tagline}</p>

            <div class="space-y-2 pt-2 border-t border-slate-100 text-xs">
              <div class="flex items-center justify-between">
                <span class="text-slate-500">Tarif Dasar Mulai:</span>
                <input type="number" value="${cat.startingPrice}" onchange="updateCategoryPrice('${cat.id}', this.value)" class="w-28 text-right font-bold text-xs p-1.5 bg-slate-50 border border-slate-200 rounded-lg">
              </div>
              <div class="flex items-center justify-between">
                <span class="text-slate-500">Komisi Platform:</span>
                <span class="font-extrabold text-[#EE7A34]">10% (Rp ${(cat.startingPrice * 0.1).toLocaleString('id-ID')})</span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>

    </div>
  `;
}

// MODUL 6: LIVE ORDER FEED & AUDIT ESCROW VAULT (PRD 4.6 & Alur Escrow)
function renderModul6_LiveOrder() {
  const activeOrders = appState.orders.filter(o => ['FUNDS_DEPOSITED_ESCROW', 'FUNDS_FROZEN_ESCROW'].includes(o.escrowStatus));
  const totalEscrowLocked = activeOrders.reduce((sum, o) => sum + (o.totalInvoice || 0), 0);

  return `
    <div class="space-y-6 animate-fade-in">
      
      <div class="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 class="text-xl font-black text-[#161717]">Live Order Feed & Audit Escrow Vault</h1>
          <p class="text-xs text-slate-500">Pengawasan transaksi waktu-nyata dan penjaminan 0% kebocoran dana rekening bersama penampung.</p>
        </div>
        <div class="bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-2xl text-right">
          <span class="text-[10px] uppercase font-extrabold text-emerald-800 block">Saldo Terkunci di Bank Penampung</span>
          <span class="text-base font-black text-emerald-700">${formatRupiah(totalEscrowLocked)}</span>
        </div>
      </div>

      <!-- Live Orders Table -->
      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead class="bg-slate-100 text-slate-600 uppercase font-bold text-[10px] border-b border-slate-200">
              <tr>
                <th class="py-3 px-4">Order ID & Waktu</th>
                <th class="py-3 px-4">Pelanggan</th>
                <th class="py-3 px-4">Mitra Teknisi</th>
                <th class="py-3 px-4">Layanan</th>
                <th class="py-3 px-4">Nilai Transaksi</th>
                <th class="py-3 px-4">Status Alur Kerja</th>
                <th class="py-3 px-4">Posisi Escrow</th>
                <th class="py-3 px-4 text-right">Aksi Intervensi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 font-medium">
              ${appState.orders.map(ord => `
                <tr class="hover:bg-slate-50 transition ${ord.status === 'DISPUTE_OPENED' ? 'bg-amber-50/50' : ''}">
                  <td class="py-3.5 px-4 font-mono font-bold text-[#161717]">
                    ${ord.id}
                    <span class="block text-[10px] text-slate-400 font-sans">${ord.paidAt}</span>
                  </td>
                  <td class="py-3.5 px-4 font-bold text-slate-800">${ord.customerName}</td>
                  <td class="py-3.5 px-4 text-slate-700">${ord.partnerName}</td>
                  <td class="py-3.5 px-4 text-slate-700">${ord.serviceName}</td>
                  <td class="py-3.5 px-4 font-extrabold text-[#16627A]">${formatRupiah(ord.totalInvoice)}</td>
                  <td class="py-3.5 px-4">
                    <span class="px-2 py-0.5 rounded-md text-[10px] font-extrabold ${
                      ord.status === 'ORDER_COMPLETED' ? 'bg-emerald-100 text-emerald-700' :
                      ord.status === 'DISPUTE_OPENED' ? 'bg-amber-100 text-amber-800' :
                      'bg-teal-100 text-[#16627A]'
                    }">
                      ${ord.status}
                    </span>
                  </td>
                  <td class="py-3.5 px-4">
                    <span class="px-2 py-0.5 rounded-md text-[10px] font-extrabold ${
                      ord.escrowStatus === 'RELEASED_TO_PARTNER' ? 'bg-slate-100 text-slate-600' :
                      ord.escrowStatus === 'FUNDS_FROZEN_ESCROW' ? 'bg-red-100 text-red-700' :
                      'bg-emerald-100 text-emerald-800'
                    }">
                      ${ord.escrowStatus}
                    </span>
                  </td>
                  <td class="py-3.5 px-4 text-right">
                    <button onclick="emergencyOverrideOrder('${ord.id}')" class="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] transition">
                      Override
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  `;
}

// MODUL 7: DISPUTE RESOLUTION CENTER (PRD 4.7 & 3 Putusan Admin)
function renderModul7_Dispute() {
  const openDisputes = appState.disputes.filter(d => d.status === 'OPEN');

  return `
    <div class="space-y-6 animate-fade-in">
      
      <div class="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 class="text-xl font-black text-[#161717]">Dispute Resolution Center (Mediasi Garansi)</h1>
          <p class="text-xs text-slate-500">Penuntasan perselisihan konsumen dan mitra secara adil berdasarkan fakta digital dalam masa garansi 1x24 jam.</p>
        </div>
        <span class="text-xs font-extrabold bg-red-100 text-red-700 px-3 py-1.5 rounded-xl">
          ${openDisputes.length} Tiket Menunggu Putusan Admin
        </span>
      </div>

      <!-- Tickets Queue -->
      <div class="space-y-4">
        ${appState.disputes.map(dsp => `
          <div class="bg-white rounded-2xl p-5 border-2 ${dsp.status === 'OPEN' ? 'border-amber-300' : 'border-slate-200'} shadow-sm space-y-4">
            
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <span class="text-base font-black text-[#161717]">${dsp.ticketId}</span>
                <span class="text-xs font-mono text-slate-400">Order: ${dsp.orderId}</span>
                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-black ${dsp.status === 'OPEN' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}">
                  ${dsp.status}
                </span>
              </div>
              ${dsp.status === 'OPEN' ? `
                <div class="flex items-center gap-1.5 text-xs font-black text-rose-600 bg-rose-50 px-3 py-1 rounded-xl">
                  ${ICONS.clock} Sisa SLA: ${dsp.slaCountdownHours} Jam
                </div>
              ` : `
                <span class="text-xs font-bold text-slate-400">Sengketa Telah Diputuskan</span>
              `}
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-3 bg-slate-50 p-3.5 rounded-xl text-xs">
              <div>
                <span class="text-slate-400 block text-[10px] uppercase font-bold">Pelanggan Pengaju</span>
                <span class="font-extrabold text-slate-800">${dsp.customerName}</span>
              </div>
              <div>
                <span class="text-slate-400 block text-[10px] uppercase font-bold">Mitra Terlapor</span>
                <span class="font-extrabold text-slate-800">${dsp.partnerName}</span>
              </div>
              <div>
                <span class="text-slate-400 block text-[10px] uppercase font-bold">Dana Tertahan di Escrow</span>
                <span class="font-extrabold text-emerald-700">${formatRupiah(dsp.amountFrozen)}</span>
              </div>
            </div>

            <div class="text-xs space-y-1">
              <span class="font-extrabold text-slate-700">Keluhan Konsumen:</span>
              <p class="text-slate-600 leading-relaxed bg-white p-3 rounded-xl border border-slate-200">
                "${dsp.customerDescription || dsp.complaintReason}"
              </p>
            </div>

            ${dsp.status === 'OPEN' ? `
              <div class="pt-2 flex items-center justify-between border-t border-slate-100">
                <span class="text-[11px] text-slate-500 font-medium">Buka ruang investigasi untuk meninjau foto bukti & transkrip chat</span>
                <button onclick="openDisputeInvestigationRoom('${dsp.ticketId}')" class="px-5 py-2.5 rounded-xl bg-[#16627A] hover:bg-[#0F495B] text-white font-extrabold text-xs shadow-md transition transform active:scale-95 flex items-center gap-1.5">
                  Buka Ruang Investigasi & Eksekusi Putusan →
                </button>
              </div>
            ` : `
              <div class="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-800">
                ✓ <strong>Putusan Terlaksana:</strong> ${dsp.verdictNotes}
              </div>
            `}

          </div>
        `).join('')}
      </div>

    </div>
  `;
}

// MODAL RUANG INVESTIGASI SENGKETA (3 PUTUSAN RESMI ADMIN)
function renderDisputeInvestigationRoom(ticketId) {
  const dsp = appState.disputes.find(d => d.ticketId === ticketId);
  if (!dsp) return '';

  return `
    <div class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in select-none">
      <div class="w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
        
        <!-- Header -->
        <div class="bg-gradient-to-r from-amber-600 to-[#EE7A34] text-white p-5 flex items-center justify-between">
          <div>
            <span class="text-[10px] uppercase tracking-wider font-extrabold text-amber-100">Ruang Investigasi Terpadu (SCR-A09)</span>
            <h3 class="text-base font-black">Mediasi Sengketa ${dsp.ticketId} • Escrow: ${formatRupiah(dsp.amountFrozen)}</h3>
          </div>
          <button onclick="closeAdminModal()" class="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition">
            ${ICONS.close}
          </button>
        </div>

        <!-- Body -->
        <div class="p-6 space-y-4 max-h-[75vh] overflow-y-auto custom-scrollbar">
          
          <!-- Foto Komparasi (Evidence Viewer) -->
          <div class="space-y-1.5">
            <span class="text-xs font-extrabold text-slate-800 block">1. Bukti Foto Komparasi Lapangan</span>
            <div class="grid grid-cols-2 gap-3">
              <div class="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center">
                <span class="text-[10px] font-bold text-slate-500 block mb-1">Foto Bukti Selesai dari Mitra</span>
                <div class="h-28 bg-slate-200 rounded-lg flex items-center justify-center text-xs text-slate-600 font-bold">
                  [Kipas Terpasang Sesuai Dudukan]
                </div>
              </div>
              <div class="bg-rose-50 border border-rose-200 rounded-xl p-3 text-center">
                <span class="text-[10px] font-bold text-rose-700 block mb-1">Foto Bukti Kerusakan dari Konsumen</span>
                <div class="h-28 bg-rose-100 rounded-lg flex items-center justify-center text-xs text-rose-800 font-bold">
                  [Kipas Bergetar & Retak Baut]
                </div>
              </div>
            </div>
          </div>

          <!-- Audit Chat Log -->
          <div class="space-y-1.5">
            <span class="text-xs font-extrabold text-slate-800 block">2. Audit Transkrip Percakapan Chat In-App</span>
            <div class="bg-slate-50 rounded-xl p-3 border border-slate-200 space-y-2 text-xs max-h-36 overflow-y-auto">
              ${(dsp.chatTranscript || []).map(chat => `
                <div class="flex items-start justify-between">
                  <span class="font-extrabold text-[#16627A]">${chat.sender}: <span class="font-normal text-slate-700">${chat.text}</span></span>
                  <span class="text-[10px] text-slate-400 font-mono ml-2 shrink-0">${chat.time}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- 3 OPSI PUTUSAN RESMI ADMIN (PRD Rule 4.7) -->
          <div class="space-y-2 pt-2 border-t border-slate-200">
            <span class="text-xs font-black text-[#161717] block">3. Opsi Putusan Mediasi Administrator:</span>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              
              <!-- PUTUSAN 1: REFUND 100% -->
              <div onclick="executeDisputeVerdict('${dsp.ticketId}', 1)" class="p-3.5 rounded-2xl border-2 border-emerald-500 bg-emerald-50 hover:bg-emerald-100 cursor-pointer transition text-center shadow-sm">
                <span class="text-xs font-black text-emerald-800 block mb-1">PUTUSAN 1</span>
                <span class="text-xs font-extrabold text-emerald-700 block">Refund 100% ke Pelanggan</span>
                <span class="text-[10px] text-emerald-900 mt-1 block">Mitra terbukti wanprestasi. Dana escrow kembali penuh ke user.</span>
              </div>

              <!-- PUTUSAN 2: RILIS 100% -->
              <div onclick="executeDisputeVerdict('${dsp.ticketId}', 2)" class="p-3.5 rounded-2xl border-2 border-blue-500 bg-blue-50 hover:bg-blue-100 cursor-pointer transition text-center shadow-sm">
                <span class="text-xs font-black text-blue-800 block mb-1">PUTUSAN 2</span>
                <span class="text-xs font-extrabold text-blue-700 block">Rilis 100% ke Mitra</span>
                <span class="text-[10px] text-blue-900 mt-1 block">Pekerjaan mitra sesuai SOP. Komplain konsumen tidak terbukti.</span>
              </div>

              <!-- PUTUSAN 3: SPLIT RESOLUTION -->
              <div onclick="executeDisputeVerdict('${dsp.ticketId}', 3)" class="p-3.5 rounded-2xl border-2 border-amber-500 bg-amber-50 hover:bg-amber-100 cursor-pointer transition text-center shadow-sm">
                <span class="text-xs font-black text-amber-800 block mb-1">PUTUSAN 3</span>
                <span class="text-xs font-extrabold text-amber-700 block">Split 50% Pelanggan : 50% Mitra</span>
                <span class="text-[10px] text-amber-900 mt-1 block">Penyelesaian kompromi ganti transport & sebagian biaya.</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  `;
}

// MODUL 8: MANAJEMEN PAYOUT MITRA (PRD 4.8 & Alur 5.3)
function renderModul8_Payout() {
  const pendingPayouts = appState.payouts.filter(p => p.status === 'PENDING');

  return `
    <div class="space-y-6 animate-fade-in">
      
      <div class="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 class="text-xl font-black text-[#161717]">Manajemen Payout & Pencairan Saldo Dompet</h1>
          <p class="text-xs text-slate-500">Otorisasi dan eksekusi mutasi pencairan saldo hak bersih mitra ke rekening bank resmi (BCA, Mandiri, BRI, BNI).</p>
        </div>
        <span class="text-xs font-bold bg-orange-100 text-orange-800 px-3 py-1.5 rounded-xl">
          ${pendingPayouts.length} Permintaan Menunggu Otorisasi
        </span>
      </div>

      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead class="bg-slate-100 text-slate-600 uppercase font-bold text-[10px] border-b border-slate-200">
              <tr>
                <th class="py-3 px-4">ID Payout</th>
                <th class="py-3 px-4">Nama Mitra</th>
                <th class="py-3 px-4">Rekening Tujuan</th>
                <th class="py-3 px-4">Validasi KTP vs Bank</th>
                <th class="py-3 px-4">Nominal Penarikan</th>
                <th class="py-3 px-4">Status</th>
                <th class="py-3 px-4 text-right">Otorisasi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 font-medium">
              ${appState.payouts.map(po => `
                <tr class="hover:bg-slate-50 transition">
                  <td class="py-3.5 px-4 font-mono font-bold text-slate-800">${po.payoutId}</td>
                  <td class="py-3.5 px-4 font-bold text-[#161717]">${po.partnerName}</td>
                  <td class="py-3.5 px-4 font-mono text-slate-700">
                    ${po.bankName} ${po.bankAccount}
                    <span class="block text-[10px] font-sans text-slate-400">a/n ${po.accountHolder}</span>
                  </td>
                  <td class="py-3.5 px-4">
                    ${po.nameMatch ? `
                      <span class="inline-flex items-center gap-1 text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                        ✓ Nama KTP Sesuai Buku Bank
                      </span>
                    ` : `
                      <span class="inline-flex items-center gap-1 text-[10px] font-extrabold text-red-700 bg-red-50 px-2 py-0.5 rounded-full">
                        ⚠️ Nama Tidak Cocok!
                      </span>
                    `}
                  </td>
                  <td class="py-3.5 px-4 font-black text-[#16627A]">${formatRupiah(po.amount)}</td>
                  <td class="py-3.5 px-4">
                    <span class="px-2 py-0.5 rounded-full text-[10px] font-extrabold ${po.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}">
                      ${po.status}
                    </span>
                  </td>
                  <td class="py-3.5 px-4 text-right">
                    ${po.status === 'PENDING' ? `
                      <div class="flex items-center justify-end gap-2">
                        <button onclick="approvePayout('${po.payoutId}')" class="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition">
                          Setujui & Transfer
                        </button>
                        <button onclick="rejectPayout('${po.payoutId}')" class="px-2.5 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs border border-red-200 transition">
                          Tolak
                        </button>
                      </div>
                    ` : `
                      <span class="text-xs ${po.status === 'APPROVED' ? 'text-emerald-600' : 'text-red-500'} font-bold">
                        ${po.status === 'APPROVED' ? '✓ Telah Ditransfer' : '✗ Ditolak'}
                      </span>
                    `}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  `;
}

// MODUL 9: REKONSILIASI FINANSIAL & LAPORAN (PRD 4.9 & Rumus Finansial)
function renderModul9_Financial() {
  const completedOrders = appState.orders.filter(o => o.status === 'ORDER_COMPLETED');
  const count = completedOrders.length;
  const grossCommission = count * 12000;
  const platformFee = count * 2000;
  const grossRev = grossCommission + platformFee;
  const variableGatewayCosts = count * 1200;
  const netMargin = grossRev - variableGatewayCosts; // Rp12.800 per order

  return `
    <div class="space-y-6 animate-fade-in">
      
      <div class="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 class="text-xl font-black text-[#161717]">Buku Besar Rekonsiliasi Finansial & Laporan</h1>
          <p class="text-xs text-slate-500">Pertanggungjawaban keuangan CFO Yonathan Angkol: audit komisi 10%, biaya proteksi Rp2.000, dan margin bersih riil.</p>
        </div>
        <div class="flex items-center gap-2">
          <button onclick="simulateExport('xlsx')" class="px-3.5 py-2 rounded-xl bg-[#16627A] hover:bg-[#0F495B] text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm">
            ${ICONS.download} Ekspor Excel (.xlsx)
          </button>
          <button onclick="simulateExport('pdf')" class="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition flex items-center gap-1.5 shadow-sm">
            ${ICONS.download} Unduh PDF Resmi
          </button>
        </div>
      </div>

      <!-- Financial Ledger Breakdown Cards (PRD Section 7.1) -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        <div class="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-1">
          <span class="text-[10px] font-extrabold uppercase text-slate-400">Total Komisi 10% Masuk</span>
          <p class="text-base font-black text-[#161717]">${formatRupiah(grossCommission)}</p>
          <span class="text-[10px] text-slate-500">Dari ${count} order selesai</span>
        </div>

        <div class="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-1">
          <span class="text-[10px] font-extrabold uppercase text-slate-400">Biaya Proteksi Aplikasi (Rp2rb)</span>
          <p class="text-base font-black text-[#161717]">${formatRupiah(platformFee)}</p>
          <span class="text-[10px] text-slate-500">Flat Rp2.000 / pesanan</span>
        </div>

        <div class="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-1">
          <span class="text-[10px] font-extrabold uppercase text-slate-400">Biaya Payment Gateway (Rp1.200)</span>
          <p class="text-base font-black text-rose-600">- ${formatRupiah(variableGatewayCosts)}</p>
          <span class="text-[10px] text-slate-500">Beban variabel QRIS & VA</span>
        </div>

        <div class="bg-gradient-to-br from-[#16627A] to-[#0F495B] text-white rounded-2xl p-4 shadow-md space-y-1">
          <span class="text-[10px] font-extrabold uppercase text-teal-200">Margin Kontribusi Bersih</span>
          <p class="text-lg font-black text-amber-300">${formatRupiah(netMargin)}</p>
          <span class="text-[10px] text-teal-100 font-semibold">Rp12.800 rata-rata / order</span>
        </div>

      </div>

      <!-- Ledger Summary Table -->
      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-5 space-y-3">
        <h2 class="text-xs font-black text-[#161717] uppercase tracking-wider">Laporan Formula Titik Impas (Break-Even Point)</h2>
        <div class="text-xs text-slate-600 leading-relaxed space-y-1 bg-slate-50 p-4 rounded-xl border border-slate-200">
          <p>• <strong>Beban Biaya Tetap Bulanan (Fixed Cost):</strong> Rp5.300.000 (Server cloud, pemasaran rutin, hotline support)</p>
          <p>• <strong>Margin Bersih per Order:</strong> Rp12.800</p>
          <p>• <strong>Target Volume BEP:</strong> Rp5.300.000 / Rp12.800 = <strong>414,06 ≈ 415 order per bulan</strong></p>
          <p>• <strong>Target GMV BEP:</strong> 415 × Rp120.000 = <strong>Rp49.800.000 per bulan</strong></p>
        </div>
      </div>

    </div>
  `;
}

// MODUL 10: PENGATURAN GLOBAL & AUDIT TRAIL KEAMANAN (PRD 4.10 & Kepatuhan UU PDP)
function renderModul10_Settings() {
  return `
    <div class="space-y-6 animate-fade-in">
      
      <div class="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 class="text-xl font-black text-[#161717]">Pengaturan Global & Log Audit Trail Keamanan</h1>
          <p class="text-xs text-slate-500">Konfigurasi parameter sistem dan rekaman audit log permanen (immutable) sesuai UU Perlindungan Data Pribadi (UU No. 27/2022).</p>
        </div>
        <button onclick="showToast('Konfigurasi sistem tersimpan')" class="px-4 py-2 rounded-xl bg-[#16627A] hover:bg-[#0F495B] text-white text-xs font-bold transition shadow-sm">
          Simpan Parameter
        </button>
      </div>

      <!-- Parameter Controls -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
          <h2 class="text-xs font-black text-[#161717] uppercase tracking-wider">Parameter Biaya & Waktu Sistem</h2>
          
          <div class="space-y-2 text-xs">
            <div class="flex items-center justify-between">
              <span class="text-slate-600">Biaya Jasa Proteksi Platform:</span>
              <input type="number" value="${appState.systemSettings.protectionFee}" onchange="appState.systemSettings.protectionFee=Number(this.value)" class="w-28 text-right font-bold text-xs p-1.5 bg-slate-50 border border-slate-200 rounded-lg">
            </div>
            <div class="flex items-center justify-between">
              <span class="text-slate-600">SLA Respon Konfirmasi Mitra:</span>
              <input type="number" value="${appState.systemSettings.partnerSlaMinutes}" onchange="appState.systemSettings.partnerSlaMinutes=Number(this.value)" class="w-20 text-right font-bold text-xs p-1.5 bg-slate-50 border border-slate-200 rounded-lg">
            </div>
            <div class="flex items-center justify-between">
              <span class="text-slate-600">Batas Auto-Release Dana (Jam):</span>
              <input type="number" value="${appState.systemSettings.autoReleaseHours}" onchange="appState.systemSettings.autoReleaseHours=Number(this.value)" class="w-20 text-right font-bold text-xs p-1.5 bg-slate-50 border border-slate-200 rounded-lg">
            </div>
            <div class="flex items-center justify-between">
              <span class="text-slate-600">Masa Garansi Komplain Pelanggan (Jam):</span>
              <input type="number" value="${appState.systemSettings.disputeWindowHours}" onchange="appState.systemSettings.disputeWindowHours=Number(this.value)" class="w-20 text-right font-bold text-xs p-1.5 bg-slate-50 border border-slate-200 rounded-lg">
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
          <h2 class="text-xs font-black text-[#161717] uppercase tracking-wider">Kepatuhan Regulasi & Kebijakan Data</h2>
          <div class="text-xs text-slate-600 leading-relaxed space-y-2">
            <div class="flex items-start gap-2">
              <span class="text-emerald-600 font-bold">✓</span>
              <span><strong>Enkripsi Data:</strong> Data NIK KTP, buku tabungan & password diamankan dengan enkripsi AES-256 pada database (at rest).</span>
            </div>
            <div class="flex items-start gap-2">
              <span class="text-emerald-600 font-bold">✓</span>
              <span><strong>Sensor Chat Otomatis:</strong> Pertukaran nomor rekening pada in-app chat otomatis diblokir sistem.</span>
            </div>
            <div class="flex items-start gap-2">
              <span class="text-emerald-600 font-bold">✓</span>
              <span><strong>Audit Trail Immutability:</strong> Log administratif tidak dapat diedit atau dihapus oleh siapapun.</span>
            </div>
          </div>
        </div>

        <!-- Manado Operational Hub Card -->
        <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3 md:col-span-2">
          <div class="flex items-center justify-between">
            <h2 class="text-xs font-black text-[#161717] uppercase tracking-wider">Identitas Perusahaan & Wilayah Operasional (Manado Hub)</h2>
            <span class="text-[10px] font-bold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">Zona Operasi: Manado & Sekitarnya (WITA)</span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-600">
            <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span class="text-[10px] font-black text-slate-400 uppercase block">Kantor Pusat Operasional</span>
              <p class="font-bold text-slate-800">PT Jasaku Solusi Digital</p>
              <p class="text-[11px] text-slate-500">Kawasan Megamas Blok 1D No. 8, Jl. Piere Tendean (Boulevard), Wenang, Kota Manado 95111</p>
            </div>
            <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span class="text-[10px] font-black text-slate-400 uppercase block">Cakupan Wilayah Layanan Mitra</span>
              <p class="font-bold text-slate-800">Kota Manado & Sekitarnya</p>
              <p class="text-[11px] text-slate-500">Tikala, Teling, Koka, Wanea, Sario, Wenang, Paal Dua, Mapanget, Malalayang</p>
            </div>
            <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span class="text-[10px] font-black text-slate-400 uppercase block">Server & Data Center (UU PDP)</span>
              <p class="font-bold text-slate-800">Tier-3 Data Center (WITA Region)</p>
              <p class="text-[11px] text-slate-500">Pusat Data Indonesia Timur dengan enkripsi AES-256 & redundansi multi-zona</p>
            </div>
          </div>
        </div>

      </div>

      <!-- Immutable Audit Log Table -->
      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div class="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <h2 class="text-xs font-extrabold uppercase tracking-wider text-slate-700">Audit Trail Keamanan Sistem (Immutable Logs)</h2>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs font-mono">
            <thead class="bg-slate-100 text-slate-600 uppercase font-bold text-[10px] border-b border-slate-200">
              <tr>
                <th class="py-3 px-4">Log ID & Waktu</th>
                <th class="py-3 px-4">Administrator</th>
                <th class="py-3 px-4">Aksi Sensitif</th>
                <th class="py-3 px-4">Entitas Sasaran</th>
                <th class="py-3 px-4">IP Address</th>
                <th class="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 font-medium">
              ${appState.auditLogs.map(lg => `
                <tr class="hover:bg-slate-50 transition">
                  <td class="py-3 px-4 text-slate-800">
                    ${lg.id}
                    <span class="block text-[10px] text-slate-400 font-sans">${lg.timestamp}</span>
                  </td>
                  <td class="py-3 px-4 font-bold text-slate-800 font-sans">${lg.admin}</td>
                  <td class="py-3 px-4 text-[#16627A] font-bold">${lg.action}</td>
                  <td class="py-3 px-4 text-slate-600 font-sans">${lg.target}</td>
                  <td class="py-3 px-4 text-slate-500">${lg.ip}</td>
                  <td class="py-3 px-4 text-right font-sans">
                    <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      ${lg.status}
                    </span>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  `;
}
