import type { Metadata } from "next";
import cn from "classnames";
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
      <body className={cn(inter.className, "bg-neutral-50")}>
        <GlobalProvider>
          <SplashScreen visible={false} />
          <div
            className={cn(
              "md:max-w-[640px] mx-auto lg:pl-4",
              "lg:max-w-[920px] lg:flex lg:flex-row lg:items-start"
            )}
          >
            <div
              className={cn(
                "lg:h-screen lg:sticky lg:top-0",
                "lg:flex lg:flex-col"
              )}
            >
              <div className="hidden lg:inline h-16">
                <Logo className="ml-5 mt-2" />
              </div>
              <Navigation />
            </div>
            <main className={"flex-1 min-h-svh"}>
              <header
                className={cn(
                  "flex flex-row items-center justify-between px-4",
                  "h-16 w-full flex-grow-1",
                  "sticky top-0 left:0 right:0 z-10",
                  "bg-neutral-50 backdrop-blur-md bg-opacity-80 border-b",
                  "md:backdrop-blur-none md:bg-opacity-100 md:border-none"
                )}
              >
                <div className="w-full">
                  <PageTitle />
                </div>
                <RoundedCorners />
              </header>
              <div
                className={
                  "lg:m-auto lg:mx-4 min-h-[calc(100vh-4rem)] z-0 relative pb-16 sm:pb-0 sm:shadow-sm bg-white"
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
          "hidden md:inline absolute top-16 -mt-4 -ml-8 lg:-ml-4 h-8 w-8 z-10 overflow-hidden bg-neutral-50"
        }
      >
        <div
          className={
            "absolute h-12 w-12 -bottom-8 -right-8 rounded-xl shadow-sm bg-white"
          }
        ></div>
      </div>
      <div
        className={
          "hidden md:inline absolute top-16 -mt-4 -right-4 lg:right-0 h-8 w-8 z-10 overflow-hidden bg-neutral-50"
        }
      >
        <div
          className={
            "absolute h-12 w-12 -bottom-8 -left-8 rounded-xl shadow-sm bg-white"
          }
        ></div>
      </div>
    </>
  );
};
