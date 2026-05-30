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
    <div className="flex flex-col h-screen bg-white overflow-hidden">
      {/* Top navigation */}
      <header className="bg-white shrink-0" style={{ borderBottom: "1px solid var(--green-100)" }}>
        <div className="flex items-center h-14 px-4 md:px-8 gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "var(--green-700)" }}>
              <span className="text-white text-xs font-bold">汇</span>
            </div>
            <span className="text-sm font-semibold" style={{ color: "var(--green-900)" }}>内容工厂</span>
          </div>

          <div className="w-px h-5 shrink-0" style={{ background: "var(--green-100)" }} />

          {/* Nav links */}
          <nav className="flex items-center gap-0.5 flex-1">
            {NAV.map(({ href, label, icon: Icon, exact }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive(href, exact)
                    ? "font-medium"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                style={isActive(href, exact)
                  ? { background: "var(--green-50)", color: "var(--green-800)" }
                  : {}
                }
              >
                <Icon size={15} />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            ))}
          </nav>

          {/* Logout */}
          <form action={logout}>
            <button
              type="submit"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-500 hover:text-gray-700 transition-colors shrink-0"
              onMouseEnter={e => (e.currentTarget.style.background = "var(--green-50)")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
              <LogOut size={15} />
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
