import { useState } from "react";
import Icon from "@/components/ui/icon";

const IMAGES = [
  "https://cdn.poehali.dev/projects/a8250dc6-3643-4a52-8f7c-e2cafb69c475/bucket/1ffb6513-906b-46da-825f-20fffd66d1d7.png",
  "https://cdn.poehali.dev/projects/a8250dc6-3643-4a52-8f7c-e2cafb69c475/bucket/eb10cde4-2cdc-4226-b614-c9aec9cccef1.png",
  "https://cdn.poehali.dev/projects/a8250dc6-3643-4a52-8f7c-e2cafb69c475/bucket/cca1c5c1-c483-49a1-aff8-ff939a14a6e7.png",
  "https://cdn.poehali.dev/projects/a8250dc6-3643-4a52-8f7c-e2cafb69c475/bucket/5c5923ea-90cb-4794-b409-0a0c9202fe7e.png",
  "https://cdn.poehali.dev/projects/a8250dc6-3643-4a52-8f7c-e2cafb69c475/bucket/fdbe94ef-cb89-445d-8232-5b3b62809183.png",
];

export default function Gallery() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-10 pt-6 pb-20">
      <p className="text-xs tracking-[0.4em] text-neutral-500 uppercase mb-3 text-center">
        Портфолио
      </p>
      <h1 className="font-cormorant text-4xl md:text-5xl font-light text-neutral-800 text-center mb-3">
        Галерея
      </h1>
      <p className="text-center text-neutral-500 mb-10 max-w-xl mx-auto">
        Концепт-рендеры наших шатров. Нажмите на изображение, чтобы рассмотреть.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {IMAGES.map((src, i) => (
          <button
            key={i}
            onClick={() => setActive(src)}
            className="aspect-[4/5] bg-neutral-100 rounded-lg overflow-hidden border border-neutral-200 hover:border-neutral-400 transition-colors"
          >
            <img
              src={src}
              alt={`Рендер ${i + 1}`}
              className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-5"
          onClick={() => setActive(null)}
        >
          <button
            className="absolute top-5 right-5 text-white/80 hover:text-white"
            onClick={() => setActive(null)}
          >
            <Icon name="X" size={28} />
          </button>
          <img
            src={active}
            alt="Просмотр"
            className="max-w-full max-h-full object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
