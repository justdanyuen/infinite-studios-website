import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import { getCredits, type Credit } from "@/data/credits";

export const metadata: Metadata = {
  title: "Credits",
  description: "Selected work recorded, mixed, and mastered at Infinite Studios.",
};

function Accolades({ items }: { items?: string[] }) {
  if (!items?.length) return null;
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((a) => (
        <span key={a} className="rounded-full border border-sky-400/40 px-2.5 py-0.5 text-[11px] text-sky-300">
          {a}
        </span>
      ))}
    </div>
  );
}

function TeamList({ team }: { team: Credit["team"] }) {
  return (
    <ul className="space-y-0.5">
      {team.map((t, i) => (
        <li key={i}>
          <span className="text-zinc-200">{t.member}</span>
          <span className="text-zinc-500">: {t.role}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function CreditsPage() {
  const credits = await getCredits();

  return (
    <main>
      <Section eyebrow="Credits" title="Selected Work">
        {/* Desktop: table */}
        <div className="hidden md:block">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-800 text-xs uppercase tracking-[0.2em] text-zinc-500">
                <th className="py-3 pr-6 font-medium">Year</th>
                <th className="py-3 pr-6 font-medium">Work</th>
                <th className="py-3 pr-6 font-medium">Artist</th>
                <th className="py-3 pr-6 font-medium">Team / Role</th>
                <th className="py-3 font-medium">Accolades</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {credits.map((c, i) => (
                <tr key={i} className="align-top transition-colors hover:bg-white/[0.02]">
                  <td className="py-4 pr-6 font-mono text-zinc-500">{c.year}</td>
                  <td className="py-4 pr-6 font-medium text-white">{c.work}</td>
                  <td className="py-4 pr-6 text-zinc-300">{c.artist}</td>
                  <td className="py-4 pr-6"><TeamList team={c.team} /></td>
                  <td className="py-4"><Accolades items={c.accolades} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile: stacked cards */}
        <ul className="divide-y divide-zinc-800 border-y border-zinc-800 md:hidden">
          {credits.map((c, i) => (
            <li key={i} className="space-y-2 py-5 text-sm">
              <div className="flex items-baseline justify-between gap-4">
                <p className="font-medium text-white">{c.work}</p>
                <span className="font-mono text-xs text-zinc-500">{c.year}</span>
              </div>
              <p className="text-zinc-300">{c.artist}</p>
              <TeamList team={c.team} />
              <Accolades items={c.accolades} />
            </li>
          ))}
        </ul>
      </Section>
    </main>
  );
}