import { Skills as SkillsSection } from '@/components/skills';

export default function SkillsPage() {
  return (
    <div className="w-full min-h-[calc(100dvh-5rem)] flex items-start justify-center pt-24 pb-40">
      <div className="w-full max-w-7xl mx-auto px-4">
        <SkillsSection />
      </div>
    </div>
  );
}
