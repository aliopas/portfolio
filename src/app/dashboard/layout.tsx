
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Briefcase, MessageSquare, LogOut, Settings, UserCircle, Menu, X, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Logo } from '@/components/Logo';
import { cn } from '@/lib/utils';
import React, { useState, useEffect } from 'react'; // Added useEffect

// Mock authentication state - replace with actual auth logic
const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Default to false
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking auth status
    const authStatus = localStorage.getItem('isMockLoggedIn') === 'true';
    setIsLoggedIn(authStatus);
    setIsLoading(false);
  }, []);
  
  const login = () => {
    localStorage.setItem('isMockLoggedIn', 'true');
    setIsLoggedIn(true);
     // In a real app, you'd redirect or use router here
    if (typeof window !== 'undefined') window.location.href = '/dashboard';
  };

  const logout = () => {
    localStorage.removeItem('isMockLoggedIn');
    setIsLoggedIn(false);
    // In a real app, you'd redirect or use router here
    if (typeof window !== 'undefined') window.location.href = '/';
  };
  
  return { isLoggedIn, login, logout, isLoading };
};


const sidebarNavItems = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/projects', label: 'Manage Projects', icon: Briefcase },
  // { href: '/dashboard/blog', label: 'Manage Blog', icon: FileText }, // Keep commented if not implemented
  { href: '/dashboard/messages', label: 'View Messages', icon: MessageSquare },
  { href: '/dashboard/settings', label: 'Account Settings', icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { isLoggedIn, logout, isLoading } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  useEffect(() => {
    if (!isLoading && !isLoggedIn && typeof window !== 'undefined') {
       window.location.href = '/login'; // Redirect if not logged in
    }
  }, [isLoggedIn, isLoading, pathname]);


  if (isLoading) {
    return <div className="flex h-screen items-center justify-center"><p>Loading dashboard...</p></div>;
  }

  if (!isLoggedIn) {
    // This part might not be reached if redirect happens fast enough, but good for safety
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <h1 className="text-2xl font-semibold mb-4">Access Denied</h1>
        <p className="mb-4">You need to be logged in to view the dashboard.</p>
        <Button asChild><Link href="/login">Go to Login</Link></Button>
      </div>
    );
  }
  
  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <Logo />
      </div>
      <nav className="flex-grow px-4 py-6 space-y-2">
        {sidebarNavItems.map((item) => (
          <Button
            key={item.href}
            variant={pathname === item.href ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            asChild
          >
            <Link href={item.href}>
              <item.icon className="mr-2 h-5 w-5" />
              {item.label}
            </Link>
          </Button>
        ))}
      </nav>
      <div className="p-4 border-t mt-auto">
        <Button variant="outline" className="w-full justify-start" onClick={logout}>
          <LogOut className="mr-2 h-5 w-5" />
          Logout
        </Button>
         <Button variant="ghost" className="w-full justify-start mt-2" asChild>
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Back to Site
            </Link>
          </Button>
      </div>
    </div>
  );


  return (
    <div className="flex min-h-screen bg-muted/40">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block md:w-64 lg:w-72 bg-background border-r">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar & Main Content */}
      <div className="flex flex-col flex-1">
        <header className="md:hidden sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs p-0">
              <SidebarContent />
            </SheetContent>
          </Sheet>
          <div className="md:hidden">
             <Logo />
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
