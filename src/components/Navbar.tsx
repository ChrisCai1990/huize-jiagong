"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "首页", href: "#hero" },
  { label: "关于我们", href: "#about" },
  { label: "服务项目", href: "#services" },
  { label: "成功案例", href: "#cases" },
  { label: "疗愈指南", href: "/guide" },
  { label: "联系我们", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2">
          <span className="w-2 h-5 rounded-sm" style={{ background: "var(--green-700)" }} />
          <span className="text-lg font-semibold tracking-tight text-gray-900">
            汇泽甲功健康
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-gray-600 hover:text-green-800 transition-colors"
              style={{ "--tw-text-opacity": "1" } as React.CSSProperties}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="text-sm text-white px-5 py-2 rounded-full transition-colors"
            style={{ background: "var(--green-700)" }}
            onMouseEnter={e => (e.currentTarget.style.background = "var(--green-800)")}
            onMouseLeave={e => (e.currentTarget.style.background = "var(--green-700)")}
          >
            加微信咨询
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden"
          style={{ color: "var(--green-800)" }}
          onClick={() => setOpen(!open)}
          aria-label="菜单"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-gray-700"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="text-sm text-white text-center px-4 py-2 rounded-full"
            style={{ background: "var(--green-700)" }}
            onClick={() => setOpen(false)}
          >
            加微信咨询
          </a>
        </div>
      )}
    </header>
  );
}
