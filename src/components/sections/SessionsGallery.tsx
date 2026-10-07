import Image from "next/image";
import Section from "@/components/ui/Section";

const photos = [
  "/images/sessions/sessions_img.jpg",
  "/images/sessions/mixing_img.jpg",
  "/images/sessions/mastering_img.jpg",
  "/images/studios/floating-gear/guitars.jpg",
  "/images/studios/floating-gear/fenderamp.jpg",
  "/images/studios/studio-gear/keyboards.jpg",
]; // TODO: import from @/data/sessions

export default function SessionsGallery() {
  return (
    <Section eyebrow="Recent Work" title="Sessions" className="bg-zinc-950">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {photos.map((src) => (
          <div key={src} className="relative aspect-square overflow-hidden rounded-md bg-zinc-800">
            <Image
              src={src}
              alt=""
              fill
              sizes="(min-width: 768px) 33vw, 50vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </Section>
  );
}