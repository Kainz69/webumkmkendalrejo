// "use client"

// import Image from "next/image"
// import { useEffect, useState } from "react"
// import { Clock, ChevronRight, Utensils, Palette, ShoppingCart, Wrench, Leaf } from "lucide-react"
// import type { UMKM } from "@/lib/data/umkm"
// import { isCurrentlyOpen } from "@/lib/data/umkm"

// const jenisUsahaIcon: Record<string, React.ReactNode> = {
//   Kuliner: <Utensils className="w-3 h-3" />,
//   Kerajinan: <Palette className="w-3 h-3" />,
//   Perdagangan: <ShoppingCart className="w-3 h-3" />,
//   Jasa: <Wrench className="w-3 h-3" />,
//   Pertanian: <Leaf className="w-3 h-3" />,
// }

// const jenisUsahaBadgeColor: Record<string, string> = {
//   Kuliner: "bg-orange-100 text-orange-700 border-orange-200",
//   Kerajinan: "bg-purple-100 text-purple-700 border-purple-200",
//   Perdagangan: "bg-blue-100 text-blue-700 border-blue-200",
//   Jasa: "bg-yellow-100 text-yellow-700 border-yellow-200",
//   Pertanian: "bg-green-100 text-green-700 border-green-200",
// }

// type Props = {
//   umkm: UMKM
//   onClick: () => void
// }

// export default function UmkmCard({ umkm, onClick }: Props) {
//   // Defer to client to avoid SSR/client time mismatch hydration error
//   const [open, setOpen] = useState<boolean | null>(null)
//   useEffect(() => {
//     setOpen(isCurrentlyOpen(umkm))
//   }, [umkm])

//   return (
//     <article
//       className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group"
//       onClick={onClick}
//     >
//       {/* Image */}
//       <div className="relative h-48 w-full overflow-hidden bg-muted">
//         <Image
//           src={umkm.fotoProduk}
//           alt={umkm.namaProduk}
//           fill
//           className="object-cover group-hover:scale-105 transition-transform duration-300"
//           sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
//         />
//         {/* Badge jenis usaha */}
//         <span className={`absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${jenisUsahaBadgeColor[umkm.jenisUsaha] ?? "bg-gray-100 text-gray-700 border-gray-200"}`}>
//           {jenisUsahaIcon[umkm.jenisUsaha]}
//           {umkm.jenisUsaha}
//         </span>
//       </div>

//       {/* Content */}
//       <div className="p-4">
//         <h3 className="font-bold text-foreground text-base leading-snug mb-1 group-hover:text-primary transition-colors line-clamp-1">
//           {umkm.namaUmkm}
//         </h3>
//         <p className="text-muted-foreground text-xs mb-3 line-clamp-2 leading-relaxed">
//           {umkm.profilSingkat}
//         </p>

//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
//             <Clock className="w-3.5 h-3.5" />
//             <span>{umkm.jamOperasional}</span>
//           </div>
//           {open !== null && (
//             <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${open ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
//               <span className={`w-1.5 h-1.5 rounded-full ${open ? "bg-green-500" : "bg-red-400"}`} />
//               {open ? "Buka" : "Tutup"}
//             </span>
//           )}
//         </div>

//         <button
//           className="mt-3 w-full flex items-center justify-center gap-1.5 py-2 text-sm font-semibold text-primary border border-primary/20 rounded-xl hover:bg-primary hover:text-primary-foreground transition-colors"
//         >
//           Detail Lengkap
//           <ChevronRight className="w-4 h-4" />
//         </button>
//       </div>
//     </article>
//   )
// }

// "use client";

// import Image from "next/image";
// import { useEffect, useState } from "react";
// import {
//   Clock,
//   ChevronRight,
//   Utensils,
//   Palette,
//   ShoppingCart,
//   Wrench,
//   Leaf,
// } from "lucide-react";
// import type { UMKM } from "@/lib/data/umkm";

// const jenisUsahaIcon: Record<string, React.ReactNode> = {
//   Kuliner: <Utensils className="w-3 h-3" />,
//   Kerajinan: <Palette className="w-3 h-3" />,
//   Perdagangan: <ShoppingCart className="w-3 h-3" />,
//   Jasa: <Wrench className="w-3 h-3" />,
//   Pertanian: <Leaf className="w-3 h-3" />,
// };

// const jenisUsahaBadgeColor: Record<string, string> = {
//   Kuliner: "bg-orange-100 text-orange-700 border-orange-200",
//   Kerajinan: "bg-purple-100 text-purple-700 border-purple-200",
//   Perdagangan: "bg-blue-100 text-blue-700 border-blue-200",
//   Jasa: "bg-yellow-100 text-yellow-700 border-yellow-200",
//   Pertanian: "bg-green-100 text-green-700 border-green-200",
// };

// type Props = {
//   umkm: UMKM;
//   onClick?: () => void;
// };

// // 🟢 Fungsi Pengecek Buka / Tutup Pintar
// function checkIsOpen(hariOpRaw: any, jamOpRaw: any): boolean {
//   const jamOp = String(jamOpRaw || "").trim();
//   const hariOp = String(hariOpRaw || "").trim();

//   // Jika jam operasional kosong, anggap Buka secara default
//   if (!jamOp) return true;

//   const now = new Date();
//   const currentDay = now.getDay(); // 0 = Minggu, 1 = Senin, ..., 5 = Jumat, 6 = Sabtu
//   const currentHour = now.getHours();
//   const currentMinute = now.getMinutes();
//   const currentTimeInMinutes = currentHour * 60 + currentMinute;

//   const lowerHari = hariOp.toLowerCase();

//   // 1. CEK HARI
//   if (lowerHari.includes("kecuali")) {
//     if (
//       (lowerHari.includes("jum'at") || lowerHari.includes("jumat")) &&
//       currentDay === 5
//     ) {
//       return false; // Hari ini Jumat -> Tutup
//     }
//     if (lowerHari.includes("minggu") && currentDay === 0) {
//       return false; // Hari ini Minggu -> Tutup
//     }
//   } else if (
//     lowerHari.includes("senin - sabtu") ||
//     lowerHari.includes("senin-sabtu")
//   ) {
//     if (currentDay === 0) return false;
//   } else if (
//     lowerHari.includes("senin - jumat") ||
//     lowerHari.includes("senin-jumat")
//   ) {
//     if (currentDay === 0 || currentDay === 6) return false;
//   }

//   // 2. CEK JAM OPERASIONAL
//   const cleanJam = jamOp
//     .toLowerCase()
//     .replace(/wib|wita|wit/g, "")
//     .replace(/\./g, ":")
//     .trim();

//   const match = cleanJam.match(/(\d{1,2}:\d{2})\s*[-–—]\s*(\d{1,2}:\d{2})/);

//   // Jika format jam tidak bisa di-parse angka, default-kan Buka
//   if (!match) return true;

//   const [_, startStr, endStr] = match;
//   const [startH, startM] = startStr.split(":").map(Number);
//   const [endH, endM] = endStr.split(":").map(Number);

//   const startInMinutes = startH * 60 + startM;
//   const endInMinutes = endH * 60 + endM;

//   if (startInMinutes <= endInMinutes) {
//     return (
//       currentTimeInMinutes >= startInMinutes &&
//       currentTimeInMinutes <= endInMinutes
//     );
//   } else {
//     // Toko buka melintasi malam (misal 18:00 - 02:00)
//     return (
//       currentTimeInMinutes >= startInMinutes ||
//       currentTimeInMinutes <= endInMinutes
//     );
//   }
// }

// export default function UmkmCard({ umkm, onClick }: Props) {
//   const [open, setOpen] = useState<boolean | null>(null);

//   // Ambil atribut baik format camelCase maupun snake_case
//   const hariOperasional =
//     umkm.hariOperasional || (umkm as any).hari_operasional || "";
//   const jamOperasional =
//     umkm.jamOperasional || (umkm as any).jam_operasional || "";

//   // Mengatasi fotoProduk bertipe string | string[]
//   const rawFoto = umkm.fotoProduk || (umkm as any).foto_produk;
//   const fotoUrl = Array.isArray(rawFoto)
//     ? rawFoto[0]
//     : rawFoto || "/placeholder.jpg";

//   useEffect(() => {
//     setOpen(checkIsOpen(hariOperasional, jamOperasional));
//   }, [hariOperasional, jamOperasional]);

//   const jenisUsaha = umkm.jenisUsaha || (umkm as any).jenis_usaha || "Kuliner";
//   const namaUmkm = umkm.namaUmkm || (umkm as any).nama_umkm || "Nama UMKM";
//   const profilSingkat =
//     umkm.profilSingkat ||
//     (umkm as any).profile_singkat ||
//     umkm.deskripsiProduk ||
//     (umkm as any).deskripsi_produk ||
//     "Produk unggulan berkualitas dari Desa Kendalrejo.";

//   return (
//     <article
//       className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group flex flex-col justify-between"
//       onClick={onClick}
//     >
//       <div>
//         {/* Image Header */}
//         <div className="relative h-48 w-full overflow-hidden bg-muted">
//           <Image
//             src={fotoUrl}
//             alt={umkm.namaProduk || namaUmkm}
//             fill
//             className="object-cover group-hover:scale-105 transition-transform duration-300"
//             sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
//           />

//           {/* Badge Jenis Usaha */}
//           <span
//             className={`absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
//               jenisUsahaBadgeColor[jenisUsaha] ??
//               "bg-gray-100 text-gray-700 border-gray-200"
//             }`}
//           >
//             {jenisUsahaIcon[jenisUsaha]}
//             {jenisUsaha}
//           </span>
//         </div>

//         {/* Content */}
//         <div className="p-4">
//           <h3 className="font-bold text-foreground text-base leading-snug mb-1 group-hover:text-primary transition-colors line-clamp-1">
//             {namaUmkm}
//           </h3>
//           <p className="text-muted-foreground text-xs mb-3 line-clamp-2 leading-relaxed min-h-10">
//             {profilSingkat}
//           </p>

//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
//               <Clock className="w-3.5 h-3.5 text-primary" />
//               <span>{jamOperasional || "Jam tidak tersedia"}</span>
//             </div>

//             {open !== null && (
//               <span
//                 className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
//                   open
//                     ? "bg-green-100 text-green-700"
//                     : "bg-red-100 text-red-600"
//                 }`}
//               >
//                 <span
//                   className={`w-1.5 h-1.5 rounded-full ${
//                     open ? "bg-green-500" : "bg-red-400"
//                   }`}
//                 />
//                 {open ? "Buka" : "Tutup"}
//               </span>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Button Detail */}
//       <div className="px-4 pb-4">
//         <button
//           type="button"
//           className="w-full flex items-center justify-center gap-1.5 py-2 text-sm font-semibold text-primary border border-primary/20 rounded-xl hover:bg-primary hover:text-primary-foreground transition-colors"
//         >
//           Detail Lengkap
//           <ChevronRight className="w-4 h-4" />
//         </button>
//       </div>
//     </article>
//   );
// }

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Clock,
  ChevronRight,
  Utensils,
  Palette,
  ShoppingCart,
  Wrench,
  Leaf,
} from "lucide-react";
import type { UMKM } from "@/lib/data/umkm";

const jenisUsahaIcon: Record<string, React.ReactNode> = {
  Kuliner: <Utensils className="w-3 h-3" />,
  Kerajinan: <Palette className="w-3 h-3" />,
  Perdagangan: <ShoppingCart className="w-3 h-3" />,
  Jasa: <Wrench className="w-3 h-3" />,
  Pertanian: <Leaf className="w-3 h-3" />,
};

const jenisUsahaBadgeColor: Record<string, string> = {
  Kuliner: "bg-orange-100 text-orange-700 border-orange-200",
  Kerajinan: "bg-purple-100 text-purple-700 border-purple-200",
  Perdagangan: "bg-blue-100 text-blue-700 border-blue-200",
  Jasa: "bg-yellow-100 text-yellow-700 border-yellow-200",
  Pertanian: "bg-green-100 text-green-700 border-green-200",
};

type Props = {
  umkm: UMKM;
  onClick?: () => void;
};

function checkIsOpen(hariOpRaw: any, jamOpRaw: any): boolean {
  const jamOp = String(jamOpRaw || "").trim();
  const hariOp = String(hariOpRaw || "").trim();

  if (!jamOp) return true;

  const now = new Date();
  const currentDay = now.getDay();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTimeInMinutes = currentHour * 60 + currentMinute;

  const lowerHari = hariOp.toLowerCase();

  if (lowerHari.includes("kecuali")) {
    if (
      (lowerHari.includes("jum'at") || lowerHari.includes("jumat")) &&
      currentDay === 5
    ) {
      return false;
    }
    if (lowerHari.includes("minggu") && currentDay === 0) {
      return false;
    }
  } else if (
    lowerHari.includes("senin - sabtu") ||
    lowerHari.includes("senin-sabtu")
  ) {
    if (currentDay === 0) return false;
  } else if (
    lowerHari.includes("senin - jumat") ||
    lowerHari.includes("senin-jumat")
  ) {
    if (currentDay === 0 || currentDay === 6) return false;
  }

  const cleanJam = jamOp
    .toLowerCase()
    .replace(/wib|wita|wit/g, "")
    .replace(/\./g, ":")
    .trim();

  const match = cleanJam.match(/(\d{1,2}:\d{2})\s*[-–—]\s*(\d{1,2}:\d{2})/);

  if (!match) return true;

  const [_, startStr, endStr] = match;
  const [startH, startM] = startStr.split(":").map(Number);
  const [endH, endM] = endStr.split(":").map(Number);

  const startInMinutes = startH * 60 + startM;
  const endInMinutes = endH * 60 + endM;

  if (startInMinutes <= endInMinutes) {
    return (
      currentTimeInMinutes >= startInMinutes &&
      currentTimeInMinutes <= endInMinutes
    );
  } else {
    return (
      currentTimeInMinutes >= startInMinutes ||
      currentTimeInMinutes <= endInMinutes
    );
  }
}

export default function UmkmCard({ umkm, onClick }: Props) {
  const [open, setOpen] = useState<boolean | null>(null);

  const hariOperasional =
    umkm.hariOperasional || (umkm as any).hari_operasional || "";
  const jamOperasional =
    umkm.jamOperasional || (umkm as any).jam_operasional || "";

  const rawFoto = umkm.fotoProduk || (umkm as any).foto_produk;
  const fotoUrl = Array.isArray(rawFoto)
    ? rawFoto[0]
    : rawFoto || "/placeholder.jpg";

  useEffect(() => {
    setOpen(checkIsOpen(hariOperasional, jamOperasional));
  }, [hariOperasional, jamOperasional]);

  const jenisUsaha = umkm.jenisUsaha || (umkm as any).jenis_usaha || "Kuliner";
  const namaUmkm = umkm.namaUmkm || (umkm as any).nama_umkm || "Nama UMKM";
  const profilSingkat =
    umkm.profilSingkat ||
    (umkm as any).profile_singkat ||
    umkm.deskripsiProduk ||
    (umkm as any).deskripsi_produk ||
    "Produk unggulan berkualitas dari Desa Kendalrejo.";

  return (
    <article
      className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group flex flex-col justify-between"
      onClick={onClick}
    >
      <div>
        <div className="relative h-48 w-full overflow-hidden bg-muted">
          <Image
            src={fotoUrl}
            alt={umkm.namaProduk || namaUmkm}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          <span
            className={`absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
              jenisUsahaBadgeColor[jenisUsaha] ??
              "bg-gray-100 text-gray-700 border-gray-200"
            }`}
          >
            {jenisUsahaIcon[jenisUsaha]}
            {jenisUsaha}
          </span>
        </div>

        <div className="p-4">
          <h3 className="font-bold text-foreground text-base leading-snug mb-1 group-hover:text-primary transition-colors line-clamp-1">
            {namaUmkm}
          </h3>
          <p className="text-muted-foreground text-xs mb-3 line-clamp-2 leading-relaxed min-h-[2.5rem]">
            {profilSingkat}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="w-3.5 h-3.5 text-primary" />
              <span>{jamOperasional || "Jam tidak tersedia"}</span>
            </div>

            {open !== null && (
              <span
                className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
                  open
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    open ? "bg-green-500" : "bg-red-400"
                  }`}
                />
                {open ? "Buka" : "Tutup"}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="px-4 pb-4">
        <button
          type="button"
          className="w-full flex items-center justify-center gap-1.5 py-2 text-sm font-semibold text-primary border border-primary/20 rounded-xl hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          Detail Lengkap
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </article>
  );
}
