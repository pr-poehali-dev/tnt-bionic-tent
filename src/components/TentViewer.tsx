import { useState } from "react";
import Icon from "@/components/ui/icon";

const PREVIEW_IMG =
  "https://cdn.poehali.dev/projects/a8250dc6-3643-4a52-8f7c-e2cafb69c475/bucket/5c5923ea-90cb-4794-b409-0a0c9202fe7e.png";

const MODEL_URL =
  "https://cdn.poehali.dev/projects/a8250dc6-3643-4a52-8f7c-e2cafb69c475/bucket/models/tent.glb";

export default function TentViewer({ className = "" }: { className?: string }) {
  const [angle, setAngle] = useState(0);

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 via-white to-neutral-100" />
      <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(circle_at_50%_60%,#000,transparent_60%)]" />

      <div className="relative w-full h-full flex items-center justify-center p-6">
        <img
          src={PREVIEW_IMG}
          alt="Шатёр True Nature Tent"
          className="max-w-full max-h-full object-contain transition-transform duration-700 ease-out drop-shadow-2xl"
          style={{ transform: `rotateY(${angle}deg)` }}
        />
      </div>

      <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/80 backdrop-blur-md border border-neutral-200 rounded-full px-3 py-1.5">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[11px] tracking-[0.25em] text-neutral-600 uppercase">
          3D-модель готова
        </span>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/85 backdrop-blur-md border border-neutral-200 rounded-full px-2 py-1.5 shadow-sm">
        <button
          onClick={() => setAngle((a) => a - 15)}
          className="w-9 h-9 rounded-full hover:bg-neutral-100 flex items-center justify-center text-neutral-700"
          aria-label="Повернуть влево"
        >
          <Icon name="ChevronLeft" size={18} />
        </button>
        <span className="text-[11px] tracking-[0.25em] text-neutral-500 uppercase px-2">
          Поворот {((angle % 360) + 360) % 360}°
        </span>
        <button
          onClick={() => setAngle((a) => a + 15)}
          className="w-9 h-9 rounded-full hover:bg-neutral-100 flex items-center justify-center text-neutral-700"
          aria-label="Повернуть вправо"
        >
          <Icon name="ChevronRight" size={18} />
        </button>
        <a
          href={MODEL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-1 px-3 h-9 rounded-full bg-neutral-900 text-white text-xs flex items-center gap-1.5 hover:bg-neutral-800 transition-colors"
        >
          <Icon name="Download" size={14} />
          GLB
        </a>
      </div>
    </div>
  );
}
