import { Award, Headphones, Truck, CreditCard } from "lucide-react";

const items = [
  { icon: Truck, title: "Frete grátis", text: "Acima de R$ 299 para o Sudeste" },
  { icon: CreditCard, title: "Até 6x sem juros", text: "No cartão de crédito" },
  { icon: Award, title: "+15 anos de mercado", text: "Confiança profissional" },
  { icon: Headphones, title: "Atendimento", text: "Rápido e personalizado" },
];

export function Benefits() {
  return (
    <section className="border-y border-border bg-white">
      <div className="container-x grid grid-cols-2 gap-6 py-10 md:grid-cols-4 md:py-12">
        {items.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex flex-col items-center text-center md:flex-row md:text-left">
            <Icon className="h-7 w-7 shrink-0 text-[var(--moss)] md:mr-4" strokeWidth={1.4} />
            <div className="mt-2 md:mt-0">
              <p className="text-sm font-medium text-[var(--ink)]">{title}</p>
              <p className="text-xs text-[var(--mute)]">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
