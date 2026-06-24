import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ShoppingBag } from "lucide-react";

export const Route = createFileRoute("/carrinho")({
  head: () => ({ meta: [{ title: "Carrinho — Venutti Cosméticos" }] }),
  component: () => (
    <SiteLayout>
      <div className="container-x py-24 text-center">
        <ShoppingBag className="mx-auto h-10 w-10 text-[var(--moss)]" strokeWidth={1.2} />
        <h1 className="mt-6 font-display text-4xl">Seu carrinho está vazio</h1>
        <p className="mt-3 text-sm text-[var(--mute)]">
          Que tal explorar nossos mais vendidos?
        </p>
        <Link to="/mais-vendidos" className="btn-primary mt-8 inline-flex">Ver produtos</Link>
      </div>
    </SiteLayout>
  ),
});
