import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/data/products";
import { ProductCard } from "./ProductCard";

export function ProductCarousel({ products }: { products: Product[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={ref}
        className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 md:mx-0 md:px-0"
      >
        {products.map((p) => (
          <div
            key={p.slug}
            className="w-[70%] shrink-0 snap-start sm:w-[45%] md:w-[30%] lg:w-[23%]"
          >
            <ProductCard product={p} />
          </div>
        ))}
      </div>
      <div className="mt-6 hidden justify-end gap-2 md:flex">
        <button
          onClick={() => scroll(-1)}
          aria-label="Anterior"
          className="grid h-10 w-10 place-items-center rounded-full border border-[var(--ink)]/15 transition hover:bg-[var(--ink)] hover:text-white"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          onClick={() => scroll(1)}
          aria-label="Próximo"
          className="grid h-10 w-10 place-items-center rounded-full border border-[var(--ink)]/15 transition hover:bg-[var(--ink)] hover:text-white"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
