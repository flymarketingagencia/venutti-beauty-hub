import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ProductCard } from "@/components/site/ProductCard";
import { bestsellers } from "@/data/products";

export const Route = createFileRoute("/mais-vendidos")({
  head: () => ({
    meta: [
      { title: "Mais Vendidos — Venutti Cosméticos" },
      { name: "description", content: "Os produtos mais amados pelos nossos clientes e cabeleireiros." },
    ],
  }),
  component: () => (
    <SiteLayout>
      <div className="bg-[var(--cream)]">
        <div className="container-x py-14 md:py-20 text-center">
          <p className="eyebrow">QUERIDINHOS DA CASA</p>
          <h1 className="mt-3 font-display text-4xl md:text-6xl">Mais Vendidos</h1>
        </div>
      </div>
      <div className="container-x py-14">
        <div className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
          {bestsellers().map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      </div>
    </SiteLayout>
  ),
});
