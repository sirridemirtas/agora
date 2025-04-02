import type { Metadata, Viewport } from "next";
import Link from "next/link";
import clsx from "clsx";
import { Libre_Franklin } from "next/font/google";
import "@/styles/globals.css";
import { GlobalProvider } from "@/contexts/GlobalProvider";
import {
  Logo,
  Navigation,
  PageTitle,
  //ScrollRestorator,
  SplashScreen,
} from "@/components/common";
import { LoginRequiredModal } from "@/components/common";

const font = Libre_Franklin({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAFA" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export const metadata: Metadata = {
  title: "DedimKi",
  description: "Üniversite bazlı anonim sosyal medya platformu",
  keywords: [
    "DedimKi",
    "Sosyal Medya",
    "Üniversite",
    "Anonim",
    "Platform",
    "İletişim",
    "Paylaşım",
  ],
  authors: [{ name: "Sirri Demirtas" }],
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
    "mobile-web-app-capable": "yes",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body
        className={clsx(
          font.className,
          "bg-neutral-50 text-neutral-950 dark:bg-black dark:text-neutral-100"
        )}
      >
        <GlobalProvider>
          {/* <ScrollRestorator /> */}
          <SplashScreen visible={false} />
          <LoginRequiredModal />
          <div
            className={clsx(
              "mx-auto md:max-w-[640px] lg:pl-4",
              "lg:flex lg:max-w-[920px] lg:flex-row lg:items-start"
            )}
          >
            <div
              className={clsx(
                "lg:sticky lg:top-0 lg:h-full lg:pb-2",
                "_lg:overflow-y-auto gap-0 lg:flex lg:flex-col"
              )}
            >
              <div className="hidden h-16 lg:block">
                <Link
                  href="/"
                  className="select-none outline-none lg:inline-flex lg:flex-row lg:items-center lg:justify-start"
                >
                  <Logo className="ml-5 mt-2" />
                  <h1 className="mt-2 text-xl">DedimKi</h1>
                </Link>
              </div>

              <Navigation />
              <div className="hidden px-1 pb-1 pt-4 lg:block">
                <p className="w-full text-center text-xs text-neutral-400">
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
                  "border-b bg-neutral-50 bg-opacity-80 backdrop-blur-md md:border-0 dark:border-x-0 dark:border-neutral-800 dark:bg-black",
                  "md:bg-opacity-100 md:backdrop-blur-none"
                )}
              >
                <div className="w-full">
                  <PageTitle />
                </div>
                <RoundedCorners />
              </header>
              <div
                className={clsx(
                  "_min-h-[100vh] relative min-h-[calc(100vh-4rem)] bg-white pb-16 sm:shadow-sm lg:m-auto lg:mx-4 lg:pb-0",
                  "dark:border-x-0 dark:border-neutral-800 dark:bg-neutral-950 dark:shadow-none dark:md:border-x",
                  "flex flex-col justify-between"
                )}
              >
                <div>{children}</div>
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
      {/* Sol köşe */}
      <div
        className={
          "absolute top-4 z-10 -ml-8 -mt-4 hidden h-20 w-8 overflow-hidden bg-neutral-50 md:inline lg:-ml-4 dark:bg-black"
        }
      >
        <div
          className={
            "absolute -bottom-8 -right-8 h-12 w-12 rounded-xl bg-white shadow-sm dark:border dark:border-neutral-800 dark:bg-neutral-950"
          }
        ></div>
      </div>
      {/* Orta */}
      <div className="absolute -mb-[2px] ml-[calc(1rem)] mt-12 hidden h-4 w-[calc(100%-4rem)] md:-ml-2 md:w-[calc(100%-1rem)] dark:inline dark:border-neutral-800 md:dark:border-b"></div>
      {/* Sağ köşe */}
      <div
        className={
          "absolute -right-4 top-4 z-10 -mt-4 hidden h-20 w-8 overflow-hidden bg-neutral-50 md:inline lg:right-0 dark:bg-black"
        }
      >
        <div
          className={
            "absolute -bottom-8 -left-8 h-12 w-12 rounded-xl bg-white shadow-sm dark:border dark:border-neutral-800 dark:bg-neutral-950"
          }
        ></div>
      </div>
    </>
  );
};
