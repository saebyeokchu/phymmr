"use client"

import { usePathname } from "next/navigation";
import Header from "./_root/header";
import Footer from "./_root/footer";
import { Inter } from "next/font/google";
import Alter from "./_root/alter";

const inter = Inter({ subsets: ["latin"] });

export default function Middle({
children,
}: Readonly<{
children: React.ReactNode;
}>){
    const router : string = usePathname();
    console.log("router",router);

    return (
        <div>
            <Header />
            <Alter />
            {children}
            <Footer />
        </div>
    )
}