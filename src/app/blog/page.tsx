
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertCircle, Clock } from "lucide-react";

export default function BlogPage() {
  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-primary">My Blog</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Sharing thoughts, tutorials, and updates on my development journey.
        </p>
      </header>

      <Card className="border-2 border-yellow-500/20 bg-yellow-50/5 dark:bg-yellow-950/10 p-12 text-center">
        <div className="flex flex-col items-center gap-4">
          <Clock className="h-16 w-16 text-yellow-600 dark:text-yellow-500" />
          <h2 className="text-2xl font-semibold text-foreground">
            Under Development
          </h2>
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            The blog section is currently under development. I'm working on bringing you insightful articles, tutorials, and development experiences. Check back soon for updates!
          </p>
          <Button asChild size="lg" className="mt-4">
            <a href="/">← Back to Home</a>
          </Button>
        </div>
      </Card>
    </div>
  );
}
