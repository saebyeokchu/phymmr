"use client"
import { useEffect, useState } from "react";


const AccordionBox = ({noticeTitle,notices,noticeIndex,onMenuClick,showAcoordion,imageSrc} : {noticeTitle : string, notices : string[], noticeIndex : number, onMenuClick : (index: number) => void, showAcoordion : boolean, imageSrc : string | undefined}) =>
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
                showAcoordion &&
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


const TestBox = () => <div>testbox</div>


export default function Guide() {
    const [showMenu, setShowMenu] = useState<boolean[]>([false,false,false,false,false,false,false,false,false,false]);

    useEffect(()=>{
    },[]);

    const onMenuClick = (index : number) => {
        showMenu[index] = !showMenu[index]
        setShowMenu({...showMenu})
    }

    return (
        <div className="bg-white">
            <div className="container my-24 mx-auto md:px-6 xl:px-24">
                <section className="mb-32">
                    <h2 className="mb-6 pl-6 text-3xl font-bold">포항역 머무름 사용설명서</h2>
                    <AccordionBox
                        noticeTitle = "이것만은 꼭 지켜주세요!"
                        notices= {[
                            "화장실 샤워시 미리 (최소 10분전) 보일러를 작동해 주세요. (2번방은 거실 아이패드 온도조절기 앱 이용)",
                            "화장실을 건식으로 사용중입니다. 샤워커튼을 이용해주세요.",
                            "❌ 절대 금연해주세요 흡연적발시 에어비앤비 패널티가 부과됩니다"
                        ]}
                        noticeIndex= {0}
                        onMenuClick= {onMenuClick}
                        showAcoordion= {showMenu[0]}
                        imageSrc={undefined}
                    />
                    <div>
                        <h2 className="mb-0 hover:text-purple-600" id="flush-headingOne" onClick={()=>onMenuClick(1)}>
                        <button
                            className="group relative flex w-full items-center rounded-none border-0 py-4 px-5 text-left text-base font-bold "
                            type="button" data-te-collapse-init data-te-target="#flush-collapseOne" aria-expanded="false"
                            aria-controls="flush-collapseOne">
                            오시는 길
                        </button>
                        </h2>
                        {
                            showMenu[1] &&
                            <ul className="list-disc  border-0 py-4 px-5 text-left text-base">
                                <li>버스이용시 학전행 305번에 탑승하시어 2정거장 이동 후 “대유아파트”에서 하차하시면 됩니다.(5분 소요)</li>
                                <li>아래 약도를 참고해 이동하시면 빠르게 도착하실 수 있습니다</li>
                                <img src="map.png" />
                            </ul>
                        }
                    </div>
                    <AccordionBox
                        noticeTitle = "체크인 방법"
                        notices= {[
                            "체크인은 카트키를 이용해 출입하실 수 있습니다.",
                            "현관문 기준 왼쪽 창문 안에 책 모양 금고를 꺼내 에어비앤비로 전송된 비밀번호를 입력해주세요.",
                            "해당하는 호실의 카드키를 이용해 머무시는 동안 출입하시면 됩니다"
                        ]}
                        noticeIndex= {9}
                        onMenuClick= {onMenuClick}
                        showAcoordion= {showMenu[9]}
                        imageSrc="keybox.jpg"
                    />
                    <div>
                        <h2 className="mb-0 hover:text-purple-600" id="flush-headingOne" onClick={()=>onMenuClick(2)}>
                        <button
                            className="group relative flex w-full items-center rounded-none border-0 py-4 px-5 text-left text-base font-bold "
                            type="button" data-te-collapse-init data-te-target="#flush-collapseOne" aria-expanded="false"
                            aria-controls="flush-collapseOne">
                            무료조식
                        </button>
                        </h2>
                        {
                            showMenu[2] &&
                            <ul className="list-disc  border-0 py-4 px-5 text-left text-base">
                                <li>무료 조식이 모든 게스트에게 제공됩니다.</li>
                                <li>냉장고에서 해당하는 오전 7시 ~ 10시 사이에 꺼내 드시면 됩니다.</li>
                                <li>조식메뉴는 상시변경됩니다.(그릭요거트, 토스트, 샐러드, 계란후라이 등)</li>
                            </ul>
                        }
                    </div>
                    <div>
                        <h2 className="mb-0 hover:text-purple-600" id="flush-headingOne" onClick={()=>onMenuClick(3)}>
                        <button
                            className="group relative flex w-full items-center rounded-none border-0 py-4 px-5 text-left text-base font-bold "
                            type="button" data-te-collapse-init data-te-target="#flush-collapseOne" aria-expanded="false"
                            aria-controls="flush-collapseOne">
                            보일러
                        </button>
                        </h2>
                        {
                            showMenu[3] &&
                            <ul className="list-disc  border-0 py-4 px-5 text-left text-base">
                                <li>에어비앤비 특징상 1번방에 보일러 온도 조절기가 위치하고 있습니다. <span className="text-red-500">2번방 게스트분께서는 거실에 있는 아이패드로 보일러 온도조절기를 작동시키실 수 있습니다.</span></li>
                                <li><strong>샤워하기전 넉넉히 보일러를 가동해 주세요.</strong> 샤워 10분전에는 보일러를 작동 시키기를 추천드립니다.</li>
                            </ul>
                        }
                    </div>
                    <div>
                        <h2 className="mb-0 hover:text-purple-600" id="flush-headingOne" onClick={()=>onMenuClick(4)}>
                        <button
                            className="group relative flex w-full items-center rounded-none border-0 py-4 px-5 text-left text-base font-bold "
                            type="button" aria-expanded="false">
                            편의용품
                        </button>
                        </h2>
                        {
                            showMenu[4] &&
                            <ul className="list-disc  border-0 py-4 px-5 text-left text-base">
                                <li>수건은 하루에 2장 제공됩니다. 더 필요하시면 말씀해주세요</li>
                            </ul>
                        }
                    </div>
                    <div>
                        <h2 className="mb-0 hover:text-purple-600" id="flush-headingOne" onClick={()=>onMenuClick(5)}>
                        <button
                            className="group relative flex w-full items-center rounded-none border-0 py-4 px-5 text-left text-base font-bold transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&:not([data-te-collapse-collapsed])]:text-primary-400"
                            type="button" data-te-collapse-init data-te-target="#flush-collapseOne" aria-expanded="false"
                            aria-controls="flush-collapseOne">
                            화장실 사용
                        </button>
                        </h2>
                        {
                            showMenu[5] &&
                            <ul className="list-disc  border-0 py-4 px-5 text-left text-base">
                                <li>포항역 머무름 하우스의 화장실은 최대 3인이 함께 사용하게 됩니다.</li>
                                <li>청결하게 유지하기 위해 건식으로 사용중이니 사용시 샤워커튼을 꼭 사용해 주세요.</li>
                            </ul>
                        }
                    </div>
                    <div>
                        <h2 className="mb-0 hover:text-purple-600" id="flush-headingOne" onClick={()=>onMenuClick(6)}>
                        <button
                            className="group relative flex w-full items-center rounded-none border-0 py-4 px-5 text-left text-base font-bold transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&:not([data-te-collapse-collapsed])]:text-primary-400"
                            type="button" data-te-collapse-init data-te-target="#flush-collapseOne" aria-expanded="false"
                            aria-controls="flush-collapseOne">
                            빔 프로젝터 / 넷플릭스 / 유튜브 사용
                        </button>
                        </h2>
                        {
                            showMenu[6] &&
                            <ul className="list-disc  border-0 py-4 px-5 text-left text-base">
                                <li>빔 프로젝터는 거실 고정된 자리에서 사용하실 수 있습니다.</li>
                                <li>빔 프로젝터 리모컨은 거실 동그란 탁자에서 확인하실 수 있습니다.</li>
                                <li>넷플릭스 계정은 “Pohang”을 사용해 주세요. 개인 계정을 사용하셔도 되며 사용후 로그아웃 부탁드립니다.</li>
                            </ul>
                        }
                    </div>
                    <AccordionBox
                        noticeTitle = "건조기/세탁기 사용"
                        notices= {[
                            "건조기와 세탁기는 베란다에 위치해 있습니다.",
                            "오전 11시 ~ 오후 8시 사이에 편하게 사용하시면 됩니다.",
                            "세제는 무료로 제공됩니다."
                        ]}
                        noticeIndex= {7}
                        onMenuClick= {onMenuClick}
                        showAcoordion= {showMenu[7]}
                        imageSrc={undefined}
                    />
                    <AccordionBox
                        noticeTitle = "❌출입금지"
                        notices= {[
                            "주방 옆 펜트리는 에어비앤비를 운영하기 위한 비품과 분리수거함이 위치하고 있습니다. 출입 삼가를 부탁 드립니다."
                        ]}
                        noticeIndex= {8}
                        onMenuClick= {onMenuClick}
                        showAcoordion= {showMenu[8]}
                        imageSrc={undefined}
                    />
                </section>  
            </div>
        </div>
    )
}