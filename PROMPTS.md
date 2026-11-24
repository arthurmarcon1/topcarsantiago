# Prompts para o Claude Code — Top Car Santiago

Rode `claude` na raiz do projeto. O `CLAUDE.md` já dá o contexto; os prompts abaixo estão na ordem sugerida. Cole um de cada vez e revise o diff antes de commitar.

---

## 0. Primeiro contato (sempre comece por aqui)

```
Leia o CLAUDE.md, o README.md e todos os arquivos do projeto. Me dê um resumo de como o site está organizado,
suba um servidor local (npx serve .) e liste bugs visuais ou de responsividade que você encontrar em 390px e 1366px.
Não altere nada ainda.
```

## 1. Aproximar do site de referência

```
Acesse https://grupotopcarseminovos.com.br/ e compare com este projeto (home, listagem e página do veículo).
Liste em tabela o que o site deles tem e o nosso não tem (seções, filtros, campos do card, CTAs, rodapé).
Depois implemente os itens que fizerem sentido para a Top Car Santiago, mantendo nossa paleta azul e o
fechamento pelo WhatsApp. Não copie textos nem imagens deles.
```

## 2. Cadastrar carros novos

```
Adicione ao js/data.js os veículos abaixo. As fotos estão em img/carros/ (os nomes começam com o id).
Converta as fotos para .webp com ~1200px de largura e qualidade 80, e use-as na ordem alfabética.
Km/opcionais que eu não informar ficam null / vazios.

- VW T-Cross Highline 250 TSI 2022, cinza, 48.000 km, automático, R$ 119.900, destaque
- ...
```

## 3. Trocar fotos dos posts por fotos limpas

```
Substituí as fotos em img/carros/ por fotos sem texto (várias por carro, ex.: nivus-2023-1.jpg, -2.jpg...).
Atualize o array fotos de cada veículo em js/data.js, otimize tudo para .webp e remova as imagens antigas não usadas.
```

## 4. Linha 0 km Volkswagen

```
Na seção 0 km, troque os placeholders por cards reais da linha VW que a Pampeiro vende
(eu vou colocar as fotos em img/0km/). Cada card deve ter: modelo, versões disponíveis (lista curta),
"a partir de R$" quando houver preço e botão "Quero cotação" no WhatsApp. Crie também um filtro por carroceria.
```

## 5. Melhorias de conversão

```
Implemente melhorias de conversão sem backend:
1) selo "Baixou o preço" e "Recém-chegado" (campos opcionais no data.js);
2) botão "Comparar" em até 3 carros, com página comparativa lado a lado;
3) "Favoritos" salvos no localStorage (com try/catch);
4) texto do WhatsApp incluindo a origem (home, estoque ou página do veículo) para a loja saber de onde veio o lead.
Mantenha tudo em JS puro.
```

## 6. SEO e compartilhamento

```
Melhore SEO e prévia no WhatsApp/Instagram:
- meta tags OG/Twitter por página; og:image absoluta usando siteUrl do config;
- JSON-LD "Car" com offers na página do veículo;
- sitemap.xml e robots.txt gerados a partir do data.js (script node em scripts/gerar-sitemap.mjs);
- títulos e descriptions únicos por veículo.
Como as páginas de veículo são geradas por JS, crie um script node (scripts/build-paginas.mjs) que gere
/veiculos/<id>.html estáticos a partir do data.js, e configure o build na Vercel para rodá-lo.
```

## 7. Analytics e pixel

```
Adicione Google Analytics 4 (ID: G-XXXXXXX) e Meta Pixel (ID: XXXXXXX) carregados via js/config.js.
Dispare evento "Lead" / "generate_lead" em todo clique de WhatsApp, com o id do veículo como parâmetro.
Adicione um banner simples de consentimento de cookies (LGPD).
```

## 8. Painel para a loja cadastrar carros (próxima fase)

```
Quero que a loja cadastre os carros sem mexer em código. Proponha 2 opções com prós e contras:
(a) Supabase (tabela veiculos + storage de fotos + painel /admin com login por e-mail);
(b) Google Sheets publicado como CSV lido pelo site.
Depois que eu escolher, implemente mantendo o site estático na Vercel e o data.js como fallback.
```

## 9. Migração para Next.js (opcional, quando crescer)

```
Migre o projeto para Next.js (App Router) + TypeScript + Tailwind, mantendo exatamente o mesmo visual,
URLs (/estoque, /veiculo/[id]) e mensagens de WhatsApp. Gere as páginas de veículo com generateStaticParams
a partir dos dados, adicione generateMetadata por veículo e mantenha o deploy na Vercel.
```

## 10. Checklist antes de entregar ao cliente

```
Faça uma revisão final: links de WhatsApp (abrem com o texto certo?), telefones, endereço, horário,
imagens quebradas, alt texts, Lighthouse mobile (meta: 90+ em Performance, Acessibilidade e SEO),
console sem erros, e me mostre o que ainda está como placeholder.
```
