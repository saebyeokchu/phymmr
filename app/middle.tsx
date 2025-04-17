"use client"

import { usePathname } from "next/navigation";
import { Inter } from "next/font/google";
import { useEffect } from "react";

import { GetPricesData } from "../service/RoomService";
import { useAlterContext, useRoomContext } from "@/context";
import { KakaoLink } from "@/data/Consts";
import { Notice, Header, Footer } from "@/component/layout";



const inter = Inter({ subsets: ["latin"] });

export default function Middle({
children,
}: Readonly<{
children: React.ReactNode;
}>){
    const router : string = usePathname();
    const useAlter = useAlterContext();
    const roomContext = useRoomContext();

    useEffect(()=>{
        useAlter.setTurnBanner(false);
        useAlter.setTitle("1번방 오픈!");
        useAlter.setActionMessage("1번방 입실 신청하기");
        useAlter.setActionLink(KakaoLink);

        setGeneralInfo();
    },[]);

    const setGeneralInfo = async () => {
        const prices = await GetPricesData();

        if(prices){
            roomContext.prices = prices;
        }
    }

    return (
        <div className="max-w-[24rem] bg-white h-screen">
            <Header />

            { useAlter.turnBanner && <Notice.Banner 
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