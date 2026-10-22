"use client";

import { useState } from "react";
import { buttonClass } from "@/components/ui";
import { LEADS_EMAIL } from "@/lib/forms";
import { FormAlert } from "./field";

/**
 * Shown after a valid submit. The email app opens automatically; this gives a
 * fallback for visitors without a default email app (e.g. people using Gmail in the browser).
 */
export function MailtoNotice({ href }: { href: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(LEADS_EMAIL);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="space-y-4">
      <FormAlert tone="success">
        Your email app should now open with your message ready. Just press <strong>Send</strong>.
      </FormAlert>
      <p className="text-sm text-slate-600">
        Nothing opened? Email us at{" "}
        <a href={href} className="font-semibold text-brand-600 hover:underline">
          {LEADS_EMAIL}
        </a>
        .
      </p>
      <div className="flex flex-wrap gap-3">
        <a href={href} className={buttonClass("primary")}>
          Open email app
        </a>
        <button type="button" onClick={copy} className={buttonClass("secondary")}>
          {copied ? "Copied ✓" : "Copy email address"}
        </button>
      </div>
    </div>
  );
}
