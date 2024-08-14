
import { predefinedFrames } from "../constant/variables";

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

function calculateBackgorundSize(selectedFrameName : string){
    let selectedFrame = predefinedFrames[selectedFrameName ];

    // console.log("calculateBackgroundSize", selectedFrame);

    if(selectedFrame){
        //화면 비율에 따른 가로 세로 그림판 전체 크기 구하기
        let width : number = window.innerWidth * ( 3 / 5 );

        //높이는 A4로 고정하자
        let height : number = width * ( selectedFrame.height / selectedFrame.width );

        while(height > window.innerHeight - 150){
            height = width * ( selectedFrame.height / selectedFrame.width );
            width -= 10; //너무 많이 초과하면
        }

        //console.log("[width, height] : [", drawingBackgroundWidth, ",",drawingBackgroundHeight,"]");

        return [width, height];
    }

    return [-1, -1];

}

export {
    turnOnAlter,
    testDrawEvent,
    calculateBackgorundSize
}