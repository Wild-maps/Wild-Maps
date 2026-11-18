import type { RegionContenu } from "./types";

const dossier = "/figma/map/paca";

export const paca: RegionContenu = {
  slug: "paca",
  nom: "Provence-Alpes-Côte d’Azur",
  paysage: { src: `${dossier}/paysage.png`, width: 1738, height: 905, boite: { x: -60, y: 0, w: 1980, h: 1031 } },
  zones: [{ boite: { x: 1215.05, y: 502.89, w: 704.576, h: 493.157 }, d: "M441.631 127.102C339.113 162.214 150.796 102.033 111.525 181.233C85.3444 214.433 26.2302 256.594 3.94593 308.102C-7.14277 333.733 26.735 482.233 168.548 467.233C199.125 459.566 243.421 469.233 284.576 482.233C341.948 500.355 500.33 490.91 574.946 453.602C601.946 440.102 652.446 333.733 702.576 333.733V33.2327C696.626 16.8994 667.57 -10.8673 598.944 8.73272C530.319 28.3327 541.191 93.0027 441.631 127.102Z" }],
  epingles: [
    { type: "association", cible: "refuge-des-pattes-abandonnees", x: 249, y: 229 },
    { type: "habitat", cible: "milieux-forestiers", x: 1588, y: 545 },
  ],
  animaux: [
    {
      slug: "gecko",
      nom: "Gecko",
      vignette: {
        src: `${dossier}/gecko.png`,
        width: 656,
        height: 960,
        boite: { x: 15, y: -30, w: 251, h: 301 },
        recadrage: { left: 0, top: -11, width: 111.95, height: 136.71 },
      },
    },
    {
      slug: "renard-roux",
      nom: "Renard roux",
      vignette: {
        src: `${dossier}/renard-roux.png`,
        width: 736,
        height: 1104,
        boite: { x: 25, y: -42, w: 216, h: 313 },
        recadrage: { left: -20.46, top: -18.95, width: 150.86, height: 155.99 },
      },
    },
    {
      slug: "ecureuil-volant",
      nom: "Ecureuil volant",
      vignette: {
        src: `${dossier}/ecureuil-volant.png`,
        width: 736,
        height: 736,
        boite: { x: 0, y: -16, w: 312.28, h: 286.69 },
        recadrage: { left: -15.66, top: -11.52, width: 126.33, height: 137.26 },
      },
      fiche: {
        petitesTraces: true,
        statut: "Préocupation mineure",
        couleurStatut: "#d98107",
        portrait: {
          src: `${dossier}/ecureuil-volant-fiche.png`,
          width: 736,
          height: 736,
          boite: { x: 0, y: 179, w: 475, h: 654 },
        },
        identite: [
          { libelle: "Classe", valeur: "Mammifère" },
          { libelle: "Famille", valeur: "Sciuridé" },
          { libelle: "Taille", valeur: "12 - 38cm" },
          { libelle: "Poids", valeur: "45 - 150g" },
          { libelle: "Vitesse", valeur: "30 - 50km/h" },
          { libelle: "Longévité", valeur: "5 - 6 ans" },
        ],
        habitat: [
          { libelle: "Climat", valeur: "Tempéré" },
          { libelle: "Biome", valeur: "Forêts" },
          { libelle: "Continents", valeur: "Asie,\nAmérique du Nord" },
        ],
        regime: {
          alimentaire: "Omnivore",
          aliments: [
            { icone: "fruits", libelle: "Fruits et fruits secs" },
            { icone: "insectes", libelle: "Petits insectes" },
          ],
        },
        reproduction: [
          { libelle: "Gestation", valeur: "37 - 42 jours" },
          { libelle: "Portée", valeur: "2 - 4 petits" },
        ],
        modeDeVie: [
          [
            "L’écureuil volant est nocturne et passe la plupart",
            "de son temps dans les arbres.",
            "Grâce à sa membrane de peau, il plane d’un arbre",
            "à l’autre pour trouver nourriture et abri.",
          ],
          [
            "Il vit en petits groupes familiaux et communique",
            "par de légers cris aigus.",
            "Très agile, il utilise les cavités d’arbres pour",
            "se protéger et élever ses petits.",
            "Lécureuil volant est un animal très joueur mais aussi  parfois mesquin qui aime entassé sa nourriture pour avoir de quoi passer l’hiver.",
          ],
        ],
        anecdotes: [
          [
            "Contrairement à ce que son nom pourrait suggérer, l’écureuil volant ne vole pas réellement, il pratique le vol plané grâce à une membrane de peau appelée patagium.",
          ],
          [
            "Tendue entre ses membres.",
            "Cette adaptation lui permet de parcourir jusqu’à 50 mètres en un seul saut, avec une précision remarquable à l’atterrissage.",
          ],
          [
            "Chez l’écureuil volant, la communication nocturne repose en grande partie sur des ultrasons.",
            "Ces vocalisations leur permettent de signaler",
            "leur présence et possiblement de coordonner",
            "leurs déplacements dans l’obscurité.",
          ],
        ],
      },
    },
    {
      slug: "chamois",
      nom: "Chamois",
      vignette: {
        src: `${dossier}/chamois.png`,
        width: 1076,
        height: 1344,
        boite: { x: -1, y: -44, w: 270, h: 316 },
        recadrage: { left: -0.11, top: -6.96, width: 100.22, height: 106.96 },
        arrondi: true,
      },
    },
    {
      slug: "huppe",
      nom: "Huppe",
      vignette: {
        src: `${dossier}/huppe.png`,
        width: 735,
        height: 833,
        boite: { x: 19, y: -50, w: 249, h: 321 },
        recadrage: { left: -19.35, top: -4.98, width: 119.42, height: 104.98 },
        arrondi: true,
      },
    },
  ],
  habitats: [
    {
      slug: "milieux-forestiers",
      titre: "Milieux Forestiers",
      sousTitre: "Provence",
      photo: {
        src: `${dossier}/milieux-forestiers.png`,
        width: 1000,
        height: 628,
        boite: { x: 0, y: 147, w: 418, h: 686 },
      },
      faune: {
        texte: [
          [
            "La faune des forêts de Provence",
            "est riche et variée, adaptée au climat méditerranéen.",
            "On y trouve de nombreux mammifères, oiseaux et reptiles qui profitent",
            "des zones boisées pour se nourrir",
            "et se protéger.",
            "Ces espèces jouent un rôle important dans l’équilibre de l’écosystème forestier.",
          ],
          ["La faune représentative de ce biôme :"],
        ],
        especes: [
          {
            nom: "le sanglier",
            image: {
              src: `${dossier}/sanglier.png`,
              width: 735,
              height: 1104,
              recadrage: { left: -0.14, top: -35.06, width: 110.31, height: 166.23 },
            },
          },
          {
            nom: "la chouette",
            image: {
              src: `${dossier}/chouette.png`,
              width: 600,
              height: 872,
              recadrage: { left: -17.37, top: -17.26, width: 134.74, height: 196.44 },
            },
          },
          {
            nom: "le renard",
            image: {
              src: `${dossier}/renard-roux.png`,
              width: 736,
              height: 1104,
              recadrage: { left: -13.41, top: -26.24, width: 116.19, height: 172.72 },
            },
          },
          {
            nom: "lézard commun",
            image: {
              src: `${dossier}/lezard-commun.png`,
              width: 1024,
              height: 864,
              recadrage: { left: -45.13, top: -7.82, width: 170.88, height: 144.18 },
            },
          },
        ],
      },
      biome: [
        [
          "Les forêts de Provence occupent une place importante dans le paysage du département.",
          "Elles sont composées principalement de chênes verts, de chênes blancs et de pins, typiques du climat méditerranéen.",
        ],
        [
          "Ces forêts abritent une grande diversité d’animaux",
          "et de plantes, et jouent un rôle essentiel",
          "dans la protection des sols contre l’érosion.",
          "Elles jouent également un rôle majeur dans la lutte contre le réchauffement climatique.",
        ],
      ],
      flore: {
        texte: [
          [
            "La flore des forêts de la Provence",
            "est caractéristique du milieu méditerranéen",
            "et bien adaptée à la chaleur et à la sécheresse.",
            "Elle est composée d’arbres, d’arbustes et de plantes résistantes qui forment des paysages variés, allant des forêts denses aux zones de garrigue.",
          ],
          ["La flore représentative de ce biôme  :"],
        ],
        especes: [
          {
            nom: "le chêne vert",
            image: {
              src: `${dossier}/chene-vert.png`,
              width: 750,
              height: 720,
              recadrage: { left: -5.56, top: 3.03, width: 114.03, height: 108.34 },
            },
          },
          {
            nom: "le pin d’Alep",
            image: {
              src: `${dossier}/pin-d-alep.png`,
              width: 1200,
              height: 1200,
              recadrage: { left: 0, top: 0, width: 113.64, height: 113.22 },
            },
          },
        ],
      },
    },
  ],
  associations: [
    {
      slug: "refuge-des-pattes-abandonnees",
      nom: "Refuge des Pattes Abandonnées",
      titre: "Refuge",
      sousTitre: "Association",
      logo: {
        src: `${dossier}/refuge-logo.png`,
        width: 1536,
        height: 1024,
        boite: { x: 37, y: 239, w: 339, h: 238.5 },
        recadrage: { left: -16.48, top: -7.99, width: 137.12, height: 129.59 },
      },
      photo: {
        src: `${dossier}/refuge-photo.png`,
        width: 1024,
        height: 586,
        boite: { x: 0, y: 615, w: 418, h: 219 },
        recadrage: { left: 0, top: -4.61, width: 100, height: 109.22 },
      },
      etat: "Ouvert",
      mission: {
        titre: "Leur mission",
        texte: [
          ["Refuge des Pattes Abandonnées éssentiellement des chiens", "et des chats abandonnées", "dans la région de P.A.C.A."],
          [
            "Suite à une augmentation",
            "de l’abandon des animaux",
            "de compagnie tels que les chiens",
            "ou les chats en France",
            "ces dernières années, le refuge",
            "est investi à récupérer ces derniers",
            "afin de leur retrouver une famille aimante.",
          ],
          [
            "Le refuge œuvre ainsi à réparer",
            "les cruautés humaines faites",
            "sur les animaux de compagnie",
            "et est aujourd’hui une référence dans la région.",
          ],
        ],
        pastilles: [
          {
            nom: "les chiens",
            image: {
              src: `${dossier}/chien.png`,
              width: 1200,
              height: 1499,
              recadrage: { left: 1.93, top: 0, width: 97.96, height: 122.55 },
            },
          },
          {
            nom: "les chats",
            image: {
              src: `${dossier}/chat.png`,
              width: 736,
              height: 1030,
              recadrage: { left: 0, top: -0.1, width: 100, height: 139.95 },
            },
          },
        ],
      },
      membres: {
        titre: "Les membres",
        texte: [
          [
            "Le refuge compte aujourd’hui une vingtaine",
            "de membres actifs afin d’œuvrer au soin",
            "des animaux récupérés le temps que ces derniers trouvent une nouvelle famille.",
          ],
          ["Voici les fondateurs principaux pour ce refuge :"],
        ],
        pastilles: [
          {
            nom: "Hélène, la fondatrice",
            image: {
              src: `${dossier}/helene.png`,
              width: 1200,
              height: 1800,
              recadrage: { left: -2.67, top: -8.87, width: 108.43, height: 163.59 },
            },
          },
          {
            nom: "Marc le Co-fondateur",
            image: {
              src: `${dossier}/marc.png`,
              width: 576,
              height: 1024,
              recadrage: { left: 2.57, top: -3.43, width: 95.41, height: 171.85 },
            },
          },
        ],
      },
      contact: {
        telephone: "00.00.00.00.00",
        email: "contact@contact.fr",
        site: "SiteDuRefuge.fr",
        adresse: "Adresse Maps",
      },
    },
  ],
};
