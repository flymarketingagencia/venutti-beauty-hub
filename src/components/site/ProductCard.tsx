import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import type { Product } from "@/data/products";
import { brl, parcel } from "@/lib/format";

export function ProductCard({ product }: { product: Product }) {
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  return (
    <Link
      to="/produto/$slug"
      params={{ slug: product.slug }}
      className="group flex flex-col"
    >
      <div className="relative aspect-square overflow-hidden bg-[var(--cream)]">
        {discount > 0 && (
          <span className="absolute left-3 top-3 z-10 rounded-sm bg-[var(--ink)] px-2 py-1 text-[10px] font-medium tracking-[0.15em] text-white">
            -{discount}%
          </span>
        )}
        {product.freeShipping && (
          <span className="absolute right-3 top-3 z-10 rounded-sm bg-[var(--moss)] px-2 py-1 text-[10px] font-medium tracking-[0.15em] text-white">
            FRETE GRÁTIS
          </span>
        )}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="mt-4 flex flex-col gap-1.5">
        <div className="flex items-center gap-1 text-xs text-[var(--mute)]">
          <Star className="h-3 w-3 fill-[var(--moss)] text-[var(--moss)]" />
          <span>{product.rating.toFixed(1)}</span>
          <span>({product.reviews})</span>
        </div>
        <h3 className="font-display text-lg leading-tight text-[var(--ink)]">{product.name}</h3>
        <div className="mt-1 flex items-baseline gap-2">
          {product.oldPrice && (
            <span className="text-xs text-[var(--mute)] line-through">{brl(product.oldPrice)}</span>
          )}
          <span className="text-base font-medium text-[var(--ink)]">{brl(product.price)}</span>
        </div>
        <p className="text-xs text-[var(--mute)]">{parcel(product.price)}</p>
      </div>
    </Link>
  );
}
