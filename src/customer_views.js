// JASAKU Customer Views (Role Gate, Mobile Shell, 4 Bottom Tabs, Booking, Tracking, Dispute)
// UI/UX faithfully styled after the interactive CS25 Studio prototype design system

// DEMO ROLE GATE SCREEN (SCR-01)
function renderRoleGate() {
  return `
    <div class="min-h-screen bg-gradient-to-br from-[#0D3B4A] via-[#16627A] to-[#124D60] text-white flex flex-col justify-between p-6 sm:p-10 select-none">
      
      <!-- Top Branding -->
      <div class="max-w-4xl mx-auto w-full flex items-center justify-between">
        <div class="flex items-center gap-3">
          <img src="logo_jasaku_extracted.png" alt="JASAKU Logo" class="h-10 sm:h-12 w-auto object-contain filter drop-shadow-md rounded-lg" onerror="this.src=window.JASAKU_LOGO_BASE64">
          <div>
            <span class="text-xl sm:text-2xl font-black tracking-tight text-white">JASAKU</span>
            <span class="text-[10px] sm:text-xs block font-medium text-teal-200">PT Jasaku Solusi Digital</span>
          </div>
        </div>
        <div class="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 text-xs text-teal-100">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Prototipe v1.0 • Manado Ready</span>
        </div>
      </div>

      <!-- Center Hero & 2 Big Role Cards (PRD Requirement 1.A) -->
      <div class="max-w-3xl mx-auto w-full my-auto py-8 text-center">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold mb-4">
          <span class="w-2 h-2 rounded-full bg-[#EE7A34]"></span>
          Sistem Rekening Bersama (Escrow Vault) Bergaransi 100%
        </div>
        <h1 class="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-8 leading-tight">
          Penyedia Jasa Terpercaya,<br><span class="text-[#EE7A34]">Tanpa Takut Tertipu.</span>
        </h1>

        <!-- 2 DEMO ROLE BUTTONS -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto text-left">
          
          <!-- ROLE 1: CUSTOMER -->
          <div onclick="switchRole('customer')" class="group relative bg-white/95 hover:bg-white text-[#0E2A35] rounded-3xl p-6 sm:p-7 shadow-2xl cursor-pointer transition-all duration-300 transform hover:-translate-y-1.5 hover:shadow-teal-900/40 border-2 border-transparent hover:border-[#16627A]">
            <div class="flex items-center justify-between mb-4">
              <div class="w-13 h-13 rounded-2xl bg-[#E8F4F8] text-[#16627A] flex items-center justify-center font-black text-xl p-3 shadow-inner">
                ${ICONS.home}
              </div>
              <span class="text-[11px] font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-full bg-teal-100 text-[#16627A]">
                Mobile-First View
              </span>
            </div>
            <h2 class="text-xl font-black text-[#16627A] mb-3 flex items-center justify-between">
              MASUK SEBAGAI USER
              <span class="transform group-hover:translate-x-1 transition text-[#EE7A34]">→</span>
            </h2>
            <div class="flex items-center gap-2 pt-3 border-t border-slate-100 text-[11px] font-semibold text-slate-500">
              <span class="text-emerald-600 font-bold">✓ Rekber Aman</span>
              <span>•</span>
              <span class="text-[#EE7A34] font-bold">✓ Garansi 1x24 Jam</span>
            </div>
          </div>

          <!-- ROLE 2: ADMIN -->
          <div onclick="switchRole('admin')" class="group relative bg-white/95 hover:bg-white text-[#0E2A35] rounded-3xl p-6 sm:p-7 shadow-2xl cursor-pointer transition-all duration-300 transform hover:-translate-y-1.5 hover:shadow-teal-900/40 border-2 border-transparent hover:border-[#EE7A34]">
            <div class="flex items-center justify-between mb-4">
              <div class="w-13 h-13 rounded-2xl bg-[#FFF3EB] text-[#EE7A34] flex items-center justify-center font-black text-xl p-3 shadow-inner">
                ${ICONS.dashboard}
              </div>
              <span class="text-[11px] font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-full bg-orange-100 text-[#EE7A34]">
                Web Dashboard View
              </span>
            </div>
            <h2 class="text-xl font-black text-[#16627A] mb-3 flex items-center justify-between">
              MASUK SEBAGAI ADMIN
              <span class="transform group-hover:translate-x-1 transition text-[#EE7A34]">→</span>
            </h2>
            <div class="flex items-center gap-2 pt-3 border-t border-slate-100 text-[11px] font-semibold text-slate-500">
              <span class="text-[#16627A] font-bold">✓ 10 Modul Sidebar</span>
              <span>•</span>
              <span class="text-emerald-600 font-bold">✓ Live Sync Data</span>
            </div>
          </div>

        </div>

      </div>

      <!-- Bottom Quick Specs & Reset -->
      <div class="max-w-4xl mx-auto w-full pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-teal-200">
        <div>
          Dirancang untuk Evaluasi CEO Krisnas, CTO Junior, COO Jabes, CMO Alhillal, CFO Yonathan.
        </div>
        <div class="flex items-center gap-3">
          <button onclick="resetAppState()" class="text-xs text-white/80 hover:text-white underline font-semibold transition">
            Reset Data Demo ke Awal
          </button>
        </div>
      </div>

    </div>
  `;
}

// Studio Companion removed permanently per user request
function renderDesktopStudioCompanion() {
  return '';
}

// MAIN CUSTOMER APP SHELL (Mobile Frame + Bottom Nav)
function renderCustomerShell() {
  let contentHtml = '';

  if (appState.customerSubscreen) {
    switch (appState.customerSubscreen) {
      case 'category': contentHtml = renderCategoryScreen(); break;
      case 'serviceDetail': contentHtml = renderServiceDetailScreen(); break;
      case 'checkout': contentHtml = renderCheckoutScreen(); break;
      case 'tracking': contentHtml = renderTrackingScreen(); break;
      case 'review': contentHtml = renderReviewScreen(); break;
      case 'chatRoom': contentHtml = renderChatRoomScreen(); break;
      default: contentHtml = renderHomeScreen();
    }
  } else {
    switch (appState.customerTab) {
      case 'home': contentHtml = renderHomeScreen(); break;
      case 'orders': contentHtml = renderOrdersTab(); break;
      case 'chat': contentHtml = renderChatTab(); break;
      case 'profile': contentHtml = renderProfileTab(); break;
      default: contentHtml = renderHomeScreen();
    }
  }

  // Active counts for badges
  const activeOrdersCount = appState.orders.filter(o => !['ORDER_COMPLETED', 'RESOLVED_REFUNDED', 'ORDER_CLOSED'].includes(o.status)).length;
  const unreadChatCount = appState.chats.reduce((acc, c) => acc + (c.unread || 0), 0);

  return `
    <div class="studio-bg min-h-screen flex flex-col items-center justify-start p-0 sm:py-6 select-none font-sans">
      
      <!-- Top Studio Banner Bar (DI ATAS GAMBAR HP - Akses Cepat Admin & Ganti Peran - Desktop & Tablet) -->
      <header class="w-full max-w-[400px] mx-auto px-4 mb-3 hidden sm:flex items-center justify-between bg-white/95 backdrop-blur-md py-2.5 rounded-2xl shadow-card border border-slate-200/80 z-20">
        <div class="flex items-center gap-2.5">
          <div class="p-1.5 bg-white rounded-xl shadow-xs border border-slate-100 shrink-0">
            <img src="${window.JASAKU_LOGO_BASE64}" alt="JASAKU" class="h-6 w-auto object-contain">
          </div>
          <div>
            <h1 class="text-xs font-extrabold text-[#16627A]">JASAKU Simulator</h1>
            <p class="text-[10px] text-slate-400">Mode Pelanggan</p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button onclick="switchRole('gate')" class="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[11px] font-bold text-slate-700 transition flex items-center gap-1">
            ${ICONS.exit}
            <span>Peran</span>
          </button>
          <button onclick="switchRole('admin')" class="px-3 py-1.5 rounded-xl bg-[#16627A] hover:bg-[#0F495B] text-[11px] font-bold text-white transition flex items-center gap-1 shadow-sm">
            ${ICONS.dashboard}
            <span>Admin Panel →</span>
          </button>
        </div>
      </header>

      <!-- Mobile Floating Quick Switcher (Non-intrusive floating pill on top-right, visible ONLY on mobile) -->
      <aside aria-label="Mobile Role Switcher" class="sm:hidden fixed top-2.5 right-2.5 z-50 flex items-center gap-1.5 pointer-events-auto">
        <button onclick="switchRole('gate')" class="bg-[#0E2A35]/85 hover:bg-[#0E2A35] backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg border border-white/20 transition active:scale-95">
          Peran ↔
        </button>
        <button onclick="switchRole('admin')" class="bg-[#16627A]/95 hover:bg-[#0F495B] backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg border border-white/20 transition active:scale-95 flex items-center gap-1">
          <span>Admin</span>
          <span class="text-[9px]">↗</span>
        </button>
      </aside>

      <!-- Main Studio Layout: Centered Phone App Mockup -->
      <div class="studio-wrapper w-full max-w-md mx-auto sm:px-4 flex items-center justify-center">
        
        <!-- MOBILE DEVICE PROTOTYPE CONTAINER -->
        <main id="phone-shell" class="phone-shell relative w-full sm:w-[400px] sm:h-[812px] sm:max-h-[92vh] bg-[#F4F8FA] sm:rounded-[38px] sm:border-[8px] sm:border-[#0E2A35] shadow-phone overflow-hidden flex flex-col shrink-0">
          
          <!-- Simulated Mobile Status Bar (Visible on Tablet/Desktop preview) -->
          <div class="hidden sm:flex items-center justify-between px-6 pt-2.5 pb-1.5 bg-white text-[11px] font-semibold text-[#0E2A35] shrink-0 select-none z-30">
            <span id="mobile-clock">09:41</span>
            <div class="w-24 h-4 bg-[#0E2A35] rounded-full"></div>
            <div class="flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5 text-[#0E2A35]" viewBox="0 0 24 24" fill="currentColor"><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/></svg>
              <div class="flex items-center gap-0.5">
                <div class="w-5 h-2.5 border border-[#0E2A35] rounded-[3px] p-[1px] flex items-center">
                  <div class="w-full h-full bg-[#16627A] rounded-[1px]"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- DYNAMIC APP SCREEN CONTENT -->
          <div id="customer-viewport" class="flex-1 overflow-y-auto no-scrollbar relative bg-[#F4F8FA]">
            ${contentHtml}
          </div>

          <!-- BOTTOM NAVIGATION (PRD Rule 1.B: EXACTLY 4 TABS: HOME, PESANAN, CHAT, PROFIL) -->
          <nav id="app-bottom-nav" class="bg-white border-t border-slate-100 px-2 pt-2 pb-3 sm:pb-3.5 shadow-nav z-30 shrink-0 select-none ${appState.customerSubscreen ? 'hidden' : ''}" style="padding-bottom: max(12px, env(safe-area-inset-bottom, 12px));">
            <div class="grid grid-cols-4 gap-1">
              
              <!-- TAB 1: HOME -->
              <button onclick="navCustomerTab('home')" class="nav-btn flex flex-col items-center justify-center py-1 rounded-xl transition-all ${appState.customerTab === 'home' && !appState.customerSubscreen ? 'text-[#16627A] bg-[#E7F4F7] font-extrabold' : 'text-slate-400 hover:text-slate-600 font-semibold'}">
                <span class="mb-0.5">${ICONS.home}</span>
                <span class="text-[11px]">HOME</span>
              </button>

              <!-- TAB 2: PESANAN -->
              <button onclick="navCustomerTab('orders')" class="nav-btn relative flex flex-col items-center justify-center py-1 rounded-xl transition-all ${appState.customerTab === 'orders' && !appState.customerSubscreen ? 'text-[#16627A] bg-[#E7F4F7] font-extrabold' : 'text-slate-400 hover:text-slate-600 font-semibold'}">
                <span class="mb-0.5">${ICONS.orders}</span>
                ${activeOrdersCount > 0 ? `<span class="absolute top-0.5 right-4 w-4 h-4 rounded-full bg-[#EE7A34] text-white text-[9px] font-bold flex items-center justify-center">${activeOrdersCount}</span>` : ''}
                <span class="text-[11px]">PESANAN</span>
              </button>

              <!-- TAB 3: CHAT -->
              <button onclick="navCustomerTab('chat')" class="nav-btn relative flex flex-col items-center justify-center py-1 rounded-xl transition-all ${appState.customerTab === 'chat' && !appState.customerSubscreen ? 'text-[#16627A] bg-[#E7F4F7] font-extrabold' : 'text-slate-400 hover:text-slate-600 font-semibold'}">
                <span class="mb-0.5">${ICONS.chat}</span>
                ${unreadChatCount > 0 ? `<span class="absolute top-0.5 right-4 w-4 h-4 rounded-full bg-[#EE7A34] text-white text-[9px] font-bold flex items-center justify-center">${unreadChatCount}</span>` : ''}
                <span class="text-[11px]">CHAT</span>
              </button>

              <!-- TAB 4: PROFIL -->
              <button onclick="navCustomerTab('profile')" class="nav-btn flex flex-col items-center justify-center py-1 rounded-xl transition-all ${appState.customerTab === 'profile' && !appState.customerSubscreen ? 'text-[#16627A] bg-[#E7F4F7] font-extrabold' : 'text-slate-400 hover:text-slate-600 font-semibold'}">
                <span class="mb-0.5">${ICONS.profile}</span>
                <span class="text-[11px]">PROFIL</span>
              </button>

            </div>
          </nav>

          <!-- Dynamic Modal Layer -->
          <div id="customer-modal-layer"></div>

        </main>

      </div>

    </div>
  `;
}

// 1. HOME SCREEN (Customer Discovery with Curved Teal Gradient Header)
function renderHomeScreen() {
  const activeOrder = appState.orders.find(o => !['ORDER_COMPLETED', 'RESOLVED_REFUNDED', 'ORDER_CLOSED'].includes(o.status));

  return `
    <div class="animate-screen pb-6">
      
      <!-- Top Brand Header with Curved Teal Gradient (CS25 Style) -->
      <div class="bg-gradient-to-br from-[#16627A] via-[#1D7C93] to-[#2CA5B8] px-4 pt-4 pb-6 rounded-b-[28px] text-white relative overflow-hidden shadow-md">
        <!-- Decorative Circuit Circles -->
        <div class="absolute -right-8 -top-8 w-36 h-36 rounded-full border border-white/10 pointer-events-none"></div>
        <div class="absolute right-6 top-6 w-16 h-16 rounded-full bg-[#EE7A34]/20 blur-xl pointer-events-none"></div>

        <!-- Top Row: Logo + Active Location + Bell -->
        <div class="flex items-center justify-between gap-2 relative z-10 mb-4">
          <div class="flex items-center gap-2.5 min-w-0">
            <div class="w-10 h-10 bg-white rounded-2xl p-1 shadow-sm shrink-0 flex items-center justify-center">
              <img src="logo_jasaku_extracted.png" alt="Logo" class="w-8 h-8 rounded-lg object-contain" onerror="this.src=window.JASAKU_LOGO_BASE64">
            </div>
            <button onclick="simulatePinAdjust()" class="text-left min-w-0 group">
              <div class="flex items-center gap-1 text-[10px] uppercase tracking-wider text-teal-100 font-semibold">
                <span>Lokasi Layanan</span>
                ${ICONS.chevronDown}
              </div>
              <div class="flex items-center gap-1">
                <span class="text-xs font-bold text-white truncate max-w-[175px]">Tikala Ares • Manado</span>
              </div>
            </button>
          </div>
          <div class="flex items-center gap-2">
            <button onclick="showToast('Tidak ada notifikasi baru')" class="relative w-9 h-9 rounded-2xl bg-white/15 hover:bg-white/25 backdrop-blur-sm flex items-center justify-center shrink-0 transition text-white">
              ${ICONS.bell}
            </button>
          </div>
        </div>

        <!-- Search Bar Floating inside Curved Header -->
        <div class="relative z-10">
          <div class="flex items-center bg-white rounded-2xl px-3.5 py-2.5 shadow-md text-[#0E2A35]">
            <span class="text-[#16627A] mr-2.5">${ICONS.search}</span>
            <input
              type="text"
              placeholder="Cari servis AC, kebersihan kos, teknisi..."
              class="w-full text-xs font-medium bg-transparent focus:outline-none placeholder:text-slate-400"
              oninput="handleSearchCustomerServices(this.value)"
            />
          </div>
        </div>
      </div>

      <div class="px-4 mt-4 space-y-4">
        
        <!-- Active Order Quick Tracking Banner (if active order exists) -->
        ${activeOrder ? `
          <button onclick="openOrderTracking('${activeOrder.id}')" class="w-full text-left bg-white border border-[#EE7A34]/30 rounded-2xl p-3.5 shadow-card flex items-center gap-3 active:scale-[0.99] transition">
            <div class="w-10 h-10 rounded-xl bg-[#FFF3EB] text-[#EE7A34] flex items-center justify-center shrink-0 relative">
              <span class="w-2.5 h-2.5 rounded-full bg-[#EE7A34] absolute -top-0.5 -right-0.5 animate-ping"></span>
              ${ICONS.clock}
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2">
                <span class="text-[10px] font-bold uppercase tracking-wide text-[#EE7A34]">Pesanan Berlangsung</span>
                <span class="text-[10px] font-semibold text-slate-400">#${activeOrder.id}</span>
              </div>
              <p class="text-xs font-extrabold text-[#0E2A35] truncate mt-0.5">${activeOrder.serviceName}</p>
              <p class="text-[11px] font-semibold text-[#16627A]">Status: ${activeOrder.status.replace(/_/g, ' ')}</p>
            </div>
            <span class="text-xs font-bold text-[#EE7A34] bg-[#FFF3EB] px-2.5 py-1.5 rounded-xl shrink-0">Lacak →</span>
          </button>
        ` : ''}

        <!-- Promo Hero Banner (Diskon Kupon Promo) -->
        <div onclick="applyPromoQuick()" class="cursor-pointer bg-gradient-to-r from-[#EE7A34] to-[#F98F4E] rounded-2xl p-4 text-white shadow-md relative overflow-hidden active:scale-[0.99] transition">
          <div class="absolute right-0 bottom-0 opacity-15 pointer-events-none transform translate-x-3 translate-y-2">
            <img src="logo_jasaku_extracted.png" alt="Watermark" class="w-24 h-24 object-contain filter brightness-200" onerror="this.src=window.JASAKU_LOGO_BASE64">
          </div>
          <div class="relative z-10 max-w-[80%]">
            <span class="inline-block text-[10px] font-extrabold uppercase tracking-wider bg-white/20 backdrop-blur-sm px-2.5 py-0.5 rounded-full mb-1.5">Kupon Promo</span>
            <h3 class="text-sm font-extrabold leading-snug">Diskon Rp15.000 dengan Kupon!</h3>
            <p class="text-[11px] text-orange-50 mt-1">Uang dikunci aman • Garansi 1x24 jam beres atau uang kembali</p>
          </div>
        </div>

        <!-- 5 Official Service Categories Grid (CS25 Style) -->
        <div>
          <div class="flex items-center justify-between mb-3">
            <h2 class="text-sm font-extrabold text-[#0E2A35]">Kategori Jasa</h2>
            <span class="text-[11px] font-semibold text-[#16627A]">5 Layanan Resmi</span>
          </div>
          <div class="grid grid-cols-5 gap-2">
            ${appState.categories.map(cat => `
              <button onclick="openCategory('${cat.id}')" class="flex flex-col items-center gap-1.5 group active:scale-95 transition">
                <div class="w-13 h-13 rounded-2xl ${cat.bg} ${cat.color} flex items-center justify-center p-3 shadow-sm border border-white group-hover:shadow-md transition">
                  ${ICONS[cat.icon] || ICONS.home}
                </div>
                <span class="text-[10px] font-bold text-[#0E2A35] text-center leading-tight group-hover:text-[#16627A]">${cat.name}</span>
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Layanan Populer (Popular Services matching CS25 compact cards) -->
        <div>
          <div class="flex items-center justify-between mb-3">
            <h2 class="text-sm font-extrabold text-[#0E2A35]">Layanan Paling Banyak Dipesan</h2>
            <button onclick="openCategory('ac')" class="text-xs font-bold text-[#16627A]">Lihat Semua</button>
          </div>
          <div class="space-y-3">
            ${appState.services.map(s => {
              const cat = appState.categories.find(c => c.id === s.categoryId) || appState.categories[0];
              return `
                <div onclick="openServiceDetail('${s.id}')" class="cursor-pointer bg-white rounded-2xl p-3.5 shadow-card border border-slate-100/80 flex items-center gap-3.5 hover:border-teal-300 active:scale-[0.99] transition">
                  <div class="w-14 h-14 rounded-2xl ${cat.bg} ${cat.color} flex items-center justify-center shrink-0 relative">
                    ${ICONS[s.icon] || ICONS.ac}
                    <span class="absolute -bottom-1.5 bg-[#16627A] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md shadow-sm whitespace-nowrap">${s.badge}</span>
                  </div>
                  <div class="flex-1 min-w-0">
                    <h3 class="text-xs font-extrabold text-[#0E2A35] truncate">${s.name}</h3>
                    <div class="flex items-center gap-1.5 mt-0.5">
                      <span class="inline-flex items-center gap-0.5 text-[11px] font-bold text-[#0E2A35]">${ICONS.star} ${s.rating}</span>
                      <span class="text-[11px] text-slate-400">(${s.reviewsCount} ulasan)</span>
                    </div>
                    <div class="flex items-center justify-between mt-1.5">
                      <div>
                        <span class="text-[10px] text-slate-400">Mulai </span>
                        <span class="text-xs font-extrabold text-[#EE7A34]">${formatRupiah(s.price)}</span>
                      </div>
                      <span class="text-[11px] font-bold text-[#16627A] bg-[#E7F4F7] px-2.5 py-1 rounded-xl">Pilih</span>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

      </div>

    </div>
  `;
}

// 2. CATEGORY SCREEN (Filter by Category with CS25 Top Bar & Horizontal Pills)
function renderCategoryScreen() {
  const cat = appState.categories.find(c => c.id === appState.activeCategoryId) || appState.categories[0];
  const catServices = appState.services.filter(s => s.categoryId === cat.id);

  return `
    <div class="animate-screen pb-6">
      
      <!-- Top Bar -->
      <div class="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-4 py-3.5 border-b border-slate-100 flex items-center gap-3 shadow-xs">
        <button onclick="closeSubscreen()" class="w-9 h-9 rounded-xl bg-[#F4F8FA] text-[#0E2A35] flex items-center justify-center hover:bg-slate-200/70 transition">
          ${ICONS.back}
        </button>
        <div>
          <h1 class="text-sm font-extrabold text-[#0E2A35]">${cat.name}</h1>
          <p class="text-[11px] text-slate-500">${cat.tagline}</p>
        </div>
      </div>

      <!-- Horizontal Category Filter Pills -->
      <div class="px-4 pt-3 pb-1 flex gap-2 overflow-x-auto no-scrollbar">
        ${appState.categories.map(c => `
          <button onclick="openCategory('${c.id}')" class="px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition whitespace-nowrap ${c.id === cat.id ? 'bg-[#16627A] text-white shadow-sm' : 'bg-white text-slate-600 border border-slate-200'}">
            ${c.name}
          </button>
        `).join('')}
      </div>

      <!-- Services in Category -->
      <div class="px-4 mt-3 space-y-3">
        ${catServices.map(s => `
          <div onclick="openServiceDetail('${s.id}')" class="cursor-pointer bg-white rounded-2xl p-4 shadow-card border border-slate-100/80 hover:border-teal-300 active:scale-[0.99] transition">
            <div class="flex items-center justify-between mb-1.5">
              <span class="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-[#FFF3EB] text-[#EE7A34]">${s.badge}</span>
              <span class="flex items-center gap-1 text-xs font-bold text-slate-700">
                ${ICONS.star} ${s.rating} (${s.reviewsCount} ulasan)
              </span>
            </div>
            <h3 class="text-sm font-extrabold text-[#0E2A35] mb-1">${s.name}</h3>
            <p class="text-xs text-slate-500 leading-relaxed mb-3">${s.description}</p>
            <div class="flex items-center justify-between pt-2.5 border-t border-slate-100">
              <div>
                <span class="text-[10px] text-slate-400 font-medium">Mulai dari</span>
                <p class="text-sm font-extrabold text-[#16627A]">${formatRupiah(s.price)}</p>
              </div>
              <button class="px-4 py-1.5 rounded-xl bg-[#EE7A34] hover:bg-[#F98F4E] text-white text-xs font-extrabold shadow-sm transition">
                Pilih Paket
              </button>
            </div>
          </div>
        `).join('')}
      </div>

    </div>
  `;
}

// 3. SERVICE DETAIL SCREEN (CS25 Style Hero + Sticky Bottom Action Footer)
function renderServiceDetailScreen() {
  const srv = appState.services.find(s => s.id === appState.activeServiceId) || appState.services[0];
  const cat = appState.categories.find(c => c.id === srv.categoryId) || appState.categories[0];
  const partner = appState.partners.find(p => p.id === srv.partnerId);

  return `
    <div class="animate-screen pb-24 relative min-h-full">
      
      <!-- Teal Gradient Hero Header -->
      <div class="bg-gradient-to-br from-[#16627A] to-[#1D7C93] p-4 pb-6 text-white relative">
        <div class="flex items-center justify-between mb-4">
          <button onclick="closeSubscreen()" class="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/25 transition">
            ${ICONS.back}
          </button>
          <span class="text-xs font-bold bg-white/15 px-3 py-1 rounded-full backdrop-blur-sm">${cat.name}</span>
        </div>

        <div class="flex items-start gap-3.5">
          <div class="w-16 h-16 rounded-2xl bg-white text-[#16627A] flex items-center justify-center shadow-lg shrink-0 p-3">
            ${ICONS[srv.icon] || ICONS.ac}
          </div>
          <div class="flex-1">
            <span class="inline-block text-[10px] font-bold uppercase tracking-wider bg-[#EE7A34] px-2 py-0.5 rounded-md mb-1">${srv.badge}</span>
            <h1 class="text-base font-extrabold leading-snug">${srv.name}</h1>
            <div class="flex items-center gap-3 mt-1.5 text-xs text-teal-100">
              <span class="inline-flex items-center gap-1 font-bold text-white">${ICONS.star} ${srv.rating} <span class="font-normal text-teal-100">(${srv.reviewsCount})</span></span>
              <span>•</span>
              <span>${srv.duration}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Detail Body -->
      <div class="px-4 -mt-3 space-y-4 relative z-10">
        
        <!-- Price & Escrow Guarantee Card -->
        <div class="bg-white rounded-2xl p-4 shadow-card border border-slate-100">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-[11px] font-semibold text-slate-400">Harga Mulai Dari</p>
              <p class="text-xl font-extrabold text-[#EE7A34]">${formatRupiah(srv.price)}</p>
            </div>
            <div class="flex items-center gap-1.5 bg-[#E7F4F7] text-[#16627A] px-3 py-1.5 rounded-xl text-[11px] font-bold">
              🛡️ Garansi Escrow 100%
            </div>
          </div>
          <p class="text-xs text-slate-600 leading-relaxed mt-3 pt-3 border-t border-slate-100">${srv.description}</p>
        </div>

        <!-- Package Selection Preview (Radio Highlight) -->
        <div class="bg-white rounded-2xl p-4 shadow-card border border-slate-100">
          <h2 class="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3">Pilihan Paket & Harga</h2>
          <div class="space-y-2">
            ${srv.packages.map(p => {
              const selected = appState.draftBooking.packageId === p.id;
              return `
                <div onclick="selectPackage('${p.id}')" class="cursor-pointer flex items-center justify-between p-3 rounded-xl border transition ${selected ? 'border-[#16627A] bg-[#E7F4F7] ring-1 ring-[#16627A]/30' : 'border-slate-200 bg-white hover:bg-slate-50'}">
                  <div class="pr-2">
                    <p class="text-xs font-bold text-[#0E2A35]">${p.name}</p>
                    <p class="text-[11px] text-slate-500">${p.desc}</p>
                  </div>
                  <span class="text-xs font-extrabold ${selected ? 'text-[#16627A]' : 'text-slate-800'} shrink-0">${formatRupiah(p.price)}</span>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Sudah Termasuk (Includes) -->
        <div class="bg-white rounded-2xl p-4 shadow-card border border-slate-100">
          <h2 class="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-2.5">Sudah Termasuk</h2>
          <ul class="space-y-2">
            ${srv.includes.map(inc => `
              <li class="flex items-start gap-2 text-xs text-[#0E2A35]">
                <span class="w-4 h-4 rounded-full bg-[#E7F4F7] text-[#16627A] flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-black">✓</span>
                <span>${inc}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        <!-- Assigned Verified Partner Card -->
        ${partner ? `
          <div class="bg-white rounded-2xl p-4 shadow-card border border-slate-100">
            <h2 class="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-2.5">Mitra Teknisi Rekomendasi</h2>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-full ${partner.avatarBg} text-white font-extrabold flex items-center justify-center text-sm shadow-sm">
                  ${partner.name.split(' ').map(n=>n[0]).join('')}
                </div>
                <div>
                  <div class="flex items-center gap-1.5">
                    <p class="text-xs font-black text-[#0E2A35]">${partner.name}</p>
                    <span class="px-1.5 py-0.2 bg-teal-100 text-[#16627A] text-[9px] font-black rounded">KYC ✓</span>
                  </div>
                  <p class="text-[11px] text-slate-500">${partner.category} • ${partner.plate}</p>
                  <div class="flex items-center gap-1 text-[10px] font-bold text-slate-700">
                    ${ICONS.star} <span class="text-[#EE7A34]">${partner.rating}</span> (${partner.jobsDone} Pekerjaan)
                  </div>
                </div>
              </div>
              <button onclick="startDirectChat('${partner.id}')" class="px-3 py-1.5 rounded-xl bg-[#E7F4F7] hover:bg-teal-100 text-[#16627A] text-xs font-bold transition flex items-center gap-1">
                ${ICONS.chat} Chat
              </button>
            </div>
          </div>
        ` : ''}

      </div>

      <!-- Sticky Bottom Action Footer (Matches CS25) -->
      <div class="fixed sm:absolute bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-4 py-3 shadow-nav flex items-center justify-between z-30">
        <div>
          <span class="text-[10px] font-medium text-slate-400">Total Tarif Paket</span>
          <p class="text-base font-black text-[#16627A] leading-tight">
            ${formatRupiah(getSelectedPackagePrice())}
          </p>
        </div>
        <button onclick="proceedToCheckout()" class="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#EE7A34] to-[#F59A23] hover:opacity-95 text-white font-black text-xs shadow-md transition transform active:scale-95">
          Pesan Sekarang →
        </button>
      </div>

    </div>
  `;
}

// 4. CHECKOUT SCREEN (Detail Pesanan: Map Vector, Stepper, Date Picker, Voucher JOKOWI & Poin Reward)
function renderCheckoutScreen() {
  const srv = appState.services.find(s => s.id === appState.draftBooking.serviceId) || appState.services[0];
  const pkgPrice = getSelectedPackagePrice();
  const fee = appState.draftBooking.protectionFee; // Rp2.000
  const discount = appState.draftBooking.voucherApplied ? appState.draftBooking.voucherApplied.discount : 0;
  
  // Perhitungan Poin Reward JASAKU (1 Poin = Rp10)
  const cust = appState.customers.find(c => c.id === 'c1') || { points: 1250 };
  const customerPoints = cust.points || 0;
  const maxPointsDiscount = customerPoints * 10;
  const pointsDiscount = appState.draftBooking.usePoints ? Math.min(maxPointsDiscount, Math.max(0, pkgPrice + fee - discount)) : 0;
  const finalTotal = Math.max(0, pkgPrice + fee - discount - pointsDiscount);

  return `
    <div class="animate-screen pb-24 relative min-h-full">
      
      <!-- Top Sticky Bar -->
      <div class="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-4 py-3.5 border-b border-slate-100 flex items-center gap-3 shadow-xs">
        <button onclick="appState.customerSubscreen='serviceDetail'; renderCustomerApp();" class="w-9 h-9 rounded-xl bg-[#F4F8FA] text-[#0E2A35] flex items-center justify-center hover:bg-slate-200/70 transition">
          ${ICONS.back}
        </button>
        <div>
          <h1 class="text-sm font-extrabold text-[#0E2A35]">Detail Pesanan</h1>
          <p class="text-[11px] text-slate-500 truncate max-w-[240px]">${srv.name}</p>
        </div>
      </div>

      <div class="px-4 mt-4 space-y-4">
        
        <!-- 1. Pilih Paket & Jumlah (Quantity Stepper) -->
        <div class="bg-white rounded-2xl p-4 shadow-card border border-slate-100">
          <h2 class="text-xs font-extrabold text-[#0E2A35] mb-2.5">1. Paket & Jumlah Unit</h2>
          <div class="space-y-2 mb-3">
            ${srv.packages.map(p => {
              const selected = p.id === appState.draftBooking.packageId;
              return `
                <div onclick="selectPackage('${p.id}')" class="cursor-pointer p-3 rounded-xl border transition flex items-center justify-between gap-2 ${selected ? 'border-[#16627A] bg-[#E7F4F7] ring-1 ring-[#16627A]/20' : 'border-slate-200 bg-white'}">
                  <div>
                    <p class="text-xs font-bold text-[#0E2A35]">${p.name}</p>
                    <p class="text-[11px] text-slate-500">${p.desc}</p>
                  </div>
                  <span class="text-xs font-extrabold ${selected ? 'text-[#16627A]' : 'text-slate-800'} shrink-0">${formatRupiah(p.price)}</span>
                </div>
              `;
            }).join('')}
          </div>

          <!-- Quantity Stepper (− / +) -->
          <div class="flex items-center justify-between pt-3 border-t border-slate-100">
            <div>
              <p class="text-xs font-bold text-[#0E2A35]">Jumlah Unit</p>
              <p class="text-[11px] text-slate-400">Pengerjaan sekaligus di lokasi yang sama</p>
            </div>
            <div class="flex items-center gap-3 bg-[#F4F8FA] p-1 rounded-xl border border-slate-200">
              <button onclick="updateBookingQty(-1)" class="w-8 h-8 rounded-lg bg-white text-[#0E2A35] font-extrabold shadow-sm active:scale-95 transition">−</button>
              <span class="text-sm font-extrabold text-[#0E2A35] w-5 text-center">${appState.draftBooking.qty || 1}</span>
              <button onclick="updateBookingQty(1)" class="w-8 h-8 rounded-lg bg-[#16627A] text-white font-extrabold shadow-sm active:scale-95 transition">+</button>
            </div>
          </div>
        </div>

        <!-- 2. Titik Alamat di Peta (Stylized Vector City Map with Animated Pin) -->
        <div class="bg-white rounded-2xl p-4 shadow-card border border-slate-100">
          <div class="flex items-center justify-between mb-2.5">
            <h2 class="text-xs font-extrabold text-[#0E2A35]">2. Titik Alamat di Peta (Manado)</h2>
            <button onclick="simulatePinAdjust()" class="text-[11px] font-bold text-[#EE7A34]">Koreksi GPS 📍</button>
          </div>

          <!-- Interactive Vector City Map (Matches CS25 City Map) -->
          <div onclick="simulatePinAdjust()" class="relative w-full h-36 rounded-2xl overflow-hidden border border-slate-200 cursor-crosshair select-none bg-[#E6F1F4]">
            <svg class="w-full h-full" viewBox="0 0 360 150" preserveAspectRatio="none">
              <rect width="360" height="150" fill="#E9F2F5"/>
              <!-- City blocks -->
              <rect x="18" y="16" width="66" height="40" rx="6" fill="#D9E8ED"/>
              <rect x="102" y="16" width="84" height="40" rx="6" fill="#D9E8ED"/>
              <rect x="206" y="16" width="70" height="48" rx="6" fill="#D2E6DB"/>
              <rect x="292" y="16" width="54" height="48" rx="6" fill="#D9E8ED"/>
              <rect x="18" y="76" width="76" height="54" rx="6" fill="#D2E6DB"/>
              <rect x="114" y="76" width="90" height="54" rx="6" fill="#D9E8ED"/>
              <rect x="224" y="82" width="120" height="48" rx="6" fill="#D9E8ED"/>
              <!-- Main Roads -->
              <path d="M0 66 H360" stroke="#FFFFFF" stroke-width="11"/>
              <path d="M94 0 V150" stroke="#FFFFFF" stroke-width="9"/>
              <path d="M198 0 V150" stroke="#FFFFFF" stroke-width="8"/>
              <path d="M284 0 V150" stroke="#FFFFFF" stroke-width="6"/>
              <!-- Highway dashed center line -->
              <path d="M0 66 H360" stroke="#F59A23" stroke-width="1.5" stroke-dasharray="6 5" opacity="0.6"/>
              <!-- District & Street Labels -->
              <text x="24" y="60" fill="#16627A" font-size="8" font-weight="bold">Jl. Balai Kota (Tikala Ares)</text>
              <text x="145" y="73" fill="#64748B" font-size="7">Arah Teling & Koka</text>
            </svg>

            <!-- Movable Animated Pin -->
            <div style="left: 52%; top: 48%;" class="absolute pin-bounce pointer-events-none">
              <div class="w-8 h-8 rounded-full bg-[#EE7A34] text-white shadow-lg flex items-center justify-center ring-4 ring-[#EE7A34]/25">
                ${ICONS.pin}
              </div>
              <div class="w-2.5 h-1.5 bg-[#0E2A35]/30 rounded-full mx-auto mt-0.5 blur-[1px]"></div>
            </div>

            <div class="absolute bottom-2 left-2 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg text-[10px] font-bold text-[#16627A] shadow-sm">
              📍 Koordinat Tikala Ares, Manado (Ketuk untuk koreksi)
            </div>
          </div>

          <div class="mt-2.5 p-2.5 rounded-xl bg-[#F4F8FA] border border-slate-100">
            <p class="text-xs font-bold text-[#0E2A35]">${appState.draftBooking.addressName}</p>
            <input
              type="text"
              value="${appState.draftBooking.addressDetail}"
              oninput="appState.draftBooking.addressDetail = this.value"
              placeholder="Patokan jalan / nomor rumah / lantai..."
              class="w-full mt-1.5 px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#16627A]"
            />
          </div>
        </div>

        <!-- 3. Pilih Tanggal & Jam (Horizontal Date Cards + WITA Time Slots) -->
        <div class="bg-white rounded-2xl p-4 shadow-card border border-slate-100">
          <h2 class="text-xs font-extrabold text-[#0E2A35] mb-2.5">3. Tanggal & Jam Kedatangan (WITA)</h2>
          <div class="grid grid-cols-2 gap-2 mb-3">
            <button onclick="setBookingDate('Hari Ini, 20 Nov 2026')" class="py-2.5 px-3 rounded-xl text-xs font-bold border transition ${appState.draftBooking.date.includes('Hari Ini') ? 'border-[#16627A] bg-[#E7F4F7] text-[#16627A] shadow-xs' : 'border-slate-200 bg-white text-slate-600'}">
              ⚡ Hari Ini (Kilat)
            </button>
            <button onclick="setBookingDate('Besok, 21 Nov 2026')" class="py-2.5 px-3 rounded-xl text-xs font-bold border transition ${appState.draftBooking.date.includes('Besok') ? 'border-[#16627A] bg-[#E7F4F7] text-[#16627A] shadow-xs' : 'border-slate-200 bg-white text-slate-600'}">
              📅 Besok (Terjadwal)
            </button>
          </div>

          <p class="text-[11px] font-semibold text-slate-400 mb-2">Pilih Slot Jam Kedatangan</p>
          <div class="grid grid-cols-3 gap-1.5">
            ${['09:00 - 11:00 WITA', '13:00 - 15:00 WITA', '16:00 - 18:00 WITA'].map(slot => {
              const active = appState.draftBooking.timeSlot.includes(slot.replace(' WITA', ''));
              return `
                <button onclick="setBookingTime('${slot}')" class="py-2 rounded-xl text-xs font-bold border transition ${active ? 'bg-[#EE7A34] text-white border-[#EE7A34] shadow-sm' : 'bg-[#F4F8FA] text-[#0E2A35] border-slate-200'}">
                  ${slot.replace(' WITA', '')}
                </button>
              `;
            }).join('')}
          </div>
        </div>

        <!-- 4. Catatan & Foto Lampiran -->
        <div class="bg-white rounded-2xl p-4 shadow-card border border-slate-100">
          <h2 class="text-xs font-extrabold text-[#0E2A35] mb-2.5">4. Catatan & Foto Unit (Opsional)</h2>
          <textarea
            rows="2"
            oninput="appState.draftBooking.notes = this.value"
            placeholder="Contoh: AC di lantai 2, bawa tangga 3 meter..."
            class="w-full p-3 text-xs bg-[#F4F8FA] border border-slate-200 rounded-xl focus:outline-none focus:border-[#16627A] resize-none"
          >${appState.draftBooking.notes}</textarea>

          <div class="mt-2.5 flex items-center justify-between bg-[#E7F4F7] p-2.5 rounded-xl border border-teal-200/50">
            <div class="flex items-center gap-2">
              <span class="text-sm">📸</span>
              <span class="text-xs font-bold text-[#16627A]">Lampiran Foto Kerusakan Awal</span>
            </div>
            <button onclick="showToast('Foto kondisi unit berhasil dilampirkan')" class="text-[11px] font-bold text-[#EE7A34] bg-white px-2 py-1 rounded-lg shadow-2xs">
              + Foto Demo
            </button>
          </div>
        </div>

        <!-- 5. Kupon Promo JOKOWI -->
        <div class="bg-white rounded-2xl p-4 shadow-card border border-slate-100">
          <h2 class="text-xs font-extrabold text-[#0E2A35] mb-2">5. Masukkan Kode Diskon</h2>
          <div class="flex gap-2">
            <input
              type="text"
              id="voucher-input-field"
              value="${appState.draftBooking.voucherApplied ? appState.draftBooking.voucherApplied.code : ''}"
              placeholder="Ketik kode kupon: JOKOWI"
              class="flex-1 uppercase text-xs font-extrabold px-3 py-2 bg-[#F4F8FA] border border-slate-200 rounded-xl focus:outline-none focus:border-[#16627A]"
            />
            <button onclick="applyVoucherCode()" class="px-4 py-2 rounded-xl bg-[#16627A] hover:bg-[#0F495B] text-white text-xs font-extrabold shadow-sm transition">
              Terapkan
            </button>
          </div>
          ${appState.draftBooking.voucherApplied ? `
            <div class="mt-2.5 flex items-center justify-between text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
              <span class="font-bold">✓ Kupon '${appState.draftBooking.voucherApplied.code}' aktif!</span>
              <div class="flex items-center gap-2">
                <span class="font-black">- ${formatRupiah(appState.draftBooking.voucherApplied.discount)}</span>
                <button onclick="removeVoucherCode()" class="text-[10px] text-red-500 hover:text-red-700 font-bold underline ml-1">Hapus</button>
              </div>
            </div>
          ` : `
            <p class="text-[10px] text-slate-400 mt-1.5">Tip: Masukkan <strong>JOKOWI</strong> lalu klik Terapkan untuk diskon Rp15.000</p>
          `}
        </div>

        <!-- 5.B Tukarkan Poin JASAKU (Loyalty Points) -->
        <div class="bg-white rounded-2xl p-4 shadow-card border border-slate-100">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-white flex items-center justify-center text-lg font-black shadow-sm shrink-0">
                🪙
              </div>
              <div>
                <div class="flex items-center gap-1.5">
                  <h2 class="text-xs font-extrabold text-[#0E2A35]">Tukar Poin JASAKU</h2>
                  <span class="text-[10px] font-bold text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-full border border-amber-300/50">${customerPoints.toLocaleString('id-ID')} Poin</span>
                </div>
                <p class="text-[10px] text-slate-500 mt-0.5">1 Poin = Rp10 • Nilai tukar: <strong class="text-amber-600">${formatRupiah(maxPointsDiscount)}</strong></p>
              </div>
            </div>
            <!-- Interactive Switch -->
            <button onclick="toggleRedeemPoints()" aria-label="Tukar Poin" class="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${appState.draftBooking.usePoints ? 'bg-emerald-500' : 'bg-slate-300'}">
              <span class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${appState.draftBooking.usePoints ? 'translate-x-5' : 'translate-x-0'}"></span>
            </button>
          </div>

          ${appState.draftBooking.usePoints ? `
            <div class="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-700 bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-200">
              <span class="font-bold">✓ ${Math.round(pointsDiscount / 10).toLocaleString('id-ID')} Poin berhasil ditukarkan!</span>
              <span class="font-black">- ${formatRupiah(pointsDiscount)}</span>
            </div>
          ` : `
            <p class="text-[10px] text-slate-400 mt-2">Aktifkan untuk menggunakan saldo poin sebagai potongan harga langsung.</p>
          `}
        </div>

        <!-- 6. Rincian Biaya Transparan & Escrow Protection (PRD Section 7.1) -->
        <div class="bg-white rounded-2xl p-4 shadow-card border border-slate-100 space-y-2">
          <h2 class="text-xs font-extrabold text-[#0E2A35] mb-2.5">6. Rincian Tagihan Transparan</h2>
          
          <div class="flex items-center justify-between text-xs text-slate-600">
            <span>Tarif Jasa Dasar (${srv.name})</span>
            <span class="font-bold text-[#0E2A35]">${formatRupiah(pkgPrice)}</span>
          </div>

          <div class="flex items-center justify-between text-xs text-slate-600">
            <span class="flex items-center gap-1">Biaya Proteksi Rekber (Escrow) <span title="Perlindungan garansi 1x24 jam" class="text-teal-600 cursor-help">ⓘ</span></span>
            <span class="font-bold text-teal-700">+ ${formatRupiah(fee)}</span>
          </div>

          ${discount > 0 ? `
            <div class="flex items-center justify-between text-xs text-emerald-600">
              <span>Potongan Kupon Promo (JOKOWI)</span>
              <span class="font-bold">- ${formatRupiah(discount)}</span>
            </div>
          ` : ''}

          ${pointsDiscount > 0 ? `
            <div class="flex items-center justify-between text-xs text-amber-600">
              <span class="flex items-center gap-1">🪙 Potongan Poin JASAKU (${Math.round(pointsDiscount / 10).toLocaleString('id-ID')} Poin)</span>
              <span class="font-bold">- ${formatRupiah(pointsDiscount)}</span>
            </div>
          ` : ''}

          <div class="flex items-center justify-between text-xs font-black text-[#0E2A35] pt-2 border-t border-slate-100">
            <span>Total Tagihan (Escrow Vault)</span>
            <span class="text-sm font-black text-[#EE7A34]">${formatRupiah(finalTotal)}</span>
          </div>
        </div>

      </div>

      <!-- Sticky Bottom Action Footer (Matches CS25) -->
      <div class="fixed sm:absolute bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-4 py-3 shadow-nav flex items-center justify-between z-30">
        <div>
          <span class="text-[10px] font-medium text-slate-400">Total Pembayaran</span>
          <p class="text-base font-black text-[#EE7A34] leading-tight">
            ${formatRupiah(finalTotal)}
          </p>
          ${discount + pointsDiscount > 0 ? `
            <span class="text-[10px] text-emerald-600 font-bold block">Hemat ${formatRupiah(discount + pointsDiscount)}</span>
          ` : ''}
        </div>
        <button onclick="openPaymentModal()" class="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#16627A] to-[#1D7C93] hover:opacity-95 text-white font-extrabold text-xs shadow-md transition transform active:scale-95 flex items-center gap-1.5">
          <span>Bayar QRIS Dinamis</span>
          <span>→</span>
        </button>
      </div>

    </div>
  `;
}

// 5. DYNAMIC QRIS MODAL (Escrow Vault Lock Simulation)
function renderPaymentModal() {
  const pkgPrice = getSelectedPackagePrice();
  const fee = appState.draftBooking.protectionFee;
  const discount = appState.draftBooking.voucherApplied ? appState.draftBooking.voucherApplied.discount : 0;
  
  // Perhitungan Poin di Modal QRIS
  const cust = appState.customers.find(c => c.id === 'c1') || { points: 1250 };
  const customerPoints = cust.points || 0;
  const maxPointsDiscount = customerPoints * 10;
  const pointsDiscount = appState.draftBooking.usePoints ? Math.min(maxPointsDiscount, Math.max(0, pkgPrice + fee - discount)) : 0;
  const finalTotal = Math.max(0, pkgPrice + fee - discount - pointsDiscount);

  return `
    <div class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
      <div class="w-full sm:w-[380px] bg-white rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto no-scrollbar">
        
        <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
          <div class="flex items-center gap-2">
            <span class="text-xs font-extrabold uppercase text-[#16627A]">QRIS Dinamis JASAKU</span>
          </div>
          <button onclick="closeModal()" class="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800">
            ${ICONS.close}
          </button>
        </div>

        <div class="text-center space-y-1">
          <p class="text-[11px] text-slate-400 font-semibold">Selesaikan Pembayaran Dalam</p>
          <div class="text-base font-black text-[#EE7A34] tracking-widest font-mono">14:59</div>
          <p class="text-xs font-medium text-slate-600">Scan QRIS menggunakan BCA, Mandiri, GoPay, OVO, Dana</p>
        </div>

        <!-- Simulated QRIS Visual with Logo -->
        <div class="bg-white p-4 rounded-2xl border-2 border-slate-200 flex flex-col items-center justify-center shadow-inner">
          <div class="w-48 h-48 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center p-3 relative">
            <svg class="w-full h-full text-slate-800" viewBox="0 0 100 100" fill="currentColor">
              <path d="M0,0 h30 v30 h-30 z M10,10 h10 v10 h-10 z M70,0 h30 v30 h-30 z M80,10 h10 v10 h-10 z M0,70 h30 v30 h-30 z M10,80 h10 v10 h-10 z M40,10 h10 v10 h-10 z M40,30 h20 v10 h-20 z M10,40 h10 v20 h-10 z M70,40 h20 v10 h-20 z M40,50 h10 v30 h-10 z M60,60 h10 v10 h-10 z M80,60 h20 v20 h-20 z M60,80 h10 v20 h-10 z M30,90 h10 v10 h-10 z"/>
            </svg>
            <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div class="bg-white p-1 rounded-md shadow-md border border-slate-200">
                <img src="logo_jasaku_extracted.png" alt="QRIS" class="w-6 h-6 object-contain" onerror="this.src=window.JASAKU_LOGO_BASE64">
              </div>
            </div>
          </div>
          <span class="text-[10px] font-bold text-slate-400 mt-2">NMID: ID10293847561 • PT JASAKU SOLUSI DIGITAL (MANADO)</span>
        </div>

        <div class="bg-slate-50 rounded-xl p-3 text-xs space-y-1 border border-slate-200">
          <div class="flex justify-between text-slate-500">
            <span>Nominal Tagihan:</span>
            <span class="font-bold text-slate-800">${formatRupiah(finalTotal)}</span>
          </div>
          <div class="flex justify-between text-slate-500">
            <span>Posisi Dana:</span>
            <span class="font-extrabold text-[#16627A]">REKENING BERSAMA (ESCROW VAULT)</span>
          </div>
        </div>

        <!-- SIMULATE SUCCESS PAYMENT BUTTON -->
        <button onclick="confirmSimulatedPayment(${finalTotal})" class="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-extrabold text-xs shadow-lg transition transform active:scale-95 flex items-center justify-center gap-2">
          ${ICONS.check}
          [SIMULASIKAN PEMBAYARAN BERHASIL]
        </button>

      </div>
    </div>
  `;
}

// HELPER: Sequential Step Simulator (Alur Bertahap untuk Pengujian Interaktif Satu per Satu)
function renderSequentialStepSimulator(ord) {
  let stepCardContent = '';

  switch (ord.status) {
    case 'AWAITING_CONFIRMATION':
      stepCardContent = `
        <div class="space-y-2.5">
          <div class="flex items-center justify-between">
            <span class="text-[10px] font-black uppercase tracking-wider text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
              Tahap 1 dari 4: Konfirmasi Mitra
            </span>
            <span class="text-[11px] font-bold text-slate-400">SLA: 15 Menit</span>
          </div>
          <p class="text-xs text-slate-600 leading-relaxed">
            Pesanan baru diteruskan ke mitra. Mitra sedang meninjau alamat & rincian pesanan Anda di Manado.
          </p>
          <button onclick="advanceOrderStatus('${ord.id}', 'ORDER_ACCEPTED')" class="w-full py-2.5 px-3 rounded-xl bg-[#16627A] hover:bg-[#124d60] text-white font-extrabold text-xs shadow transition flex items-center justify-center gap-2">
            <span>⚡ Simulasikan: Mitra Menerima Pesanan</span>
            <span class="text-teal-200">→ Lanjut Tahap 2</span>
          </button>
        </div>
      `;
      break;

    case 'ORDER_ACCEPTED':
      stepCardContent = `
        <div class="space-y-2.5">
          <div class="flex items-center justify-between">
            <span class="text-[10px] font-black uppercase tracking-wider text-[#16627A] bg-teal-100 px-2 py-0.5 rounded-full">
              Tahap 2 dari 4: Mitra Bersiap
            </span>
            <span class="text-[11px] font-bold text-emerald-600">✓ Tahap 1 Selesai</span>
          </div>
          <p class="text-xs text-slate-600 leading-relaxed">
            Mitra telah menerima pesanan dan menyiapkan perlengkapan alat servis.
          </p>
          <button onclick="advanceOrderStatus('${ord.id}', 'PARTNER_ON_THE_WAY')" class="w-full py-2.5 px-3 rounded-xl bg-[#EE7A34] hover:bg-[#d96623] text-white font-extrabold text-xs shadow transition flex items-center justify-center gap-2">
            <span>🛵 Simulasikan: Mitra Berangkat OTW</span>
            <span class="text-orange-200">→ Menuju Lokasi</span>
          </button>
        </div>
      `;
      break;

    case 'PARTNER_ON_THE_WAY':
      stepCardContent = `
        <div class="space-y-2.5">
          <div class="flex items-center justify-between">
            <span class="text-[10px] font-black uppercase tracking-wider text-orange-700 bg-orange-100 px-2 py-0.5 rounded-full">
              Tahap 2 dari 4: Mitra di Perjalanan
            </span>
            <span class="text-[11px] font-bold text-orange-600">Estimasi ~10 Mnt</span>
          </div>
          <p class="text-xs text-slate-600 leading-relaxed">
            Mitra sedang mengendarai motor menuju koordinat GPS rumah Anda di Manado.
          </p>
          <button onclick="advanceOrderStatus('${ord.id}', 'IN_PROGRESS')" class="w-full py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow transition flex items-center justify-center gap-2">
            <span>📍 Simulasikan: Mitra Tiba & Mulai Kerja Fisik</span>
            <span class="text-indigo-200">→ Lanjut Tahap 3</span>
          </button>
        </div>
      `;
      break;

    case 'IN_PROGRESS':
      stepCardContent = `
        <div class="space-y-2.5">
          <div class="flex items-center justify-between">
            <span class="text-[10px] font-black uppercase tracking-wider text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-full">
              Tahap 3 dari 4: Pekerjaan Fisik
            </span>
            <span class="text-[11px] font-bold text-indigo-600">Sedang Dikerjakan</span>
          </div>
          <p class="text-xs text-slate-600 leading-relaxed">
            Mitra sedang melakukan servis fisik di tempat dan mendokumentasikan foto awal.
          </p>
          <button onclick="advanceOrderStatus('${ord.id}', 'WORK_SUBMITTED')" class="w-full py-2.5 px-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs shadow transition flex items-center justify-center gap-2">
            <span>🔧 Simulasikan: Pengerjaan Beres & Unggah Bukti</span>
            <span class="text-teal-200">→ Lanjut Tahap 4</span>
          </button>
        </div>
      `;
      break;

    case 'WORK_SUBMITTED':
      stepCardContent = `
        <div class="space-y-2.5">
          <div class="flex items-center justify-between">
            <span class="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
              Tahap 4 dari 4: Verifikasi & Rilis Dana
            </span>
            <span class="text-[11px] font-bold text-emerald-600">Pekerjaan Tuntas</span>
          </div>
          <p class="text-xs text-slate-600 leading-relaxed">
            Mitra telah menyelesaikan pekerjaan fisik dan mengunggah foto komparasi bukti kerja. Silakan periksa kartu bukti foto di bawah ini untuk mengambil keputusan:
          </p>
          <div class="p-2.5 bg-teal-50 border border-teal-200 rounded-xl text-center space-y-1">
            <span class="text-[11px] font-black text-[#16627A] block">👇 Keputusan Verifikasi Anda Ada di Bawah:</span>
            <p class="text-[10px] text-slate-600">Pilih <strong>[Konfirmasi Selesai & Rilis Dana]</strong> jika puas, atau <strong>[Ajukan Komplain Garansi 1x24 Jam]</strong> jika bermasalah.</p>
          </div>
        </div>
      `;
      break;

    case 'ORDER_COMPLETED':
      stepCardContent = `
        <div class="space-y-2.5 text-center">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-extrabold">
            <span>✓</span> Transaksi Tuntas & Dana Dirilis
          </div>
          <p class="text-xs text-slate-600 leading-relaxed">
            Seluruh tahapan (1 s/d 4) telah berhasil diselesaikan secara bertahap. Dana telah dikreditkan ke dompet mitra.
          </p>
        </div>
      `;
      break;

    case 'DISPUTE_OPENED':
      stepCardContent = `
        <div class="space-y-2.5">
          <div class="flex items-center justify-between">
            <span class="text-[10px] font-black uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
              Tiket Mediasi Sengketa Aktif
            </span>
            <span class="text-[11px] font-bold text-amber-700">Dana Dibekukan</span>
          </div>
          <p class="text-xs text-slate-600 leading-relaxed">
            Garansi 1x24 jam diajukan. Alur ditangani tim mediasi Admin untuk investigasi bukti dan penentuan putusan sengketa.
          </p>
          <button onclick="switchRole('admin'); showAdminModule(7);" class="w-full py-2.5 px-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs shadow transition flex items-center justify-center gap-2">
            <span>🛡️ Buka Ruang Mediasi Sengketa di Admin</span>
            <span>→</span>
          </button>
        </div>
      `;
      break;

    default:
      stepCardContent = `
        <div class="text-center py-2 space-y-1">
          <span class="text-xs font-bold text-slate-700 block">Status Sengketa Diputuskan: ${ord.status}</span>
          <p class="text-[10px] text-slate-500">Putusan telah dieksekusi di rekening escrow.</p>
        </div>
      `;
      break;
  }

  return `
    <div class="bg-gradient-to-br from-slate-50 to-blue-50/40 rounded-2xl p-4 border border-slate-200/90 shadow-sm space-y-3">
      <div class="flex items-center justify-between pb-2 border-b border-slate-200">
        <div class="flex items-center gap-2">
          <span class="text-sm">🎯</span>
          <div>
            <h3 class="text-xs font-black text-[#0E2A35]">SIMULATOR PENGUJIAN BERTAHAP</h3>
            <p class="text-[10px] text-slate-500">Maju selangkah demi selangkah sesuai siklus hidup pesanan</p>
          </div>
        </div>
        <button onclick="advanceOrderStatus('${ord.id}', 'AWAITING_CONFIRMATION')" title="Ulangi simulasi alur dari Tahap 1" class="text-[10px] font-extrabold text-slate-500 hover:text-[#EE7A34] bg-white hover:bg-orange-50 px-2 py-1 rounded-lg border border-slate-200 shadow-2xs transition">
          ↺ Ulang Tahap 1
        </button>
      </div>

      ${stepCardContent}
    </div>
  `;
}

// 6. TRACKING & ESCROW LIFECYCLE SCREEN (With Step Simulator & 1x24h Dispute)
function renderTrackingScreen() {
  const ord = appState.orders.find(o => o.id === appState.activeOrderId) || appState.orders[0];
  const partner = appState.partners.find(p => p.id === ord.partnerId);

  // Status mapping
  const statusMeta = {
    'AWAITING_CONFIRMATION': { step: 1, label: 'Menunggu Konfirmasi Mitra', color: 'bg-amber-500', desc: 'Mitra memiliki SLA 15 menit untuk mengonfirmasi pesanan.' },
    'ORDER_ACCEPTED': { step: 2, label: 'Pesanan Diterima Mitra', color: 'bg-[#16627A]', desc: 'Mitra bersiap menuju ke alamat yang Anda tentukan di Manado.' },
    'PARTNER_ON_THE_WAY': { step: 2, label: 'Mitra Menuju Lokasi Anda', color: 'bg-[#EE7A34]', desc: 'Mitra sedang di perjalanan dengan kendaraan.' },
    'IN_PROGRESS': { step: 3, label: 'Pekerjaan Fisik Sedang Berlangsung', color: 'bg-indigo-600', desc: 'Mitra tiba di lokasi dan sedang melakukan perbaikan fisik.' },
    'WORK_SUBMITTED': { step: 4, label: 'Pekerjaan Selesai (Verifikasi Anda)', color: 'bg-teal-600', desc: 'Mitra telah mengunggah bukti kerja. Mohon periksa hasil pengerjaan.' },
    'ORDER_COMPLETED': { step: 5, label: 'Pesanan Selesai (Dana Dirilis)', color: 'bg-emerald-600', desc: 'Hasil kerja tuntas dan saldo telah dikreditkan ke dompet mitra.' },
    'DISPUTE_OPENED': { step: 4, label: 'Komplain Garansi 1x24 Jam Aktif', color: 'bg-amber-600', desc: 'Dana di escrow DIBEKUKAN. Tim mediasi Admin sedang menginvestigasi sengketa.' },
    'RESOLVED_REFUNDED': { step: 5, label: 'Sengketa Selesai: 100% Refund', color: 'bg-emerald-600', desc: 'Dana dikembalikan penuh ke rekening Anda sesuai putusan admin.' },
    'RESOLVED_SPLIT': { step: 5, label: 'Sengketa Selesai: Split 50:50', color: 'bg-amber-600', desc: 'Dana telah didistribusikan secara proporsional sesuai putusan mediasi admin.' },
    'RESOLVED_RELEASE': { step: 5, label: 'Sengketa Selesai: Dana Dirilis', color: 'bg-emerald-600', desc: 'Pekerjaan terbukti tuntas, dana telah dirilis ke mitra.' }
  }[ord.status] || { step: 1, label: ord.status, color: 'bg-slate-500', desc: '' };

  return `
    <div class="animate-screen pb-24 relative min-h-full">
      
      <!-- Top Bar -->
      <div class="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-4 py-3.5 border-b border-slate-100 flex items-center justify-between shadow-xs">
        <button onclick="closeSubscreen()" class="w-9 h-9 rounded-xl bg-[#F4F8FA] text-[#0E2A35] flex items-center justify-center hover:bg-slate-200/70 transition">
          ${ICONS.back}
        </button>
        <div class="text-center">
          <span class="text-xs font-black text-[#0E2A35]">Status & Pelacakan Pesanan</span>
          <p class="text-[10px] text-slate-400 font-mono">${ord.id}</p>
        </div>
        <button onclick="switchRole('admin'); showAdminModule(6);" title="Buka modul audit escrow di Admin" class="text-[10px] font-bold text-[#16627A] bg-teal-50 px-2 py-1 rounded-lg">
          Lihat di Admin
        </button>
      </div>

      <!-- Main Tracking Content -->
      <div class="p-4 space-y-4">
        
        <!-- ESCROW VAULT LIVE INDICATOR -->
        <div class="rounded-2xl p-4 text-white shadow-md ${ord.escrowStatus === 'FUNDS_FROZEN_ESCROW' ? 'bg-gradient-to-r from-amber-600 to-amber-700' : 'bg-gradient-to-r from-[#16627A] to-[#1D7794]'}">
          <div class="flex items-center justify-between mb-1">
            <span class="text-[10px] font-extrabold uppercase tracking-wider text-amber-300 flex items-center gap-1">
              <span>🔒</span> ${ord.escrowStatus === 'FUNDS_FROZEN_ESCROW' ? 'DANA DIBEKUKAN (SENGKETA)' : ord.escrowStatus === 'RELEASED_TO_PARTNER' ? 'DANA SUDAH DIRILIS KE MITRA' : 'REKENING BERSAMA (ESCROW VAULT)'}
            </span>
            <span class="text-xs font-black">${formatRupiah(ord.totalInvoice)}</span>
          </div>
          <p class="text-xs text-teal-50 leading-relaxed">
            ${ord.escrowStatus === 'FUNDS_FROZEN_ESCROW' 
              ? 'Dana Anda dibekukan secara aman di sistem mediasi JASAKU sampai klaim garansi diputuskan admin.' 
              : ord.escrowStatus === 'RELEASED_TO_PARTNER'
              ? 'Pekerjaan telah terverifikasi tuntas. Dana bersih (90%) telah dikreditkan ke dompet saldo mitra.'
              : 'Uang Anda aman ditahan sistem. Dana HANYA dirilis ke mitra setelah Anda memeriksa dan puas atas hasil pengerjaan.'}
          </p>
        </div>

        <!-- INVOICE BREAKDOWN TRANSPARENCY -->
        <div class="bg-white rounded-2xl p-3.5 shadow-card border border-slate-100 space-y-2 text-xs">
          <div class="flex items-center justify-between font-extrabold text-[#0E2A35] border-b border-slate-100 pb-1.5">
            <span>Rincian Tagihan & Biaya Rekber</span>
            <span class="text-[#EE7A34]">${formatRupiah(ord.totalInvoice)}</span>
          </div>
          <div class="flex items-center justify-between text-slate-500 text-[11px]">
            <span>Tarif Jasa Dasar (${ord.serviceName})</span>
            <span class="font-bold text-slate-700">${formatRupiah(ord.basePrice)}</span>
          </div>
          <div class="flex items-center justify-between text-slate-500 text-[11px]">
            <span>Biaya Proteksi Rekening Bersama</span>
            <span class="font-bold text-slate-700">${formatRupiah(ord.protectionFee)}</span>
          </div>
          ${ord.discount > 0 ? `
            <div class="flex items-center justify-between text-emerald-600 text-[11px]">
              <span>Potongan Kupon Promo (JOKOWI)</span>
              <span class="font-bold">- ${formatRupiah(ord.discount)}</span>
            </div>
          ` : ''}
          ${ord.pointsDiscount > 0 ? `
            <div class="flex items-center justify-between text-amber-600 text-[11px]">
              <span>🪙 Tukar Poin JASAKU (${ord.pointsUsed || 0} Poin)</span>
              <span class="font-bold">- ${formatRupiah(ord.pointsDiscount)}</span>
            </div>
          ` : ''}
          ${ord.status === 'ORDER_COMPLETED' ? `
            <div class="flex items-center justify-between text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg text-[11px] font-bold">
              <span>🪙 Reward Transaksi Tuntas:</span>
              <span>+250 Poin JASAKU</span>
            </div>
          ` : ''}
          <div class="flex items-center justify-between text-slate-500 text-[11px] pt-1 border-t border-slate-100">
            <span>Metode Bayar</span>
            <span class="font-bold text-slate-700">${ord.paymentMethod}</span>
          </div>
        </div>

        <!-- CURRENT STATUS HERO -->
        <div class="bg-white rounded-2xl p-4 shadow-card border border-slate-100 text-center">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${statusMeta.color} text-white text-xs font-extrabold mb-2">
            <span class="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            ${statusMeta.label}
          </div>
          <p class="text-xs text-slate-600 leading-relaxed max-w-xs mx-auto">
            ${statusMeta.desc}
          </p>
        </div>

        <!-- 4-STEP VISUAL PROGRESS LIFECYCLE -->
        <div class="bg-white rounded-2xl p-4 shadow-card border border-slate-100">
          <div class="flex items-center justify-between mb-3">
            <h2 class="text-xs font-extrabold uppercase tracking-wider text-slate-400">Alur Pengerjaan Fisik</h2>
            <span class="text-[10px] font-black px-2 py-0.5 rounded-full ${statusMeta.step >= 4 ? 'bg-emerald-100 text-emerald-800' : 'bg-teal-100 text-[#16627A]'}">
              Langkah ${statusMeta.step} dari 4
            </span>
          </div>
          <div class="space-y-3">
            
            <div class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${statusMeta.step > 1 ? 'bg-emerald-600 text-white' : statusMeta.step === 1 ? 'bg-[#16627A] text-white ring-4 ring-teal-100' : 'bg-slate-200 text-slate-400'}">
                ${statusMeta.step > 1 ? '✓' : '1'}
              </div>
              <div class="flex-1">
                <p class="text-xs font-extrabold ${statusMeta.step === 1 ? 'text-[#16627A]' : 'text-[#0E2A35]'}">1. Konfirmasi Mitra (SLA 15 Menit)</p>
                <p class="text-[11px] text-slate-500">Mitra menerima pesanan dan menyetujui jadwal kedatangan.</p>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${statusMeta.step > 2 ? 'bg-emerald-600 text-white' : statusMeta.step === 2 ? 'bg-[#EE7A34] text-white ring-4 ring-orange-100' : 'bg-slate-200 text-slate-400'}">
                ${statusMeta.step > 2 ? '✓' : '2'}
              </div>
              <div class="flex-1">
                <p class="text-xs font-extrabold ${statusMeta.step === 2 ? 'text-[#EE7A34]' : 'text-[#0E2A35]'}">2. Mitra Menuju Lokasi (OTW)</p>
                <p class="text-[11px] text-slate-500">Mitra menyalakan pelacak GPS dan berangkat ke alamat Anda.</p>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${statusMeta.step > 3 ? 'bg-emerald-600 text-white' : statusMeta.step === 3 ? 'bg-indigo-600 text-white ring-4 ring-indigo-100' : 'bg-slate-200 text-slate-400'}">
                ${statusMeta.step > 3 ? '✓' : '3'}
              </div>
              <div class="flex-1">
                <p class="text-xs font-extrabold ${statusMeta.step === 3 ? 'text-indigo-700' : 'text-[#0E2A35]'}">3. Pengerjaan Lapangan (Foto Awal)</p>
                <p class="text-[11px] text-slate-500">Mitra tiba di lokasi dan mulai melakukan perbaikan fisik.</p>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${statusMeta.step >= 4 ? 'bg-[#10B981] text-white ring-4 ring-emerald-100' : 'bg-slate-200 text-slate-400'}">
                ${statusMeta.step >= 5 ? '✓' : '4'}
              </div>
              <div class="flex-1">
                <p class="text-xs font-extrabold ${statusMeta.step >= 4 ? 'text-emerald-700' : 'text-[#0E2A35]'}">4. Verifikasi & Pelepasan Dana (Escrow)</p>
                <p class="text-[11px] text-slate-500">Konsumen menguji hasil kerja / ajukan komplain garansi 1x24 jam.</p>
              </div>
            </div>

          </div>
        </div>

        <!-- SEQUENTIAL CONTEXTUAL STEP SIMULATOR (BERTAHAP SATU PER SATU) -->
        ${renderSequentialStepSimulator(ord)}

        <!-- TECHNICIAN INFO & CONTACT -->
        ${partner ? `
          <div class="bg-white rounded-2xl p-4 shadow-card border border-slate-100 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-full ${partner.avatarBg} text-white font-extrabold flex items-center justify-center text-sm shadow-sm">
                ${partner.name.split(' ').map(n=>n[0]).join('')}
              </div>
              <div>
                <p class="text-xs font-black text-[#0E2A35]">${partner.name}</p>
                <p class="text-[11px] text-slate-500">${partner.category} • ${partner.plate}</p>
                <div class="flex items-center gap-1 text-[10px] font-bold text-slate-700">
                  ${ICONS.star} <span class="text-[#EE7A34]">${partner.rating}</span>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <button onclick="startDirectChat('${partner.id}')" class="w-9 h-9 rounded-full bg-teal-50 text-[#16627A] flex items-center justify-center hover:bg-teal-100 transition shadow-sm">
                ${ICONS.chat}
              </button>
              <button onclick="showToast('Menghubungi telepon teknisi: ${partner.phone}')" class="w-9 h-9 rounded-full bg-orange-50 text-[#EE7A34] flex items-center justify-center hover:bg-orange-100 transition shadow-sm">
                ${ICONS.phone}
              </button>
            </div>
          </div>
        ` : ''}

        <!-- INSPECTION BOX (When Status is WORK_SUBMITTED) -->
        ${ord.status === 'WORK_SUBMITTED' ? `
          <div class="bg-white rounded-2xl p-4 border-2 border-[#16627A] shadow-md space-y-3">
            <div class="flex items-center gap-2 text-xs font-extrabold text-[#16627A]">
              <span>📸</span>
              <span>Bukti Hasil Kerja Mitra Tuntas</span>
            </div>
            <p class="text-xs text-slate-600 leading-relaxed">
              Mitra telah menyelesaikan pekerjaan fisik dan mengunggah foto bukti kerja tuntas. Silakan uji coba AC/layanan Anda sekarang.
            </p>
            <div class="grid grid-cols-2 gap-2">
              <div class="bg-slate-100 rounded-xl p-2.5 text-center border border-slate-200">
                <span class="text-[10px] font-extrabold text-slate-500 block mb-1">Foto Sebelum</span>
                <div class="h-20 bg-slate-200 rounded-lg flex items-center justify-center text-[10px] text-slate-500">
                  [Foto Kerusakan Awal]
                </div>
              </div>
              <div class="bg-slate-100 rounded-xl p-2.5 text-center border border-slate-200">
                <span class="text-[10px] font-extrabold text-[#16627A] block mb-1">Foto Sesudah Beres</span>
                <div class="h-20 bg-teal-100/60 rounded-lg flex items-center justify-center text-[10px] text-[#16627A] font-bold">
                  [Foto Selesai Bersih]
                </div>
              </div>
            </div>

            <!-- TWO CRITICAL DECISION BUTTONS (PRD Rule 3.2) -->
            <div class="space-y-2 pt-2">
              <button onclick="confirmOrderFinish('${ord.id}')" class="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:opacity-95 text-white font-extrabold text-xs shadow-md transition transform active:scale-95 flex items-center justify-center gap-2">
                ${ICONS.check}
                Hasil Kerja Bagus: Konfirmasi Selesai & Rilis Dana
              </button>

              <button onclick="openDisputeModal('${ord.id}')" class="w-full py-2.5 rounded-2xl bg-white hover:bg-amber-50 text-amber-700 border border-amber-300 font-extrabold text-xs transition flex items-center justify-center gap-2">
                ${ICONS.alertTriangle}
                Ada Kendala / Rusak? Ajukan Komplain Garansi 1x24 Jam
              </button>
            </div>
          </div>
        ` : ''}

        <!-- IF ALREADY IN DISPUTE -->
        ${ord.status === 'DISPUTE_OPENED' ? `
          <div class="bg-amber-50 border border-amber-300 rounded-2xl p-4 space-y-2">
            <div class="flex items-center gap-2 text-xs font-black text-amber-800">
              ${ICONS.alertTriangle}
              Tiket Sengketa Sedang Dimediasi Admin (${ord.disputeTicketId || 'DSP-104'})
            </div>
            <p class="text-xs text-amber-900 leading-relaxed">
              Anda telah mengajukan klaim garansi. Tim Admin JASAKU sedang meninjau foto bukti kerusakan Anda dan transkrip obrolan dengan mitra. Sisa waktu penanganan SLA: <strong>18 Jam 40 Menit</strong>.
            </p>
            <button onclick="switchRole('admin'); showAdminModule(7);" class="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs">
              Buka Ruang Mediasi Admin →
            </button>
          </div>
        ` : ''}

      </div>

    </div>
  `;
}

// 7. DISPUTE SUBMISSION MODAL (Customer 1x24h Guarantee)
function renderDisputeModal(orderId) {
  const ord = appState.orders.find(o => o.id === orderId);

  return `
    <div class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
      <div class="w-full sm:w-[400px] bg-white rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto no-scrollbar">
        
        <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
          <div class="flex items-center gap-2 text-amber-700">
            ${ICONS.alertTriangle}
            <span class="text-xs font-black uppercase">Formulir Klaim Garansi 1x24 Jam</span>
          </div>
          <button onclick="closeModal()" class="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800">
            ${ICONS.close}
          </button>
        </div>

        <div class="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 leading-relaxed space-y-1">
          <p class="font-extrabold">⚖️ Proteksi Otomatis Rekber JASAKU:</p>
          <p class="text-[11px]">
            Pengajuan komplain ini otomatis <strong>MEMBEKUKAN DANA ESCROW (${formatRupiah(ord ? ord.totalInvoice : 67000)})</strong>. Dana tidak akan cair ke mitra sampai tim investigasi Admin menyelesaikan mediasi bukti.
          </p>
        </div>

        <div class="space-y-3">
          <div>
            <label class="block text-xs font-extrabold text-[#0E2A35] mb-1">Alasan Utama Komplain</label>
            <select id="dispute-reason-select" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#16627A]">
              <option value="HASIL_TIDAK_DINGIN">AC tetap panas / tidak dingin setelah dicuci</option>
              <option value="KEBOCORAN_BARU">Ada kebocoran air baru setelah teknisi pulang</option>
              <option value="KERUSAKAN_BARANG">Barang atau furnitur mengalami lecet/rusak</option>
              <option value="PEKERJAAN_BELUM_TUNTAS">Pekerjaan fisik ditinggalkan sebelum beres</option>
              <option value="LAINNYA">Lainnya (Jelaskan rincian di bawah)</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-extrabold text-[#0E2A35] mb-1">Rincian Kronologi Kendala</label>
            <textarea id="dispute-detail-text" rows="3" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#16627A]" placeholder="Ceritakan apa yang terjadi dan kendala yang Anda alami..."></textarea>
          </div>

          <div class="p-2.5 bg-slate-100 rounded-xl border border-slate-200 text-center">
            <span class="text-[10px] text-slate-500 block mb-1">Lampiran Foto Bukti Kendala (Wajib)</span>
            <div class="h-16 bg-white rounded-lg border border-dashed border-slate-300 flex items-center justify-center text-xs text-slate-400">
              [📸 2 Foto Bukti Terlampir dari Kamera]
            </div>
          </div>
        </div>

        <div class="space-y-2 pt-1">
          <button onclick="submitDisputeTicket('${ord.id}')" class="w-full py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs shadow-md transition">
            Kirim Komplain & Bekukan Dana Escrow
          </button>
          <button onclick="closeModal()" class="w-full py-2 text-slate-500 font-bold text-xs hover:text-slate-800 transition">
            Batal
          </button>
        </div>

      </div>
    </div>
  `;
}

// 8. REVIEW SCREEN (After Completion)
function renderReviewScreen() {
  const ord = appState.orders.find(o => o.id === appState.activeOrderId) || appState.orders[0];

  return `
    <div class="p-5 text-center space-y-5 animate-fade-in my-auto pb-20">
      <div class="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl shadow-inner">
        ✓
      </div>

      <div>
        <h1 class="text-base font-black text-[#0E2A35]">Pesanan Berhasil Diselesaikan!</h1>
        <p class="text-xs text-slate-500 max-w-xs mx-auto mt-1">
          Dana telah dirilis aman ke dompet mitra. Bagaimana pengalaman Anda menggunakan JASAKU?
        </p>
      </div>

      <!-- Reward Poin Card -->
      <div class="bg-gradient-to-r from-amber-500 via-amber-600 to-[#EE7A34] text-white rounded-2xl p-4 shadow-md flex items-center justify-between text-left">
        <div class="flex items-center gap-3">
          <div class="w-11 h-11 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl shrink-0">
            🪙
          </div>
          <div>
            <span class="text-[9px] font-black uppercase tracking-wider bg-white/25 px-2 py-0.5 rounded-full">Reward Transaksi Tuntas</span>
            <p class="text-xs font-black mt-0.5">+250 Poin JASAKU Diperoleh!</p>
            <p class="text-[10px] text-amber-100">Total Saldo: ${(appState.customers.find(c=>c.id==='c1')||{points:1250}).points.toLocaleString('id-ID')} Poin</p>
          </div>
        </div>
        <div class="text-right shrink-0">
          <span class="text-[10px] font-black bg-white text-amber-600 px-2 py-1 rounded-lg shadow-xs">Setara Rp2.500</span>
        </div>
      </div>

      <!-- 5 Star Picker -->
      <div class="bg-white rounded-3xl p-5 shadow-card border border-slate-100 space-y-3">
        <div class="flex items-center justify-center gap-2 py-2">
          ${[1, 2, 3, 4, 5].map(st => `
            <button onclick="setReviewRating(${st})" class="text-3xl text-amber-400 hover:scale-125 transition transform">
              ★
            </button>
          `).join('')}
        </div>
        <span class="text-xs font-black text-amber-500">Sangat Puas (5 Bintang)</span>

        <textarea rows="3" class="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#16627A]" placeholder="Tulis testimoni Anda untuk mitra teknisi..."></textarea>
      </div>

      <button onclick="appState.customerSubscreen=null; navCustomerTab('home');" class="w-full py-3 rounded-2xl bg-[#16627A] hover:bg-[#0F495B] text-white font-extrabold text-xs shadow-md transition">
        Kirim Ulasan & Kembali ke Beranda
      </button>
    </div>
  `;
}

// 9. ORDERS TAB (Daftar Pesanan dengan Filter Tabs)
function renderOrdersTab() {
  const filter = appState.ordersFilter;
  let filtered = appState.orders;

  if (filter === 'active') {
    filtered = appState.orders.filter(o => !['ORDER_COMPLETED', 'RESOLVED_REFUNDED', 'ORDER_CLOSED'].includes(o.status));
  } else if (filter === 'completed') {
    filtered = appState.orders.filter(o => ['ORDER_COMPLETED', 'RESOLVED_REFUNDED', 'ORDER_CLOSED'].includes(o.status));
  } else if (filter === 'dispute') {
    filtered = appState.orders.filter(o => o.status === 'DISPUTE_OPENED');
  }

  return `
    <div class="animate-screen p-4 space-y-4 pb-20">
      
      <div class="flex items-center justify-between border-b border-slate-200 pb-3">
        <h1 class="text-sm font-black text-[#0E2A35]">Daftar Transaksi Saya</h1>
        <span class="text-xs text-slate-400 font-mono">${appState.orders.length} Pesanan</span>
      </div>

      <!-- Filter Chips -->
      <div class="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
        ${[
          { id: 'all', label: 'Semua' },
          { id: 'active', label: 'Berlangsung' },
          { id: 'completed', label: 'Selesai' },
          { id: 'dispute', label: 'Sengketa/Garansi' }
        ].map(flt => `
          <button onclick="setOrdersFilter('${flt.id}')" class="px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition ${appState.ordersFilter === flt.id ? 'bg-[#16627A] text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-600'}">
            ${flt.label}
          </button>
        `).join('')}
      </div>

      <!-- Orders List -->
      <div class="space-y-3">
        ${filtered.map(ord => `
          <div onclick="openOrderTracking('${ord.id}')" class="bg-white rounded-2xl p-4 shadow-card border border-slate-100 hover:border-teal-300 cursor-pointer transition space-y-2.5">
            <div class="flex items-center justify-between">
              <span class="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md ${
                ord.status === 'ORDER_COMPLETED' ? 'bg-emerald-50 text-emerald-700' :
                ord.status === 'DISPUTE_OPENED' ? 'bg-amber-50 text-amber-700' :
                'bg-teal-50 text-[#16627A]'
              }">
                ${ord.status.replace(/_/g, ' ')}
              </span>
              <span class="text-[10px] font-mono text-slate-400">${ord.id}</span>
            </div>

            <div>
              <h3 class="text-xs font-black text-[#0E2A35]">${ord.serviceName}</h3>
              <p class="text-[11px] text-slate-500">${ord.packageName} • Mitra: ${ord.partnerName}</p>
            </div>

            <div class="flex items-center justify-between pt-2 border-t border-slate-100">
              <div>
                <span class="text-[10px] text-slate-400">Total Tagihan</span>
                <p class="text-xs font-extrabold text-[#EE7A34]">${formatRupiah(ord.totalInvoice)}</p>
              </div>
              <span class="text-xs font-bold text-[#16627A] flex items-center gap-1">
                Lacak Progres →
              </span>
            </div>
          </div>
        `).join('')}
      </div>

    </div>
  `;
}

// 10. CHAT TAB & CHAT ROOM (With UU PDP Sensor Alert)
function renderChatTab() {
  return `
    <div class="animate-screen p-4 space-y-4 pb-20">
      
      <div class="flex items-center justify-between border-b border-slate-200 pb-3">
        <h1 class="text-sm font-black text-[#0E2A35]">Percakapan & Notifikasi</h1>
        <span class="text-xs text-slate-400">${appState.chats.length} Mitra</span>
      </div>

      <!-- UU PDP Privacy Warning Banner -->
      <div class="bg-[#F4F8FA] border border-slate-200 rounded-2xl p-3 text-[11px] text-slate-600 flex items-start gap-2 shadow-2xs">
        <span class="text-[#16627A] font-bold">🔒</span>
        <span>
          <strong>Keamanan Privasi (UU PDP No. 27/2022):</strong> Nomor rekening pribadi dan nomor telepon disensor otomatis dalam percakapan demi perlindungan dari risiko transaksi di luar aplikasi.
        </span>
      </div>

      <!-- Chat Threads -->
      <div class="space-y-2">
        ${appState.chats.map(chat => `
          <div onclick="openChatRoom('${chat.partnerId}')" class="bg-white rounded-2xl p-3.5 shadow-card border border-slate-100 hover:border-teal-300 cursor-pointer transition flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-full bg-teal-600 text-white font-extrabold flex items-center justify-center text-sm shadow-sm">
                ${chat.partnerName.split(' ').map(n=>n[0]).join('')}
              </div>
              <div>
                <div class="flex items-center gap-1.5">
                  <h3 class="text-xs font-black text-[#0E2A35]">${chat.partnerName}</h3>
                  <span class="text-[9px] text-[#16627A] font-bold bg-teal-50 px-1.5 rounded">Mitra</span>
                </div>
                <p class="text-[11px] text-slate-500 truncate max-w-[180px]">${chat.lastMessage}</p>
              </div>
            </div>
            <div class="text-right">
              <span class="text-[10px] text-slate-400">${chat.lastTime}</span>
              ${chat.unread > 0 ? `<span class="w-4 h-4 rounded-full bg-[#EE7A34] text-white text-[9px] font-black flex items-center justify-center ml-auto mt-1">${chat.unread}</span>` : ''}
            </div>
          </div>
        `).join('')}
      </div>

    </div>
  `;
}

function renderChatRoomScreen() {
  const chat = appState.chats.find(c => c.partnerId === appState.activeChatPartnerId) || appState.chats[0];

  return `
    <div class="animate-screen flex flex-col h-full bg-[#F4F8FA]">
      
      <!-- Chat Header -->
      <div class="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between shrink-0 shadow-sm">
        <div class="flex items-center gap-3">
          <button onclick="appState.customerSubscreen=null; navCustomerTab('chat');" class="w-9 h-9 rounded-xl bg-[#F4F8FA] text-[#0E2A35] flex items-center justify-center hover:bg-slate-200/70 transition">
            ${ICONS.back}
          </button>
          <div>
            <h2 class="text-xs font-black text-[#0E2A35]">${chat.partnerName}</h2>
            <p class="text-[10px] text-emerald-600 font-bold">● Online • ${chat.partnerRole}</p>
          </div>
        </div>
        <button onclick="showToast('Menghubungi hotline bantuan JASAKU')" class="text-xs font-bold text-[#16627A] bg-teal-50 px-2.5 py-1 rounded-xl">
          Bantuan
        </button>
      </div>

      <!-- Messages Thread -->
      <div class="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar pb-6">
        <div class="text-center">
          <span class="text-[10px] bg-slate-200/70 text-slate-600 px-2.5 py-1 rounded-full font-semibold">
            Pesan terenkripsi end-to-end (UU PDP No. 27/2022)
          </span>
        </div>

        ${chat.messages.map(msg => `
          <div class="flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}">
            <div class="max-w-[78%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed shadow-sm ${msg.sender === 'user' ? 'bg-[#16627A] text-white rounded-tr-none' : 'bg-white border border-slate-200 text-[#0E2A35] rounded-tl-none'}">
              <p>${msg.text}</p>
              <span class="text-[9px] block text-right mt-1 opacity-75">${msg.time}</span>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Chat Input Field -->
      <div class="bg-white border-t border-slate-200 p-3 shrink-0 flex items-center gap-2">
        <input type="text" id="chat-reply-input" onkeydown="if(event.key==='Enter') sendChatMessage('${chat.partnerId}')" placeholder="Ketik pesan untuk teknisi..." class="flex-1 bg-[#F4F8FA] rounded-2xl px-4 py-2 text-xs border border-transparent focus:border-[#16627A] focus:outline-none">
        <button onclick="sendChatMessage('${chat.partnerId}')" class="w-9 h-9 rounded-full bg-[#16627A] text-white flex items-center justify-center shadow-md hover:bg-[#0F495B] transition">
          ${ICONS.send}
        </button>
      </div>

    </div>
  `;
}

// 11. PROFIL TAB (CS25 Visual Style with User Identity & Credentials)
function renderProfileTab() {
  const cust = appState.customers[0];
  const userInitials = cust.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

  return `
    <div class="animate-screen pb-6">
      <!-- Profile Top Header with Curved Teal Brand Gradient -->
      <div class="bg-gradient-to-br from-[#16627A] via-[#1D7C93] to-[#2CA5B8] px-4 pt-6 pb-8 rounded-b-[28px] text-white shadow-md relative overflow-hidden">
        <!-- Subtle Ambient Rings -->
        <div class="absolute -top-10 -right-10 w-40 h-40 rounded-full border border-white/10 pointer-events-none"></div>
        <div class="absolute -bottom-8 -left-8 w-32 h-32 rounded-full border border-white/10 pointer-events-none"></div>

        <div class="flex items-center gap-3.5 relative z-10">
          <div class="w-16 h-16 rounded-2xl bg-white text-[#16627A] font-black text-xl flex items-center justify-center shadow-lg shrink-0 border-2 border-white/80">
            ${userInitials}
          </div>
          <div class="flex-1 min-w-0">
            <h1 class="text-base font-extrabold truncate text-white leading-tight">${cust.name}</h1>
            <p class="text-xs text-teal-100 mt-0.5">${cust.phone}</p>
            <div class="flex items-center gap-1.5 mt-1.5">
              <span class="inline-block text-[10px] font-bold bg-[#EE7A34] text-white px-2.5 py-0.5 rounded-full shadow-xs">Member Prioritas Manado</span>
              <span class="inline-flex items-center gap-1 text-[10px] font-bold bg-white/20 text-white px-2 py-0.5 rounded-full backdrop-blur-xs">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Verified
              </span>
            </div>
          </div>
        </div>

        <!-- Stats Pill (3 Columns CS25 Style) -->
        <div class="grid grid-cols-3 gap-2 mt-5 bg-white/10 backdrop-blur-sm rounded-2xl p-3 text-center border border-white/15 relative z-10">
          <div>
            <p class="text-sm font-extrabold text-white">${cust.ordersCount}</p>
            <p class="text-[10px] text-teal-100 font-medium">Pesanan</p>
          </div>
          <div class="border-x border-white/15">
            <p class="text-sm font-extrabold text-amber-300 flex items-center justify-center gap-1">
              <span>🪙</span>
              <span>${(cust.points || 1250).toLocaleString('id-ID')}</span>
            </p>
            <p class="text-[10px] text-teal-100 font-medium">Poin JASAKU</p>
          </div>
          <div>
            <p class="text-sm font-extrabold text-white">2 Alamat</p>
            <p class="text-[10px] text-teal-100 font-medium">Manado</p>
          </div>
        </div>
      </div>

      <div class="px-4 -mt-3 space-y-3.5 relative z-20">
        <!-- Loyalty Reward Points Card -->
        <div class="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-4 shadow-card border border-amber-200/80 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-white flex items-center justify-center text-lg font-black shadow-sm shrink-0">
              🪙
            </div>
            <div>
              <p class="text-xs font-bold text-[#0E2A35]">Saldo Poin: ${(cust.points || 1250).toLocaleString('id-ID')} Poin</p>
              <p class="text-[10px] text-slate-500 mt-0.5">Nilai tukar: <strong class="text-amber-600">${formatRupiah((cust.points || 1250) * 10)}</strong> (Bisa ditukar diskon saat checkout!)</p>
            </div>
          </div>
          <button onclick="navCustomerTab('home')" class="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-[11px] font-extrabold transition shrink-0 shadow-xs">
            Tukar Poin
          </button>
        </div>

        <!-- Data Diri Card (CS25 Style) -->
        <div class="bg-white rounded-2xl p-4 shadow-card border border-slate-100">
          <h2 class="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3">Data Diri</h2>
          <div class="space-y-2.5 text-xs">
            <div class="flex justify-between items-center">
              <span class="text-slate-400">Nama Lengkap</span>
              <span class="font-bold text-[#0E2A35]">${cust.name}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-slate-400">Email</span>
              <span class="font-semibold text-[#0E2A35]">${cust.email || 'krisnasanugrah10@gmail.com'}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-slate-400">Nomor HP</span>
              <span class="font-semibold text-[#0E2A35]">${cust.phone}</span>
            </div>
            <div class="flex justify-between items-center pt-2 border-t border-slate-100">
              <span class="text-slate-400">Status Verifikasi</span>
              <span class="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> KYC Terverifikasi UU PDP
              </span>
            </div>
          </div>
        </div>

        <!-- Alamat Tersimpan Card (CS25 Style) -->
        <div class="bg-white rounded-2xl p-4 shadow-card border border-slate-100">
          <div class="flex items-center justify-between mb-2.5">
            <h2 class="text-xs font-extrabold uppercase tracking-wider text-slate-400">Alamat Tersimpan</h2>
            <button class="text-xs font-bold text-[#EE7A34] hover:underline">Kelola</button>
          </div>
          <div class="flex items-start gap-2.5 p-3 rounded-xl bg-[#F4F8FA] border border-slate-100">
            <span class="text-[#16627A] mt-0.5 shrink-0">${ICONS.pin}</span>
            <div class="min-w-0">
              <p class="text-xs font-bold text-[#0E2A35]">Kediaman Tikala Ares <span class="text-[10px] text-[#EE7A34] font-bold">(Utama)</span></p>
              <p class="text-[11px] text-slate-500 truncate mt-0.5">${cust.address}</p>
            </div>
          </div>
        </div>

        <!-- Perlindungan Escrow Card -->
        <div class="bg-white rounded-2xl p-4 shadow-card border border-slate-100">
          <h2 class="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-2.5">Perlindungan Transaksi</h2>
          <div class="p-3 bg-teal-50/70 rounded-xl border border-teal-100/80 flex items-start gap-2.5">
            <div class="w-7 h-7 rounded-lg bg-[#16627A] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
              ✓
            </div>
            <div class="min-w-0">
              <p class="text-xs font-bold text-[#0E2A35]">Rekening Bersama Escrow Aktif</p>
              <p class="text-[10px] text-slate-500 mt-0.5 leading-relaxed">Dana transaksi Anda dijamin 100% aman dalam rekening penampungan resmi JASAKU hingga pekerjaan selesai disetujui pelanggan.</p>
            </div>
          </div>
        </div>

        <!-- Menu Bantuan & Pengaturan Pelanggan (100% Realistis Alur Pelanggan) -->
        <div class="bg-white rounded-2xl shadow-card border border-slate-100 divide-y divide-slate-100 overflow-hidden">
          <button onclick="navCustomerTab('chat')" class="w-full px-4 py-3.5 flex items-center justify-between hover:bg-slate-50 transition text-left">
            <div class="flex items-center gap-3">
              <span class="w-8 h-8 rounded-xl bg-[#FFF3E8] text-[#EE7A34] flex items-center justify-center shrink-0">${ICONS.chat}</span>
              <div>
                <p class="text-xs font-bold text-[#0E2A35]">Hubungi JASAKU Care</p>
                <p class="text-[11px] text-slate-400">Respon cepat 24 jam wilayah Manado</p>
              </div>
            </div>
            <span class="text-slate-400">${ICONS.chevronRight}</span>
          </button>

          <button onclick="showToast('Garansi pengerjaan 7 hari & jaminan teknisi terverifikasi JASAKU Manado.')" class="w-full px-4 py-3.5 flex items-center justify-between hover:bg-slate-50 transition text-left">
            <div class="flex items-center gap-3">
              <span class="w-8 h-8 rounded-xl bg-[#E7F4F7] text-[#16627A] flex items-center justify-center shrink-0">${ICONS.shieldCheck}</span>
              <div>
                <p class="text-xs font-bold text-[#0E2A35]">Pusat Bantuan & Garansi 7 Hari</p>
                <p class="text-[11px] text-slate-400">Perlindungan komplain & klaim garansi servis</p>
              </div>
            </div>
            <span class="text-slate-400">${ICONS.chevronRight}</span>
          </button>

          <button onclick="showToast('Data pribadi pelanggan terproteksi enkripsi AES-256 sesuai UU PDP No. 27/2022.')" class="w-full px-4 py-3.5 flex items-center justify-between hover:bg-slate-50 transition text-left">
            <div class="flex items-center gap-3">
              <span class="w-8 h-8 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">📄</span>
              <div>
                <p class="text-xs font-bold text-[#0E2A35]">Kebijakan Privasi & UU PDP</p>
                <p class="text-[11px] text-slate-400">Kepatuhan UU No. 27/2022 & audit trail</p>
              </div>
            </div>
            <span class="text-slate-400">${ICONS.chevronRight}</span>
          </button>

          <button onclick="resetAppState()" class="w-full px-4 py-3.5 flex items-center justify-between hover:bg-slate-50 transition text-left">
            <div class="flex items-center gap-3">
              <span class="w-8 h-8 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold text-xs shrink-0">↺</span>
              <div>
                <p class="text-xs font-bold text-red-600">Reset Data Simulasi Pengguna</p>
                <p class="text-[11px] text-slate-400">Ulangi demo interaktif dari awal</p>
              </div>
            </div>
            <span class="text-slate-400">${ICONS.chevronRight}</span>
          </button>
        </div>

        <!-- Footer Brand Identity CS25 Style -->
        <div class="pt-2 flex flex-col items-center justify-center text-center opacity-85">
          <div class="p-2 bg-white rounded-xl shadow-xs border border-slate-100 mb-1.5">
            <img src="${window.JASAKU_LOGO_BASE64}" alt="JASAKU Logo" class="h-8 object-contain">
          </div>
          <p class="text-[11px] font-bold text-[#0E2A35]">JASAKU Service Platform • Prototype v1.0</p>
          <p class="text-[10px] text-slate-400 mt-0.5">Kota Manado, Sulawesi Utara • Sesuai Regulasi UU PDP</p>
        </div>

      </div>
    </div>
  `;
}
