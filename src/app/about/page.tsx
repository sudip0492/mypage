import { About as AboutSection } from '@/components/about';

export default function AboutPage() {
  return (
    <div className="h-full w-full flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 max-h-full overflow-y-auto pb-24 md:pb-16">
        <AboutSection />
      </div>
    </div>
  );
}
