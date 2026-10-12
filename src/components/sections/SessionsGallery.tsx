import Image from "next/image";
import Section from "@/components/ui/Section";
import { sessionPhotos } from "@/data/sessions";

export default function SessionsGallery() {
  return (
    <Section id="sessions" eyebrow="Recent Work" title="Sessions" className="bg-zinc-950">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {sessionPhotos.map((photo) => (
          <div key={photo.src} className="relative aspect-square overflow-hidden rounded-md bg-zinc-800">
            <Image
              src={photo.src}
              alt={photo.alt}
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
