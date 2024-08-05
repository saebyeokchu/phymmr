"use client"

import { usePathname } from "next/navigation";
import Header from "./_root/header";
import Footer from "./_root/footer";
import EditorPage from "./editor/page";

export default function Middle({
children,
}: Readonly<{
children: React.ReactNode;
}>){
    const router : string = usePathname();
    console.log("router",router);

    return (
        router === '/editor' ?
        <div>
            <EditorPage />
        </div> :
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    )
}