"use client"

import React from "react";
import TextTransition, { presets } from "react-text-transition";
import { useRouter } from "next/navigation";

const TEXTS = ['#넓직한', '#베란다가 있는', '#넉넉한 수납' ,'#짱 긴 책상', '#귀여운 노란 러그','#고급진 전신거울'];
const TEXTS2 = ['#작지만', '#알찬', '#넉넉한 수납' ,'#가성비 있는', '#분위기 있는 무두등','#고급진 전신거울'];


export default function Home() {
  const [index, setIndex] = React.useState(0);
  const [showFirstExtra,setShowFirstExtra] = React.useState<boolean>(false);
  const [showSecondExtra,setShowSecondExtra] = React.useState<boolean>(false);

  const router = useRouter();


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
        {/* first click */}
        <div onClick={()=>router.push("/guide")} className="cursor-pointer w-72 h-72 text-center border border-slate-500 rounded-2xl self-center items-center justify-center content-center hover:scale-110">
          <p className="text-xl">포항역 머무름 쉐어하우스</p>
          <p className="font-bold text-2xl">가이드 보러가기</p>
        </div>
        <div onClick={()=>router.push("https://www.airbnb.co.kr/rooms/1107634995731255806?guests=1&adults=1&s=67&unique_share_id=ed51668b-f4f8-4f6e-8114-9dcda1df3f4d")} className="cursor-pointer w-72 h-72 text-center border border-slate-500 rounded-2xl self-center items-center justify-center content-center hover:scale-110">
          <p className="text-xl">포항역 머무름 쉐어하우스</p>
          <p className="font-bold text-2xl">방 구경하러 가기</p>
        </div>

        <div className="h-11"></div>

        <div className="bg-slate-300 p-6">
          <div>
            <span className="font-bold">포항역 쉐어하우스는</span> 
            <p className="text-sm">짧게 머무르고 싶지만 합리적이고 깨끗한 환경에서 거주하기 힘든 단기 여행자 분들을 위해 만들어 졌습니다</p>
          </div>
          <div className="mt-3">
            <img src=" https://phymmr.s3.us-east-2.amazonaws.com/room1-1.jpg" alt="Sunset in the mountains" className="rounded-3xl" />
          </div>
        </div>

        <div className="h-11"></div>

        <div className="p-6">
          <div className="text-2xl font-bold">방 타입</div>
          <div className="relative m-6">
            <div className="absolute right-0 top-0 m-3 text-white font-bold">외창이 있는 1번방</div>
            <img  className="rounded-lg" src="https://phymmr.s3.us-east-2.amazonaws.com/romm1-2.jpg" alt="Sunset in the mountains" />
          </div>
          <div className="grid grid-cols-2 text-center font-bold space">
              <div>#월 사용료 43만원</div>
              <div>#보증금 48만원</div>
              <div className="col-span-2">#주간요금 15만원(보증금 별도)</div>
            </div>
          <div >

          <div className="relative m-6">
            <div className="absolute right-0 top-0 m-3 text-white font-bold">내창 있는 2번방</div>
            <img  className="rounded-lg" src="https://phymmr.s3.us-east-2.amazonaws.com/room2-1.jpg" alt="Sunset in the mountains" />
          </div>
          <div className="grid grid-cols-2 text-center font-bold space">
              <div>#월 사용료 28만원</div>
              <div>#보증금 56만원</div>
              <div className="col-span-2">#주간요금 10만원(보증금 별도)</div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
