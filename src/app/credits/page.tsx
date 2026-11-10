import type { Metadata } from "next";
import { Suspense } from "react";
import Section from "@/components/ui/Section";
import CreditsBrowser from "@/components/credits/CreditsBrowser";
import { getCredits } from "@/data/credits";

export const metadata: Metadata = {
  title: "Credits",
  description: "Selected work recorded, mixed, and mastered at Infinite Studios.",
};

// The credits refresh every ~30s, too often to bake into the instant App Shell,
// so they stream in behind a Suspense boundary while the heading shows immediately.
async function CreditsList() {
  // Loaded on the server from the Google Sheet; searching/filtering happens in the browser
  const credits = await getCredits();

  if (!credits.length) {
    return (
      <p className="text-lg leading-8 text-zinc-300">
        Our credits list is temporarily unavailable. Please check back shortly.
      </p>
    );
  }
  return <CreditsBrowser credits={credits} />;
}

// Loading state: same layout as the filters and a few rows, so nothing jumps
function CreditsSkeleton() {
  return (
    <div aria-hidden className="animate-pulse motion-reduce:animate-none">
      <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:gap-4">
        <div className="h-14 flex-1 rounded-md bg-zinc-900" />
        <div className="h-14 rounded-md bg-zinc-900 lg:w-64" />
        <div className="h-14 rounded-md bg-zinc-900 lg:w-40" />
      </div>
      <div className="divide-y divide-zinc-800 border-t border-zinc-800">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="flex items-center gap-4 py-5">
            <div className="h-16 w-16 shrink-0 rounded-sm bg-zinc-900" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-1/3 rounded-sm bg-zinc-900" />
              <div className="h-3 w-1/5 rounded-sm bg-zinc-900" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CreditsPage() {
  return (
    <main>
      <Section eyebrow="Credits" title="Selected Work">
        <Suspense fallback={<CreditsSkeleton />}>
          <CreditsList />
        </Suspense>
      </Section>
    </main>
  );
}
