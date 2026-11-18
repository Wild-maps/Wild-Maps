import type { Metadata } from "next";
import { AuthScene } from "@/components/auth/AuthScene";
import { CarteProfil } from "@/components/compte/CarteProfil";

export const metadata: Metadata = {
  title: "Mon profil — WildMap",
  description: "Votre compte WildMap : avec quoi vous êtes connecté, changer de compte ou vous déconnecter.",
  robots: { index: false },
};

export default function ProfilPage() {
  return (
    <AuthScene variant="connexion" tagline={["CONTENT DE", "VOUS REVOIR !"]} title="Mon profil">
      <CarteProfil />
    </AuthScene>
  );
}
