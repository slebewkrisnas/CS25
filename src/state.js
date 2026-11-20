// JASAKU Core Reactive State Engine & Master Mock Database
function formatRupiah(num) {
  return 'Rp ' + Number(num || 0).toLocaleString('id-ID');
}

function getInitialState() {
  return {
    // Current Global View: 'gate' | 'customer' | 'admin'
    role: 'gate',

    // Customer Navigation
    customerTab: 'home', // 'home' | 'orders' | 'chat' | 'profile'
    customerSubscreen: null, // null | 'category' | 'serviceDetail' | 'checkout' | 'payment' | 'tracking' | 'review' | 'chatRoom'
    ordersFilter: 'all', // 'all' | 'active' | 'completed' | 'dispute'

    // Admin Navigation
    adminModule: 1, // 1 to 10
    adminSelectedKYC: null, // KYC applicant under inspection
    adminSelectedDispute: null, // Dispute ticket under mediation

    // Active Selection States
    activeCategoryId: 'ac',
    activeServiceId: 'srv-ac-split',
    activeOrderId: 'ORD-2026-8801',
    activeChatPartnerId: 'p1',

    // Draft Booking in Customer Checkout
    draftBooking: {
      serviceId: 'srv-ac-split',
      packageId: 'pkg-ac-std',
      qty: 1,
      date: 'Besok, 21 Nov 2026',
      timeSlot: '10:00 - 12:00 WITA',
      addressName: 'Kediaman Tikala Ares',
      addressDetail: 'Jl. Balai Kota No. 12, Kel. Tikala Ares, Kec. Tikala, Kota Manado, Sulawesi Utara',
      notes: 'AC kamar lantai 2 meneteskan air jika dinyalakan lebih dari 1 jam.',
      voucherInput: '',
      voucherApplied: null, // { code: 'MHSBARU', discount: 15000 }
      protectionFee: 2000,
      paymentMethod: 'qris' // 'qris' | 'va_bca' | 'va_mandiri'
    },

    // Global System Parameters (Modul 10)
    systemSettings: {
      protectionFee: 2000,
      platformCommissionPercent: 10,
      partnerSlaMinutes: 15,
      autoReleaseHours: 48,
      disputeWindowHours: 24,
      bepTargetMonthlyOrders: 415,
      variablePaymentGatewayFee: 1200
    },

    // 5 Official Service Categories (PRD Section 3.1 & Modul 5)
    categories: [
      {
        id: 'ac',
        name: 'Service AC',
        tagline: 'Cuci AC split & perbaikan kompresor bergaransi',
        startingPrice: 65000,
        icon: 'ac',
        bg: 'bg-teal-50',
        color: 'text-teal-700',
        active: true
      },
      {
        id: 'clean',
        name: 'Cleaning Service',
        tagline: 'Pembersihan harian kos, rumah & deep cleaning',
        startingPrice: 35000,
        icon: 'clean',
        bg: 'bg-orange-50',
        color: 'text-orange-700',
        active: true
      },
      {
        id: 'electronic',
        name: 'Perbaikan Elektronik',
        tagline: 'Servis laptop, HP, TV, mesin cuci & gadget',
        startingPrice: 50000,
        icon: 'electronic',
        bg: 'bg-sky-50',
        color: 'text-sky-700',
        active: true
      },
      {
        id: 'homefix',
        name: 'Perbaikan Rumah',
        tagline: 'Pipa bocor, instalasi listrik, cat & pertukangan',
        startingPrice: 40000,
        icon: 'homefix',
        bg: 'bg-amber-50',
        color: 'text-amber-700',
        active: true
      },
      {
        id: 'move',
        name: 'Jasa Pindahan',
        tagline: 'Angkut barang kos & pindahan rumah se-DIY',
        startingPrice: 90000,
        icon: 'move',
        bg: 'bg-slate-100',
        color: 'text-slate-700',
        active: true
      }
    ],

    // Detailed Services Catalog
    services: [
      {
        id: 'srv-ac-split',
        categoryId: 'ac',
        name: 'Cuci & Servis AC Split',
        popular: true,
        price: 65000,
        duration: '45 - 60 Menit',
        rating: 4.9,
        reviewsCount: 312,
        badge: 'Terlaris Manado',
        description: 'Pembersihan menyeluruh unit indoor & outdoor dengan jet washer bertekanan terukur, filter anti-bakteri, dan uji kebocoran freon.',
        partnerId: 'p1',
        packages: [
          { id: 'pkg-ac-std', name: 'Cuci Bersih Standar (0.5 - 1 PK)', price: 65000, desc: 'Pembersihan evaporator, filter & outdoor' },
          { id: 'pkg-ac-big', name: 'Cuci AC Kapasitas Besar (1.5 - 2 PK)', price: 95000, desc: 'Untuk ruang keluarga & kantor' },
          { id: 'pkg-ac-freon', name: 'Cuci + Tambah Freon R32/R410', price: 175000, desc: 'Lengkap cuci bersih + isi ulang freon' }
        ],
        includes: [
          'Garansi dingin & pengerjaan 1x24 jam dari JASAKU',
          'Teknisi bersertifikat dan ber-KTP terverifikasi',
          'Lantai dibersihkan kembali setelah pengerjaan'
        ]
      },
      {
        id: 'srv-clean-kos',
        categoryId: 'clean',
        name: 'Daily Cleaning Kamar Kos & Rumah',
        popular: true,
        price: 35000,
        duration: '60 Menit / Jam',
        rating: 5.0,
        reviewsCount: 428,
        badge: 'Favorit Mahasiswa',
        description: 'Pembersihan tuntas: sapu, pel, lap furnitur, rapikan kasur, buang sampah, hingga cuci kamar mandi dengan desinfektan.',
        partnerId: 'p2',
        packages: [
          { id: 'pkg-cln-1h', name: 'Paket 1 Jam (Kamar Kos)', price: 35000, desc: 'Cocok untuk kamar ukuran 3x4 meter' },
          { id: 'pkg-cln-2h', name: 'Paket 2 Jam (Studio / Rumah 1 Kamar)', price: 70000, desc: 'Pembersihan detail kamar & dapur' },
          { id: 'pkg-cln-deep', name: 'Deep Cleaning 4 Jam (2 Mitra)', price: 160000, desc: 'Kerak kamar mandi membandel + jendela' }
        ],
        includes: [
          'Peralatan dan cairan pembersih higienis dibawa mitra',
          'Mitra terverifikasi SKCK & uji kompetensi',
          'Garansi pengerjaan ulang bila belum bersih'
        ]
      },
      {
        id: 'srv-elec-laptop',
        categoryId: 'electronic',
        name: 'Perbaikan Laptop & Komputer',
        popular: false,
        price: 50000,
        duration: '1 - 2 Hari',
        rating: 4.8,
        reviewsCount: 184,
        badge: 'Diagnosa Transparan',
        description: 'Servis laptop mati total, ganti pasta termal pendingin, perbaikan keyboard, install ulang OS, atau upgrade SSD.',
        partnerId: 'p3',
        packages: [
          { id: 'pkg-el-diag', name: 'Pemeriksaan & Servis Ringan', price: 50000, desc: 'Bongkar cek jalur motherboard & software' },
          { id: 'pkg-el-thermal', name: 'Ganti Thermal Paste + Bersih Fan', price: 85000, desc: 'Atasi laptop overheat & lemot' },
          { id: 'pkg-el-part', name: 'Ganti Komponen (Sesuai Sparepart)', price: 150000, desc: 'Keyboard / Engsel / Soket Charger' }
        ],
        includes: [
          'Konfirmasi biaya sparepart sebelum dipasang',
          'Garansi servis 14 hari kerja',
          'Data pribadi dijamin aman (UU PDP)'
        ]
      },
      {
        id: 'srv-home-plumb',
        categoryId: 'homefix',
        name: 'Perbaikan Saluran Pipa & Keran Bocor',
        popular: false,
        price: 40000,
        duration: '45 - 90 Menit',
        rating: 4.8,
        reviewsCount: 175,
        badge: 'Bebas Ribet',
        description: 'Atasi pipa saluran mampet, ganti keran air wastafel, perbaikan pelampung toren air, dan kebocoran pipa instalasi.',
        partnerId: 'p4',
        packages: [
          { id: 'pkg-pl-keran', name: 'Ganti Keran / Saluran Ringan', price: 40000, desc: 'Pemasangan keran & isolasi bocor' },
          { id: 'pkg-pl-mampet', name: 'Lancarkan Pipa Mampet', price: 95000, desc: 'Spiral drain cleaner tanpa bongkar lantai' }
        ],
        includes: [
          'Peralatan mekanik lengkap',
          'Estimasi biaya bahan transparan di awal',
          'Garansi anti bocor 7 hari'
        ]
      },
      {
        id: 'srv-move-kos',
        categoryId: 'move',
        name: 'Jasa Pindahan Kos & Angkut Pick-Up',
        popular: true,
        price: 90000,
        duration: '2 - 3 Jam',
        rating: 4.9,
        reviewsCount: 210,
        badge: 'Antar Cepat Manado',
        description: 'Jasa angkut barang rumah & kos, lemari, kasur, koper antar wilayah Manado (Tikala, Teling, Koka, Wanea, Sario, Mapanget, Paal Dua).',
        partnerId: 'p5',
        packages: [
          { id: 'pkg-mv-motor', name: 'Angkut Motor Roda Tiga (Barang Ringan)', price: 90000, desc: 'Maks 3 kardus besar + 1 lemari kecil' },
          { id: 'pkg-mv-pickup', name: 'Mobil Pick-Up + 1 Tenaga Angkut', price: 180000, desc: 'Kapasitas penuh muatan kamar kos' },
          { id: 'pkg-mv-full', name: 'Pick-Up + 2 Tenaga Angkut & Bongkar', price: 250000, desc: 'Beres angkut sampai kamar baru' }
        ],
        includes: [
          'Tali pengaman dan terpal pelindung hujan',
          'Bantuan angkat naik tangga hingga lantai 3',
          'Asuransi perlindungan barang JASAKU'
        ]
      }
    ],

    // Master Partner Directory (Modul 3 & Modul 2)
    partners: [
      {
        id: 'p1',
        name: 'Rendra Pratama',
        category: 'Service AC',
        categoryId: 'ac',
        phone: '0812-4821-9901',
        rating: 4.9,
        jobsDone: 312,
        walletBalance: 1450000,
        bankName: 'BCA',
        bankAccount: '8420192831',
        bankHolder: 'Rendra Pratama',
        nik: '7171011805930002',
        kycStatus: 'APPROVED',
        accountStatus: 'ACTIVE', // 'ACTIVE' | 'SUSPENDED'
        plate: 'DB 4821 MJ',
        address: 'Jl. Wolter Monginsidi No. 45, Malalayang Satu, Kec. Malalayang, Kota Manado',
        avatarBg: 'bg-teal-600'
      },
      {
        id: 'p2',
        name: 'Dina Kusuma',
        category: 'Cleaning Service',
        categoryId: 'clean',
        phone: '0857-2049-3312',
        rating: 5.0,
        jobsDone: 428,
        walletBalance: 980000,
        bankName: 'Mandiri',
        bankAccount: '13700192834',
        bankHolder: 'Dina Kusuma',
        nik: '7171024508960001',
        kycStatus: 'APPROVED',
        accountStatus: 'ACTIVE',
        plate: 'DB 2049 LT',
        address: 'Jl. Sam Ratulangi No. 112, Kel. Wanea, Kec. Wanea, Kota Manado',
        avatarBg: 'bg-orange-600'
      },
      {
        id: 'p3',
        name: 'Fajar Nugroho',
        category: 'Perbaikan Elektronik',
        categoryId: 'electronic',
        phone: '0813-1190-7764',
        rating: 3.8, // Under 4.0 warning!
        jobsDone: 89,
        walletBalance: 420000,
        bankName: 'BRI',
        bankAccount: '002101928341',
        bankHolder: 'Fajar Nugroho',
        nik: '7171031204910003',
        kycStatus: 'APPROVED',
        accountStatus: 'ACTIVE',
        plate: 'DB 1190 AK',
        address: 'Kawasan Megamas Blok 2C No. 15, Jl. Piere Tendean, Wenang, Kota Manado',
        avatarBg: 'bg-sky-600'
      },
      {
        id: 'p4',
        name: 'Joko Susilo',
        category: 'Perbaikan Rumah',
        categoryId: 'homefix',
        phone: '0878-3829-1102',
        rating: 4.8,
        jobsDone: 175,
        walletBalance: 670000,
        bankName: 'BNI',
        bankAccount: '0419283741',
        bankHolder: 'Joko Susilo',
        nik: '7171041509880005',
        kycStatus: 'APPROVED',
        accountStatus: 'ACTIVE',
        plate: 'DB 5519 PT',
        address: 'Jl. Yos Sudarso No. 78, Kel. Paal Dua, Kec. Paal Dua, Kota Manado',
        avatarBg: 'bg-amber-600'
      },
      {
        id: 'p5',
        name: 'Bagus Setiawan',
        category: 'Jasa Pindahan',
        categoryId: 'move',
        phone: '0812-8842-5500',
        rating: 4.9,
        jobsDone: 210,
        walletBalance: 1820000,
        bankName: 'BCA',
        bankAccount: '8420551122',
        bankHolder: 'Bagus Setiawan',
        nik: '7171052003920004',
        kycStatus: 'APPROVED',
        accountStatus: 'ACTIVE',
        plate: 'DB 8842 CP (Pick-Up)',
        address: 'Jl. AA Maramis KM 7, Kel. Paniki Bawah, Kec. Mapanget, Kota Manado',
        avatarBg: 'bg-slate-700'
      },
      // Pending KYC Applicants (Modul 2)
      {
        id: 'p6',
        name: 'Ilham Ramadhan',
        category: 'Perbaikan Elektronik',
        categoryId: 'electronic',
        phone: '0812-8899-1122',
        rating: 0,
        jobsDone: 0,
        walletBalance: 0,
        bankName: 'BCA',
        bankAccount: '8420993311',
        bankHolder: 'Ilham Ramadhan',
        nik: '7171061406980007',
        kycStatus: 'PENDING',
        accountStatus: 'PENDING_VERIFICATION',
        plate: 'DB 3921 QW',
        address: 'Jl. Ahmad Yani No. 24, Kel. Sario Tumpaan, Kec. Sario, Kota Manado',
        avatarBg: 'bg-indigo-600',
        submittedAt: '2 jam yang lalu',
        specialization: 'Teknisi Laptop & HP bersertifikat BLK Manado'
      },
      {
        id: 'p7',
        name: 'Siti Aminah',
        category: 'Cleaning Service',
        categoryId: 'clean',
        phone: '0857-1122-3344',
        rating: 0,
        jobsDone: 0,
        walletBalance: 0,
        bankName: 'Mandiri',
        bankAccount: '13700994422',
        bankHolder: 'Siti Aminah',
        nik: '7171075010990002',
        kycStatus: 'PENDING',
        accountStatus: 'PENDING_VERIFICATION',
        plate: 'DB 6610 ZR',
        address: 'Jl. Hasanuddin No. 38, Kel. Sindulang Satu, Kec. Tuminting, Kota Manado',
        avatarBg: 'bg-rose-600',
        submittedAt: '4 jam yang lalu',
        specialization: 'Pengalaman 3 tahun di housekeeping hotel berbintang kawasan Boulevard Manado'
      }
    ],

    // Customer Directory (Modul 4)
    customers: [
      {
        id: 'c1',
        name: 'Krisna Anugrah',
        email: 'krisnasanugrah10@gmail.com',
        phone: '0812-3456-7890',
        address: 'Jl. Balai Kota No. 12, Kel. Tikala Ares, Kec. Tikala, Kota Manado',
        ordersCount: 8,
        totalGmvSpent: 940000,
        complaintsCount: 0,
        status: 'ACTIVE' // 'ACTIVE' | 'BLOCKED'
      },
      {
        id: 'c2',
        name: 'Junior Mokosolang',
        phone: '0813-9876-5432',
        address: 'Jl. 14 Februari No. 18, Kel. Teling Atas, Kec. Wanea, Kota Manado',
        ordersCount: 5,
        totalGmvSpent: 620000,
        complaintsCount: 0,
        status: 'ACTIVE'
      },
      {
        id: 'c3',
        name: 'Nadia Safira',
        phone: '0821-4455-6677',
        address: 'Perumahan Koka Indah Blok C-5, Desa Koka, Kec. Tombulu, Manado',
        ordersCount: 12,
        totalGmvSpent: 1560000,
        complaintsCount: 1,
        status: 'ACTIVE'
      },
      {
        id: 'c4',
        name: 'Doni Prasetyo',
        phone: '0852-7788-9900',
        address: 'Jl. Balai Kota No. 22, Kel. Tikala Ares, Kec. Tikala, Kota Manado',
        ordersCount: 1,
        totalGmvSpent: 120000,
        complaintsCount: 2,
        status: 'BLOCKED' // Demo of suspended user
      }
    ],

    // Master Transaksi (PRD Section 7.2 State Machine Matrix)
    orders: [
      {
        id: 'ORD-2026-8801',
        customerId: 'c1',
        customerName: 'Krisna Anugrah',
        customerPhone: '0812-3456-7890',
        address: 'Jl. Balai Kota No. 12, Kel. Tikala Ares, Kec. Tikala, Kota Manado',
        serviceId: 'srv-ac-split',
        serviceName: 'Cuci & Servis AC Split',
        packageName: 'Cuci Bersih Standar (0.5 - 1 PK)',
        partnerId: 'p1',
        partnerName: 'Rendra Pratama',
        partnerPhone: '0812-4821-9901',
        basePrice: 65000,
        protectionFee: 2000,
        discount: 0,
        totalInvoice: 67000,
        paymentMethod: 'QRIS Dinamis',
        paidAt: '20 Nov 2026, 20:15 WITA',
        status: 'AWAITING_CONFIRMATION', // 15 Status Codes
        escrowStatus: 'FUNDS_DEPOSITED_ESCROW',
        scheduledTime: 'Besok, 21 Nov 2026 (10:00 - 12:00 WITA)',
        createdAt: 'Baru saja',
        slaRemainingMinutes: 14,
        notes: 'AC kamar lantai 2 tolong dicek sekalian kisi anginnya.',
        workProofBefore: null,
        workProofAfter: null
      },
      {
        id: 'ORD-2026-8802',
        customerId: 'c2',
        customerName: 'Junior Mokosolang',
        customerPhone: '0813-9876-5432',
        address: 'Jl. 14 Februari No. 18, Kel. Teling Atas, Kec. Wanea, Kota Manado',
        serviceId: 'srv-clean-kos',
        serviceName: 'Daily Cleaning Kamar Kos',
        packageName: 'Paket 2 Jam (Studio / Kos)',
        partnerId: 'p2',
        partnerName: 'Dina Kusuma',
        partnerPhone: '0857-2049-3312',
        basePrice: 70000,
        protectionFee: 2000,
        discount: 15000, // Kupon MHSBARU
        totalInvoice: 57000,
        paymentMethod: 'BCA Virtual Account',
        paidAt: '20 Nov 2026, 19:40 WITA',
        status: 'IN_PROGRESS',
        escrowStatus: 'FUNDS_DEPOSITED_ESCROW',
        scheduledTime: 'Hari ini, 20 Nov 2026 (19:30 WITA)',
        createdAt: '45 menit yang lalu',
        slaRemainingMinutes: 0,
        notes: 'Kamar mandi tolong dibersihkan ekstra kerak lantainya.',
        workProofBefore: 'Foto area kamar sebelum dibersihkan (sudah diverifikasi)',
        workProofAfter: null
      },
      {
        id: 'ORD-2026-8803',
        customerId: 'c3',
        customerName: 'Nadia Safira',
        customerPhone: '0821-4455-6677',
        address: 'Perumahan Koka Indah Blok C-5, Desa Koka, Kec. Tombulu, Manado',
        serviceId: 'srv-elec-laptop',
        serviceName: 'Perbaikan Laptop & Komputer',
        packageName: 'Ganti Komponen Soket & Kipas',
        partnerId: 'p3',
        partnerName: 'Fajar Nugroho',
        partnerPhone: '0813-1190-7764',
        basePrice: 150000,
        protectionFee: 2000,
        discount: 0,
        totalInvoice: 152000,
        paymentMethod: 'QRIS Dinamis',
        paidAt: '19 Nov 2026, 14:10 WITA',
        status: 'DISPUTE_OPENED',
        escrowStatus: 'FUNDS_FROZEN_ESCROW',
        scheduledTime: '19 Nov 2026 (15:00 WITA)',
        createdAt: 'Kemarin',
        slaRemainingMinutes: 0,
        disputeTicketId: 'DSP-104',
        notes: 'Laptop Asus ROG kipas mati.',
        workProofBefore: 'Foto casing laptop sebelum dibuka',
        workProofAfter: 'Foto kipas baru dipasang'
      },
      {
        id: 'ORD-2026-8804',
        customerId: 'c1',
        customerName: 'Krisna Anugrah',
        customerPhone: '0812-3456-7890',
        address: 'Jl. Raya Koka No. 8, Desa Koka, Kec. Tombulu, Manado',
        serviceId: 'srv-move-kos',
        serviceName: 'Jasa Pindahan Kos Pick-Up',
        packageName: 'Mobil Pick-Up + 1 Tenaga Angkut',
        partnerId: 'p5',
        partnerName: 'Bagus Setiawan',
        partnerPhone: '0812-8842-5500',
        basePrice: 180000,
        protectionFee: 2000,
        discount: 0,
        totalInvoice: 182000,
        paymentMethod: 'Mandiri Virtual Account',
        paidAt: '18 Nov 2026, 10:00 WITA',
        status: 'ORDER_COMPLETED',
        escrowStatus: 'RELEASED_TO_PARTNER',
        scheduledTime: '18 Nov 2026 (10:30 WITA)',
        createdAt: '2 hari lalu',
        slaRemainingMinutes: 0,
        notes: 'Pindahan barang perabot rumah dari Tikala ke rumah baru di Koka.',
        ratingGiven: 5,
        reviewText: 'Mas Bagus dan timnya gesit sekali! Barang aman tidak ada lecet sama sekali. Mantap JASAKU!'
      }
    ],

    // Dispute Resolution Center (Modul 7)
    disputes: [
      {
        ticketId: 'DSP-104',
        orderId: 'ORD-2026-8803',
        customerName: 'Nadia Safira',
        partnerName: 'Fajar Nugroho (Rating 3.8)',
        serviceCategory: 'Perbaikan Elektronik',
        amountFrozen: 152000,
        slaCountdownHours: 18,
        status: 'OPEN', // 'OPEN' | 'RESOLVED_REFUND' | 'RESOLVED_RELEASE' | 'RESOLVED_SPLIT'
        filedAt: '20 Nov 2026, 09:30 WITA',
        complaintReason: 'Laptop berbunyi berisik & mati sendiri setelah 1 jam pengerjaan',
        customerDescription: 'Saya pesan servis kipas laptop. Setelah teknisi selesai dan saya coba tes malamnya, kipas berbunyi kasar sekali seperti terganjal baut dan laptop mendadak mati overheat. Saya minta refund 100% atau ganti teknisi lain.',
        partnerExplanation: 'Kipas bawaan pelanggan memang dudukannya sudah patah di dalam. Saya sudah pasang sesuai posisi terbaik. Bunyi karena dudukan retak dari sebelumnya.',
        chatTranscript: [
          { sender: 'Nadia Safira', time: '19 Nov 16:30', text: 'Mas, ini kenapa laptop saya suaranya mendengung kencang banget ya?' },
          { sender: 'Fajar Nugroho (Mitra)', time: '19 Nov 16:35', text: 'Mbak, tadi baut dudukannya memang ada yang selek dari sananya.' },
          { sender: 'Nadia Safira', time: '19 Nov 16:40', text: 'Lho tapi waktu saya serahkan suaranya tidak kasar begini mas! Saya komplain ke rekber JASAKU ya.' }
        ]
      },
      {
        ticketId: 'DSP-103',
        orderId: 'ORD-2026-8740',
        customerName: 'Rudi Hermawan',
        partnerName: 'Joko Susilo',
        serviceCategory: 'Perbaikan Rumah',
        amountFrozen: 82000,
        slaCountdownHours: 0,
        status: 'RESOLVED_SPLIT',
        verdictNotes: 'Mediasi sepakat split 50%: Rp41.000 refund ke Rudi, Rp41.000 rilis ke Joko untuk ganti material lem pipa.',
        filedAt: '17 Nov 2026'
      }
    ],

    // Partner Payout Queue (Modul 8)
    payouts: [
      {
        payoutId: 'PO-901',
        partnerId: 'p5',
        partnerName: 'Bagus Setiawan',
        partnerPhone: '0812-8842-5500',
        bankName: 'BCA',
        bankAccount: '8420551122',
        accountHolder: 'Bagus Setiawan',
        ktpName: 'Bagus Setiawan',
        nameMatch: true, // Auto validation indicator
        amount: 500000,
        remainingWalletAfter: 1320000,
        requestedAt: 'Hari ini, 15:30 WITA',
        status: 'PENDING' // 'PENDING' | 'APPROVED' | 'REJECTED'
      },
      {
        payoutId: 'PO-902',
        partnerId: 'p2',
        partnerName: 'Dina Kusuma',
        partnerPhone: '0857-2049-3312',
        bankName: 'Mandiri',
        bankAccount: '13700192834',
        accountHolder: 'Dina Kusuma',
        ktpName: 'Dina Kusuma',
        nameMatch: true,
        amount: 350000,
        remainingWalletAfter: 630000,
        requestedAt: 'Hari ini, 17:15 WITA',
        status: 'PENDING'
      }
    ],

    // In-App Chat Simulation
    chats: [
      {
        partnerId: 'p1',
        partnerName: 'Rendra Pratama',
        partnerRole: 'Teknisi AC Senior',
        unread: 1,
        lastMessage: 'Halo Mas Krisna, saya sudah dekat perempatan Lapangan Tikala ya.',
        lastTime: '10:14',
        messages: [
          { sender: 'partner', text: 'Halo Mas Krisna, pesanan cuci AC Anda di Tikala Ares sudah saya terima ya.', time: '10:02' },
          { sender: 'user', text: 'Oke Pak Rendra, posisi sekarang di mana?', time: '10:05' },
          { sender: 'partner', text: 'Ini saya sedang jalan lewat Jl. Balai Kota arah Tikala Ares. Tolong pastikan steker listrik AC ada ya mas.', time: '10:08' },
          { sender: 'user', text: 'Siap pak, sudah siap semua di lantai 2.', time: '10:10' },
          { sender: 'partner', text: 'Halo Mas Krisna, saya sudah dekat perempatan Lapangan Tikala ya.', time: '10:14' }
        ]
      },
      {
        partnerId: 'p2',
        partnerName: 'Dina Kusuma',
        partnerRole: 'Mitra Kebersihan',
        unread: 0,
        lastMessage: 'Sama-sama Mas Junior! Senang bisa membantu.',
        lastTime: 'Kemarin',
        messages: [
          { sender: 'partner', text: 'Halo, kamar mandi sudah bersih mengkilap ya mas.', time: '18:30' },
          { sender: 'user', text: 'Terima kasih banyak Kak Dina!', time: '18:45' }
        ]
      }
    ],

    // Immutable Security & PDP Audit Trail (Modul 10)
    auditLogs: [
      {
        id: 'LOG-441',
        timestamp: '20 Nov 2026 21:10:02',
        admin: 'Krisna Anugrah (Super Admin)',
        action: 'INSPECT_DISPUTE_EVIDENCE',
        target: 'Ticket DSP-104 (Nadia Safira vs Fajar Nugroho)',
        ip: '192.168.1.10',
        status: 'SUCCESS'
      },
      {
        id: 'LOG-440',
        timestamp: '20 Nov 2026 19:42:15',
        admin: 'Krisna Anugrah (Super Admin)',
        action: 'VERIFY_ESCROW_RELEASE',
        target: 'Order ORD-2026-8804 (Rp182.000 release to Bagus Setiawan)',
        ip: '192.168.1.10',
        status: 'SUCCESS'
      },
      {
        id: 'LOG-439',
        timestamp: '20 Nov 2026 18:20:00',
        admin: 'Junior Mokosolang (Admin Operasional)',
        action: 'REVIEW_KYC_DOCUMENTS',
        target: 'Mitra ID p6 (Ilham Ramadhan)',
        ip: '192.168.1.14',
        status: 'PENDING_DECISION'
      },
      {
        id: 'LOG-438',
        timestamp: '20 Nov 2026 14:05:40',
        admin: 'Krisna Anugrah (Super Admin)',
        action: 'CONFIG_FEE_PROTECTION_UPDATE',
        target: 'Set Platform Escrow Fee to Rp 2.000',
        ip: '192.168.1.10',
        status: 'SUCCESS'
      }
    ]
  };
}

let appState = getInitialState();
