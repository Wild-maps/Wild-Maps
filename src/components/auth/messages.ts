import type { AuthError } from "@supabase/supabase-js";

const TROP_DE_TENTATIVES = "Trop de tentatives. Patientez quelques minutes avant de réessayer.";
const INDISPONIBLE = "Le service est indisponible pour le moment. Réessayez dans un instant.";

export const COMPTE_EXISTANT = "Un compte existe déjà avec cette adresse email. Connectez-vous, ou utilisez Google ou Facebook.";

export function messageConnexion(erreur: AuthError): string {
  switch (erreur.code) {
    case "invalid_credentials":
      return "Email ou mot de passe incorrect.";
    case "email_not_confirmed":
      return "Confirmez d’abord votre adresse email grâce au lien que nous vous avons envoyé.";
    case "over_request_rate_limit":
      return TROP_DE_TENTATIVES;
    default:
      return INDISPONIBLE;
  }
}

export function messageInscription(erreur: AuthError): string {
  switch (erreur.code) {
    case "user_already_exists":
    case "email_exists":
      return COMPTE_EXISTANT;
    case "weak_password":
      return "Ce mot de passe est trop faible : utilisez au moins 8 caractères.";
    case "email_address_invalid":
      return "Cette adresse email n’est pas valide.";
    case "over_email_send_rate_limit":
    case "over_request_rate_limit":
      return TROP_DE_TENTATIVES;
    case "signup_disabled":
      return "Les inscriptions sont fermées pour le moment.";
    default:
      return INDISPONIBLE;
  }
}
