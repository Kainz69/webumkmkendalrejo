"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Leaf } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { label: "Beranda", href: "/" },
  { label: "Peta", href: "/#peta" },
  { label: "Katalog", href: "/#katalog" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-primary shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex items-center justify-center w-10 h-10 bg-primary-foreground/10 rounded-full border-2 border-primary-foreground/30 group-hover:border-primary-foreground/60 transition-colors overflow-hidden">
              <Image
                src="/logo.png"
                alt="Logo Desa Kendalrejo"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            {/* <div className="flex items-center justify-center w-10 h-10 bg-primary-foreground/10 rounded-full border-2 border-primary-foreground/30 group-hover:border-primary-foreground/60 transition-colors">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div> */}
            <div>
              <p className="text-primary-foreground font-bold text-sm leading-tight">
                Desa Kendalrejo
              </p>
              <p className="text-primary-foreground/70 text-xs leading-tight hidden sm:block">
                Pusat Informasi UMKM
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <div className="md:hidden bg-primary border-t border-primary-foreground/10">
          <nav className="flex flex-col px-4 py-3 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-3 text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 rounded-lg transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
