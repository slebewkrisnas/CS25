// Helper: Get Package Price & Name from Draft Booking
function getSelectedPackagePrice() {
  const srv = appState.services.find(s => s.id === appState.draftBooking.serviceId) || appState.services[0];
  const pkg = srv.packages.find(p => p.id === appState.draftBooking.packageId) || srv.packages[0];
  const qty = appState.draftBooking.qty || 1;
  return pkg.price * qty;
}

function getSelectedPackageName() {
  const srv = appState.services.find(s => s.id === appState.draftBooking.serviceId) || appState.services[0];
  const pkg = srv.packages.find(p => p.id === appState.draftBooking.packageId) || srv.packages[0];
  const qty = appState.draftBooking.qty || 1;
  return qty > 1 ? `${pkg.name} (${qty} Unit)` : pkg.name;
}

function updateBookingQty(delta) {
  if (!appState.draftBooking.qty) appState.draftBooking.qty = 1;
  appState.draftBooking.qty = Math.max(1, Math.min(10, appState.draftBooking.qty + delta));
  renderCustomerApp();
}

function handleSearchCustomerServices(query) {
  appState.searchQuery = (query || '').trim().toLowerCase();
  renderCustomerApp();
}

// 1. GLOBAL ROLE SWITCHER (PRD 1.A)
function switchRole(newRole) {
  appState.role = newRole;
  if (newRole === 'customer') {
    appState.customerSubscreen = null;
  }
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 2. CUSTOMER NAVIGATION HANDLERS
function navCustomerTab(tabName) {
  appState.customerTab = tabName;
  appState.customerSubscreen = null;
  renderCustomerApp();
  const vp = document.getElementById('customer-viewport');
  if (vp) vp.scrollTo({ top: 0, behavior: 'instant' });
}

function openCategory(catId) {
  appState.activeCategoryId = catId;
  appState.customerSubscreen = 'category';
  renderCustomerApp();
  const vp = document.getElementById('customer-viewport');
  if (vp) vp.scrollTo({ top: 0, behavior: 'instant' });
}

function openServiceDetail(serviceId) {
  appState.activeServiceId = serviceId;
  appState.draftBooking.serviceId = serviceId;
  const srv = appState.services.find(s => s.id === serviceId) || appState.services[0];
  if (srv.packages && srv.packages.length > 0) {
    appState.draftBooking.packageId = srv.packages[0].id;
  }
  // Reset kupon agar alur pemesanan normal tidak otomatis terdiskon (harus diketik & diterapkan manual)
  appState.draftBooking.voucherApplied = null;
  appState.draftBooking.voucherInput = '';
  appState.customerSubscreen = 'serviceDetail';
  renderCustomerApp();
  const vp = document.getElementById('customer-viewport');
  if (vp) vp.scrollTo({ top: 0, behavior: 'instant' });
}

function selectPackage(pkgId) {
  appState.draftBooking.packageId = pkgId;
  renderCustomerApp();
}

function proceedToCheckout() {
  appState.customerSubscreen = 'checkout';
  renderCustomerApp();
  const vp = document.getElementById('customer-viewport');
  if (vp) vp.scrollTo({ top: 0, behavior: 'instant' });
}

function setBookingDate(dateStr) {
  appState.draftBooking.date = dateStr;
  renderCustomerApp();
}

function setBookingTime(timeSlot) {
  appState.draftBooking.timeSlot = timeSlot;
  renderCustomerApp();
}

function simulatePinAdjust() {
  appState.draftBooking.addressName = 'Kediaman Tikala Ares (Titik GPS Terkoreksi)';
  appState.draftBooking.addressDetail = 'Jl. Balai Kota No. 12 (Dekat Kantor Camat Tikala), Kec. Tikala, Kota Manado';
  showToast('📍 Titik koordinat GPS Tikala Ares berhasil diperbarui di peta Manado!');
  renderCustomerApp();
}

function applyVoucherCode() {
  const field = document.getElementById('voucher-input-field');
  const code = (field ? field.value : '').trim().toUpperCase();

  if (code === 'JOKOWI' || code === 'GOAT25' || code === 'MHSBARU') {
    appState.draftBooking.voucherApplied = { code: 'JOKOWI', discount: 15000 };
    showToast('🎉 Kupon JOKOWI berhasil! Potongan Rp15.000 diterapkan.');
  } else if (code === '') {
    appState.draftBooking.voucherApplied = null;
    showToast('Kupon dihapus.');
  } else {
    showToast('⚠️ Kode kupon tidak valid. Gunakan: JOKOWI');
  }
  renderCustomerApp();
}

function applyPromoQuick() {
  // Tidak otomatis menerapkan kupon, user harus mengetik dan menerapkan sendiri di checkout
  appState.draftBooking.voucherApplied = null;
  appState.draftBooking.voucherInput = '';
  openServiceDetail('srv-ac-split');
  showToast('💡 Masukkan kode kupon JOKOWI di halaman checkout untuk diskon Rp15.000!');
}

function removeVoucherCode() {
  appState.draftBooking.voucherApplied = null;
  appState.draftBooking.voucherInput = '';
  showToast('Kupon diskon dibatalkan.');
  renderCustomerApp();
}

function openPaymentModal() {
  const modalLayer = document.getElementById('customer-modal-layer');
  if (modalLayer) {
    modalLayer.innerHTML = renderPaymentModal();
  }
}

function closeModal() {
  const modalLayer = document.getElementById('customer-modal-layer');
  if (modalLayer) {
    modalLayer.innerHTML = '';
  }
}

// 3. PAYMENT CONFIRMATION & ESCROW VAULT LOCK
function confirmSimulatedPayment(finalTotal) {
  closeModal();

  const srv = appState.services.find(s => s.id === appState.draftBooking.serviceId) || appState.services[0];
  const partner = appState.partners.find(p => p.id === srv.partnerId) || appState.partners[0];
  const newOrderId = 'ORD-2026-' + (8800 + appState.orders.length + 1);

  const newOrder = {
    id: newOrderId,
    customerId: 'c1',
    customerName: 'Krisna Anugrah',
    customerPhone: '0812-3456-7890',
    address: appState.draftBooking.addressDetail,
    serviceId: srv.id,
    serviceName: srv.name,
    packageName: getSelectedPackageName(),
    partnerId: partner.id,
    partnerName: partner.name,
    partnerPhone: partner.phone,
    basePrice: getSelectedPackagePrice(),
    protectionFee: appState.draftBooking.protectionFee,
    discount: appState.draftBooking.voucherApplied ? appState.draftBooking.voucherApplied.discount : 0,
    totalInvoice: finalTotal,
    paymentMethod: appState.draftBooking.paymentMethod === 'qris' ? 'QRIS Dinamis' : 'BCA Virtual Account',
    paidAt: 'Baru saja',
    status: 'AWAITING_CONFIRMATION',
    escrowStatus: 'FUNDS_DEPOSITED_ESCROW',
    scheduledTime: `${appState.draftBooking.date} (${appState.draftBooking.timeSlot})`,
    createdAt: 'Baru saja',
    slaRemainingMinutes: 15,
    notes: appState.draftBooking.notes
  };

  // Prepend to orders
  appState.orders.unshift(newOrder);
  appState.activeOrderId = newOrderId;

  // Add immutable audit log
  appState.auditLogs.unshift({
    id: 'LOG-' + (440 + appState.auditLogs.length + 1),
    timestamp: new Date().toLocaleTimeString('id-ID'),
    admin: 'Sistem Escrow Gateway',
    action: 'ESCROW_FUNDS_DEPOSITED',
    target: `${newOrderId} (${formatRupiah(finalTotal)} dikunci)`,
    ip: '192.168.1.1',
    status: 'SUCCESS'
  });

  // Reset draft booking voucher for next session
  appState.draftBooking.voucherApplied = null;
  appState.draftBooking.voucherInput = '';

  showToast('✅ Pembayaran Berhasil! Dana dikunci aman di Rekening Bersama (Escrow Vault).');
  appState.customerSubscreen = 'tracking';
  renderCustomerApp();
}

// 4. ORDER STATUS STEP ADVANCEMENT SIMULATOR
function advanceOrderStatus(orderId, nextStatus) {
  const ord = appState.orders.find(o => o.id === orderId);
  if (!ord) return;

  ord.status = nextStatus;
  if (nextStatus === 'AWAITING_CONFIRMATION') {
    ord.escrowStatus = 'FUNDS_DEPOSITED_ESCROW';
  }

  // Add audit log
  appState.auditLogs.unshift({
    id: 'LOG-' + (440 + appState.auditLogs.length + 1),
    timestamp: new Date().toLocaleTimeString('id-ID'),
    admin: 'Mitra: ' + ord.partnerName,
    action: 'STATUS_UPDATE_' + nextStatus,
    target: orderId,
    ip: '192.168.1.20',
    status: 'SUCCESS'
  });

  showToast(`⚡ Status pesanan diperbarui: ${nextStatus.replace(/_/g, ' ')}`);
  renderCustomerApp();
}

// 5. CONFIRM FINISH & ESCROW RELEASE (PRD Section 3.2 & 7.1)
function confirmOrderFinish(orderId) {
  const ord = appState.orders.find(o => o.id === orderId);
  if (!ord) return;

  ord.status = 'ORDER_COMPLETED';
  ord.escrowStatus = 'RELEASED_TO_PARTNER';

  // Release 90% to partner wallet
  const partnerNet = Math.round(ord.basePrice * 0.9);
  const partner = appState.partners.find(p => p.id === ord.partnerId);
  if (partner) {
    partner.walletBalance += partnerNet;
    partner.jobsDone += 1;
  }

  // Audit Log
  appState.auditLogs.unshift({
    id: 'LOG-' + (440 + appState.auditLogs.length + 1),
    timestamp: new Date().toLocaleTimeString('id-ID'),
    admin: 'Escrow Auto-Disbursement Engine',
    action: 'ESCROW_RELEASE_TO_PARTNER',
    target: `${orderId}: +${formatRupiah(partnerNet)} ke ${partner ? partner.name : 'Mitra'}`,
    ip: '192.168.1.1',
    status: 'SUCCESS'
  });

  showToast('🎉 Dana berhasil dirilis ke dompet mitra (dipotong komisi 10%). Terima kasih!');
  appState.customerSubscreen = 'review';
  renderCustomerApp();
}

// 6. DISPUTE FILING (Garansi 1x24 Jam)
function openDisputeModal(orderId) {
  const modalLayer = document.getElementById('customer-modal-layer');
  if (modalLayer) {
    modalLayer.innerHTML = renderDisputeModal(orderId);
  }
}

function submitDisputeTicket(orderId) {
  const ord = appState.orders.find(o => o.id === orderId);
  if (!ord) return;

  const reasonEl = document.getElementById('dispute-reason-input');
  const reason = reasonEl ? reasonEl.value.trim() : 'Kerusakan lanjutan setelah pengerjaan';

  closeModal();

  const ticketId = 'DSP-' + (100 + appState.disputes.length + 5);

  ord.status = 'DISPUTE_OPENED';
  ord.escrowStatus = 'FUNDS_FROZEN_ESCROW';
  ord.disputeTicketId = ticketId;

  // Add dispute ticket
  appState.disputes.unshift({
    ticketId: ticketId,
    orderId: orderId,
    customerName: ord.customerName,
    partnerName: ord.partnerName,
    serviceCategory: ord.serviceName,
    amountFrozen: ord.totalInvoice,
    slaCountdownHours: 24,
    status: 'OPEN',
    filedAt: 'Baru saja',
    complaintReason: reason,
    customerDescription: reason,
    partnerExplanation: 'Mitra mengklaim pekerjaan telah dilakukan sesuai pesanan.',
    chatTranscript: [
      { sender: ord.customerName, time: '10:00', text: 'Pak, setelah saya cek kembali ada bagian yang bermasalah.' },
      { sender: ord.partnerName, time: '10:05', text: 'Halo mas, tadi sudah dites sebelum saya pulang.' }
    ]
  });

  // Log Audit
  appState.auditLogs.unshift({
    id: 'LOG-' + (440 + appState.auditLogs.length + 1),
    timestamp: new Date().toLocaleTimeString('id-ID'),
    admin: 'Pelanggan: ' + ord.customerName,
    action: 'DISPUTE_FILED_ESCROW_FROZEN',
    target: `${ticketId} (${orderId}): ${formatRupiah(ord.totalInvoice)} dibekukan`,
    ip: '192.168.1.50',
    status: 'FROZEN'
  });

  showToast('⚠️ Komplain Garansi Diajukan! Dana Escrow otomatis DIBEKUKAN untuk investigasi admin.');
  renderCustomerApp();
}

function setReviewRating(stars) {
  showToast(`⭐ Anda memberikan rating ${stars} Bintang. Terima kasih atas ulasannya!`);
}

function openOrderTracking(orderId) {
  appState.activeOrderId = orderId;
  appState.customerSubscreen = 'tracking';
  renderCustomerApp();
}

function closeSubscreen() {
  appState.customerSubscreen = null;
  renderCustomerApp();
  const vp = document.getElementById('customer-viewport');
  if (vp) vp.scrollTo({ top: 0, behavior: 'instant' });
}

function setOrdersFilter(filterId) {
  appState.ordersFilter = filterId;
  renderCustomerApp();
}

// 7. CHAT INTERACTIONS & UU PDP AUTOMATED SENSOR
function openChatRoom(partnerId) {
  appState.activeChatPartnerId = partnerId;
  appState.customerSubscreen = 'chatRoom';
  const chat = appState.chats.find(c => c.partnerId === partnerId);
  if (chat) chat.unread = 0;
  renderCustomerApp();
}

function startDirectChat(partnerId) {
  openChatRoom(partnerId);
}

function sendChatMessage(partnerId) {
  const inputEl = document.getElementById('chat-reply-input');
  if (!inputEl) return;
  let text = inputEl.value.trim();
  if (!text) return;

  // UU PDP REGULATORY SENSOR: Check for bank accounts or phone numbers
  const hasBankAccountPattern = /\b\d{8,16}\b/.test(text) || /(bca|mandiri|bri|bni|rekening|rek|transfer langsung)/i.test(text);

  if (hasBankAccountPattern) {
    text = '[⚠️ PERINGATAN SISTEM UU PDP: Nomor rekening / ajakan transaksi langsung disensor demi keamanan escrow Anda]';
    showToast('🛡️ Sensor Keamanan: Pertukaran rekening disensor otomatis sesuai UU PDP No. 27/2022!');
  }

  const chat = appState.chats.find(c => c.partnerId === partnerId);
  if (chat) {
    chat.messages.push({
      sender: 'user',
      text: text,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    });
    chat.lastMessage = text;
    chat.lastTime = 'Baru saja';
  }

  inputEl.value = '';
  renderCustomerApp();
}

// 8. ADMIN DASHBOARD CONTROLLERS
function showAdminModule(modId) {
  appState.adminModule = modId;
  renderAdminApp();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function closeAdminModal() {
  const modalLayer = document.getElementById('admin-modal-layer');
  if (modalLayer) modalLayer.innerHTML = '';
}

function openKYCInspectionModal(partnerId) {
  const modalLayer = document.getElementById('admin-modal-layer');
  if (modalLayer) {
    modalLayer.innerHTML = renderKYCInspectionModal(partnerId);
  }
}

function approveKYCApplicant(partnerId) {
  const p = appState.partners.find(part => part.id === partnerId);
  if (!p) return;

  p.kycStatus = 'APPROVED';
  p.accountStatus = 'ACTIVE';

  appState.auditLogs.unshift({
    id: 'LOG-' + (440 + appState.auditLogs.length + 1),
    timestamp: new Date().toLocaleTimeString('id-ID'),
    admin: 'Krisna Anugrah (Super Admin)',
    action: 'APPROVE_KYC_PARTNER',
    target: `${p.name} (${p.nik}) Dipublikasikan`,
    ip: '192.168.1.10',
    status: 'SUCCESS'
  });

  closeAdminModal();
  showToast(`✅ Mitra '${p.name}' berhasil disetujui dan aktif di katalog!`);
  renderAdminApp();
}

function rejectKYCApplicant(partnerId) {
  const p = appState.partners.find(part => part.id === partnerId);
  if (!p) return;

  const reasonInput = document.getElementById('kyc-reject-reason');
  let reason = reasonInput && reasonInput.value.trim() ? reasonInput.value.trim() : '';

  if (!reason) {
    reason = prompt("Masukkan alasan penolakan berkas KYC (Wajib sesuai SOP):", "Foto KTP buram / NIK tidak cocok dengan database");
    if (!reason) return;
  }

  p.kycStatus = 'REJECTED';
  p.accountStatus = 'REJECTED_REVISION';

  appState.auditLogs.unshift({
    id: 'LOG-' + (440 + appState.auditLogs.length + 1),
    timestamp: new Date().toLocaleTimeString('id-ID'),
    admin: 'Krisna Anugrah (Super Admin)',
    action: 'REJECT_KYC_PARTNER',
    target: `${p.name}: Alasan '${reason}'`,
    ip: '192.168.1.10',
    status: 'REVISION_REQUESTED'
  });

  closeAdminModal();
  showToast(`⚠️ Pengajuan Mitra '${p.name}' ditolak untuk revisi berkas.`);
  renderAdminApp();
}

function toggleSuspendPartner(partnerId) {
  const p = appState.partners.find(part => part.id === partnerId);
  if (!p) return;

  p.accountStatus = p.accountStatus === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';

  appState.auditLogs.unshift({
    id: 'LOG-' + (440 + appState.auditLogs.length + 1),
    timestamp: new Date().toLocaleTimeString('id-ID'),
    admin: 'Krisna Anugrah (Super Admin)',
    action: p.accountStatus === 'SUSPENDED' ? 'SUSPEND_PARTNER' : 'REACTIVATE_PARTNER',
    target: p.name,
    ip: '192.168.1.10',
    status: 'SUCCESS'
  });

  showToast(`Mitra '${p.name}' sekarang berstatus: ${p.accountStatus}`);
  renderAdminApp();
}

function toggleBlockCustomer(customerId) {
  const c = appState.customers.find(cust => cust.id === customerId);
  if (!c) return;

  c.status = c.status === 'ACTIVE' ? 'BLOCKED' : 'ACTIVE';

  appState.auditLogs.unshift({
    id: 'LOG-' + (440 + appState.auditLogs.length + 1),
    timestamp: new Date().toLocaleTimeString('id-ID'),
    admin: 'Krisna Anugrah (Super Admin)',
    action: c.status === 'BLOCKED' ? 'BLACKLIST_CUSTOMER' : 'UNBLOCK_CUSTOMER',
    target: c.name,
    ip: '192.168.1.10',
    status: 'SUCCESS'
  });

  showToast(`Pengguna '${c.name}' sekarang berstatus: ${c.status}`);
  renderAdminApp();
}

function toggleCategoryActive(catId) {
  const cat = appState.categories.find(c => c.id === catId);
  if (cat) {
    cat.active = !cat.active;
    showToast(`Status kategori '${cat.name}' diubah`);
    renderAdminApp();
  }
}

function updateCategoryPrice(catId, newPrice) {
  const cat = appState.categories.find(c => c.id === catId);
  if (cat) {
    cat.startingPrice = Number(newPrice);
    showToast(`Tarif dasar '${cat.name}' diperbarui ke ${formatRupiah(newPrice)}`);
  }
}

function emergencyOverrideOrder(orderId) {
  const ord = appState.orders.find(o => o.id === orderId);
  if (!ord) return;

  const proceed = confirm(`Apakah Anda yakin ingin melakukan Emergency Manual Override pada pesanan ${orderId}? Tindakan ini dicatat dalam log audit UU PDP.`);
  if (!proceed) return;

  ord.status = 'ORDER_COMPLETED';
  ord.escrowStatus = 'RELEASED_TO_PARTNER';

  appState.auditLogs.unshift({
    id: 'LOG-' + (440 + appState.auditLogs.length + 1),
    timestamp: new Date().toLocaleTimeString('id-ID'),
    admin: 'Krisna Anugrah (Super Admin)',
    action: 'EMERGENCY_MANUAL_OVERRIDE',
    target: `${orderId}: Force Completed`,
    ip: '192.168.1.10',
    status: 'MANUAL_INTERVENTION'
  });

  showToast(`Pesanan ${orderId} berhasil di-override menjadi SELESAI.`);
  renderAdminApp();
}

function openDisputeInvestigationRoom(ticketId) {
  const modalLayer = document.getElementById('admin-modal-layer');
  if (modalLayer) {
    modalLayer.innerHTML = renderDisputeInvestigationRoom(ticketId);
  }
}

// 9. EXECUTE 3 ADMIN DISPUTE VERDICTS (PRD Section 4.7)
function executeDisputeVerdict(ticketId, verdictNum) {
  const dsp = appState.disputes.find(d => d.ticketId === ticketId);
  if (!dsp) return;

  const ord = appState.orders.find(o => o.id === dsp.orderId);

  if (verdictNum === 1) {
    // Putusan 1: 100% Refund ke Pelanggan
    dsp.status = 'RESOLVED_REFUND';
    dsp.verdictNotes = 'Putusan 1: Terbukti kelalaian mitra. Refund 100% sebesar ' + formatRupiah(dsp.amountFrozen) + ' dikembalikan ke rekening konsumen.';
    if (ord) {
      ord.status = 'RESOLVED_REFUNDED';
      ord.escrowStatus = 'REFUNDED_TO_CUSTOMER';
    }
    showToast('⚖️ Putusan 1 Dieksekusi: 100% Refund dikembalikan ke pelanggan!');
  } else if (verdictNum === 2) {
    // Putusan 2: 100% Rilis ke Mitra
    dsp.status = 'RESOLVED_RELEASE';
    dsp.verdictNotes = 'Putusan 2: Pekerjaan mitra telah sesuai SOP. Dana 100% dirilis ke dompet mitra.';
    if (ord) {
      ord.status = 'ORDER_COMPLETED';
      ord.escrowStatus = 'RELEASED_TO_PARTNER';
      const partner = appState.partners.find(p => p.id === ord.partnerId);
      if (partner) partner.walletBalance += Math.round(ord.basePrice * 0.9);
    }
    showToast('⚖️ Putusan 2 Dieksekusi: 100% Dana dirilis ke saldo mitra!');
  } else if (verdictNum === 3) {
    // Putusan 3: Split Settlement (50:50)
    dsp.status = 'RESOLVED_SPLIT';
    const half = Math.round(dsp.amountFrozen / 2);
    dsp.verdictNotes = `Putusan 3: Penyelesaian Parsial Split 50:50 (${formatRupiah(half)} refund ke pelanggan & ${formatRupiah(half)} biaya transport/material ke mitra).`;
    if (ord) {
      ord.status = 'RESOLVED_SPLIT';
      ord.escrowStatus = 'SPLIT_DISBURSED';
      const partner = appState.partners.find(p => p.id === ord.partnerId);
      if (partner) partner.walletBalance += half;
    }
    showToast('⚖️ Putusan 3 Dieksekusi: Split settlement 50:50 berhasil dibagikan!');
  }

  // Audit Log
  appState.auditLogs.unshift({
    id: 'LOG-' + (440 + appState.auditLogs.length + 1),
    timestamp: new Date().toLocaleTimeString('id-ID'),
    admin: 'Krisna Anugrah (Super Admin)',
    action: 'DISPUTE_VERDICT_EXECUTED',
    target: `${ticketId} (Opsi ${verdictNum})`,
    ip: '192.168.1.10',
    status: 'VERDICT_ENFORCED'
  });

  closeAdminModal();
  renderAdminApp();
}

// 10. PAYOUT APPROVAL & REJECTION HANDLERS (PRD 4.8)
function approvePayout(payoutId) {
  const po = appState.payouts.find(p => p.payoutId === payoutId);
  if (!po) return;

  po.status = 'APPROVED';

  // Debit partner wallet
  const partner = appState.partners.find(p => p.id === po.partnerId);
  if (partner && partner.walletBalance >= po.amount) {
    partner.walletBalance -= po.amount;
  }

  appState.auditLogs.unshift({
    id: 'LOG-' + (440 + appState.auditLogs.length + 1),
    timestamp: new Date().toLocaleTimeString('id-ID'),
    admin: 'Payment Gateway Disbursement API',
    action: 'EXECUTE_BANK_PAYOUT',
    target: `${payoutId}: Transfer ${formatRupiah(po.amount)} ke ${po.bankName} ${po.bankAccount}`,
    ip: '192.168.1.1',
    status: 'TRANSFER_SUCCESS'
  });

  showToast(`✅ Payout ${payoutId} berhasil! Dana ${formatRupiah(po.amount)} ditransfer ke ${po.bankName} ${po.partnerName}.`);
  renderAdminApp();
}

function rejectPayout(payoutId) {
  const po = appState.payouts.find(p => p.payoutId === payoutId);
  if (!po) return;

  const reason = prompt("Masukkan alasan penolakan pencairan (misal: Nomor rekening tidak valid / nama KTP tidak cocok):", "Nomor rekening tujuan tidak valid");
  if (!reason) return;

  po.status = 'REJECTED';

  appState.auditLogs.unshift({
    id: 'LOG-' + (440 + appState.auditLogs.length + 1),
    timestamp: new Date().toLocaleTimeString('id-ID'),
    admin: 'Krisna Anugrah (Super Admin)',
    action: 'REJECT_BANK_PAYOUT',
    target: `${payoutId}: Ditolak karena '${reason}'`,
    ip: '192.168.1.10',
    status: 'PAYOUT_REJECTED'
  });

  showToast(`⚠️ Permintaan penarikan ${payoutId} berhasil ditolak.`);
  renderAdminApp();
}

// 11. FINANCIAL REPORT EXPORT SIMULATOR
function simulateExport(format) {
  showToast(`📄 Mengunduh Laporan Keuangan JASAKU (Format .${format.toUpperCase()})...`);
}

// 12. RESET DEMO STATE TO CLEAN DEFAULTS
function resetAppState() {
  appState = getInitialState();
  showToast('↺ Seluruh data prototipe berhasil di-reset ke nilai awal!');
  render();
}

// 13. TOAST NOTIFICATION UTILITY
let toastTimeout = null;
function showToast(message) {
  let toastEl = document.getElementById('global-toast');
  if (!toastEl) {
    toastEl = document.createElement('div');
    toastEl.id = 'global-toast';
    toastEl.className = 'fixed top-5 left-1/2 -translate-x-1/2 z-[9999] transition-all duration-300 pointer-events-none opacity-0 -translate-y-4';
    toastEl.innerHTML = `
      <div class="bg-[#161717] text-white text-xs font-semibold px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-2 border border-slate-700/50">
        <span class="w-2 h-2 rounded-full bg-[#EE7A34] animate-ping shrink-0"></span>
        <span id="global-toast-text">${message}</span>
      </div>
    `;
    document.body.appendChild(toastEl);
  } else {
    document.getElementById('global-toast-text').textContent = message;
  }

  // Show
  toastEl.classList.remove('opacity-0', '-translate-y-4');
  toastEl.classList.add('opacity-100', 'translate-y-0');

  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toastEl.classList.remove('opacity-100', 'translate-y-0');
    toastEl.classList.add('opacity-0', '-translate-y-4');
  }, 3200);
}

// 14. TOP-LEVEL RENDER CONTROLLER
function renderCustomerApp() {
  const root = document.getElementById('root-container');
  if (root) {
    root.innerHTML = renderCustomerShell();
  }
}

function renderAdminApp() {
  const root = document.getElementById('root-container');
  if (root) {
    root.innerHTML = renderAdminShell();
  }
}

function render() {
  const root = document.getElementById('root-container');
  if (!root) return;

  if (appState.role === 'gate') {
    root.innerHTML = renderRoleGate();
  } else if (appState.role === 'customer') {
    renderCustomerApp();
  } else if (appState.role === 'admin') {
    renderAdminApp();
  }
}

// Simulated Clock Updater
function updateLiveClock() {
  const clockEl = document.getElementById('mobile-clock');
  if (!clockEl) return;
  const now = new Date();
  clockEl.textContent = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
}

window.addEventListener('DOMContentLoaded', () => {
  render();
  setInterval(updateLiveClock, 10000);
});
