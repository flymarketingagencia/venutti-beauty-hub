import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Hero } from "@/components/site/Hero";
import { Benefits } from "@/components/site/Benefits";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ProductCarousel } from "@/components/site/ProductCarousel";
import { SelagemFeature } from "@/components/site/SelagemFeature";
import { CronogramaBlock } from "@/components/site/CronogramaBlock";
import { CategoryGrid } from "@/components/site/CategoryGrid";
import { Reviews } from "@/components/site/Reviews";
import { Faq } from "@/components/site/Faq";
import { bestsellers } from "@/data/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Venutti Cosméticos — Cosméticos capilares profissionais" },
      {
        name: "description",
        content:
          "Progressivas sem formol, máscaras, cronograma capilar e finalizadores. 15 anos de mercado profissional.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SiteLayout>
      <Hero />
      <Benefits />

      <section className="container-x py-20 md:py-28">
        <SectionHeading
          eyebrow="OS MAIS VENDIDOS"
          title="Os queridinhos da casa"
          description="O cuidado capilar profissional que conquistou cabeleireiros e clientes em todo o Brasil."
          align="left"
          action={
            <Link to="/mais-vendidos" className="btn-outline hidden md:inline-flex">
              Ver todos
            </Link>
          }
        />
        <ProductCarousel products={bestsellers()} />
      </section>

      <SelagemFeature />
      <CronogramaBlock />
      <CategoryGrid />
      <Reviews />
      <Faq />
    </SiteLayout>
  );
}
