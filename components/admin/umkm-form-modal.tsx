"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import type { UMKM } from "@/lib/data/umkm"
import { jenisUsahaOptions } from "@/lib/data/umkm"

type FormTab = "profil" | "produk" | "layanan" | "legalitas"

const emptyForm: Omit<UMKM, "id"> = {
  namaUmkm: "",
  namaPemilik: "",
  alamatLengkap: "",
  nomorHpWa: "",
  tahunBerdiri: new Date().getFullYear(),
  profilSingkat: "",
  targetKonsumen: "",
  linkGoogleMaps: "",
  jenisUsaha: "Kuliner",
  produkUtama: "",
  produkLainnya: "",
  namaProduk: "",
  deskripsiProduk: "",
  harga: "",
  beratUkuran: "",
  varian: [],
  jamOperasional: "",
  hariOperasional: "",
  fotoProduk: "",
  mediaPromosi: [],
  usernameSosmed: "",
  metodePembayaran: [],
  layananPengiriman: [],
  rekeningUsaha: "",
  pencatatanKeuangan: false,
  metodePencatatan: "",
  legalitasUsaha: [],
  informasiHigieneSanitasi: "",
}

type Props = {
  umkm: UMKM | null // null = add new
  onSave: (data: UMKM) => void
  onClose: () => void
}

export default function UmkmFormModal({ umkm, onSave, onClose }: Props) {
  const [tab, setTab] = useState<FormTab>("profil")
  const [form, setForm] = useState<Omit<UMKM, "id">>(emptyForm)

  useEffect(() => {
    if (umkm) {
      const { id, ...rest } = umkm
      setForm(rest)
    } else {
      setForm(emptyForm)
    }
    setTab("profil")
  }, [umkm])

  const set = (key: keyof Omit<UMKM, "id">, value: unknown) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const setArray = (key: keyof Omit<UMKM, "id">, raw: string) =>
    set(key, raw.split(",").map((s) => s.trim()).filter(Boolean))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const id = umkm?.id ?? `umkm-${Date.now()}`
    onSave({ id, ...form })
  }

  const tabs: { id: FormTab; label: string }[] = [
    { id: "profil", label: "Profil & Kontak" },
    { id: "produk", label: "Produk & Operasional" },
    { id: "layanan", label: "Layanan & Promosi" },
    { id: "legalitas", label: "Legalitas & Manajerial" },
  ]

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-foreground/40 backdrop-blur-sm p-0 sm:p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-card w-full sm:max-w-2xl max-h-[95dvh] sm:max-h-[90vh] rounded-t-3xl sm:rounded-2xl overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="font-bold text-foreground">{umkm ? "Edit UMKM" : "Tambah UMKM Baru"}</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-muted transition-colors">
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border overflow-x-auto shrink-0">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`flex-1 min-w-max px-3 py-2.5 text-xs font-semibold whitespace-nowrap transition-colors ${
                tab === t.id
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Form body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 p-5">
          {tab === "profil" && (
            <div className="space-y-4">
              <FormField label="Nama UMKM *" required>
                <input type="text" value={form.namaUmkm} onChange={(e) => set("namaUmkm", e.target.value)} required className={inputCls} />
              </FormField>
              <FormField label="Nama Pemilik *" required>
                <input type="text" value={form.namaPemilik} onChange={(e) => set("namaPemilik", e.target.value)} required className={inputCls} />
              </FormField>
              <FormField label="Alamat Lengkap *" required>
                <textarea rows={3} value={form.alamatLengkap} onChange={(e) => set("alamatLengkap", e.target.value)} required className={inputCls} />
              </FormField>
              <div className="grid grid-cols-2 gap-3">
                <FormField label="Nomor HP/WA *" required>
                  <input type="tel" value={form.nomorHpWa} onChange={(e) => set("nomorHpWa", e.target.value)} required className={inputCls} />
                </FormField>
                <FormField label="Tahun Berdiri *" required>
                  <input type="number" min={1950} max={2099} value={form.tahunBerdiri} onChange={(e) => set("tahunBerdiri", parseInt(e.target.value))} required className={inputCls} />
                </FormField>
              </div>
              <FormField label="Profil Singkat">
                <textarea rows={3} value={form.profilSingkat} onChange={(e) => set("profilSingkat", e.target.value)} className={inputCls} />
              </FormField>
              <FormField label="Target Konsumen">
                <input type="text" value={form.targetKonsumen} onChange={(e) => set("targetKonsumen", e.target.value)} className={inputCls} />
              </FormField>
              <FormField label="Link Google Maps">
                <input type="url" value={form.linkGoogleMaps} onChange={(e) => set("linkGoogleMaps", e.target.value)} className={inputCls} placeholder="https://maps.google.com/..." />
              </FormField>
            </div>
          )}

          {tab === "produk" && (
            <div className="space-y-4">
              <FormField label="Jenis Usaha *" required>
                <select value={form.jenisUsaha} onChange={(e) => set("jenisUsaha", e.target.value)} required className={inputCls}>
                  {jenisUsahaOptions.filter((o) => o !== "Semua").map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </FormField>
              <FormField label="Nama Produk *" required>
                <input type="text" value={form.namaProduk} onChange={(e) => set("namaProduk", e.target.value)} required className={inputCls} />
              </FormField>
              <FormField label="Produk Utama">
                <input type="text" value={form.produkUtama} onChange={(e) => set("produkUtama", e.target.value)} className={inputCls} />
              </FormField>
              <FormField label="Produk Lainnya">
                <input type="text" value={form.produkLainnya} onChange={(e) => set("produkLainnya", e.target.value)} className={inputCls} />
              </FormField>
              <FormField label="Deskripsi Produk">
                <textarea rows={3} value={form.deskripsiProduk} onChange={(e) => set("deskripsiProduk", e.target.value)} className={inputCls} />
              </FormField>
              <div className="grid grid-cols-2 gap-3">
                <FormField label="Harga">
                  <input type="text" value={form.harga} onChange={(e) => set("harga", e.target.value)} className={inputCls} placeholder="Rp 10.000 – Rp 50.000" />
                </FormField>
                <FormField label="Berat / Ukuran">
                  <input type="text" value={form.beratUkuran} onChange={(e) => set("beratUkuran", e.target.value)} className={inputCls} placeholder="100g / 250g" />
                </FormField>
              </div>
              <FormField label="Varian (pisahkan dengan koma)">
                <input type="text" value={form.varian.join(", ")} onChange={(e) => setArray("varian", e.target.value)} className={inputCls} placeholder="Original, Pedas, Manis" />
              </FormField>
              <div className="grid grid-cols-2 gap-3">
                <FormField label="Jam Operasional">
                  <input type="text" value={form.jamOperasional} onChange={(e) => set("jamOperasional", e.target.value)} className={inputCls} placeholder="08.00 – 17.00 WIB" />
                </FormField>
                <FormField label="Hari Operasional">
                  <input type="text" value={form.hariOperasional} onChange={(e) => set("hariOperasional", e.target.value)} className={inputCls} placeholder="Senin – Sabtu" />
                </FormField>
              </div>
              <FormField label="URL Foto Produk">
                <input type="url" value={form.fotoProduk} onChange={(e) => set("fotoProduk", e.target.value)} className={inputCls} placeholder="https://images.unsplash.com/..." />
              </FormField>
            </div>
          )}

          {tab === "layanan" && (
            <div className="space-y-4">
              <FormField label="Media Promosi (pisahkan koma)">
                <input type="text" value={form.mediaPromosi.join(", ")} onChange={(e) => setArray("mediaPromosi", e.target.value)} className={inputCls} placeholder="WhatsApp, Instagram, Tokopedia" />
              </FormField>
              <FormField label="Username / Link Sosmed">
                <input type="text" value={form.usernameSosmed} onChange={(e) => set("usernameSosmed", e.target.value)} className={inputCls} placeholder="@username" />
              </FormField>
              <FormField label="Metode Pembayaran (pisahkan koma)">
                <input type="text" value={form.metodePembayaran.join(", ")} onChange={(e) => setArray("metodePembayaran", e.target.value)} className={inputCls} placeholder="Cash, QRIS, Transfer BRI" />
              </FormField>
              <FormField label="Layanan Pengiriman (pisahkan koma)">
                <input type="text" value={form.layananPengiriman.join(", ")} onChange={(e) => setArray("layananPengiriman", e.target.value)} className={inputCls} placeholder="Ambil sendiri, JNE, J&T" />
              </FormField>
              <FormField label="Rekening Usaha">
                <input type="text" value={form.rekeningUsaha} onChange={(e) => set("rekeningUsaha", e.target.value)} className={inputCls} placeholder="BRI 1234-5678 a.n. Nama" />
              </FormField>
            </div>
          )}

          {tab === "legalitas" && (
            <div className="space-y-4">
              <FormField label="Legalitas Usaha (pisahkan koma)">
                <input type="text" value={form.legalitasUsaha.join(", ")} onChange={(e) => setArray("legalitasUsaha", e.target.value)} className={inputCls} placeholder="NIB, PIRT, Halal MUI" />
              </FormField>
              <div className="flex items-center gap-3 py-1">
                <input
                  id="pencatatan"
                  type="checkbox"
                  checked={form.pencatatanKeuangan}
                  onChange={(e) => set("pencatatanKeuangan", e.target.checked)}
                  className="w-4 h-4 accent-primary cursor-pointer"
                />
                <label htmlFor="pencatatan" className="text-sm font-medium text-foreground cursor-pointer">
                  Melakukan Pencatatan Keuangan
                </label>
              </div>
              {form.pencatatanKeuangan && (
                <FormField label="Metode Pencatatan">
                  <input type="text" value={form.metodePencatatan} onChange={(e) => set("metodePencatatan", e.target.value)} className={inputCls} placeholder="Buku kas manual / BukuWarung" />
                </FormField>
              )}
              <FormField label="Informasi Higiene & Sanitasi (khusus kuliner)">
                <textarea rows={3} value={form.informasiHigieneSanitasi} onChange={(e) => set("informasiHigieneSanitasi", e.target.value)} className={inputCls} placeholder="Keterangan higiene dan sanitasi produksi..." />
              </FormField>
            </div>
          )}

          {/* Footer buttons always visible */}
          <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-border">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-foreground border border-border rounded-xl hover:bg-muted transition-colors">
              Batal
            </button>
            <button type="submit" className="px-5 py-2 text-sm font-semibold bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors">
              {umkm ? "Simpan Perubahan" : "Tambah UMKM"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

const inputCls =
  "w-full px-3 py-2 bg-background border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"

function FormField({ label, children, required }: { label: string; children: React.ReactNode; required?: boolean }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
        {label}{required && <span className="text-destructive ml-0.5">*</span>}
      </label>
      {children}
    </div>
  )
}
