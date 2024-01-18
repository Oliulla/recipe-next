"use client";

import { useEffect } from "react";
import { DashboardSidebar } from "./DashboardSidebar";
import { useRouter } from "next/navigation";

export function DashboarMainPageComponent({ children, user }) {
  const router = useRouter();

  useEffect(() => {
    if (!user?.email) {
      router.push("/login");
    }
  }, []);

  return (
    <>
      <aside>
        <DashboardSidebar />
      </aside>
      <main className="flex-1 bg-gray-3 border border-gray-2 rounded-lg max-h-screen overflow-auto">
        {children}
      </main>
    </>
  );
}
