"use client";

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Jane Doe",
    title: "CEO, Innovate Inc.",
    quote: "Sudipta is a rare talent who combines technical expertise with a keen eye for design. He was instrumental in the success of our latest project, and I can't recommend him enough.",
    avatar: "/avatar1.png", // Placeholder image
  },
  {
    name: "John Smith",
    title: "Lead Engineer, Tech Solutions",
    quote: "Working with Sudipta was a pleasure. He is a proactive problem-solver and a great team player. His contributions were invaluable to our team.",
    avatar: "/avatar2.png", // Placeholder image
  },
  {
    name: "Emily White",
    title: "Creative Director, Creative Agency",
    quote: "Sudipta's design skills are top-notch. He has a unique ability to translate complex ideas into beautiful and intuitive designs. I was consistently impressed with his work.",
    avatar: "/avatar3.png", // Placeholder image
  },
];

export function Testimonials() {
  return (
    <div className="py-20">
      <h2 className="text-3xl font-bold text-center flex items-center justify-center gap-2">
        <Star size={30} /> Testimonials
      </h2>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.name}>
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar>
                <AvatarImage src={testimonial.avatar} />
                <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-bold">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.title}</p>
              </div>
            </CardHeader>
            <CardContent>
              <p>"{testimonial.quote}"</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
