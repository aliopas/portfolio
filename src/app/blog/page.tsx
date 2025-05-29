
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CalendarDays, UserCircle } from "lucide-react";
import Link from "next/link";

// Mock data for blog posts - replace with Firebase data later
const blogPosts = [
  {
    id: "1",
    slug: "my-first-post",
    title: "Getting Started with Next.js 14",
    excerpt: "A beginner-friendly guide to setting up your first Next.js 14 project, covering new features and best practices.",
    author: "Jane Doe",
    date: "2024-07-28",
    tags: ["Next.js", "Web Development", "JavaScript"],
  },
  {
    id: "2",
    slug: "tailwind-css-deep-dive",
    title: "Mastering Tailwind CSS for Rapid UI Development",
    excerpt: "Explore advanced Tailwind CSS concepts, custom configurations, and tips for building beautiful UIs quickly.",
    author: "John Smith",
    date: "2024-07-20",
    tags: ["Tailwind CSS", "CSS", "Frontend"],
  },
  {
    id: "3",
    slug: "firebase-authentication-guide",
    title: "Secure Your App with Firebase Authentication",
    excerpt: "Learn how to implement robust authentication in your web and mobile applications using Firebase.",
    author: "Alice Green",
    date: "2024-07-15",
    tags: ["Firebase", "Authentication", "Security"],
  },
];

export default function BlogPage() {
  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-primary">My Blog</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Sharing thoughts, tutorials, and updates on my development journey.
        </p>
      </header>

      {/* "Create New Post" button removed from here */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <Card key={post.id} className="flex flex-col overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-xl hover:text-primary transition-colors">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground flex items-center gap-4 pt-1">
                <span className="flex items-center gap-1"><UserCircle className="h-3 w-3" /> {post.author}</span>
                <span className="flex items-center gap-1"><CalendarDays className="h-3 w-3" /> {new Date(post.date).toLocaleDateString()}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-foreground/80 leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>
              <div className="flex flex-wrap gap-2 pt-4">
                  {post.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded-full">{tag}</span>
                  ))}
                </div>
            </CardContent>
            <CardFooter className="p-6 bg-muted/50 border-t">
              <Button variant="link" asChild className="p-0 h-auto text-primary">
                <Link href={`/blog/${post.slug}`}>Read More <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
