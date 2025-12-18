import { About as AboutSection } from '@/components/about';

export default function AboutPage() {
  return (
    <div className="w-full min-h-[calc(100dvh-5rem)] flex items-start justify-center pt-24 pb-40">
      <div className="w-full max-w-7xl mx-auto px-4">
        <AboutSection />
      </div>
    </div>
  );
}
