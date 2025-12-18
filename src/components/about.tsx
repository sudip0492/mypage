"use client";

import { User, Heart, Coffee, Music, Briefcase, Calendar } from "lucide-react";

export function About() {
  const interests = [
    { icon: Coffee, text: "Coffee Enthusiast", color: "text-amber-400" },
    { icon: Music, text: "Music Lover", color: "text-purple-400" },
    { icon: Heart, text: "Open Source", color: "text-pink-400" },
  ];

  const workExperience = [
    {
      company: "Tejas Networks",
      role: "Network Engineer",
      period: "Jan 2024 - Present",
      description: "Designing and developing software for telecom network components, working on wireline products including OEM, EVC, LAG, ERPS, and QoS implementations with expertise in C++ and Linux.",
      color: "border-green-500",
    },
    {
      company: "PwC India",
      role: "SDE Intern",
      period: "Jan 2023 - Sep 2023",
      description: "Learned to develop applications and interfaces using Java. Gained hands-on experience with Azure Cloud and explored its various use cases in enterprise environments.",
      color: "border-blue-500",
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="w-full">
        <div className="flex flex-col">
          {/* Header */}
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-center flex items-center justify-center gap-2 mb-4 md:mb-6 flex-shrink-0">
            <User size={18} className="text-blue-500 md:w-[24px] md:h-[24px]" /> About Me
          </h2>

          {/* Content */}
          <div className="space-y-4 md:space-y-6">
            {/* Personal Interests */}
            <div>
              <h3 className="text-base md:text-xl lg:text-2xl font-semibold mb-2 md:mb-3 text-purple-400">What I Like & Do</h3>
              <p className="text-sm md:text-base text-muted-foreground mb-3 md:mb-4 leading-relaxed">
                Beyond coding, I'm passionate about exploring new technologies and building meaningful projects. I enjoy contributing to open-source communities and staying updated with the latest trends in software development.
              </p>

              {/* Interest Badges */}
              <div className="flex flex-wrap gap-2 md:gap-3">
                {interests.map((interest, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-white/5 border border-white/10 hover:border-purple-500/50 hover:scale-105 transition-all duration-200"
                  >
                    <interest.icon size={14} className={`${interest.color} flex-shrink-0 md:w-[16px] md:h-[16px]`} />
                    <span className="text-xs md:text-sm font-medium">{interest.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Work Experience Timeline */}
            <div>
              <h3 className="text-base md:text-xl lg:text-2xl font-semibold mb-3 md:mb-4 text-purple-400 flex items-center gap-2">
                <Briefcase size={16} className="flex-shrink-0 md:w-[20px] md:h-[20px]" /> Work Experience
              </h3>

              <div className="relative space-y-3 md:space-y-4">
                {/* Timeline line */}
                <div className="absolute left-[10px] md:left-[12px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-blue-500 to-transparent"></div>

                {workExperience.map((job, index) => (
                  <div key={index} className="relative pl-6 md:pl-10">
                    {/* Timeline dot */}
                    <div className={`absolute left-0 top-1 w-5 h-5 md:w-6 md:h-6 rounded-full border-2 ${job.color} bg-black flex items-center justify-center`}>
                      <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-current"></div>
                    </div>

                    {/* Content card */}
                    <div className="bg-gradient-to-br from-purple-500/5 to-blue-500/5 backdrop-blur-sm border border-purple-500/20 rounded-lg p-3 md:p-5 hover:border-purple-500/40 transition-all duration-300">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                        <h4 className="text-sm md:text-lg lg:text-xl font-bold text-white">{job.role}</h4>
                        <div className="flex items-center gap-1 text-xs md:text-sm text-muted-foreground mt-1 md:mt-0">
                          <Calendar size={12} className="flex-shrink-0 md:w-[14px] md:h-[14px]" />
                          <span>{job.period}</span>
                        </div>
                      </div>
                      <p className="text-sm md:text-base font-semibold mb-2" style={{ color: job.color.includes('green') ? '#4ade80' : '#3b82f6' }}>{job.company}</p>
                      <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{job.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
