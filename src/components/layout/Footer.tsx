import { Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col items-center gap-1">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Ali Alaa. All rights reserved.
          </p>
        </div>
         <div className="text-center md:text-left">
        <p className="text-sm text-muted-foreground">
          💼 For freelance contracts, please contact me directly through the platform.
        </p>
      </div>
        <div className="flex items-center gap-6">
          <Link 
            href="https://github.com/aliopas" 
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub" 
            className="text-muted-foreground hover:text-primary transition-colors hover:scale-110"
          >
            <Github className="h-5 w-5" />
          </Link>
          <Link 
            href="https://www.linkedin.com/in/ali-alaa-salama-414267323/" 
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn" 
            className="text-muted-foreground hover:text-primary transition-colors hover:scale-110"
          >
            <Linkedin className="h-5 w-5" />
          </Link>
          <Link 
            href="mailto:ali.alaaeldin.2025@gmail.com"
            aria-label="Email" 
            className="text-muted-foreground hover:text-primary transition-colors hover:scale-110"
          >
            <Mail className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
