import axios from "axios";
import { MmrsetApiAddress } from "../app/_data/Consts";

export async function GetAllQna(view : boolean){
    return await axios.get(`${MmrsetApiAddress}/get-all-qna/?view=`+ ( view ? 1 : 0 ));
}

