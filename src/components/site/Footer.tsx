import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Lock, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-[var(--cream)]">
      <div className="container-x grid gap-12 py-16 md:grid-cols-4">
        <div>
          <span className="font-display text-2xl">Venutti</span>
          <p className="mt-4 text-sm leading-relaxed text-[var(--mute)]">
            Mais de 15 anos desenvolvendo cosméticos capilares profissionais para
            cabeleireiros, salões e amantes do cuidado premium.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="#" aria-label="Instagram" className="grid h-9 w-9 place-items-center rounded-full border border-[var(--ink)]/20 transition hover:bg-[var(--ink)] hover:text-white">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="#" aria-label="Facebook" className="grid h-9 w-9 place-items-center rounded-full border border-[var(--ink)]/20 transition hover:bg-[var(--ink)] hover:text-white">
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <p className="eyebrow mb-5">Categorias</p>
          <ul className="space-y-2 text-sm">
            {[
              ["Home Care", "home-care"],
              ["Progressivas", "progressivas"],
              ["Máscaras", "mascaras"],
              ["Finalizadores", "finalizadores"],
              ["Cronograma", "cronograma"],
              ["Tratamento", "tratamento"],
            ].map(([label, slug]) => (
              <li key={slug}>
                <Link to="/produtos" search={{ cat: slug }} className="text-[var(--ink)] hover:text-[var(--moss)]">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-5">Links Úteis</p>
          <ul className="space-y-2 text-sm">
            {[
              ["Quem Somos", "/quem-somos"],
              ["Trocas e Devoluções", "/politicas/trocas"],
              ["Política de Entrega", "/politicas/entrega"],
              ["Política de Privacidade", "/politicas/privacidade"],
              ["Como Comprar", "/politicas/como-comprar"],
              ["Formas de Pagamento", "/politicas/pagamento"],
              ["Anvisa", "/politicas/anvisa"],
            ].map(([label, to]) => (
              <li key={to}>
                <Link to={to} className="text-[var(--ink)] hover:text-[var(--moss)]">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-5">Nossos Contatos</p>
          <ul className="space-y-3 text-sm text-[var(--ink)]">
            <li className="flex items-start gap-2"><Phone className="mt-0.5 h-4 w-4 text-[var(--moss)]" /> (11) 9 0000-0000</li>
            <li className="flex items-start gap-2"><Mail className="mt-0.5 h-4 w-4 text-[var(--moss)]" /> contato@venutticosmeticos.com.br</li>
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 text-[var(--moss)]" /> São Paulo — SP, Brasil</li>
          </ul>

          <p className="eyebrow mb-3 mt-8">Também estamos em</p>
          <div className="flex flex-wrap gap-2 text-xs">
            <a href="#" className="rounded-md border border-[var(--ink)]/20 px-3 py-1.5 hover:bg-[var(--ink)] hover:text-white">Mercado Livre</a>
            <a href="#" className="rounded-md border border-[var(--ink)]/20 px-3 py-1.5 hover:bg-[var(--ink)] hover:text-white">Instagram Shop</a>
          </div>
          <p className="mt-3 text-xs text-[var(--mute)]">Mesmo preço em todos os canais oficiais.</p>
        </div>
      </div>

      <div className="border-t border-[var(--ink)]/10">
        <div className="container-x flex flex-col items-center justify-between gap-4 py-6 text-xs text-[var(--mute)] md:flex-row">
          <p>© {new Date().getFullYear()} Venutti Cosméticos. Todos os direitos reservados.</p>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1"><ShieldCheck className="h-4 w-4 text-[var(--moss)]" /> Site 100% seguro</span>
            <span className="flex items-center gap-1"><Lock className="h-4 w-4 text-[var(--moss)]" /> SSL</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {["VISA", "MASTER", "ELO", "AMEX", "PIX", "BOLETO"].map((p) => (
              <span key={p} className="rounded border border-[var(--ink)]/15 bg-white px-2 py-1 text-[10px] font-medium tracking-wider">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
