"use client";

import { useCallback, useState } from "react";
import type { FieldErrors } from "@/lib/forms";

/**
 * Validates a lead form, then opens the visitor's email app with the message
 * already written (mailto:). Nothing is sent through our own servers.
 */
export function useLeadForm(type: "consult" | "contact") {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [mailto, setMailto] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const raw = Object.fromEntries(new FormData(form)) as Record<string, string>;

    // Loaded on first submit so the validation library stays out of the initial page JS.
    const { fieldErrors, leadSchema, mailtoFor } = await import("@/lib/forms");
    const parsed = leadSchema.safeParse({ ...raw, type });
    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error));
      form.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
      return;
    }

    const href = mailtoFor(parsed.data);
    setErrors({});
    setMailto(href);
    window.location.href = href;
  }

  const reset = useCallback(() => {
    setErrors({});
    setMailto(null);
  }, []);

  return { errors, mailto, onSubmit, reset };
}
