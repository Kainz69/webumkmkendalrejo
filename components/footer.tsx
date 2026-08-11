import { Leaf, MapPin, Phone, Mail } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-foreground text-background/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-full overflow-hidden">
                <Image
                  src="/LogoDesa.png"
                  alt="Logo Desa Kendalrejo"
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-bold text-background text-sm">
                  Desa Kendalrejo
                </p>
                <p className="text-background/60 text-xs">
                  Pusat Informasi UMKM
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-background/60">
              Platform digital resmi untuk informasi dan promosi UMKM Desa
              Kendalrejo, Kecamatan Petarukan, Kabupaten Pemalang.
            </p>
          </div>

          {/* Kontak Kantor Desa */}
          <div>
            <h3 className="text-background font-semibold text-sm mb-3">
              Kontak Kantor Desa
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-sm text-background/60">
                <MapPin className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                <span>
                  Alamat: Jl. Penyu No. 1, Kendalrejo, Petarukan, Pemalang 52362
                </span>
              </li>
              <li className="flex items-center gap-2 text-sm text-background/60">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span>087787616338</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-background/60">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span>kendalrejo@desakupemalang.id</span>
              </li>
            </ul>
          </div>

          {/* Tautan Cepat */}
          <div>
            <h3 className="text-background font-semibold text-sm mb-3">
              Tautan Cepat
            </h3>
            <ul className="space-y-2">
              {[
                { label: "Beranda", href: "/" },
                { label: "Peta Desa", href: "/#peta" },
                { label: "Katalog UMKM", href: "/#katalog" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-background/60 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-background/10 text-center text-xs text-background/40">
          © {year} Pusat Informasi & Promosi Digital UMKM Desa Kendalrejo. Hak
          cipta dilindungi.
        </div>
      </div>
    </footer>
  );
}
