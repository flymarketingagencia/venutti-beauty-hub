import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/quem-somos")({
  head: () => ({
    meta: [
      { title: "Quem Somos — Venutti Cosméticos" },
      { name: "description", content: "15 anos de história desenvolvendo cosméticos capilares profissionais." },
    ],
  }),
  component: () => (
    <SiteLayout>
      <section className="container-x py-20 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">NOSSA HISTÓRIA</p>
          <h1 className="mt-3 font-display text-4xl leading-tight md:text-6xl">
            Mais de 15 anos cuidando dos cabelos do Brasil.
          </h1>
          <p className="mt-6 text-[var(--mute)]">
            A Venutti nasceu nos bastidores dos melhores salões brasileiros. Por mais de uma
            década e meia, formulamos produtos pensados para profissionais — entregando
            performance, segurança e resultado consistente em cada aplicação.
          </p>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {[
            { n: "15+", t: "anos no mercado", d: "História construída ao lado de cabeleireiros e salões parceiros." },
            { n: "200+", t: "salões parceiros", d: "Presença em todas as regiões do Brasil." },
            { n: "100%", t: "compromisso com qualidade", d: "Produtos com registro Anvisa e desenvolvimento técnico próprio." },
          ].map((s) => (
            <div key={s.t} className="border-t border-border pt-6">
              <p className="font-display text-5xl text-[var(--moss)]">{s.n}</p>
              <p className="mt-2 eyebrow !text-[var(--ink)]">{s.t}</p>
              <p className="mt-3 text-sm text-[var(--mute)]">{s.d}</p>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  ),
});
