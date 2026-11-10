import { Suspense } from "react";
import HeroSlideshow from "@/components/sections/HeroSlideshow";
import AboutBlurb from "@/components/sections/AboutBlurb";
import History from "@/components/sections/History";
import StudiosPreview from "@/components/sections/StudiosPreview";
import SessionsGallery from "@/components/sections/SessionsGallery";
import MusicGallery from "@/components/sections/MusicGallery";
// import LogoDivider from "@/components/ui/LogoDivider";

export default function Home() {
  return (
    <main className="flex flex-col">
      <HeroSlideshow />
      {/* <LogoDivider /> */}
      <AboutBlurb />
      <History />
      <StudiosPreview />
      <SessionsGallery />
      {/* Featured credits refresh every ~30s, so they stream in rather than block the page */}
      <Suspense fallback={null}>
        <MusicGallery />
      </Suspense>
    </main>
  );
}