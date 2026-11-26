(() => {
  "use strict";
  /*
   * Une seule page.js pour l'accueil et pour les pages de classe.
   * - Accueil (index.html, <body> sans data-niveau) : une carte par classe.
   * - Page de classe (6e/, 4e/, 3e/ : <body data-niveau="6e">) : les fiches
   *   de applications.js dont le niveau correspond.
   * Les adresses de applications.js (apps/…, devoirs-communs-4e/…) partent de
   * la racine du site, quelle que soit la page qui les affiche.
   */
  const CLASSES = [
    { niveau: "6e", nom: "sixième" },
    { niveau: "4e", nom: "quatrième" },
    { niveau: "3e", nom: "troisième" }
  ];
  const FILTER_THRESHOLD = 10; // recherche seulement au-delà de 10 fiches sur une page
  const SCRIPT_URL = document.currentScript ? document.currentScript.src : document.baseURI;
  const ROOT = new URL(".", SCRIPT_URL); // dossier de page.js = racine du site
  const pageLevel = document.body.dataset.niveau || "";
  const normalized = (text) => String(text).normalize("NFD").replace(/[̀-ͯ]/g, "").toLocaleLowerCase("fr");

  // Ancien lien partagé « ?niveau=3e » : on va directement à la page de la classe.
  if (!pageLevel) {
    const requested = new URLSearchParams(location.search).get("niveau");
    if (CLASSES.some((c) => c.niveau === requested)) {
      location.replace(new URL(requested + "/", ROOT).href);
      return;
    }
  }

  function resolveUrl(value) {
    if (typeof value !== "string" || !value.trim()) return null;
    try {
      const url = new URL(value, ROOT);
      return ["https:", "http:", "file:"].includes(url.protocol) ? url.href : null;
    } catch { return null; }
  }

  const source = Array.isArray(window.APPLICATIONS_ELEVES) ? window.APPLICATIONS_ELEVES : [];
  const items = source.flatMap((item) => {
    if (!item || typeof item.titre !== "string" || !item.titre.trim()) return [];
    if (!CLASSES.some((c) => c.niveau === item.niveau)) return [];
    const liens = Array.isArray(item.liens)
      ? item.liens.map((l) => ({ texte: l && l.texte, href: resolveUrl(l && l.url) })).filter((l) => l.texte && l.href)
      : [];
    const href = resolveUrl(item.url);
    if (!href && !liens.length) return [];
    const parties = Array.isArray(item.parties) ? item.parties.filter((p) => typeof p === "string") : [];
    return [{
      ...item, href, liens, parties,
      search: normalized([item.titre, item.theme || "", item.description || "", ...parties].join(" "))
    }];
  });

  function element(tag, className, content) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (content !== undefined) node.textContent = String(content);
    return node;
  }
  // « 3e » s'écrit partout 3 suivi d'un e en exposant.
  function levelNode(level, prefix = "", suffix = "") {
    const frag = document.createDocumentFragment();
    const match = /^(\d+)(e)$/.exec(level);
    if (!match) { frag.append(prefix + level + suffix); return frag; }
    frag.append(prefix + match[1], element("sup", "", match[2]));
    if (suffix) frag.append(suffix);
    return frag;
  }
  const plural = (n, word) => `${n} ${word}${n > 1 ? "s" : ""}`;

  function showUpdateDate() {
    const out = document.querySelector("#updated");
    const value = typeof window.MISE_A_JOUR === "string" ? window.MISE_A_JOUR : "";
    const date = /^\d{4}-\d{2}-\d{2}$/.test(value) ? new Date(value + "T12:00:00") : null;
    if (!out || !date || Number.isNaN(date.getTime())) return;
    const time = element("time", "", date.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }));
    time.dateTime = value;
    out.append("Mise à jour le ", time, ".");
  }

  /* ---------- Accueil : une carte par classe ---------- */
  function renderHome() {
    const doors = document.querySelector("#classes");
    for (const c of CLASSES) {
      const inLevel = items.filter((item) => item.niveau === c.niveau);
      const apps = inLevel.filter((item) => item.href).length;
      const docs = inLevel.length - apps;
      const parts = [];
      if (apps) parts.push(plural(apps, "application"));
      if (docs) parts.push(plural(docs, "document"));

      const a = element("a", "card class-card");
      a.href = new URL(c.niveau + "/", ROOT).href;
      a.dataset.niveau = c.niveau;
      const band = element("div", "band");
      const big = element("p", "class-level");
      big.append(levelNode(c.niveau));
      const h2 = element("h2", "", `Classe de ${c.nom}`);
      band.append(big, h2);
      const count = element("p", "class-count", parts.length ? parts.join(" et ") : "Les applications arrivent bientôt.");
      const go = element("span", "button");
      go.append(levelNode(c.niveau, "Ouvrir la page des "));
      a.append(band, count, go);
      doors.append(a);
    }
  }

  /* ---------- Page de classe ---------- */
  async function copyLink(item, button) {
    const status = document.querySelector("#copy-status");
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Presse-papiers indisponible");
      await navigator.clipboard.writeText(item.href);
      button.textContent = "Lien copié";
      status.textContent = `Lien de « ${item.titre} » copié.`;
      setTimeout(() => { button.textContent = "Copier le lien"; }, 2500);
    } catch {
      window.prompt("Copie ce lien pour retrouver l’application :", item.href);
      status.textContent = "Le lien est affiché dans la fenêtre de copie.";
    }
  }

  function card(item) {
    const article = element("article", "card app-card");
    const band = element("div", "band");
    const head = element("div", "card-head");
    if (Number.isFinite(item.numero)) {
      const num = element("p", "card-number");
      num.append(element("span", "sr-only", "Chapitre "), String(item.numero));
      head.append(num);
    }
    const titles = element("div", "card-titles");
    if (item.theme) titles.append(element("p", "card-theme", item.theme));
    titles.append(element("h3", "", item.titre));
    head.append(titles);
    band.append(head);
    article.append(band);

    if (item.description) article.append(element("p", "card-description", item.description));
    if (item.parties.length) {
      const label = element("p", "card-parts-label", "Dans ce chapitre :");
      const list = element("ul", "card-parts");
      for (const part of item.parties) list.append(element("li", "", part));
      article.append(label, list);
    }

    const actions = element("div", "card-actions");
    if (item.href) {
      const open = element("a", "button", "Ouvrir l’application");
      open.href = item.href;
      open.setAttribute("aria-label", item.numero ? `Ouvrir le chapitre ${item.numero} : ${item.titre}` : `Ouvrir ${item.titre}`);
      const copy = element("button", "copy-link", "Copier le lien");
      copy.type = "button";
      copy.setAttribute("aria-label", `Copier le lien de ${item.titre}`);
      copy.addEventListener("click", () => copyLink(item, copy));
      actions.append(open, copy);
    }
    for (const lien of item.liens) {
      const a = element("a", "button", lien.texte);
      a.href = lien.href;
      actions.append(a);
    }
    article.append(actions);
    return article;
  }

  function renderLevel() {
    const own = items.filter((item) => item.niveau === pageLevel);
    const sections = document.querySelector("#sections");
    const searchWrap = document.querySelector(".search-wrap");
    const search = document.querySelector("#search");
    const results = document.querySelector("#results");
    const empty = document.querySelector("#empty-state");
    const many = own.length > FILTER_THRESHOLD;
    if (many) searchWrap.hidden = false;

    const groups = [
      { titre: "Les applications", test: (item) => Boolean(item.href) },
      { titre: "Les documents", test: (item) => !item.href }
    ];

    function render() {
      const terms = many ? normalized(search.value.trim()).split(/\s+/).filter(Boolean) : [];
      const visible = own.filter((item) => terms.every((term) => item.search.includes(term)));
      const blocks = [];
      for (const g of groups) {
        const list = visible.filter(g.test);
        if (!list.length) continue;
        const section = element("section", "level-section");
        const h2 = element("h2", "level-title");
        h2.append(element("span", "", g.titre));
        const grid = element("div", "app-grid");
        grid.append(...list.map(card));
        section.append(h2, grid);
        blocks.push(section);
      }
      sections.replaceChildren(...blocks);
      results.textContent = many ? `${plural(visible.length, "fiche")} affichée${visible.length > 1 ? "s" : ""}` : "";
      empty.hidden = visible.length > 0;
      document.querySelector("#empty-title").textContent = own.length ? "Aucune application trouvée" : "Les applications arrivent bientôt";
      document.querySelector("#empty-text").textContent = own.length
        ? "Essaie un autre mot."
        : "Ton professeur ajoutera ici les applications à utiliser en classe ou à la maison.";
    }
    if (many) search.addEventListener("input", render);
    render();
  }

  if (pageLevel) renderLevel(); else renderHome();
  showUpdateDate();
})();
