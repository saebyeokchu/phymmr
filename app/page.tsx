"use client"

import React from "react";
import TextTransition, { presets } from "react-text-transition";

const TEXTS = ['#넓직한', '#베란다가 있는', '#넉넉한 수납' ,'#짱 긴 책상', '#귀여운 노란 러그','#고급진 전신거울'];
const TEXTS2 = ['#작지만', '#알찬', '#넉넉한 수납' ,'#가성비 있는', '#분위기 있는 무두등','#고급진 전신거울'];


export default function Home() {
  const [index, setIndex] = React.useState(0);
  const [showFirstExtra,setShowFirstExtra] = React.useState<boolean>(false);
  const [showSecondExtra,setShowSecondExtra] = React.useState<boolean>(false);


  React.useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      3000, // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto flex flex-col max-w-7xl p-6 space-y-6 lg:px-8">
        <a href="/guide"><div className="m-2 p-10 sm:flex sm:justify-between text-white rounded-xl transition-all duration-500 bg-gradient-to-tl from-pink-500 via-red-500 to-yellow-400 bg-size-200 bg-pos-0 hover:bg-pos-100 hover:cursor-pointer">
          <div className="text-2xl p-3 font-extrabold">포항역 머무름 쉐어하우스 이렇게 사용해주세요</div>
          <div className="text-2xl p-3 font-medium">
            가이드 보러가기
          </div>
        </div></a>
        <a href="/inquiry"><div className="m-2 p-10 sm:flex sm:justify-between text-white rounded-xl transition-all duration-500 bg-gradient-to-tl from-pink-500 via-red-500 to-yellow-400 bg-size-200 bg-pos-0 hover:bg-pos-100 hover:cursor-pointer">
          <div className="text-2xl p-3 font-extrabold">포항역 머무름 쉐어하우스에서 지내보고 싶어요</div>
          <div className="text-2xl p-3 font-medium">
            단기숙박 / 장기숙박 문의하기
          </div>
        </div></a>
        <div > 
          <div className="font-extrabold text-2xl mt-20">포항역 머무름 쉐어하우스는</div>
          <div className="mt-10">
            <a href="#">
                <img className="w-full" src="https://phymmr.s3.us-east-2.amazonaws.com/room1-1.jpg" alt="Sunset in the mountains" />
            </a>
          </div>
          <div className="flex flex-col gap-y-10 text-right text-lg mt-10">
            <div >
                포항역 머무름 쉐어하우스는 여행을 시작하기전, 
            </div> 
            <div >여행에서 돌아가기전, 고요한 휴식이 필요할 때</div> 
            <div >잠시 머무르실 수 있는 곳입니다.</div> 
          </div>
        </div>
        <div className="h-20"></div>
        <div className="hover:border-2 shadow-lg p-5 cursor-pointer">
          <div>
            <div className="flex text-2xl font-semibold ">
              <div className="mt-1">☝️번방</div>
              <div
                className="bg-yellow-500 ml-2 p-1.5">
              <TextTransition springConfig={presets.wobbly} className="mb-1">{TEXTS[index % TEXTS.length]}</TextTransition>
              </div>
            </div>
            <div className="mt-3 flex space-x-2">
              <img className="w-1/2 rounded-full border-2 shadow-lg" src="https://phymmr.s3.us-east-2.amazonaws.com/romm1-2.jpg" alt="Sunset in the mountains" />
              <img className="w-1/2 rounded-full border-2 shadow-lg" src="https://phymmr.s3.us-east-2.amazonaws.com/room1-1.jpg" alt="Sunset in the mountains" />
            </div>
          </div>
          <div>
            <div className="text-center justify-center border-t-2 border-gray-400 pt-3 mt-5 mb-3 hover:text-lg" onClick={()=>setShowFirstExtra(!showFirstExtra)}>
              더보기
            </div>
            { showFirstExtra && 
            <div className="border-t-2">
              <div className="text-xl font-semibold mt-4 mb-2">공실현황</div>
              <div>👉 2025년 1월 ~ </div>
              <div className="text-xl font-semibold mt-4 mb-2">월 사용료</div>
              <div>👉 43만원(기본생필품 및 청소서비스 포함) </div>
              <div>👉 관리비 1/2 </div>
            </div>}
          </div>
        </div>
        <div className="h-20"></div>
        <div className="hover:border-2 shadow-lg p-5 cursor-pointer">
          <div>
            <div className="flex text-2xl font-semibold ">
              <div className="mt-1">✌️번방</div>
              <div
                className="bg-yellow-500 ml-2 p-1.5">
              <TextTransition springConfig={presets.wobbly} className="mb-1">{TEXTS2[index % TEXTS.length]}</TextTransition>
              </div>
            </div>
            <div className="mt-3 flex space-x-2">
              <img className="w-1/2 rounded-full border-2 shadow-lg" src="https://phymmr.s3.us-east-2.amazonaws.com/romm2-2.jpg" alt="Sunset in the mountains" />
              <img className="w-1/2 rounded-full border-2 shadow-lg" src="https://phymmr.s3.us-east-2.amazonaws.com/room2-1.jpg" alt="Sunset in the mountains" />
            </div>
          </div>
          <div>
            <div className="text-center justify-center border-t-2 border-gray-400 pt-3 mt-5 mb-3 hover:text-lg" onClick={()=>setShowSecondExtra(!showSecondExtra)}>
              더보기
            </div>
            { showSecondExtra && 
            <div className="border-t-2">
              <div className="text-xl font-semibold mt-4 mb-2">공실현황</div>
              <div>👉 2025년 1월 ~ </div>
              <div className="text-xl font-semibold mt-4 mb-2">월 사용료</div>
              <div>👉 28만원(기본생필품 및 청소서비스 포함) </div>
              <div>👉 관리비 1/2 </div>
            </div>}
          </div>
        </div>
        <div className="h-20"></div>
        <div className="flex flex-col justify-center text-center bg-yellow-500 rounded-3xl">
          <div className="font-semibold text-xl text-white pt-10"> 포항역 머무름 쉐어하우스 거실 </div>
          <div className="flex space-x-4">
          <div className="mt-10 mb-10 pl-5"> <img className="rounded-3xl" src="https://phymmr.s3.us-east-2.amazonaws.com/livingroom.jpg" /> </div>
          <div className="mt-10 mb-10 pr-5"> <img className="rounded-3xl" src="https://phymmr.s3.us-east-2.amazonaws.com/livingroom_sofa.jpg" /> </div>
          </div>
        </div>
        <div className="h-20"></div>
        <div className="flex flex-col justify-center text-center bg-yellow-500 rounded-3xl">
          <div className="font-semibold text-xl text-white pt-10"> 자유롭게 사용하실 수 있는 주방 </div>
          <div className="flex space-x-4">
          <div className="mt-7 mb-10 p-5"> <img className="rounded-3xl" src="https://phymmr.s3.us-east-2.amazonaws.com/hen.jpg" /> </div>
          </div>
        </div>
        <div className="h-20"></div>
      </div>
    </div>
  );
}
