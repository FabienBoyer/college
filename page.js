(() => {
  "use strict";
  // Ordre d'affichage des sections : les 3e d'abord.
  const levelOrder = ["3e", "4e", "5e", "6e"];
  const FILTER_THRESHOLD = 10; // filtres et recherche seulement au-delà de 10 fiches
  const normalized = (text) => String(text).normalize("NFD").replace(/[̀-ͯ]/g, "").toLocaleLowerCase("fr");

  function resolveUrl(value) {
    if (typeof value !== "string" || !value.trim()) return null;
    try {
      const url = new URL(value, document.baseURI);
      return ["https:", "http:", "file:"].includes(url.protocol) ? url.href : null;
    } catch { return null; }
  }

  const source = Array.isArray(window.APPLICATIONS_ELEVES) ? window.APPLICATIONS_ELEVES : [];
  const items = source.flatMap((item) => {
    if (!item || typeof item.titre !== "string" || !item.titre.trim()) return [];
    if (!levelOrder.includes(item.niveau)) return [];
    const liens = Array.isArray(item.liens)
      ? item.liens.map((l) => ({ texte: l && l.texte, href: resolveUrl(l && l.url) })).filter((l) => l.texte && l.href)
      : [];
    const href = resolveUrl(item.url);
    if (!href && !liens.length) return [];
    const parties = Array.isArray(item.parties) ? item.parties.filter((p) => typeof p === "string") : [];
    return [{
      ...item, href, liens, parties,
      search: normalized([item.titre, item.theme || "", item.description || "", item.niveau, ...parties].join(" "))
    }];
  });
  const levels = levelOrder.filter((level) => items.some((item) => item.niveau === level));

  const sections = document.querySelector("#sections");
  const filters = document.querySelector("#filters");
  const levelBox = filters.querySelector(".levels");
  const searchWrap = filters.querySelector(".search-wrap");
  const search = document.querySelector("#search");
  const results = document.querySelector("#results");
  const empty = document.querySelector("#empty-state");
  const reset = document.querySelector("#reset");

  const requestedLevel = new URLSearchParams(location.search).get("niveau");
  let selectedLevel = levels.includes(requestedLevel) ? requestedLevel : "tous";
  const manyItems = items.length > FILTER_THRESHOLD;

  function element(tag, className, content) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (content !== undefined) node.textContent = String(content);
    return node;
  }
  // « 3e » s'écrit partout 3 suivi d'un e en exposant.
  function levelNode(level, prefix = "") {
    const frag = document.createDocumentFragment();
    const match = /^(\d+)(e)$/.exec(level);
    if (!match) { frag.append(prefix + level); return frag; }
    frag.append(prefix + match[1]);
    frag.append(element("sup", "", match[2]));
    return frag;
  }

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
    article.append(head);

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

  function buildFilters() {
    if (!manyItems) return;
    filters.hidden = false;
    searchWrap.hidden = false;
    if (levels.length < 2) return;
    const all = element("button", "", "Tous les niveaux");
    all.type = "button";
    all.dataset.level = "tous";
    levelBox.append(all);
    for (const level of levels) {
      const b = element("button");
      b.type = "button";
      b.dataset.level = level;
      b.append(levelNode(level));
      levelBox.append(b);
    }
    levelBox.addEventListener("click", (event) => {
      const button = event.target.closest("[data-level]");
      if (!button) return;
      selectedLevel = button.dataset.level;
      render();
    });
  }

  function render() {
    const terms = manyItems ? normalized(search.value.trim()).split(/\s+/).filter(Boolean) : [];
    const visible = items.filter((item) =>
      (selectedLevel === "tous" || item.niveau === selectedLevel) &&
      terms.every((term) => item.search.includes(term))
    );
    const blocks = [];
    for (const level of levels) {
      const inLevel = visible.filter((item) => item.niveau === level);
      if (!inLevel.length) continue;
      const section = element("section", "level-section");
      section.id = `niveau-${level}`;
      const h2 = element("h2", "level-title");
      const span = element("span");
      span.append(levelNode(level, "Classe de "));
      h2.append(span);
      const grid = element("div", "app-grid");
      grid.append(...inLevel.map(card));
      section.append(h2, grid);
      blocks.push(section);
    }
    if (selectedLevel !== "tous" && !manyItems) {
      // Lien ?niveau=… partagé : proposer de revenir à toutes les fiches.
      const back = element("p", "show-all");
      const a = element("a", "", "Afficher tous les niveaux");
      a.href = location.pathname;
      back.append(a);
      blocks.push(back);
    }
    sections.replaceChildren(...blocks);
    for (const button of levelBox.querySelectorAll("[data-level]")) {
      button.setAttribute("aria-pressed", String(button.dataset.level === selectedLevel));
    }
    results.textContent = manyItems ? `${visible.length} fiche${visible.length === 1 ? "" : "s"} affichée${visible.length === 1 ? "" : "s"}` : "";
    empty.hidden = visible.length > 0;
    reset.hidden = items.length === 0;
    document.querySelector("#empty-title").textContent = items.length ? "Aucune application trouvée" : "Les applications arrivent bientôt";
    document.querySelector("#empty-text").textContent = items.length
      ? "Essaie un autre mot ou un autre niveau."
      : "Ton professeur ajoutera ici les applications à utiliser en classe ou à la maison.";
  }

  function showUpdateDate() {
    const out = document.querySelector("#updated");
    const value = typeof window.MISE_A_JOUR === "string" ? window.MISE_A_JOUR : "";
    const date = /^\d{4}-\d{2}-\d{2}$/.test(value) ? new Date(value + "T12:00:00") : null;
    if (!date || Number.isNaN(date.getTime())) return;
    const time = element("time", "", date.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }));
    time.dateTime = value;
    out.append("Mise à jour le ", time, ".");
  }

  buildFilters();
  search.addEventListener("input", render);
  reset.addEventListener("click", () => { selectedLevel = "tous"; search.value = ""; render(); });
  render();
  showUpdateDate();
})();
