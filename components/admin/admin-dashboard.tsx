// "use client";

// import { useState, useEffect } from "react";
// import { supabase } from "@/lib/supabase";
// import type { UMKM } from "@/lib/data/umkm";
// import { UmkmFormModal } from "./umkm-form-modal";
// import { toast } from "sonner";
// import {
//   Plus,
//   Search,
//   Edit,
//   Trash2,
//   ExternalLink,
//   Store,
//   RefreshCw,
//   LogOut,
//   MapPin,
//   Phone,
// } from "lucide-react";

// export function AdminDashboard({
//   onLogout,
// }: {
//   onClose?: () => void;
//   onLogout: () => void;
// }) {
//   const [umkmList, setUmkmList] = useState<UMKM[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");
//   const [filterJenis, setFilterJenis] = useState("Semua");
//   const [editingUmkm, setEditingUmkm] = useState<UMKM | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // Helper konversi string koma / array dari Supabase
//   const toArray = (val: any) => {
//     if (Array.isArray(val)) return val;
//     if (typeof val === "string" && val)
//       return val.split(",").map((s) => s.trim());
//     return [];
//   };

//   // 🟢 1. FETCH DATA UTUH DARI SUPABASE DATABASE
//   async function fetchUmkm() {
//     setLoading(true);
//     try {
//       const { data, error } = await supabase
//         .from("umkm")
//         .select("*")
//         .order("created_at", { ascending: false });

//       if (error) throw error;

//       if (data) {
//         // Normalisasi format snake_case Supabase ke format objek UI
//         const formatted: UMKM[] = data.map((item: any) => ({
//           id: item.id,
//           namaUmkm: item.nama_umkm || "",
//           namaPemilik: item.nama_pemilik || "",
//           jenisUsaha: item.jenis_usaha || "Kuliner",
//           nomorHpWa: item.nomor_wa || "",
//           hariOperasional: item.hari_operasional || "",
//           jamOperasional: item.jam_operasional || "",
//           fotoProduk: item.foto_produk || "",
//           alamatLengkap: item.alamat_lengkap || "",
//           tahunBerdiri: Number(item.tahun_berdiri) || 0,
//           profilSingkat: item.profile_singkat || "",
//           targetKonsumen: item.target_konsumen || "",
//           linkGoogleMaps: item.link_google_maps || "",

//           // 🟢 KUNCI PERBAIKAN: Masukkan produkUtama di sini
//           produkUtama: item.nama_produk || "",
//           namaProduk: item.nama_produk || "",

//           produkLainnya: item.produk_utama_lainnya || "",
//           deskripsiProduk: item.deskripsi_produk || "",
//           harga: item.harga || "",
//           beratUkuran: item.berat_ukuran || "",
//           varian: toArray(item.varian),
//           mediaPromosi: toArray(item.media_promosi),
//           metodePembayaran: toArray(item.pembayaran),
//           layananPengiriman: toArray(item.pengiriman),
//           legalitasUsaha: toArray(item.legalitas_usaha),
//           usernameSosmed: item.username_link || "",
//           rekeningUsaha: item.rekening_usaha || "",
//           pencatatanKeuangan: item.pencatatan_keuangan || "",
//           metodePencatatan: item.metode_pencatatan || "",
//           informasiHigieneSanitasi: item.informasi_higiene_sanitasi || "",
//         }));

//         setUmkmList(formatted);
//       }
//     } catch (err: any) {
//       toast.error("Gagal mengambil data dari Supabase: " + err.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     fetchUmkm();
//   }, []);

//   // 🟢 2. HAPUS UMKM DARI SUPABASE
//   async function handleDelete(id: string, fotoUrl?: string) {
//     if (!confirm("Apakah Anda yakin ingin menghapus data UMKM ini?")) return;

//     try {
//       // Hapus foto dari Supabase Storage jika ada
//       if (fotoUrl && fotoUrl.includes("/umkm-photos/")) {
//         const oldPath = fotoUrl.split("/umkm-photos/")[1];
//         if (oldPath) {
//           await supabase.storage.from("umkm-photos").remove([oldPath]);
//         }
//       }

//       // Hapus baris dari tabel
//       const { error } = await supabase.from("umkm").delete().eq("id", id);
//       if (error) throw error;

//       setUmkmList((prev) => prev.filter((item) => item.id !== id));
//       toast.success("UMKM berhasil dihapus!");
//     } catch (err: any) {
//       toast.error("Gagal menghapus: " + err.message);
//     }
//   }

//   // 🟢 3. HANDLER SAVE DARI MODAL
//   function handleSaveSuccess(savedUmkm: UMKM) {
//     setUmkmList((prev) => {
//       const exists = prev.some((item) => item.id === savedUmkm.id);
//       if (exists) {
//         return prev.map((item) =>
//           item.id === savedUmkm.id ? savedUmkm : item,
//         );
//       } else {
//         return [savedUmkm, ...prev];
//       }
//     });
//   }

//   // Filter & Search Logic
//   const categories = [
//     "Semua",
//     "Kuliner",
//     "Kerajinan",
//     "Perdagangan",
//     "Pertanian",
//     "Jasa",
//   ];

//   const filteredUmkm = umkmList.filter((item) => {
//     const matchesSearch =
//       item.namaUmkm.toLowerCase().includes(search.toLowerCase()) ||
//       item.namaPemilik.toLowerCase().includes(search.toLowerCase()) ||
//       item.namaProduk.toLowerCase().includes(search.toLowerCase());

//     const matchesFilter =
//       filterJenis === "Semua" || item.jenisUsaha === filterJenis;

//     return matchesSearch && matchesFilter;
//   });

//   return (
//     <div className="min-h-screen bg-background text-foreground pb-12">
//       {/* Header Dashboard */}
//       <header className="sticky top-0 z-30 border-b border-border backdrop-blur-md bg-card/80">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
//           <div className="flex items-center gap-2">
//             <Store className="w-5 h-5 text-primary" />
//             <h1 className="font-bold text-lg hidden sm:inline">
//               Dashboard Admin UMKM
//             </h1>
//             <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-semibold">
//               Desa Kendalrejo
//             </span>
//           </div>

//           <div className="flex items-center gap-2">
//             <button
//               onClick={fetchUmkm}
//               disabled={loading}
//               title="Refresh Data"
//               className="p-2 border border-border rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition"
//             >
//               <RefreshCw
//                 className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
//               />
//             </button>

//             <button
//               onClick={() => {
//                 setEditingUmkm(null);
//                 setIsModalOpen(true);
//               }}
//               className="inline-flex items-center gap-1.5 px-3 py-2 bg-primary text-primary-foreground rounded-xl text-xs font-semibold hover:opacity-90 transition shadow-sm"
//             >
//               <Plus className="w-4 h-4" />
//               <span>Tambah UMKM</span>
//             </button>

//             <button
//               onClick={onLogout}
//               className="inline-flex items-center gap-1.5 px-3 py-2 border border-border rounded-xl text-xs font-medium text-destructive hover:bg-destructive/10 transition"
//             >
//               <LogOut className="w-4 h-4" />
//               <span className="hidden sm:inline">Keluar</span>
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Konten Utama */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
//         {/* Top Control Bar */}
//         <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between items-stretch sm:items-center">
//           {/* Input Pencarian */}
//           <div className="relative flex-1 max-w-md">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
//             <input
//               type="text"
//               placeholder="Cari nama UMKM, pemilik, atau produk..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="w-full pl-9 pr-4 py-2 border border-border rounded-xl text-xs sm:text-sm bg-card focus:outline-none focus:ring-2 focus:ring-primary/20"
//             />
//           </div>

//           {/* Filter Kategori */}
//           <div className="flex gap-1.5 overflow-x-auto pb-1 sm:pb-0">
//             {categories.map((cat) => (
//               <button
//                 key={cat}
//                 onClick={() => setFilterJenis(cat)}
//                 className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
//                   filterJenis === cat
//                     ? "bg-primary text-primary-foreground"
//                     : "bg-card border border-border text-muted-foreground hover:bg-muted"
//                 }`}
//               >
//                 {cat}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Info Total Data */}
//         <div className="flex justify-between items-center mb-4 text-xs text-muted-foreground">
//           <span>
//             Menampilkan <strong>{filteredUmkm.length}</strong> dari total{" "}
//             <strong>{umkmList.length}</strong> UMKM
//           </span>
//         </div>

//         {/* Tabel / Grid UMKM */}
//         {loading ? (
//           <div className="text-center py-20 bg-card rounded-2xl border border-border">
//             <RefreshCw className="w-6 h-6 animate-spin mx-auto text-primary mb-2" />
//             <p className="text-xs text-muted-foreground">
//               Memuat data UMKM dari Supabase...
//             </p>
//           </div>
//         ) : filteredUmkm.length === 0 ? (
//           <div className="text-center py-16 bg-card rounded-2xl border border-border p-6">
//             <Store className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
//             <p className="text-sm font-semibold text-foreground">
//               Tidak ada data UMKM yang cocok.
//             </p>
//             <p className="text-xs text-muted-foreground mt-1">
//               Coba ganti kata kunci pencarian atau reset filter kategori.
//             </p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {filteredUmkm.map((item) => (
//               <div
//                 key={item.id}
//                 className="bg-card border border-border rounded-2xl p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition"
//               >
//                 <div>
//                   {/* Image Header */}
//                   <div className="aspect-video w-full rounded-xl overflow-hidden bg-muted mb-3 relative">
//                     {item.fotoProduk ? (
//                       <img
//                         src={
//                           Array.isArray(item.fotoProduk)
//                             ? item.fotoProduk[0]
//                             : item.fotoProduk
//                         }
//                         alt={item.namaUmkm}
//                         className="w-full h-full object-cover"
//                       />
//                     ) : (
//                       <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
//                         Belum ada foto
//                       </div>
//                     )}
//                     <span className="absolute top-2 right-2 px-2 py-1 bg-black/60 backdrop-blur-md text-white rounded-lg text-[10px] font-semibold">
//                       {item.jenisUsaha}
//                     </span>
//                   </div>

//                   {/* Info Ringkas */}
//                   <h3 className="font-bold text-base text-foreground line-clamp-1">
//                     {item.namaUmkm}
//                   </h3>
//                   <p className="text-xs text-muted-foreground mb-2">
//                     Pemilik: {item.namaPemilik || "-"}
//                   </p>

//                   <div className="space-y-1 text-xs text-muted-foreground mb-3">
//                     <p className="flex items-center gap-1.5 line-clamp-1">
//                       <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
//                       <span>{item.alamatLengkap || "-"}</span>
//                     </p>
//                     <p className="flex items-center gap-1.5">
//                       <Phone className="w-3.5 h-3.5 text-primary shrink-0" />
//                       <span>{item.nomorHpWa || "-"}</span>
//                     </p>
//                   </div>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="pt-3 border-t border-border flex items-center justify-between gap-2 mt-2">
//                   <span className="text-xs font-semibold text-primary">
//                     {item.harga || "Harga N/A"}
//                   </span>

//                   <div className="flex items-center gap-1">
//                     {item.linkGoogleMaps && (
//                       <a
//                         href={item.linkGoogleMaps}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="p-1.5 text-muted-foreground hover:text-primary transition"
//                         title="Buka Maps"
//                       >
//                         <ExternalLink className="w-4 h-4" />
//                       </a>
//                     )}
//                     <button
//                       onClick={() => {
//                         setEditingUmkm(item);
//                         setIsModalOpen(true);
//                       }}
//                       className="p-1.5 text-muted-foreground hover:text-foreground transition"
//                       title="Edit UMKM"
//                     >
//                       <Edit className="w-4 h-4" />
//                     </button>
//                     <button
//                       onClick={() =>
//                         handleDelete(
//                           item.id,
//                           Array.isArray(item.fotoProduk)
//                             ? item.fotoProduk[0]
//                             : item.fotoProduk,
//                         )
//                       }
//                       className="p-1.5 text-muted-foreground hover:text-destructive transition"
//                       title="Hapus UMKM"
//                     >
//                       <Trash2 className="w-4 h-4" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </main>

//       {/* Modal Form Tambah/Edit */}
//       {isModalOpen && (
//         <UmkmFormModal
//           umkm={editingUmkm}
//           onClose={() => setIsModalOpen(false)}
//           onSave={handleSaveSuccess}
//         />
//       )}
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

  const toArray = (val: any) => {
    if (Array.isArray(val)) return val;
    if (typeof val === "string" && val)
      return val.split(",").map((s) => s.trim());
    return [];
  };

  async function fetchUmkm() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("umkm")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      if (data) {
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

  async function handleDelete(id: string, fotoUrl?: string) {
    if (!confirm("Apakah Anda yakin ingin menghapus data UMKM ini?")) return;

    try {
      if (fotoUrl && fotoUrl.includes("/umkm-photos/")) {
        const oldPath = fotoUrl.split("/umkm-photos/")[1];
        if (oldPath) {
          await supabase.storage.from("umkm-photos").remove([oldPath]);
        }
      }

      const { error } = await supabase.from("umkm").delete().eq("id", id);
      if (error) throw error;

      setUmkmList((prev) => prev.filter((item) => item.id !== id));
      toast.success("UMKM berhasil dihapus!");
    } catch (err: any) {
      toast.error("Gagal menghapus: " + err.message);
    }
  }

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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between items-stretch sm:items-center">
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

        <div className="flex justify-between items-center mb-4 text-xs text-muted-foreground">
          <span>
            Menampilkan <strong>{filteredUmkm.length}</strong> dari total{" "}
            <strong>{umkmList.length}</strong> UMKM
          </span>
        </div>

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
