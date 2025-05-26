'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';

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

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);
  
  if (!isMounted) {
    // Render a placeholder or null on the server to avoid hydration mismatch,
    // then actual UI on the client. For theme toggle, it's best to render it client-side.
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Logo />
          <div className="hidden md:flex items-center gap-4">
            <nav className={cn('flex items-center gap-4 lg:gap-6')}>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-primary',
                    pathname === item.href ? 'text-primary' : 'text-foreground/60'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            {/* Placeholder for theme toggle button to prevent layout shift */}
            <Button variant="ghost" size="icon" className="w-9 h-9 opacity-0" aria-hidden="true">
              <Sun className="h-[1.2rem] w-[1.2rem]" />
            </Button>
          </div>
          <div className="md:hidden">
            <Button variant="ghost" size="icon" className="opacity-0" aria-hidden="true">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </header>
    );
  }


  const NavLinks = ({ className }: { className?: string }) => (
    <nav className={cn('flex items-center gap-4 lg:gap-6', className)}>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            pathname === item.href ? 'text-primary' : 'text-foreground/60'
          )}
        >
          {item.label}
        </Link>
      ))}
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

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />
        <div className="hidden md:flex items-center gap-x-2"> {/* Use gap-x-2 for closer spacing if needed */}
          <NavLinks />
          <ThemeToggleButton />
          {/* Auth buttons placeholder */}
          {/* <Button variant="outline" size="sm">Login</Button>
          <Button size="sm">Sign Up</Button> */}
        </div>
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggleButton />
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs sm:max-w-sm pt-16"> {/* Added pt-16 to avoid overlap with header */}
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between px-6 pb-4 border-b mb-4 absolute top-0 left-0 right-0 h-16 bg-background/95">
                   <Logo />
                   <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                     <X className="h-6 w-6" />
                     <span className="sr-only">Close menu</span>
                   </Button>
                </div>
                <div className="flex-grow overflow-y-auto px-6">
                  <NavLinks className="flex-col items-start gap-4" />
                </div>
                 {/* Auth buttons placeholder for mobile */}
                {/* <div className="flex flex-col gap-2 p-6 border-t">
                  <Button variant="outline" className="w-full">Login</Button>
                  <Button className="w-full">Sign Up</Button>
                </div> */}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
