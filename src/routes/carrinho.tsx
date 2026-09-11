import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  BadgeCheck,
  Banknote,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  CircleUserRound,
  Copy,
  CreditCard,
  FileText,
  Headphones,
  LoaderCircle,
  LockKeyhole,
  MapPin,
  Minus,
  PackageCheck,
  Plus,
  QrCode,
  ShieldCheck,
  ShoppingBag,
  Star,
  TicketCheck,
  Trash2,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import logoAsset from "@/assets/logo-venutti-preta.png.asset.json";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import { brl } from "@/lib/format";

export const Route = createFileRoute("/carrinho")({
  head: () => ({
    meta: [
      { title: "Checkout seguro — Venutti Cosméticos" },
      { name: "description", content: "Finalize sua compra Venutti com segurança." },
      { property: "og:title", content: "Checkout seguro — Venutti Cosméticos" },
      { property: "og:description", content: "Finalize sua compra Venutti com segurança." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: CheckoutPage,
});

type Payment = "pix" | "credit" | "boleto";
type ShippingId = "pac" | "sedex" | "carrier";
type FieldName = "email" | "name" | "cpf" | "phone";

type CartItem = {
  id: string;
  name: string;
  variant: string;
  price: number;
  image: string;
  qty: number;
  offer?: boolean;
};

const initialItems: CartItem[] = [
  { id: "kit", name: "Kit Cronograma Capilar Completo", variant: "Kit · 4 produtos de 300 ml", price: 349.9, image: product1, qty: 1 },
  { id: "leavein", name: "Leave-in Thermo Shield", variant: "Frasco · 200 ml", price: 89.9, image: product4, qty: 1 },
];

const offers = [
  { id: "argan", name: "Máscara Argan Gold", benefit: "Nutrição e brilho para completar sua rotina", oldPrice: 129.9, price: 79.9, image: product2 },
  { id: "ampola", name: "Ampola Shock Tratamento", benefit: "Resgate imediato dos fios em 5 minutos", oldPrice: 49.9, price: 29.9, image: product3 },
];

const shippings = [
  { id: "pac" as const, name: "PAC — Correios", price: 18.9, days: "até 8 dias úteis", date: "até qua, 24/set" },
  { id: "sedex" as const, name: "SEDEX — Correios", price: 32.9, days: "até 3 dias úteis", date: "até sex, 19/set", badge: "Mais rápido" },
  { id: "carrier" as const, name: "Transportadora", price: 24.5, days: "até 5 dias úteis", date: "até seg, 22/set" },
];

const inputClass = "h-12 rounded-xl border-checkout-line bg-card px-4 shadow-none focus-visible:ring-accent";

function onlyDigits(value: string, max: number) {
  return value.replace(/\D/g, "").slice(0, max);
}

function formatCpf(value: string) {
  return onlyDigits(value, 11).replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

function formatPhone(value: string) {
  return onlyDigits(value, 11).replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2");
}

function formatCep(value: string) {
  return onlyDigits(value, 8).replace(/(\d{5})(\d)/, "$1-$2");
}

function formatCard(value: string) {
  return onlyDigits(value, 16).replace(/(\d{4})(?=\d)/g, "$1 ");
}

function formatExpiry(value: string) {
  return onlyDigits(value, 4).replace(/(\d{2})(\d)/, "$1/$2");
}

function CheckoutPage() {
  const [items, setItems] = useState(initialItems);
  const [step, setStep] = useState(1);
  const [mobileSummary, setMobileSummary] = useState(false);
  const [form, setForm] = useState({ email: "", name: "", cpf: "", phone: "" });
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [marketing, setMarketing] = useState(false);
  const [cep, setCep] = useState("");
  const [loadingCep, setLoadingCep] = useState(false);
  const [address, setAddress] = useState({ street: "", district: "", city: "", state: "", number: "", complement: "" });
  const [shipping, setShipping] = useState<ShippingId | null>(null);
  const [payment, setPayment] = useState<Payment>("pix");
  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const [cardFocus, setCardFocus] = useState<"front" | "back">("front");
  const [installments, setInstallments] = useState(1);
  const [coupon, setCoupon] = useState("");
  const [couponState, setCouponState] = useState<"idle" | "success" | "error">("idle");
  const [processing, setProcessing] = useState(false);
  const [declined, setDeclined] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [copied, setCopied] = useState<"order" | "pix" | "boleto" | null>(null);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shippingPrice = shippings.find((option) => option.id === shipping)?.price ?? 0;
  const couponDiscount = couponState === "success" ? subtotal * 0.1 : 0;
  const pixDiscount = payment === "pix" ? (subtotal - couponDiscount) * 0.05 : 0;
  const total = Math.max(0, subtotal - couponDiscount - pixDiscount + shippingPrice);
  const totalQuantity = items.reduce((sum, item) => sum + item.qty, 0);

  const validation = useMemo(() => ({
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email),
    name: form.name.trim().split(" ").length > 1,
    cpf: onlyDigits(form.cpf, 11).length === 11,
    phone: onlyDigits(form.phone, 11).length === 11,
  }), [form]);

  const dataValid = Object.values(validation).every(Boolean);
  const addressValid = Boolean(shipping && address.number && address.street);

  const updateItem = (id: string, delta: number) => {
    setItems((current) => current.map((item) => item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item));
  };

  const toggleOffer = (offer: (typeof offers)[number]) => {
    setItems((current) => current.some((item) => item.id === offer.id)
      ? current.filter((item) => item.id !== offer.id)
      : [...current, { id: offer.id, name: offer.name, variant: "Oferta exclusiva do checkout", price: offer.price, image: offer.image, qty: 1, offer: true }]);
  };

  const applyCoupon = () => {
    setCouponState(coupon.trim().toUpperCase() === "VENUTTI10" ? "success" : "error");
  };

  const lookupCep = (value: string) => {
    const formatted = formatCep(value);
    setCep(formatted);
    if (onlyDigits(formatted, 8).length === 8) {
      setLoadingCep(true);
      window.setTimeout(() => {
        setAddress((current) => ({ ...current, street: "Rua das Acácias", district: "Jardim Paulista", city: "São Paulo", state: "SP" }));
        setLoadingCep(false);
      }, 700);
    }
  };

  const continueData = () => {
    setTouched({ email: true, name: true, cpf: true, phone: true });
    if (dataValid) setStep(2);
  };

  const finish = () => {
    if (step < 3) return;
    if (!addressValid) {
      setStep(2);
      return;
    }
    setProcessing(true);
    setDeclined(false);
    window.setTimeout(() => {
      setProcessing(false);
      if (payment === "credit" && onlyDigits(card.number, 16).endsWith("0000")) setDeclined(true);
      else setConfirmed(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1000);
  };

  const copyFeedback = (key: "order" | "pix" | "boleto", text: string) => {
    void navigator.clipboard?.writeText(text);
    setCopied(key);
    window.setTimeout(() => setCopied(null), 1800);
  };

  if (confirmed) {
    return <Confirmation payment={payment} items={items} total={total} name={form.name || "cliente"} address={address} shipping={shipping} copied={copied} onCopy={copyFeedback} />;
  }

  return (
    <div className="min-h-screen bg-checkout-bg pb-24 text-foreground lg:pb-0">
      <CheckoutHeader step={step} />

      <button
        type="button"
        onClick={() => setMobileSummary((open) => !open)}
        className="grid min-h-14 w-full grid-cols-[minmax(0,1fr)_auto] items-center border-b border-checkout-line bg-card px-5 text-left lg:hidden"
        aria-expanded={mobileSummary}
      >
        <span className="flex min-w-0 items-center gap-2 text-sm font-semibold text-accent">
          <ShoppingBag className="h-4 w-4 shrink-0" /> Ver resumo do pedido {mobileSummary ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </span>
        <strong className="shrink-0 text-sm">{brl(total)}</strong>
      </button>
      {mobileSummary && <div className="border-b border-checkout-line bg-card px-4 py-5 lg:hidden"><OrderSummary {...{ items, total, subtotal, shippingPrice, shipping, coupon, setCoupon, couponState, applyCoupon, couponDiscount, pixDiscount, payment, updateItem }} /></div>}

      <main className="mx-auto grid w-full max-w-[1240px] gap-8 px-4 py-7 sm:px-6 lg:grid-cols-[minmax(0,1.42fr)_minmax(360px,0.88fr)] lg:items-start lg:px-8 lg:py-12">
        <div className="min-w-0 space-y-5">
          <CheckoutSection number="1" title="Seus dados" subtitle="Não precisa criar conta. Leva menos de 3 minutos." open={step === 1} complete={step > 1} onEdit={() => setStep(1)} summary={form.name ? `${form.name} · ${form.email} · ${form.phone}` : ""}>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="checkout-email" label="E-mail" value={form.email} onChange={(value) => setForm({ ...form, email: value })} onBlur={() => setTouched({ ...touched, email: true })} valid={validation.email} touched={touched.email} error="Confere o e-mail? Parece que falta alguma coisa." type="email" autoComplete="email" />
              <Field id="checkout-name" label="Nome completo" value={form.name} onChange={(value) => setForm({ ...form, name: value })} onBlur={() => setTouched({ ...touched, name: true })} valid={validation.name} touched={touched.name} error="Digite seu nome e sobrenome." autoComplete="name" />
              <Field id="checkout-cpf" label="CPF" value={form.cpf} onChange={(value) => setForm({ ...form, cpf: formatCpf(value) })} onBlur={() => setTouched({ ...touched, cpf: true })} valid={validation.cpf} touched={touched.cpf} error="Confere o CPF? Parece que falta um número." inputMode="numeric" autoComplete="off" help="Usamos para emitir sua nota fiscal." />
              <Field id="checkout-phone" label="Celular / WhatsApp" value={form.phone} onChange={(value) => setForm({ ...form, phone: formatPhone(value) })} onBlur={() => setTouched({ ...touched, phone: true })} valid={validation.phone} touched={touched.phone} error="Digite o celular com DDD." inputMode="tel" autoComplete="tel" />
            </div>
            <label className="mt-5 flex min-h-12 cursor-pointer items-start gap-3 text-sm leading-relaxed text-muted-foreground">
              <Checkbox checked={marketing} onCheckedChange={(checked) => setMarketing(checked === true)} className="mt-1 h-5 w-5 rounded" />
              Quero receber novidades e ofertas exclusivas por e-mail e WhatsApp.
            </label>
            <Button onClick={continueData} className="mt-4 h-13 w-full rounded-xl bg-accent text-accent-foreground hover:bg-accent/90">Continuar para entrega</Button>
          </CheckoutSection>

          <CheckoutSection number="2" title="Entrega" open={step === 2} complete={step > 2} locked={step < 2} onEdit={() => setStep(2)} summary={shipping ? `${address.street}, ${address.number} · ${shippings.find((item) => item.id === shipping)?.name}` : ""}>
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-3">
              <div>
                <label htmlFor="cep" className="mb-2 block text-sm font-medium">CEP</label>
                <div className="relative">
                  <Input id="cep" value={cep} onChange={(event) => lookupCep(event.target.value)} inputMode="numeric" autoComplete="postal-code" className={inputClass} />
                  {loadingCep && <LoaderCircle className="absolute right-4 top-3.5 h-5 w-5 animate-spin text-accent" />}
                </div>
              </div>
              <a href="https://buscacepinter.correios.com.br/" target="_blank" rel="noreferrer" className="mb-3 text-xs font-semibold text-accent underline underline-offset-4">Não sei meu CEP</a>
            </div>
            {loadingCep && <ShippingSkeleton />}
            {address.street && !loadingCep && (
              <div className="mt-5 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="grid gap-4 sm:grid-cols-6">
                  <div className="sm:col-span-4"><SimpleField label="Rua" value={address.street} onChange={(value) => setAddress({ ...address, street: value })} autoComplete="address-line1" /></div>
                  <div className="sm:col-span-2"><SimpleField label="Número" value={address.number} onChange={(value) => setAddress({ ...address, number: value })} inputMode="numeric" autoComplete="address-line2" /></div>
                  <div className="sm:col-span-3"><SimpleField label="Complemento (opcional)" value={address.complement} onChange={(value) => setAddress({ ...address, complement: value })} /></div>
                  <div className="sm:col-span-3"><SimpleField label="Bairro" value={address.district} onChange={(value) => setAddress({ ...address, district: value })} /></div>
                  <div className="sm:col-span-4"><SimpleField label="Cidade" value={address.city} onChange={(value) => setAddress({ ...address, city: value })} autoComplete="address-level2" /></div>
                  <div className="sm:col-span-2"><SimpleField label="UF" value={address.state} onChange={(value) => setAddress({ ...address, state: value.toUpperCase().slice(0, 2) })} autoComplete="address-level1" /></div>
                </div>
                <div className="mt-4 flex gap-3 rounded-xl bg-checkout-soft p-4 text-xs leading-relaxed text-muted-foreground"><MapPin className="h-4 w-4 shrink-0 text-accent" />Confira número e complemento. Depois que o pedido é despachado, não conseguimos alterar o endereço.</div>
                <fieldset className="mt-6 space-y-3">
                  <legend className="mb-3 text-sm font-semibold">Escolha a entrega</legend>
                  {shippings.map((option) => <ShippingOption key={option.id} option={option} selected={shipping === option.id} onSelect={() => setShipping(option.id)} />)}
                </fieldset>
                <p className="mt-4 text-xs leading-relaxed text-muted-foreground">O prazo começa a contar após a aprovação do pagamento. Postamos em até 2 dias úteis.</p>
                <Button disabled={!addressValid} onClick={() => setStep(3)} className="mt-5 h-13 w-full rounded-xl bg-accent text-accent-foreground hover:bg-accent/90">Continuar para pagamento</Button>
              </div>
            )}
          </CheckoutSection>

          <CheckoutSection number="3" title="Pagamento" open={step === 3} locked={step < 3}>
            <div className="space-y-3">
              <PaymentOption id="pix" title="Pix" icon={<QrCode />} selected={payment === "pix"} onSelect={() => setPayment("pix")} badges={["Aprovação na hora", "5% OFF no Pix"]}>
                <p>O QR Code e o código copia e cola aparecem assim que você finalizar.</p>
                <strong className="mt-2 block text-lg text-success">Valor no Pix: {brl(total)}</strong>
              </PaymentOption>
              <PaymentOption id="credit" title="Cartão de crédito" icon={<CreditCard />} selected={payment === "credit"} onSelect={() => setPayment("credit")}>
                <CreditCardFields card={card} setCard={setCard} focus={cardFocus} setFocus={setCardFocus} installments={installments} setInstallments={setInstallments} total={total} />
              </PaymentOption>
              <PaymentOption id="boleto" title="Boleto bancário" icon={<Banknote />} selected={payment === "boleto"} onSelect={() => setPayment("boleto")}>
                <p>Vence em 3 dias corridos. A aprovação leva até 3 dias úteis após o pagamento — por isso o envio começa depois.</p>
              </PaymentOption>
            </div>

            {declined && <div className="mt-5 rounded-xl border border-destructive/25 bg-destructive/5 p-4 text-sm"><strong className="block text-destructive">Seu banco não aprovou o pagamento.</strong><p className="mt-1 text-muted-foreground">Confira os dados ou tente pelo Pix — é aprovado na hora.</p><Button variant="outline" onClick={() => { setPayment("pix"); setDeclined(false); }} className="mt-3 h-11 rounded-xl">Pagar com Pix</Button></div>}
            <OrderBumps items={items} onToggle={toggleOffer} />
            <FinalButton total={total} processing={processing} onClick={finish} />
          </CheckoutSection>

          <div className="lg:hidden"><Reviews /></div>
        </div>

        <aside className="hidden min-w-0 space-y-5 lg:block">
          <div className="sticky top-6 space-y-5">
            <div className="rounded-2xl border border-checkout-line bg-card p-6 shadow-checkout"><OrderSummary {...{ items, total, subtotal, shippingPrice, shipping, coupon, setCoupon, couponState, applyCoupon, couponDiscount, pixDiscount, payment, updateItem }} /></div>
            <Guarantees />
            <Reviews />
          </div>
        </aside>
      </main>

      <CheckoutFooter />
      <a href="https://wa.me/5511900000000" target="_blank" rel="noreferrer" className="fixed bottom-24 right-4 z-40 flex min-h-12 items-center gap-2 rounded-full bg-success px-4 text-sm font-semibold text-success-foreground shadow-lg lg:bottom-6 lg:right-6"><Headphones className="h-5 w-5" /> <span className="hidden sm:inline">Precisa de ajuda?</span></a>
      {step === 3 && <div className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-t border-checkout-line bg-card px-4 py-3 shadow-[0_-8px_24px_var(--checkout-shadow)] lg:hidden"><div className="min-w-0"><span className="block text-xs text-muted-foreground">Total</span><strong className="block truncate text-lg">{brl(total)}</strong></div><Button onClick={finish} disabled={processing} className="h-12 rounded-xl bg-accent px-5 text-accent-foreground hover:bg-accent/90">{processing ? <LoaderCircle className="animate-spin" /> : <LockKeyhole />} Finalizar compra</Button></div>}
    </div>
  );
}

function CheckoutHeader({ step }: { step: number }) {
  const stages = ["Sacola", "Dados", "Entrega", "Pagamento"];
  return <header className="border-b border-checkout-line bg-card"><div className="mx-auto max-w-[1240px] px-4 py-5 sm:px-6 lg:px-8"><div className="grid grid-cols-[1fr_auto_1fr] items-center"><img src={logoAsset.url} alt="Venutti Cosméticos" className="col-start-2 h-11 w-36 object-contain lg:col-start-1 lg:justify-self-start" /><div className="col-start-3 flex items-center justify-end gap-2 text-xs font-medium text-muted-foreground"><LockKeyhole className="h-4 w-4 text-accent" /><span className="hidden sm:inline">Compra 100% segura</span></div></div><ol className="mx-auto mt-5 grid max-w-2xl grid-cols-4 gap-1">{stages.map((stage, index) => { const number = index; const active = (step === 1 ? 1 : step === 2 ? 2 : 3) === number; const complete = number < (step === 1 ? 1 : step === 2 ? 2 : 3); return <li key={stage} className="relative flex flex-col items-center gap-1.5 text-center"><div className={`absolute left-0 right-0 top-3 h-px ${index === 0 ? "left-1/2" : index === 3 ? "right-1/2" : ""} bg-checkout-line`} /><span className={`relative z-10 grid h-7 w-7 place-items-center rounded-full border text-[11px] font-semibold ${active ? "border-accent bg-accent text-accent-foreground" : complete ? "border-success bg-success text-success-foreground" : "border-checkout-line bg-card text-muted-foreground"}`}>{complete ? <Check className="h-3.5 w-3.5" /> : index + 1}</span><span className={`text-[10px] sm:text-xs ${active ? "font-semibold text-accent" : "text-muted-foreground"}`}>{stage}</span></li>; })}</ol></div></header>;
}

function CheckoutSection({ number, title, subtitle, open, complete = false, locked = false, summary, onEdit, children }: { number: string; title: string; subtitle?: string; open: boolean; complete?: boolean; locked?: boolean; summary?: string; onEdit?: () => void; children: React.ReactNode }) {
  return <section className={`overflow-hidden rounded-2xl border bg-card shadow-checkout transition ${open ? "border-accent/30" : "border-checkout-line"}`}><div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 p-5 sm:p-6"><span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-semibold ${complete ? "bg-success text-success-foreground" : open ? "bg-accent text-accent-foreground" : "bg-checkout-soft text-muted-foreground"}`}>{complete ? <Check className="h-4 w-4" /> : number}</span><div className="min-w-0"><h2 className="font-sans text-lg font-semibold">{title}</h2>{open && subtitle && <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>}{!open && summary && <p className="mt-1 truncate text-xs text-muted-foreground">{summary}</p>}</div>{complete && onEdit && <Button type="button" variant="ghost" onClick={onEdit} className="h-10 px-2 text-accent">Editar</Button>}{locked && <LockKeyhole className="h-4 w-4 text-muted-foreground" />}</div><div className={`grid transition-[grid-template-rows] duration-300 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}><div className="overflow-hidden"><div className="border-t border-checkout-line px-5 py-6 sm:px-6">{children}</div></div></div></section>;
}

function Field({ id, label, value, onChange, onBlur, valid, touched, error, help, ...props }: { id: string; label: string; value: string; onChange: (value: string) => void; onBlur: () => void; valid: boolean; touched?: boolean; error: string; help?: string } & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "onBlur">) {
  return <div><label htmlFor={id} className="mb-2 block text-sm font-medium">{label}</label><div className="relative"><Input id={id} value={value} onChange={(event) => onChange(event.target.value)} onBlur={onBlur} className={`${inputClass} pr-11 ${touched && !valid ? "border-destructive focus-visible:ring-destructive" : ""}`} {...props} />{touched && valid && <CheckCircle2 className="absolute right-4 top-3.5 h-5 w-5 text-success" />}</div>{help && !touched && <p className="mt-1.5 text-xs text-muted-foreground">{help}</p>}{touched && !valid && <p className="mt-1.5 text-xs text-destructive">{error}</p>}</div>;
}

function SimpleField({ label, value, onChange, ...props }: { label: string; value: string; onChange: (value: string) => void } & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const id = `field-${label.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-")}`;
  return <div><label htmlFor={id} className="mb-2 block text-sm font-medium">{label}</label><Input id={id} value={value} onChange={(event) => onChange(event.target.value)} className={inputClass} {...props} /></div>;
}

function ShippingSkeleton() { return <div className="mt-5 space-y-3" aria-label="Calculando frete"><div className="h-12 animate-pulse rounded-xl bg-checkout-soft" /><div className="h-20 animate-pulse rounded-xl bg-checkout-soft" /><div className="h-20 animate-pulse rounded-xl bg-checkout-soft" /></div>; }

function ShippingOption({ option, selected, onSelect }: { option: (typeof shippings)[number]; selected: boolean; onSelect: () => void }) {
  return <button type="button" onClick={onSelect} className={`grid min-h-20 w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-xl border p-4 text-left transition ${selected ? "border-accent bg-checkout-soft" : "border-checkout-line hover:border-accent/40"}`}><span className={`grid h-5 w-5 place-items-center rounded-full border ${selected ? "border-accent" : "border-checkout-line"}`}>{selected && <span className="h-2.5 w-2.5 rounded-full bg-accent" />}</span><span className="min-w-0"><span className="flex flex-wrap items-center gap-2 text-sm font-semibold">{option.name}{option.badge && <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] text-accent-foreground">{option.badge}</span>}</span><span className="mt-1 block text-xs text-muted-foreground">Chega em {option.days} · Previsão: {option.date}</span></span><strong className="shrink-0 text-sm">{brl(option.price)}</strong></button>;
}

function PaymentOption({ id, title, icon, selected, onSelect, badges = [], children }: { id: Payment; title: string; icon: React.ReactNode; selected: boolean; onSelect: () => void; badges?: string[]; children: React.ReactNode }) {
  return <div className={`rounded-xl border transition ${selected ? "border-accent bg-checkout-soft/50" : "border-checkout-line"}`}><button type="button" onClick={onSelect} className="grid min-h-16 w-full grid-cols-[auto_auto_minmax(0,1fr)] items-center gap-3 p-4 text-left"><span className={`grid h-5 w-5 place-items-center rounded-full border ${selected ? "border-accent" : "border-checkout-line"}`}>{selected && <span className="h-2.5 w-2.5 rounded-full bg-accent" />}</span><span className="text-accent [&_svg]:h-5 [&_svg]:w-5">{icon}</span><span className="flex min-w-0 flex-wrap items-center gap-2"><strong className="text-sm">{title}</strong>{badges.map((badge) => <span key={badge} className="rounded-full bg-success-soft px-2 py-1 text-[10px] font-semibold text-success">{badge}</span>)}</span></button>{selected && <div className="border-t border-accent/15 p-4 text-sm text-muted-foreground animate-in fade-in duration-200">{children}</div>}</div>;
}

function CreditCardFields({ card, setCard, focus, setFocus, installments, setInstallments, total }: { card: { number: string; name: string; expiry: string; cvv: string }; setCard: (card: { number: string; name: string; expiry: string; cvv: string }) => void; focus: "front" | "back"; setFocus: (focus: "front" | "back") => void; installments: number; setInstallments: (value: number) => void; total: number }) {
  const brand = card.number.startsWith("4") ? "VISA" : card.number.startsWith("5") ? "MASTER" : "VENUTTI";
  return <div><div className="mx-auto mb-5 h-44 max-w-xs [perspective:1000px]"><div className={`relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] ${focus === "back" ? "[transform:rotateY(180deg)]" : ""}`}><div className="absolute inset-0 flex flex-col justify-between rounded-2xl bg-card-visual p-5 text-card-visual-foreground shadow-lg [backface-visibility:hidden]"><div className="flex justify-between"><CreditCard className="h-7 w-7" /><span className="text-xs font-bold">{brand}</span></div><p className="font-mono text-lg">{card.number || "•••• •••• •••• ••••"}</p><div className="grid grid-cols-[1fr_auto] gap-4 text-[10px]"><span className="truncate uppercase">{card.name || "SEU NOME"}</span><span>{card.expiry || "MM/AA"}</span></div></div><div className="absolute inset-0 rounded-2xl bg-card-visual p-5 text-card-visual-foreground shadow-lg [backface-visibility:hidden] [transform:rotateY(180deg)]"><div className="mt-4 h-9 bg-card-stripe" /><div className="mt-5 ml-auto flex h-9 w-20 items-center justify-center bg-card text-xs text-foreground">{card.cvv || "CVV"}</div></div></div></div><div className="grid gap-4 sm:grid-cols-2"><div className="sm:col-span-2"><SimpleField label="Número do cartão" value={card.number} onChange={(value) => setCard({ ...card, number: formatCard(value) })} onFocus={() => setFocus("front")} inputMode="numeric" autoComplete="cc-number" /></div><div className="sm:col-span-2"><SimpleField label="Nome impresso no cartão" value={card.name} onChange={(value) => setCard({ ...card, name: value.toUpperCase() })} onFocus={() => setFocus("front")} autoComplete="cc-name" /></div><SimpleField label="Validade" value={card.expiry} onChange={(value) => setCard({ ...card, expiry: formatExpiry(value) })} onFocus={() => setFocus("front")} inputMode="numeric" autoComplete="cc-exp" /><SimpleField label="CVV" value={card.cvv} onChange={(value) => setCard({ ...card, cvv: onlyDigits(value, 4) })} onFocus={() => setFocus("back")} inputMode="numeric" autoComplete="cc-csc" /></div><label className="mt-4 block text-sm font-medium">Parcelas</label><select value={installments} onChange={(event) => setInstallments(Number(event.target.value))} className="mt-2 h-12 w-full rounded-xl border border-checkout-line bg-card px-4 text-sm outline-none focus:border-accent">{Array.from({ length: 12 }, (_, index) => index + 1).map((count) => <option key={count} value={count}>{count}x de {brl(total / count)} sem juros</option>)}</select><div className="mt-4 flex flex-wrap gap-2">{["VISA", "MASTER", "ELO", "AMEX"].map((brandName) => <span key={brandName} className="rounded border border-checkout-line bg-card px-2 py-1 text-[10px] font-semibold text-muted-foreground">{brandName}</span>)}</div><p className="mt-3 text-[11px] text-muted-foreground">Para simular recusa, use um cartão terminado em 0000.</p></div>;
}

function OrderBumps({ items, onToggle }: { items: CartItem[]; onToggle: (offer: (typeof offers)[number]) => void }) {
  return <section className="mt-7 rounded-2xl bg-checkout-offer p-4 sm:p-5"><div className="flex items-center gap-2"><TicketCheck className="h-5 w-5 text-accent" /><h3 className="font-sans text-base font-semibold">Aproveite e leve junto — só nesta compra</h3></div><div className="mt-4 grid gap-3 sm:grid-cols-2">{offers.map((offer) => { const added = items.some((item) => item.id === offer.id); const discount = Math.round((1 - offer.price / offer.oldPrice) * 100); return <article key={offer.id} className={`rounded-xl border bg-card p-3 transition ${added ? "border-accent shadow-sm" : "border-checkout-line"}`}><div className="grid grid-cols-[72px_minmax(0,1fr)] gap-3"><img src={offer.image} alt={offer.name} className="aspect-square w-[72px] rounded-lg bg-checkout-soft object-cover" /><div className="min-w-0"><h4 className="text-sm font-semibold leading-tight">{offer.name}</h4><p className="mt-1 text-[11px] leading-snug text-muted-foreground">{offer.benefit}</p><div className="mt-2 flex flex-wrap items-center gap-2 text-xs"><span className="text-muted-foreground line-through">{brl(offer.oldPrice)}</span><strong>{brl(offer.price)}</strong><span className="rounded-full bg-success-soft px-1.5 py-0.5 font-bold text-success">-{discount}%</span></div></div></div><Button type="button" variant={added ? "outline" : "default"} onClick={() => onToggle(offer)} className={`mt-3 h-11 w-full rounded-xl ${added ? "border-accent text-accent" : "bg-accent text-accent-foreground hover:bg-accent/90"}`}>{added ? <><Check /> Adicionado · Remover</> : <><Plus /> Adicionar ao pedido</>}</Button></article>; })}</div></section>;
}

function FinalButton({ total, processing, onClick }: { total: number; processing: boolean; onClick: () => void }) {
  return <div className="mt-6 hidden lg:block"><Button onClick={onClick} disabled={processing} className="h-14 w-full rounded-xl bg-accent text-base text-accent-foreground hover:bg-accent/90">{processing ? <><LoaderCircle className="animate-spin" /> Processando…</> : <><LockKeyhole /> Finalizar compra · {brl(total)}</>}</Button><div className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground"><span className="flex items-center gap-1"><LockKeyhole className="h-3.5 w-3.5" /> Pagamento processado com segurança</span><span>·</span><span>Seus dados protegidos pela LGPD</span></div><p className="mt-3 text-center text-[11px] leading-relaxed text-muted-foreground">Ao finalizar, você concorda com nossa <Link to="/politicas/$slug" params={{ slug: "trocas" }} className="underline">Política de Trocas e Devoluções</Link> e <Link to="/politicas/$slug" params={{ slug: "privacidade" }} className="underline">Política de Privacidade</Link>.</p></div>;
}

type SummaryProps = { items: CartItem[]; total: number; subtotal: number; shippingPrice: number; shipping: ShippingId | null; coupon: string; setCoupon: (value: string) => void; couponState: "idle" | "success" | "error"; applyCoupon: () => void; couponDiscount: number; pixDiscount: number; payment: Payment; updateItem: (id: string, delta: number) => void };
function OrderSummary({ items, total, subtotal, shippingPrice, shipping, coupon, setCoupon, couponState, applyCoupon, couponDiscount, pixDiscount, payment, updateItem }: SummaryProps) {
  return <div><div className="flex items-end justify-between"><h2 className="font-display text-2xl">Seu pedido</h2><span className="text-xs text-muted-foreground">{items.reduce((sum, item) => sum + item.qty, 0)} itens</span></div><div className="mt-5 divide-y divide-checkout-line border-y border-checkout-line">{items.map((item) => <div key={item.id} className="grid grid-cols-[64px_minmax(0,1fr)_auto] gap-3 py-4 animate-in fade-in duration-300"><div className="relative"><img src={item.image} alt={item.name} className="aspect-square w-16 rounded-lg bg-checkout-soft object-cover" /><span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-foreground px-1 text-[10px] text-background">{item.qty}</span></div><div className="min-w-0"><p className="text-xs font-semibold leading-snug">{item.name}</p><p className="mt-1 text-[10px] text-muted-foreground">{item.variant}</p>{item.offer && <span className="mt-1.5 inline-block rounded-full bg-success-soft px-2 py-0.5 text-[9px] font-bold text-success">Oferta especial</span>}<div className="mt-2 flex h-8 w-24 items-center justify-between rounded-lg border border-checkout-line"><button type="button" onClick={() => updateItem(item.id, -1)} aria-label={`Diminuir ${item.name}`} className="grid h-full w-8 place-items-center"><Minus className="h-3 w-3" /></button><span className="text-xs">{item.qty}</span><button type="button" onClick={() => updateItem(item.id, 1)} aria-label={`Aumentar ${item.name}`} className="grid h-full w-8 place-items-center"><Plus className="h-3 w-3" /></button></div></div><strong className="text-xs">{brl(item.price * item.qty)}</strong></div>)}</div><div className="mt-5"><label htmlFor="coupon" className="mb-2 block text-xs font-semibold">Código de desconto</label><div className="grid grid-cols-[minmax(0,1fr)_auto] gap-2"><Input id="coupon" value={coupon} disabled={couponState === "success"} onChange={(event) => { setCoupon(event.target.value.toUpperCase()); }} placeholder="Ex.: VENUTTI10" className="h-11 rounded-xl border-checkout-line" /><Button type="button" variant="outline" onClick={applyCoupon} disabled={couponState === "success"} className="h-11 rounded-xl">Aplicar</Button></div>{couponState === "success" && <p className="mt-2 flex items-center gap-1 text-xs font-semibold text-success"><CheckCircle2 className="h-3.5 w-3.5" /> Cupom VENUTTI10 aplicado</p>}{couponState === "error" && <p className="mt-2 text-xs text-destructive">Esse cupom não é válido ou já expirou.</p>}</div><dl className="mt-5 space-y-3 border-t border-checkout-line pt-5 text-sm"><div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>{brl(subtotal)}</dd></div><div className="flex justify-between"><dt className="text-muted-foreground">Frete</dt><dd className="max-w-48 text-right">{shipping ? brl(shippingPrice) : "Calculado na etapa de entrega"}</dd></div>{couponDiscount > 0 && <div className="flex justify-between text-success"><dt>Desconto VENUTTI10</dt><dd>- {brl(couponDiscount)}</dd></div>}{pixDiscount > 0 && <div className="flex justify-between text-success"><dt>Desconto no Pix</dt><dd>- {brl(pixDiscount)}</dd></div>}<div className="flex items-end justify-between border-t border-checkout-line pt-4"><dt className="font-semibold">Total</dt><dd className="font-display text-3xl font-semibold">{brl(total)}</dd></div></dl><p className="mt-2 text-right text-xs text-muted-foreground">ou 12x de {brl(total / 12)} sem juros</p>{payment === "pix" && <p className="mt-1 text-right text-xs font-semibold text-success">{brl(total)} no Pix</p>}</div>;
}

function Guarantees() { const guarantees = [{ icon: PackageCheck, title: "Troca fácil", text: "7 dias para trocar ou devolver" }, { icon: Truck, title: "Todo o Brasil", text: "Correios e transportadora" }, { icon: FileText, title: "Nota fiscal", text: "Enviada por e-mail" }, { icon: Headphones, title: "Atendimento humano", text: "Fale pelo WhatsApp" }]; return <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-checkout-line bg-checkout-line">{guarantees.map(({ icon: Icon, title, text }) => <div key={title} className="bg-card p-4"><Icon className="h-5 w-5 text-accent" /><strong className="mt-2 block text-xs">{title}</strong><span className="mt-1 block text-[10px] leading-relaxed text-muted-foreground">{text}</span></div>)}</div>; }

function Reviews() { const reviews = ["[Depoimento real da cliente — até 3 linhas]", "[Relato real sobre produto e entrega — até 3 linhas]", "[Experiência real de compra — até 3 linhas]"]; return <section className="rounded-2xl border border-checkout-line bg-card p-5 shadow-checkout"><div className="flex items-start justify-between gap-4"><div><h2 className="font-display text-2xl">Quem já usa, recomenda</h2><p className="mt-1 text-xs text-muted-foreground">[000 avaliações]</p></div><div className="text-right"><strong className="text-xl">4,9</strong><div className="flex text-star">{Array.from({ length: 5 }, (_, index) => <Star key={index} className="h-3.5 w-3.5 fill-current" />)}</div></div></div><div className="no-scrollbar mt-5 flex snap-x gap-3 overflow-x-auto">{reviews.map((text, index) => <article key={text} className="min-w-[82%] snap-start rounded-xl bg-checkout-soft p-4 sm:min-w-[70%]"><div className="flex items-center gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-card"><CircleUserRound className="h-5 w-5 text-muted-foreground" /></span><div className="min-w-0"><strong className="block truncate text-xs">[Nome] · [Cidade/UF]</strong><span className="mt-1 flex items-center gap-2 text-star">{Array.from({ length: 5 }, (_, i) => <Star key={i} className="h-3 w-3 fill-current" />)}<span className="flex items-center gap-1 text-[9px] font-semibold text-success"><BadgeCheck className="h-3 w-3" /> Verificada</span></span></div></div><p className="mt-3 text-xs leading-relaxed text-muted-foreground">{text}</p><p className="mt-3 text-[10px] font-medium">[Produto comprado {index + 1}]</p></article>)}</div></section>; }

function CheckoutFooter() { return <footer className="border-t border-checkout-line bg-card px-4 py-8 text-center text-[11px] text-muted-foreground"><nav className="flex flex-wrap justify-center gap-x-5 gap-y-2"><Link to="/politicas/$slug" params={{ slug: "entrega" }} className="underline-offset-4 hover:underline">Política de Entrega</Link><Link to="/politicas/$slug" params={{ slug: "trocas" }} className="underline-offset-4 hover:underline">Trocas e Devoluções</Link><Link to="/politicas/$slug" params={{ slug: "privacidade" }} className="underline-offset-4 hover:underline">Privacidade</Link><Link to="/politicas/$slug" params={{ slug: "como-comprar" }} className="underline-offset-4 hover:underline">Como Comprar</Link></nav><p className="mt-4">[Razão social] · CNPJ [00.000.000/0001-00]</p></footer>; }

function Confirmation({ payment, items, total, name, address, shipping, copied, onCopy }: { payment: Payment; items: CartItem[]; total: number; name: string; address: { street: string; number: string; complement: string; district: string; city: string; state: string }; shipping: ShippingId | null; copied: "order" | "pix" | "boleto" | null; onCopy: (key: "order" | "pix" | "boleto", text: string) => void }) {
  const firstName = name.trim().split(" ")[0] || "cliente";
  const delivery = shippings.find((option) => option.id === shipping);
  return <div className="min-h-screen bg-checkout-bg text-foreground"><header className="border-b border-checkout-line bg-card px-4 py-5"><img src={logoAsset.url} alt="Venutti Cosméticos" className="mx-auto h-11 w-36 object-contain" /></header><main className="mx-auto max-w-3xl px-4 py-10 sm:px-6"><div className="text-center"><span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-success-soft text-success animate-in zoom-in duration-500"><CheckCircle2 className="h-10 w-10" /></span><h1 className="mt-6 font-display text-4xl sm:text-5xl">Pedido confirmado, {firstName}!</h1><p className="mt-3 text-sm text-muted-foreground">Enviamos todos os detalhes para o seu e-mail.</p><button type="button" onClick={() => onCopy("order", "VEN-924813")} className="mx-auto mt-5 flex min-h-12 items-center gap-2 rounded-xl border border-checkout-line bg-card px-4 text-sm"><span>Pedido <strong>#VEN-924813</strong></span>{copied === "order" ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}</button></div>{payment === "pix" && <section className="mt-8 rounded-2xl border border-checkout-line bg-card p-6 text-center shadow-checkout"><h2 className="text-lg font-semibold">Pague com Pix para confirmar</h2><div className="mx-auto mt-5 grid aspect-square w-48 place-items-center rounded-xl border-8 border-background bg-foreground text-background"><QrCode className="h-36 w-36" strokeWidth={1} /></div><p className="mt-4 text-sm text-muted-foreground">Este código expira em <strong className="text-foreground">29:42</strong></p><Button onClick={() => onCopy("pix", "00020126580014BR.GOV.BCB.PIX-VENUTTI")} className="mt-4 h-12 w-full rounded-xl bg-accent text-accent-foreground hover:bg-accent/90">{copied === "pix" ? <><Check /> Copiado</> : <><Copy /> Copiar código Pix</>}</Button><p className="mt-4 text-xs text-muted-foreground">Assim que o pagamento cair, você recebe a confirmação por e-mail.</p></section>}{payment === "boleto" && <section className="mt-8 rounded-2xl border border-checkout-line bg-card p-6 text-center shadow-checkout"><FileText className="mx-auto h-10 w-10 text-accent" /><h2 className="mt-3 text-lg font-semibold">Seu boleto está pronto</h2><div className="mt-5 grid gap-3 sm:grid-cols-2"><Button className="h-12 rounded-xl bg-accent text-accent-foreground">Baixar boleto</Button><Button variant="outline" onClick={() => onCopy("boleto", "34191.79001 01043.510047 91020.150008 1 89990000000000")} className="h-12 rounded-xl">{copied === "boleto" ? <><Check /> Copiado</> : <><Copy /> Copiar linha digitável</>}</Button></div></section>}<section className="mt-6 rounded-2xl border border-checkout-line bg-card p-6 shadow-checkout"><h2 className="font-display text-2xl">Resumo da compra</h2><div className="mt-4 divide-y divide-checkout-line">{items.map((item) => <div key={item.id} className="flex items-center gap-3 py-3"><img src={item.image} alt={item.name} className="h-14 w-14 rounded-lg object-cover" /><div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">{item.name}</p><p className="text-xs text-muted-foreground">Quantidade: {item.qty}</p></div><strong className="text-sm">{brl(item.price * item.qty)}</strong></div>)}</div><div className="mt-4 flex justify-between border-t border-checkout-line pt-4"><strong>Total</strong><strong className="text-xl">{brl(total)}</strong></div><div className="mt-6 grid gap-4 border-t border-checkout-line pt-5 sm:grid-cols-2"><div><span className="flex items-center gap-2 text-xs font-semibold"><MapPin className="h-4 w-4 text-accent" /> Endereço</span><p className="mt-2 text-xs leading-relaxed text-muted-foreground">{address.street}, {address.number}{address.complement ? ` · ${address.complement}` : ""}<br />{address.district} · {address.city}/{address.state}</p></div><div><span className="flex items-center gap-2 text-xs font-semibold"><CalendarDays className="h-4 w-4 text-accent" /> Previsão de entrega</span><p className="mt-2 text-xs text-muted-foreground">{delivery?.date ?? "Após a confirmação do pagamento"}</p></div></div></section><section className="mt-6 rounded-2xl bg-checkout-offer p-6"><h2 className="font-display text-2xl">Crie sua conta com um clique</h2><p className="mt-1 text-sm text-muted-foreground">Salve seus dados para a próxima compra e acompanhe seus pedidos.</p><div className="mt-4 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]"><Input type="password" aria-label="Crie uma senha" placeholder="Crie uma senha" autoComplete="new-password" className={inputClass} /><Button className="h-12 rounded-xl bg-accent text-accent-foreground">Criar minha conta</Button></div></section><section className="mt-8"><h2 className="text-center font-display text-2xl">O que acontece agora</h2><ol className="mt-6 grid grid-cols-4">{["Pedido confirmado", "Pagamento aprovado", "Pedido enviado", "Entregue"].map((label, index) => <li key={label} className="relative flex flex-col items-center text-center"><span className="absolute left-0 right-0 top-4 h-px bg-checkout-line" /><span className={`relative z-10 grid h-8 w-8 place-items-center rounded-full ${index === 0 ? "bg-success text-success-foreground" : "border border-checkout-line bg-card text-muted-foreground"}`}>{index === 0 ? <Check className="h-4 w-4" /> : index + 1}</span><span className="mt-2 max-w-20 text-[10px] leading-tight text-muted-foreground">{label}</span></li>)}</ol></section></main><CheckoutFooter /></div>;
}