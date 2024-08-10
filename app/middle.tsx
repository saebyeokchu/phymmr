"use client"

import { usePathname } from "next/navigation";
import Header from "./_root/header";
import Footer from "./_root/footer";
import { Inter } from "next/font/google";
import RootLayout from "./editor/layout";

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
        <RootLayout>
          {children}
        </RootLayout>:
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    )
}