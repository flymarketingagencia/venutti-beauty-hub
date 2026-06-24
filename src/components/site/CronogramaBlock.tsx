import { Link } from "@tanstack/react-router";
import img from "@/assets/category-cronograma.jpg";
import p1 from "@/assets/product-1.jpg";
import p2 from "@/assets/product-2.jpg";
import p3 from "@/assets/product-3.jpg";
import p4 from "@/assets/product-4.jpg";

const steps = [
  { name: "Fortalecimento", image: p3 },
  { name: "Recuperação", image: p1 },
  { name: "Máscaras", image: p4 },
  { name: "Selagem", image: p2 },
];

export function CronogramaBlock() {
  return (
    <section className="container-x py-20 md:py-28">
      <div className="grid gap-10 md:grid-cols-[1fr_1.2fr] md:gap-16">
        <div className="relative overflow-hidden bg-[var(--cream)]">
          <img src={img} alt="Cronograma capilar Venutti" loading="lazy" className="h-full w-full object-cover" />
        </div>
        <div>
          <p className="eyebrow">CRONOGRAMA CAPILAR</p>
          <h2 className="mt-3 font-display text-3xl leading-tight md:text-5xl">
            Quatro etapas. Trinta dias. Um cabelo renovado.
          </h2>
          <p className="mt-4 text-[var(--mute)]">
            O kit completo de cronograma capilar Venutti combina fortalecimento, recuperação,
            nutrição e selagem em uma rotina simples — desenhada por nossos químicos para
            entregar resultado visível na primeira semana.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {steps.map((s, idx) => (
              <Link
                key={s.name}
                to="/produtos"
                search={{ cat: "cronograma" }}
                className="group flex flex-col items-center text-center"
              >
                <div className="aspect-square w-full overflow-hidden bg-[var(--cream)]">
                  <img src={s.image} alt={s.name} loading="lazy" className="h-full w-full object-cover transition group-hover:scale-105" />
                </div>
                <p className="eyebrow mt-3">0{idx + 1}</p>
                <p className="mt-1 text-sm font-medium text-[var(--ink)]">{s.name}</p>
              </Link>
            ))}
          </div>
          <Link
            to="/produto/$slug"
            params={{ slug: "kit-cronograma-capilar-completo" }}
            className="btn-primary mt-10 inline-flex"
          >
            Quero o kit completo
          </Link>
        </div>
      </div>
    </section>
  );
}
