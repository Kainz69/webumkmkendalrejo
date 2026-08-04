// "use client"

// import { useState, useEffect } from "react"
// import { X } from "lucide-react"
// import type { UMKM } from "@/lib/data/umkm"
// import { jenisUsahaOptions } from "@/lib/data/umkm"

// type FormTab = "profil" | "produk" | "layanan" | "legalitas"

// const emptyForm: Omit<UMKM, "id"> = {
//   namaUmkm: "",
//   namaPemilik: "",
//   alamatLengkap: "",
//   nomorHpWa: "",
//   tahunBerdiri: new Date().getFullYear(),
//   profilSingkat: "",
//   targetKonsumen: "",
//   linkGoogleMaps: "",
//   jenisUsaha: "Kuliner",
//   produkUtama: "",
//   produkLainnya: "",
//   namaProduk: "",
//   deskripsiProduk: "",
//   harga: "",
//   beratUkuran: "",
//   varian: [],
//   jamOperasional: "",
//   hariOperasional: "",
//   fotoProduk: "",
//   mediaPromosi: [],
//   usernameSosmed: "",
//   metodePembayaran: [],
//   layananPengiriman: [],
//   rekeningUsaha: "",
//   pencatatanKeuangan: false,
//   metodePencatatan: "",
//   legalitasUsaha: [],
//   informasiHigieneSanitasi: "",
// }

// type Props = {
//   umkm: UMKM | null // null = add new
//   onSave: (data: UMKM) => void
//   onClose: () => void
// }

// export default function UmkmFormModal({ umkm, onSave, onClose }: Props) {
//   const [tab, setTab] = useState<FormTab>("profil")
//   const [form, setForm] = useState<Omit<UMKM, "id">>(emptyForm)

//   useEffect(() => {
//     if (umkm) {
//       const { id, ...rest } = umkm
//       setForm(rest)
//     } else {
//       setForm(emptyForm)
//     }
//     setTab("profil")
//   }, [umkm])

//   const set = (key: keyof Omit<UMKM, "id">, value: unknown) =>
//     setForm((prev) => ({ ...prev, [key]: value }))

//   const setArray = (key: keyof Omit<UMKM, "id">, raw: string) =>
//     set(key, raw.split(",").map((s) => s.trim()).filter(Boolean))

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     const id = umkm?.id ?? `umkm-${Date.now()}`
//     onSave({ id, ...form })
//   }

//   const tabs: { id: FormTab; label: string }[] = [
//     { id: "profil", label: "Profil & Kontak" },
//     { id: "produk", label: "Produk & Operasional" },
//     { id: "layanan", label: "Layanan & Promosi" },
//     { id: "legalitas", label: "Legalitas & Manajerial" },
//   ]

//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-foreground/40 backdrop-blur-sm p-0 sm:p-4"
//       onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
//     >
//       <div className="bg-card w-full sm:max-w-2xl max-h-[95dvh] sm:max-h-[90vh] rounded-t-3xl sm:rounded-2xl overflow-hidden flex flex-col shadow-2xl">
//         {/* Header */}
//         <div className="flex items-center justify-between px-5 py-4 border-b border-border">
//           <h2 className="font-bold text-foreground">{umkm ? "Edit UMKM" : "Tambah UMKM Baru"}</h2>
//           <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-muted transition-colors">
//             <X className="w-4 h-4 text-muted-foreground" />
//           </button>
//         </div>

//         {/* Tabs */}
//         <div className="flex border-b border-border overflow-x-auto shrink-0">
//           {tabs.map((t) => (
//             <button
//               key={t.id}
//               type="button"
//               onClick={() => setTab(t.id)}
//               className={`flex-1 min-w-max px-3 py-2.5 text-xs font-semibold whitespace-nowrap transition-colors ${
//                 tab === t.id
//                   ? "text-primary border-b-2 border-primary"
//                   : "text-muted-foreground hover:text-foreground"
//               }`}
//             >
//               {t.label}
//             </button>
//           ))}
//         </div>

//         {/* Form body */}
//         <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 p-5">
//           {tab === "profil" && (
//             <div className="space-y-4">
//               <FormField label="Nama UMKM *" required>
//                 <input type="text" value={form.namaUmkm} onChange={(e) => set("namaUmkm", e.target.value)} required className={inputCls} />
//               </FormField>
//               <FormField label="Nama Pemilik *" required>
//                 <input type="text" value={form.namaPemilik} onChange={(e) => set("namaPemilik", e.target.value)} required className={inputCls} />
//               </FormField>
//               <FormField label="Alamat Lengkap *" required>
//                 <textarea rows={3} value={form.alamatLengkap} onChange={(e) => set("alamatLengkap", e.target.value)} required className={inputCls} />
//               </FormField>
//               <div className="grid grid-cols-2 gap-3">
//                 <FormField label="Nomor HP/WA *" required>
//                   <input type="tel" value={form.nomorHpWa} onChange={(e) => set("nomorHpWa", e.target.value)} required className={inputCls} />
//                 </FormField>
//                 <FormField label="Tahun Berdiri *" required>
//                   <input type="number" min={1950} max={2099} value={form.tahunBerdiri} onChange={(e) => set("tahunBerdiri", parseInt(e.target.value))} required className={inputCls} />
//                 </FormField>
//               </div>
//               <FormField label="Profil Singkat">
//                 <textarea rows={3} value={form.profilSingkat} onChange={(e) => set("profilSingkat", e.target.value)} className={inputCls} />
//               </FormField>
//               <FormField label="Target Konsumen">
//                 <input type="text" value={form.targetKonsumen} onChange={(e) => set("targetKonsumen", e.target.value)} className={inputCls} />
//               </FormField>
//               <FormField label="Link Google Maps">
//                 <input type="url" value={form.linkGoogleMaps} onChange={(e) => set("linkGoogleMaps", e.target.value)} className={inputCls} placeholder="https://maps.google.com/..." />
//               </FormField>
//             </div>
//           )}

//           {tab === "produk" && (
//             <div className="space-y-4">
//               <FormField label="Jenis Usaha *" required>
//                 <select value={form.jenisUsaha} onChange={(e) => set("jenisUsaha", e.target.value)} required className={inputCls}>
//                   {jenisUsahaOptions.filter((o) => o !== "Semua").map((o) => (
//                     <option key={o} value={o}>{o}</option>
//                   ))}
//                 </select>
//               </FormField>
//               <FormField label="Nama Produk *" required>
//                 <input type="text" value={form.namaProduk} onChange={(e) => set("namaProduk", e.target.value)} required className={inputCls} />
//               </FormField>
//               <FormField label="Produk Utama">
//                 <input type="text" value={form.produkUtama} onChange={(e) => set("produkUtama", e.target.value)} className={inputCls} />
//               </FormField>
//               <FormField label="Produk Lainnya">
//                 <input type="text" value={form.produkLainnya} onChange={(e) => set("produkLainnya", e.target.value)} className={inputCls} />
//               </FormField>
//               <FormField label="Deskripsi Produk">
//                 <textarea rows={3} value={form.deskripsiProduk} onChange={(e) => set("deskripsiProduk", e.target.value)} className={inputCls} />
//               </FormField>
//               <div className="grid grid-cols-2 gap-3">
//                 <FormField label="Harga">
//                   <input type="text" value={form.harga} onChange={(e) => set("harga", e.target.value)} className={inputCls} placeholder="Rp 10.000 – Rp 50.000" />
//                 </FormField>
//                 <FormField label="Berat / Ukuran">
//                   <input type="text" value={form.beratUkuran} onChange={(e) => set("beratUkuran", e.target.value)} className={inputCls} placeholder="100g / 250g" />
//                 </FormField>
//               </div>
//               <FormField label="Varian (pisahkan dengan koma)">
//                 <input type="text" value={form.varian.join(", ")} onChange={(e) => setArray("varian", e.target.value)} className={inputCls} placeholder="Original, Pedas, Manis" />
//               </FormField>
//               <div className="grid grid-cols-2 gap-3">
//                 <FormField label="Jam Operasional">
//                   <input type="text" value={form.jamOperasional} onChange={(e) => set("jamOperasional", e.target.value)} className={inputCls} placeholder="08.00 – 17.00 WIB" />
//                 </FormField>
//                 <FormField label="Hari Operasional">
//                   <input type="text" value={form.hariOperasional} onChange={(e) => set("hariOperasional", e.target.value)} className={inputCls} placeholder="Senin – Sabtu" />
//                 </FormField>
//               </div>
//               <FormField label="URL Foto Produk">
//                 <input type="url" value={form.fotoProduk} onChange={(e) => set("fotoProduk", e.target.value)} className={inputCls} placeholder="https://images.unsplash.com/..." />
//               </FormField>
//             </div>
//           )}

//           {tab === "layanan" && (
//             <div className="space-y-4">
//               <FormField label="Media Promosi (pisahkan koma)">
//                 <input type="text" value={form.mediaPromosi.join(", ")} onChange={(e) => setArray("mediaPromosi", e.target.value)} className={inputCls} placeholder="WhatsApp, Instagram, Tokopedia" />
//               </FormField>
//               <FormField label="Username / Link Sosmed">
//                 <input type="text" value={form.usernameSosmed} onChange={(e) => set("usernameSosmed", e.target.value)} className={inputCls} placeholder="@username" />
//               </FormField>
//               <FormField label="Metode Pembayaran (pisahkan koma)">
//                 <input type="text" value={form.metodePembayaran.join(", ")} onChange={(e) => setArray("metodePembayaran", e.target.value)} className={inputCls} placeholder="Cash, QRIS, Transfer BRI" />
//               </FormField>
//               <FormField label="Layanan Pengiriman (pisahkan koma)">
//                 <input type="text" value={form.layananPengiriman.join(", ")} onChange={(e) => setArray("layananPengiriman", e.target.value)} className={inputCls} placeholder="Ambil sendiri, JNE, J&T" />
//               </FormField>
//               <FormField label="Rekening Usaha">
//                 <input type="text" value={form.rekeningUsaha} onChange={(e) => set("rekeningUsaha", e.target.value)} className={inputCls} placeholder="BRI 1234-5678 a.n. Nama" />
//               </FormField>
//             </div>
//           )}

//           {tab === "legalitas" && (
//             <div className="space-y-4">
//               <FormField label="Legalitas Usaha (pisahkan koma)">
//                 <input type="text" value={form.legalitasUsaha.join(", ")} onChange={(e) => setArray("legalitasUsaha", e.target.value)} className={inputCls} placeholder="NIB, PIRT, Halal MUI" />
//               </FormField>
//               <div className="flex items-center gap-3 py-1">
//                 <input
//                   id="pencatatan"
//                   type="checkbox"
//                   checked={form.pencatatanKeuangan}
//                   onChange={(e) => set("pencatatanKeuangan", e.target.checked)}
//                   className="w-4 h-4 accent-primary cursor-pointer"
//                 />
//                 <label htmlFor="pencatatan" className="text-sm font-medium text-foreground cursor-pointer">
//                   Melakukan Pencatatan Keuangan
//                 </label>
//               </div>
//               {form.pencatatanKeuangan && (
//                 <FormField label="Metode Pencatatan">
//                   <input type="text" value={form.metodePencatatan} onChange={(e) => set("metodePencatatan", e.target.value)} className={inputCls} placeholder="Buku kas manual / BukuWarung" />
//                 </FormField>
//               )}
//               <FormField label="Informasi Higiene & Sanitasi (khusus kuliner)">
//                 <textarea rows={3} value={form.informasiHigieneSanitasi} onChange={(e) => set("informasiHigieneSanitasi", e.target.value)} className={inputCls} placeholder="Keterangan higiene dan sanitasi produksi..." />
//               </FormField>
//             </div>
//           )}

//           {/* Footer buttons always visible */}
//           <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-border">
//             <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-foreground border border-border rounded-xl hover:bg-muted transition-colors">
//               Batal
//             </button>
//             <button type="submit" className="px-5 py-2 text-sm font-semibold bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors">
//               {umkm ? "Simpan Perubahan" : "Tambah UMKM"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// const inputCls =
//   "w-full px-3 py-2 bg-background border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"

// function FormField({ label, children, required }: { label: string; children: React.ReactNode; required?: boolean }) {
//   return (
//     <div>
//       <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
//         {label}{required && <span className="text-destructive ml-0.5">*</span>}
//       </label>
//       {children}
//     </div>
//   )
// }
// "use client";

// import { useState } from "react";
// import { supabase } from "@/lib/supabase";

// export function UmkmFormModal({ isOpen, onClose, onSuccess }: any) {
//   const [loading, setLoading] = useState(false);
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);

//   // 1. Fungsi untuk Upload Foto langsung ke Supabase Storage
//   async function uploadFoto(file: File) {
//     const fileExt = file.name.split(".").pop();
//     const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
//     const filePath = `produk/${fileName}`;

//     const { error: uploadError } = await supabase.storage
//       .from("umkm-photos")
//       .upload(filePath, file);

//     if (uploadError) {
//       console.error("Gagal upload foto:", uploadError);
//       return null;
//     }

//     // Ambil URL Publik dari foto yang berhasil diunggah
//     const { data } = supabase.storage
//       .from("umkm-photos")
//       .getPublicUrl(filePath);

//     return data.publicUrl;
//   }

//   // 2. Fungsi Submit Form Tambah UMKM
//   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const formData = new FormData(e.currentTarget);
//       let fotoUrl = "";

//       // Jika admin memilih file gambar dari komputernya
//       if (selectedFile) {
//         const uploadedUrl = await uploadFoto(selectedFile);
//         if (uploadedUrl) {
//           fotoUrl = uploadedUrl;
//         }
//       }

//       // Gabungkan data form + URL foto hasil upload
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
//         foto_produk: fotoUrl, // URL otomatis dari Supabase Storage
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

//       // Simpan ke tabel 'umkm'
//       const { error } = await supabase.from("umkm").insert([payload]);

//       if (error) throw error;

//       alert("Data UMKM dan Foto berhasil ditambahkan!");
//       onSuccess?.();
//       onClose();
//     } catch (err: any) {
//       alert("Gagal menyimpan data: " + err.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     // ... komponen modal UI kamu ...
//     <form onSubmit={handleSubmit} className="space-y-4">
//       {/* Input File Foto Produk */}
//       <div className="flex flex-col gap-1">
//         <label className="text-sm font-medium">Upload Foto Produk</label>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => {
//             if (e.target.files?.[0]) {
//               setSelectedFile(e.target.files[0]);
//             }
//           }}
//           className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-green-600 file:text-white hover:file:bg-green-700 cursor-pointer"
//         />
//       </div>

//       {/* Sisa 26 Input Field Lainnya ... */}

//       <button
//         type="submit"
//         disabled={loading}
//         className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
//       >
//         {loading ? "Mengunggah & Menyimpan..." : "Simpan UMKM"}
//       </button>
//     </form>
//   );
// }

// "use client";

// import { useState } from "react";
// import { supabase } from "@/lib/supabase";
// import type { UMKM } from "@/lib/data/umkm";

// type Props = {
//   umkm: UMKM | null; // null = Tambah Baru, UMKM = Edit
//   onSave: (saved: UMKM) => void;
//   onClose: () => void;
// };

// export function UmkmFormModal({ umkm, onSave, onClose }: Props) {
//   const [loading, setLoading] = useState(false);
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);

//   // 1. Fungsi untuk Upload Foto ke Supabase Storage
//   async function uploadFoto(file: File) {
//     const fileExt = file.name.split(".").pop();
//     const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
//     const filePath = `produk/${fileName}`;

//     const { error: uploadError } = await supabase.storage
//       .from("umkm-photos")
//       .upload(filePath, file);

//     if (uploadError) {
//       console.error("Gagal upload foto:", uploadError);
//       return null;
//     }

//     const { data } = supabase.storage
//       .from("umkm-photos")
//       .getPublicUrl(filePath);

//     return data.publicUrl;
//   }

//   // 2. Fungsi Submit Form
//   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const formData = new FormData(e.currentTarget);
//       let fotoUrl = umkm?.fotoProduk || "";

//       if (selectedFile) {
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
//         // Mode Edit: Update data ke Supabase
//         const { error } = await supabase
//           .from("umkm")
//           .update(payload)
//           .eq("id", umkm.id);

//         if (error) throw error;
//         alert("Data UMKM berhasil diperbarui!");
//       } else {
//         // Mode Tambah: Insert data baru ke Supabase
//         const { error } = await supabase.from("umkm").insert([payload]);

//         if (error) throw error;
//         alert("Data UMKM berhasil ditambahkan!");
//       }

//       // Kirim balik data ke dashboard & tutup modal
//       const savedDataForDashboard = {
//         id: umkm?.id || crypto.randomUUID(),
//         namaUmkm: (formData.get("nama_umkm") as string) || "",
//         namaPemilik: (formData.get("nama_pemilik") as string) || "",
//         jenisUsaha: (formData.get("jenis_usaha") as string) || "",
//         nomorHpWa: (formData.get("nomor_wa") as string) || "",
//         hariOperasional: (formData.get("hari_operasional") as string) || "",
//         jamOperasional: (formData.get("jam_operasional") as string) || "",
//         fotoProduk: fotoUrl,
//       };

//       onSave(savedDataForDashboard as any);
//       onClose();
//     } catch (err: any) {
//       alert("Gagal menyimpan data: " + err.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
//       <div className="bg-card rounded-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto border border-border">
//         <h2 className="text-xl font-bold mb-4">
//           {umkm ? "Edit Data UMKM" : "Tambah UMKM Baru"}
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Input File Foto Produk */}
//           <div className="flex flex-col gap-1">
//             <label className="text-sm font-medium">Upload Foto Produk</label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={(e) => {
//                 if (e.target.files?.[0]) {
//                   setSelectedFile(e.target.files[0]);
//                 }
//               }}
//               className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-primary file:text-primary-foreground hover:file:opacity-90 cursor-pointer text-sm"
//             />
//           </div>

//           {/* Contoh input field (sesuaikan dengan seluruh field database) */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-xs font-medium mb-1">
//                 Nama UMKM
//               </label>
//               <input
//                 type="text"
//                 name="nama_umkm"
//                 defaultValue={umkm?.namaUmkm || ""}
//                 required
//                 className="w-full p-2 border border-border rounded-xl text-sm bg-background"
//               />
//             </div>
//             <div>
//               <label className="block text-xs font-medium mb-1">
//                 Nama Pemilik
//               </label>
//               <input
//                 type="text"
//                 name="nama_pemilik"
//                 defaultValue={umkm?.namaPemilik || ""}
//                 className="w-full p-2 border border-border rounded-xl text-sm bg-background"
//               />
//             </div>
//           </div>

//           {/* Tombol Aksi */}
//           <div className="flex justify-end gap-2 pt-4 border-t border-border">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 border border-border rounded-xl text-sm hover:bg-muted"
//             >
//               Batal
//             </button>
//             <button
//               type="submit"
//               disabled={loading}
//               className="px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:opacity-90"
//             >
//               {loading ? "Menyimpan..." : "Simpan"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// codebaru
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

//   // 1. Fungsi Upload Foto ke Supabase Storage
//   // async function uploadFoto(file: File) {
//   //   const fileExt = file.name.split(".").pop();
//   //   const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
//   //   const filePath = `produk/${fileName}`;

//   //   const { error: uploadError } = await supabase.storage
//   //     .from("umkm-photos")
//   //     .upload(filePath, file);

//   //   if (uploadError) {
//   //     console.error("Gagal upload foto:", uploadError);
//   //     return null;
//   //   }

//   //   const { data } = supabase.storage
//   //     .from("umkm-photos")
//   //     .getPublicUrl(filePath);

//   //   return data.publicUrl;
//   // }
//   async function uploadFoto(file: File) {
//     try {
//       // Pengaturan kompresi foto
//       const options = {
//         maxSizeMB: 0.5, // Maksimal ukuran foto 500 KB (sangat hemat storage)
//         maxWidthOrHeight: 1200, // Dimensi maks 1200px (sangat tajam untuk layar web)
//         useWebWorker: true,
//       };

//       // Kompres file sebelum di-upload
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

//       if (selectedFile) {
//         const uploadedUrl = await uploadFoto(selectedFile);
//         if (uploadedUrl) {
//           fotoUrl = uploadedUrl;
//         }
//       }

//       // Payload lengkap persis sesuai tabel SQL Supabase
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
//       const parseArray = (val: string) =>
//         val
//           ? val
//               .split(",")
//               .map((s) => s.trim())
//               .filter(Boolean)
//           : [];
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
//         tahunBerdiri: (formData.get("tahun_berdiri") as string) || "",
//         profileSingkat: (formData.get("profile_singkat") as string) || "",
//         targetKonsumen: (formData.get("target_konsumen") as string) || "",
//         linkGoogleMaps: (formData.get("link_google_maps") as string) || "",
//         namaProduk: (formData.get("nama_produk") as string) || "",
//         deskripsiProduk: (formData.get("deskripsi_produk") as string) || "",
//         harga: (formData.get("harga") as string) || "",
//         beratUkuran: (formData.get("berat_ukuran") as string) || "",
//         varian: (formData.get("varian") as string) || "",
//         mediaPromosi: (formData.get("media_promosi") as string) || "",
//         usernameLink: (formData.get("username_link") as string) || "",
//         rekeningUsaha: (formData.get("rekening_usaha") as string) || "",
//         pencatatanKeuangan:
//           (formData.get("pencatatan_keuangan") as string) || "",
//         legalitasUsaha: (formData.get("legalitas_usaha") as string) || "",
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

//         {/* Tab Navigasi Form */}
//         <div className="flex border-b border-border my-4 gap-2 text-xs sm:text-sm overflow-x-auto">
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
//           {activeTab === "utama" && (
//             <div className="space-y-4">
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
//           )}

//           {/* TAB 2: RINCIAN PRODUK */}
//           {activeTab === "rincian" && (
//             <div className="space-y-3">
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
//           )}

//           {/* TAB 3: LAYANAN & PROMOSI */}
//           {activeTab === "layanan" && (
//             <div className="space-y-3">
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
//           )}

//           {/* TAB 4: LEGALITAS & HIGIENE */}
//           {activeTab === "legalitas" && (
//             <div className="space-y-3">
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
//           )}

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
// baru banget
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

//       // Kompres file sebelum di-upload
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
//         // Hapus foto lama dari storage jika dalam mode edit
//         if (umkm && (umkm.fotoProduk || umkm.foto_produk)) {
//           const rawOldUrl = umkm.fotoProduk || umkm.foto_produk || "";

//           // 🟢 Pastikan selalu dibaca sebagai Array
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

//         // Upload foto baru
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

//         // 🟢 Konversi string koma ke Array Rapi
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

//         {/* Tab Navigasi Form */}
//         <div className="flex border-b border-border my-4 gap-2 text-xs sm:text-sm overflow-x-auto">
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
//           {activeTab === "utama" && (
//             <div className="space-y-4">
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
//           )}

//           {/* TAB 2: RINCIAN PRODUK */}
//           {activeTab === "rincian" && (
//             <div className="space-y-3">
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
//           )}

//           {/* TAB 3: LAYANAN & PROMOSI */}
//           {activeTab === "layanan" && (
//             <div className="space-y-3">
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
//           )}

//           {/* TAB 4: LEGALITAS & HIGIENE */}
//           {activeTab === "legalitas" && (
//             <div className="space-y-3">
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
//           )}

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

"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import type { UMKM } from "@/lib/data/umkm";
import imageCompression from "browser-image-compression";
import { toast } from "sonner";

type Props = {
  umkm: UMKM | null; // null = Tambah Baru, UMKM = Edit
  onSave: (saved: UMKM) => void;
  onClose: () => void;
};

export function UmkmFormModal({ umkm, onSave, onClose }: Props) {
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState<
    "utama" | "rincian" | "layanan" | "legalitas"
  >("utama");

  // Helper untuk memecah teks berpemisah koma menjadi Array
  const parseArray = (val: string) =>
    val
      ? val
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : [];

  // 1. Fungsi Upload + Kompresi Foto ke Supabase Storage
  async function uploadFoto(file: File) {
    try {
      const options = {
        maxSizeMB: 0.5, // Maksimal ukuran foto 500 KB
        maxWidthOrHeight: 1200, // Dimensi maks 1200px
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

  // 2. Submit Form Seluruh Field
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      let fotoUrl = umkm?.fotoProduk || umkm?.foto_produk || "";

      // Jika ada file baru yang dipilih
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

      // Payload lengkap persis sesuai tabel SQL Supabase (snake_case)
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

      if (umkm) {
        // Mode Edit
        const { error } = await supabase
          .from("umkm")
          .update(payload)
          .eq("id", umkm.id);

        if (error) throw error;
        toast.success("Data UMKM berhasil diperbarui!");
      } else {
        // Mode Tambah
        const { error } = await supabase.from("umkm").insert([payload]);

        if (error) throw error;
        toast.success("Data UMKM berhasil ditambahkan!");
      }

      // Format camelCase & snake_case lengkap agar aman dibaca oleh seluruh komponen UI
      const savedDataForDashboard = {
        id: umkm?.id || crypto.randomUUID(),
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
        namaProduk: (formData.get("nama_produk") as string) || "",
        produkLainnya: (formData.get("produk_utama_lainnya") as string) || "",
        deskripsiProduk: (formData.get("deskripsi_produk") as string) || "",
        harga: (formData.get("harga") as string) || "",
        beratUkuran: (formData.get("berat_ukuran") as string) || "",

        // Konversi string koma ke Array Rapi
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
      <div className="bg-card rounded-2xl max-w-3xl w-full p-6 max-h-[92vh] overflow-y-auto border border-border shadow-2xl flex flex-col">
        {/* Header Modal */}
        <div className="flex justify-between items-center pb-4 border-b border-border">
          <h2 className="text-xl font-bold text-foreground">
            {umkm ? "Edit Data UMKM" : "Tambah UMKM Baru"}
          </h2>
          <button
            onClick={onClose}
            type="button"
            className="text-muted-foreground hover:text-foreground"
          >
            ✕
          </button>
        </div>

        {/* 🟢 TOMBOL TAB NAVIGASI (Informasi Utama, Rincian Produk, Layanan, Legalitas) */}
        <div className="flex shrink-0 border-b border-border my-4 gap-2 text-xs sm:text-sm overflow-x-auto">
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

        <form onSubmit={handleSubmit} className="space-y-4 flex-1">
          {/* TAB 1: INFORMASI UTAMA */}
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
                  defaultValue={umkm?.tahunBerdiri || umkm?.tahun_berdiri || ""}
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
                defaultValue={umkm?.alamatLengkap || umkm?.alamat_lengkap || ""}
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

          {/* TAB 2: RINCIAN PRODUK */}
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

          {/* TAB 3: LAYANAN & PROMOSI */}
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
                defaultValue={umkm?.usernameSosmed || umkm?.username_link || ""}
                placeholder="@keripiktempebu_sari"
                className="w-full p-2 border border-border rounded-xl text-xs bg-background"
              />
            </div>
          </div>

          {/* TAB 4: LEGALITAS & HIGIENE */}
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

            <div>
              <label className="block text-xs font-medium mb-1">
                Pencatatan Keuangan
              </label>
              <input
                type="text"
                name="pencatatan_keuangan"
                defaultValue={
                  umkm?.pencatatanKeuangan || umkm?.pencatatan_keuangan || ""
                }
                placeholder="Buku kas manual & aplikasi BukuWarung"
                className="w-full p-2 border border-border rounded-xl text-xs bg-background"
              />
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

          {/* Tombol Aksi Bawah */}
          <div className="flex justify-between items-center pt-4 border-t border-border mt-6">
            <span className="text-xs text-muted-foreground">
              * Silakan klik tab di atas untuk melengkapi kategori data lainnya.
            </span>
            <div className="flex gap-2">
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
