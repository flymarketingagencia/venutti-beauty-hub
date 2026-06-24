import p1 from "@/assets/product-1.jpg";
import p2 from "@/assets/product-2.jpg";
import p3 from "@/assets/product-3.jpg";
import p4 from "@/assets/product-4.jpg";

export type Category =
  | "home-care"
  | "progressivas"
  | "mascaras"
  | "finalizadores"
  | "cronograma"
  | "tratamento";

export const categories: { slug: Category; label: string }[] = [
  { slug: "home-care", label: "Home Care" },
  { slug: "progressivas", label: "Progressivas" },
  { slug: "mascaras", label: "Máscaras" },
  { slug: "finalizadores", label: "Finalizadores" },
  { slug: "cronograma", label: "Cronograma" },
  { slug: "tratamento", label: "Tratamento" },
];

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  category: Category;
  image: string;
  gallery: string[];
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  bestseller?: boolean;
  freeShipping?: boolean;
  benefits: string[];
  howTo: string;
  actives: string[];
  indication: string;
  results: string;
  faq: { q: string; a: string }[];
}

export const products: Product[] = [
  {
    slug: "bioplastia-capilar-venutti",
    name: "Bioplastia Capilar Venutti",
    tagline: "Selagem sem formol — alisamento natural com brilho espelhado",
    category: "progressivas",
    image: p2,
    gallery: [p2, p3, p1, p4],
    price: 289.9,
    oldPrice: 389.9,
    rating: 4.9,
    reviews: 482,
    bestseller: true,
    freeShipping: true,
    benefits: [
      "Reduz até 95% do volume",
      "0% formol — seguro e aprovado pela Anvisa",
      "Brilho intenso desde a primeira aplicação",
      "Resultado duradouro de até 4 meses",
    ],
    howTo:
      "Lave os fios com Shampoo Anti-Resíduo Venutti, seque 100%, divida em mechas finas e aplique a Bioplastia mecha a mecha. Deixe agir por 40 minutos, enxágue parcialmente, seque e prancheie em mechas finas a 200°C.",
    actives: [
      "Ácido Glioxílico vegetal",
      "Queratina hidrolisada",
      "Óleo de argan e murumuru",
      "D-Pantenol",
    ],
    indication:
      "Indicado para todos os tipos de cabelos — de ondulados a crespos — incluindo cabelos com química anterior.",
    results:
      "Fios alinhados, leves, com movimento natural e brilho premium. Reduz quebra e frizz por até 16 semanas.",
    faq: [
      { q: "Contém formol?", a: "Não. A fórmula é 100% livre de formol e parabenos." },
      { q: "Pode ser usado em cabelos descoloridos?", a: "Sim, com avaliação prévia do fio." },
      { q: "Quantas aplicações rende?", a: "Aproximadamente 3 aplicações em cabelos médios." },
    ],
  },
  {
    slug: "mascara-reconstrutora-power-repair",
    name: "Máscara Reconstrutora Power Repair",
    tagline: "Reconstrução profunda para cabelos danificados",
    category: "mascaras",
    image: p1,
    gallery: [p1, p3, p2],
    price: 119.9,
    oldPrice: 159.9,
    rating: 4.8,
    reviews: 318,
    bestseller: true,
    freeShipping: false,
    benefits: [
      "Reposição de massa em fios quebradiços",
      "Selagem das cutículas",
      "Hidratação intensa em uma única aplicação",
      "Toque sedoso e brilho natural",
    ],
    howTo:
      "Após o shampoo, aplique 1 nozinha do produto nos comprimentos, massageie e deixe agir por 5 a 10 minutos. Enxágue.",
    actives: ["Queratina", "Aminoácidos da seda", "Manteiga de karité", "Óleo de coco"],
    indication: "Cabelos com química, ressecados, quebradiços ou com pontas duplas.",
    results: "Em 1 aplicação: +73% de força nos fios. Em 4 semanas: +5x mais maciez.",
    faq: [
      { q: "Pode usar todos os dias?", a: "Recomendamos 2x por semana." },
      { q: "É liberada para low poo?", a: "Sim, fórmula vegana e liberada." },
    ],
  },
  {
    slug: "shampoo-home-care-hidratacao",
    name: "Shampoo Home Care Hidratação",
    tagline: "Limpeza suave que preserva a hidratação",
    category: "home-care",
    image: p3,
    gallery: [p3, p1, p4],
    price: 79.9,
    rating: 4.7,
    reviews: 211,
    benefits: [
      "Limpa sem ressecar",
      "Pode ser usado diariamente",
      "Selagem desde a primeira lavagem",
      "Perfume marcante e duradouro",
    ],
    howTo: "Aplique no couro cabeludo úmido, massageie e enxágue. Repita se necessário.",
    actives: ["Pantenol", "Glicerina vegetal", "Óleo de jojoba"],
    indication: "Todos os tipos de cabelo, especialmente ressecados e com química.",
    results: "Fios limpos, macios e mais fáceis de pentear.",
    faq: [{ q: "Tem sulfato?", a: "Não. Fórmula low poo." }],
  },
  {
    slug: "leave-in-thermo-shield",
    name: "Leave-in Thermo Shield",
    tagline: "Proteção térmica até 230°C com toque seda",
    category: "finalizadores",
    image: p4,
    gallery: [p4, p2, p1],
    price: 89.9,
    oldPrice: 109.9,
    rating: 4.9,
    reviews: 256,
    freeShipping: false,
    benefits: [
      "Proteção térmica até 230°C",
      "Antifrizz por até 72h",
      "Brilho instantâneo",
      "Não pesa nos fios",
    ],
    howTo: "Borrife nos fios úmidos antes da escova, prancha ou secador.",
    actives: ["Silicones leves vegetais", "Óleo de argan", "Filtro UV"],
    indication: "Indispensável para quem usa calor nos fios.",
    results: "Cabelo protegido, alinhado e com aparência saudável após o uso de ferramentas.",
    faq: [{ q: "Precisa enxaguar?", a: "Não, é um leave-in." }],
  },
  {
    slug: "kit-cronograma-capilar-completo",
    name: "Kit Cronograma Capilar Completo",
    tagline: "Hidratação + Nutrição + Reconstrução em 4 semanas",
    category: "cronograma",
    image: p1,
    gallery: [p1, p2, p3, p4],
    price: 349.9,
    oldPrice: 459.9,
    rating: 5.0,
    reviews: 612,
    bestseller: true,
    freeShipping: true,
    benefits: [
      "4 etapas balanceadas para a saúde do fio",
      "Resultado visível em 30 dias",
      "Kit econômico vs. compra avulsa",
      "Guia de cronograma incluso",
    ],
    howTo: "Siga o guia incluso: 1 etapa por semana, ciclo de 4 semanas.",
    actives: ["Queratina", "D-Pantenol", "Óleo de argan", "Ceramidas"],
    indication: "Cabelos cansados, quimicamente tratados ou em manutenção.",
    results: "Fios fortes, brilhantes e com movimento natural ao final do ciclo.",
    faq: [{ q: "O que vem no kit?", a: "Shampoo, Hidratação, Nutrição e Reconstrução, 300ml cada." }],
  },
  {
    slug: "mascara-nutritiva-argan-gold",
    name: "Máscara Nutritiva Argan Gold",
    tagline: "Nutrição profunda com óleos nobres",
    category: "mascaras",
    image: p1,
    gallery: [p1, p4],
    price: 99.9,
    oldPrice: 129.9,
    rating: 4.8,
    reviews: 187,
    benefits: ["Reposição de lipídios", "Maciez instantânea", "Brilho dourado"],
    howTo: "Aplicar nos fios úmidos, deixar agir por 10 minutos e enxaguar.",
    actives: ["Óleo de argan", "Manteiga de murumuru", "Vitamina E"],
    indication: "Cabelos secos, opacos e sem brilho.",
    results: "Fios nutridos, macios e brilhantes.",
    faq: [{ q: "Posso intercalar com a Power Repair?", a: "Sim, alternar é o ideal no cronograma." }],
  },
  {
    slug: "oleo-finalizador-glass-effect",
    name: "Óleo Finalizador Glass Effect",
    tagline: "Efeito vidro instantâneo com toque seco",
    category: "finalizadores",
    image: p2,
    gallery: [p2, p4],
    price: 69.9,
    rating: 4.7,
    reviews: 142,
    benefits: ["Brilho espelhado", "Sela pontas", "Não pesa", "Antifrizz"],
    howTo: "Aplique 2 a 3 gotas nas pontas dos fios secos.",
    actives: ["Óleo de argan", "Silicones leves", "Vitamina E"],
    indication: "Todos os tipos de fios, especialmente alisados e quimicamente tratados.",
    results: "Acabamento brilhante e disciplinado em segundos.",
    faq: [{ q: "Pode usar no cabelo úmido?", a: "Sim, antes da escova." }],
  },
  {
    slug: "ampola-shock-tratamento",
    name: "Ampola Shock Tratamento Intensivo",
    tagline: "SOS para fios em emergência",
    category: "tratamento",
    image: p3,
    gallery: [p3, p1],
    price: 39.9,
    oldPrice: 49.9,
    rating: 4.9,
    reviews: 98,
    benefits: ["Resgate imediato", "Resultado em 5 minutos", "Reposição de massa"],
    howTo: "Aplique a ampola após o shampoo, massageie por 3 a 5 minutos e enxágue.",
    actives: ["Queratina concentrada", "Aminoácidos", "Pantenol"],
    indication: "Cabelos extremamente danificados, quebradiços ou descoloridos.",
    results: "Recuperação visível em uma única aplicação.",
    faq: [{ q: "Pode usar toda semana?", a: "Sim, como reforço do cronograma." }],
  },
];

export const findProduct = (slug: string) => products.find((p) => p.slug === slug);
export const byCategory = (cat: Category | "todos") =>
  cat === "todos" ? products : products.filter((p) => p.category === cat);
export const bestsellers = () => products.filter((p) => p.bestseller);
export const onSale = () => products.filter((p) => p.oldPrice);
