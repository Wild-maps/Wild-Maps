import { readFileSync } from "node:fs";
import { createPrivateKey, sign } from "node:crypto";

const options = Object.fromEntries(
  process.argv.slice(2).flatMap((valeur, i, liste) => (valeur.startsWith("--") ? [[valeur.slice(2), liste[i + 1]]] : [])),
);

for (const nom of ["team", "key", "client", "p8"]) {
  if (!options[nom]) {
    console.error("Usage : node scripts/apple-secret.mjs --team ID_EQUIPE --key ID_CLE --client ID_SERVICE --p8 chemin/AuthKey.p8 [--jours 180]");
    process.exit(1);
  }
}

const jours = Math.min(Number(options.jours ?? 180), 180);
const maintenant = Math.floor(Date.now() / 1000);
const expire = maintenant + jours * 86400;
const morceau = (objet) => Buffer.from(JSON.stringify(objet)).toString("base64url");
const contenu = `${morceau({ alg: "ES256", kid: options.key, typ: "JWT" })}.${morceau({
  iss: options.team,
  iat: maintenant,
  exp: expire,
  aud: "https://appleid.apple.com",
  sub: options.client,
})}`;
const signature = sign("sha256", Buffer.from(contenu), {
  key: createPrivateKey(readFileSync(options.p8, "utf8")),
  dsaEncoding: "ieee-p1363",
}).toString("base64url");

process.stdout.write(`${contenu}.${signature}`);
console.error(`Secret valable jusqu'au ${new Date(expire * 1000).toISOString().slice(0, 10)}.`);
