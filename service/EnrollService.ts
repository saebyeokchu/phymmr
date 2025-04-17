import { EnrollUser } from "./Enroll";
import { CreateReserveRequest } from "./Room";
import { AxiosResponse } from "../data/Enums";
import { Reserve, Tenant } from "../type/RoomType"

//새로운 입실요청 등록하기
const requestEnroll = async (applyingUser : Tenant, priceInfo :any, reserveInfo : Reserve , signature:any) => {
    console.log(" :: START :: [requestEnroll] ")
    //add reserve list
    const createReserveInfo = await CreateReserveRequest(reserveInfo).then(response => {
        console.log("CreateReserveRequest",response)
        if(response.status == AxiosResponse.Sucessful){
        }
    });
    return;

    //add teanat
    const enrolluser = await EnrollUser(applyingUser).then(response => {
        if(response.status == AxiosResponse.Sucessful){
          return response.data;
        }
    });;

    //upload signature

    //check if all uploaded if not delete the previous results
}

export {
    requestEnroll
}