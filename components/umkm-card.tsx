"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { Clock, ChevronRight, Utensils, Palette, ShoppingCart, Wrench, Leaf } from "lucide-react"
import type { UMKM } from "@/lib/data/umkm"
import { isCurrentlyOpen } from "@/lib/data/umkm"

const jenisUsahaIcon: Record<string, React.ReactNode> = {
  Kuliner: <Utensils className="w-3 h-3" />,
  Kerajinan: <Palette className="w-3 h-3" />,
  Perdagangan: <ShoppingCart className="w-3 h-3" />,
  Jasa: <Wrench className="w-3 h-3" />,
  Pertanian: <Leaf className="w-3 h-3" />,
}

const jenisUsahaBadgeColor: Record<string, string> = {
  Kuliner: "bg-orange-100 text-orange-700 border-orange-200",
  Kerajinan: "bg-purple-100 text-purple-700 border-purple-200",
  Perdagangan: "bg-blue-100 text-blue-700 border-blue-200",
  Jasa: "bg-yellow-100 text-yellow-700 border-yellow-200",
  Pertanian: "bg-green-100 text-green-700 border-green-200",
}

type Props = {
  umkm: UMKM
  onClick: () => void
}

export default function UmkmCard({ umkm, onClick }: Props) {
  // Defer to client to avoid SSR/client time mismatch hydration error
  const [open, setOpen] = useState<boolean | null>(null)
  useEffect(() => {
    setOpen(isCurrentlyOpen(umkm))
  }, [umkm])

  return (
    <article
      className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group"
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden bg-muted">
        <Image
          src={umkm.fotoProduk}
          alt={umkm.namaProduk}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Badge jenis usaha */}
        <span className={`absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${jenisUsahaBadgeColor[umkm.jenisUsaha] ?? "bg-gray-100 text-gray-700 border-gray-200"}`}>
          {jenisUsahaIcon[umkm.jenisUsaha]}
          {umkm.jenisUsaha}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-foreground text-base leading-snug mb-1 group-hover:text-primary transition-colors line-clamp-1">
          {umkm.namaUmkm}
        </h3>
        <p className="text-muted-foreground text-xs mb-3 line-clamp-2 leading-relaxed">
          {umkm.profilSingkat}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="w-3.5 h-3.5" />
            <span>{umkm.jamOperasional}</span>
          </div>
          {open !== null && (
            <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${open ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${open ? "bg-green-500" : "bg-red-400"}`} />
              {open ? "Buka" : "Tutup"}
            </span>
          )}
        </div>

        <button
          className="mt-3 w-full flex items-center justify-center gap-1.5 py-2 text-sm font-semibold text-primary border border-primary/20 rounded-xl hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          Detail Lengkap
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </article>
  )
}
