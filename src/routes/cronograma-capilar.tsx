import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { CronogramaBlock } from "@/components/site/CronogramaBlock";
import { ProductCard } from "@/components/site/ProductCard";
import { byCategory } from "@/data/products";

export const Route = createFileRoute("/cronograma-capilar")({
  head: () => ({
    meta: [
      { title: "Cronograma Capilar — Venutti Cosméticos" },
      { name: "description", content: "Hidratação, nutrição, reconstrução e selagem em 4 semanas." },
    ],
  }),
  component: () => (
    <SiteLayout>
      <div className="bg-[var(--cream)]">
        <div className="container-x py-14 md:py-20 text-center">
          <p className="eyebrow">RITUAL VENUTTI</p>
          <h1 className="mt-3 font-display text-4xl md:text-6xl">Cronograma Capilar</h1>
          <p className="mx-auto mt-4 max-w-xl text-[var(--mute)]">
            Um método pensado em ciclos de 4 semanas para devolver força, hidratação e brilho aos seus fios.
          </p>
        </div>
      </div>
      <CronogramaBlock />
      <div className="container-x pb-20">
        <h2 className="mb-10 font-display text-3xl">Produtos da linha</h2>
        <div className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
          {byCategory("cronograma").map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      </div>
    </SiteLayout>
  ),
});
