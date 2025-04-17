import { RoomType } from '@/data/Enums'
import Image from 'next/image'

const RoomTypeList =({
    name,
    people,
    size,
    note,
    imgUrl,
    imgAlt,
    isSelected,
    onClickFunction
    }:{
        name : string,
        people : number,
        size : number,
        note : string,
        imgUrl : string,
        imgAlt : string,
        isSelected : boolean,
        onClickFunction : any
}) => <div onClick={onClickFunction} className={`${isSelected && 'bg-slate-200'} mt-2 grid grid-cols-3 grid-flow-col border rounded-xl cursor-pointer hover:bg-slate-200`}>
    {/* 사진 */}
        <div className="col-span-1 relative h-32">
            <Image
                style={{objectFit: "cover"}} 
                src={imgUrl} 
                alt={imgAlt} 
                className="rounded-l-xl"
                fill  />
        </div>
        <div className="p-3 flex flex-col col-span-2">
            {/* 일번방 */} 
            <div className="text-lg font-bold">
                {name}
            </div>
            {/* 크기 / 명수  */}
            <div className="text-xs text-slate-400">
                {people}명 / {size}평
            </div>
            <div className="text-xs mt-2">
                {note}
            </div>
            {/* 특징 */}
        </div>
    </div>

export default function RoomList({
    roomType,
    setRequestedRoomType
}:{
    roomType : RoomType,
    setRequestedRoomType : any
}){
    return (
        <>
            <RoomTypeList 
                name={"1번방"} 
                people={1} 
                size={4} 
                note={"머무름 포항역점 내에서 큰방에 해당하는 방으로 베란다와 연결되어 있는 창입니다."} 
                imgUrl={"/room1/full2.jpg"} 
                imgAlt={"room-info-book-1"}
                isSelected={roomType == RoomType.Room1}
                onClickFunction={()=>setRequestedRoomType(RoomType.Room1)}                    
            />
            <RoomTypeList 
                name={"2번방"} 
                people={1} 
                size={2} 
                note={"작지만 알찬 수납을 자랑하는 방으로 세탁시 정해진 시간에 세탁실에 출입해야 합니다."} 
                imgUrl={"/room2/full2.jpg"} 
                imgAlt={"room-info-book-2"} 
                isSelected={roomType == RoomType.Room2}
                onClickFunction={()=>setRequestedRoomType(RoomType.Room2)}                          
            />
        </>
    )
}