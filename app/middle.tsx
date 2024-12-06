"use client"

import { usePathname } from "next/navigation";
import { Inter } from "next/font/google";
import { Header, Footer, BannerNotice } from "./component";
import { useAlterContext } from "./context/AlterContext";
import { useEffect } from "react";
import { KakaoLink } from "./library/Consts";



const inter = Inter({ subsets: ["latin"] });

export default function Middle({
children,
}: Readonly<{
children: React.ReactNode;
}>){
    const router : string = usePathname();
    const useAlter = useAlterContext();

    useEffect(()=>{
        useAlter.setTurnBanner(true);
        useAlter.setTitle("1번방 오픈!");
        useAlter.setActionMessage("1번방 입실 신청하기");
        useAlter.setActionLink(KakaoLink);
    })

    return (
        <div className="max-w-[24rem] bg-white h-screen">
            <Header />

            { useAlter.turnBanner && <BannerNotice 
                title={useAlter.title} 
                message={useAlter.message} 
                actionMessage={useAlter.actionMessage} 
                actionLink={useAlter.actionLink} /> }

            <div className="min-h-96 bg-white mt-3">
                {children}
            </div>

            <Footer />

        </div>
    )
}