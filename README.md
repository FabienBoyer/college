# Applications compagnon du cours — espace élèves

Site autonome pour GitHub Pages, publié à l’adresse `https://fabienboyer.github.io/college/`.
Aucun lien n’est à ajouter au menu du site compagnon.
Chaque page demande aux moteurs de recherche de ne pas l’indexer (`noindex`).
Cela ne constitue pas une protection : toute personne disposant du lien peut y accéder,
et la balise ne s’applique pas aux PDF.

## Contenu du dépôt

- `index.html` : l’accueil, avec une carte par classe (6e, 4e, 3e).
- `6e/`, `4e/`, `3e/` : une page par classe. Chaque fiche de `applications.js` apparaît sur la
  page de son niveau. Couleur d’accent : 6e vert `#2f7a45`, 4e violet `#7a3f98`, 3e rouge `#b8322a`,
  avec un bandeau pastel en tête des cartes (`style.css`, sélecteurs `[data-niveau]`).
- `style.css`, `page.js` : communs à l’accueil et aux pages de classe.
- `applications.js` : la liste des fiches de l’accueil et la date de mise à jour.
- `apps/` : une application par fichier HTML autonome :
  Arithmétique, Équations, Fonctions (1), Triangles semblables, Calcul littéral (1) (3e) ; Nombres relatifs, Pyramides et cônes, Arithmétique, Pythagore et racine carrée (4e) ; Nombres entiers et décimaux, Éléments de géométrie, Comparer des nombres décimaux, Angles et rapporteur (6e).
- `devoirs-communs-4e/` : sujet et corrigé du devoir commun de 4e (PDF).
- `fonts/` : les polices, hébergées dans le dépôt (aucun appel à Google Fonts).

## Charte commune

Fond papier `#fbf8f1` ligné, encre bleue `#1d3a8a`, titres rouges `#b8322a` soulignés,
marge rouge `#e7a4a0` sur les cartes. Texte en Atkinson Hyperlegible, mathématiques en
STIX Two Text. Une seule navigation de retour dans les apps : « Toutes les applications », qui mène à la page
de la classe (`../3e/` pour les apps de 3e).

`fonts/polices.css` déclare les polices. Les chiffres, exposants et signes
(+ = < > × ÷ − ± °) ne sont jamais pris dans Atkinson : ils s’affichent en STIX Two Text,
même dans les consignes. Il n’y a donc plus de zéro barré. Pour cela, le texte doit
utiliser la pile :

```css
font-family: "Atkinson Hyperlegible", "STIX Two Text", "Segoe UI", system-ui, sans-serif;
```

Dans chaque app, un petit script en fin de page affiche en italique STIX les lettres
mathématiques du texte courant : `x` (seul ou après un chiffre, comme `3x` ou `x²`),
`f` seule, et `g`, `h`, `p` suivies d’une parenthèse. Les autres lettres (a, b, A(x)…)
se balisent à la main : `<i class="m">a</i>`.

## Ajouter une application

1. Déposer le fichier HTML dans `apps/`, par exemple `apps/fractions.html`.
   Dans son `<head>`, charger les polices avec `<link rel="stylesheet" href="../fonts/polices.css">`.
2. Ajouter sa fiche dans `applications.js` (le modèle est en tête du fichier) :
   numéro de chapitre, titre, niveau, thème, description, liste des parties, adresse.
3. Mettre à jour `MISE_A_JOUR` dans `applications.js`.
4. Changer la valeur `v=` des références de `index.html` et des pages `6e/`, `4e/`, `3e/` pour éviter les anciennes
   versions en cache.

La recherche n’apparaît sur une page de classe qu’au-delà de dix fiches.

## Liens à partager après publication

- Accueil : `https://fabienboyer.github.io/college/`
- Page d’une classe : `https://fabienboyer.github.io/college/3e/` (l’ancien lien `?niveau=3e` y mène aussi)
- Application : `https://fabienboyer.github.io/college/apps/equations.html`

## Vérifier localement

Servir le dossier avec `python -m http.server 8765`, puis ouvrir `http://localhost:8765/`.
En ouvrant `index.html` par un double-clic (adresse `file://`), Chrome et Edge bloquent
les polices locales : la page s’affiche alors avec des polices de secours.
