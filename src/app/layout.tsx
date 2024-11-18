import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Navigation from "../components/Navigation";
import LandingPage from "@/components/LandingPage";

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
  const isLogged = true;

  return (
    <html lang="tr">
      <body className={`${inter.className} bg-neutral-50`}>
        <main
          className="max-w-[640px] mx-auto pb-16
        sm:pl-4 sm:pr-4 sm:py-4
        lg:relative lg:max-w-[900px] lg:flex lg:flex-row lg:items-start lg:gap-4
        "
        >
          {isLogged ? (
            <>
              <Navigation />
              {children}
            </>
          ) : (
            <LandingPage />
          )}
        </main>
      </body>
    </html>
  );
}
