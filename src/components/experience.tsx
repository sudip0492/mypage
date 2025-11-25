
import { Briefcase } from 'lucide-react';

const experiences = [
  {
    role: "Software Engineer",
    company: "Tejas Networks, India, BLR (Hybrid)",
    period: "2024 - Present",
    description: "Developing and maintaining software for next-generation telecom networks.",
  },
  {
    role: "Software Engineer",
    company: "PWC, India (Remote)",
    period: "2022 - 2023",
    description: "Worked on various software projects for clients in different industries.",
  },
];

export function Experience() {
  return (
    <div className="py-20">
      <h2 className="text-3xl font-bold text-center flex items-center justify-center gap-2">
        <Briefcase size={30} /> Work Experience
      </h2>
      <div className="mt-8 relative border-l-2 border-primary pl-6">
        {experiences.map((exp, index) => (
          <div key={index} className="mb-8">
            <div className="absolute w-4 h-4 bg-primary rounded-full -left-2 mt-1.5"></div>
            <p className="text-sm text-muted-foreground">{exp.period}</p>
            <h3 className="text-xl font-bold">{exp.role}</h3>
            <p className="text-lg font-semibold">{exp.company}</p>
            <p className="mt-2">{exp.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
