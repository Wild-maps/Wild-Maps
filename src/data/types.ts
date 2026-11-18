export type RegionSlug = "paca" | "occitanie" | "hauts-de-france";

export type ImageSource = { src: string; width: number; height: number };

export type Boite = { x: number; y: number; w: number; h: number };

export type Recadrage = { left: number; top: number; width: number; height: number };

export type ImageCadree = ImageSource & { boite: Boite; recadrage?: Recadrage };

export type Pastille = { nom: string; image: ImageSource & { recadrage: Recadrage } };

export type LigneFiche = { libelle: string; valeur: string };

export type Texte = string[][];

export type Aliment = { icone: "fruits" | "insectes" | string; libelle: string };

export type FicheAnimal = {
  titre?: string;
  petitesTraces?: boolean;
  statut: string;
  couleurStatut: string;
  portrait: ImageCadree;
  identite: LigneFiche[];
  habitat: LigneFiche[];
  regime: { alimentaire: string; aliments: Aliment[] };
  reproduction: LigneFiche[];
  modeDeVie: Texte;
  anecdotes: Texte;
};

// Modèle .glb (colonne animals.model_3d_url) et, s'il est sous licence CC Attribution, le crédit de son auteur
export type Modele3D = { url: string; credit?: string };

export type Animal = {
  slug: string;
  nom: string;
  vignette: ImageCadree & { arrondi?: boolean };
  fiche?: FicheAnimal;
  modele3d?: Modele3D;
};

export type Habitat = {
  slug: string;
  titre: string;
  sousTitre: string;
  photo: ImageCadree;
  faune: { texte: Texte; especes: Pastille[] };
  biome: Texte;
  flore: { texte: Texte; especes: Pastille[] };
  condense?: { biome?: boolean; flore?: boolean };
  retouches?: Zone[];
};

export type Association = {
  slug: string;
  nom: string;
  titre: string;
  sousTitre: string;
  logo: ImageCadree;
  photo: ImageCadree;
  etat: string;
  mission: { titre: string; texte: Texte; pastilles: Pastille[] };
  membres: { titre: string; texte: Texte; pastilles: Pastille[] };
  contact: { telephone: string; email: string; site: string; adresse: string };
};

export type Epingle = { type: "habitat" | "association"; cible: string; x: number; y: number };

export type Zone = { src: string; boite: Boite };

export type ZoneTracee = { boite: Boite; d: string; remplissage?: number };

export type RegionContenu = {
  slug: string;
  nom: string;
  paysage: ImageCadree;
  zones: ZoneTracee[];
  epingles: Epingle[];
  animaux: Animal[];
  habitats: Habitat[];
  associations: Association[];
};
