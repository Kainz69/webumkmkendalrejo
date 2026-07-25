"use client"

import { useState } from "react"
import { Search, SlidersHorizontal } from "lucide-react"
import { umkmData, jenisUsahaOptions, type UMKM } from "@/lib/data/umkm"
import UmkmCard from "@/components/umkm-card"
import UmkmModal from "@/components/umkm-modal"

export default function KatalogSection() {
  const [search, setSearch] = useState("")
  const [jenisFilter, setJenisFilter] = useState("Semua")
  const [selectedUmkm, setSelectedUmkm] = useState<UMKM | null>(null)

  const filtered = umkmData.filter((u) => {
    const matchSearch =
      search.trim() === "" ||
      u.namaUmkm.toLowerCase().includes(search.toLowerCase()) ||
      u.produkUtama.toLowerCase().includes(search.toLowerCase())
    const matchJenis = jenisFilter === "Semua" || u.jenisUsaha === jenisFilter
    return matchSearch && matchJenis
  })

  return (
    <section id="katalog" className="py-16 bg-muted/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-3">
            <SlidersHorizontal className="w-3 h-3" />
            Direktori Usaha
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-balance">Katalog UMKM Desa Kendalrejo</h2>
          <p className="text-muted-foreground mt-2 text-sm sm:text-base">
            Temukan dan dukung usaha warga desa kami
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Cari nama UMKM atau produk..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-card border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
            />
          </div>
          <div className="relative sm:w-48">
            <select
              value={jenisFilter}
              onChange={(e) => setJenisFilter(e.target.value)}
              className="w-full appearance-none pl-4 pr-8 py-2.5 bg-card border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors cursor-pointer"
            >
              {jenisUsahaOptions.map((opt) => (
                <option key={opt} value={opt}>{opt === "Semua" ? "Semua Jenis Usaha" : opt}</option>
              ))}
            </select>
            <SlidersHorizontal className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        {/* Count */}
        <p className="text-sm text-muted-foreground mb-5">
          Menampilkan <span className="font-semibold text-foreground">{filtered.length}</span> dari {umkmData.length} UMKM
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((umkm) => (
              <UmkmCard
                key={umkm.id}
                umkm={umkm}
                onClick={() => setSelectedUmkm(umkm)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-muted-foreground">
            <Search className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="font-medium">Tidak ada UMKM yang ditemukan</p>
            <p className="text-sm mt-1">Coba ubah kata kunci atau filter pencarian</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedUmkm && (
        <UmkmModal umkm={selectedUmkm} onClose={() => setSelectedUmkm(null)} />
      )}
    </section>
  )
}
