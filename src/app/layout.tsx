import type { Metadata } from "next";
import cn from "classnames";
import { Inter } from "next/font/google";
import "@/styles/globals.scss";

import Navigation from "@/components/common/Navigation";
import { GlobalProvider } from "@/contexts/GlobalProvider";

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
      <body className={cn(inter.className, "bg-neutral-50")}>
        <main
          className="max-w-[640px] mx-auto pb-16
        sm:pl-4 sm:pr-4 sm:py-4
        lg:relative lg:max-w-[900px] lg:flex lg:flex-row lg:items-start lg:gap-4
        "
        >
          <GlobalProvider>
            <Navigation />
            {children}
            {/* <LandingPage /> */}
          </GlobalProvider>
        </main>
      </body>
    </html>
  );
}
