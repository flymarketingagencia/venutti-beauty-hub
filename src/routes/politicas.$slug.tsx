import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/politicas/$slug")({
  head: () => ({ meta: [{ title: "Políticas — Venutti Cosméticos" }] }),
  component: () => {
    const { slug } = Route.useParams();
    const titleMap: Record<string, string> = {
      trocas: "Trocas e Devoluções",
      entrega: "Política de Entrega",
      privacidade: "Política de Privacidade",
      "como-comprar": "Como Comprar",
      pagamento: "Formas de Pagamento",
      anvisa: "Anvisa",
    };
    return (
      <SiteLayout>
        <article className="container-x mx-auto max-w-3xl py-20">
          <p className="eyebrow">INSTITUCIONAL</p>
          <h1 className="mt-3 font-display text-4xl md:text-5xl">{titleMap[slug] ?? "Política"}</h1>
          <div className="mt-8 space-y-4 text-sm leading-relaxed text-[var(--mute)]">
            <p>
              Esta página contém as informações oficiais da Venutti Cosméticos sobre o tópico
              selecionado. Para dúvidas adicionais, fale com nosso atendimento via WhatsApp.
            </p>
            <p>
              Conteúdo institucional completo será adicionado em breve. Em caso de urgência,
              entre em contato pelos canais disponíveis no rodapé.
            </p>
          </div>
        </article>
      </SiteLayout>
    );
  },
});
