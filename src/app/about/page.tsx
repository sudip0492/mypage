import { About as AboutSection } from '@/components/about';
import { Experience } from '@/components/experience';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4">
      <AboutSection />
      <Experience />
    </div>
  );
}
