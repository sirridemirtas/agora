import type { Metadata } from "next";

import "./globals.css";

import { Inter } from "next/font/google";
import Navigation from "../components/Navigation";
import DarkModeToggle from "../components/DarkModeToggle";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Microblog",
  description: "A simple microblogging application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={`${inter.className} bg-neutral-50`}>
        {/*<header className="fixed top-0 left-0 right-0 flex justify-between items-center p-4 h-16 bg-white">
          <h1 className="text-xl font-bold">Agora</h1>
          <DarkModeToggle />
        </header>*/}

        <main
          className="max-w-[640px] mx-auto pb-16
        sm:pl-4 sm:pr-4 sm:py-4
        lg:relative lg:max-w-[900px] lg:flex lg:flex-row lg:items-start lg:gap-4
        "
        >
          <Navigation />
          {children}
        </main>
      </body>
    </html>
  );
}
