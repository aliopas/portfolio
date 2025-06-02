
'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Zap, Code, Brain, Users } from "lucide-react";

// Mock data - replace with Firebase data later
const developerInfo = {
  name: "AliAlaa",
  title: "Full-Stack Developer & AI Integration Specialist",
  bio: `Ali Alaa - Full-Stack Developer & AI Integration Specialist

Who I Am
I'm AliAlaa, a Full-Stack Developer who specializes in building intelligent web applications that solve real problems. I combine modern web technologies with AI integration to create scalable, high-performance solutions that users love.

Core Expertise
Frontend: React, Next.js, TypeScript - Building lightning-fast, responsive applications
Backend: Node.js, Express, Database Design - Architecting robust, scalable APIs
AI Integration: Machine Learning, NLP, Predictive Analytics - Adding intelligence to every application

What Makes Me Different
🚀 Performance-First: Every app I build is optimized for speed and scalability
🤖 AI-Native: I integrate AI as a core feature, not an afterthought
🎯 User-Focused: Technology should serve people and solve real problems

My Approach
I don't just write code—I craft solutions. Whether it's a personalized recommendation system, intelligent analytics dashboard, or scalable web platform, I focus on delivering applications that grow with your business and genuinely improve user experiences.

Tech Stack
Languages: JavaScript, TypeScript, Python
Frontend: React, Next.js, Tailwind CSS
Backend: Node.js, Express, GraphQL, REST APIs
Databases: MongoDB, PostgreSQL, Firebase
AI/ML: TensorFlow.js, OpenAI API, Custom Models
Cloud: AWS, Vercel, Docker

Let's Build Something Great
Ready to transform your idea into an intelligent, scalable application? Let's connect and create something extraordinary together.`,
  avatarUrl: "https://placehold.co/200x200.png",
  avatarHint: "ali alaa",
  location: "Cairo, Egypt",
  skills: [
    { name: "JavaScript", level: 95, icon: <Code className="h-4 w-4 text-yellow-500" /> },
    { name: "React & Next.js", level: 90, icon: <Zap className="h-4 w-4 text-sky-500" /> },
    { name: "Node.js & Express", level: 85, icon: <Code className="h-4 w-4 text-green-500" /> },
    { name: "Firebase", level: 80, icon: <Zap className="h-4 w-4 text-orange-500" /> },
    { name: "Tailwind CSS", level: 90, icon: <Code className="h-4 w-4 text-teal-500" /> },
    { name: "Problem Solving", level: 88, icon: <Brain className="h-4 w-4 text-purple-500" /> },
    { name: "Team Collaboration", level: 92, icon: <Users className="h-4 w-4 text-pink-500" /> },
  ],
};

export default function AboutPage() {
  return (
    <div className="space-y-12">
      <header className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-primary">About Me</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Discover more about my journey, skills, and what drives me as a developer.
        </p>
      </header>

      <Card className="shadow-lg overflow-hidden">
        {/* Removed md:flex from this div to stack children vertically */}
        <div>
          {/* This section (Avatar, Name, Title, Location, and Image) will now be on top */}
          <div className="bg-gradient-to-br from-primary via-secondary to-accent p-8 flex flex-col items-center justify-center text-center"> {/* Removed md:w-1/3 */}
            <div className="avatar-animated-border p-1 rounded-full mb-4 inline-block">
              <Avatar className="w-32 h-32 shadow-xl">
                <AvatarImage src={developerInfo.avatarUrl} alt={developerInfo.name} data-ai-hint={developerInfo.avatarHint} />
                <AvatarFallback className="text-4xl bg-card text-card-foreground">{developerInfo.name.substring(0,1)}</AvatarFallback>
              </Avatar>
            </div>
            <h2 className="text-2xl font-semibold text-primary-foreground">{developerInfo.name}</h2>
            <p className="text-md text-primary-foreground/80">{developerInfo.title}</p>
            <p className="text-sm text-primary-foreground/70 mt-2">{developerInfo.location}</p>
          </div>
          <img src="https://placehold.co/600x400.png" alt="Developer image" width="600" height="400" className="rounded-md object-cover w-full md:w-1/3 aspect-video"/>
          {/* This section (My Story/Bio) will now be below the Avatar section */}
          <div className="p-8"> {/* Removed md:w-2/3 */}
            <h3 className="text-2xl font-semibold text-primary mb-4">My Story</h3>
            <p className="text-foreground/80 leading-relaxed whitespace-pre-line">
              {developerInfo.bio}
            </p>
          </div>
        </div>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-primary">My Skills</CardTitle>
          <CardDescription>A snapshot of my technical expertise and abilities.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {developerInfo.skills.map((skill) => (
            <div key={skill.name} className="space-y-1.5">
              <div className="flex items-center justify-between text-sm font-medium">
                <span className="flex items-center gap-2">
                  {skill.icon || <Code className="h-4 w-4 text-muted-foreground" />}
                  {skill.name}
                </span>
                <span className="text-muted-foreground">{skill.level}%</span>
              </div>
              <Progress value={skill.level} aria-label={`${skill.name} proficiency ${skill.level}%`} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
