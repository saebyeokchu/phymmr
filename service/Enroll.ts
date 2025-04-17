import axios from "axios";
import { EnrollApiAddress, RoomApiAddress } from "../app/_data/Consts";
import { Tenant } from "../type/RoomType";

export async function EnrollUser(newUser : Tenant){
    return await axios.post(`${EnrollApiAddress}/create-user/`,{ newUser : newUser});
}
