"use client";

import { useState, useTransition, type FormEvent } from "react";

export type FieldRule = { missing: string; invalid?: string };
export type Notice = { zone: "form" | "social"; text: string };

const ERREUR_GENERIQUE = "Une erreur est survenue. Réessayez dans un instant.";

function findErrors<K extends string>(form: HTMLFormElement, rules: Record<K, FieldRule>) {
  const errors: Partial<Record<K, string>> = {};
  for (const name of Object.keys(rules) as K[]) {
    const field = form.elements.namedItem(name);
    if (!(field instanceof HTMLInputElement)) continue;
    const empty = field.type === "checkbox" ? !field.checked : field.value.trim() === "";
    if (empty) errors[name] = rules[name].missing;
    else if (!field.validity.valid && rules[name].invalid) errors[name] = rules[name].invalid;
  }
  return errors;
}

// `submit` reçoit les valeurs du formulaire une fois les champs validés et renvoie le message à afficher
// (ou null s'il n'y en a pas, par exemple après une redirection).
export function useAuthForm<K extends string>(rules: Record<K, FieldRule>, submit: (values: FormData) => Promise<string | null>) {
  const [errors, setErrors] = useState<Partial<Record<K, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [notice, setNotice] = useState<Notice | null>(null);
  const [isPending, startTransition] = useTransition();

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const found = findErrors(form, rules);
    setErrors(found);
    setSubmitted(true);

    const firstInvalid = (Object.keys(rules) as K[]).find((name) => found[name]);
    if (firstInvalid) {
      setNotice(null);
      (form.elements.namedItem(firstInvalid) as HTMLElement | null)?.focus();
      return;
    }

    const values = new FormData(form);
    startTransition(async () => {
      try {
        const text = await submit(values);
        setNotice(text ? { zone: "form", text } : null);
      } catch {
        setNotice({ zone: "form", text: ERREUR_GENERIQUE });
      }
    });
  }

  function onChange(event: FormEvent<HTMLFormElement>) {
    if (submitted) setErrors(findErrors(event.currentTarget, rules));
  }

  return { errors, notice, setNotice, isPending, formProps: { noValidate: true, onSubmit, onChange } };
}
