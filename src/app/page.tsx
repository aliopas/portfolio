"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
// import { projectsData } from "@/data/mockData";
import { useEffect, useState } from "react";
import { EmptyState } from "@/components/empty-state";
import { AlertCircle } from "lucide-react";

export default function Home() {
  const [featuredProjects, setFeaturedProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/projects")
      .then(res => res.json())
      .then(data => {
        setFeaturedProjects(Array.isArray(data) ? data.slice(0, 3) : []);
        setError(null);
      })
      .catch(err => {
        console.error('Error fetching projects:', err);
        setError('Failed to load featured projects');
        setFeaturedProjects([]);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-16 md:py-24 bg-card rounded-lg shadow-lg">
        <div className="px-4 sm:px-0"> {/* Removed nested container, padding controlled by main layout */}
          <h1 className="text-primary px-4 sm:px-0">
            Welcome to AliAlaa's Portfolio
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4 sm:px-0">
            Showcase your skills, projects, and journey as a developer. Connect, create, and inspire with a portfolio that truly represents you.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4 px-4 sm:px-0">
            <Button asChild size="lg" className="btn-glow btn-base-hover">
              <Link href="/portfolio">View My Work <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="btn-glow btn-base-hover">
              <Link href="/contact">Get In Touch</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="tracking-tight">Featured Projects</h2>
          <Button variant="link" asChild className="text-primary btn-base-hover">
            <Link href="/portfolio">View All <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
        
        {error ? (
          <EmptyState 
            icon={<AlertCircle className="h-16 w-16 text-red-500" />}
            title="Unable to Load Projects"
            description={error}
            action={
              <Button 
                onClick={() => window.location.reload()}
                variant="outline"
              >
                Try Again
              </Button>
            }
          />
        ) : isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden animate-pulse">
                <div className="h-40 bg-muted"></div>
                <div className="p-6 space-y-3">
                  <div className="h-6 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-full"></div>
                  <div className="h-4 bg-muted rounded w-5/6"></div>
                </div>
              </Card>
            ))}
          </div>
        ) : featuredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <Card key={project.id} className="group flex flex-col overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardHeader className="p-0">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    width={600}
                    height={160} 
                    className="object-cover w-full h-40"
                    data-ai-hint={project.imageHint}
                  />
                </CardHeader>
                <CardContent className="flex-grow p-6 space-y-3">
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <CardDescription className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                    {project.description}
                  </CardDescription>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tags.map((tag: string) => ( 
                      <span key={tag} className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded-full">{tag}</span>
                    ))}
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
          <EmptyState 
            icon={<AlertCircle className="h-16 w-16 text-yellow-500" />}
            title="No Projects Found"
            description="Featured projects will appear here once they are added to the portfolio."
            action={
              <Button asChild>
                <Link href="/contact">Get In Touch</Link>
              </Button>
            }
          />
        )}
      </section>
    </div>
  );
}
