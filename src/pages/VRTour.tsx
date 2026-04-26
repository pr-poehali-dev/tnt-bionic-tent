import Icon from "@/components/ui/icon";

export default function VRTour() {
  return (
    <div className="max-w-5xl mx-auto px-5 md:px-10 pt-6 pb-20">
      <p className="text-xs tracking-[0.4em] text-neutral-500 uppercase mb-3 text-center">
        Виртуальный тур
      </p>
      <h1 className="font-cormorant text-4xl md:text-5xl font-light text-neutral-800 text-center mb-10">
        VR-тур
      </h1>

      <div className="bg-neutral-900 rounded-2xl overflow-hidden h-[420px] md:h-[520px] relative flex items-center justify-center">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_50%_50%,#5fc7d4,transparent_70%)]" />
        <div className="relative text-center px-6">
          <div className="w-20 h-20 mx-auto rounded-full border border-white/20 flex items-center justify-center mb-6">
            <Icon name="Compass" size={32} className="text-white/80" />
          </div>
          <p className="font-cormorant text-3xl text-white/90 mb-3">
            Тур готовится
          </p>
          <p className="text-white/50 max-w-md mx-auto">
            Скоро вы сможете прогуляться внутри шатра прямо в браузере и в VR-очках.
          </p>
          <button
            disabled
            className="mt-7 bg-white/10 text-white/60 px-6 py-3 rounded-lg border border-white/15 cursor-not-allowed"
          >
            Запустить (скоро)
          </button>
        </div>
      </div>
    </div>
  );
}
