import { PriceType, RoomType, Sex } from "../data/Enums";

export type Tenant = {
    name : string,
    sex : Sex,
    age : number
    phoneNumber : string,
    address : string,
    accountNumber : string
}


export type Reserve = {
    id : number | null,
    roomType : RoomType,
    priceType : PriceType,
    price : number,
    deposit : number,
    startDate : Date,
    endDate : Date,
    lastModifiedAt : Date,
    approved : boolean
}

export type Qna = {
    id? : number,
    question : string ,
    answer : string ,
    view? : boolean,
    sortOrder : number,
    lastModifiedAt? : Date
}
