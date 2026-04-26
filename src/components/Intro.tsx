import { useEffect, useRef, useState } from "react";

interface IntroProps {
  onFinish: () => void;
}

export default function Intro({ onFinish }: IntroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<"falling" | "impact" | "fading" | "done">("falling");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("impact"), 1800);
    const t2 = setTimeout(() => setPhase("fading"), 4200);
    const t3 = setTimeout(() => {
      setPhase("done");
      onFinish();
    }, 7000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onFinish]);

  useEffect(() => {
    if (phase !== "impact" && phase !== "fading") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.scale(dpr, dpr);
    };
    resize();

    const w = window.innerWidth;
    const h = window.innerHeight;
    const cx = w / 2;
    const cy = h / 2;
    const start = performance.now();
    const duration = 4500;
    const maxR = Math.hypot(w, h) * 0.65;

    const hexSize = 14;
    const hexW = hexSize * Math.sqrt(3);
    const hexH = hexSize * 1.5;

    const cols = Math.ceil(w / hexW) + 2;
    const rows = Math.ceil(h / hexH) + 2;

    const drawHex = (x: number, y: number, alpha: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i + Math.PI / 6;
        const px = x + hexSize * Math.cos(angle);
        const py = y + hexSize * Math.sin(angle);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      const grad = ctx.createLinearGradient(x - hexSize, y - hexSize, x + hexSize, y + hexSize);
      grad.addColorStop(0, `rgba(180, 180, 190, ${alpha})`);
      grad.addColorStop(0.5, `rgba(220, 220, 230, ${alpha * 1.2})`);
      grad.addColorStop(1, `rgba(140, 140, 155, ${alpha * 0.7})`);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 0.8;
      ctx.stroke();
    };

    let raf = 0;
    const tick = (now: number) => {
      const t = (now - start) / duration;
      ctx.clearRect(0, 0, w, h);
      if (t >= 1) {
        return;
      }

      const wave1 = t * maxR;
      const wave2 = Math.max(0, (t - 0.15) * maxR);
      const wave3 = Math.max(0, (t - 0.3) * maxR);
      const ringWidth = 90;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * hexW + (row % 2 ? hexW / 2 : 0);
          const y = row * hexH;
          const d = Math.hypot(x - cx, y - cy);

          let alpha = 0;
          for (const wave of [wave1, wave2, wave3]) {
            if (wave === 0) continue;
            const dist = Math.abs(d - wave);
            if (dist < ringWidth) {
              const fall = 1 - dist / ringWidth;
              const fadeOut = 1 - wave / maxR;
              alpha = Math.max(alpha, fall * fadeOut * 0.9);
            }
          }
          if (alpha > 0.02) drawHex(x, y, alpha);
        }
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div className="fixed inset-0 z-[100] bg-white overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          perspective: "1200px",
        }}
      >
        <div
          className="relative transition-all"
          style={{
            transform:
              phase === "falling"
                ? "translateZ(-800px) scale(0.15)"
                : phase === "impact"
                ? "translateZ(0) scale(1)"
                : "translateZ(0) scale(1.5)",
            opacity: phase === "falling" ? 0.2 : phase === "impact" ? 1 : 0,
            filter: phase === "falling" ? "blur(8px)" : "blur(0px)",
            transitionDuration: phase === "falling" ? "1.8s" : phase === "fading" ? "2.6s" : "0.4s",
            transitionTimingFunction:
              phase === "falling" ? "cubic-bezier(0.45, 0, 0.55, 1)" : "ease-out",
          }}
        >
          <div className="font-cormorant text-center select-none">
            <div className="text-7xl md:text-9xl font-light tracking-[0.2em] text-neutral-800">
              TRUE
            </div>
            <div className="text-4xl md:text-6xl font-light tracking-[0.4em] text-neutral-500 mt-2">
              NATURE
            </div>
            <div className="text-xs md:text-sm tracking-[0.6em] text-neutral-400 mt-3">
              T E N T
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
