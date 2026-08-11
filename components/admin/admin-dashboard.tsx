// // baru
// "use client";

// import { useState } from "react";
// import {
//   Leaf,
//   LogOut,
//   Plus,
//   Pencil,
//   Trash2,
//   Search,
//   Store,
//   LayoutDashboard,
//   AlertTriangle,
// } from "lucide-react";
// import type { UMKM } from "@/lib/data/umkm";
// import { jenisUsahaOptions } from "@/lib/data/umkm";
// import { UmkmFormModal } from "@/components/admin/umkm-form-modal";
// import { supabase } from "@/lib/supabase"; // 🟢 Impor Supabase
// import { toast } from "sonner"; // 🟢 Impor Toast

// type Props = {
//   data: UMKM[];
//   setData: (data: UMKM[]) => void;
//   onLogout: () => void;
// };

// export default function AdminDashboard({ data, setData, onLogout }: Props) {
//   const [search, setSearch] = useState("");
//   const [editingUmkm, setEditingUmkm] = useState<UMKM | null | undefined>(
//     undefined,
//   );
//   // undefined = form closed, null = add new, UMKM = edit
//   const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

//   const filtered = data.filter((u) => {
//     const nama = u.namaUmkm || u.nama_umkm || "";
//     const jenis = u.jenisUsaha || u.jenis_usaha || "";
//     const pemilik = u.namaPemilik || u.nama_pemilik || "";

//     return (
//       nama.toLowerCase().includes(search.toLowerCase()) ||
//       jenis.toLowerCase().includes(search.toLowerCase()) ||
//       pemilik.toLowerCase().includes(search.toLowerCase())
//     );
//   });

//   const handleSave = (saved: UMKM) => {
//     if (editingUmkm === null) {
//       // Add new
//       setData([...data, saved]);
//     } else {
//       // Edit existing
//       setData(data.map((u) => (u.id === saved.id ? saved : u)));
//     }
//     setEditingUmkm(undefined);
//   };

//   // 🟢 FUNGSI HAPUS LENGKAP DENGAN STORAGE & TOAST
//   const handleDelete = async (id: string) => {
//     const targetUmkm = data.find((u) => u.id === id);

//     try {
//       if (targetUmkm) {
//         // 1. Hapus foto dari Supabase Storage jika ada
//         const rawPhoto = targetUmkm.fotoProduk || targetUmkm.foto_produk || "";

//         // 🟢 Jika berupa Array, ambil foto pertama; jika string, pakai langsung
//         const photoUrls = Array.isArray(rawPhoto) ? rawPhoto : [rawPhoto];

//         for (const photoUrl of photoUrls) {
//           if (
//             photoUrl &&
//             typeof photoUrl === "string" &&
//             photoUrl.includes("/umkm-photos/")
//           ) {
//             const filePath = photoUrl.split("/umkm-photos/")[1];
//             if (filePath) {
//               await supabase.storage.from("umkm-photos").remove([filePath]);
//             }
//           }
//         }
//         // // 1. Hapus foto dari Supabase Storage jika ada
//         // const photoUrl = targetUmkm.fotoProduk || targetUmkm.foto_produk || "";
//         // if (photoUrl && photoUrl.includes("/umkm-photos/")) {
//         //   const filePath = photoUrl.split("/umkm-photos/")[1];
//         //   if (filePath) {
//         //     const { error: storageErr } = await supabase.storage
//         //       .from("umkm-photos")
//         //       .remove([filePath]);

//         //     if (storageErr) {
//         //       console.error("Gagal menghapus foto dari storage:", storageErr);
//         //     }
//         //   }
//         // }

//         // 2. Hapus data dari tabel Supabase
//         const { error: dbErr } = await supabase
//           .from("umkm")
//           .delete()
//           .eq("id", id);

//         if (dbErr) throw dbErr;
//       }

//       // 3. Update state di UI
//       setData(data.filter((u) => u.id !== id));
//       toast.success("Data UMKM beserta fotonya berhasil dihapus!");
//     } catch (err: any) {
//       console.error("Gagal menghapus:", err);
//       toast.error("Gagal menghapus data: " + err.message);
//     } finally {
//       setDeleteConfirmId(null);
//     }
//   };

//   const jenisCount: Record<string, number> = {};
//   data.forEach((u) => {
//     const jenis = u.jenisUsaha || u.jenis_usaha || "Lainnya";
//     jenisCount[jenis] = (jenisCount[jenis] ?? 0) + 1;
//   });

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Top nav */}
//       <header className="bg-primary shadow-sm sticky top-0 z-40">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
//           <div className="flex items-center gap-2.5">
//             <div className="flex items-center justify-center w-8 h-8 bg-primary-foreground/10 rounded-full border border-primary-foreground/20">
//               <Leaf className="w-4 h-4 text-primary-foreground" />
//             </div>
//             <div>
//               <p className="text-primary-foreground font-bold text-sm leading-tight">
//                 Panel Admin
//               </p>
//               <p className="text-primary-foreground/60 text-xs">
//                 UMKM Desa Kendalrejo
//               </p>
//             </div>
//           </div>
//           <button
//             onClick={onLogout}
//             className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 rounded-lg transition-colors"
//           >
//             <LogOut className="w-4 h-4" />
//             Keluar
//           </button>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Stats */}
//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//           <StatCard
//             icon={<Store className="w-5 h-5 text-primary" />}
//             label="Total UMKM"
//             value={String(data.length)}
//             color="bg-primary/10"
//           />
//           {jenisUsahaOptions
//             .filter((j) => j !== "Semua")
//             .slice(0, 3)
//             .map((jenis) => (
//               <StatCard
//                 key={jenis}
//                 icon={
//                   <LayoutDashboard className="w-5 h-5 text-accent-foreground" />
//                 }
//                 label={jenis}
//                 value={String(jenisCount[jenis] ?? 0)}
//                 color="bg-accent/20"
//               />
//             ))}
//         </div>

//         {/* Table header */}
//         <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
//           <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 border-b border-border">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
//               <input
//                 type="text"
//                 placeholder="Cari nama UMKM, pemilik, atau jenis..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="w-full pl-9 pr-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
//               />
//             </div>
//             <button
//               onClick={() => setEditingUmkm(null)}
//               className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-xl hover:bg-primary/90 transition-colors shrink-0"
//             >
//               <Plus className="w-4 h-4" />
//               Tambah UMKM
//             </button>
//           </div>

//           {/* Desktop table */}
//           <div className="overflow-x-auto hidden sm:block">
//             <table className="w-full text-sm">
//               <thead>
//                 <tr className="border-b border-border bg-muted/40 text-left">
//                   <th className="px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
//                     UMKM
//                   </th>
//                   <th className="px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
//                     Pemilik
//                   </th>
//                   <th className="px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
//                     Jenis
//                   </th>
//                   <th className="px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
//                     HP/WA
//                   </th>
//                   <th className="px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
//                     Operasional
//                   </th>
//                   <th className="px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide text-right">
//                     Aksi
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-border">
//                 {filtered.map((u) => (
//                   <tr
//                     key={u.id}
//                     className="hover:bg-muted/30 transition-colors"
//                   >
//                     <td className="px-4 py-3 font-medium text-foreground">
//                       {u.namaUmkm || u.nama_umkm}
//                     </td>
//                     <td className="px-4 py-3 text-muted-foreground">
//                       {u.namaPemilik || u.nama_pemilik}
//                     </td>
//                     <td className="px-4 py-3">
//                       <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded-full">
//                         {u.jenisUsaha || u.jenis_usaha}
//                       </span>
//                     </td>
//                     <td className="px-4 py-3 text-muted-foreground font-mono text-xs">
//                       {u.nomorHpWa || u.nomor_wa}
//                     </td>
//                     <td className="px-4 py-3 text-muted-foreground text-xs">
//                       {u.hariOperasional || u.hari_operasional} •{" "}
//                       {u.jamOperasional || u.jam_operasional}
//                     </td>
//                     <td className="px-4 py-3">
//                       <div className="flex items-center justify-end gap-1">
//                         <button
//                           onClick={() => setEditingUmkm(u)}
//                           className="p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
//                           aria-label="Edit"
//                         >
//                           <Pencil className="w-3.5 h-3.5" />
//                         </button>
//                         <button
//                           onClick={() => setDeleteConfirmId(u.id)}
//                           className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
//                           aria-label="Hapus"
//                         >
//                           <Trash2 className="w-3.5 h-3.5" />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//                 {filtered.length === 0 && (
//                   <tr>
//                     <td
//                       colSpan={6}
//                       className="text-center py-10 text-muted-foreground text-sm"
//                     >
//                       Tidak ada data yang ditemukan
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Mobile card list */}
//           <div className="sm:hidden divide-y divide-border">
//             {filtered.map((u) => (
//               <div
//                 key={u.id}
//                 className="p-4 flex items-start justify-between gap-3"
//               >
//                 <div>
//                   <p className="font-semibold text-foreground text-sm">
//                     {u.namaUmkm || u.nama_umkm}
//                   </p>
//                   <p className="text-xs text-muted-foreground">
//                     {u.namaPemilik || u.nama_pemilik} ·{" "}
//                     {u.nomorHpWa || u.nomor_wa}
//                   </p>
//                   <span className="mt-1 inline-block px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded-full">
//                     {u.jenisUsaha || u.jenis_usaha}
//                   </span>
//                 </div>
//                 <div className="flex gap-1 shrink-0">
//                   <button
//                     onClick={() => setEditingUmkm(u)}
//                     className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
//                   >
//                     <Pencil className="w-4 h-4" />
//                   </button>
//                   <button
//                     onClick={() => setDeleteConfirmId(u.id)}
//                     className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
//                   >
//                     <Trash2 className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>
//             ))}
//             {filtered.length === 0 && (
//               <div className="text-center py-10 text-muted-foreground text-sm">
//                 Tidak ada data yang ditemukan
//               </div>
//             )}
//           </div>
//         </div>
//       </main>

//       {/* Add/Edit Modal */}
//       {editingUmkm !== undefined && (
//         <UmkmFormModal
//           umkm={editingUmkm}
//           onSave={handleSave}
//           onClose={() => setEditingUmkm(undefined)}
//         />
//       )}

//       {/* Delete Confirm Dialog */}
//       {deleteConfirmId && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm p-4">
//           <div className="bg-card rounded-2xl shadow-2xl max-w-sm w-full p-6">
//             <div className="flex items-center gap-3 mb-3">
//               <div className="p-2 bg-destructive/10 rounded-full">
//                 <AlertTriangle className="w-5 h-5 text-destructive" />
//               </div>
//               <h3 className="font-bold text-foreground">Hapus UMKM</h3>
//             </div>
//             <p className="text-sm text-muted-foreground mb-5">
//               Apakah Anda yakin ingin menghapus UMKM{" "}
//               <span className="font-semibold text-foreground">
//                 {data.find((u) => u.id === deleteConfirmId)?.namaUmkm ||
//                   data.find((u) => u.id === deleteConfirmId)?.nama_umkm}
//               </span>
//               ? Tindakan ini tidak dapat dibatalkan.
//             </p>
//             <div className="flex gap-2">
//               <button
//                 onClick={() => setDeleteConfirmId(null)}
//                 className="flex-1 py-2 text-sm font-medium border border-border rounded-xl hover:bg-muted transition-colors"
//               >
//                 Batal
//               </button>
//               <button
//                 onClick={() => handleDelete(deleteConfirmId)}
//                 className="flex-1 py-2 text-sm font-semibold bg-destructive text-white rounded-xl hover:bg-destructive/90 transition-colors"
//               >
//                 Hapus
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// function StatCard({
//   icon,
//   label,
//   value,
//   color,
// }: {
//   icon: React.ReactNode;
//   label: string;
//   value: string;
//   color: string;
// }) {
//   return (
//     <div className="bg-card border border-border rounded-2xl p-4 flex items-center gap-3">
//       <div className={`p-2.5 rounded-xl ${color}`}>{icon}</div>
//       <div>
//         <p className="text-2xl font-bold text-foreground">{value}</p>
//         <p className="text-xs text-muted-foreground">{label}</p>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import type { UMKM } from "@/lib/data/umkm";
import { UmkmFormModal } from "./umkm-form-modal";
import { toast } from "sonner";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  ExternalLink,
  Store,
  RefreshCw,
  LogOut,
  MapPin,
  Phone,
} from "lucide-react";

export function AdminDashboard({
  onLogout,
}: {
  onClose?: () => void;
  onLogout: () => void;
}) {
  const [umkmList, setUmkmList] = useState<UMKM[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterJenis, setFilterJenis] = useState("Semua");
  const [editingUmkm, setEditingUmkm] = useState<UMKM | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Helper konversi string koma / array dari Supabase
  const toArray = (val: any) => {
    if (Array.isArray(val)) return val;
    if (typeof val === "string" && val)
      return val.split(",").map((s) => s.trim());
    return [];
  };

  // 🟢 1. FETCH DATA UTUH DARI SUPABASE DATABASE
  async function fetchUmkm() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("umkm")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      if (data) {
        // Normalisasi format snake_case Supabase ke format objek UI
        const formatted: UMKM[] = data.map((item: any) => ({
          id: item.id,
          namaUmkm: item.nama_umkm || "",
          namaPemilik: item.nama_pemilik || "",
          jenisUsaha: item.jenis_usaha || "Kuliner",
          nomorHpWa: item.nomor_wa || "",
          hariOperasional: item.hari_operasional || "",
          jamOperasional: item.jam_operasional || "",
          fotoProduk: item.foto_produk || "",
          alamatLengkap: item.alamat_lengkap || "",
          tahunBerdiri: Number(item.tahun_berdiri) || 0,
          profilSingkat: item.profile_singkat || "",
          targetKonsumen: item.target_konsumen || "",
          linkGoogleMaps: item.link_google_maps || "",

          // 🟢 KUNCI PERBAIKAN: Masukkan produkUtama di sini
          produkUtama: item.nama_produk || "",
          namaProduk: item.nama_produk || "",

          produkLainnya: item.produk_utama_lainnya || "",
          deskripsiProduk: item.deskripsi_produk || "",
          harga: item.harga || "",
          beratUkuran: item.berat_ukuran || "",
          varian: toArray(item.varian),
          mediaPromosi: toArray(item.media_promosi),
          metodePembayaran: toArray(item.pembayaran),
          layananPengiriman: toArray(item.pengiriman),
          legalitasUsaha: toArray(item.legalitas_usaha),
          usernameSosmed: item.username_link || "",
          rekeningUsaha: item.rekening_usaha || "",
          pencatatanKeuangan: item.pencatatan_keuangan || "",
          metodePencatatan: item.metode_pencatatan || "",
          informasiHigieneSanitasi: item.informasi_higiene_sanitasi || "",
        }));

        setUmkmList(formatted);
      }
    } catch (err: any) {
      toast.error("Gagal mengambil data dari Supabase: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUmkm();
  }, []);

  // 🟢 2. HAPUS UMKM DARI SUPABASE
  async function handleDelete(id: string, fotoUrl?: string) {
    if (!confirm("Apakah Anda yakin ingin menghapus data UMKM ini?")) return;

    try {
      // Hapus foto dari Supabase Storage jika ada
      if (fotoUrl && fotoUrl.includes("/umkm-photos/")) {
        const oldPath = fotoUrl.split("/umkm-photos/")[1];
        if (oldPath) {
          await supabase.storage.from("umkm-photos").remove([oldPath]);
        }
      }

      // Hapus baris dari tabel
      const { error } = await supabase.from("umkm").delete().eq("id", id);
      if (error) throw error;

      setUmkmList((prev) => prev.filter((item) => item.id !== id));
      toast.success("UMKM berhasil dihapus!");
    } catch (err: any) {
      toast.error("Gagal menghapus: " + err.message);
    }
  }

  // 🟢 3. HANDLER SAVE DARI MODAL
  function handleSaveSuccess(savedUmkm: UMKM) {
    setUmkmList((prev) => {
      const exists = prev.some((item) => item.id === savedUmkm.id);
      if (exists) {
        return prev.map((item) =>
          item.id === savedUmkm.id ? savedUmkm : item,
        );
      } else {
        return [savedUmkm, ...prev];
      }
    });
  }

  // Filter & Search Logic
  const categories = [
    "Semua",
    "Kuliner",
    "Kerajinan",
    "Perdagangan",
    "Pertanian",
    "Jasa",
  ];

  const filteredUmkm = umkmList.filter((item) => {
    const matchesSearch =
      item.namaUmkm.toLowerCase().includes(search.toLowerCase()) ||
      item.namaPemilik.toLowerCase().includes(search.toLowerCase()) ||
      item.namaProduk.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filterJenis === "Semua" || item.jenisUsaha === filterJenis;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-background text-foreground pb-12">
      {/* Header Dashboard */}
      <header className="sticky top-0 z-30 border-b border-border backdrop-blur-md bg-card/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Store className="w-5 h-5 text-primary" />
            <h1 className="font-bold text-lg hidden sm:inline">
              Dashboard Admin UMKM
            </h1>
            <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-semibold">
              Desa Kendalrejo
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchUmkm}
              disabled={loading}
              title="Refresh Data"
              className="p-2 border border-border rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition"
            >
              <RefreshCw
                className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
              />
            </button>

            <button
              onClick={() => {
                setEditingUmkm(null);
                setIsModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-primary text-primary-foreground rounded-xl text-xs font-semibold hover:opacity-90 transition shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah UMKM</span>
            </button>

            <button
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 px-3 py-2 border border-border rounded-xl text-xs font-medium text-destructive hover:bg-destructive/10 transition"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>
        </div>
      </header>

      {/* Konten Utama */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between items-stretch sm:items-center">
          {/* Input Pencarian */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Cari nama UMKM, pemilik, atau produk..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-border rounded-xl text-xs sm:text-sm bg-card focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Filter Kategori */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterJenis(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                  filterJenis === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Info Total Data */}
        <div className="flex justify-between items-center mb-4 text-xs text-muted-foreground">
          <span>
            Menampilkan <strong>{filteredUmkm.length}</strong> dari total{" "}
            <strong>{umkmList.length}</strong> UMKM
          </span>
        </div>

        {/* Tabel / Grid UMKM */}
        {loading ? (
          <div className="text-center py-20 bg-card rounded-2xl border border-border">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto text-primary mb-2" />
            <p className="text-xs text-muted-foreground">
              Memuat data UMKM dari Supabase...
            </p>
          </div>
        ) : filteredUmkm.length === 0 ? (
          <div className="text-center py-16 bg-card rounded-2xl border border-border p-6">
            <Store className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
            <p className="text-sm font-semibold text-foreground">
              Tidak ada data UMKM yang cocok.
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Coba ganti kata kunci pencarian atau reset filter kategori.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredUmkm.map((item) => (
              <div
                key={item.id}
                className="bg-card border border-border rounded-2xl p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition"
              >
                <div>
                  {/* Image Header */}
                  <div className="aspect-video w-full rounded-xl overflow-hidden bg-muted mb-3 relative">
                    {item.fotoProduk ? (
                      <img
                        src={
                          Array.isArray(item.fotoProduk)
                            ? item.fotoProduk[0]
                            : item.fotoProduk
                        }
                        alt={item.namaUmkm}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                        Belum ada foto
                      </div>
                    )}
                    <span className="absolute top-2 right-2 px-2 py-1 bg-black/60 backdrop-blur-md text-white rounded-lg text-[10px] font-semibold">
                      {item.jenisUsaha}
                    </span>
                  </div>

                  {/* Info Ringkas */}
                  <h3 className="font-bold text-base text-foreground line-clamp-1">
                    {item.namaUmkm}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-2">
                    Pemilik: {item.namaPemilik || "-"}
                  </p>

                  <div className="space-y-1 text-xs text-muted-foreground mb-3">
                    <p className="flex items-center gap-1.5 line-clamp-1">
                      <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span>{item.alamatLengkap || "-"}</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span>{item.nomorHpWa || "-"}</span>
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-3 border-t border-border flex items-center justify-between gap-2 mt-2">
                  <span className="text-xs font-semibold text-primary">
                    {item.harga || "Harga N/A"}
                  </span>

                  <div className="flex items-center gap-1">
                    {item.linkGoogleMaps && (
                      <a
                        href={item.linkGoogleMaps}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-muted-foreground hover:text-primary transition"
                        title="Buka Maps"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    <button
                      onClick={() => {
                        setEditingUmkm(item);
                        setIsModalOpen(true);
                      }}
                      className="p-1.5 text-muted-foreground hover:text-foreground transition"
                      title="Edit UMKM"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() =>
                        handleDelete(
                          item.id,
                          Array.isArray(item.fotoProduk)
                            ? item.fotoProduk[0]
                            : item.fotoProduk,
                        )
                      }
                      className="p-1.5 text-muted-foreground hover:text-destructive transition"
                      title="Hapus UMKM"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal Form Tambah/Edit */}
      {isModalOpen && (
        <UmkmFormModal
          umkm={editingUmkm}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveSuccess}
        />
      )}
    </div>
  );
}
