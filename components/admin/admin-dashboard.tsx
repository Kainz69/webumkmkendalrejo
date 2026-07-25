"use client"

import { useState } from "react"
import {
  Leaf, LogOut, Plus, Pencil, Trash2, Search,
  Store, LayoutDashboard, AlertTriangle
} from "lucide-react"
import type { UMKM } from "@/lib/data/umkm"
import { jenisUsahaOptions } from "@/lib/data/umkm"
import UmkmFormModal from "@/components/admin/umkm-form-modal"

type Props = {
  data: UMKM[]
  setData: (data: UMKM[]) => void
  onLogout: () => void
}

export default function AdminDashboard({ data, setData, onLogout }: Props) {
  const [search, setSearch] = useState("")
  const [editingUmkm, setEditingUmkm] = useState<UMKM | null | undefined>(undefined)
  // undefined = form closed, null = add new, UMKM = edit
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)

  const filtered = data.filter(
    (u) =>
      u.namaUmkm.toLowerCase().includes(search.toLowerCase()) ||
      u.jenisUsaha.toLowerCase().includes(search.toLowerCase()) ||
      u.namaPemilik.toLowerCase().includes(search.toLowerCase())
  )

  const handleSave = (saved: UMKM) => {
    if (editingUmkm === null) {
      // Add new
      setData([...data, saved])
    } else {
      // Edit existing
      setData(data.map((u) => (u.id === saved.id ? saved : u)))
    }
    setEditingUmkm(undefined)
  }

  const handleDelete = (id: string) => {
    setData(data.filter((u) => u.id !== id))
    setDeleteConfirmId(null)
  }

  const jenisCount: Record<string, number> = {}
  data.forEach((u) => {
    jenisCount[u.jenisUsaha] = (jenisCount[u.jenisUsaha] ?? 0) + 1
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Top nav */}
      <header className="bg-primary shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-8 h-8 bg-primary-foreground/10 rounded-full border border-primary-foreground/20">
              <Leaf className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <p className="text-primary-foreground font-bold text-sm leading-tight">Panel Admin</p>
              <p className="text-primary-foreground/60 text-xs">UMKM Desa Kendalrejo</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Keluar
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={<Store className="w-5 h-5 text-primary" />}
            label="Total UMKM"
            value={String(data.length)}
            color="bg-primary/10"
          />
          {jenisUsahaOptions.filter((j) => j !== "Semua").slice(0, 3).map((jenis) => (
            <StatCard
              key={jenis}
              icon={<LayoutDashboard className="w-5 h-5 text-accent-foreground" />}
              label={jenis}
              value={String(jenisCount[jenis] ?? 0)}
              color="bg-accent/20"
            />
          ))}
        </div>

        {/* Table header */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 border-b border-border">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Cari nama UMKM, pemilik, atau jenis..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
              />
            </div>
            <button
              onClick={() => setEditingUmkm(null)}
              className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-xl hover:bg-primary/90 transition-colors shrink-0"
            >
              <Plus className="w-4 h-4" />
              Tambah UMKM
            </button>
          </div>

          {/* Desktop table */}
          <div className="overflow-x-auto hidden sm:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40 text-left">
                  <th className="px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">UMKM</th>
                  <th className="px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">Pemilik</th>
                  <th className="px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">Jenis</th>
                  <th className="px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">HP/WA</th>
                  <th className="px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">Operasional</th>
                  <th className="px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((u) => (
                  <tr key={u.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-medium text-foreground">{u.namaUmkm}</td>
                    <td className="px-4 py-3 text-muted-foreground">{u.namaPemilik}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded-full">{u.jenisUsaha}</span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground font-mono text-xs">{u.nomorHpWa}</td>
                    <td className="px-4 py-3 text-muted-foreground text-xs">{u.hariOperasional} • {u.jamOperasional}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setEditingUmkm(u)}
                          className="p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                          aria-label="Edit"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(u.id)}
                          className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                          aria-label="Hapus"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center py-10 text-muted-foreground text-sm">
                      Tidak ada data yang ditemukan
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile card list */}
          <div className="sm:hidden divide-y divide-border">
            {filtered.map((u) => (
              <div key={u.id} className="p-4 flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-foreground text-sm">{u.namaUmkm}</p>
                  <p className="text-xs text-muted-foreground">{u.namaPemilik} · {u.nomorHpWa}</p>
                  <span className="mt-1 inline-block px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded-full">{u.jenisUsaha}</span>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button onClick={() => setEditingUmkm(u)} className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button onClick={() => setDeleteConfirmId(u.id)} className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="text-center py-10 text-muted-foreground text-sm">Tidak ada data yang ditemukan</div>
            )}
          </div>
        </div>
      </main>

      {/* Add/Edit Modal */}
      {editingUmkm !== undefined && (
        <UmkmFormModal
          umkm={editingUmkm}
          onSave={handleSave}
          onClose={() => setEditingUmkm(undefined)}
        />
      )}

      {/* Delete Confirm Dialog */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm p-4">
          <div className="bg-card rounded-2xl shadow-2xl max-w-sm w-full p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-destructive/10 rounded-full">
                <AlertTriangle className="w-5 h-5 text-destructive" />
              </div>
              <h3 className="font-bold text-foreground">Hapus UMKM</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-5">
              Apakah Anda yakin ingin menghapus UMKM{" "}
              <span className="font-semibold text-foreground">
                {data.find((u) => u.id === deleteConfirmId)?.namaUmkm}
              </span>
              ? Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2 text-sm font-medium border border-border rounded-xl hover:bg-muted transition-colors"
              >
                Batal
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="flex-1 py-2 text-sm font-semibold bg-destructive text-white rounded-xl hover:bg-destructive/90 transition-colors"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-4 flex items-center gap-3">
      <div className={`p-2.5 rounded-xl ${color}`}>{icon}</div>
      <div>
        <p className="text-2xl font-bold text-foreground">{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  )
}
