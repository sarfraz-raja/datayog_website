"use client";

import { buttonClass } from "@/components/ui";
import { Field } from "./field";
import { MailtoNotice } from "./mailto-notice";
import { useLeadForm } from "./use-lead-form";

export function ContactForm() {
  const { errors, mailto, onSubmit, reset } = useLeadForm("contact");

  if (mailto) {
    return (
      <div className="space-y-6">
        <MailtoNotice href={mailto} />
        <button type="button" onClick={reset} className="text-sm font-medium text-slate-600 underline hover:text-navy-900">
          Edit your message
        </button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
      <Field label="Name" name="name" required autoComplete="name" error={errors.name} />
      <Field label="Email" name="email" type="email" required autoComplete="email" error={errors.email} />
      <Field label="Your budget" name="budget" placeholder="e.g. $10k – $25k" error={errors.budget} />
      <Field label="Timeframe" name="timeframe" placeholder="e.g. Q1 2027" error={errors.timeframe} />
      <Field
        label="Tell us a bit about your project"
        name="message"
        required
        multiline
        error={errors.message}
        className="sm:col-span-2"
      />
      <div className="sm:col-span-2">
        <button type="submit" className={buttonClass("primary", "w-full sm:w-auto")}>
          Submit
        </button>
      </div>
    </form>
  );
}
