import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/a8250dc6-3643-4a52-8f7c-e2cafb69c475/files/cb183e85-8199-4001-b1dd-5551885ac41a.jpg";
const INTERIOR_IMG = "https://cdn.poehali.dev/projects/a8250dc6-3643-4a52-8f7c-e2cafb69c475/files/302c0164-e923-4c7a-b86f-bcf64640e387.jpg";
const AERIAL_IMG = "https://cdn.poehali.dev/projects/a8250dc6-3643-4a52-8f7c-e2cafb69c475/files/6af57f48-ce86-4ab8-9020-08d9cd08667e.jpg";

const models = [
  {
    id: "lux",
    name: "ЛЮКС",
    subtitle: "Классическая округлость",
    area: "60 м²",
    height: "4.2 м",
    capacity: "до 6 чел.",
    price: "от 480 000 ₽",
    features: ["Круговые панорамные окна", "Утеплённый пол", "Система вентиляции", "Стальной каркас"],
    tag: "Популярный",
  },
  {
    id: "pro",
    name: "ПРО",
    subtitle: "Модульное расширение",
    area: "90 м²",
    height: "5.0 м",
    capacity: "до 12 чел.",
    price: "от 720 000 ₽",
    features: ["Двойное утепление", "Тамбур-шлюз", "Электрощит 220В", "Дровяная печь в комплекте"],
    tag: "Хит продаж",
  },
  {
    id: "max",
    name: "МАКС",
    subtitle: "Флагман серии",
    area: "140 м²",
    height: "6.5 м",
    capacity: "до 24 чел.",
    price: "от 1 200 000 ₽",
    features: ["Панорамная терраса", "Вся инженерия под ключ", "Санузел в комплекте", "5 лет гарантия"],
    tag: "Под заказ",
  },
];

const constructorOptions = {
  size: [
    { id: "s40", label: "40 м²", desc: "Уютный" },
    { id: "s60", label: "60 м²", desc: "Комфортный" },
    { id: "s90", label: "90 м²", desc: "Просторный" },
    { id: "s140", label: "140 м²", desc: "Флагман" },
  ],
  cover: [
    { id: "canvas", label: "Брезент", desc: "Классика" },
    { id: "poly", label: "Поликарбонат", desc: "Световой" },
    { id: "eco", label: "Эко-ткань", desc: "Премиум" },
  ],
  extras: [
    { id: "stove", label: "Печь" },
    { id: "floor", label: "Пол" },
    { id: "lights", label: "Свет" },
    { id: "windows", label: "Окна" },
    { id: "terrace", label: "Терраса" },
    { id: "wc", label: "Санузел" },
  ],
};

const faqs = [
  {
    q: "Сколько времени занимает монтаж?",
    a: "Стандартный шатёр устанавливается за 1–2 дня силами бригады из 2–3 человек. Крупные конструкции — до 5 дней.",
  },
  {
    q: "Можно ли использовать шатёр зимой?",
    a: "Да. Модели ПРО и МАКС оснащены двойным утеплением и держат тепло до −35°C при наличии отопления.",
  },
  {
    q: "Нужно ли разрешение на установку?",
    a: "Временные конструкции до 50 м² не требуют разрешения. Для постоянных объектов мы помогаем оформить документы.",
  },
  {
    q: "Какой срок службы?",
    a: "Металлический каркас — 25+ лет. Тентовое покрытие — 7–10 лет, после чего легко заменяется без демонтажа конструкции.",
  },
];

export default function Index() {
  const [activeModel, setActiveModel] = useState("pro");
  const [selectedSize, setSelectedSize] = useState("s60");
  const [selectedCover, setSelectedCover] = useState("canvas");
  const [selectedExtras, setSelectedExtras] = useState<string[]>(["stove", "floor"]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleExtra = (id: string) => {
    setSelectedExtras((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  const basePrice = { s40: 280, s60: 480, s90: 720, s140: 1200 }[selectedSize] ?? 480;
  const coverPrice = { canvas: 0, poly: 80, eco: 120 }[selectedCover] ?? 0;
  const extrasPrice = selectedExtras.length * 35;
  const totalPrice = basePrice + coverPrice + extrasPrice;

  return (
    <div className="font-golos bg-[var(--bg)] text-[var(--fg)] min-h-screen overflow-x-hidden">

      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 bg-[var(--bg)]/90 backdrop-blur-md border-b border-[var(--border)]">
        <span className="font-cormorant text-2xl font-semibold tracking-widest uppercase text-[var(--accent)]">
          ШАТЁР
        </span>
        <nav className="hidden md:flex items-center gap-8 text-sm text-[var(--muted)] font-medium tracking-wide">
          <a href="#models" className="hover:text-[var(--fg)] transition-colors">Модели</a>
          <a href="#constructor" className="hover:text-[var(--fg)] transition-colors">Конструктор</a>
          <a href="#about" className="hover:text-[var(--fg)] transition-colors">О нас</a>
          <a href="#faq" className="hover:text-[var(--fg)] transition-colors">FAQ</a>
        </nav>
        <button className="hidden md:flex items-center gap-2 bg-[var(--accent)] text-[var(--accent-fg)] px-5 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity">
          Связаться
        </button>
        <button className="md:hidden text-[var(--fg)]" onClick={() => setMenuOpen(!menuOpen)}>
          <Icon name={menuOpen ? "X" : "Menu"} size={24} />
        </button>
      </header>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[var(--bg)] flex flex-col items-center justify-center gap-8 text-2xl font-cormorant font-semibold">
          {["#models", "#constructor", "#about", "#faq"].map((href, i) => (
            <a key={i} href={href} onClick={() => setMenuOpen(false)} className="text-[var(--fg)] hover:text-[var(--accent)] transition-colors">
              {["Модели", "Конструктор", "О нас", "FAQ"][i]}
            </a>
          ))}
          <button className="mt-4 bg-[var(--accent)] text-[var(--accent-fg)] px-8 py-3 rounded-full font-golos text-base font-semibold">
            Связаться
          </button>
        </div>
      )}

      {/* HERO */}
      <section className="relative min-h-screen flex items-end pb-20 pt-24">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/40 to-transparent" />
        <div className="relative z-10 px-6 md:px-16 max-w-3xl">
          <p className="text-[var(--accent)] font-cormorant italic text-xl mb-3 tracking-wide">
            Живите. Не существуйте.
          </p>
          <h1 className="font-cormorant text-5xl md:text-7xl font-light leading-[1.1] text-white mb-6">
            Шатры, которые<br />
            <em className="not-italic font-semibold text-[var(--accent)]">дышат природой</em>
          </h1>
          <p className="text-white/70 text-lg max-w-xl leading-relaxed mb-10">
            Проектируем и производим премиальные шатровые конструкции для глэмпинга, отдыха и мероприятий. Соберите свой — или выберите готовую модель.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#constructor" className="bg-[var(--accent)] text-[var(--accent-fg)] px-8 py-4 rounded-full font-semibold text-base hover:opacity-90 transition-opacity">
              Собрать в конструкторе
            </a>
            <a href="#models" className="border border-white/40 text-white px-8 py-4 rounded-full font-semibold text-base hover:bg-white/10 transition-colors">
              Готовые модели
            </a>
          </div>
        </div>
        <div className="absolute bottom-8 right-8 hidden md:flex flex-col items-center gap-2 text-white/40 text-xs tracking-widest">
          <span style={{ writingMode: "vertical-rl" }}>SCROLL</span>
          <div className="w-px h-12 bg-white/20" />
        </div>
      </section>

      {/* STATS */}
      <section className="bg-[var(--surface)] border-y border-[var(--border)]">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-[var(--border)]">
          {[
            { n: "12+", label: "лет на рынке" },
            { n: "340", label: "шатров построено" },
            { n: "5 лет", label: "гарантия на каркас" },
            { n: "48 ч", label: "монтаж под ключ" },
          ].map((s, i) => (
            <div key={i} className="py-8 px-6 text-center">
              <div className="font-cormorant text-4xl font-semibold text-[var(--accent)]">{s.n}</div>
              <div className="text-[var(--muted)] text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* MODELS */}
      <section id="models" className="py-24 px-6 md:px-16 max-w-6xl mx-auto">
        <div className="mb-14">
          <p className="text-[var(--accent)] font-cormorant italic text-lg mb-2">Готовые решения</p>
          <h2 className="font-cormorant text-4xl md:text-5xl font-light">Модели шатров</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {models.map((m) => (
            <div
              key={m.id}
              onClick={() => setActiveModel(m.id)}
              className={`relative rounded-2xl border p-8 cursor-pointer transition-all duration-300 ${
                activeModel === m.id
                  ? "border-[var(--accent)] bg-[var(--surface)] shadow-lg shadow-[var(--accent)]/10"
                  : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--accent)]/40"
              }`}
            >
              <div className="absolute top-4 right-4">
                <span className="bg-[var(--accent)]/15 text-[var(--accent)] text-xs font-semibold px-3 py-1 rounded-full">
                  {m.tag}
                </span>
              </div>
              <h3 className="font-cormorant text-3xl font-semibold mb-1">{m.name}</h3>
              <p className="text-[var(--muted)] text-sm mb-6">{m.subtitle}</p>
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { icon: "Maximize2", val: m.area },
                  { icon: "ArrowUp", val: m.height },
                  { icon: "Users", val: m.capacity },
                ].map((d, i) => (
                  <div key={i} className="bg-[var(--bg)] rounded-xl p-3 text-center">
                    <Icon name={d.icon} size={16} className="text-[var(--accent)] mx-auto mb-1" />
                    <div className="text-xs font-semibold">{d.val}</div>
                  </div>
                ))}
              </div>
              <ul className="space-y-2 mb-6">
                {m.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-[var(--muted)]">
                    <Icon name="Check" size={14} className="text-[var(--accent)] flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="border-t border-[var(--border)] pt-4 flex items-center justify-between">
                <span className="font-cormorant text-2xl font-semibold">{m.price}</span>
                <button className="bg-[var(--accent)] text-[var(--accent-fg)] px-4 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity">
                  Заказать
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section className="py-4 px-6 md:px-16 max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 h-64 md:h-80">
          <div
            className="col-span-2 rounded-2xl bg-cover bg-center"
            style={{ backgroundImage: `url(${AERIAL_IMG})` }}
          />
          <div
            className="rounded-2xl bg-cover bg-center"
            style={{ backgroundImage: `url(${INTERIOR_IMG})` }}
          />
        </div>
      </section>

      {/* CONSTRUCTOR */}
      <section id="constructor" className="py-24 px-6 md:px-16 max-w-6xl mx-auto">
        <div className="mb-14">
          <p className="text-[var(--accent)] font-cormorant italic text-lg mb-2">Онлайн-конструктор</p>
          <h2 className="font-cormorant text-4xl md:text-5xl font-light">Соберите свой шатёр</h2>
          <p className="text-[var(--muted)] mt-3 max-w-lg">
            Выберите параметры — увидите итоговую стоимость сразу
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-8">
            {/* Size */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-widest text-[var(--muted)] mb-4">
                Площадь
              </h4>
              <div className="grid grid-cols-4 gap-3">
                {constructorOptions.size.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedSize(s.id)}
                    className={`rounded-xl border p-3 text-center transition-all ${
                      selectedSize === s.id
                        ? "border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]"
                        : "border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:border-[var(--accent)]/40"
                    }`}
                  >
                    <div className="font-semibold text-sm">{s.label}</div>
                    <div className="text-xs mt-0.5 opacity-70">{s.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Cover */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-widest text-[var(--muted)] mb-4">
                Покрытие
              </h4>
              <div className="grid grid-cols-3 gap-3">
                {constructorOptions.cover.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCover(c.id)}
                    className={`rounded-xl border p-4 text-center transition-all ${
                      selectedCover === c.id
                        ? "border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]"
                        : "border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:border-[var(--accent)]/40"
                    }`}
                  >
                    <div className="font-semibold text-sm">{c.label}</div>
                    <div className="text-xs mt-0.5 opacity-70">{c.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Extras */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-widest text-[var(--muted)] mb-4">
                Опции и дополнения
              </h4>
              <div className="flex flex-wrap gap-3">
                {constructorOptions.extras.map((e) => (
                  <button
                    key={e.id}
                    onClick={() => toggleExtra(e.id)}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
                      selectedExtras.includes(e.id)
                        ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-fg)]"
                        : "border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:border-[var(--accent)]/40"
                    }`}
                  >
                    {e.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Result card */}
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-8 flex flex-col justify-between">
            <div>
              <h4 className="font-cormorant text-3xl font-semibold mb-2">Ваша конфигурация</h4>
              <p className="text-[var(--muted)] text-sm mb-8">Предварительный расчёт без учёта доставки и монтажа</p>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">Площадь</span>
                  <span>{constructorOptions.size.find((s) => s.id === selectedSize)?.label}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">Покрытие</span>
                  <span>{constructorOptions.cover.find((c) => c.id === selectedCover)?.label}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">Дополнения</span>
                  <span>{selectedExtras.length > 0 ? selectedExtras.map((id) => constructorOptions.extras.find((e) => e.id === id)?.label).join(", ") : "—"}</span>
                </div>
                <div className="border-t border-[var(--border)] pt-4 flex justify-between font-semibold text-lg">
                  <span>Итого</span>
                  <span className="font-cormorant text-2xl text-[var(--accent)]">от {totalPrice.toLocaleString("ru-RU")} 000 ₽</span>
                </div>
              </div>
            </div>
            <button className="mt-8 w-full bg-[var(--accent)] text-[var(--accent-fg)] py-4 rounded-full font-semibold text-base hover:opacity-90 transition-opacity">
              Отправить заявку
            </button>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 bg-[var(--surface)] border-y border-[var(--border)]">
        <div className="px-6 md:px-16 max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[var(--accent)] font-cormorant italic text-lg mb-2">Почему мы</p>
            <h2 className="font-cormorant text-4xl md:text-5xl font-light mb-6">
              Производим сами.<br />Монтируем сами.
            </h2>
            <p className="text-[var(--muted)] leading-relaxed mb-8">
              Наш завод находится в России. Всё — от стального каркаса до тентового полотна — изготавливается на собственном производстве. Это означает полный контроль качества и честные сроки без посредников.
            </p>
            <div className="space-y-4">
              {[
                { icon: "Factory", text: "Собственное производство в Подмосковье" },
                { icon: "Ruler", text: "Изготовление по индивидуальным размерам" },
                { icon: "Truck", text: "Доставка и монтаж по всей России" },
                { icon: "Shield", text: "Гарантия 5 лет на металлоконструкцию" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[var(--accent)]/15 flex items-center justify-center flex-shrink-0">
                    <Icon name={item.icon} size={18} className="text-[var(--accent)]" />
                  </div>
                  <span className="text-sm">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div
            className="h-80 md:h-[500px] rounded-2xl bg-cover bg-center"
            style={{ backgroundImage: `url(${INTERIOR_IMG})` }}
          />
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-6 md:px-16 max-w-4xl mx-auto">
        <div className="mb-14">
          <p className="text-[var(--accent)] font-cormorant italic text-lg mb-2">Вопросы и ответы</p>
          <h2 className="font-cormorant text-4xl md:text-5xl font-light">Часто спрашивают</h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border border-[var(--border)] rounded-2xl overflow-hidden bg-[var(--surface)]"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left"
              >
                <span className="font-semibold text-sm md:text-base">{faq.q}</span>
                <Icon
                  name={openFaq === i ? "ChevronUp" : "ChevronDown"}
                  size={18}
                  className="text-[var(--accent)] flex-shrink-0 ml-4"
                />
              </button>
              {openFaq === i && (
                <div className="px-6 pb-5 text-[var(--muted)] text-sm leading-relaxed border-t border-[var(--border)]">
                  <p className="pt-4">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-[var(--accent)] font-cormorant italic text-xl mb-4">Начнём?</p>
          <h2 className="font-cormorant text-4xl md:text-6xl font-light mb-6">
            Ваш шатёр —<br />через 48 часов
          </h2>
          <p className="text-[var(--muted)] mb-10 text-lg">
            Оставьте заявку и мы перезвоним в течение часа
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="tel"
              placeholder="+7 (___) ___-__-__"
              className="border border-[var(--border)] bg-[var(--surface)] rounded-full px-6 py-4 text-sm outline-none focus:border-[var(--accent)] transition-colors w-full sm:w-64"
            />
            <button className="bg-[var(--accent)] text-[var(--accent-fg)] px-8 py-4 rounded-full font-semibold text-base hover:opacity-90 transition-opacity whitespace-nowrap">
              Перезвоните мне
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[var(--border)] py-10 px-6 md:px-16">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-cormorant text-xl font-semibold tracking-widest text-[var(--accent)]">ШАТЁР</span>
          <p className="text-[var(--muted)] text-xs text-center">
            © 2024 Производство шатров. Все права защищены.
          </p>
          <div className="flex gap-6 text-xs text-[var(--muted)]">
            <a href="#" className="hover:text-[var(--fg)] transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-[var(--fg)] transition-colors">Контакты</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
