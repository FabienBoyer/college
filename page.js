(() => {
  "use strict";
  const allLevels = ["6e", "5e", "4e", "3e"];
  const normalized = (text) => String(text).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("fr");
  function resolveUrl(value) {
    if (typeof value !== "string" || !value.trim()) return null;
    try {
      const url = new URL(value, document.baseURI);
      return ["https:", "http:", "file:"].includes(url.protocol) ? url.href : null;
    } catch { return null; }
  }
  const source = Array.isArray(window.APPLICATIONS_ELEVES) ? window.APPLICATIONS_ELEVES : [];
  const applications = source.flatMap((app) => {
    if (!app || typeof app.titre !== "string" || !app.titre.trim()) return [];
    const href = resolveUrl(app.url);
    if (!href) return [];
    const levels = Array.isArray(app.niveaux) ? app.niveaux.filter((level) => allLevels.includes(level)) : [];
    return [{ ...app, href, niveaux: levels, search: normalized([app.titre, app.description || "", app.chapitre || "", ...levels].join(" ")) }];
  });
  const grid = document.querySelector("#app-grid");
  const search = document.querySelector("#search");
  const results = document.querySelector("#results");
  const empty = document.querySelector("#empty-state");
  const reset = document.querySelector("#reset");
  const levelButtons = [...document.querySelectorAll("[data-level]")];
  const requestedLevel = new URLSearchParams(location.search).get("niveau");
  let selectedLevel = allLevels.includes(requestedLevel) ? requestedLevel : "tous";
  document.querySelector("#filters").hidden = applications.length === 0;

  function element(tag, className, content) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (content !== undefined) node.textContent = String(content);
    return node;
  }
  async function copyLink(app, button) {
    const status = document.querySelector("#copy-status");
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(app.href);
      status.textContent = `Lien de « ${app.titre} » copié.`;
      button.setAttribute("aria-label", `Lien de ${app.titre} copié`);
      button.title = "Lien copié";
    } catch {
      window.prompt("Copie ce lien pour retrouver l’application :", app.href);
      status.textContent = "Le lien est disponible dans la fenêtre de copie.";
    }
  }
  function card(app) {
    const article = element("article", "app-card");
    const banner = element("div", "card-banner");
    banner.dataset.theme = ["vert", "orange", "violet"].includes(app.couleur) ? app.couleur : "bleu";
    const symbol = element("span", "card-symbol", app.symbole || "ƒ");
    symbol.setAttribute("aria-hidden", "true");
    banner.append(symbol, element("span", "card-topic", app.chapitre || "Mathématiques"));
    const body = element("div", "card-body");
    const levels = element("div", "card-levels");
    for (const level of app.niveaux.length ? app.niveaux : ["Tous niveaux"]) levels.append(element("span", "", level));
    const actions = element("div", "card-actions");
    const open = element("a", "open-app", "Ouvrir l’application");
    open.href = app.href;
    open.setAttribute("aria-label", `Ouvrir ${app.titre}`);
    const copy = element("button", "copy-link");
    copy.type = "button";
    copy.title = "Copier le lien direct";
    copy.setAttribute("aria-label", `Copier le lien de ${app.titre}`);
    copy.innerHTML = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m10 13 4-4m-5 7-1 1a4 4 0 0 1-6-6l4-4a4 4 0 0 1 6 0m0 10a4 4 0 0 0 6 0l4-4a4 4 0 0 0-6-6l-1 1" transform="translate(1 1) scale(.9)" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
    copy.addEventListener("click", () => copyLink(app, copy));
    actions.append(open, copy);
    body.append(levels, element("h3", "", app.titre), element("p", "card-description", app.description || ""), actions);
    article.append(banner, body);
    return article;
  }
  function render() {
    const terms = normalized(search.value.trim()).split(/\s+/).filter(Boolean);
    const visible = applications.filter((app) =>
      (selectedLevel === "tous" || !app.niveaux.length || app.niveaux.includes(selectedLevel)) &&
      terms.every((term) => app.search.includes(term))
    );
    grid.replaceChildren(...visible.map(card));
    for (const button of levelButtons) button.setAttribute("aria-pressed", String(button.dataset.level === selectedLevel));
    results.textContent = applications.length ? `${visible.length} application${visible.length === 1 ? "" : "s"}` : "";
    empty.hidden = visible.length > 0;
    reset.hidden = applications.length === 0;
    document.querySelector("#empty-title").textContent = applications.length ? "Aucune application trouvée" : "Les activités arrivent bientôt";
    document.querySelector("#empty-text").textContent = applications.length
      ? "Essaie un autre mot-clé ou un autre niveau."
      : "Ton professeur ajoutera ici les applications à utiliser en classe ou à la maison.";
  }
  for (const button of levelButtons) button.addEventListener("click", () => {
    selectedLevel = button.dataset.level;
    render();
  });
  search.addEventListener("input", render);
  reset.addEventListener("click", () => { selectedLevel = "tous"; search.value = ""; render(); search.focus(); });
  render();
})();
