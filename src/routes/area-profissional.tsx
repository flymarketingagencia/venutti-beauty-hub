import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Lock } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/area-profissional")({
  head: () => ({
    meta: [
      { title: "Área Profissional — Venutti Cosméticos" },
      { name: "description", content: "Cabeleireiros e salões: acesso a preços diferenciados e kits exclusivos." },
    ],
  }),
  component: AreaProf,
});

function AreaProf() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", cnpj: "", address: "", phone: "" });

  const validCnpj = form.cnpj.replace(/\D/g, "").length === 14;
  const valid = form.name && validCnpj && form.address && form.phone;

  return (
    <SiteLayout>
      <section className="bg-[var(--ink)] text-white">
        <div className="container-x grid items-center gap-10 py-16 md:grid-cols-2 md:py-24">
          <div>
            <p className="eyebrow !text-white/70">EXCLUSIVO PARA PROFISSIONAIS</p>
            <h1 className="mt-3 font-display text-4xl text-white md:text-6xl">
              Cabeleireiros: o cuidado Venutti com preço de atacado.
            </h1>
            <p className="mt-5 max-w-md text-white/80">
              Cadastre seu salão com CNPJ e tenha acesso a preços diferenciados, kits exclusivos
              e política comercial própria para profissionais.
            </p>
            <ul className="mt-8 space-y-2 text-sm">
              {[
                "Preços de atacado visíveis após login aprovado",
                "Kits profissionais exclusivos",
                "Suporte técnico dedicado",
                "Treinamentos e materiais de apoio",
              ].map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-[var(--moss)]" /> {b}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-8 text-[var(--ink)] md:p-10">
            {sent ? (
              <div className="py-10 text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-[var(--moss)]" />
                <h3 className="mt-4 font-display text-2xl">Cadastro recebido!</h3>
                <p className="mt-2 text-sm text-[var(--mute)]">
                  Nossa equipe vai analisar seus dados e entrar em contato em até 1 dia útil.
                </p>
              </div>
            ) : (
              <>
                <p className="eyebrow flex items-center gap-2">
                  <Lock className="h-4 w-4 text-[var(--moss)]" /> CADASTRO PROFISSIONAL
                </p>
                <h3 className="mt-3 font-display text-2xl">Solicite seu acesso</h3>
                <form
                  className="mt-6 space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (valid) setSent(true);
                  }}
                >
                  <Field label="Nome do responsável / salão" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
                  <Field label="CNPJ" value={form.cnpj} onChange={(v) => setForm({ ...form, cnpj: v })} placeholder="00.000.000/0000-00" />
                  {form.cnpj && !validCnpj && <p className="text-xs text-destructive">CNPJ deve conter 14 dígitos.</p>}
                  <Field label="Endereço completo" value={form.address} onChange={(v) => setForm({ ...form, address: v })} />
                  <Field label="Telefone / WhatsApp" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
                  <button type="submit" disabled={!valid} className="btn-primary w-full">
                    Enviar cadastro
                  </button>
                  <p className="text-center text-xs text-[var(--mute)]">
                    Já tem acesso? <a href="#" className="text-[var(--moss)] underline">Faça login profissional</a>
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="container-x py-20 text-center">
        <p className="eyebrow">CATÁLOGO PROFISSIONAL</p>
        <h2 className="mt-3 font-display text-3xl md:text-5xl">
          Faça login profissional para ver os preços de atacado.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm text-[var(--mute)]">
          Os preços diferenciados e os kits exclusivos só ficam visíveis após o seu cadastro
          ser aprovado pela nossa equipe comercial.
        </p>
      </section>
    </SiteLayout>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="eyebrow !text-[var(--ink)]">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full border border-border bg-white px-4 py-3 text-sm outline-none focus:border-[var(--moss)]"
      />
    </label>
  );
}
