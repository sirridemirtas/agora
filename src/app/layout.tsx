import type { Metadata } from "next";
import clsx from "clsx";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { GlobalProvider } from "@/contexts/GlobalProvider";
import { Logo, Navigation, PageTitle, SplashScreen } from "@/components/common";

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
      <body className={clsx(inter.className, "bg-neutral-50 dark:bg-black")}>
        <GlobalProvider>
          <SplashScreen visible={false} />
          <div
            className={clsx(
              "mx-auto md:max-w-[640px] lg:pl-4",
              "lg:flex lg:max-w-[920px] lg:flex-row lg:items-start"
            )}
          >
            <div
              className={clsx(
                "lg:sticky lg:top-0 lg:h-screen",
                "lg:flex lg:flex-col"
              )}
            >
              <div className="hidden h-16 lg:inline">
                <Logo className="ml-5 mt-2" />
              </div>
              <Navigation />
              <div className="hidden justify-start pt-4 lg:flex">
                <p className="text-xs text-neutral-400">
                  Copyright © {new Date().getFullYear()}{" "}
                  <a
                    href="https://github.com/sirridemirtas"
                    target="_blank"
                    className="hover:underline"
                  >
                    Sırrı Demirtaş
                  </a>
                </p>
              </div>
            </div>
            <main className={"min-h-svh flex-1"}>
              <header
                className={clsx(
                  "flex flex-row items-center justify-between px-4",
                  "flex-grow-1 h-16 w-full",
                  "left:0 right:0 sticky top-0 z-10",
                  "border-b bg-neutral-50 bg-opacity-80 backdrop-blur-md",
                  "md:border-none md:bg-opacity-100 md:backdrop-blur-none"
                )}
              >
                <div className="w-full">
                  <PageTitle />
                </div>
                <RoundedCorners />
              </header>
              <div
                className={
                  "relative z-0 min-h-[calc(100vh-4rem)] bg-white pb-16 sm:pb-0 sm:shadow-sm lg:m-auto lg:mx-4"
                }
              >
                {children}
              </div>
            </main>
          </div>
        </GlobalProvider>
      </body>
    </html>
  );
}

const RoundedCorners = () => {
  return (
    <>
      <div
        className={
          "absolute top-16 z-10 -ml-8 -mt-4 hidden h-8 w-8 overflow-hidden bg-neutral-50 md:inline lg:-ml-4"
        }
      >
        <div
          className={
            "absolute -bottom-8 -right-8 h-12 w-12 rounded-xl bg-white shadow-sm"
          }
        ></div>
      </div>
      <div
        className={
          "absolute -right-4 top-16 z-10 -mt-4 hidden h-8 w-8 overflow-hidden bg-neutral-50 md:inline lg:right-0"
        }
      >
        <div
          className={
            "absolute -bottom-8 -left-8 h-12 w-12 rounded-xl bg-white shadow-sm"
          }
        ></div>
      </div>
    </>
  );
};
