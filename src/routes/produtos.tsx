import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ProductCard } from "@/components/site/ProductCard";
import { byCategory, categories, type Category } from "@/data/products";

type Search = { cat?: Category | "todos" };

export const Route = createFileRoute("/produtos")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    cat: (s.cat as Search["cat"]) ?? "todos",
  }),
  head: () => ({
    meta: [
      { title: "Produtos — Venutti Cosméticos" },
      { name: "description", content: "Toda a linha Venutti: home care, progressivas, máscaras, finalizadores, cronograma e tratamento." },
    ],
  }),
  component: ProdutosPage,
});

function ProdutosPage() {
  const { cat = "todos" } = Route.useSearch();
  const list = byCategory(cat);
  const activeLabel =
    cat === "todos" ? "Todos os produtos" : categories.find((c) => c.slug === cat)?.label;

  return (
    <SiteLayout>
      <div className="bg-[var(--cream)]">
        <div className="container-x py-14 md:py-20">
          <p className="eyebrow">CATÁLOGO</p>
          <h1 className="mt-3 font-display text-4xl md:text-6xl">{activeLabel}</h1>
          <p className="mt-3 max-w-xl text-sm text-[var(--mute)]">
            Cosméticos capilares profissionais desenvolvidos para cabeleireiros e amantes do
            cuidado premium.
          </p>
        </div>
      </div>

      <div className="container-x py-10">
        <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 md:mx-0 md:flex-wrap md:justify-center md:px-0">
          <FilterChip to="todos" active={cat === "todos"}>Todos</FilterChip>
          {categories.map((c) => (
            <FilterChip key={c.slug} to={c.slug} active={cat === c.slug}>
              {c.label}
            </FilterChip>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
          {list.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}

function FilterChip({
  to,
  active,
  children,
}: {
  to: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      to="/produtos"
      search={{ cat: to }}
      className={`shrink-0 whitespace-nowrap rounded-full border px-5 py-2 text-xs font-medium uppercase tracking-[0.15em] transition ${
        active
          ? "border-[var(--ink)] bg-[var(--ink)] text-white"
          : "border-[var(--ink)]/15 text-[var(--ink)] hover:border-[var(--ink)]"
      }`}
    >
      {children}
    </Link>
  );
}
