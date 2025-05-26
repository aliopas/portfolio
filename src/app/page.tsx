
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Lightbulb, Code } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { projectsData } from "@/data/mockData";

export default function Home() {
  // Take the first 3 projects as featured, or fewer if not enough data.
  const featuredProjects = projectsData.slice(0, 3);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-16 md:py-24 bg-card rounded-lg shadow-lg">
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
      </section>

      {/* Featured Projects Section */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="tracking-tight">Featured Projects</h2>
          <Button variant="link" asChild className="text-primary btn-base-hover">
            <Link href="/portfolio">View All <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project) => (
            <Card key={project.id} className="group flex flex-col overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardHeader className="p-0">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  width={600}
                  height={160} // Consistent height h-40 (10rem/160px)
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
                  {project.tags && project.tags.map((tag: string) => ( // Added project.tags check and type
                    <span key={tag} className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded-full">{tag}</span>
                  ))}
                  {!project.tags && project.technologies.map(tech => ( // Fallback to technologies if tags don't exist
                     <span key={tech} className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded-full">{tech}</span>
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
                        project.githubLink ? null : <Button size="sm" disabled className="btn-base-hover">Live Demo</Button> // Show disabled only if no githubLink either
                    )}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* AI Tool Teaser Section */}
      <section className="py-12 bg-ai-tool-gradient">
        <div className="text-center"> {/* Removed container from here, relies on main layout's container + padding */}
          <Lightbulb className="h-12 w-12 mx-auto mb-4 text-primary-foreground" />
          <h2 className="text-3xl font-bold tracking-tight mb-4 text-primary-foreground">
            Craft Perfect Project Descriptions with AI
          </h2>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto mb-8">
            Struggling to describe your amazing projects? Let our AI tool help you generate compelling descriptions based on your project's features and technologies.
          </p>
          <Button 
            variant="secondary" 
            size="lg" 
            asChild 
            className="bg-background text-primary hover:bg-background/90 btn-glow btn-base-hover"
          >
            <Link href="/ai-project-description">Try the AI Tool <Code className="ml-2 h-5 w-5" /></Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
