import type { Metadata } from "next";
import { AuthScene } from "@/components/auth/AuthScene";
import { SignupForm } from "@/components/auth/SignupForm";

export const metadata: Metadata = {
  title: "Créer un compte — WildMap",
  description: "Rejoignez la communauté WildMap et découvrez la biodiversité sauvage et locale.",
};

export default function InscriptionPage() {
  return (
    <AuthScene variant="inscription" tagline={["REJOIGNEZ NOUS", "DÈS MAINTENANT"]} title="Créer un compte">
      <SignupForm />
    </AuthScene>
  );
}
