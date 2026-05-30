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
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="hidden md:flex w-56 flex-col bg-white border-r border-slate-200 shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-green-700 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">汇</span>
            </div>
            <span className="text-sm font-semibold text-slate-800">内容工厂</span>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {NAV.map(({ href, label, icon: Icon, exact }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive(href, exact)
                  ? "bg-green-50 text-green-700 font-medium"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
              }`}
            >
              <Icon size={16} />
              {label}
            </Link>
          ))}
        </nav>

        <div className="px-3 pb-4">
          <form action={logout}>
            <button
              type="submit"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-500 hover:bg-slate-50 hover:text-slate-700 w-full transition-colors"
            >
              <LogOut size={16} />
              退出登录
            </button>
          </form>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <div className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-slate-200 z-50">
        <div className="flex">
          {NAV.map(({ href, label, icon: Icon, exact }) => (
            <Link
              key={href}
              href={href}
              className={`flex-1 flex flex-col items-center py-3 text-xs gap-1 transition-colors ${
                isActive(href, exact) ? "text-green-700" : "text-slate-500"
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-auto pb-16 md:pb-0">
        {children}
      </main>
    </div>
  );
}
