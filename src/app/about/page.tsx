
'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Zap, Code, Brain, Users, Database, Cpu, Lightbulb, Rocket } from "lucide-react";

const developerInfo = {
  name: "Ali Alaa",
  title: "Full-Stack Developer | AI Integration & Modern Web Solutions",
  location: "Cairo, Egypt",
  bio: `I'm Ali Alaa — a passionate Full-Stack Developer focused on building intelligent, scalable, and user-centered web applications.

I specialize in creating clean, high-performance digital experiences using modern technologies like Node.js, Express, PostgreSQL, Firebase, and React. Recently, I've been deepening my knowledge in Next.js and TypeScript to elevate my frontend architecture to a professional level.

💡 My Philosophy:
I don't just build apps — I build experiences. Every line of code aims to balance performance, functionality, and design clarity. I believe in writing maintainable, scalable solutions that grow with business needs.

🚀 What I've Built:
• NoteIt App — A full-stack notes application with authentication, dashboard, and real-time feedback
• Portfolio Website — Responsive portfolio with Next.js 15, Firebase, and admin dashboard
• Multiple API integrations — RESTful and GraphQL endpoints for scalable backends

🧠 Currently Learning:
• Next.js (App Router, advanced API routes, SSR optimization)
• TypeScript for scalable frontend architecture
• Advanced AI workflows and integration patterns

🎯 Vision:
To master full-stack development while integrating intelligent AI solutions that make applications more adaptive, efficient, and user-centered.`,
  avatarUrl: "https://i.postimg.cc/mtbGTgyK/swrt-watsab-btarykh-1447-05-21-fy-19-14-50-cedc5642.jpg",
  avatarHint: "ali alaa profile",
  skills: [
    { name: "JavaScript (ES6+)", level: 95, icon: <Code className="h-4 w-4 text-yellow-500" /> },
    { name: "React & Next.js", level: 90, icon: <Zap className="h-4 w-4 text-sky-500" /> },
    { name: "Node.js & Express", level: 88, icon: <Cpu className="h-4 w-4 text-green-500" /> },
    { name: "PostgreSQL & Firebase", level: 85, icon: <Database className="h-4 w-4 text-indigo-500" /> },
    { name: "TypeScript", level: 75, icon: <Code className="h-4 w-4 text-blue-500" /> },
    { name: "Tailwind CSS", level: 90, icon: <Zap className="h-4 w-4 text-teal-500" /> },
    { name: "API Design & REST", level: 85, icon: <Rocket className="h-4 w-4 text-red-500" /> },
    { name: "Problem Solving", level: 88, icon: <Lightbulb className="h-4 w-4 text-orange-500" /> },
    { name: "Team Collaboration", level: 92, icon: <Users className="h-4 w-4 text-pink-500" /> },
  ],
};

export default function AboutPage() {
  return (
    <div className="space-y-12">
      <header className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-primary">About Me</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          A full-stack developer passionate about crafting intelligent, scalable web applications with exceptional user experiences.
        </p>
      </header>

      {/* Hero Card - Developer Profile */}
      <Card className="shadow-lg overflow-hidden">
        <div>
          {/* Header Section with Gradient */}
          <div className="bg-gradient-to-br from-primary via-secondary to-accent p-8 flex flex-col items-center justify-center text-center">
            <div className="avatar-animated-border p-1 rounded-full mb-4 inline-block">
              <Avatar className="w-32 h-32 shadow-xl ring-4 ring-primary-foreground/20">
                <AvatarImage 
                  src={developerInfo.avatarUrl} 
                  alt={developerInfo.name} 
                  data-ai-hint={developerInfo.avatarHint} 
                />
                <AvatarFallback className="text-4xl bg-card text-card-foreground">
                  {developerInfo.name.substring(0, 1)}
                </AvatarFallback>
              </Avatar>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground">{developerInfo.name}</h2>
            <p className="text-base md:text-lg text-primary-foreground/90 mt-2 max-w-2xl">{developerInfo.title}</p>
            <p className="text-sm text-primary-foreground/70 mt-3 flex items-center justify-center gap-2">
              <span>📍</span> {developerInfo.location}
            </p>
          </div>

          {/* Bio Section */}
          <div className="p-8 md:p-12 flex flex-col items-center justify-center text-center">
            <h3 className="text-2xl font-bold text-primary mb-4">My Story</h3>
            <p className="text-foreground/85 leading-relaxed whitespace-pre-line max-w-2xl">
              {developerInfo.bio}
            </p>
          </div>
        </div>
      </Card>

      {/* Skills Section */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">Technical Skills & Expertise</CardTitle>
          <CardDescription className="text-base">My proficiency levels across key technologies and competencies.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {developerInfo.skills.map((skill) => (
              <div key={skill.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-3 font-medium text-foreground">
                    {skill.icon}
                    <span>{skill.name}</span>
                  </span>
                  <span className="text-sm font-semibold text-primary">{skill.level}%</span>
                </div>
                <Progress 
                  value={skill.level} 
                  aria-label={`${skill.name} proficiency ${skill.level}%`} 
                  className="h-2.5" 
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20 shadow-md">
        <CardContent className="pt-8">
          <div className="text-center space-y-6">
            <h3 className="text-2xl font-bold text-primary">Let's Collaborate!</h3>
            <p className="text-foreground/80 max-w-2xl mx-auto">
              Interested in working together or discussing exciting projects? I'm always open to opportunities where I can bring value through clean code, innovative solutions, and thoughtful design.
            </p>
            
            <p className="text-sm text-muted-foreground">
              Find all the ways to connect with me in the footer below. Let's create something amazing together! 🚀
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
