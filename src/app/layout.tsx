import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';

import { Providers } from './providers';
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SSR Amritapuri | Amrita Vishwa Vidyapeetham',
  description: 'Student Social Responsibility Initiative - Amrita Vishwa Vidyapeetham, Amritapuri Campus',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <html lang="en">
          <body className={inter.className}>
              <Providers>
                  {children}
                  <Toaster
                      position="bottom-right"
                      reverseOrder={false}
                      gutter={8}
                  />
              </Providers>
          </body>
      </html>
  );
}
