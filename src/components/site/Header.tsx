import { Link } from "@tanstack/react-router";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useState } from "react";
import { categories } from "@/data/products";

const navItems = [
  { to: "/quem-somos", label: "Quem Somos" },
  { to: "/produtos", label: "Produtos" },
  { to: "/mais-vendidos", label: "Mais Vendidos" },
  { to: "/ofertas", label: "Ofertas" },
  { to: "/cronograma-capilar", label: "Cronograma" },
  { to: "/selagem", label: "Selagem" },
  { to: "/blog", label: "Blog" },
  { to: "/area-profissional", label: "Área Profissional" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="container-x">
        <div className="grid h-16 grid-cols-[auto_1fr_auto] items-center gap-4 md:h-20 md:grid-cols-[1fr_2fr_1fr]">
          {/* Left: mobile menu / desktop spacer */}
          <div className="flex items-center md:hidden">
            <button onClick={() => setOpen(true)} aria-label="Abrir menu">
              <Menu className="h-5 w-5" />
            </button>
          </div>

          {/* Logo */}
          <Link to="/" className="justify-self-center md:justify-self-start">
            <span className="font-display text-2xl tracking-tight md:text-3xl">
              Venutti
              <span className="ml-1 align-top text-[10px] tracking-[0.2em] text-[var(--mute)]">
                COSMÉTICOS
              </span>
            </span>
          </Link>

          {/* Center search (desktop) */}
          <div className="hidden md:flex">
            <label className="flex w-full items-center gap-3 rounded-md border border-border bg-[var(--cream)] px-4 py-2.5">
              <Search className="h-4 w-4 text-[var(--mute)]" />
              <input
                className="w-full bg-transparent text-sm outline-none placeholder:text-[var(--mute)]"
                placeholder="O que você está procurando?"
              />
            </label>
          </div>

          {/* Right icons */}
          <div className="flex items-center justify-end gap-4 text-[var(--ink)]">
            <button
              className="md:hidden"
              aria-label="Buscar"
              onClick={() => setSearchOpen((v) => !v)}
            >
              <Search className="h-5 w-5" />
            </button>
            <Link to="/login" aria-label="Conta" className="hidden md:inline">
              <User className="h-5 w-5" />
            </Link>
            <Link to="/favoritos" aria-label="Favoritos" className="hidden md:inline">
              <Heart className="h-5 w-5" />
            </Link>
            <Link to="/carrinho" aria-label="Carrinho" className="relative">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -right-2 -top-2 grid h-4 w-4 place-items-center rounded-full bg-[var(--moss)] text-[10px] font-medium text-white">
                0
              </span>
            </Link>
          </div>
        </div>

        {/* Mobile search bar */}
        {searchOpen && (
          <div className="pb-3 md:hidden">
            <label className="flex w-full items-center gap-3 rounded-md border border-border bg-[var(--cream)] px-4 py-2.5">
              <Search className="h-4 w-4 text-[var(--mute)]" />
              <input
                autoFocus
                className="w-full bg-transparent text-sm outline-none placeholder:text-[var(--mute)]"
                placeholder="O que você está procurando?"
              />
            </label>
          </div>
        )}

        {/* Desktop nav */}
        <nav className="hidden border-t border-border md:block">
          <ul className="flex items-center justify-center gap-8 py-3">
            {navItems.map((item) => (
              <li key={item.to} className="group relative">
                <Link
                  to={item.to}
                  className="eyebrow !text-[var(--ink)] transition-colors hover:!text-[var(--moss)]"
                  activeProps={{ className: "!text-[var(--moss)]" }}
                >
                  {item.label}
                </Link>
                {item.to === "/produtos" && (
                  <div className="invisible absolute left-1/2 top-full z-50 mt-2 w-56 -translate-x-1/2 rounded-md border border-border bg-white p-3 opacity-0 shadow-lg transition group-hover:visible group-hover:opacity-100">
                    {categories.map((c) => (
                      <Link
                        key={c.slug}
                        to="/produtos"
                        search={{ cat: c.slug }}
                        className="block rounded px-3 py-2 text-sm text-[var(--ink)] hover:bg-[var(--cream)]"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-[82%] max-w-sm overflow-y-auto bg-white p-6">
            <div className="flex items-center justify-between">
              <span className="font-display text-2xl">Venutti</span>
              <button onClick={() => setOpen(false)} aria-label="Fechar">
                <X className="h-5 w-5" />
              </button>
            </div>
            <ul className="mt-8 space-y-1">
              {navItems.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="block border-b border-border py-3 text-sm font-medium text-[var(--ink)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex gap-4 text-sm text-[var(--mute)]">
              <Link to="/login" onClick={() => setOpen(false)}>Conta</Link>
              <Link to="/favoritos" onClick={() => setOpen(false)}>Favoritos</Link>
            </div>
          </aside>
        </div>
      )}
    </header>
  );
}
