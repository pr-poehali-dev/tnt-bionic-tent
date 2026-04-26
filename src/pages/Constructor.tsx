import { useState } from "react";
import TentViewer from "@/components/TentViewer";

const SIZES = [
  { id: "s40", label: "40 м²", price: 280 },
  { id: "s60", label: "60 м²", price: 480 },
  { id: "s90", label: "90 м²", price: 720 },
  { id: "s140", label: "140 м²", price: 1200 },
];

const COVERS = [
  { id: "canvas", label: "Брезент", price: 0 },
  { id: "poly", label: "Поликарбонат", price: 80 },
  { id: "eco", label: "Эко-ткань", price: 120 },
];

const EXTRAS = [
  { id: "stove", label: "Печь" },
  { id: "floor", label: "Утеплённый пол" },
  { id: "lights", label: "Свет" },
  { id: "windows", label: "Окна-иллюминаторы" },
  { id: "terrace", label: "Терраса" },
  { id: "wc", label: "Санузел" },
];

export default function Constructor() {
  const [size, setSize] = useState("s60");
  const [cover, setCover] = useState("canvas");
  const [extras, setExtras] = useState<string[]>(["stove", "floor"]);

  const toggleExtra = (id: string) =>
    setExtras((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );

  const base = SIZES.find((s) => s.id === size)?.price ?? 0;
  const coverP = COVERS.find((c) => c.id === cover)?.price ?? 0;
  const extrasP = extras.length * 35;
  const total = base + coverP + extrasP;

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-10 pt-6 pb-20">
      <p className="text-xs tracking-[0.4em] text-neutral-500 uppercase mb-3 text-center">
        Соберите свой
      </p>
      <h1 className="font-cormorant text-4xl md:text-5xl font-light text-neutral-800 text-center mb-10">
        Конструктор-калькулятор
      </h1>

      <div className="grid lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-2xl border border-neutral-200 overflow-hidden h-[420px] md:h-[560px]">
          <TentViewer />
        </div>

        <div className="lg:col-span-2 space-y-5">
          <Block title="Размер">
            <div className="grid grid-cols-2 gap-2">
              {SIZES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSize(s.id)}
                  className={`p-3 rounded-lg border text-left transition-colors ${
                    size === s.id
                      ? "border-neutral-800 bg-neutral-900 text-white"
                      : "border-neutral-200 bg-white hover:border-neutral-400"
                  }`}
                >
                  <div className="font-medium">{s.label}</div>
                  <div
                    className={`text-xs ${size === s.id ? "text-white/60" : "text-neutral-500"}`}
                  >
                    от {s.price} тыс. ₽
                  </div>
                </button>
              ))}
            </div>
          </Block>

          <Block title="Покрытие">
            <div className="grid grid-cols-3 gap-2">
              {COVERS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setCover(c.id)}
                  className={`p-3 rounded-lg border text-center text-sm transition-colors ${
                    cover === c.id
                      ? "border-neutral-800 bg-neutral-900 text-white"
                      : "border-neutral-200 bg-white hover:border-neutral-400"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </Block>

          <Block title="Дополнительно">
            <div className="grid grid-cols-2 gap-2">
              {EXTRAS.map((e) => {
                const on = extras.includes(e.id);
                return (
                  <button
                    key={e.id}
                    onClick={() => toggleExtra(e.id)}
                    className={`p-2.5 rounded-lg border text-sm text-left transition-colors ${
                      on
                        ? "border-neutral-800 bg-neutral-900 text-white"
                        : "border-neutral-200 bg-white hover:border-neutral-400"
                    }`}
                  >
                    {e.label}
                  </button>
                );
              })}
            </div>
          </Block>

          <div className="bg-neutral-900 text-white rounded-2xl p-5">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[11px] tracking-[0.3em] text-white/50 uppercase">
                  Итого
                </p>
                <p className="font-cormorant text-3xl mt-1">{total} тыс. ₽</p>
              </div>
              <button className="bg-white text-neutral-900 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-neutral-100 transition-colors">
                Заказать
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-neutral-200 rounded-2xl p-5">
      <p className="text-xs tracking-[0.3em] text-neutral-500 uppercase mb-3">{title}</p>
      {children}
    </div>
  );
}
