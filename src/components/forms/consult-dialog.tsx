"use client";

import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";
import { buttonClass } from "@/components/ui";
import { Field } from "./field";
import { MailtoNotice } from "./mailto-notice";
import { useLeadForm } from "./use-lead-form";

type OpenOptions = { title?: string };
const ConsultContext = createContext<(options?: OpenOptions) => void>(() => {});

const DEFAULT_TITLE = "Meet our experts";

/** One shared "Meet our experts / Book a consultation" dialog for the whole site. */
export function ConsultProvider({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [title, setTitle] = useState(DEFAULT_TITLE);
  const { errors, mailto, onSubmit, reset } = useLeadForm("consult");

  const open = useCallback(
    (options?: OpenOptions) => {
      reset();
      setTitle(options?.title ?? DEFAULT_TITLE);
      dialogRef.current?.showModal();
    },
    [reset],
  );

  const close = () => dialogRef.current?.close();

  return (
    <ConsultContext.Provider value={open}>
      {children}
      <dialog
        ref={dialogRef}
        aria-labelledby="consult-title"
        className="m-auto w-[calc(100%-2rem)] max-w-lg rounded-2xl bg-white p-0 shadow-2xl"
        onClick={(e) => e.target === e.currentTarget && close()}
      >
        <div className="relative p-6 sm:p-8">
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-4 top-4 rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-navy-900"
          >
            <svg viewBox="0 0 20 20" className="size-5" aria-hidden="true">
              <path d="m5 5 10 10M15 5 5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
          <h2 id="consult-title" className="pr-8 text-2xl">
            {title}
          </h2>
          <p className="mt-2 text-slate-600">
            Got questions? Ideas? Fill out the form below and our specialist will contact you.
          </p>

          {mailto ? (
            <div className="mt-6">
              <MailtoNotice href={mailto} />
            </div>
          ) : (
            <form noValidate onSubmit={onSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field label="Your name" name="name" id="consult-name" required autoComplete="name" error={errors.name} className="sm:col-span-2" />
              <Field label="Phone number" name="phone" id="consult-phone" type="tel" required autoComplete="tel" placeholder="+1 555 000 0000" error={errors.phone} className="sm:col-span-2" />
              <Field label="Desired date" name="date" id="consult-date" type="date" error={errors.date} />
              <Field label="Desired time" name="time" id="consult-time" type="time" error={errors.time} />
              <button type="submit" className={buttonClass("primary", "sm:col-span-2")}>
                Submit
              </button>
            </form>
          )}
        </div>
      </dialog>
    </ConsultContext.Provider>
  );
}

export function ConsultButton({
  children,
  title,
  variant = "primary",
  className,
}: {
  children: ReactNode;
  title?: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
}) {
  const open = useContext(ConsultContext);
  return (
    <button type="button" onClick={() => open({ title })} className={buttonClass(variant, className)}>
      {children}
    </button>
  );
}
