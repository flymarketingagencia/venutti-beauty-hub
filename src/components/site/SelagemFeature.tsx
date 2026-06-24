import { Link } from "@tanstack/react-router";
import { Leaf, ShieldCheck, Sparkles } from "lucide-react";
import img from "@/assets/selagem-feature.jpg";

export function SelagemFeature() {
  return (
    <section className="bg-[var(--cream)]">
      <div className="container-x grid items-center gap-10 py-20 md:grid-cols-2 md:gap-16 md:py-28">
        <div>
          <p className="eyebrow">BIOPLASTIA CAPILAR</p>
          <h2 className="mt-4 font-display text-4xl leading-[1.05] md:text-6xl">
            Cabelos lisos, leves e vivos — sem formol, sem medo.
          </h2>
          <p className="mt-6 max-w-md text-[var(--mute)]">
            Tecnologia exclusiva Venutti que alinha, hidrata e devolve brilho em uma única
            aplicação. Resultado natural, com saúde e movimento.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/produto/$slug" params={{ slug: "bioplastia-capilar-venutti" }} className="btn-primary">
              Quero minha Bioplastia
            </Link>
            <Link to="/selagem" className="btn-outline">
              Ver antes e depois
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap gap-6 text-xs">
            <Badge icon={<Leaf className="h-4 w-4" />} text="0% Formol" />
            <Badge icon={<ShieldCheck className="h-4 w-4" />} text="Aprovado pela Anvisa" />
            <Badge icon={<Sparkles className="h-4 w-4" />} text="Vegano" />
          </div>
        </div>
        <div className="relative">
          <img src={img} alt="Bioplastia Capilar Venutti" loading="lazy" className="w-full object-cover" />
        </div>
      </div>
    </section>
  );
}

function Badge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2 text-[var(--ink)]">
      <span className="text-[var(--moss)]">{icon}</span>
      <span className="eyebrow !text-[var(--ink)]">{text}</span>
    </div>
  );
}
