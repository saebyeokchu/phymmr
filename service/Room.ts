import axios from "axios";
import { RoomApiAddress } from "../app/_data/Consts";
import { RoomType } from "../data/Enums";
import { Reserve } from "../type/RoomType";

export async function GetPrices(){
    return await axios.get(`${RoomApiAddress}/get-prices/`);
}

export async function GetReserveList(roomType : RoomType){
    return await axios.get(`${RoomApiAddress}/get-reserve-list/?roomType=`+roomType);
}

export async function GetApprovedReserveList(){
    return await axios.get(`${RoomApiAddress}/get-approved-reserve-list/`);
}

export async function CreateReserveRequest( info : Reserve ){
    return await axios.post(`${RoomApiAddress}/create-reserve-request/`,{ info : info});
}