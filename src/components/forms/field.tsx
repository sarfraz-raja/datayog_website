import type { ComponentProps } from "react";
import { cx } from "@/components/ui";

const inputClass =
  "mt-1.5 block w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-navy-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 aria-invalid:border-red-500";

type FieldProps = {
  label: string;
  name: string;
  error?: string;
  required?: boolean;
  className?: string;
};

export function Field({
  label,
  name,
  error,
  required,
  className,
  multiline,
  id: idProp,
  ...props
}: FieldProps & { multiline?: boolean } & Omit<ComponentProps<"input">, "name">) {
  const id = `f-${idProp ?? name}`;
  const shared = {
    id,
    name,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${id}-error` : undefined,
    className: inputClass,
  };
  return (
    <div className={className}>
      <label htmlFor={id} className="text-sm font-medium text-navy-900">
        {label}
        {required && <span className="text-brand-600"> *</span>}
      </label>
      {multiline ? (
        <textarea {...shared} rows={5} placeholder={props.placeholder} />
      ) : (
        <input {...shared} {...props} />
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

export function FormAlert({ tone, children }: { tone: "success" | "error"; children: React.ReactNode }) {
  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={cx(
        "rounded-lg px-4 py-3 text-sm",
        tone === "success" ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-700",
      )}
    >
      {children}
    </div>
  );
}
