"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/app/actions";
import {
  LayoutDashboard,
  BookOpen,
  CalendarDays,
  Sparkles,
  LogOut,
} from "lucide-react";

const NAV = [
  { href: "/admin", label: "总览", icon: LayoutDashboard, exact: true },
  { href: "/admin/topics", label: "选题库", icon: BookOpen },
  { href: "/admin/schedule", label: "内容排期", icon: CalendarDays },
  { href: "/admin/generate", label: "AI 生成", icon: Sparkles },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  function isActive(href: string, exact?: boolean) {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  }

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col h-screen bg-slate-50 overflow-hidden">
      {/* Top navigation */}
      <header className="bg-white border-b border-slate-200 shrink-0">
        <div className="flex items-center h-14 px-4 md:px-6 gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-7 h-7 bg-green-700 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">汇</span>
            </div>
            <span className="text-sm font-semibold text-slate-800">内容工厂</span>
          </div>

          <div className="w-px h-5 bg-slate-200 shrink-0" />

          {/* Nav links */}
          <nav className="flex items-center gap-0.5 flex-1">
            {NAV.map(({ href, label, icon: Icon, exact }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive(href, exact)
                    ? "bg-green-50 text-green-700 font-medium"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                }`}
              >
                <Icon size={16} />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            ))}
          </nav>

          {/* Logout */}
          <form action={logout}>
            <button
              type="submit"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-colors shrink-0"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">退出</span>
            </button>
          </form>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
