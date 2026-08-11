// "use client";

// import { useState } from "react";
// import { supabase } from "@/lib/supabase";
// import type { UMKM } from "@/lib/data/umkm";
// import imageCompression from "browser-image-compression";
// import { toast } from "sonner";

// type Props = {
//   umkm: UMKM | null; // null = Tambah Baru, UMKM = Edit
//   onSave: (saved: UMKM) => void;
//   onClose: () => void;
// };

// export function UmkmFormModal({ umkm, onSave, onClose }: Props) {
//   const [loading, setLoading] = useState(false);
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [activeTab, setActiveTab] = useState<
//     "utama" | "rincian" | "layanan" | "legalitas"
//   >("utama");

//   // Helper untuk memecah teks berpemisah koma menjadi Array
//   const parseArray = (val: string) =>
//     val
//       ? val
//           .split(",")
//           .map((s) => s.trim())
//           .filter(Boolean)
//       : [];

//   // 1. Fungsi Upload + Kompresi Foto ke Supabase Storage
//   async function uploadFoto(file: File) {
//     try {
//       const options = {
//         maxSizeMB: 0.5, // Maksimal ukuran foto 500 KB
//         maxWidthOrHeight: 1200, // Dimensi maks 1200px
//         useWebWorker: true,
//       };

//       const compressedFile = await imageCompression(file, options);

//       const fileExt = compressedFile.name.split(".").pop();
//       const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
//       const filePath = `produk/${fileName}`;

//       const { error: uploadError } = await supabase.storage
//         .from("umkm-photos")
//         .upload(filePath, compressedFile);

//       if (uploadError) throw uploadError;

//       const { data } = supabase.storage
//         .from("umkm-photos")
//         .getPublicUrl(filePath);

//       return data.publicUrl;
//     } catch (error) {
//       console.error("Gagal mengompres/mengunggah foto:", error);
//       return null;
//     }
//   }

//   // 2. Submit Form Seluruh Field
//   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const formData = new FormData(e.currentTarget);
//       let fotoUrl = umkm?.fotoProduk || umkm?.foto_produk || "";

//       // Jika ada file baru yang dipilih
//       if (selectedFile) {
//         if (umkm && (umkm.fotoProduk || umkm.foto_produk)) {
//           const rawOldUrl = umkm.fotoProduk || umkm.foto_produk || "";
//           const oldUrls = Array.isArray(rawOldUrl) ? rawOldUrl : [rawOldUrl];

//           for (const oldUrl of oldUrls) {
//             if (
//               oldUrl &&
//               typeof oldUrl === "string" &&
//               oldUrl.includes("/umkm-photos/")
//             ) {
//               const oldPath = oldUrl.split("/umkm-photos/")[1];
//               if (oldPath) {
//                 await supabase.storage.from("umkm-photos").remove([oldPath]);
//               }
//             }
//           }
//         }

//         const uploadedUrl = await uploadFoto(selectedFile);
//         if (uploadedUrl) {
//           fotoUrl = uploadedUrl;
//         }
//       }

//       // Payload lengkap persis sesuai tabel SQL Supabase (snake_case)
//       const payload = {
//         nama_umkm: formData.get("nama_umkm"),
//         nama_pemilik: formData.get("nama_pemilik"),
//         alamat_lengkap: formData.get("alamat_lengkap"),
//         nomor_wa: formData.get("nomor_wa"),
//         tahun_berdiri: formData.get("tahun_berdiri"),
//         profile_singkat: formData.get("profile_singkat"),
//         target_konsumen: formData.get("target_konsumen"),
//         link_google_maps: formData.get("link_google_maps"),
//         jenis_usaha: formData.get("jenis_usaha"),
//         produk_utama_lainnya: formData.get("produk_utama_lainnya"),
//         nama_produk: formData.get("nama_produk"),
//         deskripsi_produk: formData.get("deskripsi_produk"),
//         harga: formData.get("harga"),
//         berat_ukuran: formData.get("berat_ukuran"),
//         varian: formData.get("varian"),
//         jam_operasional: formData.get("jam_operasional"),
//         hari_operasional: formData.get("hari_operasional"),
//         foto_produk: fotoUrl,
//         media_promosi: formData.get("media_promosi"),
//         username_link: formData.get("username_link"),
//         pembayaran: formData.get("pembayaran"),
//         pengiriman: formData.get("pengiriman"),
//         rekening_usaha: formData.get("rekening_usaha"),
//         pencatatan_keuangan: formData.get("pencatatan_keuangan"),
//         metode_pencatatan: formData.get("metode_pencatatan"),
//         legalitas_usaha: formData.get("legalitas_usaha"),
//         informasi_higiene_sanitasi: formData.get("informasi_higiene_sanitasi"),
//       };

//       if (umkm) {
//         // Mode Edit
//         const { error } = await supabase
//           .from("umkm")
//           .update(payload)
//           .eq("id", umkm.id);

//         if (error) throw error;
//         toast.success("Data UMKM berhasil diperbarui!");
//       } else {
//         // Mode Tambah
//         const { error } = await supabase.from("umkm").insert([payload]);

//         if (error) throw error;
//         toast.success("Data UMKM berhasil ditambahkan!");
//       }

//       // Format camelCase & snake_case lengkap agar aman dibaca oleh seluruh komponen UI
//       const savedDataForDashboard = {
//         id: umkm?.id || crypto.randomUUID(),
//         ...payload,
//         namaUmkm: (formData.get("nama_umkm") as string) || "",
//         namaPemilik: (formData.get("nama_pemilik") as string) || "",
//         jenisUsaha: (formData.get("jenis_usaha") as string) || "",
//         nomorHpWa: (formData.get("nomor_wa") as string) || "",
//         hariOperasional: (formData.get("hari_operasional") as string) || "",
//         jamOperasional: (formData.get("jam_operasional") as string) || "",
//         fotoProduk: fotoUrl,
//         alamatLengkap: (formData.get("alamat_lengkap") as string) || "",
//         tahunBerdiri: Number(formData.get("tahun_berdiri")) || 0,
//         profilSingkat: (formData.get("profile_singkat") as string) || "",
//         targetKonsumen: (formData.get("target_konsumen") as string) || "",
//         linkGoogleMaps: (formData.get("link_google_maps") as string) || "",
//         namaProduk: (formData.get("nama_produk") as string) || "",
//         produkLainnya: (formData.get("produk_utama_lainnya") as string) || "",
//         deskripsiProduk: (formData.get("deskripsi_produk") as string) || "",
//         harga: (formData.get("harga") as string) || "",
//         beratUkuran: (formData.get("berat_ukuran") as string) || "",

//         // Konversi string koma ke Array Rapi
//         varian: parseArray(formData.get("varian") as string),
//         mediaPromosi: parseArray(formData.get("media_promosi") as string),
//         metodePembayaran: parseArray(formData.get("pembayaran") as string),
//         layananPengiriman: parseArray(formData.get("pengiriman") as string),
//         legalitasUsaha: parseArray(formData.get("legalitas_usaha") as string),

//         usernameSosmed: (formData.get("username_link") as string) || "",
//         rekeningUsaha: (formData.get("rekening_usaha") as string) || "",
//         pencatatanKeuangan:
//           (formData.get("pencatatan_keuangan") as string) || "",
//         metodePencatatan: (formData.get("metode_pencatatan") as string) || "",
//         informasiHigieneSanitasi:
//           (formData.get("informasi_higiene_sanitasi") as string) || "",
//       };

//       onSave(savedDataForDashboard as any);
//       onClose();
//     } catch (err: any) {
//       toast.error("Gagal menyimpan data: " + err.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
//       <div className="bg-card rounded-2xl max-w-3xl w-full p-6 max-h-[92vh] overflow-y-auto border border-border shadow-2xl flex flex-col">
//         {/* Header Modal */}
//         <div className="flex justify-between items-center pb-4 border-b border-border">
//           <h2 className="text-xl font-bold text-foreground">
//             {umkm ? "Edit Data UMKM" : "Tambah UMKM Baru"}
//           </h2>
//           <button
//             onClick={onClose}
//             type="button"
//             className="text-muted-foreground hover:text-foreground"
//           >
//             ✕
//           </button>
//         </div>

//         {/* 🟢 TOMBOL TAB NAVIGASI (Informasi Utama, Rincian Produk, Layanan, Legalitas) */}
//         <div className="flex shrink-0 border-b border-border my-4 gap-2 text-xs sm:text-sm overflow-x-auto">
//           {[
//             { id: "utama", label: "Informasi Utama" },
//             { id: "rincian", label: "Rincian Produk" },
//             { id: "layanan", label: "Layanan & Promosi" },
//             { id: "legalitas", label: "Legalitas & Higiene" },
//           ].map((tab) => (
//             <button
//               key={tab.id}
//               type="button"
//               onClick={() => setActiveTab(tab.id as any)}
//               className={`pb-2 px-3 font-semibold border-b-2 transition-colors whitespace-nowrap ${
//                 activeTab === tab.id
//                   ? "border-primary text-primary"
//                   : "border-transparent text-muted-foreground hover:text-foreground"
//               }`}
//             >
//               {tab.label}
//             </button>
//           ))}
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-4 flex-1">
//           {/* TAB 1: INFORMASI UTAMA */}
//           <div className={activeTab === "utama" ? "space-y-4" : "hidden"}>
//             <div className="flex flex-col gap-1">
//               <label className="text-xs font-semibold">
//                 Upload Foto Header / Produk Utama
//               </label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) =>
//                   e.target.files?.[0] && setSelectedFile(e.target.files[0])
//                 }
//                 className="file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-primary file:text-primary-foreground text-xs cursor-pointer"
//               />
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//               <div>
//                 <label className="block text-xs font-medium mb-1">
//                   Nama UMKM *
//                 </label>
//                 <input
//                   type="text"
//                   name="nama_umkm"
//                   defaultValue={umkm?.namaUmkm || umkm?.nama_umkm || ""}
//                   required
//                   className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                 />
//               </div>
//               <div>
//                 <label className="block text-xs font-medium mb-1">
//                   Nama Pemilik
//                 </label>
//                 <input
//                   type="text"
//                   name="nama_pemilik"
//                   defaultValue={umkm?.namaPemilik || umkm?.nama_pemilik || ""}
//                   className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                 />
//               </div>
//               <div>
//                 <label className="block text-xs font-medium mb-1">
//                   Jenis Usaha
//                 </label>
//                 <select
//                   name="jenis_usaha"
//                   defaultValue={
//                     umkm?.jenisUsaha || umkm?.jenis_usaha || "Kuliner"
//                   }
//                   className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                 >
//                   <option value="Kuliner">Kuliner</option>
//                   <option value="Kerajinan">Kerajinan</option>
//                   <option value="Perdagangan">Perdagangan</option>
//                   <option value="Pertanian">Pertanian</option>
//                   <option value="Jasa">Jasa</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-xs font-medium mb-1">
//                   Nomor WhatsApp / HP
//                 </label>
//                 <input
//                   type="text"
//                   name="nomor_wa"
//                   defaultValue={umkm?.nomorHpWa || umkm?.nomor_wa || ""}
//                   placeholder="08123456789"
//                   className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                 />
//               </div>
//               <div>
//                 <label className="block text-xs font-medium mb-1">
//                   Hari Operasional
//                 </label>
//                 <input
//                   type="text"
//                   name="hari_operasional"
//                   defaultValue={
//                     umkm?.hariOperasional || umkm?.hari_operasional || ""
//                   }
//                   placeholder="Senin – Sabtu"
//                   className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                 />
//               </div>
//               <div>
//                 <label className="block text-xs font-medium mb-1">
//                   Jam Operasional
//                 </label>
//                 <input
//                   type="text"
//                   name="jam_operasional"
//                   defaultValue={
//                     umkm?.jamOperasional || umkm?.jam_operasional || ""
//                   }
//                   placeholder="07.00 – 17.00 WIB"
//                   className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                 />
//               </div>
//               <div>
//                 <label className="block text-xs font-medium mb-1">
//                   Tahun Berdiri
//                 </label>
//                 <input
//                   type="text"
//                   name="tahun_berdiri"
//                   defaultValue={umkm?.tahunBerdiri || umkm?.tahun_berdiri || ""}
//                   placeholder="2015"
//                   className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                 />
//               </div>
//               <div>
//                 <label className="block text-xs font-medium mb-1">
//                   Link Google Maps
//                 </label>
//                 <input
//                   type="text"
//                   name="link_google_maps"
//                   defaultValue={
//                     umkm?.linkGoogleMaps || umkm?.link_google_maps || ""
//                   }
//                   placeholder="https://maps.google.com/..."
//                   className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-xs font-medium mb-1">
//                 Alamat Lengkap
//               </label>
//               <input
//                 type="text"
//                 name="alamat_lengkap"
//                 defaultValue={umkm?.alamatLengkap || umkm?.alamat_lengkap || ""}
//                 placeholder="Jl. Melati No. 12, Desa Kendalrejo..."
//                 className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//               />
//             </div>

//             <div>
//               <label className="block text-xs font-medium mb-1">
//                 Profile Singkat Usaha
//               </label>
//               <textarea
//                 name="profile_singkat"
//                 rows={2}
//                 defaultValue={
//                   umkm?.profilSingkat || umkm?.profile_singkat || ""
//                 }
//                 placeholder="Produksi keripik tempe renyah dengan bumbu khas..."
//                 className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//               />
//             </div>

//             <div>
//               <label className="block text-xs font-medium mb-1">
//                 Target Konsumen
//               </label>
//               <input
//                 type="text"
//                 name="target_konsumen"
//                 defaultValue={
//                   umkm?.targetKonsumen || umkm?.target_konsumen || ""
//                 }
//                 placeholder="Ibu rumah tangga, wisatawan, reseller"
//                 className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//               />
//             </div>
//           </div>

//           {/* TAB 2: RINCIAN PRODUK */}
//           <div className={activeTab === "rincian" ? "space-y-3" : "hidden"}>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//               <div>
//                 <label className="block text-xs font-medium mb-1">
//                   Nama Produk Utama
//                 </label>
//                 <input
//                   type="text"
//                   name="nama_produk"
//                   defaultValue={umkm?.namaProduk || umkm?.nama_produk || ""}
//                   placeholder="Keripik Tempe Bu Sari"
//                   className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                 />
//               </div>
//               <div>
//                 <label className="block text-xs font-medium mb-1">
//                   Produk Lainnya / Variasi
//                 </label>
//                 <input
//                   type="text"
//                   name="produk_utama_lainnya"
//                   defaultValue={
//                     umkm?.produkLainnya || umkm?.produk_utama_lainnya || ""
//                   }
//                   placeholder="Keripik Tempe Pedas, Balado"
//                   className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                 />
//               </div>
//               <div>
//                 <label className="block text-xs font-medium mb-1">
//                   Kisaran Harga
//                 </label>
//                 <input
//                   type="text"
//                   name="harga"
//                   defaultValue={umkm?.harga || ""}
//                   placeholder="Rp 10.000 – Rp 25.000 / bungkus"
//                   className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                 />
//               </div>
//               <div>
//                 <label className="block text-xs font-medium mb-1">
//                   Berat / Ukuran Kemasan
//                 </label>
//                 <input
//                   type="text"
//                   name="berat_ukuran"
//                   defaultValue={umkm?.beratUkuran || umkm?.berat_ukuran || ""}
//                   placeholder="100g / 250g / 500g"
//                   className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-xs font-medium mb-1">
//                 Varian Rasa / Pilihan (Pisahkan dengan koma)
//               </label>
//               <input
//                 type="text"
//                 name="varian"
//                 defaultValue={
//                   Array.isArray(umkm?.varian)
//                     ? umkm.varian.join(", ")
//                     : umkm?.varian || ""
//                 }
//                 placeholder="Original, Pedas, Balado, Keju"
//                 className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//               />
//             </div>

//             <div>
//               <label className="block text-xs font-medium mb-1">
//                 Deskripsi Lengkap Produk
//               </label>
//               <textarea
//                 name="deskripsi_produk"
//                 rows={4}
//                 defaultValue={
//                   umkm?.deskripsiProduk || umkm?.deskripsi_produk || ""
//                 }
//                 placeholder="Keripik tempe renyah dibuat dari kedelai segar..."
//                 className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//               />
//             </div>
//           </div>

//           {/* TAB 3: LAYANAN & PROMOSI */}
//           <div className={activeTab === "layanan" ? "space-y-3" : "hidden"}>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//               <div>
//                 <label className="block text-xs font-medium mb-1">
//                   Metode Pembayaran (Pisahkan dengan koma)
//                 </label>
//                 <input
//                   type="text"
//                   name="pembayaran"
//                   defaultValue={
//                     Array.isArray(umkm?.metodePembayaran)
//                       ? umkm.metodePembayaran.join(", ")
//                       : umkm?.metodePembayaran || umkm?.pembayaran || ""
//                   }
//                   placeholder="Cash, QRIS, Transfer BRI"
//                   className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                 />
//               </div>
//               <div>
//                 <label className="block text-xs font-medium mb-1">
//                   Layanan Pengiriman (Pisahkan dengan koma)
//                 </label>
//                 <input
//                   type="text"
//                   name="pengiriman"
//                   defaultValue={
//                     Array.isArray(umkm?.layananPengiriman)
//                       ? umkm.layananPengiriman.join(", ")
//                       : umkm?.layananPengiriman || umkm?.pengiriman || ""
//                   }
//                   placeholder="Ambil sendiri, Kurir lokal, JNE, J&T"
//                   className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                 />
//               </div>
//               <div>
//                 <label className="block text-xs font-medium mb-1">
//                   Rekening Usaha
//                 </label>
//                 <input
//                   type="text"
//                   name="rekening_usaha"
//                   defaultValue={
//                     umkm?.rekeningUsaha || umkm?.rekening_usaha || ""
//                   }
//                   placeholder="BRI 1234-5678-9012 a.n. Sari Wulandari"
//                   className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                 />
//               </div>
//               <div>
//                 <label className="block text-xs font-medium mb-1">
//                   Media Promosi & Sosmed (Pisahkan dengan koma)
//                 </label>
//                 <input
//                   type="text"
//                   name="media_promosi"
//                   defaultValue={
//                     Array.isArray(umkm?.mediaPromosi)
//                       ? umkm.mediaPromosi.join(", ")
//                       : umkm?.mediaPromosi || umkm?.media_promosi || ""
//                   }
//                   placeholder="WhatsApp, Instagram, Facebook"
//                   className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-xs font-medium mb-1">
//                 Username Instagram / Link Media
//               </label>
//               <input
//                 type="text"
//                 name="username_link"
//                 defaultValue={umkm?.usernameSosmed || umkm?.username_link || ""}
//                 placeholder="@keripiktempebu_sari"
//                 className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//               />
//             </div>
//           </div>

//           {/* TAB 4: LEGALITAS & HIGIENE */}
//           <div className={activeTab === "legalitas" ? "space-y-3" : "hidden"}>
//             <div>
//               <label className="block text-xs font-medium mb-1">
//                 Legalitas Usaha (NIB / PIRT / Halal - Pisahkan dengan koma)
//               </label>
//               <input
//                 type="text"
//                 name="legalitas_usaha"
//                 defaultValue={
//                   Array.isArray(umkm?.legalitasUsaha)
//                     ? umkm.legalitasUsaha.join(", ")
//                     : umkm?.legalitasUsaha || umkm?.legalitas_usaha || ""
//                 }
//                 placeholder="NIB, PIRT No. 2123517010001-22"
//                 className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//               />
//             </div>

//             <div>
//               <label className="block text-xs font-medium mb-1">
//                 Pencatatan Keuangan
//               </label>
//               <input
//                 type="text"
//                 name="pencatatan_keuangan"
//                 defaultValue={
//                   umkm?.pencatatanKeuangan || umkm?.pencatatan_keuangan || ""
//                 }
//                 placeholder="Buku kas manual & aplikasi BukuWarung"
//                 className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//               />
//             </div>

//             <div>
//               <label className="block text-xs font-medium mb-1">
//                 Informasi Higiene & Sanitasi
//               </label>
//               <textarea
//                 name="informasi_higiene_sanitasi"
//                 rows={3}
//                 defaultValue={
//                   umkm?.informasiHigieneSanitasi ||
//                   umkm?.informasi_higiene_sanitasi ||
//                   ""
//                 }
//                 placeholder="Produksi di dapur khusus, bahan baku dicuci bersih, pengemas food-grade..."
//                 className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//               />
//             </div>
//           </div>

//           {/* Tombol Aksi Bawah */}
//           <div className="flex justify-between items-center pt-4 border-t border-border mt-6">
//             <span className="text-xs text-muted-foreground">
//               * Silakan klik tab di atas untuk melengkapi kategori data lainnya.
//             </span>
//             <div className="flex gap-2">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="px-4 py-2 border border-border rounded-xl text-xs hover:bg-muted font-medium"
//               >
//                 Batal
//               </button>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="px-5 py-2 bg-primary text-primary-foreground rounded-xl text-xs font-semibold hover:opacity-90 disabled:opacity-50 transition"
//               >
//                 {loading ? "Menyimpan Data..." : "Simpan Semua Data"}
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// baru
// "use client";

// import { useState } from "react";
// import { supabase } from "@/lib/supabase";
// import type { UMKM } from "@/lib/data/umkm";
// import imageCompression from "browser-image-compression";
// import { toast } from "sonner";

// type Props = {
//   umkm: UMKM | null;
//   onSave: (saved: UMKM) => void;
//   onClose: () => void;
// };

// export function UmkmFormModal({ umkm, onSave, onClose }: Props) {
//   const [loading, setLoading] = useState(false);
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [activeTab, setActiveTab] = useState<
//     "utama" | "rincian" | "layanan" | "legalitas"
//   >("utama");

//   const parseArray = (val: string) =>
//     val
//       ? val
//           .split(",")
//           .map((s) => s.trim())
//           .filter(Boolean)
//       : [];

//   async function uploadFoto(file: File) {
//     try {
//       const options = {
//         maxSizeMB: 0.5,
//         maxWidthOrHeight: 1200,
//         useWebWorker: true,
//       };

//       const compressedFile = await imageCompression(file, options);
//       const fileExt = compressedFile.name.split(".").pop();
//       const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
//       const filePath = `produk/${fileName}`;

//       const { error: uploadError } = await supabase.storage
//         .from("umkm-photos")
//         .upload(filePath, compressedFile);

//       if (uploadError) throw uploadError;

//       const { data } = supabase.storage
//         .from("umkm-photos")
//         .getPublicUrl(filePath);

//       return data.publicUrl;
//     } catch (error) {
//       console.error("Gagal mengompres/mengunggah foto:", error);
//       return null;
//     }
//   }

//   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const formData = new FormData(e.currentTarget);
//       let fotoUrl = umkm?.fotoProduk || umkm?.foto_produk || "";

//       if (selectedFile) {
//         if (umkm && (umkm.fotoProduk || umkm.foto_produk)) {
//           const rawOldUrl = umkm.fotoProduk || umkm.foto_produk || "";
//           const oldUrls = Array.isArray(rawOldUrl) ? rawOldUrl : [rawOldUrl];

//           for (const oldUrl of oldUrls) {
//             if (
//               oldUrl &&
//               typeof oldUrl === "string" &&
//               oldUrl.includes("/umkm-photos/")
//             ) {
//               const oldPath = oldUrl.split("/umkm-photos/")[1];
//               if (oldPath) {
//                 await supabase.storage.from("umkm-photos").remove([oldPath]);
//               }
//             }
//           }
//         }

//         const uploadedUrl = await uploadFoto(selectedFile);
//         if (uploadedUrl) {
//           fotoUrl = uploadedUrl;
//         }
//       }

//       const payload = {
//         nama_umkm: formData.get("nama_umkm"),
//         nama_pemilik: formData.get("nama_pemilik"),
//         alamat_lengkap: formData.get("alamat_lengkap"),
//         nomor_wa: formData.get("nomor_wa"),
//         tahun_berdiri: formData.get("tahun_berdiri"),
//         profile_singkat: formData.get("profile_singkat"),
//         target_konsumen: formData.get("target_konsumen"),
//         link_google_maps: formData.get("link_google_maps"),
//         jenis_usaha: formData.get("jenis_usaha"),
//         produk_utama_lainnya: formData.get("produk_utama_lainnya"),
//         nama_produk: formData.get("nama_produk"),
//         deskripsi_produk: formData.get("deskripsi_produk"),
//         harga: formData.get("harga"),
//         berat_ukuran: formData.get("berat_ukuran"),
//         varian: formData.get("varian"),
//         jam_operasional: formData.get("jam_operasional"),
//         hari_operasional: formData.get("hari_operasional"),
//         foto_produk: fotoUrl,
//         media_promosi: formData.get("media_promosi"),
//         username_link: formData.get("username_link"),
//         pembayaran: formData.get("pembayaran"),
//         pengiriman: formData.get("pengiriman"),
//         rekening_usaha: formData.get("rekening_usaha"),
//         pencatatan_keuangan: formData.get("pencatatan_keuangan"),
//         metode_pencatatan: formData.get("metode_pencatatan"),
//         legalitas_usaha: formData.get("legalitas_usaha"),
//         informasi_higiene_sanitasi: formData.get("informasi_higiene_sanitasi"),
//       };

//       if (umkm) {
//         const { error } = await supabase
//           .from("umkm")
//           .update(payload)
//           .eq("id", umkm.id);

//         if (error) throw error;
//         toast.success("Data UMKM berhasil diperbarui!");
//       } else {
//         const { error } = await supabase.from("umkm").insert([payload]);

//         if (error) throw error;
//         toast.success("Data UMKM berhasil ditambahkan!");
//       }

//       const savedDataForDashboard = {
//         id: umkm?.id || crypto.randomUUID(),
//         ...payload,
//         namaUmkm: (formData.get("nama_umkm") as string) || "",
//         namaPemilik: (formData.get("nama_pemilik") as string) || "",
//         jenisUsaha: (formData.get("jenis_usaha") as string) || "",
//         nomorHpWa: (formData.get("nomor_wa") as string) || "",
//         hariOperasional: (formData.get("hari_operasional") as string) || "",
//         jamOperasional: (formData.get("jam_operasional") as string) || "",
//         fotoProduk: fotoUrl,
//         alamatLengkap: (formData.get("alamat_lengkap") as string) || "",
//         tahunBerdiri: Number(formData.get("tahun_berdiri")) || 0,
//         profilSingkat: (formData.get("profile_singkat") as string) || "",
//         targetKonsumen: (formData.get("target_konsumen") as string) || "",
//         linkGoogleMaps: (formData.get("link_google_maps") as string) || "",
//         namaProduk: (formData.get("nama_produk") as string) || "",
//         produkLainnya: (formData.get("produk_utama_lainnya") as string) || "",
//         deskripsiProduk: (formData.get("deskripsi_produk") as string) || "",
//         harga: (formData.get("harga") as string) || "",
//         beratUkuran: (formData.get("berat_ukuran") as string) || "",

//         varian: parseArray(formData.get("varian") as string),
//         mediaPromosi: parseArray(formData.get("media_promosi") as string),
//         metodePembayaran: parseArray(formData.get("pembayaran") as string),
//         layananPengiriman: parseArray(formData.get("pengiriman") as string),
//         legalitasUsaha: parseArray(formData.get("legalitas_usaha") as string),

//         usernameSosmed: (formData.get("username_link") as string) || "",
//         rekeningUsaha: (formData.get("rekening_usaha") as string) || "",
//         pencatatanKeuangan:
//           (formData.get("pencatatan_keuangan") as string) || "",
//         metodePencatatan: (formData.get("metode_pencatatan") as string) || "",
//         informasiHigieneSanitasi:
//           (formData.get("informasi_higiene_sanitasi") as string) || "",
//       };

//       onSave(savedDataForDashboard as any);
//       onClose();
//     } catch (err: any) {
//       toast.error("Gagal menyimpan data: " + err.message);
//     } finally {
//       setLoading(false);
//     }
//   }

// ini dikomen
// return (
//   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
//     {/* 🟢 Container Kunci (h-[85vh] & overflow-hidden) */}
//     <div className="bg-card rounded-2xl max-w-3xl w-full p-6 h-[85vh] max-h-[90vh] border border-border shadow-2xl flex flex-col overflow-hidden">
//       {/* Header Modal (Statis) */}
//       <div className="flex justify-between items-center pb-4 border-b border-border shrink-0">
//         <h2 className="text-xl font-bold text-foreground">
//           {umkm ? "Edit Data UMKM" : "Tambah UMKM Baru"}
//         </h2>
//         <button
//           onClick={onClose}
//           type="button"
//           className="text-muted-foreground hover:text-foreground"
//         >
//           ✕
//         </button>
//       </div>

//       {/* 🟢 TOMBOL TAB NAVIGASI (Statis & Terkunci di Atas) */}
//       <div className="flex shrink-0 border-b border-border my-3 gap-2 text-xs sm:text-sm overflow-x-auto pb-1">
//         {[
//           { id: "utama", label: "Informasi Utama" },
//           { id: "rincian", label: "Rincian Produk" },
//           { id: "layanan", label: "Layanan & Promosi" },
//           { id: "legalitas", label: "Legalitas & Higiene" },
//         ].map((tab) => (
//           <button
//             key={tab.id}
//             type="button"
//             onClick={() => setActiveTab(tab.id as any)}
//             className={`pb-2 px-3 font-semibold border-b-2 transition-colors whitespace-nowrap ${
//               activeTab === tab.id
//                 ? "border-primary text-primary"
//                 : "border-transparent text-muted-foreground hover:text-foreground"
//             }`}
//           >
//             {tab.label}
//           </button>
//         ))}
//       </div>

//       {/* 🟢 FORM ISIAN (Hanya bagian ini yang di-scroll) */}
//       <form
//         onSubmit={handleSubmit}
//         className="space-y-4 flex-1 overflow-y-auto pr-1 flex flex-col justify-between"
//       >
//         <div className="space-y-4">
//           {/* TAB 1: INFORMASI UTAMA */}
//           <div className={activeTab === "utama" ? "space-y-4" : "hidden"}>
//             <div className="flex flex-col gap-1">
//               <label className="text-xs font-semibold">
//                 Upload Foto Header / Produk Utama
//               </label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) =>
//                   e.target.files?.[0] && setSelectedFile(e.target.files[0])
//                 }
//                 className="file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-primary file:text-primary-foreground text-xs cursor-pointer"
//               />
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//               <div>
//                 <label className="block text-xs font-medium mb-1">
//                   Nama UMKM *
//                 </label>
//                 <input
//                   type="text"
//                   name="nama_umkm"
//                   defaultValue={umkm?.namaUmkm || umkm?.nama_umkm || ""}
//                   required
//                   className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                 />
//               </div>
//               <div>
//                 <label className="block text-xs font-medium mb-1">
//                   Nama Pemilik
//                 </label>
//                 <input
//                   type="text"
//                   name="nama_pemilik"
//                   defaultValue={umkm?.namaPemilik || umkm?.nama_pemilik || ""}
//                   className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                 />
//               </div>
//               <div>
//                 <label className="block text-xs font-medium mb-1">
//                   Jenis Usaha
//                 </label>
//                 <select
//                   name="jenis_usaha"
//                   defaultValue={
//                     umkm?.jenisUsaha || umkm?.jenis_usaha || "Kuliner"
//                   }
//                   className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                 >
//                   <option value="Kuliner">Kuliner</option>
//                   <option value="Kerajinan">Kerajinan</option>
//                   <option value="Perdagangan">Perdagangan</option>
//                   <option value="Pertanian">Pertanian</option>
//                   <option value="Jasa">Jasa</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-xs font-medium mb-1">
//                   Nomor WhatsApp / HP
//                 </label>
//                 <input
//                   type="text"
//                   name="nomor_wa"
//                   defaultValue={umkm?.nomorHpWa || umkm?.nomor_wa || ""}
//                   placeholder="08123456789"
//                   className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                 />
//               </div>
//               <div>
//                 <label className="block text-xs font-medium mb-1">
//                   Hari Operasional
//                 </label>
//                 <input
//                   type="text"
//                   name="hari_operasional"
//                   defaultValue={
//                     umkm?.hariOperasional || umkm?.hari_operasional || ""
//                   }
//                   placeholder="Senin – Sabtu"
//                   className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                 />
//               </div>
//               <div>
//                 <label className="block text-xs font-medium mb-1">
//                   Jam Operasional
//                 </label>
//                 <input
//                   type="text"
//                   name="jam_operasional"
//                   defaultValue={
//                     umkm?.jamOperasional || umkm?.jam_operasional || ""
//                   }
//                   placeholder="07.00 – 17.00 WIB"
//                   className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                 />
//               </div>
//               <div>
//                 <label className="block text-xs font-medium mb-1">
//                   Tahun Berdiri
//                 </label>
//                 <input
//                   type="text"
//                   name="tahun_berdiri"
//                   defaultValue={
//                     umkm?.tahunBerdiri || umkm?.tahun_berdiri || ""
//                   }
//                   placeholder="2015"
//                   className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                 />
//               </div>
//               <div>
//                 <label className="block text-xs font-medium mb-1">
//                   Link Google Maps
//                 </label>
//                 <input
//                   type="text"
//                   name="link_google_maps"
//                   defaultValue={
//                     umkm?.linkGoogleMaps || umkm?.link_google_maps || ""
//                   }
//                   placeholder="https://maps.google.com/..."
//                   className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-xs font-medium mb-1">
//                 Alamat Lengkap
//               </label>
//               <input
//                 type="text"
//                 name="alamat_lengkap"
//                 defaultValue={
//                   umkm?.alamatLengkap || umkm?.alamat_lengkap || ""
//                 }
//                 placeholder="Jl. Melati No. 12, Desa Kendalrejo..."
//                 className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//               />
//             </div>

//             <div>
//               <label className="block text-xs font-medium mb-1">
//                 Profile Singkat Usaha
//               </label>
//               <textarea
//                 name="profile_singkat"
//                 rows={2}
//                 defaultValue={
//                   umkm?.profilSingkat || umkm?.profile_singkat || ""
//                 }
//                 placeholder="Produksi keripik tempe renyah dengan bumbu khas..."
//                 className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//               />
//             </div>

//             <div>
//               <label className="block text-xs font-medium mb-1">
//                 Target Konsumen
//               </label>
//               <input
//                 type="text"
//                 name="target_konsumen"
//                 defaultValue={
//                   umkm?.targetKonsumen || umkm?.target_konsumen || ""
//                 }
//                 placeholder="Ibu rumah tangga, wisatawan, reseller"
//                 className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//               />
//             </div>
//           </div>

//           {/* TAB 2: RINCIAN PRODUK */}
//           <div className={activeTab === "rincian" ? "space-y-3" : "hidden"}>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//               <div>
//                 <label className="block text-xs font-medium mb-1">
//                   Nama Produk Utama
//                 </label>
//                 <input
//                   type="text"
//                   name="nama_produk"
//                   defaultValue={umkm?.namaProduk || umkm?.nama_produk || ""}
//                   placeholder="Keripik Tempe Bu Sari"
//                   className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                 />
//               </div>
//               <div>
//                 <label className="block text-xs font-medium mb-1">
//                   Produk Lainnya / Variasi
//                 </label>
//                 <input
//                   type="text"
//                   name="produk_utama_lainnya"
//                   defaultValue={
//                     umkm?.produkLainnya || umkm?.produk_utama_lainnya || ""
//                   }
//                   placeholder="Keripik Tempe Pedas, Balado"
//                   className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                 />
//               </div>
//               <div>
//                 <label className="block text-xs font-medium mb-1">
//                   Kisaran Harga
//                 </label>
//                 <input
//                   type="text"
//                   name="harga"
//                   defaultValue={umkm?.harga || ""}
//                   placeholder="Rp 10.000 – Rp 25.000 / bungkus"
//                   className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                 />
//               </div>
//               <div>
//                 <label className="block text-xs font-medium mb-1">
//                   Berat / Ukuran Kemasan
//                 </label>
//                 <input
//                   type="text"
//                   name="berat_ukuran"
//                   defaultValue={umkm?.beratUkuran || umkm?.berat_ukuran || ""}
//                   placeholder="100g / 250g / 500g"
//                   className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-xs font-medium mb-1">
//                 Varian Rasa / Pilihan (Pisahkan dengan koma)
//               </label>
//               <input
//                 type="text"
//                 name="varian"
//                 defaultValue={
//                   Array.isArray(umkm?.varian)
//                     ? umkm.varian.join(", ")
//                     : umkm?.varian || ""
//                 }
//                 placeholder="Original, Pedas, Balado, Keju"
//                 className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//               />
//             </div>

//             <div>
//               <label className="block text-xs font-medium mb-1">
//                 Deskripsi Lengkap Produk
//               </label>
//               <textarea
//                 name="deskripsi_produk"
//                 rows={4}
//                 defaultValue={
//                   umkm?.deskripsiProduk || umkm?.deskripsi_produk || ""
//                 }
//                 placeholder="Keripik tempe renyah dibuat dari kedelai segar..."
//                 className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//               />
//             </div>
//           </div>

//           {/* TAB 3: LAYANAN & PROMOSI */}
//           <div className={activeTab === "layanan" ? "space-y-3" : "hidden"}>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//               <div>
//                 <label className="block text-xs font-medium mb-1">
//                   Metode Pembayaran (Pisahkan dengan koma)
//                 </label>
//                 <input
//                   type="text"
//                   name="pembayaran"
//                   defaultValue={
//                     Array.isArray(umkm?.metodePembayaran)
//                       ? umkm.metodePembayaran.join(", ")
//                       : umkm?.metodePembayaran || umkm?.pembayaran || ""
//                   }
//                   placeholder="Cash, QRIS, Transfer BRI"
//                   className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                 />
//               </div>
//               <div>
//                 <label className="block text-xs font-medium mb-1">
//                   Layanan Pengiriman (Pisahkan dengan koma)
//                 </label>
//                 <input
//                   type="text"
//                   name="pengiriman"
//                   defaultValue={
//                     Array.isArray(umkm?.layananPengiriman)
//                       ? umkm.layananPengiriman.join(", ")
//                       : umkm?.layananPengiriman || umkm?.pengiriman || ""
//                   }
//                   placeholder="Ambil sendiri, Kurir lokal, JNE, J&T"
//                   className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                 />
//               </div>
//               <div>
//                 <label className="block text-xs font-medium mb-1">
//                   Rekening Usaha
//                 </label>
//                 <input
//                   type="text"
//                   name="rekening_usaha"
//                   defaultValue={
//                     umkm?.rekeningUsaha || umkm?.rekening_usaha || ""
//                   }
//                   placeholder="BRI 1234-5678-9012 a.n. Sari Wulandari"
//                   className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                 />
//               </div>
//               <div>
//                 <label className="block text-xs font-medium mb-1">
//                   Media Promosi & Sosmed (Pisahkan dengan koma)
//                 </label>
//                 <input
//                   type="text"
//                   name="media_promosi"
//                   defaultValue={
//                     Array.isArray(umkm?.mediaPromosi)
//                       ? umkm.mediaPromosi.join(", ")
//                       : umkm?.mediaPromosi || umkm?.media_promosi || ""
//                   }
//                   placeholder="WhatsApp, Instagram, Facebook"
//                   className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-xs font-medium mb-1">
//                 Username Instagram / Link Media
//               </label>
//               <input
//                 type="text"
//                 name="username_link"
//                 defaultValue={
//                   umkm?.usernameSosmed || umkm?.username_link || ""
//                 }
//                 placeholder="@keripiktempebu_sari"
//                 className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//               />
//             </div>
//           </div>

//           {/* TAB 4: LEGALITAS & HIGIENE */}
//           <div className={activeTab === "legalitas" ? "space-y-3" : "hidden"}>
//             <div>
//               <label className="block text-xs font-medium mb-1">
//                 Legalitas Usaha (NIB / PIRT / Halal - Pisahkan dengan koma)
//               </label>
//               <input
//                 type="text"
//                 name="legalitas_usaha"
//                 defaultValue={
//                   Array.isArray(umkm?.legalitasUsaha)
//                     ? umkm.legalitasUsaha.join(", ")
//                     : umkm?.legalitasUsaha || umkm?.legalitas_usaha || ""
//                 }
//                 placeholder="NIB, PIRT No. 2123517010001-22"
//                 className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//               />
//             </div>

//             <div>
//               <label className="block text-xs font-medium mb-1">
//                 Pencatatan Keuangan
//               </label>
//               <input
//                 type="text"
//                 name="pencatatan_keuangan"
//                 defaultValue={
//                   umkm?.pencatatanKeuangan || umkm?.pencatatan_keuangan || ""
//                 }
//                 placeholder="Buku kas manual & aplikasi BukuWarung"
//                 className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//               />
//             </div>

//             <div>
//               <label className="block text-xs font-medium mb-1">
//                 Informasi Higiene & Sanitasi
//               </label>
//               <textarea
//                 name="informasi_higiene_sanitasi"
//                 rows={3}
//                 defaultValue={
//                   umkm?.informasiHigieneSanitasi ||
//                   umkm?.informasi_higiene_sanitasi ||
//                   ""
//                 }
//                 placeholder="Produksi di dapur khusus, bahan baku dicuci bersih, pengemas food-grade..."
//                 className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Tombol Aksi Bawah */}
//         <div className="flex justify-between items-center pt-4 border-t border-border mt-6 shrink-0">
//           <span className="text-xs text-muted-foreground hidden sm:inline">
//             * Silakan klik tab di atas untuk melengkapi kategori data lainnya.
//           </span>
//           <div className="flex gap-2 ml-auto">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 border border-border rounded-xl text-xs hover:bg-muted font-medium"
//             >
//               Batal
//             </button>
//             <button
//               type="submit"
//               disabled={loading}
//               className="px-5 py-2 bg-primary text-primary-foreground rounded-xl text-xs font-semibold hover:opacity-90 disabled:opacity-50 transition"
//             >
//               {loading ? "Menyimpan Data..." : "Simpan Semua Data"}
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//   </div>
// );
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
//       {/* Container Modal Utama */}
//       <div className="bg-card rounded-2xl max-w-3xl w-full p-6 h-[85vh] max-h-[90vh] border border-border shadow-2xl flex flex-col overflow-hidden">
//         {/* 1. Header Modal (Statis di Atas) */}
//         <div className="flex justify-between items-center pb-3 border-b border-border shrink-0">
//           <h2 className="text-xl font-bold text-foreground">
//             {umkm ? "Edit Data UMKM" : "Tambah UMKM Baru"}
//           </h2>
//           <button
//             onClick={onClose}
//             type="button"
//             className="text-muted-foreground hover:text-foreground text-lg px-2"
//           >
//             ✕
//           </button>
//         </div>

//         {/* 2. Tombol Tab Navigasi (Statis di Atas) */}
//         <div className="flex shrink-0 border-b border-border my-3 gap-2 text-xs sm:text-sm overflow-x-auto pb-1">
//           {[
//             { id: "utama", label: "Informasi Utama" },
//             { id: "rincian", label: "Rincian Produk" },
//             { id: "layanan", label: "Layanan & Promosi" },
//             { id: "legalitas", label: "Legalitas & Higiene" },
//           ].map((tab) => (
//             <button
//               key={tab.id}
//               type="button"
//               onClick={() => setActiveTab(tab.id as any)}
//               className={`pb-2 px-3 font-semibold border-b-2 transition-colors whitespace-nowrap ${
//                 activeTab === tab.id
//                   ? "border-primary text-primary"
//                   : "border-transparent text-muted-foreground hover:text-foreground"
//               }`}
//             >
//               {tab.label}
//             </button>
//           ))}
//         </div>

//         {/* 3. Form Utama */}
//         <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0">
//           {/* Area Isian Input (HANYA BAGIAN INI YANG BISA DI-SCROLL) */}
//           <div className="flex-1 overflow-y-auto pr-2 space-y-4">
//             {/* TAB 1: INFORMASI UTAMA */}
//             <div className={activeTab === "utama" ? "space-y-4" : "hidden"}>
//               <div className="flex flex-col gap-1">
//                 <label className="text-xs font-semibold">
//                   Upload Foto Header / Produk Utama
//                 </label>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={(e) =>
//                     e.target.files?.[0] && setSelectedFile(e.target.files[0])
//                   }
//                   className="file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-primary file:text-primary-foreground text-xs cursor-pointer"
//                 />
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                 <div>
//                   <label className="block text-xs font-medium mb-1">
//                     Nama UMKM *
//                   </label>
//                   <input
//                     type="text"
//                     name="nama_umkm"
//                     defaultValue={umkm?.namaUmkm || umkm?.nama_umkm || ""}
//                     required
//                     className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-medium mb-1">
//                     Nama Pemilik
//                   </label>
//                   <input
//                     type="text"
//                     name="nama_pemilik"
//                     defaultValue={umkm?.namaPemilik || umkm?.nama_pemilik || ""}
//                     className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-medium mb-1">
//                     Jenis Usaha
//                   </label>
//                   <select
//                     name="jenis_usaha"
//                     defaultValue={
//                       umkm?.jenisUsaha || umkm?.jenis_usaha || "Kuliner"
//                     }
//                     className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                   >
//                     <option value="Kuliner">Kuliner</option>
//                     <option value="Kerajinan">Kerajinan</option>
//                     <option value="Perdagangan">Perdagangan</option>
//                     <option value="Pertanian">Pertanian</option>
//                     <option value="Jasa">Jasa</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-xs font-medium mb-1">
//                     Nomor WhatsApp / HP
//                   </label>
//                   <input
//                     type="text"
//                     name="nomor_wa"
//                     defaultValue={umkm?.nomorHpWa || umkm?.nomor_wa || ""}
//                     placeholder="08123456789"
//                     className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-medium mb-1">
//                     Hari Operasional
//                   </label>
//                   <input
//                     type="text"
//                     name="hari_operasional"
//                     defaultValue={
//                       umkm?.hariOperasional || umkm?.hari_operasional || ""
//                     }
//                     placeholder="Senin – Sabtu"
//                     className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-medium mb-1">
//                     Jam Operasional
//                   </label>
//                   <input
//                     type="text"
//                     name="jam_operasional"
//                     defaultValue={
//                       umkm?.jamOperasional || umkm?.jam_operasional || ""
//                     }
//                     placeholder="07.00 – 17.00 WIB"
//                     className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-medium mb-1">
//                     Tahun Berdiri
//                   </label>
//                   <input
//                     type="text"
//                     name="tahun_berdiri"
//                     defaultValue={
//                       umkm?.tahunBerdiri || umkm?.tahun_berdiri || ""
//                     }
//                     placeholder="2015"
//                     className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-medium mb-1">
//                     Link Google Maps
//                   </label>
//                   <input
//                     type="text"
//                     name="link_google_maps"
//                     defaultValue={
//                       umkm?.linkGoogleMaps || umkm?.link_google_maps || ""
//                     }
//                     placeholder="https://maps.google.com/..."
//                     className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-xs font-medium mb-1">
//                   Alamat Lengkap
//                 </label>
//                 <input
//                   type="text"
//                   name="alamat_lengkap"
//                   defaultValue={
//                     umkm?.alamatLengkap || umkm?.alamat_lengkap || ""
//                   }
//                   placeholder="Jl. Melati No. 12, Desa Kendalrejo..."
//                   className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                 />
//               </div>

//               <div>
//                 <label className="block text-xs font-medium mb-1">
//                   Profile Singkat Usaha
//                 </label>
//                 <textarea
//                   name="profile_singkat"
//                   rows={2}
//                   defaultValue={
//                     umkm?.profilSingkat || umkm?.profile_singkat || ""
//                   }
//                   placeholder="Produksi keripik tempe renyah dengan bumbu khas..."
//                   className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                 />
//               </div>

//               <div>
//                 <label className="block text-xs font-medium mb-1">
//                   Target Konsumen
//                 </label>
//                 <input
//                   type="text"
//                   name="target_konsumen"
//                   defaultValue={
//                     umkm?.targetKonsumen || umkm?.target_konsumen || ""
//                   }
//                   placeholder="Ibu rumah tangga, wisatawan, reseller"
//                   className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                 />
//               </div>
//             </div>

//             {/* TAB 2: RINCIAN PRODUK */}
//             <div className={activeTab === "rincian" ? "space-y-3" : "hidden"}>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                 <div>
//                   <label className="block text-xs font-medium mb-1">
//                     Nama Produk Utama
//                   </label>
//                   <input
//                     type="text"
//                     name="nama_produk"
//                     defaultValue={umkm?.namaProduk || umkm?.nama_produk || ""}
//                     placeholder="Keripik Tempe Bu Sari"
//                     className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-medium mb-1">
//                     Produk Lainnya / Variasi
//                   </label>
//                   <input
//                     type="text"
//                     name="produk_utama_lainnya"
//                     defaultValue={
//                       umkm?.produkLainnya || umkm?.produk_utama_lainnya || ""
//                     }
//                     placeholder="Keripik Tempe Pedas, Balado"
//                     className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-medium mb-1">
//                     Kisaran Harga
//                   </label>
//                   <input
//                     type="text"
//                     name="harga"
//                     defaultValue={umkm?.harga || ""}
//                     placeholder="Rp 10.000 – Rp 25.000 / bungkus"
//                     className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-medium mb-1">
//                     Berat / Ukuran Kemasan
//                   </label>
//                   <input
//                     type="text"
//                     name="berat_ukuran"
//                     defaultValue={umkm?.beratUkuran || umkm?.berat_ukuran || ""}
//                     placeholder="100g / 250g / 500g"
//                     className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-xs font-medium mb-1">
//                   Varian Rasa / Pilihan (Pisahkan dengan koma)
//                 </label>
//                 <input
//                   type="text"
//                   name="varian"
//                   defaultValue={
//                     Array.isArray(umkm?.varian)
//                       ? umkm.varian.join(", ")
//                       : umkm?.varian || ""
//                   }
//                   placeholder="Original, Pedas, Balado, Keju"
//                   className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                 />
//               </div>

//               <div>
//                 <label className="block text-xs font-medium mb-1">
//                   Deskripsi Lengkap Produk
//                 </label>
//                 <textarea
//                   name="deskripsi_produk"
//                   rows={4}
//                   defaultValue={
//                     umkm?.deskripsiProduk || umkm?.deskripsi_produk || ""
//                   }
//                   placeholder="Keripik tempe renyah dibuat dari kedelai segar..."
//                   className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                 />
//               </div>
//             </div>

//             {/* TAB 3: LAYANAN & PROMOSI */}
//             <div className={activeTab === "layanan" ? "space-y-3" : "hidden"}>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                 <div>
//                   <label className="block text-xs font-medium mb-1">
//                     Metode Pembayaran (Pisahkan dengan koma)
//                   </label>
//                   <input
//                     type="text"
//                     name="pembayaran"
//                     defaultValue={
//                       Array.isArray(umkm?.metodePembayaran)
//                         ? umkm.metodePembayaran.join(", ")
//                         : umkm?.metodePembayaran || umkm?.pembayaran || ""
//                     }
//                     placeholder="Cash, QRIS, Transfer BRI"
//                     className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-medium mb-1">
//                     Layanan Pengiriman (Pisahkan dengan koma)
//                   </label>
//                   <input
//                     type="text"
//                     name="pengiriman"
//                     defaultValue={
//                       Array.isArray(umkm?.layananPengiriman)
//                         ? umkm.layananPengiriman.join(", ")
//                         : umkm?.layananPengiriman || umkm?.pengiriman || ""
//                     }
//                     placeholder="Ambil sendiri, Kurir lokal, JNE, J&T"
//                     className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-medium mb-1">
//                     Rekening Usaha
//                   </label>
//                   <input
//                     type="text"
//                     name="rekening_usaha"
//                     defaultValue={
//                       umkm?.rekeningUsaha || umkm?.rekening_usaha || ""
//                     }
//                     placeholder="BRI 1234-5678-9012 a.n. Sari Wulandari"
//                     className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-medium mb-1">
//                     Media Promosi & Sosmed (Pisahkan dengan koma)
//                   </label>
//                   <input
//                     type="text"
//                     name="media_promosi"
//                     defaultValue={
//                       Array.isArray(umkm?.mediaPromosi)
//                         ? umkm.mediaPromosi.join(", ")
//                         : umkm?.mediaPromosi || umkm?.media_promosi || ""
//                     }
//                     placeholder="WhatsApp, Instagram, Facebook"
//                     className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-xs font-medium mb-1">
//                   Username Instagram / Link Media
//                 </label>
//                 <input
//                   type="text"
//                   name="username_link"
//                   defaultValue={
//                     umkm?.usernameSosmed || umkm?.username_link || ""
//                   }
//                   placeholder="@keripiktempebu_sari"
//                   className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                 />
//               </div>
//             </div>

//             {/* TAB 4: LEGALITAS & HIGIENE */}
//             <div className={activeTab === "legalitas" ? "space-y-3" : "hidden"}>
//               <div>
//                 <label className="block text-xs font-medium mb-1">
//                   Legalitas Usaha (NIB / PIRT / Halal - Pisahkan dengan koma)
//                 </label>
//                 <input
//                   type="text"
//                   name="legalitas_usaha"
//                   defaultValue={
//                     Array.isArray(umkm?.legalitasUsaha)
//                       ? umkm.legalitasUsaha.join(", ")
//                       : umkm?.legalitasUsaha || umkm?.legalitas_usaha || ""
//                   }
//                   placeholder="NIB, PIRT No. 2123517010001-22"
//                   className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                 />
//               </div>

//               <div>
//                 <label className="block text-xs font-medium mb-1">
//                   Pencatatan Keuangan
//                 </label>
//                 <input
//                   type="text"
//                   name="pencatatan_keuangan"
//                   defaultValue={
//                     umkm?.pencatatanKeuangan || umkm?.pencatatan_keuangan || ""
//                   }
//                   placeholder="Buku kas manual & aplikasi BukuWarung"
//                   className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                 />
//               </div>

//               <div>
//                 <label className="block text-xs font-medium mb-1">
//                   Informasi Higiene & Sanitasi
//                 </label>
//                 <textarea
//                   name="informasi_higiene_sanitasi"
//                   rows={3}
//                   defaultValue={
//                     umkm?.informasiHigieneSanitasi ||
//                     umkm?.informasi_higiene_sanitasi ||
//                     ""
//                   }
//                   placeholder="Produksi di dapur khusus, bahan baku dicuci bersih, pengemas food-grade..."
//                   className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* 4. Tombol Aksi Bawah (Tetap Terkunci di Bawah) */}
//           <div className="flex justify-between items-center pt-4 border-t border-border mt-4 shrink-0">
//             <span className="text-xs text-muted-foreground hidden sm:inline">
//               * Silakan klik tab di atas untuk melengkapi kategori data lainnya.
//             </span>
//             <div className="flex gap-2 ml-auto">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="px-4 py-2 border border-border rounded-xl text-xs hover:bg-muted font-medium"
//               >
//                 Batal
//               </button>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="px-5 py-2 bg-primary text-primary-foreground rounded-xl text-xs font-semibold hover:opacity-90 disabled:opacity-50 transition"
//               >
//                 {loading ? "Menyimpan Data..." : "Simpan Semua Data"}
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// terbaru
// "use client";

// import { useState } from "react";
// import { supabase } from "@/lib/supabase";
// import type { UMKM } from "@/lib/data/umkm";
// import imageCompression from "browser-image-compression";
// import { toast } from "sonner";

// type Props = {
//   umkm: UMKM | null;
//   onSave: (saved: UMKM) => void;
//   onClose: () => void;
// };

// export function UmkmFormModal({ umkm, onSave, onClose }: Props) {
//   const [loading, setLoading] = useState(false);
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [activeTab, setActiveTab] = useState<
//     "utama" | "rincian" | "layanan" | "legalitas"
//   >("utama");

//   const parseArray = (val: string) =>
//     val
//       ? val
//           .split(",")
//           .map((s) => s.trim())
//           .filter(Boolean)
//       : [];

//   async function uploadFoto(file: File) {
//     try {
//       const options = {
//         maxSizeMB: 0.5,
//         maxWidthOrHeight: 1200,
//         useWebWorker: true,
//       };

//       const compressedFile = await imageCompression(file, options);
//       const fileExt = compressedFile.name.split(".").pop();
//       const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
//       const filePath = `produk/${fileName}`;

//       const { error: uploadError } = await supabase.storage
//         .from("umkm-photos")
//         .upload(filePath, compressedFile);

//       if (uploadError) throw uploadError;

//       const { data } = supabase.storage
//         .from("umkm-photos")
//         .getPublicUrl(filePath);

//       return data.publicUrl;
//     } catch (error) {
//       console.error("Gagal mengompres/mengunggah foto:", error);
//       return null;
//     }
//   }

//   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const formData = new FormData(e.currentTarget);
//       let fotoUrl = umkm?.fotoProduk || umkm?.foto_produk || "";

//       if (selectedFile) {
//         if (umkm && (umkm.fotoProduk || umkm.foto_produk)) {
//           const rawOldUrl = umkm.fotoProduk || umkm.foto_produk || "";
//           const oldUrls = Array.isArray(rawOldUrl) ? rawOldUrl : [rawOldUrl];

//           for (const oldUrl of oldUrls) {
//             if (
//               oldUrl &&
//               typeof oldUrl === "string" &&
//               oldUrl.includes("/umkm-photos/")
//             ) {
//               const oldPath = oldUrl.split("/umkm-photos/")[1];
//               if (oldPath) {
//                 await supabase.storage.from("umkm-photos").remove([oldPath]);
//               }
//             }
//           }
//         }

//         const uploadedUrl = await uploadFoto(selectedFile);
//         if (uploadedUrl) {
//           fotoUrl = uploadedUrl;
//         }
//       }

//       const payload = {
//         nama_umkm: formData.get("nama_umkm"),
//         nama_pemilik: formData.get("nama_pemilik"),
//         alamat_lengkap: formData.get("alamat_lengkap"),
//         nomor_wa: formData.get("nomor_wa"),
//         tahun_berdiri: formData.get("tahun_berdiri"),
//         profile_singkat: formData.get("profile_singkat"),
//         target_konsumen: formData.get("target_konsumen"),
//         link_google_maps: formData.get("link_google_maps"),
//         jenis_usaha: formData.get("jenis_usaha"),
//         produk_utama_lainnya: formData.get("produk_utama_lainnya"),
//         nama_produk: formData.get("nama_produk"),
//         deskripsi_produk: formData.get("deskripsi_produk"),
//         harga: formData.get("harga"),
//         berat_ukuran: formData.get("berat_ukuran"),
//         varian: formData.get("varian"),
//         jam_operasional: formData.get("jam_operasional"),
//         hari_operasional: formData.get("hari_operasional"),
//         foto_produk: fotoUrl,
//         media_promosi: formData.get("media_promosi"),
//         username_link: formData.get("username_link"),
//         pembayaran: formData.get("pembayaran"),
//         pengiriman: formData.get("pengiriman"),
//         rekening_usaha: formData.get("rekening_usaha"),
//         pencatatan_keuangan: formData.get("pencatatan_keuangan"),
//         metode_pencatatan: formData.get("metode_pencatatan"),
//         legalitas_usaha: formData.get("legalitas_usaha"),
//         informasi_higiene_sanitasi: formData.get("informasi_higiene_sanitasi"),
//       };

//       let realId = umkm?.id;

//       if (umkm) {
//         // Mode Edit
//         const { error } = await supabase
//           .from("umkm")
//           .update(payload)
//           .eq("id", umkm.id);

//         if (error) throw error;
//         toast.success("Data UMKM berhasil diperbarui!");
//       } else {
//         // 🟢 Mode Tambah: Pakai .select().single() agar dapat ID ASLI dari Supabase
//         const { data, error } = await supabase
//           .from("umkm")
//           .insert([payload])
//           .select()
//           .single();

//         if (error) throw error;
//         realId = data.id; // Ambil ID asli yang tergenerate di Supabase
//         toast.success("Data UMKM berhasil ditambahkan!");
//       }

//       const savedDataForDashboard = {
//         id: realId,
//         ...payload,
//         namaUmkm: (formData.get("nama_umkm") as string) || "",
//         namaPemilik: (formData.get("nama_pemilik") as string) || "",
//         jenisUsaha: (formData.get("jenis_usaha") as string) || "",
//         nomorHpWa: (formData.get("nomor_wa") as string) || "",
//         hariOperasional: (formData.get("hari_operasional") as string) || "",
//         jamOperasional: (formData.get("jam_operasional") as string) || "",
//         fotoProduk: fotoUrl,
//         alamatLengkap: (formData.get("alamat_lengkap") as string) || "",
//         tahunBerdiri: Number(formData.get("tahun_berdiri")) || 0,
//         profilSingkat: (formData.get("profile_singkat") as string) || "",
//         targetKonsumen: (formData.get("target_konsumen") as string) || "",
//         linkGoogleMaps: (formData.get("link_google_maps") as string) || "",
//         namaProduk: (formData.get("nama_produk") as string) || "",
//         produkLainnya: (formData.get("produk_utama_lainnya") as string) || "",
//         deskripsiProduk: (formData.get("deskripsi_produk") as string) || "",
//         harga: (formData.get("harga") as string) || "",
//         beratUkuran: (formData.get("berat_ukuran") as string) || "",

//         varian: parseArray(formData.get("varian") as string),
//         mediaPromosi: parseArray(formData.get("media_promosi") as string),
//         metodePembayaran: parseArray(formData.get("pembayaran") as string),
//         layananPengiriman: parseArray(formData.get("pengiriman") as string),
//         legalitasUsaha: parseArray(formData.get("legalitas_usaha") as string),

//         usernameSosmed: (formData.get("username_link") as string) || "",
//         rekeningUsaha: (formData.get("rekening_usaha") as string) || "",
//         pencatatanKeuangan:
//           (formData.get("pencatatan_keuangan") as string) || "",
//         metodePencatatan: (formData.get("metode_pencatatan") as string) || "",
//         informasiHigieneSanitasi:
//           (formData.get("informasi_higiene_sanitasi") as string) || "",
//       };

//       onSave(savedDataForDashboard as any);
//       onClose();
//     } catch (err: any) {
//       toast.error("Gagal menyimpan data: " + err.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
//       <div className="bg-card rounded-2xl max-w-3xl w-full p-6 h-[85vh] max-h-[90vh] border border-border shadow-2xl flex flex-col">
//         {/* Header Modal */}
//         <div className="flex justify-between items-center pb-3 border-b border-border shrink-0">
//           <h2 className="text-xl font-bold text-foreground">
//             {umkm ? "Edit Data UMKM" : "Tambah UMKM Baru"}
//           </h2>
//           <button
//             onClick={onClose}
//             type="button"
//             className="text-muted-foreground hover:text-foreground text-lg px-2"
//           >
//             ✕
//           </button>
//         </div>

//         {/* Tab Navigasi */}
//         <div className="flex shrink-0 border-b border-border my-3 gap-2 text-xs sm:text-sm overflow-x-auto pb-1">
//           {[
//             { id: "utama", label: "Informasi Utama" },
//             { id: "rincian", label: "Rincian Produk" },
//             { id: "layanan", label: "Layanan & Promosi" },
//             { id: "legalitas", label: "Legalitas & Higiene" },
//           ].map((tab) => (
//             <button
//               key={tab.id}
//               type="button"
//               onClick={() => setActiveTab(tab.id as any)}
//               className={`pb-2 px-3 font-semibold border-b-2 transition-colors whitespace-nowrap ${
//                 activeTab === tab.id
//                   ? "border-primary text-primary"
//                   : "border-transparent text-muted-foreground hover:text-foreground"
//               }`}
//             >
//               {tab.label}
//             </button>
//           ))}
//         </div>

//         {/* Form Isian */}
//         <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0">
//           <div className="flex-1 overflow-y-auto pr-2 space-y-4">
//             {/* TAB 1: INFORMASI UTAMA */}
//             <div className={activeTab === "utama" ? "space-y-4" : "hidden"}>
//               <div className="flex flex-col gap-1">
//                 <label className="text-xs font-semibold">
//                   Upload Foto Header / Produk Utama
//                 </label>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={(e) =>
//                     e.target.files?.[0] && setSelectedFile(e.target.files[0])
//                   }
//                   className="file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-primary file:text-primary-foreground text-xs cursor-pointer"
//                 />
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                 <div>
//                   <label className="block text-xs font-medium mb-1">
//                     Nama UMKM *
//                   </label>
//                   <input
//                     type="text"
//                     name="nama_umkm"
//                     defaultValue={umkm?.namaUmkm || umkm?.nama_umkm || ""}
//                     required
//                     className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-medium mb-1">
//                     Nama Pemilik
//                   </label>
//                   <input
//                     type="text"
//                     name="nama_pemilik"
//                     defaultValue={umkm?.namaPemilik || umkm?.nama_pemilik || ""}
//                     className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-medium mb-1">
//                     Jenis Usaha
//                   </label>
//                   <select
//                     name="jenis_usaha"
//                     defaultValue={
//                       umkm?.jenisUsaha || umkm?.jenis_usaha || "Kuliner"
//                     }
//                     className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                   >
//                     <option value="Kuliner">Kuliner</option>
//                     <option value="Kerajinan">Kerajinan</option>
//                     <option value="Perdagangan">Perdagangan</option>
//                     <option value="Pertanian">Pertanian</option>
//                     <option value="Jasa">Jasa</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-xs font-medium mb-1">
//                     Nomor WhatsApp / HP
//                   </label>
//                   <input
//                     type="text"
//                     name="nomor_wa"
//                     defaultValue={umkm?.nomorHpWa || umkm?.nomor_wa || ""}
//                     placeholder="08123456789"
//                     className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-medium mb-1">
//                     Hari Operasional
//                   </label>
//                   <input
//                     type="text"
//                     name="hari_operasional"
//                     defaultValue={
//                       umkm?.hariOperasional || umkm?.hari_operasional || ""
//                     }
//                     placeholder="Senin – Sabtu"
//                     className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-medium mb-1">
//                     Jam Operasional
//                   </label>
//                   <input
//                     type="text"
//                     name="jam_operasional"
//                     defaultValue={
//                       umkm?.jamOperasional || umkm?.jam_operasional || ""
//                     }
//                     placeholder="07.00 – 17.00 WIB"
//                     className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-medium mb-1">
//                     Tahun Berdiri
//                   </label>
//                   <input
//                     type="text"
//                     name="tahun_berdiri"
//                     defaultValue={
//                       umkm?.tahunBerdiri || umkm?.tahun_berdiri || ""
//                     }
//                     placeholder="2015"
//                     className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-medium mb-1">
//                     Link Google Maps
//                   </label>
//                   <input
//                     type="text"
//                     name="link_google_maps"
//                     defaultValue={
//                       umkm?.linkGoogleMaps || umkm?.link_google_maps || ""
//                     }
//                     placeholder="https://maps.google.com/..."
//                     className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-xs font-medium mb-1">
//                   Alamat Lengkap
//                 </label>
//                 <input
//                   type="text"
//                   name="alamat_lengkap"
//                   defaultValue={
//                     umkm?.alamatLengkap || umkm?.alamat_lengkap || ""
//                   }
//                   placeholder="Jl. Melati No. 12, Desa Kendalrejo..."
//                   className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                 />
//               </div>

//               <div>
//                 <label className="block text-xs font-medium mb-1">
//                   Profile Singkat Usaha
//                 </label>
//                 <textarea
//                   name="profile_singkat"
//                   rows={2}
//                   defaultValue={
//                     umkm?.profilSingkat || umkm?.profile_singkat || ""
//                   }
//                   placeholder="Produksi keripik tempe renyah dengan bumbu khas..."
//                   className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                 />
//               </div>

//               <div>
//                 <label className="block text-xs font-medium mb-1">
//                   Target Konsumen
//                 </label>
//                 <input
//                   type="text"
//                   name="target_konsumen"
//                   defaultValue={
//                     umkm?.targetKonsumen || umkm?.target_konsumen || ""
//                   }
//                   placeholder="Ibu rumah tangga, wisatawan, reseller"
//                   className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                 />
//               </div>
//             </div>

//             {/* TAB 2: RINCIAN PRODUK */}
//             <div className={activeTab === "rincian" ? "space-y-3" : "hidden"}>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                 <div>
//                   <label className="block text-xs font-medium mb-1">
//                     Nama Produk Utama
//                   </label>
//                   <input
//                     type="text"
//                     name="nama_produk"
//                     defaultValue={umkm?.namaProduk || umkm?.nama_produk || ""}
//                     placeholder="Keripik Tempe Bu Sari"
//                     className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-medium mb-1">
//                     Produk Lainnya / Variasi
//                   </label>
//                   <input
//                     type="text"
//                     name="produk_utama_lainnya"
//                     defaultValue={
//                       umkm?.produkLainnya || umkm?.produk_utama_lainnya || ""
//                     }
//                     placeholder="Keripik Tempe Pedas, Balado"
//                     className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-medium mb-1">
//                     Kisaran Harga
//                   </label>
//                   <input
//                     type="text"
//                     name="harga"
//                     defaultValue={umkm?.harga || ""}
//                     placeholder="Rp 10.000 – Rp 25.000 / bungkus"
//                     className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-medium mb-1">
//                     Berat / Ukuran Kemasan
//                   </label>
//                   <input
//                     type="text"
//                     name="berat_ukuran"
//                     defaultValue={umkm?.beratUkuran || umkm?.berat_ukuran || ""}
//                     placeholder="100g / 250g / 500g"
//                     className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-xs font-medium mb-1">
//                   Varian Rasa / Pilihan (Pisahkan dengan koma)
//                 </label>
//                 <input
//                   type="text"
//                   name="varian"
//                   defaultValue={
//                     Array.isArray(umkm?.varian)
//                       ? umkm.varian.join(", ")
//                       : umkm?.varian || ""
//                   }
//                   placeholder="Original, Pedas, Balado, Keju"
//                   className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                 />
//               </div>

//               <div>
//                 <label className="block text-xs font-medium mb-1">
//                   Deskripsi Lengkap Produk
//                 </label>
//                 <textarea
//                   name="deskripsi_produk"
//                   rows={4}
//                   defaultValue={
//                     umkm?.deskripsiProduk || umkm?.deskripsi_produk || ""
//                   }
//                   placeholder="Keripik tempe renyah dibuat dari kedelai segar..."
//                   className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                 />
//               </div>
//             </div>

//             {/* TAB 3: LAYANAN & PROMOSI */}
//             <div className={activeTab === "layanan" ? "space-y-3" : "hidden"}>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                 <div>
//                   <label className="block text-xs font-medium mb-1">
//                     Metode Pembayaran (Pisahkan dengan koma)
//                   </label>
//                   <input
//                     type="text"
//                     name="pembayaran"
//                     defaultValue={
//                       Array.isArray(umkm?.metodePembayaran)
//                         ? umkm.metodePembayaran.join(", ")
//                         : umkm?.metodePembayaran || umkm?.pembayaran || ""
//                     }
//                     placeholder="Cash, QRIS, Transfer BRI"
//                     className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-medium mb-1">
//                     Layanan Pengiriman (Pisahkan dengan koma)
//                   </label>
//                   <input
//                     type="text"
//                     name="pengiriman"
//                     defaultValue={
//                       Array.isArray(umkm?.layananPengiriman)
//                         ? umkm.layananPengiriman.join(", ")
//                         : umkm?.layananPengiriman || umkm?.pengiriman || ""
//                     }
//                     placeholder="Ambil sendiri, Kurir lokal, JNE, J&T"
//                     className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-medium mb-1">
//                     Rekening Usaha
//                   </label>
//                   <input
//                     type="text"
//                     name="rekening_usaha"
//                     defaultValue={
//                       umkm?.rekeningUsaha || umkm?.rekening_usaha || ""
//                     }
//                     placeholder="BRI 1234-5678-9012 a.n. Sari Wulandari"
//                     className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-medium mb-1">
//                     Media Promosi & Sosmed (Pisahkan dengan koma)
//                   </label>
//                   <input
//                     type="text"
//                     name="media_promosi"
//                     defaultValue={
//                       Array.isArray(umkm?.mediaPromosi)
//                         ? umkm.mediaPromosi.join(", ")
//                         : umkm?.mediaPromosi || umkm?.media_promosi || ""
//                     }
//                     placeholder="WhatsApp, Instagram, Facebook"
//                     className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-xs font-medium mb-1">
//                   Username Instagram / Link Media
//                 </label>
//                 <input
//                   type="text"
//                   name="username_link"
//                   defaultValue={
//                     umkm?.usernameSosmed || umkm?.username_link || ""
//                   }
//                   placeholder="@keripiktempebu_sari"
//                   className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                 />
//               </div>
//             </div>

//             {/* TAB 4: LEGALITAS & HIGIENE */}
//             <div className={activeTab === "legalitas" ? "space-y-3" : "hidden"}>
//               <div>
//                 <label className="block text-xs font-medium mb-1">
//                   Legalitas Usaha (NIB / PIRT / Halal - Pisahkan dengan koma)
//                 </label>
//                 <input
//                   type="text"
//                   name="legalitas_usaha"
//                   defaultValue={
//                     Array.isArray(umkm?.legalitasUsaha)
//                       ? umkm.legalitasUsaha.join(", ")
//                       : umkm?.legalitasUsaha || umkm?.legalitas_usaha || ""
//                   }
//                   placeholder="NIB, PIRT No. 2123517010001-22"
//                   className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                 />
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                 <div>
//                   <label className="block text-xs font-medium mb-1">
//                     Pencatatan Keuangan
//                   </label>
//                   <input
//                     type="text"
//                     name="pencatatan_keuangan"
//                     defaultValue={
//                       umkm?.pencatatanKeuangan ||
//                       umkm?.pencatatan_keuangan ||
//                       ""
//                     }
//                     placeholder="Sudah Ada / Belum Ada"
//                     className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                   />
//                 </div>
//                 {/* 🟢 METODE PENCATATAN (Baru Ditingkatkan) */}
//                 <div>
//                   <label className="block text-xs font-medium mb-1">
//                     Metode Pencatatan
//                   </label>
//                   <input
//                     type="text"
//                     name="metode_pencatatan"
//                     defaultValue={
//                       umkm?.metodePencatatan || umkm?.metode_pencatatan || ""
//                     }
//                     placeholder="Buku Kas Manual / BukuWarung / Excel"
//                     className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-xs font-medium mb-1">
//                   Informasi Higiene & Sanitasi
//                 </label>
//                 <textarea
//                   name="informasi_higiene_sanitasi"
//                   rows={3}
//                   defaultValue={
//                     umkm?.informasiHigieneSanitasi ||
//                     umkm?.informasi_higiene_sanitasi ||
//                     ""
//                   }
//                   placeholder="Produksi di dapur khusus, bahan baku dicuci bersih, pengemas food-grade..."
//                   className="w-full p-2 border border-border rounded-xl text-xs bg-background"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Tombol Aksi Bawah */}
//           <div className="flex justify-between items-center pt-4 border-t border-border mt-4 shrink-0">
//             <span className="text-xs text-muted-foreground hidden sm:inline">
//               * Silakan klik tab di atas untuk melengkapi kategori data lainnya.
//             </span>
//             <div className="flex gap-2 ml-auto">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="px-4 py-2 border border-border rounded-xl text-xs hover:bg-muted font-medium"
//               >
//                 Batal
//               </button>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="px-5 py-2 bg-primary text-primary-foreground rounded-xl text-xs font-semibold hover:opacity-90 disabled:opacity-50 transition"
//               >
//                 {loading ? "Menyimpan Data..." : "Simpan Semua Data"}
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import type { UMKM } from "@/lib/data/umkm";
import imageCompression from "browser-image-compression";
import { toast } from "sonner";

type Props = {
  umkm: UMKM | null;
  onSave: (saved: UMKM) => void;
  onClose: () => void;
};

export function UmkmFormModal({ umkm, onSave, onClose }: Props) {
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState<
    "utama" | "rincian" | "layanan" | "legalitas"
  >("utama");

  const parseArray = (val: string) =>
    val
      ? val
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : [];

  async function uploadFoto(file: File) {
    try {
      const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1200,
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(file, options);
      const fileExt = compressedFile.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const filePath = `produk/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("umkm-photos")
        .upload(filePath, compressedFile);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from("umkm-photos")
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error("Gagal mengompres/mengunggah foto:", error);
      return null;
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      let fotoUrl = umkm?.fotoProduk || umkm?.foto_produk || "";

      if (selectedFile) {
        if (umkm && (umkm.fotoProduk || umkm.foto_produk)) {
          const rawOldUrl = umkm.fotoProduk || umkm.foto_produk || "";
          const oldUrls = Array.isArray(rawOldUrl) ? rawOldUrl : [rawOldUrl];

          for (const oldUrl of oldUrls) {
            if (
              oldUrl &&
              typeof oldUrl === "string" &&
              oldUrl.includes("/umkm-photos/")
            ) {
              const oldPath = oldUrl.split("/umkm-photos/")[1];
              if (oldPath) {
                await supabase.storage.from("umkm-photos").remove([oldPath]);
              }
            }
          }
        }

        const uploadedUrl = await uploadFoto(selectedFile);
        if (uploadedUrl) {
          fotoUrl = uploadedUrl;
        }
      }

      const payload = {
        nama_umkm: formData.get("nama_umkm"),
        nama_pemilik: formData.get("nama_pemilik"),
        alamat_lengkap: formData.get("alamat_lengkap"),
        nomor_wa: formData.get("nomor_wa"),
        tahun_berdiri: formData.get("tahun_berdiri"),
        profile_singkat: formData.get("profile_singkat"),
        target_konsumen: formData.get("target_konsumen"),
        link_google_maps: formData.get("link_google_maps"),
        jenis_usaha: formData.get("jenis_usaha"),
        produk_utama_lainnya: formData.get("produk_utama_lainnya"),
        nama_produk: formData.get("nama_produk"),
        deskripsi_produk: formData.get("deskripsi_produk"),
        harga: formData.get("harga"),
        berat_ukuran: formData.get("berat_ukuran"),
        varian: formData.get("varian"),
        jam_operasional: formData.get("jam_operasional"),
        hari_operasional: formData.get("hari_operasional"),
        foto_produk: fotoUrl,
        media_promosi: formData.get("media_promosi"),
        username_link: formData.get("username_link"),
        pembayaran: formData.get("pembayaran"),
        pengiriman: formData.get("pengiriman"),
        rekening_usaha: formData.get("rekening_usaha"),
        pencatatan_keuangan: formData.get("pencatatan_keuangan"),
        metode_pencatatan: formData.get("metode_pencatatan"),
        legalitas_usaha: formData.get("legalitas_usaha"),
        informasi_higiene_sanitasi: formData.get("informasi_higiene_sanitasi"),
      };

      let realId = umkm?.id;

      if (umkm) {
        const { error } = await supabase
          .from("umkm")
          .update(payload)
          .eq("id", umkm.id);

        if (error) throw error;
        toast.success("Data UMKM berhasil diperbarui!");
      } else {
        const { data, error } = await supabase
          .from("umkm")
          .insert([payload])
          .select()
          .single();

        if (error) throw error;
        realId = data.id;
        toast.success("Data UMKM berhasil ditambahkan!");
      }

      const savedDataForDashboard = {
        id: realId,
        ...payload,
        namaUmkm: (formData.get("nama_umkm") as string) || "",
        namaPemilik: (formData.get("nama_pemilik") as string) || "",
        jenisUsaha: (formData.get("jenis_usaha") as string) || "",
        nomorHpWa: (formData.get("nomor_wa") as string) || "",
        hariOperasional: (formData.get("hari_operasional") as string) || "",
        jamOperasional: (formData.get("jam_operasional") as string) || "",
        fotoProduk: fotoUrl,
        alamatLengkap: (formData.get("alamat_lengkap") as string) || "",
        tahunBerdiri: Number(formData.get("tahun_berdiri")) || 0,
        profilSingkat: (formData.get("profile_singkat") as string) || "",
        targetKonsumen: (formData.get("target_konsumen") as string) || "",
        linkGoogleMaps: (formData.get("link_google_maps") as string) || "",
        produkUtama: (formData.get("nama_produk") as string) || "",
        namaProduk: (formData.get("nama_produk") as string) || "",
        produkLainnya: (formData.get("produk_utama_lainnya") as string) || "",
        deskripsiProduk: (formData.get("deskripsi_produk") as string) || "",
        harga: (formData.get("harga") as string) || "",
        beratUkuran: (formData.get("berat_ukuran") as string) || "",
        varian: parseArray(formData.get("varian") as string),
        mediaPromosi: parseArray(formData.get("media_promosi") as string),
        metodePembayaran: parseArray(formData.get("pembayaran") as string),
        layananPengiriman: parseArray(formData.get("pengiriman") as string),
        legalitasUsaha: parseArray(formData.get("legalitas_usaha") as string),
        usernameSosmed: (formData.get("username_link") as string) || "",
        rekeningUsaha: (formData.get("rekening_usaha") as string) || "",
        pencatatanKeuangan:
          (formData.get("pencatatan_keuangan") as string) || "",
        metodePencatatan: (formData.get("metode_pencatatan") as string) || "",
        informasiHigieneSanitasi:
          (formData.get("informasi_higiene_sanitasi") as string) || "",
      };

      onSave(savedDataForDashboard as any);
      onClose();
    } catch (err: any) {
      toast.error("Gagal menyimpan data: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-card rounded-2xl max-w-3xl w-full p-6 h-[85vh] max-h-[90vh] border border-border shadow-2xl flex flex-col">
        <div className="flex justify-between items-center pb-3 border-b border-border shrink-0">
          <h2 className="text-xl font-bold text-foreground">
            {umkm ? "Edit Data UMKM" : "Tambah UMKM Baru"}
          </h2>
          <button
            onClick={onClose}
            type="button"
            className="text-muted-foreground hover:text-foreground text-lg px-2"
          >
            ✕
          </button>
        </div>

        <div className="flex shrink-0 border-b border-border my-3 gap-2 text-xs sm:text-sm overflow-x-auto pb-1">
          {[
            { id: "utama", label: "Informasi Utama" },
            { id: "rincian", label: "Rincian Produk" },
            { id: "layanan", label: "Layanan & Promosi" },
            { id: "legalitas", label: "Legalitas & Higiene" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-2 px-3 font-semibold border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0">
          <div className="flex-1 overflow-y-auto pr-2 space-y-4">
            {/* TAB 1 */}
            <div className={activeTab === "utama" ? "space-y-4" : "hidden"}>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold">
                  Upload Foto Header / Produk Utama
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    e.target.files?.[0] && setSelectedFile(e.target.files[0])
                  }
                  className="file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-primary file:text-primary-foreground text-xs cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium mb-1">
                    Nama UMKM *
                  </label>
                  <input
                    type="text"
                    name="nama_umkm"
                    defaultValue={umkm?.namaUmkm || umkm?.nama_umkm || ""}
                    required
                    className="w-full p-2 border border-border rounded-xl text-xs bg-background"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">
                    Nama Pemilik
                  </label>
                  <input
                    type="text"
                    name="nama_pemilik"
                    defaultValue={umkm?.namaPemilik || umkm?.nama_pemilik || ""}
                    className="w-full p-2 border border-border rounded-xl text-xs bg-background"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">
                    Jenis Usaha
                  </label>
                  <select
                    name="jenis_usaha"
                    defaultValue={
                      umkm?.jenisUsaha || umkm?.jenis_usaha || "Kuliner"
                    }
                    className="w-full p-2 border border-border rounded-xl text-xs bg-background"
                  >
                    <option value="Kuliner">Kuliner</option>
                    <option value="Kerajinan">Kerajinan</option>
                    <option value="Perdagangan">Perdagangan</option>
                    <option value="Pertanian">Pertanian</option>
                    <option value="Jasa">Jasa</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">
                    Nomor WhatsApp / HP
                  </label>
                  <input
                    type="text"
                    name="nomor_wa"
                    defaultValue={umkm?.nomorHpWa || umkm?.nomor_wa || ""}
                    placeholder="08123456789"
                    className="w-full p-2 border border-border rounded-xl text-xs bg-background"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">
                    Hari Operasional
                  </label>
                  <input
                    type="text"
                    name="hari_operasional"
                    defaultValue={
                      umkm?.hariOperasional || umkm?.hari_operasional || ""
                    }
                    placeholder="Senin – Sabtu"
                    className="w-full p-2 border border-border rounded-xl text-xs bg-background"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">
                    Jam Operasional
                  </label>
                  <input
                    type="text"
                    name="jam_operasional"
                    defaultValue={
                      umkm?.jamOperasional || umkm?.jam_operasional || ""
                    }
                    placeholder="07.00 – 17.00 WIB"
                    className="w-full p-2 border border-border rounded-xl text-xs bg-background"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">
                    Tahun Berdiri
                  </label>
                  <input
                    type="text"
                    name="tahun_berdiri"
                    defaultValue={
                      umkm?.tahunBerdiri || umkm?.tahun_berdiri || ""
                    }
                    placeholder="2015"
                    className="w-full p-2 border border-border rounded-xl text-xs bg-background"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">
                    Link Google Maps
                  </label>
                  <input
                    type="text"
                    name="link_google_maps"
                    defaultValue={
                      umkm?.linkGoogleMaps || umkm?.link_google_maps || ""
                    }
                    placeholder="https://maps.google.com/..."
                    className="w-full p-2 border border-border rounded-xl text-xs bg-background"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium mb-1">
                  Alamat Lengkap
                </label>
                <input
                  type="text"
                  name="alamat_lengkap"
                  defaultValue={
                    umkm?.alamatLengkap || umkm?.alamat_lengkap || ""
                  }
                  placeholder="Jl. Melati No. 12, Desa Kendalrejo..."
                  className="w-full p-2 border border-border rounded-xl text-xs bg-background"
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1">
                  Profile Singkat Usaha
                </label>
                <textarea
                  name="profile_singkat"
                  rows={2}
                  defaultValue={
                    umkm?.profilSingkat || umkm?.profile_singkat || ""
                  }
                  placeholder="Produksi keripik tempe renyah dengan bumbu khas..."
                  className="w-full p-2 border border-border rounded-xl text-xs bg-background"
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1">
                  Target Konsumen
                </label>
                <input
                  type="text"
                  name="target_konsumen"
                  defaultValue={
                    umkm?.targetKonsumen || umkm?.target_konsumen || ""
                  }
                  placeholder="Ibu rumah tangga, wisatawan, reseller"
                  className="w-full p-2 border border-border rounded-xl text-xs bg-background"
                />
              </div>
            </div>

            {/* TAB 2 */}
            <div className={activeTab === "rincian" ? "space-y-3" : "hidden"}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium mb-1">
                    Nama Produk Utama
                  </label>
                  <input
                    type="text"
                    name="nama_produk"
                    defaultValue={umkm?.namaProduk || umkm?.nama_produk || ""}
                    placeholder="Keripik Tempe Bu Sari"
                    className="w-full p-2 border border-border rounded-xl text-xs bg-background"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">
                    Produk Lainnya / Variasi
                  </label>
                  <input
                    type="text"
                    name="produk_utama_lainnya"
                    defaultValue={
                      umkm?.produkLainnya || umkm?.produk_utama_lainnya || ""
                    }
                    placeholder="Keripik Tempe Pedas, Balado"
                    className="w-full p-2 border border-border rounded-xl text-xs bg-background"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">
                    Kisaran Harga
                  </label>
                  <input
                    type="text"
                    name="harga"
                    defaultValue={umkm?.harga || ""}
                    placeholder="Rp 10.000 – Rp 25.000 / bungkus"
                    className="w-full p-2 border border-border rounded-xl text-xs bg-background"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">
                    Berat / Ukuran Kemasan
                  </label>
                  <input
                    type="text"
                    name="berat_ukuran"
                    defaultValue={umkm?.beratUkuran || umkm?.berat_ukuran || ""}
                    placeholder="100g / 250g / 500g"
                    className="w-full p-2 border border-border rounded-xl text-xs bg-background"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium mb-1">
                  Varian Rasa / Pilihan (Pisahkan dengan koma)
                </label>
                <input
                  type="text"
                  name="varian"
                  defaultValue={
                    Array.isArray(umkm?.varian)
                      ? umkm.varian.join(", ")
                      : umkm?.varian || ""
                  }
                  placeholder="Original, Pedas, Balado, Keju"
                  className="w-full p-2 border border-border rounded-xl text-xs bg-background"
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1">
                  Deskripsi Lengkap Produk
                </label>
                <textarea
                  name="deskripsi_produk"
                  rows={4}
                  defaultValue={
                    umkm?.deskripsiProduk || umkm?.deskripsi_produk || ""
                  }
                  placeholder="Keripik tempe renyah dibuat dari kedelai segar..."
                  className="w-full p-2 border border-border rounded-xl text-xs bg-background"
                />
              </div>
            </div>

            {/* TAB 3 */}
            <div className={activeTab === "layanan" ? "space-y-3" : "hidden"}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium mb-1">
                    Metode Pembayaran (Pisahkan dengan koma)
                  </label>
                  <input
                    type="text"
                    name="pembayaran"
                    defaultValue={
                      Array.isArray(umkm?.metodePembayaran)
                        ? umkm.metodePembayaran.join(", ")
                        : umkm?.metodePembayaran || umkm?.pembayaran || ""
                    }
                    placeholder="Cash, QRIS, Transfer BRI"
                    className="w-full p-2 border border-border rounded-xl text-xs bg-background"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">
                    Layanan Pengiriman (Pisahkan dengan koma)
                  </label>
                  <input
                    type="text"
                    name="pengiriman"
                    defaultValue={
                      Array.isArray(umkm?.layananPengiriman)
                        ? umkm.layananPengiriman.join(", ")
                        : umkm?.layananPengiriman || umkm?.pengiriman || ""
                    }
                    placeholder="Ambil sendiri, Kurir lokal, JNE, J&T"
                    className="w-full p-2 border border-border rounded-xl text-xs bg-background"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">
                    Rekening Usaha
                  </label>
                  <input
                    type="text"
                    name="rekening_usaha"
                    defaultValue={
                      umkm?.rekeningUsaha || umkm?.rekening_usaha || ""
                    }
                    placeholder="BRI 1234-5678-9012 a.n. Sari Wulandari"
                    className="w-full p-2 border border-border rounded-xl text-xs bg-background"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">
                    Media Promosi & Sosmed (Pisahkan dengan koma)
                  </label>
                  <input
                    type="text"
                    name="media_promosi"
                    defaultValue={
                      Array.isArray(umkm?.mediaPromosi)
                        ? umkm.mediaPromosi.join(", ")
                        : umkm?.mediaPromosi || umkm?.media_promosi || ""
                    }
                    placeholder="WhatsApp, Instagram, Facebook"
                    className="w-full p-2 border border-border rounded-xl text-xs bg-background"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium mb-1">
                  Username Instagram / Link Media
                </label>
                <input
                  type="text"
                  name="username_link"
                  defaultValue={
                    umkm?.usernameSosmed || umkm?.username_link || ""
                  }
                  placeholder="@keripiktempebu_sari"
                  className="w-full p-2 border border-border rounded-xl text-xs bg-background"
                />
              </div>
            </div>

            {/* TAB 4 */}
            <div className={activeTab === "legalitas" ? "space-y-3" : "hidden"}>
              <div>
                <label className="block text-xs font-medium mb-1">
                  Legalitas Usaha (NIB / PIRT / Halal - Pisahkan dengan koma)
                </label>
                <input
                  type="text"
                  name="legalitas_usaha"
                  defaultValue={
                    Array.isArray(umkm?.legalitasUsaha)
                      ? umkm.legalitasUsaha.join(", ")
                      : umkm?.legalitasUsaha || umkm?.legalitas_usaha || ""
                  }
                  placeholder="NIB, PIRT No. 2123517010001-22"
                  className="w-full p-2 border border-border rounded-xl text-xs bg-background"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium mb-1">
                    Pencatatan Keuangan
                  </label>
                  <input
                    type="text"
                    name="pencatatan_keuangan"
                    defaultValue={
                      umkm?.pencatatanKeuangan ||
                      umkm?.pencatatan_keuangan ||
                      ""
                    }
                    placeholder="Sudah Ada / Belum Ada"
                    className="w-full p-2 border border-border rounded-xl text-xs bg-background"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">
                    Metode Pencatatan
                  </label>
                  <input
                    type="text"
                    name="metode_pencatatan"
                    defaultValue={
                      umkm?.metodePencatatan || umkm?.metode_pencatatan || ""
                    }
                    placeholder="Buku Kas Manual / BukuWarung / Excel"
                    className="w-full p-2 border border-border rounded-xl text-xs bg-background"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium mb-1">
                  Informasi Higiene & Sanitasi
                </label>
                <textarea
                  name="informasi_higiene_sanitasi"
                  rows={3}
                  defaultValue={
                    umkm?.informasiHigieneSanitasi ||
                    umkm?.informasi_higiene_sanitasi ||
                    ""
                  }
                  placeholder="Produksi di dapur khusus, bahan baku dicuci bersih, pengemas food-grade..."
                  className="w-full p-2 border border-border rounded-xl text-xs bg-background"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-border mt-4 shrink-0">
            <span className="text-xs text-muted-foreground hidden sm:inline">
              * Silakan klik tab di atas untuk melengkapi kategori data lainnya.
            </span>
            <div className="flex gap-2 ml-auto">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-border rounded-xl text-xs hover:bg-muted font-medium"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2 bg-primary text-primary-foreground rounded-xl text-xs font-semibold hover:opacity-90 disabled:opacity-50 transition"
              >
                {loading ? "Menyimpan Data..." : "Simpan Semua Data"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
