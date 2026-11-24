/* =========================================================
   Top Car Santiago — script principal (sem build, vanilla JS)
   ========================================================= */
(function () {
  const C = window.TOPCAR_CONFIG;
  const V = window.TOPCAR_VEICULOS || [];

  /* ---------- helpers ---------- */
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const brl = (n) =>
    n == null ? "Consulte" : n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  const kmFmt = (n) => (n == null ? "Consulte" : n === 0 ? "0 km" : n.toLocaleString("pt-BR") + " km");
  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const nomeCarro = (v) => `${v.marca} ${v.modelo} ${v.versao}`;
  const linkVeiculo = (v) => `veiculo.html?id=${encodeURIComponent(v.id)}`;

  function wa(msg) {
    return `https://wa.me/${C.whatsapp}?text=${encodeURIComponent(msg)}`;
  }
  function msgVeiculo(v, extra = "") {
    const preco = v.preco ? ` (${brl(v.preco)})` : "";
    const ano = v.tipo === "0km" ? "0 km" : v.ano;
    return (
      `Olá, Top Car! Tenho interesse no *${nomeCarro(v)} ${ano}*${preco} que vi no site.` +
      (extra ? `\n${extra}` : "") +
      `\n${C.siteUrl}/${linkVeiculo(v)}`
    );
  }
  window.TopCar = { wa, brl, msgVeiculo, nomeCarro };

  /* ---------- ícones (SVG inline) ---------- */
  const I = {
    wa: '<svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16 3a13 13 0 0 0-11.2 19.6L3 29l6.6-1.7A13 13 0 1 0 16 3Zm0 23.6c-2 0-4-.6-5.7-1.6l-.4-.2-3.9 1 1-3.8-.3-.4A10.6 10.6 0 1 1 16 26.6Zm5.8-7.9c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.4.2-.7.1a8.7 8.7 0 0 1-4.3-3.8c-.3-.6.3-.5 1-1.7.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.5c.2.2 2.4 3.6 5.8 5 2.1.9 3 1 4 .8.7-.1 1.9-.8 2.2-1.5.3-.8.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4Z"/></svg>',
    phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2Z"/></svg>',
    pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z"/></svg>',
    ig: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 7.3a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4Zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm6-7.9a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0ZM21.9 8c-.1-1.6-.4-3-1.6-4.2C19.1 2.6 17.7 2.2 16 2.1c-1.6-.1-6.5-.1-8.1 0-1.6.1-3 .4-4.2 1.6C2.6 4.9 2.2 6.3 2.1 8c-.1 1.6-.1 6.5 0 8.1.1 1.6.4 3 1.6 4.2 1.2 1.2 2.6 1.5 4.2 1.6 1.6.1 6.5.1 8.1 0 1.6-.1 3-.4 4.2-1.6 1.2-1.2 1.5-2.6 1.6-4.2.1-1.6.1-6.5 0-8.1Zm-2.1 9.8c-.3.9-1 1.5-1.9 1.9-1.3.5-4.4.4-5.9.4s-4.6.1-5.9-.4c-.9-.3-1.5-1-1.9-1.9-.5-1.3-.4-4.4-.4-5.9s-.1-4.6.4-5.9c.3-.9 1-1.5 1.9-1.9 1.3-.5 4.4-.4 5.9-.4s4.6-.1 5.9.4c.9.3 1.5 1 1.9 1.9.5 1.3.4 4.4.4 5.9s.1 4.6-.4 5.9Z"/></svg>',
    clock: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16Zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7Z"/></svg>',
    menu: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M3 6h18v2H3V6Zm0 5h18v2H3v-2Zm0 5h18v2H3v-2Z"/></svg>',
    close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="m6.4 5 5.6 5.6L17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6L6.4 19 5 17.6l5.6-5.6L5 6.4 6.4 5Z"/></svg>',
    cal: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M7 2v2H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2V2h-2v2H9V2H7Zm12 8v10H5V10h14Z"/></svg>',
    gauge: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 4a10 10 0 0 0-8.7 15h17.4A10 10 0 0 0 12 4Zm1 9.7a2 2 0 1 1-2.6-2.4l5.1-3.5-2.5 5.9Z"/></svg>',
    gear: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M5 3a2 2 0 0 0-1 3.7v10.6a2 2 0 1 0 2 0V13h5v4.3a2 2 0 1 0 2 0V13h5a1 1 0 0 0 1-1V6.7a2 2 0 1 0-2 0V11h-4V6.7a2 2 0 1 0-2 0V11H6V6.7A2 2 0 0 0 5 3Z"/></svg>',
    fuel: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4 3h10a1 1 0 0 1 1 1v8h1a2 2 0 0 1 2 2v3a1 1 0 0 0 2 0V9.4l-2-2L19.4 6l2.3 2.3c.2.2.3.4.3.7v8a3 3 0 0 1-6 0v-3h-1v6h1v2H2v-2h1V4a1 1 0 0 1 1-1Zm1 2v5h8V5H5Z"/></svg>',
  };
  window.TopCar.I = I;

  /* ---------- header / footer / botão flutuante ---------- */
  function renderChrome() {
    const page = document.body.dataset.page || "";
    const nav = [
      ["index.html", "Início", "home"],
      ["estoque.html?tipo=seminovo", "Seminovos", "seminovo"],
      ["estoque.html?tipo=0km", "0 km Volkswagen", "0km"],
      ["index.html#financiamento", "Financiamento", ""],
      ["index.html#venda-seu-carro", "Venda seu carro", ""],
      ["index.html#pos-venda", "Pós-venda", ""],
      ["index.html#contato", "Contato", ""],
    ];
    const params = new URLSearchParams(location.search);
    const active = page === "estoque" ? params.get("tipo") || "seminovo" : page;

    const header = document.createElement("header");
    header.className = "site-header";
    header.innerHTML = `
      <div class="topbar">
        <div class="container topbar__inner">
          <span>${I.pin} ${esc(C.endereco)} · ${esc(C.cidade)}</span>
          <span class="topbar__right">
            <a href="tel:+${C.telefone}">${I.phone} ${esc(C.telefoneExibicao)}</a>
            <a href="${C.instagram}" target="_blank" rel="noopener">${I.ig} ${esc(C.instagramUser)}</a>
          </span>
        </div>
      </div>
      <div class="container header__inner">
        <a href="index.html" class="logo" aria-label="Top Car Santiago — início">
          <img src="img/logo-topcar.png" alt="Top Car Seminovos" width="160" height="62">
        </a>
        <nav class="nav" id="nav" aria-label="Menu principal">
          ${nav
            .map(([href, label, key]) => `<a href="${href}" class="${key && key === active ? "is-active" : ""}">${label}</a>`)
            .join("")}
          <a class="btn btn--wa nav__cta" href="${wa("Olá, Top Car! Vim pelo site e gostaria de atendimento.")}" target="_blank" rel="noopener">${I.wa} Fale no WhatsApp</a>
        </nav>
        <button class="nav-toggle" aria-label="Abrir menu" aria-expanded="false" aria-controls="nav">${I.menu}</button>
      </div>`;
    document.body.prepend(header);

    const toggle = $(".nav-toggle", header);
    toggle.addEventListener("click", () => {
      const open = header.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open);
      toggle.innerHTML = open ? I.close : I.menu;
    });
    $$(".nav a", header).forEach((a) =>
      a.addEventListener("click", () => {
        header.classList.remove("nav-open");
        toggle.innerHTML = I.menu;
      })
    );
    window.addEventListener("scroll", () => header.classList.toggle("is-scrolled", scrollY > 40), { passive: true });

    const footer = document.createElement("footer");
    footer.className = "site-footer";
    footer.innerHTML = `
      <div class="container footer__grid">
        <div>
          <img src="img/logo-topcar.png" alt="Top Car Seminovos" width="170" height="66" class="footer__logo">
          <p>${esc(C.descricao)}</p>
          <p class="footer__vw">Revendedor autorizado <strong>Pampeiro Volkswagen</strong></p>
        </div>
        <div>
          <h4>Navegação</h4>
          <ul>
            <li><a href="estoque.html?tipo=seminovo">Seminovos</a></li>
            <li><a href="estoque.html?tipo=0km">0 km Volkswagen</a></li>
            <li><a href="index.html#financiamento">Financiamento</a></li>
            <li><a href="index.html#venda-seu-carro">Venda ou troque seu carro</a></li>
            <li><a href="index.html#pos-venda">Serviços de pós-venda</a></li>
          </ul>
        </div>
        <div>
          <h4>Atendimento</h4>
          <ul class="footer__contact">
            <li>${I.wa}<a href="${wa("Olá, Top Car! Vim pelo site.")}" target="_blank" rel="noopener">${esc(C.whatsappExibicao)} (WhatsApp)</a></li>
            <li>${I.phone}<a href="tel:+${C.telefone}">${esc(C.telefoneExibicao)}</a></li>
            <li>${I.pin}<span>${esc(C.endereco)}<br>${esc(C.cidade)}</span></li>
            <li>${I.clock}<span>${C.horario.map(esc).join("<br>")}</span></li>
          </ul>
        </div>
      </div>
      <div class="footer__bottom">
        <div class="container">
          <span>© ${new Date().getFullYear()} ${esc(C.nome)}. Todos os direitos reservados.</span>
          <span>Preços e condições sujeitos a alteração sem aviso prévio. Imagens ilustrativas.</span>
        </div>
      </div>`;
    document.body.append(footer);

    const fab = document.createElement("a");
    fab.className = "wa-fab";
    fab.href = wa("Olá, Top Car! Vim pelo site e gostaria de atendimento.");
    fab.target = "_blank";
    fab.rel = "noopener";
    fab.setAttribute("aria-label", "Conversar no WhatsApp");
    fab.innerHTML = I.wa;
    document.body.append(fab);
  }

  /* ---------- card de veículo ---------- */
  function card(v) {
    const is0 = v.tipo === "0km";
    const btnMsg = is0
      ? `Olá, Top Car! Quero uma cotação do *Volkswagen ${v.modelo} 0 km*. Pode me passar versões, cores e condições?`
      : msgVeiculo(v);
    return `
      <article class="card ${v.placeholder ? "card--ph" : ""}">
        <a href="${linkVeiculo(v)}" class="card__media">
          <img src="${esc(v.fotos[0])}" alt="${esc(nomeCarro(v))}" loading="lazy">
          <span class="badge ${is0 ? "badge--0km" : ""}">${is0 ? "0 km" : "Seminovo"}</span>
          ${v.placeholder && !is0 ? '<span class="badge badge--ph">Exemplo</span>' : ""}
        </a>
        <div class="card__body">
          <h3 class="card__title"><a href="${linkVeiculo(v)}">${esc(v.marca)} <strong>${esc(v.modelo)}</strong></a></h3>
          <p class="card__version">${esc(v.versao)}</p>
          <ul class="card__specs">
            <li>${I.cal}${esc(v.ano)}</li>
            ${is0 ? "" : `<li>${I.gauge}${kmFmt(v.km)}</li>`}
            <li>${I.gear}${esc(v.cambio.replace(" (CVT)", ""))}</li>
          </ul>
          <div class="card__price">
            ${v.preco ? `<small>Por</small> ${brl(v.preco)}` : `<span class="card__consult">${is0 ? "Consulte condições" : "Preço sob consulta"}</span>`}
          </div>
          <div class="card__actions">
            <a class="btn btn--ghost" href="${linkVeiculo(v)}">Ver detalhes</a>
            <a class="btn btn--wa" href="${wa(btnMsg)}" target="_blank" rel="noopener">${I.wa} ${is0 ? "Cotar" : "Tenho interesse"}</a>
          </div>
        </div>
      </article>`;
  }
  window.TopCar.card = card;

  /* ---------- formulários que viram mensagem de WhatsApp ---------- */
  function bindWaForms() {
    $$(".wa-ico").forEach((el) => (el.outerHTML = I.wa));
    $$("[data-wa-link]").forEach((a) => {
      a.href = wa(a.dataset.waLink);
      a.target = "_blank";
      a.rel = "noopener";
      if (a.classList.contains("btn--wa")) a.insertAdjacentHTML("afterbegin", I.wa);
    });
    $$("form[data-wa]").forEach((form) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (!form.reportValidity()) return;
        const titulo = form.dataset.wa;
        const linhas = $$("[name]", form)
          .filter((el) => el.value.trim())
          .map((el) => `• ${el.dataset.label || el.name}: ${el.value.trim()}`);
        const msg = `Olá, Top Car! ${titulo}\n\n${linhas.join("\n")}`;
        window.open(wa(msg), "_blank", "noopener");
      });
    });
  }

  /* ---------- HOME ---------- */
  function pageHome() {
    const semi = V.filter((v) => v.tipo === "seminovo");
    const dest = semi.filter((v) => v.destaque);
    $("#destaques").innerHTML = (dest.length ? dest : semi).slice(0, 8).map(card).join("");
    $("#zerokm").innerHTML = V.filter((v) => v.tipo === "0km").slice(0, 8).map(card).join("");
    $("#count-semi").textContent = semi.filter((v) => !v.placeholder).length;

    // selects da busca rápida
    const marcas = [...new Set(V.map((v) => v.marca))].sort();
    $("#q-marca").innerHTML += marcas.map((m) => `<option>${esc(m)}</option>`).join("");
    $("#busca").addEventListener("submit", (e) => {
      e.preventDefault();
      const p = new URLSearchParams();
      for (const [k, val] of new FormData(e.target)) if (val) p.set(k, val);
      location.href = "estoque.html?" + p.toString();
    });

    // mapa
    const map = $("#mapa");
    if (map) map.src = `https://maps.google.com/maps?q=${encodeURIComponent(C.mapsQuery)}&z=16&output=embed`;
    const g = document.getElementById("link-google");
    if (g) g.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(C.mapsQuery)}`;
    $$("[data-cfg]").forEach((el) => (el.textContent = C[el.dataset.cfg]));
  }

  /* ---------- ESTOQUE ---------- */
  function pageEstoque() {
    const params = new URLSearchParams(location.search);
    const f = $("#filtros");
    const marcas = [...new Set(V.map((v) => v.marca))].sort();
    const carrocerias = [...new Set(V.map((v) => v.carroceria))].sort();
    f.marca.innerHTML += marcas.map((m) => `<option>${esc(m)}</option>`).join("");
    f.carroceria.innerHTML += carrocerias.map((m) => `<option>${esc(m)}</option>`).join("");
    for (const [k, val] of params) if (f[k]) f[k].value = val;
    if (!params.get("tipo")) f.tipo.value = "seminovo";

    const titulo = $("#estoque-titulo");
    function apply() {
      const fd = Object.fromEntries(new FormData(f));
      const q = (fd.q || "").toLowerCase().trim();
      let list = V.filter((v) => {
        if (fd.tipo && v.tipo !== fd.tipo) return false;
        if (fd.marca && v.marca !== fd.marca) return false;
        if (fd.carroceria && v.carroceria !== fd.carroceria) return false;
        if (fd.cambio && !v.cambio.toLowerCase().includes(fd.cambio)) return false;
        if (fd.max && v.preco && v.preco > +fd.max) return false;
        if (fd.anoMin && v.tipo === "seminovo" && +v.ano < +fd.anoMin) return false;
        if (q && !`${v.marca} ${v.modelo} ${v.versao} ${v.cor}`.toLowerCase().includes(q)) return false;
        return true;
      });
      const ord = fd.ordem || "relevancia";
      const p = (v) => v.preco ?? Infinity;
      if (ord === "menor") list.sort((a, b) => p(a) - p(b));
      if (ord === "maior") list.sort((a, b) => (b.preco ?? -1) - (a.preco ?? -1));
      if (ord === "ano") list.sort((a, b) => (+b.ano || 9999) - (+a.ano || 9999));
      if (ord === "relevancia") list.sort((a, b) => (a.placeholder ? 1 : 0) - (b.placeholder ? 1 : 0) || (b.destaque ? 1 : 0) - (a.destaque ? 1 : 0));

      titulo.textContent = fd.tipo === "0km" ? "Volkswagen 0 km" : fd.tipo === "seminovo" ? "Seminovos" : "Todos os veículos";
      $("#estoque-count").textContent = `${list.length} ${list.length === 1 ? "veículo encontrado" : "veículos encontrados"}`;
      $("#estoque-grid").innerHTML = list.length
        ? list.map(card).join("")
        : `<div class="empty">
             <h3>Nenhum veículo com esses filtros</h3>
             <p>Conte pra gente o que você procura — buscamos o carro certo pra você.</p>
             <a class="btn btn--wa" target="_blank" rel="noopener" href="${wa("Olá, Top Car! Não encontrei no site o carro que procuro. Estou buscando: ")}">${I.wa} Encomendar meu carro</a>
           </div>`;

      const sp = new URLSearchParams();
      for (const [k, val] of Object.entries(fd)) if (val) sp.set(k, val);
      history.replaceState(null, "", "?" + sp.toString());
      $$(".nav a").forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === `estoque.html?tipo=${fd.tipo}`));
    }
    f.addEventListener("input", apply);
    f.addEventListener("submit", (e) => (e.preventDefault(), apply()));
    $("#limpar").addEventListener("click", () => {
      const t = f.tipo.value;
      f.reset();
      f.tipo.value = t;
      apply();
    });
    $("#toggle-filtros")?.addEventListener("click", () => document.body.classList.toggle("filtros-open"));
    apply();
  }

  /* ---------- DETALHE ---------- */
  function pageVeiculo() {
    const id = new URLSearchParams(location.search).get("id");
    const v = V.find((x) => x.id === id);
    const root = $("#veiculo");
    if (!v) {
      root.innerHTML = `<div class="empty"><h3>Veículo não encontrado</h3><p>Ele pode ter sido vendido. Veja o estoque atualizado.</p><a class="btn btn--primary" href="estoque.html">Ver estoque</a></div>`;
      return;
    }
    const is0 = v.tipo === "0km";
    document.title = `${nomeCarro(v)} ${v.ano} | ${C.nome}`;
    $('meta[name="description"]').setAttribute(
      "content",
      `${nomeCarro(v)} ${v.ano} ${v.preco ? "por " + brl(v.preco) : ""} na ${C.nome}, ${C.cidade}. Fale no WhatsApp.`
    );

    const specs = [
      ["Ano", v.ano, I.cal],
      ["Quilometragem", kmFmt(v.km), I.gauge],
      ["Câmbio", v.cambio, I.gear],
      ["Combustível", v.combustivel, I.fuel],
      ["Cor", v.cor, ""],
      ["Carroceria", v.carroceria, ""],
    ];

    root.innerHTML = `
      <nav class="crumbs container"><a href="index.html">Início</a> / <a href="estoque.html?tipo=${v.tipo}">${is0 ? "0 km" : "Seminovos"}</a> / <span>${esc(v.marca)} ${esc(v.modelo)}</span></nav>
      <div class="container detail">
        <div class="detail__gallery">
          <div class="gallery__main"><img id="foto-principal" src="${esc(v.fotos[0])}" alt="${esc(nomeCarro(v))}"></div>
          ${
            v.fotos.length > 1
              ? `<div class="gallery__thumbs">${v.fotos.map((f, i) => `<button class="${i ? "" : "is-active"}" data-src="${esc(f)}"><img src="${esc(f)}" alt="Foto ${i + 1}"></button>`).join("")}</div>`
              : ""
          }

        </div>

        <aside class="detail__aside">
          <div class="buybox">
            <span class="badge ${is0 ? "badge--0km" : ""}">${is0 ? "0 km Volkswagen" : "Seminovo"}</span>
            <h1>${esc(v.marca)} <strong>${esc(v.modelo)}</strong></h1>
            <p class="buybox__version">${esc(v.versao)} · ${esc(v.ano)}</p>
            <div class="buybox__price">${v.preco ? brl(v.preco) : `<span class="card__consult">${is0 ? "Consulte condições" : "Preço sob consulta"}</span>`}</div>
            <ul class="specs">
              ${specs.map(([k, val, ic]) => `<li>${ic || ""}<span>${k}</span><strong>${esc(val)}</strong></li>`).join("")}
            </ul>
            <a class="btn btn--wa btn--lg btn--block" target="_blank" rel="noopener" href="${wa(msgVeiculo(v))}">${I.wa} Tenho interesse</a>
            <a class="btn btn--primary btn--block" target="_blank" rel="noopener" href="${wa(msgVeiculo(v, "Gostaria de *simular um financiamento*."))}">Simular financiamento</a>
            <a class="btn btn--ghost btn--block" target="_blank" rel="noopener" href="${wa(msgVeiculo(v, "Tenho um carro para dar na *troca*. Podem avaliar?"))}">Avaliar meu usado na troca</a>
            <button class="btn btn--link btn--block" id="compartilhar" type="button">Compartilhar este veículo</button>
          </div>

          <form class="lead" data-wa="Tenho uma dúvida sobre o ${esc(nomeCarro(v))} ${esc(v.ano)} (${C.siteUrl}/${linkVeiculo(v)})">
            <h3>Fale com um consultor</h3>
            <label>Seu nome<input name="nome" data-label="Nome" required autocomplete="name"></label>
            <label>Cidade<input name="cidade" data-label="Cidade" autocomplete="address-level2"></label>
            <label>Mensagem<textarea name="msg" data-label="Mensagem" rows="3" placeholder="Ex.: aceita troca? qual a entrada mínima?"></textarea></label>
            <button class="btn btn--wa btn--block">${I.wa} Enviar pelo WhatsApp</button>
          </form>
        </aside>
          <section class="detail__section detail__about">
            <h2>Sobre o veículo</h2>
            <p>${esc(v.descricao || "")}</p>
            ${
              v.opcionais?.length
                ? `<h3>Opcionais</h3><ul class="opcionais">${v.opcionais.map((o) => `<li>${esc(o)}</li>`).join("")}</ul>`
                : `<p class="muted">Lista completa de opcionais e laudo cautelar disponíveis pelo WhatsApp.</p>`
            }
          </section>
      </div>

      <section class="section section--alt">
        <div class="container">
          <div class="section__head"><h2>Veja também</h2><a href="estoque.html?tipo=${v.tipo}" class="link-more">Ver todos →</a></div>
          <div class="grid">${V.filter((x) => x.id !== v.id && x.tipo === v.tipo).sort((a, b) => (a.placeholder ? 1 : 0) - (b.placeholder ? 1 : 0)).slice(0, 4).map(card).join("")}</div>
        </div>
      </section>`;

    $$(".gallery__thumbs button").forEach((b) =>
      b.addEventListener("click", () => {
        $("#foto-principal").src = b.dataset.src;
        $$(".gallery__thumbs button").forEach((x) => x.classList.toggle("is-active", x === b));
      })
    );
    $("#compartilhar").addEventListener("click", async () => {
      const data = { title: document.title, url: location.href };
      if (navigator.share) {
        try { await navigator.share(data); } catch (_) {}
      } else {
        await navigator.clipboard?.writeText(location.href);
        $("#compartilhar").textContent = "Link copiado!";
      }
    });

    // barra fixa no mobile
    const bar = document.createElement("div");
    bar.className = "mobile-buybar";
    bar.innerHTML = `<div><small>${esc(v.modelo)} ${esc(v.ano)}</small><strong>${v.preco ? brl(v.preco) : "Consulte"}</strong></div>
      <a class="btn btn--wa" target="_blank" rel="noopener" href="${wa(msgVeiculo(v))}">${I.wa} Tenho interesse</a>`;
    document.body.append(bar);
    document.body.classList.add("has-buybar");
  }

  /* ---------- init ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    renderChrome();
    const page = document.body.dataset.page;
    if (page === "home") pageHome();
    if (page === "estoque") pageEstoque();
    if (page === "veiculo") pageVeiculo();
    bindWaForms();
    const yr = $("#ano-atual");
    if (yr) yr.textContent = new Date().getFullYear();
  });
})();
