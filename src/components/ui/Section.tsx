export default function Section({
  id,
  eyebrow,
  title,
  children,
  className = "",
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`px-6 py-20 md:py-28 ${className}`}>
      <div className="mx-auto max-w-6xl">
        {eyebrow && (
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-zinc-400">{eyebrow}</p>
        )}
        {title && (
          <h2 className="mb-10 text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
        )}
        {children}
      </div>
    </section>
  );
}