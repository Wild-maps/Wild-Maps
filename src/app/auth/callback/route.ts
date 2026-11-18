import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Retour de Google, Facebook ou du lien de confirmation par email : on échange le code contre une session.
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/carte";
  // on n'accepte qu'un chemin du site, jamais une adresse externe
  const destination = /^\/(?![/\\])/.test(next) ? next : "/carte";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(new URL(destination, origin));
  }
  return NextResponse.redirect(new URL("/connexion?erreur=connexion", origin));
}
