/*
 * LISTE DES APPLICATIONS ET DOCUMENTS DU SITE
 *
 * L'accueil affiche une carte par classe (6e, 4e, 3e). Chaque fiche ci-dessous
 * apparaît sur la page de sa classe (6e/, 4e/ ou 3e/) selon son champ niveau.
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
 *   niveau: "3e",                       // 6e, 4e ou 3e : la page où la fiche apparaît
 *   theme: "Nombres et calculs",
 *   description: "Une ou deux phrases complètes.",
 *   parties: ["Cours", "1. Comparer", "2. Calculer", "3. D.S. blanc"],  // onglets de l'app
 *   url: "apps/fractions.html"
 * }
 *
 * Fiche de document (PDF…) : mêmes champs, sans numero ni parties, avec
 *   liens: [{ texte: "Ouvrir le sujet (PDF)", url: "…" }]
 *
 * Les adresses partent de la racine du site (apps/…, devoirs-communs-4e/…),
 * même si la fiche s'affiche sur une page de classe.
 * Une adresse complète https://… fonctionne aussi.
 */
window.MISE_A_JOUR = "2026-11-26";

window.APPLICATIONS_ELEVES = [
  {
    numero: 1,
    titre: "Nombres entiers et décimaux",
    niveau: "6e",
    theme: "Nombres et calculs",
    description: "Lire et écrire les grands nombres et les nombres décimaux, trouver le chiffre des et le nombre de, supprimer les zéros inutiles, passer d’une fraction décimale à l’écriture décimale et décomposer un nombre. Le chapitre se termine par deux D.S. blancs.",
    parties: ["Cours", "1. Lire et écrire", "2. Chiffres", "3. Zéros et virgule", "4. Fractions", "5. Décomposer", "6. D.S. blanc"],
    url: "apps/nombres-entiers-decimaux.html"
  },
  {
    numero: 2,
    titre: "Éléments de géométrie",
    niveau: "6e",
    theme: "Espace et géométrie",
    description: "Lire et utiliser les notations [AB], (AB), [AB) et ∈, mesurer un segment et utiliser son milieu, reconnaître rayon, diamètre et corde, puis la médiatrice et le cercle circonscrit à un triangle. Le chapitre se termine par deux D.S. blancs.",
    parties: ["Cours", "1. Points et droites", "2. Longueur et milieu", "3. Cercle", "4. Médiatrice", "5. Cercle circonscrit", "6. D.S. blanc"],
    url: "apps/elements-geometrie.html"
  },
  {
    numero: 3,
    titre: "Comparer des nombres décimaux",
    niveau: "6e",
    theme: "Nombres et calculs",
    description: "Comparer deux nombres décimaux avec <, > ou ≤, les ranger dans l’ordre croissant ou décroissant, les encadrer, les arrondir et lire une demi-droite graduée. Le chapitre se termine par deux D.S. blancs.",
    parties: ["Cours", "1. Comparer", "2. Ranger", "3. Encadrer", "4. Arrondir", "5. Demi-droite graduée", "6. D.S. blanc"],
    url: "apps/comparer-decimaux.html"
  },
  {
    titre: "Automatismes",
    niveau: "3e",
    theme: "Automatismes du brevet",
    description: "Les exercices du livre d’automatismes, notion par notion, sur trois niveaux : Je m’échauffe, J’approfondis et Défi Brevet, puis 30 tests de la semaine. La plupart des réponses sont vérifiées automatiquement, et chaque exercice se termine par la correction du livre.",
    parties: ["1. Nombres et calculs", "2. Géométrie", "3. Données et probabilités", "4. Fonctions et Scratch", "5. Tests de la semaine"],
    url: "apps/automatismes.html"
  },
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
    description: "Reconnaître les éléments homologues, démontrer que deux triangles sont semblables et calculer des longueurs. Le chapitre se termine par deux D.S. blancs et un sujet tiré au hasard.",
    parties: ["Cours", "1. Homologues", "2. Par les angles", "3. Par les longueurs", "4. Type brevet", "5. D.S. blanc"],
    url: "apps/triangles-semblables.html"
  },
  {
    numero: 5,
    titre: "Calcul littéral (1)",
    niveau: "3e",
    theme: "Calcul littéral",
    description: "Le sens de la lettre, réduire, développer avec la simple et la double distributivité, factoriser avec un facteur commun et prouver. Le chapitre se termine par deux D.S. blancs.",
    parties: ["0. Le sens de la lettre", "1. Réduire", "2. Simple distributivité", "3. Double distributivité", "4. Factoriser", "5. Prouver", "Bilan", "D.S. blanc"],
    url: "apps/calcul-litteral-1.html"
  },
  {
    numero: 1,
    titre: "Nombres relatifs",
    niveau: "4e",
    theme: "Nombres et calculs",
    description: "Additionner, soustraire et simplifier l’écriture, calculer une somme algébrique, multiplier et diviser avec la règle des signes, puis respecter les priorités opératoires. Le chapitre se termine par deux D.S. blancs.",
    parties: ["Cours", "1. Additionner", "2. Soustraire", "3. Sommes algébriques", "4. Multiplier et diviser", "5. Priorités", "6. D.S. blanc"],
    url: "apps/relatifs.html"
  },
  {
    numero: 2,
    titre: "Pyramides et cônes",
    niveau: "4e",
    theme: "Géométrie",
    description: "Le vocabulaire de la pyramide et du cône, les patrons, les formules d’aire et de volume, le volume d’une pyramide et d’un cône, puis les conversions d’unités de volume et de contenance. Le chapitre se termine par deux D.S. blancs.",
    parties: ["Cours", "1. Vocabulaire", "2. Patrons", "3. Formules", "4. Volume d’une pyramide", "5. Volume d’un cône", "6. Conversions", "7. D.S. blanc"],
    url: "apps/pyramides-cones.html"
  },
  {
    titre: "Devoir commun de mathématiques 2025-2026",
    niveau: "4e",
    theme: "Devoir commun",
    description: "Le sujet compte 3 pages et 8 exercices. Il dure 1 h 30 et il est noté sur 50 points.",
    liens: [
      { texte: "Ouvrir le sujet (PDF)", url: "devoirs-communs-4e/devoir-commun-4e-2025-2026.pdf" },
      { texte: "Ouvrir le corrigé (PDF)", url: "devoirs-communs-4e/corrige-devoir-commun-4e-2025-2026.pdf" }
    ]
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
