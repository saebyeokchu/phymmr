"use client"

import { Contact } from "@/component/layout";
import { Badge } from "@/component/ui";
import { CenterClassName } from "@/data/Consts";
import { RoomType } from "@/data/Enums";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Wrapper({
    children,
    roomType
  }: Readonly<{
    children: React.ReactNode;
    roomType : RoomType;
  }>) {

    const [galleryRoomType, setGalleryRoomType] = useState(roomType);
    const router = useRouter();

    const goToRoom = (rt : RoomType) => {
        if(rt == RoomType.Room1){
            router.push("/rooms/bigRoom");
        }else{
            router.push("/rooms/smallRoom");
        } 

    }

    return (
        <div className="mt-5 py-5 rounded-md">
            <div className="w-full text-center text-xl font-bold">방 둘러보기</div>

            <div className={`flex space-x-2 mt-4 ${CenterClassName}`}>
                { galleryRoomType === RoomType.Room1 ? 
                    <Badge.Filled cnProps="cursor-pointer" name={"1번방"} /> : 
                    <Badge.Outline onClickFunction={() => goToRoom(RoomType.Room1)} cnProps="cursor-pointer" name={"1번방"} />}
                { galleryRoomType === RoomType.Room2 ? 
                <Badge.Filled cnProps="cursor-pointer" name={"2번방"} /> 
                : <Badge.Outline onClickFunction={() => goToRoom(RoomType.Room2)} cnProps="cursor-pointer" name={"2번방"} />}
            </div>

            {children}

            <Contact />
        </div>
    )
}