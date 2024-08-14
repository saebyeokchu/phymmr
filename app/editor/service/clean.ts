import { useCanvasContext } from "../context";
import { ActionToolEnum, DragStateEnum, ImageUploadStatusEnum } from "../lib/constant/enums";
import { CanvasContextType } from "../lib/constant/types";

function cleanBlocks(guideRef : any){
    if(guideRef && guideRef.current){
        guideRef.current.innerHTML = '';
    }
}

function cleanActionZone(
    guideRef : any,
    backgroundImageDivRef : any,
    handleOnLoadFile: (imageData: any) => void,
    backgroundImageRef : any,
    canvasRef : any
){
    //step1. remove image import part
    if(backgroundImageDivRef && backgroundImageDivRef.current){
        backgroundImageDivRef.current.innerHTML = '';

        //create new image input
        const imageInputEle : HTMLInputElement  = document.createElement("input");
        imageInputEle.type = "file";
        imageInputEle.id = "img";
        imageInputEle.accept = "image/*";
        imageInputEle.onchange = handleOnLoadFile;

        backgroundImageDivRef.current.appendChild(imageInputEle);
    }

    //step2. clean canvas
    if(backgroundImageRef && backgroundImageRef.current){
        backgroundImageRef.current.src = null;
    }

    //step3. clean guide
    cleanBlocks(guideRef);

    //step4. clean canvas
    if(canvasRef && canvasRef.current){
        canvasRef.current.getContext("2d").clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }

}

//initialize refers
function cleanRefs(
    canvasContext : CanvasContextType, 
    currentColorRef : any,
    currentBlockLengthRef : any,
    currentDragStateRef : any,
    actionToolRef : any,
    currentImgLocXRef : any,
    currentImgLocYRef : any,
    paperLockStatRef : any
){
    canvasContext.setImageUploadState(ImageUploadStatusEnum.wait);
    currentColorRef.current.value = "black";
    currentBlockLengthRef.current.value = 10;
    currentDragStateRef.current.value= DragStateEnum.wait;
    actionToolRef.current.value= ActionToolEnum.draw;
    currentImgLocXRef.current.value=0;
    currentImgLocYRef.current.value=0;
    paperLockStatRef.current.value= paperLockStatRef.unlock;
}

export {
    cleanActionZone,
    cleanBlocks,
    cleanRefs
}