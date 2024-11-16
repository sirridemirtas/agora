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
        <header
          className="
        fixed top-0 left-0 right-0
        flex justify-between items-center 
        p-4 h-16
        bg-white border-b
        "
        >
          <h1 className="text-2xl font-bold">My Application</h1>
          <DarkModeToggle />
        </header>
        <main className="pt-16 pb-16">{children}</main>
        <Navigation />
      </body>
    </html>
  );
}
