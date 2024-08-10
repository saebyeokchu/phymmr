import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AlterContextProvider } from "./context/AlterContext";
import { DragContextProvider } from "./context/DragContext";
import { PrintContextProvider } from "./context/PrintContext";
import { CanvasContextProvider } from "./context/CanvasContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AlterContextProvider>
        <CanvasContextProvider> 
          <PrintContextProvider>
            <DragContextProvider>
              <body className={inter.className}>{children}</body>
            </DragContextProvider>
          </PrintContextProvider>
        </CanvasContextProvider>     
      </AlterContextProvider>

    </html>
  );
}
