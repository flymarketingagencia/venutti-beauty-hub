import { CheckCircle2, Star } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const reviews = [
  {
    name: "Mariana S.",
    rating: 5,
    text: "Resultado incrível desde a primeira aplicação. Meu cabelo nunca teve tanto brilho e leveza. Recomendo demais!",
    product: "Bioplastia Capilar",
  },
  {
    name: "Camila R.",
    rating: 5,
    text: "O kit de cronograma transformou meus fios em 4 semanas. Atendimento impecável e entrega rápida.",
    product: "Kit Cronograma",
  },
  {
    name: "Juliana M.",
    rating: 5,
    text: "Trabalho com cabelos há 12 anos e a Venutti é a marca mais consistente que já usei no salão.",
    product: "Linha Profissional",
  },
];

export function Reviews() {
  return (
    <section className="bg-[var(--cream)]">
      <div className="container-x py-20 md:py-28">
        <SectionHeading eyebrow="QUEM USA, RECOMENDA" title="Avaliações verificadas" />
        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((r) => (
            <div key={r.name} className="bg-white p-8">
              <div className="flex items-center gap-1 text-[var(--moss)]">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-5 font-display text-xl leading-snug text-[var(--ink)]">
                "{r.text}"
              </p>
              <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
                <div>
                  <p className="text-sm font-medium text-[var(--ink)]">{r.name}</p>
                  <p className="text-xs text-[var(--mute)]">{r.product}</p>
                </div>
                <span className="flex items-center gap-1 text-[10px] uppercase tracking-[0.15em] text-[var(--moss)]">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Compra verificada
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
