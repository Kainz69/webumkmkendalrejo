// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import { QRCodeSVG } from "qrcode.react";
// import {
//   X,
//   MapPin,
//   Clock,
//   Phone,
//   MessageCircle,
//   ExternalLink,
//   CreditCard,
//   Truck,
//   Building2,
//   Shield,
//   Info,
//   Package,
//   Utensils,
//   Palette,
//   ShoppingCart,
//   Wrench,
//   Leaf,
//   CheckCircle2,
//   QrCode,
// } from "lucide-react";
// import type { UMKM } from "@/lib/data/umkm";
// import { isCurrentlyOpen } from "@/lib/data/umkm";

// type Tab = "utama" | "produk" | "layanan" | "legalitas";

// const jenisUsahaBadgeColor: Record<string, string> = {
//   Kuliner: "bg-orange-100 text-orange-700",
//   Kerajinan: "bg-purple-100 text-purple-700",
//   Perdagangan: "bg-blue-100 text-blue-700",
//   Jasa: "bg-yellow-100 text-yellow-700",
//   Pertanian: "bg-green-100 text-green-700",
// };

// const jenisUsahaIcon: Record<string, React.ReactNode> = {
//   Kuliner: <Utensils className="w-3 h-3" />,
//   Kerajinan: <Palette className="w-3 h-3" />,
//   Perdagangan: <ShoppingCart className="w-3 h-3" />,
//   Jasa: <Wrench className="w-3 h-3" />,
//   Pertanian: <Leaf className="w-3 h-3" />,
// };

// const paymentIcon: Record<string, string> = {
//   Cash: "💵",
//   QRIS: "📱",
// };

// type Props = {
//   umkm: UMKM | null;
//   onClose: () => void;
// };

// // 🟢 Helper untuk mengonversi data (baik berupa Array maupun String berpemisah koma) menjadi Array Rapi
// function toArray(value: any): string[] {
//   if (!value) return [];
//   if (Array.isArray(value))
//     return value.map((v) => String(v).trim()).filter(Boolean);
//   if (typeof value === "string")
//     return value
//       .split(",")
//       .map((v) => v.trim())
//       .filter(Boolean);
//   return [];
// }

// export default function UmkmModal({ umkm, onClose }: Props) {
//   const [activeTab, setActiveTab] = useState<Tab>("utama");
//   const [showQr, setShowQr] = useState(false);

//   // Defer time-dependent and window-dependent values to client to avoid hydration mismatch
//   const [open, setOpen] = useState<boolean | null>(null);
//   const [detailUrl, setDetailUrl] = useState(
//     `https://umkm-kendalrejo.vercel.app/?umkm=${umkm?.id ?? ""}`,
//   );

//   useEffect(() => {
//     if (umkm) {
//       setOpen(isCurrentlyOpen(umkm));
//       setDetailUrl(`${window.location.origin}/?umkm=${umkm.id}`);
//     }
//   }, [umkm]);

//   if (!umkm) return null;

//   const tabs: { id: Tab; label: string }[] = [
//     { id: "utama", label: "Informasi Utama" },
//     { id: "produk", label: "Rincian Produk" },
//     { id: "layanan", label: "Layanan" },
//     { id: "legalitas", label: "Legalitas & Higiene" },
//   ];

//   // Mengambil gambar fallback dari fotoProduk atau foto_produk
//   // const displayImage =
//   //   umkm.fotoProduk ||
//   //   umkm.foto_produk ||
//   //   "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80";
//   // 🟢 Pastikan displayImage selalu berupa string tunggal
//   const rawImage =
//     umkm.fotoProduk ||
//     umkm.foto_produk ||
//     "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80";

//   const displayImage: string = Array.isArray(rawImage)
//     ? rawImage[0] ||
//       "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80"
//     : rawImage;
//   const displayNamaUmkm = umkm.namaUmkm || umkm.nama_umkm || "";
//   const displayNamaPemilik = umkm.namaPemilik || umkm.nama_pemilik || "";
//   const displayJenisUsaha = umkm.jenisUsaha || umkm.jenis_usaha || "Kuliner";

//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-foreground/40 backdrop-blur-sm p-0 sm:p-4"
//       onClick={(e) => {
//         if (e.target === e.currentTarget) onClose();
//       }}
//     >
//       <div className="bg-card w-full sm:max-w-2xl max-h-[95dvh] sm:max-h-[90vh] rounded-t-3xl sm:rounded-2xl overflow-hidden flex flex-col shadow-2xl">
//         {/* Header Image + Info */}
//         <div className="relative h-48 shrink-0">
//           <Image
//             src={displayImage}
//             alt={displayNamaUmkm}
//             fill
//             className="object-cover"
//             sizes="672px"
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
//           <button
//             onClick={onClose}
//             className="absolute top-3 right-3 p-2 bg-black/40 hover:bg-black/60 rounded-full text-white transition-colors"
//             aria-label="Tutup"
//           >
//             <X className="w-4 h-4" />
//           </button>
//           <div className="absolute bottom-4 left-4 right-4">
//             <div className="flex items-start justify-between gap-2">
//               <div>
//                 <h2 className="text-white font-bold text-xl leading-tight text-balance">
//                   {displayNamaUmkm}
//                 </h2>
//                 <p className="text-white/80 text-sm">{displayNamaPemilik}</p>
//               </div>
//               <div className="flex flex-col items-end gap-1.5 shrink-0">
//                 <span
//                   className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${jenisUsahaBadgeColor[displayJenisUsaha] ?? "bg-gray-100 text-gray-700"}`}
//                 >
//                   {jenisUsahaIcon[displayJenisUsaha]}
//                   {displayJenisUsaha}
//                 </span>
//                 {open !== null && (
//                   <span
//                     className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${open ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}
//                   >
//                     <span
//                       className={`w-1.5 h-1.5 rounded-full ${open ? "bg-green-500" : "bg-red-400"}`}
//                     />
//                     {open ? "Sedang Buka" : "Sedang Tutup"}
//                   </span>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Tabs */}
//         <div className="flex border-b border-border bg-card shrink-0 overflow-x-auto">
//           {tabs.map((tab) => (
//             <button
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id)}
//               className={`flex-1 min-w-max px-3 py-3 text-xs font-semibold transition-colors whitespace-nowrap ${
//                 activeTab === tab.id
//                   ? "text-primary border-b-2 border-primary"
//                   : "text-muted-foreground hover:text-foreground"
//               }`}
//             >
//               {tab.label}
//             </button>
//           ))}
//         </div>

//         {/* Tab Content */}
//         <div className="overflow-y-auto flex-1 p-4 space-y-3">
//           {activeTab === "utama" && (
//             <>
//               <InfoRow
//                 icon={<MapPin className="w-4 h-4 text-primary" />}
//                 label="Alamat"
//               >
//                 {umkm.alamatLengkap || umkm.alamat_lengkap}
//               </InfoRow>
//               <InfoRow
//                 icon={<Clock className="w-4 h-4 text-primary" />}
//                 label="Operasional"
//               >
//                 {umkm.hariOperasional || umkm.hari_operasional} •{" "}
//                 {umkm.jamOperasional || umkm.jam_operasional}
//               </InfoRow>
//               <InfoRow
//                 icon={<Info className="w-4 h-4 text-primary" />}
//                 label="Profil"
//               >
//                 {umkm.profilSingkat || umkm.profile_singkat}
//               </InfoRow>
//               <InfoRow
//                 icon={<Package className="w-4 h-4 text-primary" />}
//                 label="Target Konsumen"
//               >
//                 {umkm.targetKonsumen || umkm.target_konsumen}
//               </InfoRow>
//               <InfoRow
//                 icon={<Building2 className="w-4 h-4 text-primary" />}
//                 label="Tahun Berdiri"
//               >
//                 {umkm.tahunBerdiri || umkm.tahun_berdiri}
//               </InfoRow>
//               <div className="flex gap-2 mt-2">
//                 <a
//                   href={umkm.linkGoogleMaps || umkm.link_google_maps}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors"
//                 >
//                   <MapPin className="w-4 h-4" />
//                   Buka Maps
//                   <ExternalLink className="w-3.5 h-3.5" />
//                 </a>
//                 <a
//                   href={`https://wa.me/62${(umkm.nomorHpWa || umkm.nomor_wa || "").replace(/^0/, "")}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-green-600 text-white text-sm font-semibold rounded-xl hover:bg-green-700 transition-colors"
//                 >
//                   <MessageCircle className="w-4 h-4" />
//                   Chat WA
//                 </a>
//               </div>
//               <a
//                 href={`tel:${umkm.nomorHpWa || umkm.nomor_wa}`}
//                 className="flex items-center gap-2 py-2.5 px-4 border border-border rounded-xl text-sm text-foreground hover:bg-muted transition-colors"
//               >
//                 <Phone className="w-4 h-4 text-muted-foreground" />
//                 <span className="text-muted-foreground">Telepon:</span>
//                 <span className="font-medium">
//                   {umkm.nomorHpWa || umkm.nomor_wa}
//                 </span>
//               </a>
//             </>
//           )}

//           {activeTab === "produk" && (
//             <>
//               <InfoRow
//                 icon={<Package className="w-4 h-4 text-primary" />}
//                 label="Nama Produk"
//               >
//                 {umkm.namaProduk || umkm.nama_produk}
//               </InfoRow>
//               {(umkm.produkUtama || umkm.produk_utama) && (
//                 <InfoRow
//                   icon={<Package className="w-4 h-4 text-primary" />}
//                   label="Produk Utama"
//                 >
//                   {umkm.produkUtama || umkm.produk_utama}
//                 </InfoRow>
//               )}
//               {(umkm.produkLainnya || umkm.produk_utama_lainnya) && (
//                 <InfoRow
//                   icon={<Package className="w-4 h-4 text-primary" />}
//                   label="Produk Lainnya"
//                 >
//                   {umkm.produkLainnya || umkm.produk_utama_lainnya}
//                 </InfoRow>
//               )}
//               <div className="bg-muted/50 rounded-xl p-3">
//                 <p className="text-xs font-semibold text-muted-foreground mb-1">
//                   Deskripsi Produk
//                 </p>
//                 <p className="text-sm text-foreground leading-relaxed">
//                   {umkm.deskripsiProduk || umkm.deskripsi_produk}
//                 </p>
//               </div>
//               <div className="grid grid-cols-2 gap-2">
//                 <InfoBox label="Harga" value={umkm.harga || "-"} />
//                 <InfoBox
//                   label="Berat / Ukuran"
//                   value={umkm.beratUkuran || umkm.berat_ukuran || "-"}
//                 />
//               </div>
//               <div>
//                 <p className="text-xs font-semibold text-muted-foreground mb-2">
//                   Varian Tersedia
//                 </p>
//                 <div className="flex flex-wrap gap-1.5">
//                   {/* 🟢 Menggunakan toArray agar varian selalu dirender sebagai Badge/Pill */}
//                   {toArray(umkm.varian).map((v, idx) => (
//                     <span
//                       key={idx}
//                       className="px-2.5 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full border border-primary/20"
//                     >
//                       {v}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </>
//           )}

//           {activeTab === "layanan" && (
//             <>
//               <div>
//                 <p className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-1.5">
//                   <CreditCard className="w-3.5 h-3.5" /> Metode Pembayaran
//                 </p>
//                 <div className="flex flex-wrap gap-1.5">
//                   {/* 🟢 BADGE UNTUK PEMBAYARAN */}
//                   {toArray(umkm.metodePembayaran || umkm.pembayaran).map(
//                     (m, idx) => (
//                       <span
//                         key={idx}
//                         className="inline-flex items-center gap-1 px-3 py-1 bg-card border border-border rounded-full text-xs font-medium"
//                       >
//                         {paymentIcon[m] ?? "💳"} {m}
//                       </span>
//                     ),
//                   )}
//                 </div>
//               </div>
//               <div>
//                 <p className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-1.5">
//                   <Truck className="w-3.5 h-3.5" /> Layanan Pengiriman
//                 </p>
//                 <div className="flex flex-wrap gap-1.5">
//                   {/* 🟢 BADGE UNTUK PENGIRIMAN */}
//                   {toArray(umkm.layananPengiriman || umkm.pengiriman).map(
//                     (l, idx) => (
//                       <span
//                         key={idx}
//                         className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-xs font-medium"
//                       >
//                         {l}
//                       </span>
//                     ),
//                   )}
//                 </div>
//               </div>
//               <InfoRow
//                 icon={<Building2 className="w-4 h-4 text-primary" />}
//                 label="Rekening Usaha"
//               >
//                 {umkm.rekeningUsaha || umkm.rekening_usaha || "-"}
//               </InfoRow>
//               <div>
//                 <p className="text-xs font-semibold text-muted-foreground mb-2">
//                   Media Promosi & Sosmed
//                 </p>
//                 <div className="flex flex-wrap gap-1.5 mb-2">
//                   {/* 🟢 BADGE UNTUK MEDIA PROMOSI */}
//                   {toArray(umkm.mediaPromosi || umkm.media_promosi).map(
//                     (m, idx) => (
//                       <span
//                         key={idx}
//                         className="px-2.5 py-1 bg-accent/20 text-accent-foreground text-xs font-medium rounded-full border border-accent/30"
//                       >
//                         {m}
//                       </span>
//                     ),
//                   )}
//                 </div>
//                 {(umkm.usernameSosmed || umkm.username_link) &&
//                   umkm.usernameSosmed !== "-" &&
//                   umkm.username_link !== "-" && (
//                     <p className="text-sm text-muted-foreground">
//                       Username:{" "}
//                       <span className="font-medium text-foreground">
//                         {umkm.usernameSosmed || umkm.username_link}
//                       </span>
//                     </p>
//                   )}
//               </div>
//             </>
//           )}

//           {activeTab === "legalitas" && (
//             <>
//               <div>
//                 <p className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-1.5">
//                   <Shield className="w-3.5 h-3.5" /> Legalitas Usaha
//                 </p>
//                 <div className="flex flex-wrap gap-1.5">
//                   {/* 🟢 BADGE UNTUK LEGALITAS */}
//                   {toArray(umkm.legalitasUsaha || umkm.legalitas_usaha).map(
//                     (l, idx) => (
//                       <span
//                         key={idx}
//                         className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 border border-green-200 rounded-full text-xs font-semibold"
//                       >
//                         <CheckCircle2 className="w-3.5 h-3.5" />
//                         {l}
//                       </span>
//                     ),
//                   )}
//                 </div>
//               </div>
//               <InfoRow
//                 icon={<Building2 className="w-4 h-4 text-primary" />}
//                 label="Pencatatan Keuangan"
//               >
//                 {umkm.pencatatanKeuangan || umkm.pencatatan_keuangan
//                   ? `Ya – ${umkm.metodePencatatan || umkm.metode_pencatatan || "Ada"}`
//                   : "Belum ada"}
//               </InfoRow>
//               {(umkm.informasiHigieneSanitasi ||
//                 umkm.informasi_higiene_sanitasi) &&
//                 umkm.informasiHigieneSanitasi !== "-" &&
//                 umkm.informasi_higiene_sanitasi !== "-" && (
//                   <div className="bg-green-50 border border-green-200 rounded-xl p-3">
//                     <p className="text-xs font-semibold text-green-700 mb-1 flex items-center gap-1.5">
//                       <Utensils className="w-3.5 h-3.5" /> Informasi Higiene &
//                       Sanitasi
//                     </p>
//                     <p className="text-sm text-green-800 leading-relaxed">
//                       {umkm.informasiHigieneSanitasi ||
//                         umkm.informasi_higiene_sanitasi}
//                     </p>
//                   </div>
//                 )}

//               {/* QR Code */}
//               <div className="mt-2 border border-border rounded-xl overflow-hidden">
//                 <button
//                   onClick={() => setShowQr(!showQr)}
//                   className="w-full flex items-center justify-between p-3 text-sm font-semibold text-foreground hover:bg-muted/50 transition-colors"
//                 >
//                   <span className="flex items-center gap-2">
//                     <QrCode className="w-4 h-4 text-primary" />
//                     QR Code UMKM Ini
//                   </span>
//                   <span className="text-muted-foreground text-xs">
//                     {showQr ? "Sembunyikan" : "Tampilkan"}
//                   </span>
//                 </button>
//                 {showQr && (
//                   <div className="p-4 flex flex-col items-center gap-2 border-t border-border bg-muted/20">
//                     <QRCodeSVG
//                       value={detailUrl}
//                       size={160}
//                       bgColor="#ffffff"
//                       fgColor="#2d6a35"
//                       level="M"
//                       includeMargin
//                     />
//                     <p className="text-xs text-center text-muted-foreground max-w-[200px] leading-relaxed">
//                       Scan untuk melihat detail {displayNamaUmkm}
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// function InfoRow({
//   icon,
//   label,
//   children,
// }: {
//   icon: React.ReactNode;
//   label: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="flex gap-3 items-start py-1">
//       <div className="mt-0.5 shrink-0">{icon}</div>
//       <div>
//         <p className="text-xs text-muted-foreground">{label}</p>
//         <p className="text-sm font-medium text-foreground leading-relaxed">
//           {children}
//         </p>
//       </div>
//     </div>
//   );
// }

// function InfoBox({ label, value }: { label: string; value: string }) {
//   return (
//     <div className="bg-muted/50 rounded-xl p-3">
//       <p className="text-xs text-muted-foreground">{label}</p>
//       <p className="text-sm font-semibold text-foreground mt-0.5">{value}</p>
//     </div>
//   );
// }

// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import type { UMKM } from "@/lib/data/umkm";
// import {
//   X,
//   MapPin,
//   Clock,
//   Phone,
//   Store,
//   FileText,
//   ShieldCheck,
//   CreditCard,
//   Truck,
//   ExternalLink,
//   Globe,
//   Tag,
//   Users,
//   Calendar,
//   Wallet,
// } from "lucide-react";

// type Props = {
//   umkm: UMKM;
//   onClose: () => void;
// };

// export function UmkmModal({ umkm, onClose }: Props) {
//   const [activeTab, setActiveTab] = useState<
//     "utama" | "rincian" | "layanan" | "legalitas"
//   >("utama");

//   const foto = Array.isArray(umkm.fotoProduk)
//     ? umkm.fotoProduk[0]
//     : umkm.fotoProduk || (umkm as any).foto_produk || "/placeholder.jpg";

//   const namaUmkm = umkm.namaUmkm || (umkm as any).nama_umkm || "Nama UMKM";
//   const namaPemilik = umkm.namaPemilik || (umkm as any).nama_pemilik || "-";
//   const jenisUsaha = umkm.jenisUsaha || (umkm as any).jenis_usaha || "Kuliner";
//   const nomorHpWa = umkm.nomorHpWa || (umkm as any).nomor_wa || "";
//   const hariOperasional =
//     umkm.hariOperasional || (umkm as any).hari_operasional || "";
//   const jamOperasional =
//     umkm.jamOperasional || (umkm as any).jam_operasional || "";
//   const alamatLengkap =
//     umkm.alamatLengkap || (umkm as any).alamat_lengkap || "";
//   const profilSingkat =
//     umkm.profilSingkat ||
//     (umkm as any).profile_singkat ||
//     umkm.deskripsiProduk ||
//     "";
//   const targetKonsumen =
//     umkm.targetKonsumen || (umkm as any).target_konsumen || "";
//   const linkGoogleMaps =
//     umkm.linkGoogleMaps || (umkm as any).link_google_maps || "";
//   const namaProduk =
//     umkm.namaProduk || umkm.produkUtama || (umkm as any).nama_produk || "";
//   const produkLainnya =
//     umkm.produkLainnya || (umkm as any).produk_utama_lainnya || "";
//   const deskripsiProduk =
//     umkm.deskripsiProduk || (umkm as any).deskripsi_produk || "";
//   const harga = umkm.harga || "";
//   const beratUkuran = umkm.beratUkuran || (umkm as any).berat_ukuran || "";
//   const varian = Array.isArray(umkm.varian) ? umkm.varian : [];
//   const mediaPromosi = Array.isArray(umkm.mediaPromosi)
//     ? umkm.mediaPromosi
//     : [];
//   const metodePembayaran = Array.isArray(umkm.metodePembayaran)
//     ? umkm.metodePembayaran
//     : [];
//   const layananPengiriman = Array.isArray(umkm.layananPengiriman)
//     ? umkm.layananPengiriman
//     : [];
//   const legalitasUsaha = Array.isArray(umkm.legalitasUsaha)
//     ? umkm.legalitasUsaha
//     : [];
//   const usernameSosmed =
//     umkm.usernameSosmed || (umkm as any).username_link || "";
//   const rekeningUsaha =
//     umkm.rekeningUsaha || (umkm as any).rekening_usaha || "";
//   const pencatatanKeuangan =
//     umkm.pencatatanKeuangan || (umkm as any).pencatatan_keuangan || "";
//   const metodePencatatan =
//     umkm.metodePencatatan || (umkm as any).metode_pencatatan || "";
//   const informasiHigieneSanitasi =
//     umkm.informasiHigieneSanitasi ||
//     (umkm as any).informasi_higiene_sanitasi ||
//     "";

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
//       <div className="bg-card rounded-2xl max-w-2xl w-full border border-border shadow-2xl overflow-hidden flex flex-col my-auto max-h-[90vh]">
//         {/* Header Gambar Banner */}
//         <div className="relative h-48 sm:h-56 w-full bg-muted shrink-0">
//           <Image
//             src={foto}
//             alt={namaUmkm}
//             fill
//             className="object-cover"
//             sizes="(max-width: 768px) 100vw, 672px"
//           />
//           <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />

//           {/* Tombol Close */}
//           <button
//             onClick={onClose}
//             className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition"
//           >
//             <X className="w-4 h-4" />
//           </button>

//           {/* Judul & Badge */}
//           <div className="absolute bottom-4 left-4 right-4 text-white">
//             <span className="inline-block px-2.5 py-0.5 bg-primary/90 text-primary-foreground text-[10px] sm:text-xs font-semibold rounded-full mb-1">
//               {jenisUsaha}
//             </span>
//             <h2 className="text-xl sm:text-2xl font-bold line-clamp-1">
//               {namaUmkm}
//             </h2>
//             <p className="text-xs text-slate-200">Pemilik: {namaPemilik}</p>
//           </div>
//         </div>

//         {/* Tab Navigasi */}
//         <div className="flex border-b border-border bg-card px-4 gap-2 text-xs sm:text-sm overflow-x-auto shrink-0 pt-2">
//           {[
//             { id: "utama", label: "Informasi Utama" },
//             { id: "rincian", label: "Rincian Produk" },
//             { id: "layanan", label: "Layanan" },
//             { id: "legalitas", label: "Legalitas & Higiene" },
//           ].map((tab) => (
//             <button
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id as any)}
//               className={`pb-2.5 px-3 font-semibold border-b-2 transition-colors whitespace-nowrap ${
//                 activeTab === tab.id
//                   ? "border-primary text-primary"
//                   : "border-transparent text-muted-foreground hover:text-foreground"
//               }`}
//             >
//               {tab.label}
//             </button>
//           ))}
//         </div>

//         {/* Isi Konten Tab */}
//         <div className="p-5 overflow-y-auto space-y-4 text-xs sm:text-sm">
//           {/* TAB 1: UTAMA */}
//           {activeTab === "utama" && (
//             <div className="space-y-3">
//               {profilSingkat && (
//                 <div className="bg-muted/40 p-3 rounded-xl">
//                   <p className="text-muted-foreground leading-relaxed">
//                     {profilSingkat}
//                   </p>
//                 </div>
//               )}

//               <div className="space-y-2 pt-1">
//                 {alamatLengkap && (
//                   <div className="flex items-start gap-2 text-muted-foreground">
//                     <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
//                     <span>{alamatLengkap}</span>
//                   </div>
//                 )}

//                 {(hariOperasional || jamOperasional) && (
//                   <div className="flex items-center gap-2 text-muted-foreground">
//                     <Clock className="w-4 h-4 text-primary shrink-0" />
//                     <span>
//                       {hariOperasional} ({jamOperasional})
//                     </span>
//                   </div>
//                 )}

//                 {targetKonsumen && (
//                   <div className="flex items-center gap-2 text-muted-foreground">
//                     <Users className="w-4 h-4 text-primary shrink-0" />
//                     <span>Target Konsumen: {targetKonsumen}</span>
//                   </div>
//                 )}

//                 {umkm.tahunBerdiri ? (
//                   <div className="flex items-center gap-2 text-muted-foreground">
//                     <Calendar className="w-4 h-4 text-primary shrink-0" />
//                     <span>Berdiri Sejak Tahun {umkm.tahunBerdiri}</span>
//                   </div>
//                 ) : null}
//               </div>

//               {linkGoogleMaps && (
//                 <div className="pt-2">
//                   <a
//                     href={linkGoogleMaps}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-muted hover:bg-muted/80 text-foreground rounded-xl text-xs font-medium transition"
//                   >
//                     <MapPin className="w-3.5 h-3.5 text-primary" />
//                     <span>Petunjuk Lokasi Google Maps</span>
//                     <ExternalLink className="w-3 h-3 text-muted-foreground" />
//                   </a>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* TAB 2: RINCIAN PRODUK */}
//           {activeTab === "rincian" && (
//             <div className="space-y-3">
//               {namaProduk && (
//                 <div>
//                   <span className="text-muted-foreground block text-xs mb-0.5">
//                     Produk Utama
//                   </span>
//                   <p className="font-semibold text-foreground">{namaProduk}</p>
//                 </div>
//               )}

//               {produkLainnya && (
//                 <div>
//                   <span className="text-muted-foreground block text-xs mb-0.5">
//                     Produk Lainnya / Variasi
//                   </span>
//                   <p className="font-medium text-foreground">{produkLainnya}</p>
//                 </div>
//               )}

//               {harga && (
//                 <div className="inline-block bg-primary/10 px-3 py-1.5 rounded-xl border border-primary/20">
//                   <span className="text-xs text-muted-foreground block">
//                     Kisaran Harga
//                   </span>
//                   <p className="font-bold text-primary">{harga}</p>
//                 </div>
//               )}

//               {beratUkuran && (
//                 <div>
//                   <span className="text-muted-foreground block text-xs mb-0.5">
//                     Berat / Ukuran
//                   </span>
//                   <p className="font-medium text-foreground">{beratUkuran}</p>
//                 </div>
//               )}

//               {varian.length > 0 && (
//                 <div>
//                   <span className="text-muted-foreground block text-xs mb-1">
//                     Varian Rasa / Pilihan
//                   </span>
//                   <div className="flex flex-wrap gap-1.5">
//                     {varian.map((v, i) => (
//                       <span
//                         key={i}
//                         className="px-2.5 py-1 bg-muted rounded-lg text-xs font-medium text-foreground"
//                       >
//                         {v}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {deskripsiProduk && (
//                 <div className="pt-2 border-t border-border">
//                   <span className="text-muted-foreground block text-xs mb-1">
//                     Deskripsi Produk
//                   </span>
//                   <p className="text-muted-foreground leading-relaxed">
//                     {deskripsiProduk}
//                   </p>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* TAB 3: LAYANAN */}
//           {activeTab === "layanan" && (
//             <div className="space-y-4">
//               {metodePembayaran.length > 0 && (
//                 <div className="flex items-start gap-2.5">
//                   <CreditCard className="w-4 h-4 text-primary shrink-0 mt-0.5" />
//                   <div>
//                     <span className="font-semibold text-foreground block mb-1">
//                       Metode Pembayaran
//                     </span>
//                     <div className="flex flex-wrap gap-1.5">
//                       {metodePembayaran.map((m, i) => (
//                         <span
//                           key={i}
//                           className="px-2 py-0.5 bg-muted rounded-md text-xs"
//                         >
//                           {m}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {layananPengiriman.length > 0 && (
//                 <div className="flex items-start gap-2.5">
//                   <Truck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
//                   <div>
//                     <span className="font-semibold text-foreground block mb-1">
//                       Layanan Pengiriman
//                     </span>
//                     <div className="flex flex-wrap gap-1.5">
//                       {layananPengiriman.map((l, i) => (
//                         <span
//                           key={i}
//                           className="px-2 py-0.5 bg-muted rounded-md text-xs"
//                         >
//                           {l}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {rekeningUsaha && (
//                 <div className="flex items-start gap-2.5">
//                   <Wallet className="w-4 h-4 text-primary shrink-0 mt-0.5" />
//                   <div>
//                     <span className="font-semibold text-foreground block">
//                       Rekening Usaha
//                     </span>
//                     <p className="text-muted-foreground">{rekeningUsaha}</p>
//                   </div>
//                 </div>
//               )}

//               {usernameSosmed && (
//                 <div className="flex items-start gap-2.5">
//                   <Globe className="w-4 h-4 text-primary shrink-0 mt-0.5" />
//                   <div>
//                     <span className="font-semibold text-foreground block">
//                       Media Sosial
//                     </span>
//                     <p className="text-muted-foreground">{usernameSosmed}</p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* TAB 4: LEGALITAS & HIGIENE */}
//           {activeTab === "legalitas" && (
//             <div className="space-y-4">
//               {legalitasUsaha.length > 0 && (
//                 <div className="flex items-start gap-2.5">
//                   <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
//                   <div>
//                     <span className="font-semibold text-foreground block mb-1">
//                       Legalitas Usaha
//                     </span>
//                     <div className="flex flex-wrap gap-1.5">
//                       {legalitasUsaha.map((leg, i) => (
//                         <span
//                           key={i}
//                           className="px-2.5 py-1 bg-emerald-500/10 text-emerald-600 rounded-lg font-medium text-xs border border-emerald-500/20"
//                         >
//                           {leg}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {(pencatatanKeuangan || metodePencatatan) && (
//                 <div className="flex items-start gap-2.5">
//                   <FileText className="w-4 h-4 text-primary shrink-0 mt-0.5" />
//                   <div>
//                     <span className="font-semibold text-foreground block">
//                       Pencatatan Keuangan
//                     </span>
//                     <p className="text-muted-foreground">
//                       {pencatatanKeuangan}
//                       {metodePencatatan ? ` (${metodePencatatan})` : ""}
//                     </p>
//                   </div>
//                 </div>
//               )}

//               {informasiHigieneSanitasi && (
//                 <div className="flex items-start gap-2.5">
//                   <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
//                   <div>
//                     <span className="font-semibold text-foreground block mb-0.5">
//                       Informasi Higiene & Sanitasi
//                     </span>
//                     <p className="text-muted-foreground leading-relaxed">
//                       {informasiHigieneSanitasi}
//                     </p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Footer Kontak WA */}
//         <div className="p-4 border-t border-border bg-card shrink-0 flex items-center justify-between gap-3">
//           <div className="text-xs text-muted-foreground hidden sm:block">
//             Tertarik dengan produk ini? Hubungi langsung pemilik usaha.
//           </div>

//           {nomorHpWa ? (
//             <a
//               href={`https://wa.me/${nomorHpWa.replace(/^0/, "62").replace(/\D/g, "")}`}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold transition flex items-center justify-center gap-2 shadow-sm"
//             >
//               <Phone className="w-4 h-4" />
//               <span>Hubungi via WhatsApp</span>
//             </a>
//           ) : (
//             <span className="text-xs text-muted-foreground italic">
//               Nomor WhatsApp tidak tersedia
//             </span>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import Image from "next/image";
import type { UMKM } from "@/lib/data/umkm";
import {
  X,
  MapPin,
  Clock,
  Phone,
  Store,
  FileText,
  ShieldCheck,
  CreditCard,
  Truck,
  ExternalLink,
  Tag,
  Users,
  Calendar,
  Wallet,
  Globe,
} from "lucide-react";

type Props = {
  umkm: UMKM;
  onClose: () => void;
};

export function UmkmModal({ umkm, onClose }: Props) {
  const [activeTab, setActiveTab] = useState<
    "utama" | "rincian" | "layanan" | "legalitas"
  >("utama");

  const rawFoto = umkm.fotoProduk || (umkm as any).foto_produk;
  const foto = Array.isArray(rawFoto)
    ? rawFoto[0]
    : rawFoto || "/placeholder.jpg";

  const namaUmkm = umkm.namaUmkm || (umkm as any).nama_umkm || "Nama UMKM";
  const namaPemilik = umkm.namaPemilik || (umkm as any).nama_pemilik || "-";
  const jenisUsaha = umkm.jenisUsaha || (umkm as any).jenis_usaha || "Kuliner";
  const nomorHpWa = umkm.nomorHpWa || (umkm as any).nomor_wa || "";
  const hariOperasional =
    umkm.hariOperasional || (umkm as any).hari_operasional || "";
  const jamOperasional =
    umkm.jamOperasional || (umkm as any).jam_operasional || "";
  const alamatLengkap =
    umkm.alamatLengkap || (umkm as any).alamat_lengkap || "";
  const profilSingkat =
    umkm.profilSingkat ||
    (umkm as any).profile_singkat ||
    umkm.deskripsiProduk ||
    "";
  const targetKonsumen =
    umkm.targetKonsumen || (umkm as any).target_konsumen || "";
  const linkGoogleMaps =
    umkm.linkGoogleMaps || (umkm as any).link_google_maps || "";
  const namaProduk =
    umkm.namaProduk || umkm.produkUtama || (umkm as any).nama_produk || "";
  const produkLainnya =
    umkm.produkLainnya || (umkm as any).produk_utama_lainnya || "";
  const deskripsiProduk =
    umkm.deskripsiProduk || (umkm as any).deskripsi_produk || "";
  const harga = umkm.harga || "";
  const beratUkuran = umkm.beratUkuran || (umkm as any).berat_ukuran || "";
  const varian = Array.isArray(umkm.varian) ? umkm.varian : [];
  const mediaPromosi = Array.isArray(umkm.mediaPromosi)
    ? umkm.mediaPromosi
    : [];
  const metodePembayaran = Array.isArray(umkm.metodePembayaran)
    ? umkm.metodePembayaran
    : [];
  const layananPengiriman = Array.isArray(umkm.layananPengiriman)
    ? umkm.layananPengiriman
    : [];
  const legalitasUsaha = Array.isArray(umkm.legalitasUsaha)
    ? umkm.legalitasUsaha
    : [];
  const usernameSosmed =
    umkm.usernameSosmed || (umkm as any).username_link || "";
  const rekeningUsaha =
    umkm.rekeningUsaha || (umkm as any).rekening_usaha || "";
  const pencatatanKeuangan =
    umkm.pencatatanKeuangan || (umkm as any).pencatatan_keuangan || "";
  const metodePencatatan =
    umkm.metodePencatatan || (umkm as any).metode_pencatatan || "";
  const informasiHigieneSanitasi =
    umkm.informasiHigieneSanitasi ||
    (umkm as any).informasi_higiene_sanitasi ||
    "";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-card rounded-2xl max-w-2xl w-full border border-border shadow-2xl overflow-hidden flex flex-col my-auto max-h-[90vh]">
        <div className="relative h-48 sm:h-56 w-full bg-muted shrink-0">
          <Image
            src={foto}
            alt={namaUmkm}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 672px"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />

          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <span className="inline-block px-2.5 py-0.5 bg-primary/90 text-primary-foreground text-[10px] sm:text-xs font-semibold rounded-full mb-1">
              {jenisUsaha}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold line-clamp-1">
              {namaUmkm}
            </h2>
            <p className="text-xs text-slate-200">Pemilik: {namaPemilik}</p>
          </div>
        </div>

        <div className="flex border-b border-border bg-card px-4 gap-2 text-xs sm:text-sm overflow-x-auto shrink-0 pt-2">
          {[
            { id: "utama", label: "Informasi Utama" },
            { id: "rincian", label: "Rincian Produk" },
            { id: "layanan", label: "Layanan" },
            { id: "legalitas", label: "Legalitas & Higiene" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-2.5 px-3 font-semibold border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-5 overflow-y-auto space-y-4 text-xs sm:text-sm">
          {activeTab === "utama" && (
            <div className="space-y-3">
              {profilSingkat && (
                <div className="bg-muted/40 p-3 rounded-xl">
                  <p className="text-muted-foreground leading-relaxed">
                    {profilSingkat}
                  </p>
                </div>
              )}

              <div className="space-y-2 pt-1">
                {alamatLengkap && (
                  <div className="flex items-start gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>{alamatLengkap}</span>
                  </div>
                )}

                {(hariOperasional || jamOperasional) && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4 text-primary shrink-0" />
                    <span>
                      {hariOperasional} ({jamOperasional})
                    </span>
                  </div>
                )}

                {targetKonsumen && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="w-4 h-4 text-primary shrink-0" />
                    <span>Target Konsumen: {targetKonsumen}</span>
                  </div>
                )}

                {umkm.tahunBerdiri ? (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4 text-primary shrink-0" />
                    <span>Berdiri Sejak Tahun {umkm.tahunBerdiri}</span>
                  </div>
                ) : null}
              </div>

              {linkGoogleMaps && (
                <div className="pt-2">
                  <a
                    href={linkGoogleMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-muted hover:bg-muted/80 text-foreground rounded-xl text-xs font-medium transition"
                  >
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                    <span>Petunjuk Lokasi Google Maps</span>
                    <ExternalLink className="w-3 h-3 text-muted-foreground" />
                  </a>
                </div>
              )}
            </div>
          )}

          {activeTab === "rincian" && (
            <div className="space-y-3">
              {namaProduk && (
                <div>
                  <span className="text-muted-foreground block text-xs mb-0.5">
                    Produk Utama
                  </span>
                  <p className="font-semibold text-foreground">{namaProduk}</p>
                </div>
              )}

              {produkLainnya && (
                <div>
                  <span className="text-muted-foreground block text-xs mb-0.5">
                    Produk Lainnya / Variasi
                  </span>
                  <p className="font-medium text-foreground">{produkLainnya}</p>
                </div>
              )}

              {harga && (
                <div className="inline-block bg-primary/10 px-3 py-1.5 rounded-xl border border-primary/20">
                  <span className="text-xs text-muted-foreground block">
                    Kisaran Harga
                  </span>
                  <p className="font-bold text-primary">{harga}</p>
                </div>
              )}

              {beratUkuran && (
                <div>
                  <span className="text-muted-foreground block text-xs mb-0.5">
                    Berat / Ukuran
                  </span>
                  <p className="font-medium text-foreground">{beratUkuran}</p>
                </div>
              )}

              {varian.length > 0 && (
                <div>
                  <span className="text-muted-foreground block text-xs mb-1">
                    Varian Rasa / Pilihan
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {varian.map((v, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 bg-muted rounded-lg text-xs font-medium text-foreground"
                      >
                        {v}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {deskripsiProduk && (
                <div className="pt-2 border-t border-border">
                  <span className="text-muted-foreground block text-xs mb-1">
                    Deskripsi Produk
                  </span>
                  <p className="text-muted-foreground leading-relaxed">
                    {deskripsiProduk}
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === "layanan" && (
            <div className="space-y-4">
              {metodePembayaran.length > 0 && (
                <div className="flex items-start gap-2.5">
                  <CreditCard className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-foreground block mb-1">
                      Metode Pembayaran
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {metodePembayaran.map((m, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 bg-muted rounded-md text-xs"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {layananPengiriman.length > 0 && (
                <div className="flex items-start gap-2.5">
                  <Truck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-foreground block mb-1">
                      Layanan Pengiriman
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {layananPengiriman.map((l, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 bg-muted rounded-md text-xs"
                        >
                          {l}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {rekeningUsaha && (
                <div className="flex items-start gap-2.5">
                  <Wallet className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-foreground block">
                      Rekening Usaha
                    </span>
                    <p className="text-muted-foreground">{rekeningUsaha}</p>
                  </div>
                </div>
              )}

              {usernameSosmed && (
                <div className="flex items-start gap-2.5">
                  <Globe className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-foreground block">
                      Media Sosial / Link
                    </span>
                    <p className="text-muted-foreground">{usernameSosmed}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "legalitas" && (
            <div className="space-y-4">
              {legalitasUsaha.length > 0 && (
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-foreground block mb-1">
                      Legalitas Usaha
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {legalitasUsaha.map((leg, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 bg-emerald-500/10 text-emerald-600 rounded-lg font-medium text-xs border border-emerald-500/20"
                        >
                          {leg}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {(pencatatanKeuangan || metodePencatatan) && (
                <div className="flex items-start gap-2.5">
                  <FileText className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-foreground block">
                      Pencatatan Keuangan
                    </span>
                    <p className="text-muted-foreground">
                      {pencatatanKeuangan}
                      {metodePencatatan ? ` (${metodePencatatan})` : ""}
                    </p>
                  </div>
                </div>
              )}

              {informasiHigieneSanitasi && (
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-foreground block mb-0.5">
                      Informasi Higiene & Sanitasi
                    </span>
                    <p className="text-muted-foreground leading-relaxed">
                      {informasiHigieneSanitasi}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="p-4 border-t border-border bg-card shrink-0 flex items-center justify-between gap-3">
          <div className="text-xs text-muted-foreground hidden sm:block">
            Tertarik dengan produk ini? Hubungi langsung pemilik usaha.
          </div>

          {nomorHpWa ? (
            <a
              href={`https://wa.me/${nomorHpWa.replace(/^0/, "62").replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold transition flex items-center justify-center gap-2 shadow-sm"
            >
              <Phone className="w-4 h-4" />
              <span>Hubungi via WhatsApp</span>
            </a>
          ) : (
            <span className="text-xs text-muted-foreground italic">
              Nomor WhatsApp tidak tersedia
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
