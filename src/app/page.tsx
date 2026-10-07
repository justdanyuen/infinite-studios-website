import HeroSlideshow from "@/components/sections/HeroSlideshow";
import AboutBlurb from "@/components/sections/AboutBlurb";
import History from "@/components/sections/History";
import StudiosPreview from "@/components/sections/StudiosPreview";
import SessionsGallery from "@/components/sections/SessionsGallery";
import MusicGallery from "@/components/sections/MusicGallery";

export default function Home() {
  return (
    <main className="flex flex-col">
      <HeroSlideshow />
      <AboutBlurb />
      <History />
      <StudiosPreview />
      <SessionsGallery />
      <MusicGallery />
    </main>
  );
}