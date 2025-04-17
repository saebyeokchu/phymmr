import { Period } from "../type/RoomType"


//2025-1-11 2025-2-10
const SmallRoomReserveList: Period[] = [
    {
        startDate : new Date('2025-1-11'),
        endDate : new Date('2025-2-10'),
    }
]

//2025-1-14 2025-2-3
const BigRoomReserveList: Period[] = [
    {
        startDate : new Date('2025-1-14'),
        endDate : new Date('2025-2-3'),
    }
]

//2025-1-14 2025-2-3
const WholeReserveList: Period[] = [
    {
        startDate : new Date('2025-4-22'),
        endDate : new Date('2025-4-28'),
    }
]

export {
    SmallRoomReserveList,
    BigRoomReserveList,
    WholeReserveList
}