// "use client"

// import { useState } from "react"
// import { Search, SlidersHorizontal } from "lucide-react"
// import { umkmData, jenisUsahaOptions, type UMKM } from "@/lib/data/umkm"
// import UmkmCard from "@/components/umkm-card"
// import UmkmModal from "@/components/umkm-modal"

// export default function KatalogSection() {
//   const [search, setSearch] = useState("")
//   const [jenisFilter, setJenisFilter] = useState("Semua")
//   const [selectedUmkm, setSelectedUmkm] = useState<UMKM | null>(null)

//   const filtered = umkmData.filter((u) => {
//     const matchSearch =
//       search.trim() === "" ||
//       u.namaUmkm.toLowerCase().includes(search.toLowerCase()) ||
//       u.produkUtama.toLowerCase().includes(search.toLowerCase())
//     const matchJenis = jenisFilter === "Semua" || u.jenisUsaha === jenisFilter
//     return matchSearch && matchJenis
//   })

//   return (
//     <section id="katalog" className="py-16 bg-muted/40">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Section Header */}
//         <div className="text-center mb-10">
//           <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-3">
//             <SlidersHorizontal className="w-3 h-3" />
//             Direktori Usaha
//           </span>
//           <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-balance">Katalog UMKM Desa Kendalrejo</h2>
//           <p className="text-muted-foreground mt-2 text-sm sm:text-base">
//             Temukan dan dukung usaha warga desa kami
//           </p>
//         </div>

//         {/* Search & Filter */}
//         <div className="flex flex-col sm:flex-row gap-3 mb-8">
//           <div className="relative flex-1">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
//             <input
//               type="text"
//               placeholder="Cari nama UMKM atau produk..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="w-full pl-9 pr-4 py-2.5 bg-card border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
//             />
//           </div>
//           <div className="relative sm:w-48">
//             <select
//               value={jenisFilter}
//               onChange={(e) => setJenisFilter(e.target.value)}
//               className="w-full appearance-none pl-4 pr-8 py-2.5 bg-card border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors cursor-pointer"
//             >
//               {jenisUsahaOptions.map((opt) => (
//                 <option key={opt} value={opt}>{opt === "Semua" ? "Semua Jenis Usaha" : opt}</option>
//               ))}
//             </select>
//             <SlidersHorizontal className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
//           </div>
//         </div>

//         {/* Count */}
//         <p className="text-sm text-muted-foreground mb-5">
//           Menampilkan <span className="font-semibold text-foreground">{filtered.length}</span> dari {umkmData.length} UMKM
//         </p>

//         {/* Grid */}
//         {filtered.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
//             {filtered.map((umkm) => (
//               <UmkmCard
//                 key={umkm.id}
//                 umkm={umkm}
//                 onClick={() => setSelectedUmkm(umkm)}
//               />
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-16 text-muted-foreground">
//             <Search className="w-10 h-10 mx-auto mb-3 opacity-30" />
//             <p className="font-medium">Tidak ada UMKM yang ditemukan</p>
//             <p className="text-sm mt-1">Coba ubah kata kunci atau filter pencarian</p>
//           </div>
//         )}
//       </div>

//       {/* Modal */}
//       {selectedUmkm && (
//         <UmkmModal umkm={selectedUmkm} onClose={() => setSelectedUmkm(null)} />
//       )}
//     </section>
//   )
// }

// "use client";

// import { useState, useEffect } from "react";
// import { supabase } from "@/lib/supabase";
// import type { UMKM } from "@/lib/data/umkm";
// import UmkmCard from "./umkm-card";
// import { UmkmModal } from "./umkm-modal";
// import { Search, Store, RefreshCw } from "lucide-react";

// export function KatalogSection() {
//   const [umkmList, setUmkmList] = useState<UMKM[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");
//   const [selectedCategory, setSelectedJenis] = useState("Semua");
//   const [selectedUmkm, setSelectedUmkm] = useState<UMKM | null>(null);

//   // Helper konversi string koma / array dari Supabase
//   const toArray = (val: any) => {
//     if (Array.isArray(val)) return val;
//     if (typeof val === "string" && val)
//       return val.split(",").map((s) => s.trim());
//     return [];
//   };

//   // Fetch data real dari Supabase
//   useEffect(() => {
//     async function fetchPublicData() {
//       try {
//         const { data, error } = await supabase
//           .from("umkm")
//           .select("*")
//           .order("created_at", { ascending: false });

//         if (error) throw error;

//         if (data) {
//           const formatted: UMKM[] = data.map((item: any) => ({
//             id: item.id,
//             namaUmkm: item.nama_umkm || "",
//             namaPemilik: item.nama_pemilik || "",
//             jenisUsaha: item.jenis_usaha || "Kuliner",
//             nomorHpWa: item.nomor_wa || "",
//             hariOperasional: item.hari_operasional || "",
//             jamOperasional: item.jam_operasional || "",
//             fotoProduk: item.foto_produk || "",
//             alamatLengkap: item.alamat_lengkap || "",
//             tahunBerdiri: Number(item.tahun_berdiri) || 0,
//             profilSingkat: item.profile_singkat || "",
//             targetKonsumen: item.target_konsumen || "",
//             linkGoogleMaps: item.link_google_maps || "",

//             // 🟢 Menyediakan produkUtama & namaProduk agar sesuai interface UMKM
//             produkUtama: item.nama_produk || "",
//             namaProduk: item.nama_produk || "",

//             produkLainnya: item.produk_utama_lainnya || "",
//             deskripsiProduk: item.deskripsi_produk || "",
//             harga: item.harga || "",
//             beratUkuran: item.berat_ukuran || "",
//             varian: toArray(item.varian),
//             mediaPromosi: toArray(item.media_promosi),
//             metodePembayaran: toArray(item.pembayaran),
//             layananPengiriman: toArray(item.pengiriman),
//             legalitasUsaha: toArray(item.legalitas_usaha),
//             usernameSosmed: item.username_link || "",
//             rekeningUsaha: item.rekening_usaha || "",
//             pencatatanKeuangan: item.pencatatan_keuangan || "",
//             metodePencatatan: item.metode_pencatatan || "",
//             informasiHigieneSanitasi: item.informasi_higiene_sanitasi || "",
//           }));

//           setUmkmList(formatted);
//         }
//       } catch (err) {
//         console.error("Gagal mengambil data katalog:", err);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchPublicData();
//   }, []);

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
//       item.namaProduk.toLowerCase().includes(search.toLowerCase()) ||
//       item.namaPemilik.toLowerCase().includes(search.toLowerCase());

//     const matchesCategory =
//       selectedCategory === "Semua" || item.jenisUsaha === selectedCategory;

//     return matchesSearch && matchesCategory;
//   });

//   return (
//     <section id="katalog" className="py-16 bg-muted/30">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header Katalog */}
//         <div className="text-center mb-10">
//           <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-3">
//             <Store className="w-3.5 h-3.5" />
//             Katalog Digital
//           </span>
//           <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
//             Direktori UMKM Kendalrejo
//           </h2>
//           <p className="text-muted-foreground mt-2 text-sm sm:text-base">
//             Eksplorasi berbagai produk dan jasa unggulan buatan warga Desa
//             Kendalrejo
//           </p>
//         </div>

//         {/* Filter Kategori & Pencarian */}
//         <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-between items-center">
//           <div className="relative w-full sm:w-80">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
//             <input
//               type="text"
//               placeholder="Cari UMKM, pemilik, atau produk..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="w-full pl-9 pr-4 py-2 border border-border rounded-xl text-sm bg-background"
//             />
//           </div>

//           <div className="flex gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
//             {categories.map((cat) => (
//               <button
//                 key={cat}
//                 onClick={() => setSelectedJenis(cat)}
//                 className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
//                   selectedCategory === cat
//                     ? "bg-primary text-primary-foreground shadow-sm"
//                     : "bg-background border border-border text-muted-foreground hover:bg-muted"
//                 }`}
//               >
//                 {cat}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Grid List UMKM */}
//         {loading ? (
//           <div className="text-center py-20 bg-card rounded-2xl border border-border">
//             <RefreshCw className="w-6 h-6 animate-spin mx-auto text-primary mb-2" />
//             <p className="text-xs text-muted-foreground">
//               Memuat data UMKM dari Supabase...
//             </p>
//           </div>
//         ) : filteredUmkm.length === 0 ? (
//           <div className="text-center py-12 bg-card rounded-2xl border border-border p-8">
//             <p className="text-muted-foreground text-sm">
//               Tidak ada UMKM yang ditemukan.
//             </p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredUmkm.map((umkm) => (
//               <UmkmCard
//                 key={umkm.id}
//                 umkm={umkm}
//                 onClick={() => setSelectedUmkm(umkm)}
//               />
//             ))}
//           </div>
//         )}
//       </div>

//       {/* 🟢 Modal Detail UMKM (Tampil ketika kartu UMKM diklik) */}
//       {selectedUmkm && (
//         <UmkmModal umkm={selectedUmkm} onClose={() => setSelectedUmkm(null)} />
//       )}
//     </section>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import type { UMKM } from "@/lib/data/umkm";
import UmkmCard from "./umkm-card";
import { UmkmModal } from "./umkm-modal";
import { Search, Store, RefreshCw } from "lucide-react";

export function KatalogSection() {
  const [umkmList, setUmkmList] = useState<UMKM[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedJenis] = useState("Semua");
  const [selectedUmkm, setSelectedUmkm] = useState<UMKM | null>(null);

  const toArray = (val: any) => {
    if (Array.isArray(val)) return val;
    if (typeof val === "string" && val)
      return val.split(",").map((s) => s.trim());
    return [];
  };

  useEffect(() => {
    async function fetchPublicData() {
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
      } catch (err) {
        console.error("Gagal mengambil data katalog:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchPublicData();
  }, []);

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
      item.namaProduk.toLowerCase().includes(search.toLowerCase()) ||
      item.namaPemilik.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "Semua" || item.jenisUsaha === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <section id="katalog" className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-3">
            <Store className="w-3.5 h-3.5" />
            Katalog Digital
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Direktori UMKM Kendalrejo
          </h2>
          <p className="text-muted-foreground mt-2 text-sm sm:text-base">
            Eksplorasi berbagai produk dan jasa unggulan buatan warga Desa
            Kendalrejo
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-between items-center">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Cari UMKM, pemilik, atau produk..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-border rounded-xl text-sm bg-background"
            />
          </div>

          <div className="flex gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedJenis(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-background border border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 bg-card rounded-2xl border border-border">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto text-primary mb-2" />
            <p className="text-xs text-muted-foreground">
              Memuat data UMKM dari Supabase...
            </p>
          </div>
        ) : filteredUmkm.length === 0 ? (
          <div className="text-center py-12 bg-card rounded-2xl border border-border p-8">
            <p className="text-muted-foreground text-sm">
              Tidak ada UMKM yang ditemukan.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUmkm.map((umkm) => (
              <UmkmCard
                key={umkm.id}
                umkm={umkm}
                onClick={() => setSelectedUmkm(umkm)}
              />
            ))}
          </div>
        )}
      </div>

      {selectedUmkm && (
        <UmkmModal umkm={selectedUmkm} onClose={() => setSelectedUmkm(null)} />
      )}
    </section>
  );
}
