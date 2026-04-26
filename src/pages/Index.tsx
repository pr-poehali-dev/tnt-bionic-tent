import { Link } from "react-router-dom";
import TentViewer from "@/components/TentViewer";
import Icon from "@/components/ui/icon";

const RENDERS = [
  "https://cdn.poehali.dev/projects/a8250dc6-3643-4a52-8f7c-e2cafb69c475/bucket/1ffb6513-906b-46da-825f-20fffd66d1d7.png",
  "https://cdn.poehali.dev/projects/a8250dc6-3643-4a52-8f7c-e2cafb69c475/bucket/eb10cde4-2cdc-4226-b614-c9aec9cccef1.png",
  "https://cdn.poehali.dev/projects/a8250dc6-3643-4a52-8f7c-e2cafb69c475/bucket/cca1c5c1-c483-49a1-aff8-ff939a14a6e7.png",
  "https://cdn.poehali.dev/projects/a8250dc6-3643-4a52-8f7c-e2cafb69c475/bucket/5c5923ea-90cb-4794-b409-0a0c9202fe7e.png",
  "https://cdn.poehali.dev/projects/a8250dc6-3643-4a52-8f7c-e2cafb69c475/bucket/fdbe94ef-cb89-445d-8232-5b3b62809183.png",
];

export default function Index() {
  return (
    <div className="max-w-7xl mx-auto px-5 md:px-10 pb-20">
      {/* Заголовок */}
      <section className="pt-6 pb-8 text-center">
        <p className="text-xs tracking-[0.4em] text-neutral-500 uppercase mb-3">
          True Nature Tent
        </p>
        <h1 className="font-cormorant text-4xl md:text-6xl font-light text-neutral-800 leading-tight">Welcome back home.</h1>
      </section>

      {/* 3D + видео */}
      <section className="grid lg:grid-cols-3 gap-5 mb-14">
        <div className="lg:col-span-2 relative bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-2xl border border-neutral-200 overflow-hidden h-[420px] md:h-[520px]">
          <TentViewer />
        </div>

        <aside className="bg-neutral-900 rounded-2xl overflow-hidden flex flex-col h-[420px] md:h-[520px]">
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 relative">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_30%,#5fc7d4,transparent_60%)]" />
            <div className="relative">
              <div className="w-16 h-16 mx-auto rounded-full border border-white/20 flex items-center justify-center mb-5">
                <Icon name="Play" size={22} className="text-white/80 ml-1" />
              </div>
              <p className="font-cormorant text-2xl text-white/90 mb-2">
                Видеоролик
              </p>
              <p className="text-xs tracking-[0.3em] text-white/40 uppercase">
                Скоро
              </p>
            </div>
          </div>
          <div className="border-t border-white/10 px-5 py-4">
            <p className="text-[11px] tracking-[0.25em] text-white/40 uppercase mb-1">
              Премьера
            </p>
            <p className="text-sm text-white/80">
              Готовим короткий фильм о шатрах в естественной среде
            </p>
          </div>
        </aside>
      </section>

      {/* Быстрые переходы */}
      <section className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-14">
        {[
          { to: "/order", icon: "ShoppingBag", label: "Заказ" },
          { to: "/gallery", icon: "Images", label: "Галерея" },
          { to: "/constructor", icon: "Sliders", label: "Конструктор" },
          { to: "/vr-tour", icon: "Compass", label: "VR-тур" },
          { to: "/contacts", icon: "Phone", label: "Контакты" },
        ].map((q) => (
          <Link
            key={q.to}
            to={q.to}
            className="group bg-white border border-neutral-200 hover:border-neutral-400 rounded-xl p-4 flex flex-col items-center gap-2 transition-all hover:-translate-y-0.5"
          >
            <Icon
              name={q.icon}
              size={22}
              className="text-neutral-500 group-hover:text-neutral-900 transition-colors"
            />
            <span className="text-sm text-neutral-700 group-hover:text-neutral-900">
              {q.label}
            </span>
          </Link>
        ))}
      </section>

      {/* Миниатюры рендеров */}
      <section>
        <div className="flex items-end justify-between mb-5">
          <div>
            <p className="text-xs tracking-[0.3em] text-neutral-500 uppercase mb-1">
              Галерея
            </p>
            <h2 className="font-cormorant text-3xl text-neutral-800 font-light">
              Рендеры моделей
            </h2>
          </div>
          <Link
            to="/gallery"
            className="text-sm text-neutral-600 hover:text-neutral-900 underline underline-offset-4"
          >
            Все
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {RENDERS.map((src, i) => (
            <div
              key={i}
              className="aspect-[4/5] bg-neutral-100 rounded-lg overflow-hidden border border-neutral-200"
            >
              <img
                src={src}
                alt={`Шатёр ${i + 1}`}
                className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}