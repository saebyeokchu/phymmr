
import { useAlterContext } from "../context/AlterContext";

function turnOnAlter(alter : any, message : string) {
    alter.setMessage(message);
    alter.setTurnAlter(true);
    setTimeout(()=>alter.setTurnAlter(false),3000);
}

export {
    turnOnAlter
}