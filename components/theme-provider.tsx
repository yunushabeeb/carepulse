'use client'; // Ensures this code is executed on the client side in Next.js

import * as React from 'react'; // Importing React for JSX usage
import { ThemeProvider as NextThemesProvider } from 'next-themes'; // Importing ThemeProvider from next-themes for theme management
import { type ThemeProviderProps } from 'next-themes/dist/types'; // Importing TypeScript type for ThemeProviderProps for type safety

// Custom ThemeProvider component that wraps the NextThemesProvider from 'next-themes'
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Returns the NextThemesProvider with the received props and renders the children inside it
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
