"use client"

import React, { useState } from "react";
import Datepicker, { Period } from "react-tailwindcss-datepicker";
import moment from "moment";

import { AxiosResponse, RoomType } from "../data/Enums";
import {  Room1Image, Room1PriceChart } from "./rooms/bigRoom/page";
import { Room2Image, Room2PriceChart } from "./rooms/smallRoom/page";
import { checkIfDisabledDatesInlcuded, makeDateList } from "../logic/Room";
import { useRouter } from "next/navigation";
import { GetReservesData } from "../service/RoomService";
import { useRoomContext } from "@/context/RoomContext";
import { Badge } from "@/component/ui";
import Contact from "@/component/layout/contact";
import { CenterClassName, MateNum, OpenDate } from "@/data/Consts";

export default function Home() {
  const [roomType, setRoomType] = useState(RoomType.All);
  const [galleryRoomType, setGalleryRoomType] = useState(RoomType.Room1);
  const [availableStr, setAvailableStr] = useState([false, false]);
  const [disabledDates, setDisabledDates] = useState<any>(null);
  
  const [showSearchResult, setShowSearchResult] = useState(false);
  const [value, setValue] = useState({ 
    startDate: null, 
    endDate: null
  });

  const roomContext = useRoomContext();
  const router = useRouter();

  React.useEffect(() => {
    // getReserveList(RoomType.All);
    setReserveList();
  }, []);

  const setReserveList = async () => {
    const reserves = await GetReservesData();
    if(reserves){
      roomContext.reserveList = reserves;
      updateReserveList(reserves);
    }
  }

  const setDateValues = (newValue : any) => {

    if(newValue.startDate == null && newValue.endDate==null){
      return;
    }

    // const overlappedList = checkIfDisabledDatesInlcuded(newValue, disabledDates);

    //check minimum length
    const minLengthDays = 7; // Minimum length in days
    const diffInMs = newValue.endDate - newValue.startDate;
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    if (diffInDays < minLengthDays - 1) {
      window.alert("최소 계약일은 일주일입니다.");
      return;
    }

    // if(overlappedList.length > 0 ){
    //   window.alert("이미 예약된 날짜를 포함하였습니다.");
    //   return;
    // }

    setValue(newValue);
  }

  // const getReserveList = (roomType : RoomType) => {
  //   GetReserveList(roomType).then(response => {
  //     if(response.status == AxiosResponse.Sucessful){
  //       const dateList = makeDateList(response.data);
  //       setDisabledDates(dateList);
  //     }
  //   });
  // }

  const updateDisabledDates = (selectedRoomType : RoomType) => {
    setRoomType(selectedRoomType);

    if(selectedRoomType == RoomType.All){
      updateReserveList(roomContext.reserveList);
    }else{
      updateReserveList(roomContext.reserveList.filter(e=> e.roomType == selectedRoomType));

    }
  }

  const updateReserveList = ( reserveList : any[]) => {
    if(reserveList.length > 0){
      const dateList = makeDateList(reserveList);
      setDisabledDates(dateList);
    }
  }

  const onCheckAvailableClick = () => {
    const startDate = value.startDate;
    const endDate = value.endDate;
    
    if(!startDate || !endDate){
      window.alert("입실일과 퇴실일은 모두 선택하여 주세요")
    }else{
      //data setting
      const overlappedList = checkIfDisabledDatesInlcuded( value.startDate, value.endDate, disabledDates);
      let availalbe = [true, true];


      if(overlappedList.room1lap.length > 0){
        availalbe[0] = false;
      }

      if(overlappedList.room2lap.length > 0){
        availalbe[1] = false;
      }

      setAvailableStr(availalbe);
      setShowSearchResult(true);
    }

    return;
    console.log(value);
    setShowSearchResult(true);
  }

  const reset = () => {
    setShowSearchResult(false);
  }

  const onCheckInClicked = (checkinRoomType : RoomType) => {
    roomContext.requestedDate.startDate = value.startDate;
    roomContext.requestedDate.endDate = value.endDate;
    roomContext.roomType = checkinRoomType

    router.push("/book");
  }

  return (
    <>
      { showSearchResult && <div className="relative">
        <div
          id="modal"
          className="mx-2 hs-overlay fixed inset-0 z-50 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-black/50"></div>

          <div
            className="relative z-60 bg-white rounded-lg shadow-lg max-w-lg w-full p-6"
          >
            <h3 className="text-xl font-semibold">입실 정보</h3>
            <div className="mt-3">
              <small>
                <p>해당일에 입실 가능한 방을 알려드립니다.</p>
                <p className="mt-1"><strong>입실신청서</strong>를 작성하실 수 있습니다.</p>
              </small>
            </div>
            <div className="mt-2">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-200 ">
                    <tr>
                        <th scope="col" className="px-6 py-3"></th>
                        { (roomType == RoomType.Room1 || roomType == RoomType.All)  && <th scope="col" className="px-6 py-3">1번방</th> }
                        { (roomType == RoomType.Room2 || roomType == RoomType.All)  && <th scope="col" className="px-6 py-3">2번방</th> }
                    </tr>
                </thead>
                <tbody>
                    <tr className="bg-white border-b ">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                            입실여부
                        </th>
                        { (roomType == RoomType.Room1 || roomType == RoomType.All)  && ( 
                          availableStr[0] ? 
                            <td className="text-green-600 font-bold"><Badge.Filled onClickFunction={()=>onCheckInClicked(RoomType.Room1)} cnProps="cursor-pointer" name={"입실 신청하기"} /></td> : 
                            <td className="text-red-600 font-bold">불가능</td> ) }
                        { (roomType == RoomType.Room2 || roomType == RoomType.All)  && ( 
                          availableStr[1] ?
                            <td className="text-green-600 font-bold"><Badge.Filled onClickFunction={()=>onCheckInClicked(RoomType.Room2)} cnProps="cursor-pointer" name={"입실 신청하기"} /></td> : 
                            <td className="text-red-600 font-bold">불가능</td> ) }

                    </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-6 flex justify-end">
              <Badge.Filled name={"닫기"} onClickFunction={reset} cnProps="cursor-pointer" />
            </div>
          </div>
        </div>
      </div> }

      <div className="w-full bg-white mx-auto px-4 sm:px-6 lg:px-8">

        <div className="relative mt-3">
          <img className="w-full rounded-md h-60 object-cover" src="/shared/livingroom4.jpeg" alt="Hero Image" />
          <div className={`shadow-sm shadow-slate-400 w-full h-36 absolute top-48 bg-white rounded-md mx-auto p-3 flex flex-col space-y-3`}>
            <div className="w-full pl-3 pt-3 flex flex-col">
              <div className="text-xl font-bold">입실 가능일</div>
              <div className="flex flex-row space-x-1">
                {roomType == RoomType.All ? <Badge.Filled name="전체" cnProps="cursor-pointer"  /> : <Badge.Outline name="전체" cnProps="cursor-pointer" onClickFunction={()=>updateDisabledDates(RoomType.All)} />}
                {roomType == RoomType.Room1 ? <Badge.Filled name="큰방" cnProps="cursor-pointer" /> : <Badge.Outline name="큰방" cnProps="cursor-pointer" onClickFunction={()=>updateDisabledDates(RoomType.Room1)} />}
                {roomType == RoomType.Room2 ? <Badge.Filled name="작은방" cnProps="cursor-pointer" /> : <Badge.Outline name="작은방" cnProps="cursor-pointer" onClickFunction={()=>updateDisabledDates(RoomType.Room2)} />}
              </div>
            </div>
            
            <div className="flex flex-row justify-between gap-x-2 text-sm">
              <div> 
                <Datepicker 
                    i18n={"ko"}
                    primaryColor={"yellow"}
                    useRange={false}
                    value={value} 
                    onChange={newValue => setDateValues(newValue)}
                    inputClassName="border border-slate-400 py-2 pr-12 w-full rounded-md focus:ring-0"
                    disabledDates={disabledDates} 
                    minDate={new Date()} // Disable dates before today
                  // disabled
                /> 
              </div>
              <div>
                <button onClick={onCheckAvailableClick} type="button" className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-yellow-500 text-white hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600 disabled:opacity-50 disabled:pointer-events-none" >
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
                  <Badge.Filled cnProps="cursor-pointer" name={"1번방"} /> : 
                  <Badge.Outline onClickFunction={()=>setGalleryRoomType(RoomType.Room1)} cnProps="cursor-pointer" name={"1번방"} />}
              { galleryRoomType === RoomType.Room2 ? 
              <Badge.Filled cnProps="cursor-pointer" name={"2번방"} /> 
              : <Badge.Outline onClickFunction={()=>setGalleryRoomType(RoomType.Room2)} cnProps="cursor-pointer" name={"2번방"} />}
          </div>
          <div className="flex flex-col overflow-hidden">
            { galleryRoomType === RoomType.Room1 ? 
                <>
                  <Room1PriceChart />
                  <Room1Image />
                </> :
                <>
                  <Room2PriceChart />
                  <Room2Image />
                </>
            }
          </div>
        </div>
        {/* home fourth section */}
        <hr />
        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto ">
            <a className="group flex gap-y-6 size-full hover:bg-gray-100 focus:outline-none focus:bg-gray-100 rounded-lg p-5 " href="apply">
              <svg className="shrink-0 size-8 text-gray-800 mt-0.5 me-6 " xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/><path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7"/></svg>

              <div>
                <div>
                  <h3 className="block font-bold text-gray-800 ">입실절차</h3>
                  <p className="text-gray-600 ">100% 온라인으로 진행되는 입실절차를 알아보세요</p>
                </div>

                <p className="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold text-gray-800 ">
                  Learn more
                  <svg className="shrink-0 size-4 transition ease-in-out group-hover:translate-x-1 group-focus:translate-x-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                </p>
              </div>
            </a>
        </div>
        {/* home fifth section */}
      </div>
      
      <Contact />
    </>
    
  );
}
