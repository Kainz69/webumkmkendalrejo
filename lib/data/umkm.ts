export type UMKM = {
  id: string
  // Profil & Kontak
  namaUmkm: string
  namaPemilik: string
  alamatLengkap: string
  nomorHpWa: string
  tahunBerdiri: number
  profilSingkat: string
  targetKonsumen: string
  linkGoogleMaps: string

  // Produk & Operasional
  jenisUsaha: string
  produkUtama: string
  produkLainnya: string
  namaProduk: string
  deskripsiProduk: string
  harga: string
  beratUkuran: string
  varian: string[]
  jamOperasional: string
  hariOperasional: string
  fotoProduk: string

  // Layanan & Promosi
  mediaPromosi: string[]
  usernameSosmed: string
  metodePembayaran: string[]
  layananPengiriman: string[]
  rekeningUsaha: string

  // Legalitas & Manajerial
  pencatatanKeuangan: boolean
  metodePencatatan: string
  legalitasUsaha: string[]
  informasiHigieneSanitasi: string
}

export const umkmData: UMKM[] = [
  {
    id: "umkm-001",
    namaUmkm: "Keripik Tempe Bu Sari",
    namaPemilik: "Sari Wulandari",
    alamatLengkap: "Jl. Melati No. 12, RT 02/RW 01, Desa Kendalrejo, Kec. Talun, Blitar",
    nomorHpWa: "08123456789",
    tahunBerdiri: 2015,
    profilSingkat: "Produksi keripik tempe renyah dengan bumbu khas Jawa Timur, dibuat dari kedelai lokal pilihan tanpa bahan pengawet.",
    targetKonsumen: "Ibu rumah tangga, pelajar, wisatawan, dan reseller oleh-oleh",
    linkGoogleMaps: "https://maps.google.com/?q=-8.1234,112.1234",
    jenisUsaha: "Kuliner",
    produkUtama: "Keripik Tempe Original",
    produkLainnya: "Keripik Tempe Pedas, Keripik Tempe Balado",
    namaProduk: "Keripik Tempe Bu Sari",
    deskripsiProduk: "Keripik tempe renyah dibuat dari tempe kedelai segar, digoreng dengan bumbu rahasia turun-temurun. Cocok untuk camilan sehari-hari maupun oleh-oleh khas Kendalrejo.",
    harga: "Rp 10.000 – Rp 25.000 / bungkus",
    beratUkuran: "100g / 250g / 500g",
    varian: ["Original", "Pedas", "Balado", "Keju"],
    jamOperasional: "07.00 – 17.00 WIB",
    hariOperasional: "Senin – Sabtu",
    fotoProduk: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80",
    mediaPromosi: ["WhatsApp", "Instagram", "Facebook"],
    usernameSosmed: "@keripiktempebu_sari",
    metodePembayaran: ["Cash", "QRIS", "Transfer BRI"],
    layananPengiriman: ["Ambil sendiri", "Kurir lokal", "JNE", "J&T"],
    rekeningUsaha: "BRI 1234-5678-9012 a.n. Sari Wulandari",
    pencatatanKeuangan: true,
    metodePencatatan: "Buku kas manual & aplikasi BukuWarung",
    legalitasUsaha: ["NIB", "PIRT No. 2123517010001-22"],
    informasiHigieneSanitasi: "Produksi di dapur khusus, bahan baku dicuci bersih, pengemas food-grade, tidak menggunakan pewarna buatan.",
  },
  {
    id: "umkm-002",
    namaUmkm: "Batik Tulis Kendalrejo",
    namaPemilik: "Hendra Kusuma",
    alamatLengkap: "Jl. Kenanga No. 5, RT 01/RW 03, Desa Kendalrejo, Kec. Talun, Blitar",
    nomorHpWa: "08234567890",
    tahunBerdiri: 2010,
    profilSingkat: "Pengrajin batik tulis motif khas Blitar dengan penggunaan pewarna alam ramah lingkungan, melestarikan budaya lokal Jawa Timur.",
    targetKonsumen: "Pecinta batik, instansi pemerintah, wisatawan, dan kolektor seni",
    linkGoogleMaps: "https://maps.google.com/?q=-8.1256,112.1256",
    jenisUsaha: "Kerajinan",
    produkUtama: "Kain Batik Tulis Motif Candi Penataran",
    produkLainnya: "Baju Batik, Tas Batik, Syal Batik",
    namaProduk: "Batik Tulis Kendalrejo",
    deskripsiProduk: "Kain batik tulis berkualitas tinggi dengan motif terinspirasi dari Candi Penataran dan alam Blitar. Setiap lembar kain dikerjakan manual oleh pengrajin berpengalaman menggunakan malam dan pewarna alam.",
    harga: "Rp 150.000 – Rp 750.000 / lembar",
    beratUkuran: "2m x 1,15m (kain batik standar)",
    varian: ["Motif Candi Penataran", "Motif Bunga Kopi", "Motif Gunung Kelud", "Motif Parang"],
    jamOperasional: "08.00 – 16.00 WIB",
    hariOperasional: "Senin – Jumat",
    fotoProduk: "https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?w=600&q=80",
    mediaPromosi: ["Instagram", "Tokopedia", "WhatsApp"],
    usernameSosmed: "@batiktulis.kendalrejo",
    metodePembayaran: ["Cash", "Transfer BCA", "QRIS"],
    layananPengiriman: ["Ambil sendiri", "JNE", "TIKI", "SiCepat"],
    rekeningUsaha: "BCA 9876-5432-1098 a.n. Hendra Kusuma",
    pencatatanKeuangan: true,
    metodePencatatan: "Aplikasi BukuKas & laporan bulanan Excel",
    legalitasUsaha: ["NIB", "Sertifikat Produk Kerajinan Jatim"],
    informasiHigieneSanitasi: "-",
  },
  {
    id: "umkm-003",
    namaUmkm: "Warung Soto Ayam Pak Bambang",
    namaPemilik: "Bambang Purnomo",
    alamatLengkap: "Jl. Raya Kendalrejo No. 88, RT 03/RW 02, Desa Kendalrejo, Kec. Talun, Blitar",
    nomorHpWa: "08345678901",
    tahunBerdiri: 2008,
    profilSingkat: "Warung soto ayam legendaris dengan kuah bening gurih khas Blitar, sudah berdiri lebih dari 15 tahun dan menjadi favorit warga desa.",
    targetKonsumen: "Warga desa, pegawai kantor, wisatawan, dan pengguna jalan",
    linkGoogleMaps: "https://maps.google.com/?q=-8.1278,112.1278",
    jenisUsaha: "Kuliner",
    produkUtama: "Soto Ayam Kuah Bening",
    produkLainnya: "Nasi Pecel, Es Teh, Jus Buah",
    namaProduk: "Soto Ayam Pak Bambang",
    deskripsiProduk: "Soto ayam kuah bening segar dengan isian ayam kampung, tauge, seledri, dan bawang goreng. Disajikan hangat dengan nasi putih dan kerupuk, rasanya otentik dan mengenyangkan.",
    harga: "Rp 12.000 – Rp 20.000 / porsi",
    beratUkuran: "1 porsi (mangkok standar)",
    varian: ["Soto Ayam Biasa", "Soto Ayam Komplit", "Soto Ayam Pedas"],
    jamOperasional: "06.00 – 14.00 WIB",
    hariOperasional: "Senin – Minggu",
    fotoProduk: "https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?w=600&q=80",
    mediaPromosi: ["WhatsApp", "Facebook"],
    usernameSosmed: "Warung Soto Pak Bambang",
    metodePembayaran: ["Cash", "QRIS"],
    layananPengiriman: ["Makan di tempat", "Bungkus"],
    rekeningUsaha: "BNI 1122-3344-5566 a.n. Bambang Purnomo",
    pencatatanKeuangan: true,
    metodePencatatan: "Buku kas manual harian",
    legalitasUsaha: ["NIB", "Sertifikat Layak Sehat (Puskesmas Talun)"],
    informasiHigieneSanitasi: "Dapur bersih berstandar Puskesmas, bahan segar dibeli setiap hari dari pasar, air minum dari PDAM, pengelola rutin periksa kesehatan.",
  },
  {
    id: "umkm-004",
    namaUmkm: "Toko Sembako & Pertanian Maju Bersama",
    namaPemilik: "Dewi Rahayu",
    alamatLengkap: "Jl. Mawar No. 3, RT 04/RW 01, Desa Kendalrejo, Kec. Talun, Blitar",
    nomorHpWa: "08456789012",
    tahunBerdiri: 2012,
    profilSingkat: "Toko sembako dan kebutuhan pertanian lengkap dengan harga terjangkau, melayani warga desa dan petani sekitar Kendalrejo.",
    targetKonsumen: "Warga desa, petani, ibu rumah tangga",
    linkGoogleMaps: "https://maps.google.com/?q=-8.1290,112.1290",
    jenisUsaha: "Perdagangan",
    produkUtama: "Beras, Gula, Minyak Goreng",
    produkLainnya: "Pupuk, Pestisida, Bibit Tanaman, Peralatan Tani",
    namaProduk: "Sembako & Saprotan Maju Bersama",
    deskripsiProduk: "Toko lengkap menyediakan kebutuhan pokok sehari-hari dan sarana produksi pertanian. Melayani pembelian eceran maupun grosir dengan harga bersaing.",
    harga: "Variatif (sesuai jenis barang)",
    beratUkuran: "Eceran & Grosir (karung 25kg / 50kg untuk beras)",
    varian: ["Beras Premium", "Beras Medium", "Pupuk Urea", "Pupuk NPK", "Pestisida Cair"],
    jamOperasional: "07.00 – 20.00 WIB",
    hariOperasional: "Senin – Minggu",
    fotoProduk: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80",
    mediaPromosi: ["WhatsApp"],
    usernameSosmed: "-",
    metodePembayaran: ["Cash", "Transfer BRI", "QRIS"],
    layananPengiriman: ["Ambil sendiri", "Antar gratis (area desa, min. Rp 200.000)"],
    rekeningUsaha: "BRI 2233-4455-6677 a.n. Dewi Rahayu",
    pencatatanKeuangan: true,
    metodePencatatan: "Aplikasi Kasir Pintar",
    legalitasUsaha: ["NIB", "SIUP Mikro"],
    informasiHigieneSanitasi: "-",
  },
  {
    id: "umkm-005",
    namaUmkm: "Jasa Service Elektronik & HP Pak Joko",
    namaPemilik: "Joko Santoso",
    alamatLengkap: "Jl. Dahlia No. 7, RT 01/RW 04, Desa Kendalrejo, Kec. Talun, Blitar",
    nomorHpWa: "08567890123",
    tahunBerdiri: 2017,
    profilSingkat: "Bengkel elektronik dan ponsel terpercaya, melayani servis TV, kipas angin, kulkas, AC, dan ponsel semua merk dengan harga transparan.",
    targetKonsumen: "Warga desa dan sekitar kecamatan Talun",
    linkGoogleMaps: "https://maps.google.com/?q=-8.1302,112.1302",
    jenisUsaha: "Jasa",
    produkUtama: "Service HP & Elektronik Rumah Tangga",
    produkLainnya: "Jual Aksesoris HP, Spare Part Elektronik",
    namaProduk: "Jasa Service Elektronik Pak Joko",
    deskripsiProduk: "Melayani perbaikan ponsel (screen, baterai, software), TV, kulkas, AC, dan peralatan elektronik rumah tangga lainnya. Garansi pengerjaan 1 bulan, harga transparan tanpa biaya tersembunyi.",
    harga: "Rp 25.000 – Rp 350.000 (tergantung kerusakan)",
    beratUkuran: "-",
    varian: ["Service HP", "Service TV", "Service Kulkas/AC", "Service Kipas Angin"],
    jamOperasional: "09.00 – 18.00 WIB",
    hariOperasional: "Senin – Sabtu",
    fotoProduk: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&q=80",
    mediaPromosi: ["WhatsApp", "Facebook"],
    usernameSosmed: "Pak Joko Service Elektronik",
    metodePembayaran: ["Cash", "Transfer BNI", "QRIS"],
    layananPengiriman: ["Ambil & Antar di tempat", "Kunjungan rumah (biaya tambahan)"],
    rekeningUsaha: "Mandiri 3344-5566-7788 a.n. Joko Santoso",
    pencatatanKeuangan: false,
    metodePencatatan: "-",
    legalitasUsaha: ["NIB"],
    informasiHigieneSanitasi: "-",
  },
  {
    id: "umkm-006",
    namaUmkm: "Kopi Kendalrejo Pak Agus",
    namaPemilik: "Agus Prasetyo",
    alamatLengkap: "Jl. Kopi No. 15, RT 02/RW 04, Desa Kendalrejo, Kec. Talun, Blitar",
    nomorHpWa: "08678901234",
    tahunBerdiri: 2019,
    profilSingkat: "Roastery kopi lokal Blitar dengan biji kopi pilihan dari kebun sendiri di lereng Gunung Kelud, menghadirkan cita rasa otentik kopi Jawa.",
    targetKonsumen: "Pecinta kopi, kafe, restoran, wisatawan",
    linkGoogleMaps: "https://maps.google.com/?q=-8.1315,112.1315",
    jenisUsaha: "Kuliner",
    produkUtama: "Kopi Robusta Kelud Roasted",
    produkLainnya: "Kopi Arabika, Cold Brew Sachet, Gift Box Kopi",
    namaProduk: "Kopi Kendalrejo Premium",
    deskripsiProduk: "Kopi robusta dan arabika dari perkebunan lereng Gunung Kelud, dipetik merah, diproses natural, dan di-roast dengan kontrol ketat. Tersedia dalam bentuk biji (whole bean), bubuk, maupun sachet siap seduh.",
    harga: "Rp 30.000 – Rp 120.000 / kemasan",
    beratUkuran: "100g / 250g / 500g / 1kg",
    varian: ["Robusta Natural", "Arabika Honey", "Blend Kelud", "Cold Brew Sachet"],
    jamOperasional: "08.00 – 17.00 WIB",
    hariOperasional: "Senin – Sabtu",
    fotoProduk: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&q=80",
    mediaPromosi: ["Instagram", "WhatsApp", "Shopee", "Tokopedia"],
    usernameSosmed: "@kopikendalrejo",
    metodePembayaran: ["Cash", "QRIS", "Transfer BRI", "Transfer BCA"],
    layananPengiriman: ["Ambil sendiri", "JNE", "J&T", "SiCepat", "Shopee Express"],
    rekeningUsaha: "BRI 4455-6677-8899 a.n. Agus Prasetyo",
    pencatatanKeuangan: true,
    metodePencatatan: "Aplikasi BukuKas & laporan mingguan",
    legalitasUsaha: ["NIB", "PIRT No. 2143512010002-22", "Sertifikat Halal MUI"],
    informasiHigieneSanitasi: "Proses roasting di ruang bersih, kemasan vacuum-sealed food-grade, produksi mengikuti SOP higiene pangan.",
  },
  {
    id: "umkm-007",
    namaUmkm: "Pupuk Organik & Bibit Unggul Pak Slamet",
    namaPemilik: "Slamet Riyadi",
    alamatLengkap: "Jl. Tani Makmur No. 22, RT 05/RW 02, Desa Kendalrejo, Kec. Talun, Blitar",
    nomorHpWa: "08789012345",
    tahunBerdiri: 2016,
    profilSingkat: "Produksi dan distribusi pupuk organik kompos dan bibit tanaman unggul untuk mendukung pertanian berkelanjutan di Desa Kendalrejo dan sekitarnya.",
    targetKonsumen: "Petani, kelompok tani, pemilik kebun",
    linkGoogleMaps: "https://maps.google.com/?q=-8.1328,112.1328",
    jenisUsaha: "Pertanian",
    produkUtama: "Pupuk Organik Kompos",
    produkLainnya: "Bibit Cabai, Bibit Tomat, Bibit Terong, Pupuk Cair Bio",
    namaProduk: "Pupuk Organik Kendalrejo",
    deskripsiProduk: "Pupuk organik kompos berkualitas tinggi dari bahan baku kotoran ternak dan limbah pertanian, diolah dengan teknologi fermentasi aerobik. Meningkatkan kesuburan tanah dan hasil panen secara alami.",
    harga: "Rp 8.000 – Rp 50.000 / karung",
    beratUkuran: "5kg / 10kg / 25kg / 50kg",
    varian: ["Kompos Padat", "Kompos Granul", "Pupuk Cair Bio", "Bibit Cabai F1"],
    jamOperasional: "07.00 – 16.00 WIB",
    hariOperasional: "Senin – Sabtu",
    fotoProduk: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80",
    mediaPromosi: ["WhatsApp", "Facebook"],
    usernameSosmed: "Pupuk Organik Pak Slamet",
    metodePembayaran: ["Cash", "Transfer BRI"],
    layananPengiriman: ["Ambil sendiri", "Antar (area Kec. Talun, min. 5 karung)"],
    rekeningUsaha: "BRI 5566-7788-9900 a.n. Slamet Riyadi",
    pencatatanKeuangan: true,
    metodePencatatan: "Buku kas manual",
    legalitasUsaha: ["NIB", "Rekomendasi Dinas Pertanian Blitar"],
    informasiHigieneSanitasi: "-",
  },
  {
    id: "umkm-008",
    namaUmkm: "Salon & Perawatan Kecantikan Ayu",
    namaPemilik: "Ayu Fitriani",
    alamatLengkap: "Jl. Anggrek No. 9, RT 03/RW 03, Desa Kendalrejo, Kec. Talun, Blitar",
    nomorHpWa: "08890123456",
    tahunBerdiri: 2020,
    profilSingkat: "Salon kecantikan modern di desa yang menyediakan layanan perawatan rambut, kuku, dan kulit dengan tenaga terlatih dan produk berkualitas.",
    targetKonsumen: "Wanita desa dan sekitar, persiapan acara pernikahan & wisuda",
    linkGoogleMaps: "https://maps.google.com/?q=-8.1341,112.1341",
    jenisUsaha: "Jasa",
    produkUtama: "Potong Rambut & Creambath",
    produkLainnya: "Smoothing, Coloring, Manicure, Pedicure, Make Up Wisuda",
    namaProduk: "Paket Perawatan Salon Ayu",
    deskripsiProduk: "Layanan salon lengkap meliputi perawatan rambut (potong, smoothing, coloring, creambath), perawatan kuku (manicure & pedicure), dan jasa make up untuk acara spesial. Dikerjakan oleh tenaga terlatih bersertifikat.",
    harga: "Rp 15.000 – Rp 350.000 / layanan",
    beratUkuran: "-",
    varian: ["Potong Rambut", "Creambath", "Smoothing", "Hair Coloring", "Manicure & Pedicure", "Make Up"],
    jamOperasional: "09.00 – 19.00 WIB",
    hariOperasional: "Selasa – Minggu",
    fotoProduk: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80",
    mediaPromosi: ["Instagram", "WhatsApp", "TikTok"],
    usernameSosmed: "@salon_ayu_kendalrejo",
    metodePembayaran: ["Cash", "QRIS", "Transfer BNI"],
    layananPengiriman: ["Layanan di tempat", "Home service (area desa, biaya tambahan)"],
    rekeningUsaha: "BNI 6677-8899-0011 a.n. Ayu Fitriani",
    pencatatanKeuangan: true,
    metodePencatatan: "Aplikasi BukuWarung",
    legalitasUsaha: ["NIB", "Sertifikat Pelatihan LKP Kecantikan"],
    informasiHigieneSanitasi: "Alat dicuci & disterilkan setiap pemakaian, kursi & area kerja dibersihkan rutin, tersedia hand sanitizer dan masker untuk pelanggan.",
  },
]

export const jenisUsahaOptions = [
  "Semua",
  "Kuliner",
  "Kerajinan",
  "Perdagangan",
  "Jasa",
  "Pertanian",
]

export function getUmkmById(id: string): UMKM | undefined {
  return umkmData.find((u) => u.id === id)
}

export function isCurrentlyOpen(umkm: UMKM): boolean {
  const now = new Date()
  const day = now.getDay() // 0=Sun, 1=Mon, ..., 6=Sat
  const hour = now.getHours()
  const minute = now.getMinutes()
  const currentMinutes = hour * 60 + minute

  const hariMap: Record<string, number[]> = {
    "Senin – Minggu": [0, 1, 2, 3, 4, 5, 6],
    "Senin – Sabtu": [1, 2, 3, 4, 5, 6],
    "Senin – Jumat": [1, 2, 3, 4, 5],
    "Selasa – Minggu": [0, 2, 3, 4, 5, 6],
  }

  const openDays = hariMap[umkm.hariOperasional] ?? [1, 2, 3, 4, 5, 6]
  if (!openDays.includes(day)) return false

  const timeMatch = umkm.jamOperasional.match(/(\d{2})\.(\d{2})\s*–\s*(\d{2})\.(\d{2})/)
  if (!timeMatch) return false
  const openMinutes = parseInt(timeMatch[1]) * 60 + parseInt(timeMatch[2])
  const closeMinutes = parseInt(timeMatch[3]) * 60 + parseInt(timeMatch[4])

  return currentMinutes >= openMinutes && currentMinutes < closeMinutes
}
