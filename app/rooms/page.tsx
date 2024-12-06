"use client"

import { useState } from "react";
import { FilledBadge, OutlineBadge } from "../component/badge";
import { CenterClassName } from "../library/Consts";
import { RoomType } from "../library/Enums";

export default function Rooms() {

    const [galleryRoomType, setGalleryRoomType] = useState(RoomType.Room1);
    const [roomPhotoNum, setRoomPhotoNum] = useState(1);

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
        <div className="mt-5 py-5 rounded-md">
            <div className="w-full text-center text-xl font-bold">방 둘러보기</div>

            <div className={`flex space-x-2 mt-4 ${CenterClassName}`}>
                { galleryRoomType === RoomType.Room1 ? 
                    <FilledBadge cnProps="cursor-pointer" name={"1번방"} /> : 
                    <OutlineBadge onClickFunction={()=>setGalleryRoomType(RoomType.Room1)} cnProps="cursor-pointer" name={"1번방"} />}
                { galleryRoomType === RoomType.Room2 ? 
                <FilledBadge cnProps="cursor-pointer" name={"2번방"} /> 
                : <OutlineBadge onClickFunction={()=>setGalleryRoomType(RoomType.Room2)} cnProps="cursor-pointer" name={"2번방"} />}
            </div>

            <div className="relative overflow-x-auto mx-9 mt-4">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3"></th>
                            <th scope="col" className="px-6 py-3">단기거주</th>
                            <th scope="col" className="px-6 py-3">장기거주</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                보증금
                            </th>
                            <td>30만원</td>
                            <td>{ galleryRoomType === RoomType.Room1 ? "86만원" : "64만원" }</td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                사용료
                            </th>
                            <td>{ galleryRoomType === RoomType.Room1 ? "1주 15만원" : "1주 10만원" }</td>
                            <td>{ galleryRoomType === RoomType.Room1 ? "한달 43만원" : "한달 32만원" }</td>
                        </tr>

                    </tbody>
                </table>
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
    )
}