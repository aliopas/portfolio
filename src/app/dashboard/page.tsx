import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LayoutDashboard, FileText, MessageSquare, PlusCircle, Settings } from "lucide-react";
import Link from "next/link";

// This page should be protected by authentication in a real app.

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <header className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Dashboard</h1>
          <p className="mt-1 text-muted-foreground">
            Manage your portfolio content, blog posts, and view messages.
          </p>
        </div>
        <Button variant="outline">
          <Settings className="mr-2 h-4 w-4" />
          Account Settings
        </Button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Manage Projects</CardTitle>
            <LayoutDashboard className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12 Projects</div>
            <p className="text-xs text-muted-foreground">
              View, add, edit, or delete your portfolio projects.
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full" asChild>
              <Link href="/dashboard/projects"><PlusCircle className="mr-2 h-4 w-4" /> Manage Projects</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Manage Blog Posts</CardTitle>
            <FileText className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8 Blog Posts</div>
            <p className="text-xs text-muted-foreground">
              Create new articles, edit existing ones, and manage comments.
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full" asChild>
              <Link href="/dashboard/blog"><PlusCircle className="mr-2 h-4 w-4" /> Manage Blog Posts</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">View Messages</CardTitle>
            <MessageSquare className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5 New Messages</div>
            <p className="text-xs text-muted-foreground">
              Read and respond to messages from your contact form.
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full" asChild>
              <Link href="/dashboard/messages">View Messages</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Quick Stats Section - Placeholder */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Portfolio At a Glance</CardTitle>
          <CardDescription>Summary of your content and engagement.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="p-4 bg-muted rounded-lg">
                <h4 className="text-sm font-medium text-muted-foreground">Total Project Views</h4>
                <p className="text-2xl font-bold">1,234</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
                <h4 className="text-sm font-medium text-muted-foreground">Total Blog Reads</h4>
                <p className="text-2xl font-bold">5,678</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
                <h4 className="text-sm font-medium text-muted-foreground">Comments Received</h4>
                <p className="text-2xl font-bold">92</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
                <h4 className="text-sm font-medium text-muted-foreground">Contact Form Submissions</h4>
                <p className="text-2xl font-bold">27</p>
            </div>
        </CardContent>
      </Card>

    </div>
  );
}
