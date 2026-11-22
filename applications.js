/*
 * LISTE DES APPLICATIONS ET DOCUMENTS DE L'ACCUEIL
 *
 * Ajouter une application :
 * 1. Déposer son fichier HTML dans apps/.
 * 2. Ajouter une fiche dans le tableau ci-dessous (fiches séparées par des virgules).
 * 3. Mettre à jour la date MISE_A_JOUR, puis publier.
 *
 * Fiche d'application :
 * {
 *   numero: 5,                          // numéro de chapitre, affiché en grand
 *   titre: "Fractions",
 *   niveau: "3e",                       // 6e, 5e, 4e ou 3e : une section par niveau
 *   theme: "Nombres et calculs",
 *   description: "Une ou deux phrases complètes.",
 *   parties: ["Cours", "1. Comparer", "2. Calculer", "3. D.S. blanc"],  // onglets de l'app
 *   url: "apps/fractions.html"
 * }
 *
 * Fiche de document (PDF…) : mêmes champs, sans numero ni parties, avec
 *   liens: [{ texte: "Ouvrir le sujet (PDF)", url: "…" }]
 *
 * Une adresse complète https://… fonctionne aussi.
 */
window.MISE_A_JOUR = "2026-11-22";

window.APPLICATIONS_ELEVES = [
  {
    numero: 1,
    titre: "Arithmétique",
    niveau: "3e",
    theme: "Nombres et calculs",
    description: "Multiples, diviseurs, nombres premiers, PGCD, PPCM et fractions irréductibles, puis des problèmes de partage et de rendez-vous. Le chapitre se termine par deux D.S. blancs.",
    parties: ["Cours", "1. Diviseurs", "2. Premiers", "3. PGCD", "4. Problèmes", "5. D.S. blanc"],
    url: "apps/arithmetique.html"
  },
  {
    numero: 2,
    titre: "Équations",
    niveau: "3e",
    theme: "Calcul littéral",
    description: "Tester une solution, transformer et résoudre une équation, puis mettre un problème en équation. Le chapitre se termine par deux D.S. blancs.",
    parties: ["Cours", "1. Tester", "2. Règles", "3. Résoudre", "4. Problèmes", "5. D.S. blanc"],
    url: "apps/equations.html"
  },
  {
    numero: 3,
    titre: "Fonctions (1)",
    niveau: "3e",
    theme: "Fonctions",
    description: "Quatre représentations d’une fonction, images et antécédents, lecture graphique, calculs et programmes de calcul. Le chapitre se termine par deux D.S. blancs.",
    parties: ["Cours", "1. Quatre représentations", "2. Vocabulaire", "3. Lecture graphique", "4. Calculs", "5. D.S. blanc"],
    url: "apps/fonctions-1.html"
  },
  {
    numero: 4,
    titre: "Triangles semblables",
    niveau: "3e",
    theme: "Géométrie",
    description: "Reconnaître les éléments homologues, démontrer que deux triangles sont semblables et calculer des longueurs. Le chapitre se termine par un D.S. blanc.",
    parties: ["1. Homologues", "2. Par les angles", "3. Par les longueurs", "4. Type brevet", "5. D.S. blanc"],
    url: "apps/triangles-semblables.html"
  },
  {
    titre: "Devoir commun de mathématiques 2024-2025",
    niveau: "4e",
    theme: "Devoir commun",
    description: "Le sujet compte 6 pages et 5 exercices. Il dure 1 h 30 et il est noté sur 50 points.",
    liens: [
      { texte: "Ouvrir le sujet (PDF)", url: "devoirs-communs-4e/devoir-commun-4e-2024-2025.pdf" },
      { texte: "Ouvrir le corrigé (PDF)", url: "devoirs-communs-4e/corrige-devoir-commun-4e-2024-2025.pdf" }
    ]
  }
];
