"use client"
import { useEffect, useState } from "react";

type AccordionBox = {
    noticeTitle : string,
    notices : string[], 
    noticeIndex : number, 
    imageSrc? : string,
    video? : boolean
}

export default function ForRoom2() {
    const [showMenu, setShowMenu] = useState<boolean[]>([]);
    const menuNum : number =  3;

    useEffect(()=>{
        let initialShowMenuAry : boolean[] = []
        for (let index = 0; index < menuNum; index++) { initialShowMenuAry.push(false) }
    },[]);

    const onMenuClick = (index : number) => {
        showMenu[index] = !showMenu[index]
        setShowMenu({...showMenu})
    }

    const AccordionBox = ({noticeTitle,notices,noticeIndex,imageSrc,video} : AccordionBox ) =>
        <div>
            <h2 className="mb-0 hover:text-purple-600" id="flush-headingOne" onClick={()=>onMenuClick(noticeIndex)}>
            <button
                className="group relative flex w-full items-center rounded-none border-0 py-4 px-5 text-left text-base font-bold"
                type="button" >
                {noticeTitle}
            </button>
            <hr />
            </h2>
            {
                showMenu[noticeIndex] &&
                <div>
                    <ul className="list-disc  border-0 py-4 px-5 text-left text-base">
                        {
                            notices.map((notice, index)=><li key={`${noticeTitle}-${index}`}>{notice}</li>)
                        }
                    </ul>
                    { imageSrc && <img src={`https://phymmr.s3.us-east-2.amazonaws.com/${imageSrc}`} /> }
                    { video && <video width="400" controls autoPlay>
                            <source src={`https://phymmr.s3.us-east-2.amazonaws.com/turn_on_hotwater.mp4`} type="video/mp4" />
                        </video>
                    }
                </div>
            }
        </div>

    return (
        <>
            <AccordionBox
                noticeTitle = "❌출입금지"
                notices= {[
                    "2호실 게스트는 세탁실 출입시 협의된 시간을 준수하여 주시길 바랍니다"
                ]}
                noticeIndex= {2}
                imageSrc={undefined}
            />
        </>
    )
}