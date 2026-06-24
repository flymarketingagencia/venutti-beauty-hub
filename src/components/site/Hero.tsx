import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import h1 from "@/assets/hero-1.jpg";
import h2 from "@/assets/hero-2.jpg";
import h3 from "@/assets/hero-3.jpg";

const slides = [
  {
    image: h1,
    eyebrow: "NOVA COLEÇÃO",
    title: "O brilho do liso natural — sem formol.",
    sub: "A nova Bioplastia Capilar Venutti devolve movimento, leveza e brilho espelhado em uma única aplicação.",
    cta: "Descobrir a coleção",
    to: "/selagem",
    align: "left" as const,
  },
  {
    image: h2,
    eyebrow: "CRONOGRAMA CAPILAR",
    title: "Quatro semanas para um cabelo novo.",
    sub: "Kit completo com hidratação, nutrição, reconstrução e selagem — guia incluso.",
    cta: "Conhecer o kit",
    to: "/cronograma-capilar",
    align: "right" as const,
  },
  {
    image: h3,
    eyebrow: "MAIS VENDIDOS",
    title: "O cuidado profissional que mora na sua casa.",
    sub: "15 anos formulando alta performance para salões. Agora, com você todos os dias.",
    cta: "Ver mais vendidos",
    to: "/mais-vendidos",
    align: "left" as const,
  },
];

export function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, []);

  const go = (n: number) => setI((v) => (v + n + slides.length) % slides.length);

  return (
    <section className="relative isolate overflow-hidden bg-[var(--cream)]">
      <div className="relative h-[78vh] min-h-[520px] w-full md:h-[80vh]">
        {slides.map((s, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-[1200ms] ${
              i === idx ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <img
              src={s.image}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              loading={idx === 0 ? "eager" : "lazy"}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/40 to-transparent md:from-white/80 md:via-white/30" />
            <div className="container-x relative flex h-full items-center">
              <div
                className={`max-w-xl ${
                  s.align === "right" ? "md:ml-auto md:text-right" : ""
                }`}
              >
                <p className="eyebrow">{s.eyebrow}</p>
                <h1 className="mt-4 font-display text-4xl leading-[1.05] text-[var(--ink)] md:text-6xl lg:text-7xl">
                  {s.title}
                </h1>
                <p className="mt-5 max-w-md text-sm leading-relaxed text-[var(--ink)]/80 md:text-base">
                  {s.sub}
                </p>
                <Link to={s.to} className="btn-primary mt-8 inline-flex">
                  {s.cta}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Arrows */}
      <button
        aria-label="Anterior"
        onClick={() => go(-1)}
        className="absolute left-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-[var(--ink)]/20 bg-white/80 p-2.5 backdrop-blur transition hover:bg-white md:block"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        aria-label="Próximo"
        onClick={() => go(1)}
        className="absolute right-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-[var(--ink)]/20 bg-white/80 p-2.5 backdrop-blur transition hover:bg-white md:block"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Bullets */}
      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            aria-label={`Slide ${idx + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              i === idx ? "w-8 bg-[var(--ink)]" : "w-4 bg-[var(--ink)]/30"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
