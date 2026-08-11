"use client";

import { useState } from "react";
import {
  umkmData as initialData,
  type UMKM,
  jenisUsahaOptions,
} from "@/lib/data/umkm";
import AdminLogin from "@/components/admin/admin-login";
// import AdminDashboard from "@/components/admin/admin-dashboard"
import { AdminDashboard } from "@/components/admin/admin-dashboard";

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [data, setData] = useState<UMKM[]>(initialData);

  if (!isLoggedIn) {
    return <AdminLogin onLogin={() => setIsLoggedIn(true)} />;
  }

  return <AdminDashboard onLogout={() => setIsLoggedIn(false)} />;
}
