import { useState } from "react";
import { Plus } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const items = [
  {
    q: "Quais são as formas de pagamento?",
    a: "Aceitamos cartão de crédito em até 6x sem juros, Pix com 5% de desconto e boleto bancário.",
  },
  {
    q: "Como funciona o frete grátis?",
    a: "Sudeste: acima de R$ 249,90. Sul e Centro-Oeste: acima de R$ 349,90. Nordeste e Norte: acima de R$ 449,90.",
  },
  {
    q: "Em quanto tempo recebo meu pedido?",
    a: "Entre 2 e 8 dias úteis após a confirmação do pagamento, dependendo da sua região.",
  },
  {
    q: "Os produtos são aprovados pela Anvisa?",
    a: "Sim. Todos os nossos cosméticos possuem registro ou notificação na Anvisa e seguem padrões internacionais de qualidade.",
  },
  {
    q: "Posso trocar ou devolver um produto?",
    a: "Sim. Você tem até 7 dias após o recebimento para arrependimento, conforme o Código de Defesa do Consumidor.",
  },
  {
    q: "Sou cabeleireiro(a). Como acesso preços de atacado?",
    a: "Cadastre-se na Área Profissional com seu CNPJ. Após aprovação, você terá acesso à tabela exclusiva.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="container-x py-20 md:py-28">
      <SectionHeading eyebrow="DÚVIDAS FREQUENTES" title="Como podemos ajudar?" />
      <div className="mx-auto max-w-3xl divide-y divide-border border-y border-border">
        {items.map((it, idx) => (
          <button
            key={idx}
            onClick={() => setOpen(open === idx ? null : idx)}
            className="flex w-full flex-col py-6 text-left"
          >
            <div className="flex items-center justify-between gap-6">
              <span className="font-display text-lg text-[var(--ink)] md:text-xl">{it.q}</span>
              <Plus
                className={`h-5 w-5 shrink-0 text-[var(--moss)] transition-transform ${
                  open === idx ? "rotate-45" : ""
                }`}
              />
            </div>
            <div
              className={`grid transition-all duration-300 ${
                open === idx ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <p className="overflow-hidden text-sm leading-relaxed text-[var(--mute)]">{it.a}</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
