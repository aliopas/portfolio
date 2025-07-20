import Link from 'next/link';
import { TerminalSquare } from 'lucide-react';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/90 transition-colors">
      <TerminalSquare className="h-7 w-7" />
      <span className="text-xl font-bold tracking-tight">AliAlaa</span>
    </Link>
  );
}
