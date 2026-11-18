import type { Metadata } from "next";
import { Passion_One, Roboto, Sniglet } from "next/font/google";
import "./globals.css";

const passionOne = Passion_One({
  variable: "--font-passion-one",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const sniglet = Sniglet({
  variable: "--font-sniglet",
  subsets: ["latin"],
  weight: ["400", "800"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WildMap — Explorez la faune qui vous entoure",
  description:
    "Découvrez la faune sauvage française et régionale. Une expérience immersive autour de la biodiversité.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${passionOne.variable} ${sniglet.variable} ${roboto.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
