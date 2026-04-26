import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "@/components/ui/icon";

const links = [
  { to: "/", label: "Главная" },
  { to: "/order", label: "Заказ" },
  { to: "/gallery", label: "Галерея" },
  { to: "/constructor", label: "Конструктор" },
  { to: "/vr-tour", label: "VR-тур" },
  { to: "/contacts", label: "Контакты" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/85 backdrop-blur-md border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-5 md:px-10 py-3 flex items-center justify-between">
          <Link to="/" className="font-cormorant leading-none select-none">
            <div className="text-lg md:text-xl tracking-[0.25em] text-neutral-800 font-light">
              TRUE NATURE
            </div>
            <div className="text-[9px] md:text-[10px] tracking-[0.5em] text-neutral-500 mt-0.5">
              T E N T
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-7">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`text-sm tracking-wide transition-colors ${
                  pathname === l.to
                    ? "text-neutral-900 font-medium"
                    : "text-neutral-500 hover:text-neutral-900"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <button
            className="lg:hidden text-neutral-700"
            onClick={() => setOpen(!open)}
            aria-label="Меню"
          >
            <Icon name={open ? "X" : "Menu"} size={24} />
          </button>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-30 pt-20 bg-white/95 backdrop-blur-md lg:hidden">
          <nav className="flex flex-col items-center gap-6 py-10">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={`text-xl font-cormorant tracking-wide ${
                  pathname === l.to ? "text-neutral-900 font-medium" : "text-neutral-600"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
