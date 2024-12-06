import type { Metadata } from 'next'; // Importing Metadata type for SEO-related data
import { Plus_Jakarta_Sans } from 'next/font/google'; // Importing Google font (Plus Jakarta Sans) for custom styling
import './globals.css'; // Importing global CSS styles

import { cn } from '@/lib/utils'; // Importing utility function for className concatenation
import { ThemeProvider } from 'next-themes'; // Importing ThemeProvider for theme management (dark/light mode support)

// Setting up the font from Google Fonts with specified weights and subsets
const fontSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans', // Custom variable to use the font
});

// Metadata configuration for the site (SEO-related)
export const metadata: Metadata = {
  title: 'CarePulse', // The title of the site
  description: 'A healthcare management system', // A brief description of the site
};

// RootLayout component that serves as the layout for the entire application
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode; // React Node type for the children prop (the dynamic content inside the layout)
}>) {
  return (
    <html lang="en">
      {' '}
      {/* Root HTML element with the 'en' language attribute */}
      <body
        className={cn(
          'min-h-screen bg-dark-300 font-sans antialiased', // Tailwind utility classes for layout and typography
          fontSans.variable // Adding custom font variable to the className
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          {' '}
          {/* Theme provider for dark mode as the default theme */}
          {children} {/* Render child components here */}
        </ThemeProvider>
      </body>
    </html>
  );
}
