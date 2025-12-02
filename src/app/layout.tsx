import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Life Optimization Protocol",
  description: "Dec 2 - Jan 1: Peak Performance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-black text-zinc-100 pb-24`}>
        <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none z-0"></div>
        <main className="relative z-10 max-w-md mx-auto min-h-screen p-4">
          {children}
        </main>
        <Navbar />
      </body>
    </html>
  );
}
