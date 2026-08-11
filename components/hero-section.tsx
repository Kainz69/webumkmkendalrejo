import Link from "next/link";
// import { ArrowRight, Store, MapPin, Users } from "lucide-react"
import { ArrowRight, Store, MapPin, Users, Download } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative bg-primary overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern
            id="grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="white"
              strokeWidth="1"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary-foreground/10 text-primary-foreground/90 text-xs font-semibold rounded-full border border-primary-foreground/20 mb-5">
            <MapPin className="w-3 h-3" />
            Kec. Petarukan, Pemalang, Jawa Tengah
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-foreground leading-tight text-balance mb-5">
            Selamat Datang di{" "}
            <span className="text-accent">Pusat Informasi UMKM</span> Desa
            Kendalrejo
          </h1>

          <p className="text-primary-foreground/75 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl">
            Temukan produk dan jasa unggulan dari warga Desa Kendalrejo. Dukung
            ekonomi lokal dengan berbelanja dan menggunakan layanan UMKM kami.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/#katalog"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-foreground text-primary font-semibold rounded-xl hover:bg-primary-foreground/90 transition-colors shadow-lg"
            >
              <Store className="w-4 h-4" />
              Jelajahi Katalog UMKM
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/#peta"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-transparent text-primary-foreground font-semibold rounded-xl border-2 border-primary-foreground/30 hover:border-primary-foreground/70 hover:bg-primary-foreground/10 transition-colors"
            >
              <MapPin className="w-4 h-4" />
              Lihat Peta Lokasi
            </Link>
            <a
              href="/Template Pembukuan UMKM Sederhana.xlsx"
              download="Template Pembukuan UMKM Sederhana.xlsx"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-transparent text-primary-foreground font-semibold rounded-xl border-2 border-primary-foreground/30 hover:border-primary-foreground/70 hover:bg-primary-foreground/10 transition-colors"
            >
              <Download className="w-4 h-4" />
              Template Pembukuan UMKM
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-lg">
          {[
            { icon: Store, value: "5+", label: "UMKM Terdaftar" },
            { icon: Users, value: "5", label: "Jenis Usaha" },
            { icon: MapPin, value: "1", label: "Desa Kendalrejo" },
          ].map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="bg-primary-foreground/10 rounded-xl p-4 border border-primary-foreground/15"
            >
              <Icon className="w-5 h-5 text-accent mb-1" />
              <p className="text-2xl font-bold text-primary-foreground">
                {value}
              </p>
              <p className="text-xs text-primary-foreground/65">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
