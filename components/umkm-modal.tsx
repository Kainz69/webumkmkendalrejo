"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { QRCodeSVG } from "qrcode.react"
import {
  X, MapPin, Clock, Phone, MessageCircle, ExternalLink,
  CreditCard, Truck, Building2, Shield, Info, Package,
  Utensils, Palette, ShoppingCart, Wrench, Leaf, CheckCircle2, QrCode
} from "lucide-react"
import type { UMKM } from "@/lib/data/umkm"
import { isCurrentlyOpen } from "@/lib/data/umkm"

type Tab = "utama" | "produk" | "layanan" | "legalitas"

const jenisUsahaBadgeColor: Record<string, string> = {
  Kuliner: "bg-orange-100 text-orange-700",
  Kerajinan: "bg-purple-100 text-purple-700",
  Perdagangan: "bg-blue-100 text-blue-700",
  Jasa: "bg-yellow-100 text-yellow-700",
  Pertanian: "bg-green-100 text-green-700",
}

const jenisUsahaIcon: Record<string, React.ReactNode> = {
  Kuliner: <Utensils className="w-3 h-3" />,
  Kerajinan: <Palette className="w-3 h-3" />,
  Perdagangan: <ShoppingCart className="w-3 h-3" />,
  Jasa: <Wrench className="w-3 h-3" />,
  Pertanian: <Leaf className="w-3 h-3" />,
}

const paymentIcon: Record<string, string> = {
  Cash: "💵",
  QRIS: "📱",
}

type Props = {
  umkm: UMKM | null
  onClose: () => void
}

export default function UmkmModal({ umkm, onClose }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("utama")
  const [showQr, setShowQr] = useState(false)

  // Defer time-dependent and window-dependent values to client to avoid hydration mismatch
  const [open, setOpen] = useState<boolean | null>(null)
  const [detailUrl, setDetailUrl] = useState(`https://umkm-kendalrejo.vercel.app/?umkm=${umkm?.id ?? ""}`)

  useEffect(() => {
    if (umkm) {
      setOpen(isCurrentlyOpen(umkm))
      setDetailUrl(`${window.location.origin}/?umkm=${umkm.id}`)
    }
  }, [umkm])

  if (!umkm) return null

  const tabs: { id: Tab; label: string }[] = [
    { id: "utama", label: "Informasi Utama" },
    { id: "produk", label: "Rincian Produk" },
    { id: "layanan", label: "Layanan" },
    { id: "legalitas", label: "Legalitas & Higiene" },
  ]

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-foreground/40 backdrop-blur-sm p-0 sm:p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-card w-full sm:max-w-2xl max-h-[95dvh] sm:max-h-[90vh] rounded-t-3xl sm:rounded-2xl overflow-hidden flex flex-col shadow-2xl">
        {/* Header Image + Info */}
        <div className="relative h-48 shrink-0">
          <Image
            src={umkm.fotoProduk}
            alt={umkm.namaProduk}
            fill
            className="object-cover"
            sizes="672px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 bg-black/40 hover:bg-black/60 rounded-full text-white transition-colors"
            aria-label="Tutup"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h2 className="text-white font-bold text-xl leading-tight text-balance">{umkm.namaUmkm}</h2>
                <p className="text-white/80 text-sm">{umkm.namaPemilik}</p>
              </div>
              <div className="flex flex-col items-end gap-1.5 shrink-0">
                <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${jenisUsahaBadgeColor[umkm.jenisUsaha] ?? "bg-gray-100 text-gray-700"}`}>
                  {jenisUsahaIcon[umkm.jenisUsaha]}
                  {umkm.jenisUsaha}
                </span>
                {open !== null && (
                  <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${open ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${open ? "bg-green-500" : "bg-red-400"}`} />
                    {open ? "Sedang Buka" : "Sedang Tutup"}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border bg-card shrink-0 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-max px-3 py-3 text-xs font-semibold transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="overflow-y-auto flex-1 p-4 space-y-3">
          {activeTab === "utama" && (
            <>
              <InfoRow icon={<MapPin className="w-4 h-4 text-primary" />} label="Alamat">
                {umkm.alamatLengkap}
              </InfoRow>
              <InfoRow icon={<Clock className="w-4 h-4 text-primary" />} label="Operasional">
                {umkm.hariOperasional} • {umkm.jamOperasional}
              </InfoRow>
              <InfoRow icon={<Info className="w-4 h-4 text-primary" />} label="Profil">
                {umkm.profilSingkat}
              </InfoRow>
              <InfoRow icon={<Package className="w-4 h-4 text-primary" />} label="Target Konsumen">
                {umkm.targetKonsumen}
              </InfoRow>
              <InfoRow icon={<Building2 className="w-4 h-4 text-primary" />} label="Tahun Berdiri">
                {umkm.tahunBerdiri}
              </InfoRow>
              <div className="flex gap-2 mt-2">
                <a
                  href={umkm.linkGoogleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                  Buka Maps
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href={`https://wa.me/62${umkm.nomorHpWa.replace(/^0/, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-green-600 text-white text-sm font-semibold rounded-xl hover:bg-green-700 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat WA
                </a>
              </div>
              <a
                href={`tel:${umkm.nomorHpWa}`}
                className="flex items-center gap-2 py-2.5 px-4 border border-border rounded-xl text-sm text-foreground hover:bg-muted transition-colors"
              >
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Telepon:</span>
                <span className="font-medium">{umkm.nomorHpWa}</span>
              </a>
            </>
          )}

          {activeTab === "produk" && (
            <>
              <InfoRow icon={<Package className="w-4 h-4 text-primary" />} label="Nama Produk">
                {umkm.namaProduk}
              </InfoRow>
              <InfoRow icon={<Package className="w-4 h-4 text-primary" />} label="Produk Utama">
                {umkm.produkUtama}
              </InfoRow>
              <InfoRow icon={<Package className="w-4 h-4 text-primary" />} label="Produk Lainnya">
                {umkm.produkLainnya}
              </InfoRow>
              <div className="bg-muted/50 rounded-xl p-3">
                <p className="text-xs font-semibold text-muted-foreground mb-1">Deskripsi Produk</p>
                <p className="text-sm text-foreground leading-relaxed">{umkm.deskripsiProduk}</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <InfoBox label="Harga" value={umkm.harga} />
                <InfoBox label="Berat / Ukuran" value={umkm.beratUkuran} />
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-2">Varian Tersedia</p>
                <div className="flex flex-wrap gap-1.5">
                  {umkm.varian.map((v) => (
                    <span key={v} className="px-2.5 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === "layanan" && (
            <>
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5" /> Metode Pembayaran
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {umkm.metodePembayaran.map((m) => (
                    <span key={m} className="inline-flex items-center gap-1 px-3 py-1 bg-card border border-border rounded-full text-sm font-medium">
                      {paymentIcon[m] ?? "💳"} {m}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5" /> Layanan Pengiriman
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {umkm.layananPengiriman.map((l) => (
                    <span key={l} className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-xs font-medium">
                      {l}
                    </span>
                  ))}
                </div>
              </div>
              <InfoRow icon={<Building2 className="w-4 h-4 text-primary" />} label="Rekening Usaha">
                {umkm.rekeningUsaha}
              </InfoRow>
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-2">Media Promosi & Sosmed</p>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {umkm.mediaPromosi.map((m) => (
                    <span key={m} className="px-2.5 py-1 bg-accent/20 text-accent-foreground text-xs font-medium rounded-full border border-accent/30">
                      {m}
                    </span>
                  ))}
                </div>
                {umkm.usernameSosmed !== "-" && (
                  <p className="text-sm text-muted-foreground">Username: <span className="font-medium text-foreground">{umkm.usernameSosmed}</span></p>
                )}
              </div>
            </>
          )}

          {activeTab === "legalitas" && (
            <>
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" /> Legalitas Usaha
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {umkm.legalitasUsaha.map((l) => (
                    <span key={l} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 border border-green-200 rounded-full text-xs font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {l}
                    </span>
                  ))}
                </div>
              </div>
              <InfoRow icon={<Building2 className="w-4 h-4 text-primary" />} label="Pencatatan Keuangan">
                {umkm.pencatatanKeuangan ? `Ya – ${umkm.metodePencatatan}` : "Belum ada"}
              </InfoRow>
              {umkm.informasiHigieneSanitasi !== "-" && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-3">
                  <p className="text-xs font-semibold text-green-700 mb-1 flex items-center gap-1.5">
                    <Utensils className="w-3.5 h-3.5" /> Informasi Higiene & Sanitasi
                  </p>
                  <p className="text-sm text-green-800 leading-relaxed">{umkm.informasiHigieneSanitasi}</p>
                </div>
              )}

              {/* QR Code */}
              <div className="mt-2 border border-border rounded-xl overflow-hidden">
                <button
                  onClick={() => setShowQr(!showQr)}
                  className="w-full flex items-center justify-between p-3 text-sm font-semibold text-foreground hover:bg-muted/50 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <QrCode className="w-4 h-4 text-primary" />
                    QR Code UMKM Ini
                  </span>
                  <span className="text-muted-foreground text-xs">{showQr ? "Sembunyikan" : "Tampilkan"}</span>
                </button>
                {showQr && (
                  <div className="p-4 flex flex-col items-center gap-2 border-t border-border bg-muted/20">
                    <QRCodeSVG
                      value={detailUrl}
                      size={160}
                      bgColor="#ffffff"
                      fgColor="#2d6a35"
                      level="M"
                      includeMargin
                    />
                    <p className="text-xs text-center text-muted-foreground max-w-[200px] leading-relaxed">
                      Scan untuk melihat detail {umkm.namaUmkm}
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function InfoRow({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3 items-start py-1">
      <div className="mt-0.5 shrink-0">{icon}</div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium text-foreground leading-relaxed">{children}</p>
      </div>
    </div>
  )
}

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-muted/50 rounded-xl p-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-semibold text-foreground mt-0.5">{value}</p>
    </div>
  )
}
