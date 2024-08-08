"use client"

import { usePathname } from "next/navigation";
import Header from "./_root/header";
import Footer from "./_root/footer";
import EditorPage from "./editor/page";
import { AlterContextProvider } from "./editor/context/AlterContext";
import { PrintContextProvider } from "./editor/context/PrintContext";
import { DragContextProvider } from "./editor/context/DragContex";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Middle({
children,
}: Readonly<{
children: React.ReactNode;
}>){
    const router : string = usePathname();
    console.log("router",router);

    return (
        router === '/editor' ?
        <AlterContextProvider>      
        <PrintContextProvider>
          <DragContextProvider>
            <body className={inter.className}>{children}</body>
          </DragContextProvider>
        </PrintContextProvider>
      </AlterContextProvider> :
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    )
}