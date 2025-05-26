
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Sun, Moon, LogIn, UserPlus, LayoutDashboard, LogOut } from 'lucide-react';
import React, { useState, useEffect } from 'react'; // React import for hooks

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/Logo';
import { useTheme } from '@/context/ThemeContext';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/ai-project-description', label: 'AI Tool' },
];

// Mock authentication hook (replace with actual context/logic)
const useMockAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  useEffect(() => {
    // Simulate checking auth status from localStorage
    const authStatus = localStorage.getItem('isMockLoggedIn') === 'true';
    setIsLoggedIn(authStatus);
    setIsLoadingAuth(false);
  }, []);

  const logout = () => {
    localStorage.removeItem('isMockLoggedIn');
    setIsLoggedIn(false);
    if (typeof window !== 'undefined') window.location.href = '/'; // Redirect to home
  };

  return { isLoggedIn, logout, isLoadingAuth };
};


export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { isLoggedIn, logout, isLoadingAuth } = useMockAuth();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false); // Close mobile menu on path change
  }, [pathname]);
  
  // Render a simplified navbar or null during SSR/auth loading to prevent hydration mismatch
  if (!isMounted || isLoadingAuth) {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Logo />
          <div className="h-8 w-20 bg-muted/50 rounded animate-pulse md:hidden"></div> {/* Placeholder for mobile menu button */}
          <div className="hidden md:flex items-center gap-4">
            {/* Placeholder for nav links */}
            <div className="h-6 w-12 bg-muted/50 rounded animate-pulse"></div>
            <div className="h-6 w-16 bg-muted/50 rounded animate-pulse"></div>
            <div className="h-6 w-12 bg-muted/50 rounded animate-pulse"></div>
            {/* Placeholder for theme toggle button */}
            <div className="w-9 h-9 bg-muted/50 rounded-full animate-pulse"></div>
            {/* Placeholder for auth buttons */}
            <div className="h-8 w-20 bg-muted/50 rounded animate-pulse"></div>
          </div>
        </div>
      </header>
    );
  }

  const NavLinks = ({ className, onItemClick }: { className?: string, onItemClick?: () => void }) => (
    <nav className={cn('flex items-center gap-4 lg:gap-6', className)}>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={onItemClick}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            pathname === item.href ? 'text-primary' : 'text-foreground/60'
          )}
        >
          {item.label}
        </Link>
      ))}
      {isLoggedIn && (
         <Link
          href="/dashboard"
          onClick={onItemClick}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary flex items-center',
            pathname.startsWith('/dashboard') ? 'text-primary' : 'text-foreground/60'
          )}
        >
          <LayoutDashboard className="mr-1 h-4 w-4 md:hidden lg:inline-block" /> Dashboard
        </Link>
      )}
    </nav>
  );

  const ThemeToggleButton = () => (
    <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
      {theme === 'light' ? (
        <Moon className="h-[1.2rem] w-[1.2rem] transition-all" />
      ) : (
        <Sun className="h-[1.2rem] w-[1.2rem] transition-all" />
      )}
    </Button>
  );

  const AuthButtons = ({ isMobile = false, onItemClick }: { isMobile?: boolean, onItemClick?: () => void }) => (
    <div className={cn("flex items-center gap-2", isMobile && "flex-col w-full pt-4 border-t mt-4")}>
      {isLoggedIn ? (
        <Button 
          variant={isMobile ? "default" : "outline"} 
          size="sm" 
          onClick={() => { logout(); onItemClick && onItemClick(); }}
          className={cn(isMobile && "w-full")}
        >
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </Button>
      ) : (
        <>
          <Button variant={isMobile ? "outline" : "ghost"} size="sm" asChild className={cn(isMobile && "w-full")}>
            <Link href="/login" onClick={onItemClick}><LogIn className="mr-2 h-4 w-4" />Login</Link>
          </Button>
          <Button size="sm" asChild className={cn("btn-glow", isMobile && "w-full")}>
            <Link href="/signup" onClick={onItemClick}><UserPlus className="mr-2 h-4 w-4" />Sign Up</Link>
          </Button>
        </>
      )}
    </div>
  );


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-x-2">
          <NavLinks />
          <ThemeToggleButton />
          <AuthButtons />
        </div>

        {/* Mobile Navigation Trigger */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggleButton />
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs sm:max-w-sm pt-0 flex flex-col p-0"> {/* Modified for full height */}
              <div className="flex items-center justify-between px-6 h-16 border-b">
                 <Logo />
                 <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                   <X className="h-6 w-6" />
                   <span className="sr-only">Close menu</span>
                 </Button>
              </div>
              <div className="flex-grow overflow-y-auto p-6">
                <NavLinks className="flex-col items-start gap-4" onItemClick={() => setIsMobileMenuOpen(false)} />
              </div>
              <div className="p-6 border-t">
                <AuthButtons isMobile onItemClick={() => setIsMobileMenuOpen(false)} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
