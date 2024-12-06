"use client"

import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import moment from "moment";

import { Badge, Modal } from "./component";
import { RoomType } from "./library/Enums";
import { CenterClassName, MateNum, OpenDate } from "./library/Consts";
import { FilledBadge, OutlineBadge } from "./component/badge";

export default function Home() {
  const [index, setIndex] = React.useState(0);
  const [showFirstExtra,setShowFirstExtra] = React.useState<boolean>(false);
  const [showSecondExtra,setShowSecondExtra] = React.useState<boolean>(false);

  const [roomType, setRoomType] = useState(RoomType.All);
  const [galleryRoomType, setGalleryRoomType] = useState(RoomType.Room1);
  const [roomPhotoNum, setRoomPhotoNum] = useState(1);
  
  const [showSearchResult, setShowSearchResult] = useState(false);
  const [checkDateHeight, setCheckDateHeight] = useState<number>(32);
  const [value, setValue] = useState({ 
    startDate: null, 
    endDate: null
  });

  React.useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      3000, // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);

  const onCheckAvailableClick = () => {
    console.log(value);
    setCheckDateHeight(45);
    setShowSearchResult(true);
  }

  const reset = () => {
    setCheckDateHeight(32);
    setShowSearchResult(false);
  }

  const nextRoomImg = ( event : any ) => {
    if(roomPhotoNum < 4){
      setRoomPhotoNum(roomPhotoNum + 1);
    }
  }

  const previousRoomImg  = ( event : any ) => {
    if(roomPhotoNum > 1){
      setRoomPhotoNum(roomPhotoNum - 1);
    }
  }

  return (
    <div className="w-full bg-white mx-auto px-4 sm:px-6 lg:px-8">
      {/* home first section */}
      <div className="text-sm bg-slate-100 p-4">
          실시간 예약 시스템 준비중
      </div>

      <div className="relative mt-3">
        <img className="w-full rounded-md h-60 object-cover" src="/shared/livingroom4.jpeg" alt="Hero Image" />
        <div className={`shadow-sm shadow-slate-400 w-full h-${checkDateHeight} absolute -bottom-24 bg-white rounded-md mx-auto p-3 flex flex-col space-y-3`}>
          <div className="w-full pl-3 pt-3 flex justify-between">
            <div className="text-xl font-bold">입실 가능일</div>
            <div className="flex flex-row space-x-1">
              <Badge.FilledBadge name="전체" cnProps="cursor-pointer" />
              <Badge.OutlineBadge name="1번방" cnProps="cursor-pointer" />
              <Badge.OutlineBadge name="2번방" cnProps="cursor-pointer" />
            </div>
          </div>
          
          <div className="flex flex-row justify-between gap-x-2 text-sm">
            <div>
              <Datepicker 
                  i18n={"ko"}
                  primaryColor={"yellow"}
                  useRange={false}
                  value={value} 
                  onChange={newValue => setValue(newValue)}
                  inputClassName="border border-slate-400 py-2 pr-12 w-full rounded-md focus:ring-0"
                  disabledDates={[
                    {
                        startDate: new Date("2024-10-25"),
                        endDate: new Date("2024-10-31")
                    }
                ]}
                disabled
              /> 
            </div>
            <div>
              <button onClick={onCheckAvailableClick} type="button" className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-yellow-500 text-white hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600 disabled:opacity-50 disabled:pointer-events-none" disabled>
                <svg 
                  fill="#ffffff" 
                  height="12px" 
                  width="12px" 
                  version="1.1" 
                  id="Capa_1" 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 488.4 488.4">
                  <g>
                    <g>
                      <path d="M0,203.25c0,112.1,91.2,203.2,203.2,203.2c51.6,0,98.8-19.4,134.7-51.2l129.5,129.5c2.4,2.4,5.5,3.6,8.7,3.6
                        s6.3-1.2,8.7-3.6c4.8-4.8,4.8-12.5,0-17.3l-129.6-129.5c31.8-35.9,51.2-83,51.2-134.7c0-112.1-91.2-203.2-203.2-203.2
                        S0,91.15,0,203.25z M381.9,203.25c0,98.5-80.2,178.7-178.7,178.7s-178.7-80.2-178.7-178.7s80.2-178.7,178.7-178.7
                        S381.9,104.65,381.9,203.25z"/>
                    </g>
                  </g>
                </svg>
              </button>
            </div>
          </div>

          { showSearchResult && <div className="w-full flex flex-col">
            <div>해당일에 가능한 방이 없습니다</div>
            <div className="text-sm text-blue-400 underline cursor-pointer" onClick={reset}>다른 요일 검색하기</div>
          </div> }
        </div>
      </div>
      {/* home second section */}
      <div className="mb-10 mt-32 border border-slate-400 rounded-md min-h-24 grid grid-cols-3 divide-x">
        <div className="h-fullw-full text-center pt-5">
            <span  className="text-sm">오픈</span>
            <h2 className="text-xl font-bold">{OpenDate.diff(moment(),'months') * -1}개월차</h2>
        </div>
        <div className="h-fullw-full text-center pt-5 justify-center">
          <div className="flex text-center justify-center items-center content-center place-items-center justify-items-center self-center place-content-center">
            <h1 className="text-2xl font-bold text-yellow-500">7</h1>
            <div className="text-sm">일 이상</div>
          </div>
          <div className="text-sm">계약 가능</div>
        </div>
        <div className="h-fullw-full text-center pt-5">
          <span  className="text-sm">다녀간 메이트님</span>
          <h2 className="text-xl font-bold">{MateNum}+</h2>
        </div>
      </div>
      {/* home third section */}
      <hr />
      <div className="mt-5 py-5 mb-5 rounded-md">
        <div className="w-full text-center text-xl font-bold">방 둘러보기</div>
        <div className={`flex space-x-2 mt-4 ${CenterClassName}`}>
            { galleryRoomType === RoomType.Room1 ? 
                <FilledBadge cnProps="cursor-pointer" name={"1번방"} /> : 
                <OutlineBadge onClickFunction={()=>setGalleryRoomType(RoomType.Room1)} cnProps="cursor-pointer" name={"1번방"} />}
            { galleryRoomType === RoomType.Room2 ? 
            <FilledBadge cnProps="cursor-pointer" name={"2번방"} /> 
            : <OutlineBadge onClickFunction={()=>setGalleryRoomType(RoomType.Room2)} cnProps="cursor-pointer" name={"2번방"} />}
        </div>
        <div className="flex overflow-hidden">
          {/* left arraow */}
          <div className="flex-none pt-40 cursor-pointer" onClick={previousRoomImg}>
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 19-7-7 7-7"/>
            </svg>
          </div>
          <div className={`mt-4 grow flex ${CenterClassName} `}>
            <img className="rounded-md object-cover h-96" src={`/room${galleryRoomType === RoomType.Room1? "1" : "2"}/full${roomPhotoNum}.jpg`} />
          </div>
          {/* right arraow */}
          <div className="flex-none pt-40  cursor-pointer" onClick={nextRoomImg}>
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7"/>
            </svg>
          </div>
        </div>
      </div>
      {/* home fourth section */}
      <hr />
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto ">
          <a className="group flex gap-y-6 size-full hover:bg-gray-100 focus:outline-none focus:bg-gray-100 rounded-lg p-5 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="apply">
            <svg className="shrink-0 size-8 text-gray-800 mt-0.5 me-6 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/><path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7"/></svg>

            <div>
              <div>
                <h3 className="block font-bold text-gray-800 dark:text-white">입실절차</h3>
                <p className="text-gray-600 dark:text-neutral-400">100% 온라인으로 진행되는 입실절차를 알아보세요</p>
              </div>

              <p className="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold text-gray-800 dark:text-neutral-200">
                Learn more
                <svg className="shrink-0 size-4 transition ease-in-out group-hover:translate-x-1 group-focus:translate-x-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </p>
            </div>
          </a>
      </div>
      {/* home fifth section */}
      <hr />
      <div >
      </div>
    </div>
  );
}
