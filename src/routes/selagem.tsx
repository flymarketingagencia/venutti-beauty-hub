import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SelagemFeature } from "@/components/site/SelagemFeature";
import { ProductCard } from "@/components/site/ProductCard";
import { byCategory } from "@/data/products";

export const Route = createFileRoute("/selagem")({
  head: () => ({
    meta: [
      { title: "Selagem & Bioplastia — Venutti Cosméticos" },
      { name: "description", content: "Alisamento natural sem formol com brilho espelhado." },
    ],
  }),
  component: () => (
    <SiteLayout>
      <SelagemFeature />
      <div className="container-x py-20">
        <h2 className="mb-10 font-display text-3xl">Toda a linha de Selagem</h2>
        <div className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
          {byCategory("progressivas").map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      </div>
    </SiteLayout>
  ),
});
