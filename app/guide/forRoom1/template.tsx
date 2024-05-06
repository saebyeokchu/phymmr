"use client"
import { useEffect, useState } from "react";

type AccordionBox = {
    noticeTitle : string,
    notices : string[], 
    noticeIndex : number, 
    imageSrc? : string
}

export default function ForRoom1() {
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

    const AccordionBox = ({noticeTitle,notices,noticeIndex,imageSrc} : AccordionBox ) =>
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
                </div>
            }
        </div>

    return (
        <>
            <AccordionBox
                noticeTitle = "1번방 사용 범위"
                notices= {[
                    "1번방은 사용범위의 베란다를 포함하고 있습니다.",
                    "베란다에도 도어락을 설치해 두었으니 편하게 창문을 여셔도 됩니다."
                ]}
                noticeIndex= {0}
                imageSrc={undefined}
            />
            <AccordionBox
                noticeTitle = "❌출입금지"
                notices= {[
                    "1호실 게스트는 주방 옆 펜트리 출입을 삼가해 주세요."
                ]}
                noticeIndex= {2}
                imageSrc={undefined}
            />
        </>
    )
}