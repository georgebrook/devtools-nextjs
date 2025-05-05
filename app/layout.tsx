import type { Metadata } from 'next';
import Header from '@sections/Header/Header';
import { Roboto } from "next/font/google";
import "./globals.css";
import { fetchNav } from '@lib/api';

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mainNav, toolsNav, optionsNav] = await Promise.all([
    fetchNav('main'),
    fetchNav('tools'),
    fetchNav('options'),
  ]);

  return (
    <html lang="en">
      <body className={`${roboto.variable} antialiased`}>
        <Header
          mainNavItems={mainNav}
          toolsNavItems={toolsNav}
          optionsNavItems={optionsNav}
        />
        <main className='h-full'>{children}</main>
      </body>
    </html>
  );
}
