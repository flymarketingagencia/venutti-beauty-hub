import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Heart, Minus, Plus, Star, Truck } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ProductCard } from "@/components/site/ProductCard";
import { findProduct, products } from "@/data/products";
import { brl, parcel } from "@/lib/format";

export const Route = createFileRoute("/produto/$slug")({
  loader: ({ params }) => {
    const product = findProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  notFoundComponent: () => (
    <SiteLayout>
      <div className="container-x py-24 text-center">
        <h1 className="font-display text-4xl">Produto não encontrado</h1>
        <Link to="/produtos" className="btn-primary mt-6 inline-flex">Ver catálogo</Link>
      </div>
    </SiteLayout>
  ),
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — Venutti Cosméticos` },
          { name: "description", content: loaderData.product.tagline },
          { property: "og:title", content: loaderData.product.name },
          { property: "og:description", content: loaderData.product.tagline },
          { property: "og:image", content: loaderData.product.image },
        ]
      : [],
  }),
  component: ProductPage,
});

const tabs = ["Benefícios", "Modo de uso", "Ativos", "Indicação", "Resultados"] as const;

function ProductPage() {
  const { product } = Route.useLoaderData();
  const [mainImg, setMainImg] = useState(product.gallery[0]);
  const [qty, setQty] = useState(1);
  const [openTab, setOpenTab] = useState<string | null>("Benefícios");
  const [cep, setCep] = useState("");
  const [shipping, setShipping] = useState<string | null>(null);

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const related = products.filter((p) => p.slug !== product.slug && p.category === product.category).slice(0, 4);

  const calcShipping = () => {
    if (!cep || cep.replace(/\D/g, "").length < 8) {
      setShipping("Digite um CEP válido.");
      return;
    }
    const total = product.price * qty;
    if (total >= 249.9)
      setShipping("✓ Você ganhou frete grátis para sua região (Sudeste)!");
    else
      setShipping(`Faltam ${brl(249.9 - total)} para o frete grátis no Sudeste.`);
  };

  return (
    <SiteLayout>
      <div className="container-x py-6 text-xs text-[var(--mute)]">
        <Link to="/">Início</Link> / <Link to="/produtos">Produtos</Link> /{" "}
        <span className="text-[var(--ink)]">{product.name}</span>
      </div>

      <section className="container-x grid gap-10 pb-16 md:grid-cols-2 md:gap-16">
        {/* Gallery */}
        <div className="grid grid-cols-[80px_1fr] gap-4">
          <div className="flex flex-col gap-3">
            {product.gallery.map((g: string, i: number) => (
              <button
                key={i}
                onClick={() => setMainImg(g)}
                className={`aspect-square overflow-hidden border ${
                  mainImg === g ? "border-[var(--ink)]" : "border-transparent"
                }`}
              >
                <img src={g} alt="" className="h-full w-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
          <div className="relative aspect-square overflow-hidden bg-[var(--cream)]">
            {discount > 0 && (
              <span className="absolute left-4 top-4 z-10 rounded-sm bg-[var(--ink)] px-2.5 py-1 text-[10px] font-medium tracking-[0.15em] text-white">
                -{discount}%
              </span>
            )}
            <img src={mainImg} alt={product.name} className="h-full w-full object-cover" />
          </div>
        </div>

        {/* Info */}
        <div>
          <p className="eyebrow">{product.category.replace("-", " ")}</p>
          <h1 className="mt-3 font-display text-3xl leading-tight md:text-5xl">{product.name}</h1>
          <p className="mt-3 text-[var(--mute)]">{product.tagline}</p>

          <div className="mt-4 flex items-center gap-2 text-sm">
            <div className="flex text-[var(--moss)]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < Math.round(product.rating) ? "fill-current" : ""}`} />
              ))}
            </div>
            <span className="text-[var(--mute)]">{product.rating.toFixed(1)} ({product.reviews} avaliações)</span>
          </div>

          <div className="mt-8 flex items-baseline gap-3">
            {product.oldPrice && (
              <span className="text-sm text-[var(--mute)] line-through">{brl(product.oldPrice)}</span>
            )}
            <span className="font-display text-4xl text-[var(--ink)]">{brl(product.price)}</span>
          </div>
          <p className="text-sm text-[var(--mute)]">ou {parcel(product.price)}</p>
          <p className="mt-1 text-sm text-[var(--moss)]">5% de desconto no Pix</p>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center border border-border">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-3" aria-label="Diminuir">
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="w-10 text-center text-sm">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="px-3 py-3" aria-label="Aumentar">
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
            <button className="btn-primary flex-1">Adicionar ao carrinho</button>
            <button aria-label="Favoritar" className="grid h-12 w-12 place-items-center border border-border hover:bg-[var(--cream)]">
              <Heart className="h-4 w-4" />
            </button>
          </div>

          {/* Shipping calc */}
          <div className="mt-8 border border-border p-5">
            <p className="eyebrow flex items-center gap-2">
              <Truck className="h-4 w-4 text-[var(--moss)]" /> CALCULAR FRETE
            </p>
            <div className="mt-3 flex gap-2">
              <input
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                placeholder="Seu CEP"
                className="flex-1 border border-border bg-white px-4 py-2.5 text-sm outline-none focus:border-[var(--moss)]"
              />
              <button onClick={calcShipping} className="btn-outline !py-2.5">Calcular</button>
            </div>
            {shipping && <p className="mt-3 text-sm text-[var(--ink)]">{shipping}</p>}
          </div>

          <div className="mt-6 flex items-center gap-2 text-xs text-[var(--mute)]">
            <CheckCircle2 className="h-4 w-4 text-[var(--moss)]" />
            Site 100% seguro · Pagamento criptografado
          </div>
        </div>
      </section>

      {/* Tabs accordion */}
      <section className="container-x border-t border-border py-12">
        <div className="mx-auto max-w-4xl divide-y divide-border">
          {tabs.map((t) => {
            const open = openTab === t;
            return (
              <div key={t}>
                <button
                  onClick={() => setOpenTab(open ? null : t)}
                  className="flex w-full items-center justify-between py-6 text-left"
                >
                  <span className="font-display text-2xl text-[var(--ink)]">{t}</span>
                  <Plus className={`h-5 w-5 text-[var(--moss)] transition-transform ${open ? "rotate-45" : ""}`} />
                </button>
                {open && (
                  <div className="pb-6 text-sm leading-relaxed text-[var(--mute)]">
                    {t === "Benefícios" && (
                      <ul className="space-y-2">
                        {product.benefits.map((b: string) => (
                          <li key={b} className="flex items-start gap-2">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--moss)]" /> {b}
                          </li>
                        ))}
                      </ul>
                    )}
                    {t === "Modo de uso" && <p>{product.howTo}</p>}
                    {t === "Ativos" && (
                      <ul className="space-y-1">
                        {product.actives.map((a: string) => <li key={a}>· {a}</li>)}
                      </ul>
                    )}
                    {t === "Indicação" && <p>{product.indication}</p>}
                    {t === "Resultados" && <p>{product.results}</p>}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-[var(--cream)]">
        <div className="container-x py-16">
          <h2 className="font-display text-3xl md:text-4xl">Avaliações verificadas</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {[
              { name: "Patrícia L.", text: "Cheguei a chorar de felicidade com o resultado. Vale cada centavo." },
              { name: "Renata B.", text: "Cheiro incrível e textura premium. Já é meu favorito." },
            ].map((r) => (
              <div key={r.name} className="bg-white p-6">
                <div className="flex text-[var(--moss)]">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="mt-4 text-sm text-[var(--ink)]">"{r.text}"</p>
                <p className="mt-4 flex items-center justify-between text-xs">
                  <span className="font-medium">{r.name}</span>
                  <span className="flex items-center gap-1 text-[var(--moss)]">
                    <CheckCircle2 className="h-3 w-3" /> Compra verificada
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="container-x py-20">
          <h2 className="mb-10 font-display text-3xl md:text-4xl">Você também pode gostar</h2>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {related.map((p) => <ProductCard key={p.slug} product={p} />)}
          </div>
        </section>
      )}
    </SiteLayout>
  );
}
