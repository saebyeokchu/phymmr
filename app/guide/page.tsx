"use client"
import Link from 'next/link'
import { useEffect, useState } from "react";
import ForEveryone from './forEveryone/template';
import ForRoom2 from './forRoom2/template';
import ForRoom1 from './forRoom1/template';
import ForEntireApt from './forEntireApt/template';

type AccordionBox = {
    noticeTitle : string,
    notices : string[], 
    noticeIndex : number, 
    imageSrc? : string
}

export default function Guide() {
    const [reservationType,setReservationType] = useState<string>("forEveryOne");
    const menuNum : number =  10;

    useEffect(()=>{
        let initialShowMenuAry : boolean[] = []
        for (let index = 0; index < menuNum; index++) { initialShowMenuAry.push(false) }
    },[]);

    const adjustBelowList = (reservationType : string) => {
        setReservationType(reservationType)
        console.log("saebyeok : ", reservationType)
    }

    return (
        <div className="bg-white">
            <div className="container my-24 mx-auto md:px-6 xl:px-24">
                <section className="mb-32">
                    <h2 className="mb-6 pl-6 text-3xl font-bold">포항역 머무름 사용설명서</h2>
                    {/* sm:justify-normal sm:flex-col  */}
                    <div className="flex flex-wrap md:flex md:justify-start space-x-0.5 ml-5">
                        <div><button className={`g-blue-500 ${ reservationType === "forEveryOne" ? "bg-yellow-700 text-white" : "bg-yellow-400" } font-bold py-2 px-4 rounded hover:bg-yellow-700 text-white text-xs md:text-base mb-0.5`} onClick={()=>adjustBelowList("forEveryOne")}> 공통 안내 사항 </button></div>
                        {/* <div><button className={`g-blue-500 ${ reservationType === "forEntireApt" ? "bg-yellow-700 text-white" : "bg-yellow-400" } font-bold py-2 px-4 rounded hover:bg-yellow-700 text-white text-xs md:text-base mb-0.5`} onClick={()=>adjustBelowList("forEntireApt")}> 머무름 전체 예약 </button></div> */}
                        <div><button className={`g-blue-500 ${ reservationType === "forRoom1" ? "bg-yellow-700 text-white" : "bg-yellow-400" } font-bold py-2 px-4 rounded hover:bg-yellow-700 text-white text-xs md:text-base mb-0.5`} onClick={()=>adjustBelowList("forRoom1")}> 1번방 예약 </button></div>
                        <div><button className={`g-blue-500 ${ reservationType === "forRoom2" ? "bg-yellow-700 text-white" : "bg-yellow-400" } font-bold py-2 px-4 rounded hover:bg-yellow-700 text-white text-xs md:text-base mb-0.5`} onClick={()=>adjustBelowList("forRoom2")}>2번방 예약</button></div>
                    </div>
                    <div className='mt-4'>
                        { reservationType === "forEveryOne"  && <ForEveryone />}
                        {/* { reservationType === "forEntireApt" && <ForEntireApt />} */}
                        { reservationType === "forRoom1"  && <ForRoom1 />}
                        { reservationType === "forRoom2"  && <ForRoom2 /> }
                    </div>
                </section>  
            </div>
        </div>
    )
}