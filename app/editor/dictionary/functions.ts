
import { useAlterContext } from "../context/AlterContext";
import { predefinedColors } from "./variables";

function turnOnAlter(alter : any, message : string) {
    alter.setMessage(message);
    alter.setTurnAlter(true);
    setTimeout(()=>alter.setTurnAlter(false),3000);
}

function testDrawEvent(target : any){
    const tempTest = (event : MouseEvent) => console.log(event.type,event.clientX, event.clientY);
    target.addEventListener("dragstart",tempTest)
    target.addEventListener("dragover",tempTest)
    target.addEventListener("dragend",tempTest)
    target.addEventListener("drop",tempTest)
    target.addEventListener("dragleave",tempTest)
    target.addEventListener("dragenter",tempTest)
}

function getColorHexByName(name : string){
    let answer : string = "";

    predefinedColors.map(colors=>colors.map(color=>{
        if(color.name===name){
            answer = color.hex;
        }
    }));

    return answer
}

export {
    turnOnAlter,
    getColorHexByName
}