import { GetApprovedReserveList, GetPrices, GetReserveList } from "./Room";
import { AxiosResponse, RoomType } from "../data/Enums";

export async function GetPricesData(){
    return await GetPrices().then(response => {
        if(response.status == AxiosResponse.Sucessful){
            return response.data
        }
    });
}

export async function GetReservesData() {
    return await GetReserveList(RoomType.All).then(response => {
        if(response.status == AxiosResponse.Sucessful){
          return response.data;
        }
    });
}

export async function GetApprovedReserveData() {
    return await GetApprovedReserveList().then(response => {
        if(response.status == AxiosResponse.Sucessful){
          return response.data;
        }
    });
}