import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";

const posts = [
  {
    slug: "como-fazer-cronograma-capilar",
    title: "Como montar seu cronograma capilar do zero",
    excerpt: "Um guia simples para entender hidratação, nutrição e reconstrução — e quando usar cada etapa.",
    date: "12 jun. 2026",
    tag: "Cuidados",
  },
  {
    slug: "bioplastia-vs-progressiva",
    title: "Bioplastia vs. Progressiva: qual é a melhor para você?",
    excerpt: "Entenda as diferenças, indicações e o que esperar de cada técnica.",
    date: "28 mai. 2026",
    tag: "Tendências",
  },
  {
    slug: "como-proteger-fios-do-calor",
    title: "5 hábitos para proteger seus fios do calor",
    excerpt: "Pequenas mudanças que evitam quebra, frizz e ressecamento.",
    date: "10 mai. 2026",
    tag: "Dicas",
  },
];

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Venutti Cosméticos" },
      { name: "description", content: "Dicas, cuidados e novidades sobre cosméticos capilares profissionais." },
    ],
  }),
  component: () => (
    <SiteLayout>
      <div className="bg-[var(--cream)]">
        <div className="container-x py-14 md:py-20 text-center">
          <p className="eyebrow">CONTEÚDO</p>
          <h1 className="mt-3 font-display text-4xl md:text-6xl">Blog Venutti</h1>
        </div>
      </div>
      <div className="container-x py-16">
        <div className="grid gap-8 md:grid-cols-3">
          {posts.map((p) => (
            <Link key={p.slug} to="/blog" className="group">
              <div className="aspect-[4/3] bg-[var(--cream)]" />
              <p className="eyebrow mt-5">{p.tag} · {p.date}</p>
              <h3 className="mt-2 font-display text-2xl leading-tight text-[var(--ink)] group-hover:text-[var(--moss)]">
                {p.title}
              </h3>
              <p className="mt-3 text-sm text-[var(--mute)]">{p.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </SiteLayout>
  ),
});
