import { GetAllQna } from "./Setting";
import { AxiosResponse, RoomType } from "../data/Enums";

export async function GetQnaData(view : boolean){
    return await GetAllQna(view).then(response => {
        console.log("[GetQnaData]",response);
        if(response.status == AxiosResponse.Sucessful){
            return response.data
        }
    });
}

