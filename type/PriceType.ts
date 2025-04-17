import { RoomType } from "@/data/Enums"

export type Price = {
    id : number,
    roomType : RoomType,
    weekPrice : number,
    monthPrice : number,
    weekDeposit : number,
    monthDeposit : number,
    lastModifiedAt : Date
}