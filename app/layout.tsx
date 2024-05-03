import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./_root/header";
import Footer from "./_root/footer";

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
      <body className={`${inter.className} bg-white`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
