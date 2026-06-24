import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/favoritos")({
  head: () => ({ meta: [{ title: "Favoritos — Venutti Cosméticos" }] }),
  component: () => (
    <SiteLayout>
      <div className="container-x py-24 text-center">
        <h1 className="font-display text-4xl">Seus favoritos</h1>
        <p className="mt-3 text-sm text-[var(--mute)]">Você ainda não favoritou nenhum produto.</p>
      </div>
    </SiteLayout>
  ),
});
