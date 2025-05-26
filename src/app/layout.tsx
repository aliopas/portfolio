
import type {Metadata} from 'next';
import { Poppins, Roboto } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from '@/context/ThemeContext';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'AliAlaa', // Updated site name
  description: 'A dynamic portfolio for developers by Firebase Studio.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      {/* Explicit empty head; Next.js metadata API will populate it. suppressHydrationWarning for <html> is important for theme switching. */}
      <body className={`${poppins.variable} ${roboto.variable} font-roboto antialiased flex flex-col min-h-screen`} suppressHydrationWarning>
        <ThemeProvider>
          <Navbar />
          <main className="flex-grow container mx-auto py-8 md:py-12 px-4 sm:px-6 lg:px-8">
            {children}
          </main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
