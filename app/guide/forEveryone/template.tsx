"use client"
import { useEffect, useState } from "react";

type AccordionBox = {
    noticeTitle : string,
    notices : string[], 
    noticeIndex : number, 
    imageSrc? : string
}

export default function ForEveryone() {
    const [showMenu, setShowMenu] = useState<boolean[]>([]);
    const menuNum : number =  11;

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
                noticeTitle = "이것만은 꼭 지켜주세요!"
                notices= {[
                    "머무름은 개별 방 예약시 공동으로 생활하는 쉐어하우스 입니다. 각방에 도어락이 설치되어 있습니다",
                    "화장실을 건식으로 사용중입니다. 샤워커튼을 이용해주세요.",
                    "❌ 절대 금연해주세요 흡연적발시 에어비앤비 패널티가 부과됩니다",
                    "보일러는 사용시 온돌모드로 설정 후 잠시 기다려 주세요. 따뜻한 물이 가장 잘 나옵니다 :)"
                ]}
                noticeIndex= {0}
            />
            <AccordionBox
                noticeTitle = "오시는 길"
                notices= {[
                    "버스이용시 학전행 305번에 탑승하시어 2정거장 이동 후 “대유아파트”에서 하차하시면 됩니다.(5분 소요)",
                    "도보 이용시 아래 약도를 참고해 이동하시면 빠르게 도착하실 수 있습니다"
                ]}
                noticeIndex= {9}
                imageSrc="map.png"
            />
            <AccordionBox
                noticeTitle = "짐보관과 얼리체크인"
                notices= {[
                    "객실 청소 여부에 따라 얼리 체크인이 가능합니다. 가능여부는 에어비앤비 메세지로 문의해주세요",
                    "체크인 당일, 체크아웃 당일 짐 보관이 가능합니다. 입구 행거 앞에 두시면 됩니다"
                ]}
                noticeIndex= {1}
            />
            <AccordionBox
                noticeTitle = "체크인 방법"
                notices= {[
                    "체크인은 카트키를 이용해 출입하실 수 있습니다.",
                    "현관문 기준 왼쪽 창문 안에 책 모양 금고를 꺼내 에어비앤비로 전송된 비밀번호를 입력해주세요.",
                    "해당하는 호실의 카드키를 이용해 머무시는 동안 출입하시면 됩니다"
                ]}
                noticeIndex= {2}
                imageSrc="keybox.jpg"
            />
            <AccordionBox
                noticeTitle = "체크아웃 방법"
                notices= {[
                    "체크아웃시 사용하신 수건은 머무신 방 책상위에 올려주세요",
                    "체크아웃시 사용하신 카드키는 머무신 방 책상위에 올려주세요",
                    "분리수거는 현관 앞에 모아주세요. 따로 정리하시지 않으셔도 됩니다"
                ]}
                noticeIndex= {3}
            />
            <AccordionBox
                noticeTitle = "무료조식"
                notices= {[
                    "게스트에게 무료 조식이 제공됩니다",
                    "오전 7시 ~ 오전10시 사이에 머무르시는 방 번호에 배정된 냉장고에서 꺼내드시면 됩니다",
                    "조식메뉴는 상시변경됩니다.(그릭요거트, 토스트, 샐러드, 계란후라이 등)"
                ]}
                noticeIndex= {4}
            />
            <AccordionBox
                noticeTitle = "편의용품"
                notices= {[
                    "수건은 하루에 2장 제공됩니다. 더 필요하시면 말씀해주세요."
                ]}
                noticeIndex= {5}
                imageSrc={undefined}
            />
            <AccordionBox
                noticeTitle = "거실 사용"
                notices= {[
                    "거실은 공용으로 사용하는 공간입니다."
                ]}
                noticeIndex= {6}
                imageSrc={undefined}
            />
            <AccordionBox
                noticeTitle = "화장실 사용"
                notices= {[
                    "포항역 머무름 하우스의 화장실은 최대 3인이 함께 사용하게 됩니다.",
                    "청결하게 유지하기 위해 건식으로 사용중이니 사용시 샤워커튼을 꼭 사용해 주세요."
                ]}
                noticeIndex= {7}
                imageSrc={undefined}
            />
            <AccordionBox
                noticeTitle = "빔 프로젝터 / 넷플릭스 / 유튜브 사용"
                notices= {[
                    "빔 프로젝터는 거실 고정된 자리에서 사용하실 수 있습니다.",
                    "빔 프로젝터 리모컨은 거실 동그란 탁자에서 확인하실 수 있습니다.",
                    "넷플릭스 계정은 “Pohang”을 사용해 주세요. 개인 계정을 사용하셔도 되며 사용후 로그아웃 부탁드립니다."
                ]}
                noticeIndex= {8}
                imageSrc={undefined}
            />
        </>
    )
}