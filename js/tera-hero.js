/* Hero 3D — Volkswagen Tera (JS puro, independente do resto do site)
   Uso: inclua este arquivo depois do HTML do componente (ou com defer). */
(function () {
  const $ = (q, el = document) => el.querySelector(q);
  const $$ = (q, el = document) => [...el.querySelectorAll(q)];

  function teraHero() {
    const root = $("#tera");
    if (!root) return;
    const stage = $("#tera-stage", root);
    const views = $$(".tera__view", root);
    const dots = $(".tera__dots", root);
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let i = 0, timer = null, busy = false;

    dots.innerHTML = views
      .map((v, n) => `<button role="tab" aria-label="${v.dataset.label}" aria-selected="${n === 0}"><span>${v.dataset.label}</span></button>`)
      .join("");
    const dotBtns = $$("button", dots);
    views[0].classList.add("is-active");
    // URL absoluta da foto para a máscara do brilho (evita problema de caminho relativo em var())
    views.forEach((v) => v.style.setProperty("--src", `url("${$("img", v).src}")`));

    function go(n, dir) {
      n = (n + views.length) % views.length;
      if (n === i || busy) return;
      dir = dir || (n > i ? 1 : -1);
      busy = true;
      const cur = views[i], next = views[n];
      // posiciona a próxima vista "do outro lado" sem transição
      next.classList.remove("to-left", "to-right");
      next.classList.add(dir > 0 ? "from-right" : "from-left");
      void next.offsetWidth;
      next.classList.remove("from-right", "from-left");
      next.classList.add("is-active");
      cur.classList.remove("is-active");
      cur.classList.add(dir > 0 ? "to-left" : "to-right");
      dotBtns.forEach((b, k) => b.setAttribute("aria-selected", k === n));
      i = n;
      setTimeout(() => { cur.classList.remove("to-left", "to-right"); busy = false; }, 700);
    }
    const next = () => go(i + 1, 1);
    const prev = () => go(i - 1, -1);
    function play() { if (!reduce) { stop(); timer = setInterval(next, 3200); } }
    function stop() { clearInterval(timer); }

    dotBtns.forEach((b, k) => b.addEventListener("click", () => { stop(); go(k); play(); }));
    stage.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") { stop(); next(); }
      if (e.key === "ArrowLeft") { stop(); prev(); }
    });

    // arrastar / swipe: cada ~60px troca de ângulo
    let startX = null, acc = 0;
    stage.addEventListener("pointerdown", (e) => {
      startX = e.clientX; acc = 0; stop();
      stage.setPointerCapture(e.pointerId);
      root.classList.add("is-dragging");
    });
    stage.addEventListener("pointermove", (e) => {
      if (startX !== null) {
        acc = e.clientX - startX;
        if (Math.abs(acc) > 60) { acc < 0 ? next() : prev(); startX = e.clientX; }
        return;
      }
      if (reduce || e.pointerType !== "mouse") return;
      const r = stage.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      root.style.setProperty("--ry", (x * 14).toFixed(2) + "deg");
      root.style.setProperty("--rx", (-y * 8).toFixed(2) + "deg");
    });
    const end = () => { startX = null; root.classList.remove("is-dragging"); play(); };
    stage.addEventListener("pointerup", end);
    stage.addEventListener("pointercancel", end);
    root.addEventListener("mouseleave", () => { root.style.setProperty("--ry", "0deg"); root.style.setProperty("--rx", "0deg"); });
    root.addEventListener("mouseenter", stop);
    root.addEventListener("mouseleave", play);
    document.addEventListener("visibilitychange", () => (document.hidden ? stop() : play()));
    play();
  }


  // botão de cotação: usa window.TOPCAR_CONFIG.whatsapp se existir, senão data-whatsapp do botão
  function bindCta() {
    const a = $("#tera .tera__cta");
    if (!a || a.getAttribute("href")) return;
    const num = (window.TOPCAR_CONFIG && window.TOPCAR_CONFIG.whatsapp) || a.dataset.whatsapp;
    a.href = `https://wa.me/${num}?text=${encodeURIComponent(a.dataset.msg)}`;
    a.target = "_blank"; a.rel = "noopener";
  }

  const init = () => { teraHero(); bindCta(); };
  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", init) : init();
})();
