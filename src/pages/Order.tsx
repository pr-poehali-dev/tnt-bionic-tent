import { useState } from "react";
import Icon from "@/components/ui/icon";

export default function Order() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", model: "ЛЮКС", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-5 md:px-10 pt-6 pb-20">
      <p className="text-xs tracking-[0.4em] text-neutral-500 uppercase mb-3 text-center">
        Оформление
      </p>
      <h1 className="font-cormorant text-4xl md:text-5xl font-light text-neutral-800 text-center mb-3">
        Заказать шатёр
      </h1>
      <p className="text-center text-neutral-500 mb-10 max-w-xl mx-auto">
        Оставьте заявку — мы свяжемся в течение часа, рассчитаем точную стоимость и согласуем сроки.
      </p>

      {submitted ? (
        <div className="bg-white border border-neutral-200 rounded-2xl p-10 text-center">
          <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-5">
            <Icon name="Check" size={26} className="text-emerald-600" />
          </div>
          <h2 className="font-cormorant text-2xl text-neutral-800 mb-2">Заявка принята</h2>
          <p className="text-neutral-500">Мы скоро свяжемся с вами.</p>
        </div>
      ) : (
        <form
          onSubmit={submit}
          className="bg-white border border-neutral-200 rounded-2xl p-6 md:p-8 space-y-4"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Имя" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
            <Field label="Телефон" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} required type="tel" />
          </div>
          <Field label="Email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} type="email" />

          <div>
            <label className="block text-xs tracking-[0.2em] text-neutral-500 uppercase mb-2">Модель</label>
            <select
              value={form.model}
              onChange={(e) => setForm({ ...form, model: e.target.value })}
              className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-4 py-3 text-neutral-800 focus:border-neutral-500 outline-none"
            >
              <option>ЛЮКС</option>
              <option>ПРО</option>
              <option>МАКС</option>
              <option>По индивидуальному проекту</option>
            </select>
          </div>

          <div>
            <label className="block text-xs tracking-[0.2em] text-neutral-500 uppercase mb-2">Комментарий</label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={4}
              className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-4 py-3 text-neutral-800 focus:border-neutral-500 outline-none resize-none"
              placeholder="Регион, сроки, пожелания..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-neutral-900 text-white py-4 rounded-lg font-medium tracking-wide hover:bg-neutral-800 transition-colors"
          >
            Отправить заявку
          </button>
        </form>
      )}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs tracking-[0.2em] text-neutral-500 uppercase mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-4 py-3 text-neutral-800 focus:border-neutral-500 outline-none"
      />
    </div>
  );
}
