'use client';

import { useEffect, useState, ReactNode } from 'react';
import { AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function ErrorBoundary({ children, fallback }: ErrorBoundaryProps) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleError = () => setHasError(true);
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (hasError) {
    return (
      fallback || (
        <Card className="border-red-500/50 bg-red-50/5 dark:bg-red-950/10">
          <CardContent className="pt-8 flex flex-col items-center gap-4">
            <AlertCircle className="h-12 w-12 text-red-500" />
            <h3 className="text-lg font-semibold">Something went wrong</h3>
            <p className="text-muted-foreground text-center">
              We encountered an error. Please try again or contact support.
            </p>
            <Button onClick={() => setHasError(false)} variant="outline">
              Try Again
            </Button>
          </CardContent>
        </Card>
      )
    );
  }

  return <>{children}</>;
}
