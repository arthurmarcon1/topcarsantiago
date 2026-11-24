# CLAUDE.md — Top Car Santiago

## Contexto
Site de vendas da Top Car Santiago (Santiago/RS), revendedor autorizado **Pampeiro Volkswagen**. Vende **VW 0 km** e **seminovos** de várias marcas e tem **pós-venda** (oficina: revisões, freios, suspensão, troca de óleo, peças, assistência técnica).
Objetivo do site: gerar leads e **fechar no WhatsApp** — todo CTA abre `wa.me` com mensagem pré-preenchida citando o veículo, o preço e o link.
Referência visual/funcional: https://grupotopcarseminovos.com.br/ (Grupo Top Car Seminovos).
Instagram da loja: https://www.instagram.com/topcarsantiago/

## Stack
- HTML + CSS + JS puro, **sem build**. Deploy estático na Vercel (`vercel.json` com `cleanUrls`).
- Sem dependências. Fontes Google (Montserrat títulos, Inter texto).
- Não introduzir framework/bundler sem pedido explícito.

## Arquivos
- `js/config.js` — dados da loja (WhatsApp, telefones, endereço, horário, `siteUrl`). Única fonte desses dados.
- `js/data.js` — array `window.TOPCAR_VEICULOS`. Campos: id, tipo ("seminovo"|"0km"), marca, modelo, versao, ano, preco (number|null), km (number|null), cambio, combustivel, cor, carroceria, fotos[], destaque, opcionais[], descricao, placeholder.
- `js/app.js` — header/footer/FAB injetados via JS; `card(v)`; páginas `home`, `estoque`, `veiculo` (detectadas por `body[data-page]`); formulários com `form[data-wa]` viram mensagem de WhatsApp (usa `data-label` de cada campo).
- `css/style.css` — variáveis no `:root` (azul Top Car `--blue #385b94`, `--blue-700`, `--navy`, `--vw #001e50`, `--accent`, `--wa`).

## Regras
- Português do Brasil em toda a interface. Preço em `toLocaleString("pt-BR", {style:"currency", currency:"BRL"})`.
- Mobile-first: a maioria dos acessos vem do Instagram no celular. Testar em 390px.
- Todo CTA de compra → WhatsApp com mensagem contendo veículo + ano + preço + link.
- Não inventar dados de veículos (km, opcionais). Se não souber, usar `null` → "Consulte".
- Não usar o logotipo da VW como imagem; citar "Pampeiro Volkswagen" em texto.
- Acessibilidade: alt nas imagens, labels nos campos, contraste AA.
