"use client";

import { useActionState } from "react";
import { sendContact, type ContactState } from "@/app/contact/actions";

const initialState: ContactState = { status: "idle" };

const inputClass =
  "w-full border-b border-zinc-700 bg-transparent py-3 text-white placeholder:text-zinc-600 outline-none transition-colors focus:border-sky-400";
const labelClass = "text-xs font-medium uppercase tracking-[0.2em] text-zinc-400";

function Field({
  label,
  name,
  error,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className={labelClass}>
        {label}
      </label>
      {children}
      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
    </div>
  );
}

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContact, initialState);
  const v = state.values ?? {};
  const e = state.errors ?? {};

  if (state.status === "success") {
    return (
      <div className="border-l border-sky-400 pl-6">
        <p className="text-xl font-semibold text-white">Thanks, your message is on its way.</p>
        <p className="mt-2 text-zinc-400">We'll get back to you as soon as we can.</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="grid gap-10 md:grid-cols-2">
      <Field label="First name" name="firstName" error={e.firstName}>
        <input id="firstName" name="firstName" required autoComplete="given-name" defaultValue={v.firstName} className={inputClass} />
      </Field>

      <Field label="Last name" name="lastName" error={e.lastName}>
        <input id="lastName" name="lastName" required autoComplete="family-name" defaultValue={v.lastName} className={inputClass} />
      </Field>

      <Field label="Email" name="email" error={e.email}>
        <input id="email" name="email" type="email" required autoComplete="email" defaultValue={v.email} className={inputClass} />
      </Field>

      <Field label="Phone (optional)" name="phone">
        <input id="phone" name="phone" type="tel" autoComplete="tel" defaultValue={v.phone} className={inputClass} />
      </Field>

      <div className="md:col-span-2">
        <Field label="Message" name="message" error={e.message}>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            placeholder="Tell us about your project, dates, and what you need."
            defaultValue={v.message}
            className={`${inputClass} resize-y`}
          />
        </Field>
      </div>

      {/* Honeypot: hidden from people, irresistible to bots */}
      <input name="company" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

      <div className="flex flex-col gap-4 md:col-span-2 md:flex-row md:items-center">
        <button
          type="submit"
          disabled={pending}
          className="w-fit rounded-full border border-white/40 px-8 py-3 text-xs font-medium uppercase tracking-[0.2em] text-white transition-colors hover:bg-white hover:text-black disabled:opacity-50"
        >
          {pending ? "Sending…" : "Send Message"}
        </button>
        {state.status === "error" && state.message && <p className="text-sm text-red-400">{state.message}</p>}
      </div>
    </form>
  );
}