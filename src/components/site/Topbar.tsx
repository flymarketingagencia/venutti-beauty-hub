import { useEffect, useState } from "react";

const messages = [
  "Frete grátis nas compras acima de R$ 299 para a região Sudeste",
  "Até 6x sem juros no cartão",
  "Empresa há mais de 15 anos no mercado profissional",
];

export function Topbar() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % messages.length), 4500);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="bg-[var(--moss)] text-white">
      <div className="container-x flex h-9 items-center justify-center overflow-hidden text-center">
        <p key={i} className="eyebrow animate-in fade-in slide-in-from-bottom-1 !text-white">
          {messages[i]}
        </p>
      </div>
    </div>
  );
}
