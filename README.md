# Top Car Santiago — site de vendas

Site de vendas da **Top Car Santiago** (revendedor autorizado Pampeiro Volkswagen — Santiago/RS): seminovos, VW 0 km e pós-venda, com **fechamento pelo WhatsApp**.

Protótipo 100% estático (HTML + CSS + JS puro, sem build). Roda direto na Vercel.

## Estrutura

```
index.html          → home (hero + busca, destaques, 0 km, diferenciais, financiamento, avaliação, pós-venda, contato)
estoque.html        → estoque com filtros (?tipo=seminovo | 0km, marca, preço, ano, câmbio, busca)
veiculo.html?id=…   → página do veículo (galeria, ficha, CTAs de WhatsApp, form de lead)
css/style.css       → todo o visual (variáveis de cor no topo)
js/config.js        → WhatsApp, telefones, endereço, horário, URL do site  ← EDITAR
js/data.js          → estoque de veículos                                 ← EDITAR
js/app.js           → header/footer, cards, filtros, mensagens de WhatsApp
img/                → logo, favicon, fotos (carros/ = seminovos, 0km/ = linha VW, tera/ = hero 3D), placeholder
vercel.json         → URLs limpas (/estoque, /veiculo?id=…)
CLAUDE.md           → contexto do projeto para o Claude Code
PROMPTS.md          → prompts prontos para evoluir o site com o Claude Code
```

## Rodar localmente

```bash
# qualquer servidor estático serve
npx serve .
# ou
python3 -m http.server 8000
```

## Subir no GitHub (repo já criado: topcarsantiago)

```bash
cd topcarsantiago
git init
git add .
git commit -m "feat: protótipo do site Top Car Santiago"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/topcarsantiago.git
git push -u origin main
```

## Publicar na Vercel

1. vercel.com → **Add New… → Project** → importe o repo `topcarsantiago`.
2. Framework Preset: **Other**. Build Command: *vazio*. Output Directory: *vazio* (raiz).
3. **Deploy**. Cada `git push` na `main` publica sozinho.
4. Depois de publicado, atualize `siteUrl` em `js/config.js` com a URL final (vai no link das mensagens de WhatsApp).

Ou pela CLI: `npm i -g vercel && vercel --prod`.

## Como adicionar / editar carros

Abra `js/data.js`, copie um bloco e edite. Fotos em `img/carros/` (use `.jpg`/`.webp` ~1200px de largura). A primeira foto da lista é a capa; com mais de uma foto a galeria aparece automaticamente.

```js
{
  id: "vw-tcross-highline-2022",   // único, vira a URL
  tipo: "seminovo",                // "seminovo" ou "0km"
  marca: "Volkswagen", modelo: "T-Cross", versao: "Highline 250 TSI",
  ano: "2022", preco: 119900, km: 45000,
  cambio: "Automático", combustivel: "Flex", cor: "Cinza", carroceria: "SUV",
  fotos: ["img/carros/tcross-1.jpg", "img/carros/tcross-2.jpg"],
  destaque: true,                  // aparece na home
  opcionais: ["Teto solar", "Painel digital"],
  descricao: "Único dono, revisões na concessionária.",
}
```

## ⚠️ Pendências antes de ir ao ar

- [ ] **WhatsApp**: confirmar o número. Nos posts está `(55) 9983-2239` → configurado como `555599832239`. Se o link não abrir a conversa certa, usar `5555999832239` (com o 9).
- [ ] **Telefone fixo**: a bio do Instagram diz `(55) 3251-0800`, a placa da loja mostra `(55) 3251-8008`. Confirmar.
- [ ] **Horário de atendimento** (está como placeholder).
- [ ] **Km, cor e opcionais** dos seminovos (km está "Consulte").
- [ ] Trocar as **fotos dos posts** (têm texto e preço por cima) por fotos limpas, idealmente várias por carro.
- [ ] Remover os **placeholders** (`placeholder: true`) e preencher a linha 0 km com fotos oficiais/da loja.
- [ ] Autorização da loja para uso de marca/fotos.
- [ ] **Tera na hero**: só frente e lateral estão no ar. As vistas traseiras recebidas tinham a placa de outra loja ("Autohype"); quando houver fotos próprias/oficiais, salvar como `img/tera/tera-traseira-34.webp` e `tera-traseira.webp` (1400×600, fundo transparente) e descomentar no `index.html`.
- [ ] Fotos 0 km de Polo, Virtus, Taos e Saveiro (Tera, Nivus, T-Cross e Amarok já têm). Salvar em `img/0km/<id>.webp`.
