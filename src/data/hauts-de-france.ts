import type { RegionContenu } from "./types";

const dossier = "/figma/map/hauts-de-france";

export const hautsDeFrance: RegionContenu = {
  slug: "hauts-de-france",
  nom: "Hauts-de-France",
  paysage: { src: `${dossier}/paysage.png`, width: 1739, height: 904, boite: { x: -64, y: 0, w: 1984, h: 1031 } },
  zones: [{ boite: { x: 469.785, y: 152, w: 733.45, h: 383.563 }, d: "M731.214 223.032C730.214 244.532 711.716 296.468 691.215 306.5C670.714 316.532 482.315 370.826 466.715 340C451.115 309.174 393.215 327.156 366.215 340C341.382 357 293.215 385.7 299.215 364.5C305.215 343.3 291.048 345.667 283.215 349.5C271.048 364.167 244.315 390.506 234.715 378.532C225.115 366.558 189.382 373.543 172.715 378.532C29.2141 360 -40.3669 142.47 29.2142 66.5325C133.214 -46.9677 358.646 21.4841 429.714 32.5318C741.714 81.0322 732.214 201.531 731.214 223.032Z", remplissage: 0.55 }],
  epingles: [
    { type: "association", cible: "safe-lille", x: 225, y: 769 },
    { type: "association", cible: "takoda", x: 1636, y: 716 },
    { type: "habitat", cible: "milieux-ouverts-semi-ouverts", x: 1111.5, y: 209.03 },
  ],
  animaux: [
    {
      slug: "phoque-gris",
      nom: "Phoque gris",
      vignette: {
        src: `${dossier}/phoque-gris.png`,
        width: 1024,
        height: 683,
        boite: { x: 49, y: -25, w: 220, h: 295 },
        arrondi: true,
      },
    },
    {
      slug: "lievre-d-europe",
      nom: "Lièvre d’europe",
      vignette: {
        src: `${dossier}/lievre-d-europe.png`,
        width: 1024,
        height: 683,
        boite: { x: 5, y: -28, w: 245, h: 298 },
      },
    },
    {
      slug: "renard-roux",
      nom: "Renard Roux",
      vignette: {
        src: "/figma/map/paca/renard-roux.png",
        width: 736,
        height: 1104,
        boite: { x: 32, y: -43, w: 216, h: 313 },
        recadrage: { left: -20.46, top: -18.95, width: 150.86, height: 155.99 },
      },
      fiche: {
        titre: "Renard roux",
        statut: "Préocupation mineure",
        couleurStatut: "#d98107",
        portrait: {
          src: `${dossier}/renard-roux-fiche.png`,
          width: 736,
          height: 1104,
          boite: { x: 5, y: 157, w: 441, h: 676 },
          recadrage: { left: -20.03, top: -22.85, width: 160.08, height: 156.59 },
        },
        identite: [
          { libelle: "Classe", valeur: "Mammifère" },
          { libelle: "Famille", valeur: "Canidé" },
          { libelle: "Taille", valeur: "40cm" },
          { libelle: "Poids", valeur: "6 - 9kg" },
          { libelle: "Vitesse", valeur: "40 - 50km/h" },
          { libelle: "Longévité", valeur: "3 - 5 ans" },
        ],
        habitat: [
          { libelle: "Climat", valeur: "Tempéré" },
          { libelle: "Biome", valeur: "Forêts, Campagnes" },
          { libelle: "Continents", valeur: "Europe, Asie,\nAmérique du Nord" },
        ],
        regime: {
          alimentaire: "Carnivore",
          aliments: [
            { icone: `${dossier}/icone-cuisse-de-poulet.png`, libelle: "Mulots, lapins, charognes, oiseaux" },
            { icone: "insectes", libelle: "Petits insectes, lombrics" },
          ],
        },
        reproduction: [
          { libelle: "Gestation", valeur: "51 - 53jours" },
          { libelle: "Portée", valeur: "3 - 5 renardeaux" },
        ],
        modeDeVie: [
          [
            "Les renards roux sont plutôt solitaires et chassent généralement seuls.",
            "Ils peuvent être actifs à toute heure de la journée, mais semblent chasser le plus souvent à l'aube",
            "et au crépuscule.",
            "Il n'est pas rare d'observer des renards en plein jour.",
            "Ils restent actifs toute l'année et n'hibernent pas.",
          ],
          [
            "Le renard roux est l’une des espèces de mammifères carnivores les plus répandues à travers le monde.",
            "Il est connu pour sa queue en forme de boule et sa fourrure épaisse et douce.",
          ],
          [
            "Ces animaux sont présents sur tous les continents sauf en Antarctique, il fut même introduit par l’Homme sur certaines îles comme l’Australie.",
            "Ils sont souvent associés à la mythologie et à la culture populaire en tant qu'animaux astucieux et espiègles.",
          ],
        ],
        anecdotes: [
          [
            "Le renard possède une communication vocale extrêmement élaborée, avec au moins 28 émissions vocales différentes ! Non seulement ce dernier est capable de crier, de glapir et de japper, mais il peut aussi cliqueter, ou encore aboyer !",
            "Il est possible de reconnaître l’un d’entre eux, rien qu’au son de sa voix !",
          ],
        ],
      },
    },
    {
      slug: "chevreuil",
      nom: "Chevreuil",
      vignette: {
        src: `${dossier}/chevreuil.png`,
        width: 1024,
        height: 683,
        boite: { x: 0, y: -73, w: 256, h: 343 },
        arrondi: true,
      },
    },
    {
      slug: "blaireau",
      nom: "Blaireau",
      vignette: {
        src: `${dossier}/blaireau.png`,
        width: 1536,
        height: 1024,
        boite: { x: 0, y: -39, w: 235, h: 309 },
        recadrage: { left: -157.89, top: -32.72, width: 349.31, height: 177.26 },
      },
    },
  ],
  habitats: [
    {
      slug: "milieux-ouverts-semi-ouverts",
      titre: "Milieux ouverts\nSemi ouverts",
      sousTitre: "Hauts de France",
      condense: { biome: true, flore: true },
      photo: {
        src: `${dossier}/milieux-ouverts.png`,
        width: 750,
        height: 375,
        boite: { x: 0, y: 147, w: 418, h: 686 },
        recadrage: { left: -68.49, top: 0.06, width: 304.46, height: 99.97 },
      },
      faune: {
        texte: [
          [
            "Les Hauts-de-France sont une terre d'accueil majeure pour les espèces",
            "de plaine et les oiseaux migrateurs.",
            "Les milieux ouverts (prairies, champs, dunes) sont essentiels à leur survie.",
          ],
          [
            "On y trouve des mammifères comme",
            "le lièvre d'Europe, le chevreuil",
            "ou encore le renard roux.",
            "Les zones ouvertes sont le domaine des oiseaux de plaine comme",
            "la perdrix grise et le busard Saint-Martin.",
            "Les insectes, tels que les abeilles sauvages et les papillons de prairie",
            "(le Demi-deuil), jouent un rôle crucial dans la pollinisation de la région.",
          ],
        ],
        especes: [
          {
            nom: "le vanneau huppé",
            image: {
              src: `${dossier}/vanneau-huppe.png`,
              width: 1200,
              height: 900,
              recadrage: { left: -30.05, top: 0, width: 161.6, height: 121.2 },
            },
          },
          {
            nom: "le lièvre d’Europe",
            image: {
              src: `${dossier}/lievre-d-europe-pastille.png`,
              width: 771,
              height: 525,
              recadrage: { left: -57.74, top: -9.51, width: 189.54, height: 129.07 },
            },
          },
          {
            nom: "la perdrix grise",
            image: {
              src: `${dossier}/perdrix-grise.png`,
              width: 1170,
              height: 600,
              recadrage: { left: -32.98, top: 12.51, width: 194.8, height: 99.91 },
            },
          },
        ],
      },
      biome: [
        [
          "Les milieux ouverts et semi-ouverts sont composés",
          "de plaines agricoles (les plus vastes de France),",
          "de prairies bocagères (dans l’Avesnois ou le Boulonnais),",
          "et de milieux dunaires exceptionnels sur la Côte d'Opale.",
          "Ces espaces subissent un climat océanique, marqué par des hivers doux et des précipitations régulières, ce qui favorise des sols fertiles et une végétation riche.",
        ],
      ],
      flore: {
        texte: [
          [
            "La végétation des milieux ouverts s'adapte",
            "à l'exposition au vent et à la nature des sols (souvent calcaires ou sableux).",
            "On trouve des plantes herbacées comme",
            " le coquelicot, le bleuet ou la moutarde des champs dans les zones de cultures.",
            "Sur les pelouses calcicoles (coteaux), on peut observer des espèces rares comme l'orchidée pyramidale.",
            "Dans les milieux semi-ouverts du bocage,",
            "on retrouve des haies de prunelliers, d'aubépines",
            "et de sureau noir qui servent de refuges.",
          ],
        ],
        especes: [
          {
            nom: "l’orchidée pyramidale",
            image: {
              src: `${dossier}/orchidee-pyramidale.png`,
              width: 400,
              height: 600,
              recadrage: { left: 17.23, top: 3.34, width: 66.67, height: 100 },
            },
          },
          {
            nom: "l’aubépine",
            image: {
              src: `${dossier}/aubepine.png`,
              width: 1470,
              height: 785,
              recadrage: { left: -18.71, top: 0, width: 149.51, height: 99.63 },
            },
          },
        ],
      },
    },
  ],
  associations: [
    {
      slug: "safe-lille",
      nom: "SAFE Lille",
      titre: "SAFE Lille",
      sousTitre: "Association",
      logo: {
        src: `${dossier}/safe-lille-logo.png`,
        width: 1333,
        height: 1180,
        boite: { x: 40, y: 222, w: 324, h: 275 },
        recadrage: { left: 0, top: -0.15, width: 100, height: 104.3 },
      },
      photo: {
        src: `${dossier}/safe-lille-photo.png`,
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
            "SAFE Lille \"Secours aux Animaux",
            "de la Faune Environnante de Lille\"",
            "est une association dont l'objet",
            "est de venir en aide aux animaux",
            "de la petite faune sauvage environnante de la métropole de Lille, en accueillant des animaux retrouvés blessés ou en détresse, de stabiliser leur état et de leur apporter les premiers soins.",
          ],
        ],
        pastilles: [
          {
            nom: "le passereau",
            image: {
              src: `${dossier}/passereau.png`,
              width: 1200,
              height: 600,
              recadrage: { left: -55, top: -5.42, width: 215.42, height: 107.92 },
            },
          },
          {
            nom: "le lérot",
            image: {
              src: `${dossier}/lerot.png`,
              width: 456,
              height: 263,
              recadrage: { left: -7.74, top: 13.94, width: 119.71, height: 69.05 },
            },
          },
          {
            nom: "la fouine",
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
            "L’association est composée de citoyens bénévoles,",
            "de membres d’associations de protection animale,",
            "de vétérinaires et d’étudiants dans le soin animalier, qui veulent contribuer à la protection des petites espèces sauvages.",
          ],
          [
            "Et si les soins ne peuvent pas être réalisés",
            "sur place, le suivi sera assuré pour une prise",
            "en charge par l’une des cliniques vétérinaires",
            "avec lesquelles SAFE Lille a une convention.",
          ],
        ],
        pastilles: [
          {
            nom: "Joëlle Gerin, présidente et dirigeante de l’association",
            image: {
              src: `${dossier}/joelle-gerin.png`,
              width: 800,
              height: 550,
              recadrage: { left: -196.07, top: 2.31, width: 303.13, height: 208.4 },
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
      slug: "takoda",
      nom: "Takoda",
      titre: "Takoda",
      sousTitre: "Association",
      logo: {
        src: `${dossier}/takoda-logo.png`,
        width: 846,
        height: 536,
        boite: { x: 14, y: 243, w: 390, h: 232.95 },
        recadrage: { left: -7.97, top: -9.94, width: 116.03, height: 123.08 },
      },
      photo: {
        src: `${dossier}/takoda-photo.png`,
        width: 1248,
        height: 713,
        boite: { x: 0, y: 615, w: 418, h: 219 },
        recadrage: { left: 0, top: -4.52, width: 100, height: 109.05 },
      },
      etat: "Ouvert",
      mission: {
        titre: "Leur mission",
        texte: [
          [
            "L’association Takoda a pour objectif premier de recueillir, soigner les animaux sauvages locaux blessés, malades",
            "ou en détresse, puis de les relâcher.",
          ],
          [
            "Cette association œuvre pour",
            "la préservation des écosystèmes.",
            "En travaillant sur la découverte",
            "de la nature, l’impact humain",
            "et le mieux-vivre ensemble, l’association souhaite à la fois protéger la biodiversité",
            "et recréer du lien entre l’Homme",
            "et la nature.",
          ],
        ],
        pastilles: [
          {
            nom: "le blaireau",
            image: {
              src: `${dossier}/blaireau-pastille.png`,
              width: 960,
              height: 640,
              recadrage: { left: -58.38, top: 2.05, width: 175.6, height: 117.07 },
            },
          },
          {
            nom: "le pic épeiche",
            image: {
              src: `${dossier}/pic-epeiche.png`,
              width: 942,
              height: 1193,
              recadrage: { left: 0.44, top: -9.68, width: 94.1, height: 119.17 },
            },
          },
          {
            nom: "le chevreuil",
            image: {
              src: `${dossier}/chevreuil-pastille.png`,
              width: 1200,
              height: 1200,
              recadrage: { left: -0.26, top: 4.15, width: 118.58, height: 118.58 },
            },
          },
        ],
      },
      membres: {
        titre: "Les membres",
        texte: [["L’équipe est constituée de 7 volontaires enservices civiques accompagnés et de 37 bénévoles."]],
        pastilles: [
          {
            nom: "Sabrina Sabin, Présidente",
            image: {
              src: `${dossier}/sabrina-sabin.png`,
              width: 800,
              height: 1066,
              recadrage: { left: 4.66, top: -57.81, width: 208.82, height: 278.26 },
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
