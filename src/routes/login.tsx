import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Login — Venutti Cosméticos" }] }),
  component: () => (
    <SiteLayout>
      <section className="container-x grid gap-10 py-20 md:grid-cols-2 md:gap-16 md:py-28">
        <div>
          <p className="eyebrow">SUA CONTA</p>
          <h1 className="mt-3 font-display text-4xl md:text-5xl">Bem-vindo de volta.</h1>
          <form className="mt-8 space-y-4 max-w-md">
            <input placeholder="E-mail" className="w-full border border-border bg-white px-4 py-3 text-sm outline-none focus:border-[var(--moss)]" />
            <input type="password" placeholder="Senha" className="w-full border border-border bg-white px-4 py-3 text-sm outline-none focus:border-[var(--moss)]" />
            <button className="btn-primary w-full">Entrar</button>
            <p className="text-xs text-[var(--mute)]">Esqueceu a senha? <a href="#" className="text-[var(--moss)] underline">Recuperar</a></p>
          </form>
        </div>
        <div className="bg-[var(--cream)] p-8 md:p-12">
          <p className="eyebrow">NOVO POR AQUI?</p>
          <h2 className="mt-3 font-display text-3xl">Crie sua conta Venutti</h2>
          <p className="mt-3 text-sm text-[var(--mute)]">
            Cadastre-se para acompanhar pedidos, salvar favoritos e receber novidades em primeira mão.
          </p>
          <Link to="/login" className="btn-outline mt-6 inline-flex">Criar conta</Link>
          <div className="mt-10 border-t border-[var(--ink)]/10 pt-6">
            <p className="text-sm font-medium text-[var(--ink)]">Você é cabeleireiro(a)?</p>
            <p className="mt-1 text-sm text-[var(--mute)]">Acesse preços de atacado pela Área Profissional.</p>
            <Link to="/area-profissional" className="mt-3 inline-block text-sm text-[var(--moss)] underline">
              Cadastro profissional →
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  ),
});
