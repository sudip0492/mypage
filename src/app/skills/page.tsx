import { Skills as SkillsSection } from '@/components/skills';

export default function SkillsPage() {
  return (
    <div className="h-full w-full flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 max-h-full overflow-y-auto pb-16">
        <SkillsSection />
      </div>
    </div>
  );
}
