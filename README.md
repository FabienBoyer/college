# L’atelier maths — espace élèves

Page autonome pour GitHub Pages. Aucun lien n’est à ajouter au menu du site compagnon.
La page demande aux moteurs de recherche de ne pas l’indexer (`noindex, nofollow`).
Cela ne constitue pas une protection : toute personne disposant du lien peut y accéder.

## Publication à l’adresse /college/

Pour obtenir `https://fabienboyer.github.io/college/`, créer un dépôt GitHub nommé
`college`, y déposer le **contenu** de ce dossier à la racine, puis activer GitHub
Pages sur la branche qui contient les fichiers (dossier racine).

Si le dépôt `FabienBoyer.github.io` existe déjà, le dossier `college/` peut aussi
être ajouté à sa racine. Ne pas ajouter ces fichiers au dépôt `site-compagnon`
si l’on veut conserver l’adresse `/college/`.

## Ajouter une application

1. Déposer le fichier HTML dans `apps/`, par exemple `apps/fractions.html`.
2. Si l’application utilise d’autres fichiers (images, JS, CSS), conserver ses
   sous-dossiers et ses liens relatifs. Une application avec plusieurs fichiers
   peut être placée dans `apps/fractions/index.html`.
3. Ajouter sa fiche dans `applications.js` :

```js
window.APPLICATIONS_ELEVES = [
  {
    titre: "Fractions",
    description: "Représenter et comparer des fractions.",
    niveaux: ["6e", "5e"],
    chapitre: "Nombres et calculs",
    url: "apps/fractions.html",
    symbole: "¾",
    couleur: "orange"
  }
];
```

Plusieurs fiches sont séparées par des virgules. Les niveaux acceptés sont
`6e`, `5e`, `4e`, `3e` ; `[]` signifie tous les niveaux. Les couleurs sont
`bleu`, `vert`, `orange`, `violet`. Une adresse complète `https://…` fonctionne aussi.
Le bouton « Ouvrir l’application » navigue directement vers le fichier HTML.
Le petit bouton adjacent copie le lien direct à transmettre aux élèves.

Ne mettre une fiche en ligne que lorsque son fichier est présent. Les exemples
de cette notice ne sont pas des applications incluses : le catalogue est vide.

## Liens à partager après publication

- Page : `https://fabienboyer.github.io/college/`
- Vue 4e : `https://fabienboyer.github.io/college/?niveau=4e`
- Application : `https://fabienboyer.github.io/college/apps/fractions.html`
  (uniquement après avoir ajouté ce fichier).

## Vérifier localement

Ouvrir `index.html` dans un navigateur pour vérifier la page. On peut aussi
servir ce dossier avec `python -m http.server 8765` et ouvrir
`http://localhost:8765/`. La page ne dépend d’aucune bibliothèque, police ou
requête externe. Les applications ajoutées peuvent avoir leurs propres dépendances.
