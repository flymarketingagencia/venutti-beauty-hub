# Checkout Venutti

## Objetivo
Substituir a página de carrinho por um checkout de página única, mobile-first, com dados simulados e todos os cálculos e estados funcionando na interface.

## Entrega
- Cabeçalho exclusivo, sem navegação, com logo oficial, segurança e progresso em quatro passos.
- Etapas recolhíveis de dados, endereço/frete e pagamento, com máscaras, validações, preenchimento simulado de CEP e opções de entrega.
- Pix, cartão e boleto, incluindo cartão visual, parcelamento e mensagens de erro orientativas.
- Resumo responsivo com quantidades, cupom `VENUTTI10`, descontos, frete e total recalculados imediatamente.
- Duas ofertas adicionais de um clique, garantias, avaliações de exemplo e rodapé minimalista.
- Resumo recolhível e barra de finalização fixa no celular; resumo fixo na lateral no desktop.
- Tela de pedido confirmado adaptada ao meio de pagamento, com Pix/boleto, cópia, itens, endereço e acompanhamento.
- Uso do logo enviado na página e como favicon, preservando a identidade verde-musgo da Venutti.

## Detalhes técnicos
- Estado local em React, sem banco ou pagamento real.
- Produtos e imagens existentes serão reutilizados nos dados simulados.
- A rota `/carrinho` será mantida para não quebrar os links atuais.
- Metadados próprios de checkout serão incluídos, com instrução para buscadores não indexarem a página.
- O resultado será conferido em celular e desktop, incluindo interações e cálculos.
