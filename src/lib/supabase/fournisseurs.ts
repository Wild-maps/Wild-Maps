// Supabase publie les fournisseurs de connexion activés (Authentication > Providers) sur /auth/v1/settings.
// En cas de doute (réseau, réponse inattendue), on laisse Supabase trancher plutôt que de bloquer le bouton.
export async function fournisseurActif(fournisseur: "google" | "facebook"): Promise<boolean> {
  try {
    const reponse = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/settings`, {
      headers: { apikey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY! },
    });
    if (!reponse.ok) return true;
    const { external } = (await reponse.json()) as { external?: Record<string, boolean> };
    return external?.[fournisseur] !== false;
  } catch {
    return true;
  }
}
