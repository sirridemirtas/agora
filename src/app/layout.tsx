import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
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
        <header className="p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">My Application</h1>
          <DarkModeToggle />
        </header>
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
