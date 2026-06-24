import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ProductCard } from "@/components/site/ProductCard";
import { onSale } from "@/data/products";

export const Route = createFileRoute("/ofertas")({
  head: () => ({
    meta: [
      { title: "Ofertas — Venutti Cosméticos" },
      { name: "description", content: "Produtos selecionados com descontos especiais." },
    ],
  }),
  component: () => (
    <SiteLayout>
      <div className="bg-[var(--moss)] text-white">
        <div className="container-x py-14 md:py-20 text-center">
          <p className="eyebrow !text-white/80">PROMOÇÕES DA SEMANA</p>
          <h1 className="mt-3 font-display text-4xl md:text-6xl">Ofertas</h1>
          <p className="mt-3 text-sm text-white/80">Descontos que ficam até durarem.</p>
        </div>
      </div>
      <div className="container-x py-14">
        <div className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
          {onSale().map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      </div>
    </SiteLayout>
  ),
});
