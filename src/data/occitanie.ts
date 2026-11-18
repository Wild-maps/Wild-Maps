import type { RegionContenu } from "./types";

const dossier = "/figma/map/occitanie";
const paca = "/figma/map/paca";

export const occitanie: RegionContenu = {
  slug: "occitanie",
  nom: "Occitanie",
  paysage: { src: `${dossier}/paysage.png`, width: 1738, height: 905, boite: { x: 0, y: -7, w: 1933, h: 1007 } },
  zones: [
    { boite: { x: 1194.85, y: 85.39, w: 726.631, h: 498.426 }, d: "M348.631 13.6306C245.255 48.7429 168.231 106.931 128.631 186.131C102.231 219.331 36.1018 221.122 13.631 272.631C-27.5527 367.033 43.1309 487.131 186.131 472.131C216.964 464.464 261.631 474.131 303.131 487.131C360.983 505.253 550.631 498.631 620.131 451.631C648.139 432.69 678.131 404.631 724.631 338.631V38.1306C718.631 21.7973 689.331 -5.96938 620.131 13.6306C550.931 33.2306 449.025 -20.4688 348.631 13.6306Z" },
    { boite: { x: -2, y: 563.11, w: 290.028, h: 331.252 }, d: "M2 132.404L133.5 3.90391C135.167 1.90391 140.9 0.00418448 144.5 6.40418C148.1 12.8042 241.333 159.238 287.5 232.404C288.667 235.071 288.2 241.404 283 241.404H194.5L212 262.904L144.5 328.404C108.833 290.571 34.6262 214.978 28 208.904C22 203.404 20 205.404 17 208.404L2 225.404V132.404Z" },
  ],
  epingles: [
    { type: "association", cible: "endemic-amis", x: 142, y: 148 },
    { type: "association", cible: "cepec", x: 506, y: 337 },
    { type: "habitat", cible: "milieux-forestiers", x: 1203, y: 231 },
    { type: "habitat", cible: "milieux-montagneux", x: 196, y: 658 },
  ],
  animaux: [
    {
      slug: "aigle-royal",
      nom: "Aigle Royal",
      vignette: {
        src: `${dossier}/aigle-royal.png`,
        width: 1536,
        height: 1024,
        boite: { x: -15, y: -31, w: 283, h: 301 },
        recadrage: { left: -38.43, top: -11.71, width: 225.28, height: 141.12 },
        arrondi: true,
      },
    },
    {
      slug: "flamant-rose",
      nom: "Flamant rose",
      vignette: {
        src: `${dossier}/flamant-rose.png`,
        width: 683,
        height: 1024,
        boite: { x: 23, y: -57, w: 245, h: 327 },
        arrondi: true,
      },
    },
    {
      slug: "ours-brun",
      nom: "Ours Brun",
      vignette: {
        src: `${dossier}/ours-brun.png`,
        width: 1536,
        height: 1024,
        boite: { x: -13, y: -48, w: 281, h: 318 },
        recadrage: { left: -114.62, top: -10.23, width: 257.77, height: 151.89 },
      },
      fiche: {
        titre: "Ours brun",
        statut: "Préocupation mineure",
        couleurStatut: "#d98107",
        portrait: {
          src: `${dossier}/ours-brun-fiche.png`,
          width: 600,
          height: 600,
          boite: { x: 0, y: 148, w: 470.9, h: 684.4 },
        },
        identite: [
          { libelle: "Classe", valeur: "Mammifère" },
          { libelle: "Famille", valeur: "Ursidé" },
          { libelle: "Taille", valeur: "80 - 110cm" },
          { libelle: "Poids", valeur: "100 - 200kg" },
          { libelle: "Vitesse", valeur: "40 - 56km/h" },
          { libelle: "Longévité", valeur: "20 - 30 ans" },
        ],
        habitat: [
          { libelle: "Climat", valeur: "Tempéré" },
          { libelle: "Biome", valeur: "Forêts, Montagnes" },
          { libelle: "Continents", valeur: "Eurasie,\nAmérique du Nord" },
        ],
        regime: {
          alimentaire: "Omnivore",
          aliments: [
            { icone: "fruits", libelle: "Fruits, Baies, Châtaignes" },
            { icone: "insectes", libelle: "Insectes, poissons, Mammifères" },
          ],
        },
        reproduction: [
          { libelle: "Gestation", valeur: "6 - 8 semaines" },
          { libelle: "Portée", valeur: "1 - 3 oursons" },
        ],
        modeDeVie: [
          ["Surtout nocturne et crépusculaire, il peut être actif pendant la journée s’il n’est pas dérangé."],
          [
            "Le domaine vital d’un individu adulte varie de 70 km² pour une femelle avec des oursons à plus de 500 km² pour un mâle adulte et se situe essentiellement sur l’étage montagnard ou les terrains forestiers.",
          ],
          [
            "L’ours brun n’hiberne pas mais hiverne, c’est-à-dire que son sommeil hivernal (dès novembre/décembre) est entrecoupé de périodes de réveil, voire de sorties. Ce n’est que vers la fin mars que le réveil définitif se produit. À son réveil, il est capable de reprendre rapidement ses activités, comme chercher de la nourriture ou parcourir de longues distances dans la nature. Cette capacité à rester plusieurs mois dans sa tanière sans manger ni boire intéresse les chercheurs, qui étudient l’ours pour mieux comprendre comment protéger les muscles et les os chez les humains.",
          ],
        ],
        anecdotes: [
          [
            "Le pied (patte arrière) de l'ours brun mesure 15 à 38 cm de long et 8 à 18 cm de large. Il possède cinq doigts prolongés de griffes puissantes et non-rétractiles et d’un talon. Comme l'Homme, l'ours brun est un plantigrade, c'est-à-dire qu'il se déplace sur la plante de ses pieds",
          ],
        ],
      },
    },
    {
      slug: "vautour-fauve",
      nom: "Vautour fauve",
      vignette: {
        src: `${dossier}/vautour-fauve.png`,
        width: 1024,
        height: 683,
        boite: { x: -58, y: -45, w: 326, h: 315 },
        arrondi: true,
      },
    },
    {
      slug: "taureau-de-camargue",
      nom: "Taureau de Camargue",
      vignette: {
        src: `${dossier}/taureau-de-camargue.png`,
        width: 1402,
        height: 1122,
        boite: { x: 3, y: -45, w: 252, h: 315 },
        recadrage: { left: -42.4, top: -6.46, width: 189.22, height: 120.9 },
      },
    },
  ],
  habitats: [
    {
      slug: "milieux-forestiers",
      titre: "Milieux Forestiers",
      sousTitre: "Occitanie",
      photo: {
        src: `${dossier}/milieux-forestiers.png`,
        width: 1018,
        height: 1362,
        boite: { x: 0, y: 147, w: 418, h: 686 },
        recadrage: { left: -11.34, top: 0, width: 122.68, height: 100 },
      },
      retouches: [{ src: `${dossier}/milieux-forestiers-cache.svg`, boite: { x: 92.37, y: 321.82, w: 74.22, h: 36.47 } }],
      faune: {
        texte: [
          [
            "Les forêts d’Occitanie se distinguent par une biodiversité remarquable, première région métropolitaine avec plus de la moitié des espèces françaises de flore et de faune.",
          ],
          [
            "On y trouve des mammifères comme le sanglier, le chevreuil, le renard, le cerf ou encore le loup. Des oiseaux forestiers comme les chouettes,",
            "les hiboux ou les pics.",
            "Les forêts accueillent également des reptiles et amphibiens, ainsi que de nombreux insectes, essentiels à l’équilibre de l’écosystème.",
          ],
        ],
        especes: [
          {
            nom: "la chouette",
            image: {
              src: `${paca}/chouette.png`,
              width: 600,
              height: 872,
              recadrage: { left: -17.37, top: -17.26, width: 134.74, height: 196.44 },
            },
          },
          {
            nom: "le sanglier",
            image: {
              src: `${paca}/sanglier.png`,
              width: 735,
              height: 1104,
              recadrage: { left: -0.14, top: -35.06, width: 110.31, height: 166.23 },
            },
          },
          {
            nom: "la grenouille",
            image: {
              src: `${dossier}/grenouille.png`,
              width: 735,
              height: 445,
              recadrage: { left: -32.74, top: 13.53, width: 142.45, height: 86.24 },
            },
          },
        ],
      },
      biome: [
        [
          "Le biome des forêts d’Occitanie est principalement constitué de forêts méditerranéennes et tempérées, qui varient selon l’altitude et le climat.",
          "Dans les zones proches de la Méditerranée, les étés sont chauds et secs, ce qui favorise des arbres résistants à la chaleur comme les chênes verts,",
          "les pins d’Alep et les chênes-lièges.",
        ],
        ["Les forêts d’Occitanie sont importantes pour la biodiversité car elles abritent de nombreuses espèces animales et végétales."],
      ],
      flore: {
        texte: [
          [
            "La flore locale des forêts d’Occitanie est très variée grâce aux différences de climat et de relief.",
            "Dans les zones méditerranéennes, on trouve surtout des arbres adaptés à la chaleur et au manque d’eau, comme le chêne vert, le pin d’Alep, le chêne-liège et des plantes aromatiques comme le thym et le romarin.",
          ],
        ],
        especes: [
          {
            nom: "le chêne vert",
            image: {
              src: `${paca}/chene-vert.png`,
              width: 750,
              height: 720,
              recadrage: { left: -5.56, top: 3.03, width: 114.03, height: 108.34 },
            },
          },
          {
            nom: "le pin d’Alep",
            image: {
              src: `${paca}/pin-d-alep.png`,
              width: 1200,
              height: 1200,
              recadrage: { left: 0, top: 0, width: 113.64, height: 113.22 },
            },
          },
        ],
      },
      condense: { flore: true },
    },
    {
      slug: "milieux-montagneux",
      titre: "Milieux Montagneux",
      sousTitre: "Occitanie",
      photo: {
        src: `${dossier}/milieux-montagneux.png`,
        width: 577,
        height: 1024,
        boite: { x: 0, y: 90, w: 418, h: 743 },
        recadrage: { left: -0.08, top: 0, width: 100.16, height: 100 },
      },
      faune: {
        texte: [
          [
            "En Occitanie, les milieux montagneux, notamment dans les Pyrénées, abritent une faune variée et adaptée à l’altitude. On peut y observer des animaux comme l’isard (proche du chamois),",
            "la marmotte, le vautour fauve",
            "et parfois l’ours brun.",
            "Ces espèces sont capables de vivre dans le froid et sur des terrains escarpés grâce à leurs adaptations naturelles.",
            "Les montagnes d’Occitanie sont donc un refuge important pour de nombreux animaux sauvages.",
            "Il est essentiel de protéger ces milieux naturels afin de préserver la biodiversité de la région.",
          ],
        ],
        especes: [
          {
            nom: "l’isard",
            image: {
              src: `${dossier}/isard.png`,
              width: 682,
              height: 1024,
              recadrage: { left: 0, top: -18.26, width: 100, height: 151.06 },
            },
          },
          {
            nom: "la marmotte",
            image: { src: `${dossier}/marmotte.png`, width: 800, height: 800, recadrage: { left: 0, top: 0, width: 100, height: 100 } },
          },
          {
            nom: "l’hermine",
            image: { src: `${dossier}/hermine.png`, width: 714, height: 1024, recadrage: { left: 0, top: 0, width: 100, height: 100 } },
          },
        ],
      },
      biome: [
        [
          "En Occitanie, le biome montagneux se trouve principalement dans les Pyrénées.",
          "Ce milieu est caractérisé par des températures",
          "plus froides, des hivers enneigés et une végétation adaptée à l’altitude.",
          "Ce biome abrite une grande diversité d’animaux et de plantes qui se sont adaptés aux conditions parfois difficiles. Les montagnes d’Occitanie jouent aussi un rôle important dans la protection de la biodiversité et des ressources en eau.",
        ],
      ],
      flore: {
        texte: [
          [
            "On y trouve des forêts de pins et de sapins, ainsi que des fleurs adaptées au froid comme l’edelweiss",
            "et la gentiane.",
            "À mesure que l’altitude augmente, les arbres deviennent plus rares et laissent place aux prairies alpines et aux plantes résistantes aux conditions difficiles.",
            "Cette végétation joue un rôle essentiel",
            "dans l’équilibre naturel des montagnes.",
          ],
        ],
        especes: [
          {
            nom: "le sapin vert",
            image: {
              src: `${dossier}/sapin-vert.png`,
              width: 1200,
              height: 1200,
              recadrage: { left: -8.53, top: -1.52, width: 114.92, height: 114.92 },
            },
          },
          {
            nom: "la gentiane",
            image: {
              src: `${dossier}/gentiane.png`,
              width: 736,
              height: 1308,
              recadrage: { left: -0.15, top: -6.96, width: 100.31, height: 178.26 },
            },
          },
        ],
      },
      condense: { flore: true },
    },
  ],
  associations: [
    {
      slug: "endemic-amis",
      nom: "Endemic’Amis",
      titre: "Endemic’Amis",
      sousTitre: "Association",
      logo: { src: `${dossier}/endemic-amis-logo.png`, width: 225, height: 225, boite: { x: 71, y: 222, w: 277, h: 277 } },
      photo: {
        src: `${dossier}/endemic-amis-photo.png`,
        width: 1344,
        height: 768,
        boite: { x: 0, y: 615, w: 418, h: 219 },
        recadrage: { left: 0, top: -4.53, width: 100, height: 109.07 },
      },
      etat: "Ouvert",
      mission: {
        titre: "Leur mission",
        texte: [
          [
            "Endemic'Amis est une association, déclarée d'intérêt général.",
            "Sa mission principale est de sauvegarder la faune sauvage,",
            "la nature et la biodiversité",
            "par la création d'un centre de soins dans le département du Tarn.",
            "Cet établissement vise à accueillir, soigner puis relâcher,",
            "après une période de convalescence,",
            "les animaux de la faune sauvage",
            "en détresse.",
          ],
          ["Cette association accueille rapaces, passereaux, petits mamifères ou encore reptiles …"],
        ],
        pastilles: [
          {
            nom: "le rouge-gorge",
            image: {
              src: `${dossier}/rouge-gorge.png`,
              width: 416,
              height: 591,
              recadrage: { left: 15.12, top: -6.26, width: 85.19, height: 121.03 },
            },
          },
          {
            nom: "le hérisson",
            image: {
              src: `${dossier}/herisson.png`,
              width: 652,
              height: 360,
              recadrage: { left: -51.63, top: -19.39, width: 243.71, height: 134.56 },
            },
          },
          {
            nom: "la Fouine",
            image: {
              src: `${dossier}/fouine.png`,
              width: 736,
              height: 736,
              recadrage: { left: -33.22, top: 0.37, width: 125.28, height: 125.28 },
            },
          },
        ],
      },
      membres: {
        titre: "Les membres",
        texte: [
          [
            "L’équipe est constituée de professionnels de santé animale qui travaillent 100% bénévolement par manque de financements, aidé par des citoyens bénévoles et des étudiants stagiaires.",
          ],
        ],
        pastilles: [
          {
            nom: "Delphine Valero, Directrice",
            image: {
              src: `${dossier}/delphine-valero.png`,
              width: 885,
              height: 500,
              recadrage: { left: -38.44, top: -44.79, width: 339.78, height: 191.96 },
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
    {
      slug: "cepec",
      nom: "Cepec",
      titre: "Cepec",
      sousTitre: "Association",
      logo: { src: `${dossier}/cepec-logo.png`, width: 411, height: 305, boite: { x: 33, y: 221, w: 352, h: 261 } },
      photo: {
        src: `${dossier}/cepec-photo.png`,
        width: 1344,
        height: 768,
        boite: { x: 0, y: 615, w: 418, h: 219 },
        recadrage: { left: 0, top: -4.53, width: 100, height: 109.07 },
      },
      etat: "Ouvert",
      mission: {
        titre: "Leur mission",
        texte: [
          [
            "CEPEC participe à des programmes de sauvegarde et de renforcement des populations et à l’amélioration des conditions de détention",
            "de certaines espèces de tortues.",
            "Cette association récupère de nombreux spécimens provenant de particuliers, de saisies administratives, des spécimens trouvés sur la voie publique",
            "et autres ...",
            "Certains sont disponibles",
            "à l’adoption.",
          ],
          ["L’établissement n’est pas ouvert", "au public, mais des actions (pédagogiques, formations) ponctuelles sont réalisées."],
        ],
        pastilles: [
          {
            nom: "la tortue d’Hermann",
            image: {
              src: `${dossier}/tortue-d-hermann.png`,
              width: 800,
              height: 800,
              recadrage: { left: -42.3, top: -42.66, width: 187.29, height: 187.29 },
            },
          },
          {
            nom: "la tortue Marginata",
            image: {
              src: `${dossier}/tortue-marginata.png`,
              width: 900,
              height: 600,
              recadrage: { left: -31.52, top: -8.34, width: 162.53, height: 108.36 },
            },
          },
        ],
      },
      membres: {
        titre: "Les membres",
        texte: [
          [
            "L’association C.E.P.E.C. (Centre d’Études de Protection et d’Élevage des Chéloniens)",
            "est constituée de personnes attitrées pour la détention d’espèces protégées",
            "(conditions indispensables pour détenir et manipuler des spécimens protégés).",
          ],
        ],
        pastilles: [
          {
            nom: "Vincent Morcillo, le responsable du centre",
            image: {
              src: `${dossier}/vincent-morcillo.png`,
              width: 200,
              height: 200,
              recadrage: { left: 5.1, top: 12.52, width: 87.67, height: 87.67 },
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
