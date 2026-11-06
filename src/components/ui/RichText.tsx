// Renders a string with light inline formatting:
//   **bold**   -> <strong>
//   *italic*   -> <em>
// Everything else is plain text, so copy in src/data stays easy to edit.
export default function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);

  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
          return (
            <strong key={i} className="font-semibold text-white">
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
          return (
            <em key={i} className="text-zinc-200">
              {part.slice(1, -1)}
            </em>
          );
        }
        return part;
      })}
    </>
  );
}
