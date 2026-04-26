import Icon from "@/components/ui/icon";

const CONTACTS = [
  { icon: "Phone", label: "Телефон", value: "+7 (000) 000-00-00", href: "tel:+70000000000" },
  { icon: "Mail", label: "Email", value: "hello@truenaturetent.ru", href: "mailto:hello@truenaturetent.ru" },
  { icon: "Send", label: "Telegram", value: "@truenaturetent", href: "https://t.me/" },
  { icon: "MapPin", label: "Адрес", value: "Москва, Россия", href: "#" },
];

export default function Contacts() {
  return (
    <div className="max-w-4xl mx-auto px-5 md:px-10 pt-6 pb-20">
      <p className="text-xs tracking-[0.4em] text-neutral-500 uppercase mb-3 text-center">
        Связаться с нами
      </p>
      <h1 className="font-cormorant text-4xl md:text-5xl font-light text-neutral-800 text-center mb-10">
        Контакты
      </h1>

      <div className="grid sm:grid-cols-2 gap-3 mb-8">
        {CONTACTS.map((c) => (
          <a
            key={c.label}
            href={c.href}
            className="bg-white border border-neutral-200 hover:border-neutral-400 rounded-xl p-5 flex items-center gap-4 transition-colors group"
          >
            <div className="w-11 h-11 rounded-full bg-neutral-100 flex items-center justify-center group-hover:bg-neutral-900 transition-colors">
              <Icon
                name={c.icon}
                size={20}
                className="text-neutral-700 group-hover:text-white transition-colors"
              />
            </div>
            <div>
              <p className="text-[11px] tracking-[0.25em] text-neutral-500 uppercase">{c.label}</p>
              <p className="text-neutral-800 font-medium mt-0.5">{c.value}</p>
            </div>
          </a>
        ))}
      </div>

      <div className="bg-neutral-900 text-white rounded-2xl p-6 md:p-8 text-center">
        <p className="font-cormorant text-2xl md:text-3xl mb-2">
          Работаем по всей России
        </p>
        <p className="text-white/60 max-w-lg mx-auto">
          Производство, доставка и монтаж под ключ. Отвечаем в течение часа в рабочее время.
        </p>
      </div>
    </div>
  );
}
