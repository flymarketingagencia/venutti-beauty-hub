import { Link } from "@tanstack/react-router";
import p1 from "@/assets/product-1.jpg";
import p2 from "@/assets/product-2.jpg";
import p3 from "@/assets/product-3.jpg";
import p4 from "@/assets/product-4.jpg";

const cats = [
  { slug: "progressivas", label: "Progressivas", image: p2 },
  { slug: "mascaras", label: "Máscaras", image: p1 },
  { slug: "home-care", label: "Home Care", image: p3 },
  { slug: "finalizadores", label: "Finalizadores", image: p4 },
];

export function CategoryGrid() {
  return (
    <section className="container-x py-20 md:py-24">
      <div className="grid gap-4 md:grid-cols-4">
        {cats.map((c) => (
          <Link
            key={c.slug}
            to="/produtos"
            search={{ cat: c.slug }}
            className="group relative aspect-[3/4] overflow-hidden bg-[var(--cream)]"
          >
            <img src={c.image} alt={c.label} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <p className="eyebrow !text-white/80">CATEGORIA</p>
              <p className="mt-1 font-display text-2xl text-white">{c.label}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
