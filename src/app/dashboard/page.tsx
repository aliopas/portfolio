
"use client";
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { LayoutDashboard, FileText, MessageSquare, PlusCircle, Settings, Briefcase, Eye, UserCircle } from "lucide-react";
import Link from "next/link";
// حذف البيانات الوهمية
import { useTheme } from '@/context/ThemeContext'; // For theme-aware styling if needed
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


// Mock data for charts - replace with actual analytics later
const viewsData = [
  { name: 'Jan', projects: 400, blog: 240 },
  { name: 'Feb', projects: 300, blog: 139 },
  { name: 'Mar', projects: 200, blog: 980 },
  { name: 'Apr', projects: 278, blog: 390 },
  { name: 'May', projects: 189, blog: 480 },
  { name: 'Jun', projects: 239, blog: 380 },
];

const engagementData = [
  { name: 'Comments', value: 15 }, // Placeholder, يمكن تعديله لاحقاً ليعتمد على بيانات حقيقية
  { name: 'Likes', value: 350 }, // Placeholder
  { name: 'Shares', value: 120 }, // Placeholder
];


export default function DashboardPage() {
  const { theme } = useTheme();
  const [projectsCount, setProjectsCount] = React.useState(0);
  const [messagesCount, setMessagesCount] = React.useState(0);
  const [unreadMessagesCount, setUnreadMessagesCount] = React.useState(0);

  React.useEffect(() => {
    // جلب عدد المشاريع
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => setProjectsCount(Array.isArray(data) ? data.length : 0));
    // جلب عدد الرسائل
    fetch('/api/messages')
      .then(res => res.json())
      .then(data => {
        setMessagesCount(Array.isArray(data) ? data.length : 0);
        setUnreadMessagesCount(Array.isArray(data) ? data.filter((msg: any) => !msg.read).length : 0);
      });
  }, []);

  return (
    <div className="space-y-8">
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary">Dashboard Overview</h1>
          <p className="mt-1 text-muted-foreground">
            Welcome back, AliAlaa! Manage your portfolio and view insights.
          </p>
        </div>
        <Button variant="outline" asChild>
            <Link href="/dashboard/settings">
                <Settings className="mr-2 h-4 w-4" />
                Account Settings
            </Link>
        </Button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Manage Projects</CardTitle>
            <Briefcase className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectsCount} Projects</div>
            <p className="text-xs text-muted-foreground">
              Add, edit, or delete your portfolio projects.
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full btn-glow" asChild>
              <Link href="/dashboard/projects"><PlusCircle className="mr-2 h-4 w-4" /> Manage Projects</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">View Messages</CardTitle>
            <MessageSquare className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unreadMessagesCount} New Messages</div>
            <p className="text-xs text-muted-foreground">
              {messagesCount} total messages from your contact form.
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full btn-glow" asChild>
              <Link href="/dashboard/messages"><Eye className="mr-2 h-4 w-4" /> View Messages</Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Manage Blog (Coming Soon)</CardTitle>
            <FileText className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">N/A Posts</div>
            <p className="text-xs text-muted-foreground">
              This feature is under development.
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full" disabled>
              <PlusCircle className="mr-2 h-4 w-4" /> Manage Blog Posts
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Quick Stats & Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Content Views</CardTitle>
            <CardDescription>Monthly views for projects and blog posts.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={viewsData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? "hsl(var(--border)/0.5)" : "hsl(var(--border))"} />
                <XAxis dataKey="name" stroke={theme === 'dark' ? "hsl(var(--muted-foreground))" : "hsl(var(--foreground))"} fontSize={12} />
                <YAxis stroke={theme === 'dark' ? "hsl(var(--muted-foreground))" : "hsl(var(--foreground))"} fontSize={12}/>
                <Tooltip
                  contentStyle={{ 
                    backgroundColor: `hsl(var(--card))`, 
                    borderColor: `hsl(var(--border))`,
                    color: `hsl(var(--card-foreground))`
                  }}
                  cursor={{ fill: `hsl(var(--accent)/0.2)` }}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="projects" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Project Views" />
                <Bar dataKey="blog" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} name="Blog Reads" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Engagement</CardTitle>
            <CardDescription>Overview of user interactions.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
             <ResponsiveContainer width="100%" height="100%">
              <BarChart data={engagementData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? "hsl(var(--border)/0.5)" : "hsl(var(--border))"} />
                <XAxis type="number" stroke={theme === 'dark' ? "hsl(var(--muted-foreground))" : "hsl(var(--foreground))"} fontSize={12} />
                <YAxis dataKey="name" type="category" stroke={theme === 'dark' ? "hsl(var(--muted-foreground))" : "hsl(var(--foreground))"} fontSize={12} width={80} />
                <Tooltip 
                    contentStyle={{ 
                        backgroundColor: `hsl(var(--card))`, 
                        borderColor: `hsl(var(--border))`,
                        color: `hsl(var(--card-foreground))`
                    }}
                    cursor={{ fill: `hsl(var(--accent)/0.2)` }}
                />
                <Bar dataKey="value" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} barSize={20} name="Count" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
