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
                            <source src={`https://phymmr.s3.us-east-2.amazonaws.com/turn_on_hotwater.MOV`} type="video/mp4" />
                        </video>
                    }
                </div>
            }
        </div>

    return (
        <>
            <AccordionBox
                noticeTitle = "보일러"
                notices= {[
                    "에어비앤비 특징상 1번방에 보일러 온도 조절기가 위치하고 있습니다. 2번방 게스트분께서는 호실에 비치된 아이패드를 이용해 보일러를 조절하실 수 있습니다."
                ]}
                noticeIndex= {0}
                imageSrc={undefined}
                video={true}
            />
            <AccordionBox
                noticeTitle = "세탁서비스"
                notices= {[
                    "2호실 세탁서비스는 연박손님에게 ⭐무료⭐로 제공됩니다.",
                    "방 안에 비치된 세탁바구니에 세탁물을 넣고 호스트에게 말씀해 주세요.",
                    "건조까지 하여 당일 오후 6시 이전에 전달드립니다"
                ]}
                noticeIndex= {1}
                imageSrc={undefined}
            />
            <AccordionBox
                noticeTitle = "❌출입금지"
                notices= {[
                    "2호실 게스트는 베란다와 주방 옆 펜트리 출입을 삼가해 주세요."
                ]}
                noticeIndex= {2}
                imageSrc={undefined}
            />
        </>
    )
}