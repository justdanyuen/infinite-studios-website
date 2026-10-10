import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Book a session or ask a question. Get in touch with Infinite Studios.",
};

export default function ContactPage() {
  return (
    <main>
      <Section eyebrow="Contact" title="Get in touch">
        <p className="mb-14 max-w-2xl text-lg leading-8 text-zinc-400">
          Booking a session or have a question about the studio? Send us a message and we'll get back to you.
        </p>
        <ContactForm />
      </Section>
    </main>
  );
}