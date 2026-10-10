"use server";

import { Resend } from "resend";

type Field = "firstName" | "lastName" | "email" | "phone" | "message";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<Field, string>>;
  values?: Partial<Record<Field, string>>;
};

const resend = new Resend(process.env.RESEND_API_KEY);
const SUBJECT_TAG = "[Infinite Studios Website]";

export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Spam trap: real visitors never see or fill this field
  if (formData.get("company")) return { status: "success" };

  const get = (k: Field) => String(formData.get(k) ?? "").trim();
  const values = {
    firstName: get("firstName"),
    lastName: get("lastName"),
    email: get("email"),
    phone: get("phone"),
    message: get("message"),
  };

  const errors: ContactState["errors"] = {};
  if (!values.firstName) errors.firstName = "Required";
  if (!values.lastName) errors.lastName = "Required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = "Enter a valid email";
  if (values.message.length < 10) errors.message = "Please add a little more detail";

  if (Object.keys(errors).length) {
    return { status: "error", message: "Please fix the highlighted fields.", errors, values };
  }

  const name = `${values.firstName} ${values.lastName}`;
  const { error } = await resend.emails.send({
    from: process.env.CONTACT_FROM_EMAIL!,
    to: process.env.CONTACT_TO_EMAIL!,
    replyTo: values.email,
    subject: `${SUBJECT_TAG} Inquiry from ${name}`,
    text: [
      `Name: ${name}`,
      `Email: ${values.email}`,
      `Phone: ${values.phone || "Not provided"}`,
      "",
      "Message:",
      values.message,
      "",
      "Sent from the contact form at the Infinite Studios website.",
    ].join("\n"),
  });

  if (error) {
    console.error("Contact form send failed:", error);
    return {
      status: "error",
      message: "Something went wrong sending your message. Please try again in a moment.",
      values,
    };
  }

  return { status: "success" };
}