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
        <div className="mb-14 space-y-6 text-lg leading-8 text-zinc-300">
          <p>
            Booking a session or have a question about the studio? We check our emails daily. You
            can reach out at any time of the day, and we&apos;ll respond as quickly as possible.
          </p>
        </div>
        <ContactForm />
      </Section>
    </main>
  );
}