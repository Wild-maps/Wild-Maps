import type { Metadata } from "next";
import { TopBar } from "@/components/layout/TopBar";

export const metadata: Metadata = {
  title: "Confidentialité — WildMap",
  description: "Les données que WildMap utilise pour les comptes, et ce qu'il en fait.",
};

const contact = "wildmap.contact@gmail.com";

const titre = "font-ui text-[clamp(20px,1.354vw,26px)] text-creme";
const texte = "mt-3 text-[clamp(15px,0.938vw,18px)] leading-relaxed text-creme/85";
const liste = `${texte} flex list-disc flex-col gap-2 pl-5`;
const lien = "text-ciel underline underline-offset-2 hover:text-creme focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ciel";

export default function ConfidentialitePage() {
  return (
    <>
      <TopBar />
      <main className="flex-1 bg-foret-950 px-5 pb-20 pt-[clamp(104px,8vw,150px)] sm:px-8">
        <article className="mx-auto max-w-[760px]">
          <h1 className="font-display text-[clamp(40px,3.646vw,70px)] leading-none text-sable">Confidentialité</h1>
          <p className={texte}>
            WildMap est un projet étudiant d&apos;Aix Ynov Campus. Cette page explique quelles données le site utilise quand vous créez un compte, et ce
            qu&apos;il en fait.
          </p>
          <p className="mt-2 text-[clamp(13px,0.781vw,15px)] text-creme/60">Mise à jour le 18 novembre 2026</p>

          <section className="mt-10">
            <h2 className={titre}>Les données utilisées</h2>
            <ul className={liste}>
              <li>Inscription par e-mail : votre nom, votre adresse e-mail et votre mot de passe, qui n&apos;est jamais enregistré en clair.</li>
              <li>
                Connexion avec Google ou Facebook : le nom, l&apos;adresse e-mail et la photo de profil que ce service nous transmet. WildMap ne reçoit
                jamais votre mot de passe Google ou Facebook.
              </li>
              <li>Notre hébergeur garde des journaux techniques (adresse IP, pages demandées) pour faire fonctionner le site.</li>
            </ul>
            <p className={texte}>Le site n&apos;affiche pas de publicité et n&apos;utilise aucun outil de mesure d&apos;audience.</p>
          </section>

          <section className="mt-10">
            <h2 className={titre}>À quoi elles servent</h2>
            <p className={texte}>
              Uniquement à créer votre compte, à vous connecter et à vous donner accès à la carte. Elles ne sont ni vendues, ni partagées avec qui que ce
              soit.
            </p>
          </section>

          <section className="mt-10">
            <h2 className={titre}>Où elles sont stockées</h2>
            <p className={texte}>Les comptes sont gérés par Supabase (base de données et connexion). Le site est hébergé par Vercel.</p>
          </section>

          <section className="mt-10">
            <h2 className={titre}>Cookies</h2>
            <p className={texte}>
              Le site dépose seulement les cookies nécessaires pour garder votre session ouverte. Aucun cookie publicitaire ou de suivi.
            </p>
          </section>

          <section className="mt-10">
            <h2 className={titre}>Durée de conservation</h2>
            <p className={texte}>Tant que votre compte existe. Sur simple demande, il est supprimé avec toutes ses données.</p>
          </section>

          <section className="mt-10">
            <h2 className={titre}>Vos droits</h2>
            <p className={texte}>
              Vous pouvez consulter, corriger ou supprimer vos données à tout moment. Écrivez-nous à{" "}
              <a href={`mailto:${contact}`} className={lien}>
                {contact}
              </a>
              . Vous pouvez aussi adresser une réclamation à la CNIL (
              <a href="https://www.cnil.fr" className={lien}>
                cnil.fr
              </a>
              ).
            </p>
          </section>
        </article>
      </main>
    </>
  );
}
