import { z } from "zod";
import { site } from "@/content/site";

// Validation for the contact and consultation forms. A valid form opens the
// visitor's own email app (Outlook, Gmail, Apple Mail…) with the message ready to send.

const name = z.string().trim().min(2, "Please enter your name").max(100);

export const consultSchema = z.object({
  type: z.literal("consult"),
  name,
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s\-().]{7,20}$/, "Please enter a valid phone number"),
  date: z.string().trim().max(20).optional(),
  time: z.string().trim().max(20).optional(),
});

export const contactSchema = z.object({
  type: z.literal("contact"),
  name,
  email: z.email("Please enter a valid email address").max(200),
  budget: z.string().trim().max(100).optional(),
  timeframe: z.string().trim().max(100).optional(),
  // Kept short enough for every email app to accept the mailto: link.
  message: z
    .string()
    .trim()
    .min(10, "Please tell us a bit more (at least 10 characters)")
    .max(1500, "Please keep your message under 1,500 characters"),
});

export const leadSchema = z.discriminatedUnion("type", [consultSchema, contactSchema]);

export type Lead = z.infer<typeof leadSchema>;
export type FieldErrors = Partial<Record<string, string>>;

export function fieldErrors(error: z.ZodError): FieldErrors {
  const out: FieldErrors = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    out[key] ??= issue.message;
  }
  return out;
}

/** Address the website's forms are sent to. */
export const LEADS_EMAIL = site.emails.info;

// "2026-10-20" → "Tuesday, 20 October 2026" (parsed as a calendar date, no time zone shift).
function formatDate(value?: string) {
  const match = value?.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return value;
  const date = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])));
  return date.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

// "14:30" → "2:30 PM"
function formatTime(value?: string) {
  const match = value?.match(/^(\d{1,2}):(\d{2})/);
  if (!match) return value;
  const hours = Number(match[1]);
  return `${hours % 12 || 12}:${match[2]} ${hours < 12 ? "AM" : "PM"}`;
}

const lines = (...rows: (string | false | undefined)[]) => rows.filter((row) => row !== false && row !== undefined).join("\n");

function compose(lead: Lead) {
  const signOff = ["Best regards,", lead.name];

  if (lead.type === "consult") {
    const date = formatDate(lead.date);
    const time = formatTime(lead.time);
    const schedule =
      date || time
        ? lines(date && `Date: ${date}`, time && `Time: ${time} (my local time)`)
        : "Flexible – please suggest a suitable time";
    return {
      subject: `Consultation Request – ${lead.name} | DATAYOG Website`,
      body: lines(
        "Dear DATAYOG Team,",
        "",
        "I would like to book a consultation with one of your specialists.",
        "",
        "PREFERRED SCHEDULE",
        schedule,
        "",
        "CONTACT DETAILS",
        `Name: ${lead.name}`,
        `Phone: ${lead.phone}`,
        "",
        "Please call me to confirm the appointment.",
        "",
        ...signOff,
        "",
        "—",
        "Sent via the consultation form on datayog.com",
      ),
    };
  }

  const projectDetails = lines(lead.budget && `Budget: ${lead.budget}`, lead.timeframe && `Timeframe: ${lead.timeframe}`);
  return {
    subject: `Project Enquiry – ${lead.name} | DATAYOG Website`,
    body: lines(
      "Dear DATAYOG Team,",
      "",
      "I would like to discuss a project with you. Please find the details below.",
      "",
      "PROJECT DETAILS",
      projectDetails || undefined,
      projectDetails ? "" : undefined,
      "Message:",
      lead.message,
      "",
      "CONTACT DETAILS",
      `Name: ${lead.name}`,
      `Email: ${lead.email}`,
      "",
      "I look forward to hearing from you.",
      "",
      ...signOff,
      "",
      "—",
      "Sent via the contact form on datayog.com",
    ),
  };
}

/** Builds a mailto: link with a professionally worded subject and body already filled in. */
export function mailtoFor(lead: Lead) {
  const { subject, body } = compose(lead);
  return `mailto:${LEADS_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
