import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Middle from "./middle";
import ContextProviders from "@/context/ContextProviders";
import { PrelineScript } from "@/component/layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "포항역 머무름 쉐어하우스",
  description: "포항 유일 쉐어하우스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/setting/fav.ico" sizes="any" />
      </head>
      <body className={`${inter.className} bg-black flex justify-center`}>
          <ContextProviders>
            <Middle> 
              {children}
            </Middle>
          </ContextProviders>
      </body>
      <PrelineScript />
    </html>
  );
}
