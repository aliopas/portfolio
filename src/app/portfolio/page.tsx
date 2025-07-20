
'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Filter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [projects, setProjects] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        setProjects(Array.isArray(data) ? data : []);
        const cats = ["All", ...new Set(data.map((p: any) => String(p.category)))];
        setCategories(cats as string[]);
      });
  }, []);

  const filteredProjects = projects.filter(project =>
    selectedCategory === "All" || project.category === selectedCategory
  );

  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-primary">My Portfolio</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          A collection of my projects, showcasing my skills and passion for development.
        </p>
      </header>

      {/* Filtering */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center p-4 bg-card rounded-lg shadow">
        <h3 className="text-lg font-semibold sr-only sm:not-sr-only flex items-center">
          <Filter className="mr-2 h-5 w-5" /> Filter Projects
        </h3>
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="btn-glow btn-base-hover"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="group flex flex-col overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardHeader className="p-0 relative">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  width={600}
                  height={160} 
                  className="object-cover w-full h-40" // Consistent height h-40 (10rem/160px)
                  data-ai-hint={project.imageHint}
                />
                <div className="absolute top-2 right-2 bg-primary/80 text-primary-foreground px-2 py-1 text-xs rounded">
                  {project.category}
                </div>
              </CardHeader>
              <CardContent className="flex-grow p-6 space-y-3">
                <CardTitle className="text-xl">{project.title}</CardTitle>
                <CardDescription className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                  {project.description}
                </CardDescription>
                <div className="pt-2">
                  <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-1">Technologies:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech: string) => (
                      <span key={tech} className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded-full">{tech}</span>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-6 bg-muted/50 border-t">
                <div className="flex justify-between w-full gap-2">
                  {project.githubLink && (
                  <Button variant="outline" size="sm" asChild className="btn-glow btn-base-hover">
                    <Link href={project.githubLink} target="_blank" rel="noopener noreferrer">GitHub</Link>
                  </Button>
                  )}
                  {project.liveLink ? (
                    <Button size="sm" asChild className="btn-glow btn-base-hover">
                      <Link href={project.liveLink} target="_blank" rel="noopener noreferrer">Live Demo <ArrowRight className="ml-1 h-4 w-4" /></Link>
                    </Button>
                  ) : (
                     project.githubLink ? null : <Button size="sm" disabled className="btn-base-hover">Live Demo</Button> 
                  )}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-muted-foreground">
          <p>No projects found for the selected category.</p>
        </div>
      )}
    </div>
  );
}
