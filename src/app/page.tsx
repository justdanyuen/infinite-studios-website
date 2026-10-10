import HeroSlideshow from "@/components/sections/HeroSlideshow";
import AboutBlurb from "@/components/sections/AboutBlurb";
import History from "@/components/sections/History";
import StudiosPreview from "@/components/sections/StudiosPreview";
import SessionsGallery from "@/components/sections/SessionsGallery";
import MusicGallery from "@/components/sections/MusicGallery";
import LogoDivider from "@/components/ui/LogoDivider";

export default function Home() {
  return (
    <main className="flex flex-col">
      <HeroSlideshow />
      {/* <LogoDivider /> */}
      <AboutBlurb />
      <History />
      <StudiosPreview />
      <SessionsGallery />
      <MusicGallery />
    </main>
  );
}