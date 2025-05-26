'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"; // Added CardDescription
import { Progress } from "@/components/ui/progress";
import { CloudSun, Zap, Code, Brain, Users } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";

// Mock data - replace with Firebase data later
const developerInfo = {
  name: "Alex Developer", // This could be 'علي علاء' if it's personal branding
  title: "Full-Stack Web Developer",
  bio: "Passionate about creating intuitive and performant web experiences. With a strong foundation in modern JavaScript frameworks and backend technologies, I enjoy tackling complex challenges and continuously learning new skills. My goal is to build applications that are not only functional but also delightful to use.",
  avatarUrl: "https://placehold.co/200x200.png",
  avatarHint: "developer portrait",
  location: "San Francisco, CA", // For weather API
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

interface WeatherData {
  description: string;
  temperature: number;
  city: string;
  icon: string;
}

export default function AboutPage() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [weatherError, setWeatherError] = useState<string | null>(null);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || "YOUR_OPENWEATHER_API_KEY"; 
    const city = developerInfo.location.split(',')[0]; 

    if (apiKey === "YOUR_OPENWEATHER_API_KEY") {
      setWeatherError("OpenWeather API key not configured.");
      return;
    }
    
    async function fetchWeather() {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        if (!response.ok) {
          throw new Error(`Weather API request failed: ${response.statusText}`);
        }
        const data = await response.json();
        setWeather({
          description: data.weather[0].description,
          temperature: Math.round(data.main.temp),
          city: data.name,
          icon: data.weather[0].icon,
        });
        setWeatherError(null);
      } catch (error) {
        console.error("Failed to fetch weather:", error);
        if (error instanceof Error) {
           setWeatherError(error.message);
        } else {
           setWeatherError("An unknown error occurred while fetching weather data.");
        }
      }
    }
    fetchWeather();
  }, []);

  return (
    <div className="space-y-12">
      <header className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-primary">About Me</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Discover more about my journey, skills, and what drives me as a developer.
        </p>
      </header>

      <Card className="shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 bg-gradient-to-br from-primary to-accent p-8 flex flex-col items-center justify-center text-center">
            <Avatar className="w-32 h-32 border-4 border-background shadow-xl mb-4">
              <AvatarImage src={developerInfo.avatarUrl} alt={developerInfo.name} data-ai-hint={developerInfo.avatarHint} />
              <AvatarFallback className="text-4xl bg-background text-primary">{developerInfo.name.substring(0,1)}</AvatarFallback>
            </Avatar>
            <h2 className="text-2xl font-semibold text-primary-foreground">{developerInfo.name}</h2>
            <p className="text-md text-primary-foreground/80">{developerInfo.title}</p>
            {weather && (
              <Badge variant="secondary" className="mt-3 bg-background/20 text-primary-foreground backdrop-blur-sm">
                <CloudSun className="mr-2 h-4 w-4" />
                {weather.city}: {weather.temperature}°C, {weather.description}
                {weather.icon && <Image src={`https://openweathermap.org/img/wn/${weather.icon}.png`} alt="weather icon" width={24} height={24} className="ml-1" />}
              </Badge>
            )}
            {weatherError && (
               <Badge variant="destructive" className="mt-3">{weatherError}</Badge>
            )}
          </div>
          <div className="md:w-2/3 p-8">
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
