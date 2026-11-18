import type { Metadata } from "next";
import { AuthScene } from "@/components/auth/AuthScene";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Connexion — WildMap",
  description: "Connectez-vous à WildMap pour explorer la faune sauvage qui vous entoure.",
};

export default function ConnexionPage() {
  return (
    <AuthScene variant="connexion" tagline={["BIENVENUE", "SUR WILD MAP"]} title="Connexion">
      <LoginForm />
    </AuthScene>
  );
}
