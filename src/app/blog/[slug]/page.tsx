import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { CalendarDays, MessageCircle, UserCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Mock data for a single blog post - replace with Firebase data later
const post = {
  slug: "my-first-post",
  title: "Getting Started with Next.js 14",
  content: `
<p>Next.js 14 marks another significant step forward for the popular React framework. This version brings a host of improvements and new features designed to enhance developer experience and application performance. In this guide, we'll walk through setting up a new Next.js 14 project and explore some of its key highlights.</p>

<h2 class="text-2xl font-semibold mt-6 mb-3">Key Features in Next.js 14</h2>
<ul class="list-disc list-inside space-y-2 mb-4">
  <li><strong>Server Actions (Stable):</strong> Simplifying data mutations and server-side logic.</li>
  <li><strong>Partial Prerendering (Preview):</strong> A new rendering model for faster dynamic content.</li>
  <li><strong>Improved Turbopack:</strong> Significant speed improvements for local development.</li>
</ul>

<h2 class="text-2xl font-semibold mt-6 mb-3">Setting Up Your Project</h2>
<p>To create a new Next.js 14 app, open your terminal and run:</p>
<pre class="bg-muted p-4 rounded-md text-sm my-4 overflow-x-auto"><code>npx create-next-app@latest</code></pre>
<p>Follow the prompts to configure your project. Ensure you select options like TypeScript and Tailwind CSS if you plan to use them.</p>

<figure class="my-6">
  <img src="https://placehold.co/800x400.png" alt="Next.js 14 Code Example" class="rounded-lg shadow-md" data-ai-hint="code editor">
  <figcaption class="text-center text-sm text-muted-foreground mt-2">A visual representation of a Next.js 14 project structure.</figcaption>
</figure>

<h2 class="text-2xl font-semibold mt-6 mb-3">Conclusion</h2>
<p>Next.js 14 continues to push the boundaries of web development, offering powerful tools and optimizations. Getting started is straightforward, and the benefits in terms of performance and developer productivity are substantial. Dive in and explore what Next.js 14 has to offer!</p>
  `,
  author: "Jane Doe",
  authorAvatar: "https://placehold.co/100x100.png",
  authorAvatarHint: "woman smiling",
  date: "2024-07-28",
  tags: ["Next.js", "Web Development", "JavaScript"],
  comments: [
    { id: "c1", user: "Reader1", text: "Great overview, thanks!", date: "2024-07-29" },
    { id: "c2", user: "DevGuru", text: "Looking forward to trying Server Actions.", date: "2024-07-29" },
  ]
};

// It's good practice to type params
export default function BlogPostPage({ params }: { params: { slug: string } }) {
  // In a real app, you would fetch post data based on params.slug
  if (!post || post.slug !== params.slug) {
    return <div className="text-center py-10">Blog post not found. <Link href="/blog" className="text-primary hover:underline">Return to blog</Link></div>;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-12">
      <article className="space-y-6">
        <header className="space-y-3">
          <Link href="/blog" className="text-sm text-primary hover:underline">&larr; Back to Blog</Link>
          <h1 className="text-4xl font-bold tracking-tight text-primary">{post.title}</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={post.authorAvatar} alt={post.author} data-ai-hint={post.authorAvatarHint} />
                <AvatarFallback>{post.author.substring(0,1)}</AvatarFallback>
              </Avatar>
              <span>{post.author}</span>
            </div>
            <span className="flex items-center gap-1"><CalendarDays className="h-4 w-4" /> {new Date(post.date).toLocaleDateString()}</span>
          </div>
          <div className="flex flex-wrap gap-2 pt-2">
            {post.tags.map(tag => (
              <span key={tag} className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded-full">{tag}</span>
            ))}
          </div>
        </header>
        
        <Separator />

        {/* Using dangerouslySetInnerHTML for HTML content from CMS/Markdown. Sanitize if user-generated. */}
        <div 
          className="prose prose-lg dark:prose-invert max-w-none 
                     prose-headings:text-primary prose-a:text-accent 
                     prose-strong:font-semibold prose-img:rounded-lg prose-img:shadow-md"
          dangerouslySetInnerHTML={{ __html: post.content.replace(/<img src="([^"]+)" alt="([^"]*)" class="([^"]*)" data-ai-hint="([^"]*)">/g, (match, src, alt, cls, hint) => `<Image src="${src}" alt="${alt}" class="${cls}" width="800" height="400" data-ai-hint="${hint}" />`).replace(/<img/g, '<img loading="lazy"') }} 
        />
      </article>

      <Separator />

      {/* Comments Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <MessageCircle className="h-6 w-6 text-primary" />
          Comments ({post.comments.length})
        </h2>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Leave a Comment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="commentName">Name</Label>
              <Input id="commentName" placeholder="Your Name" />
            </div>
            <div>
              <Label htmlFor="commentText">Comment</Label>
              <Textarea id="commentText" placeholder="Write your comment here..." rows={4} />
            </div>
            <Button>Submit Comment</Button>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {post.comments.map(comment => (
            <Card key={comment.id} className="bg-card/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-semibold text-sm text-primary">{comment.user}</p>
                  <p className="text-xs text-muted-foreground">{new Date(comment.date).toLocaleDateString()}</p>
                </div>
                <p className="text-sm text-foreground/80">{comment.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
