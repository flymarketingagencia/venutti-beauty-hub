export const brl = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export const parcel = (v: number, n = 6) => `${n}x de ${brl(v / n)} sem juros`;
