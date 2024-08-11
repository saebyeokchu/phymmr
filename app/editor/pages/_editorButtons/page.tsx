import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

import { ColorPalette } from "../component";

import { useCanvasContext, useDragContext } from "../../context";

import { color, ImageUploadStatusEnum } from "../../dictionary/types";
import { DropDown, MyButton } from "../../dictionary/templates";
import { bizs, predefinedFrames } from "../../dictionary/variables";

export default function EditorButtons({
    canvasRef,
    currentColorRef,
    currentBlockLengthRef,
    backgroundImageRef,
    imgRef,
    setSelectedColorName,
    createGuideline,
    reset,
    automaticDrawing,
    removeBlocks,
    actionToolRef,
    moveImageOnCanvasRef,
    currentImgLocXRef,
    currentImgLocYRef,
    drawnBlockCountRef,
    currentFrameNameRef
} : {
    canvasRef : any,
    currentColorRef : any,
    currentBlockLengthRef : any,
    backgroundImageRef : any,
    imgRef : any,
    setSelectedColorName : Dispatch<SetStateAction<string>>,
    createGuideline:() => void,
    reset : () => void,
    automaticDrawing : () => void,
    removeBlocks : () => void,
    actionToolRef:any,
    moveImageOnCanvasRef : any,
    currentImgLocXRef  : any,
    currentImgLocYRef  : any,
    drawnBlockCountRef : any,
    currentFrameNameRef : any
}){

    const canvasContext = useCanvasContext();
    const dragContext = useDragContext();

    const importImageByOriginalRatioRef : any = useRef(undefined);
    
    const [ hideImageOnCanvas, setHideImageOnCanvas ] : [ boolean, Dispatch<SetStateAction<boolean>> ] = useState<boolean>(false);
    const [ imageSizeRangeValue, setImageSizeRangeValue ] : [ number, Dispatch<SetStateAction<number>> ] = useState<number>(50);
    const [ moveImageOnCanvasBtnNm, setMoveImageOnCanvasBtnNm ] : [ string, Dispatch<SetStateAction<string>> ] = useState<string>("이미지 위치 조정하기");
    
    const canvasMouseMoveEvent = (event : any) => {
        // console.log("canvas drag over",event)

        let currentImgLocY : number = parseInt(currentImgLocYRef.current.value);
        let currentImgLocX : number = parseInt(currentImgLocXRef.current.value);
        let ctx = canvasRef.current.getContext("2d");

        const imgWidth : number = imgRef.current.style.width.replace("px","");
        const imgHeight : number = imgRef.current.style.height.replace("px","");

        currentImgLocXRef.current.value = event.offsetX - imgWidth/2;
        currentImgLocYRef.current.value = event.offsetY - imgHeight/2;

        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.drawImage(imgRef.current,currentImgLocX,currentImgLocY,imgWidth,imgHeight);

    };

    useEffect(()=>{
        // canvasRef.current.addEventListener("mousedown",(event : any)=> {
        //     if(moveImageOnCanvasRef.current.value != "lock"){
        //         return;
        //     }

        //     console.log("mousedown",event)
        //     mouseDownY1Ref.current.value = event.clientY;
        //     mouseDownX1Ref.current.value = event.clientX;
        // });
        // // canvasRef.current.addEventListener("mouseup",(event : any)=> {
        // //     if(moveImageOnCanvasRef.current.value != "lock"){
        // //         return;
        // //     }
            

        // //     console.log("mouseup",event);
        // //     mouseDownY2Ref.current.value = event.clientY;
        // //     mouseDownX2Ref.current.value = event.clientX;

        // //     const leftDiff : number = parseInt(mouseDownX2Ref.current.value) - parseInt(mouseDownX1Ref.current.value);
        // //     const topDiff : number = parseInt(mouseDownY2Ref.current.value) - parseInt(mouseDownY1Ref.current.value);

        // //     let currentImgLocY : number = parseInt(currentImgLocYRef.current.value);
        // //     let currentImgLocX : number = parseInt(currentImgLocXRef.current.value);

        // //     let ctx = canvasRef.current.getContext("2d");

        // //     const imgWidth : number = imgRef.current.style.width.replace("px","");
        // //     const imgHeight : number = imgRef.current.style.height.replace("px","");

        
    
        // //     currentImgLocY =  currentImgLocY+topDiff;
        // //     currentImgLocX =  currentImgLocX+leftDiff;
    
        // //     ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        // //     ctx.drawImage(imgRef.current,currentImgLocX,currentImgLocY,imgWidth,imgHeight);
        // //     console.log("check 0", currentImgLocY, currentImgLocY);
        // //     console.log("check 1", leftDiff, topDiff);
        // //     console.log("check 2", currentImgLocY+topDiff, currentImgLocX+leftDiff);
        // //     console.log("check 3", imgWidth, imgHeight);
        // //     console.log("check 4", currentImgLocX,currentImgLocY,imgWidth,imgHeight); 

        // // });
        // canvasRef.current.addEventListener("mousemove",canvasMouseMoveEvent)

        // imageSizeCanvasRef.current.addEventListener("mousedown",(event : any)=> {
        //     console.log("mousedown",event)
        // });
        // imageSizeCanvasRef.current.addEventListener("mouseup",(event : any)=> {
        //     console.log("mouseup",event)
        // });
    },[])

    const handleOnClickColor = (color : color) => {
        setSelectedColorName(color.name);
        currentColorRef.current.value=color.name;
    }

    const handleBlockSizeDropdownClick = (value : any) => {
        if(window.confirm("비즈크기를 조정하면 현재 저장된 데이터가 모두 삭제됩니다. 진행하시겠습니까?")){
            const delay : number = currentBlockLengthRef.current.value;
            currentBlockLengthRef.current.value = value;
            canvasContext.setBlockLength(value);
            reset();
            currentBlockLengthRef.current.value = value;
            setTimeout(()=>window.localStorage.removeItem("bizTempSave"),1000);
            return true;
        }
        return false;
    }

    const handleFrameSizeDropdownClick = (value : any) => {
        if(window.confirm("용지 크기를 조정하면 현재 저장된 데이터가 모두 삭제됩니다. 진행하시겠습니까?")){
            currentFrameNameRef.current.value = value;
            reset();
            currentFrameNameRef.current.value = value;
            setTimeout(()=>window.localStorage.removeItem("bizTempSave"),1000);
            return true;
        }
        return false;
    }
    
    //image upload to S3 AWS Server
    const handleOnLoadFile = ( imageData : any ) => { 

        if(canvasRef.current != null){
            console.log("[handleOnLoadFile]");

            const ctx = canvasRef.current.getContext("2d");

            canvasContext.setImageUploadState(ImageUploadStatusEnum.uploading);
            const delay : number = currentBlockLengthRef.current.value;
            reset();
            currentBlockLengthRef.current.value = delay;
    
            //draw backgorund 
            imgRef.current.src = URL.createObjectURL(imageData.target.files[0]);
    
            imgRef.current.onload = function () {
                // console.log(imgRef, imgRef.current.offsetHeight, imgRef.current.height, imageData.target.files[0], imageData.target);

                if(importImageByOriginalRatioRef.current.checked){
                    ctx.drawImage(imgRef.current,0,0,imgRef.current.naturalWidth,imgRef.current.naturalHeight,0,0, canvasRef.current.width, canvasRef.current.height); 
                }else{
                    ctx.drawImage(imgRef.current,currentImgLocXRef.current.value,currentImgLocYRef.current.value,imgRef.current.naturalWidth,imgRef.current.naturalHeight);
                }
                automaticDrawing();
                canvasContext.setImageUploadState(ImageUploadStatusEnum.uploaded);
                imgRef.current.style.width = imgRef.current.naturalWidth + "px";
                imgRef.current.style.height = imgRef.current.naturalHeight + "px";
            }
            // img.naturalWidth,img.naturalHeight
        }
    }

    const handleOnResetClick = () => {
        //이미지 input 부분 없애고 다시 만들기
        if(backgroundImageRef.current){
            backgroundImageRef.current.removeChild(backgroundImageRef.current.children[0])
            backgroundImageRef.current.innerHTML = '';

            const imageInputEle : HTMLInputElement  = document.createElement("input");
            imageInputEle.type = "file";
            imageInputEle.id = "img";
            imageInputEle.accept = "image/*";
            imageInputEle.onchange = handleOnLoadFile;

            backgroundImageRef.current.appendChild(imageInputEle);
        }

        canvasContext.setImageUploadState(ImageUploadStatusEnum.wait);

        reset();
    }

    const handleOnSliderChange = (rangeEvent : any) => {
        let rangeValue : number = parseInt(rangeEvent.target.value);

        let newWidth : number = imgRef.current.width * ((rangeValue * 2 / 100));
        let newHeight : number = imgRef.current.height * ((rangeValue * 2 / 100));

        setImageSizeRangeValue(rangeEvent.target.value);
        console.log("[handleOnSliderChange]");

        imgRef.current.style.width = newWidth + "px";
        imgRef.current.style.height = newHeight + "px";

        // console.log(imgRef.current.style.height,imgRef.current.style.width)

        const canvas = canvasRef.current;
        var ctx = canvas.getContext("2d");
        // ctx.clearRect(currentImgLocXRef.current.value,currentImgLocYRef.current.value, canvasRef.current.width, canvasRef.current.height);
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        // canvas.width = newWidth;
        // canvas.height = newHeight;
        ctx.drawImage(imgRef.current,currentImgLocXRef.current.value,currentImgLocYRef.current.value,imgRef.current.style.width.replace("px",""),imgRef.current.style.height.replace("px",""));
    }

    function hideCanvasDrawing(){
        if(!hideImageOnCanvas){
            canvasRef.current.classList.add("hidden");
        }else{
            canvasRef.current.classList.remove("hidden");
        }

        setHideImageOnCanvas(!hideImageOnCanvas);
    }


    const mouseUpEvent = (event : any)=> {
        console.log("mouse up");
        canvasRef.current.removeEventListener("mousemove",canvasMouseMoveEvent);
    };

    const mouseDownEvent = (event : any)=> {
        console.log("mouse down")
        canvasRef.current.addEventListener("mousemove",canvasMouseMoveEvent);
    }

    const keyDownEvent = (event: any)=>{
        event.preventDefault();
        console.log(event)
        switch(event.key){
            case "ArrowUp" :
                handleMoveImageUpButtonClick();
                break;
            case "ArrowDown" :
                handleMoveImageDownButtonClick();
                break;
            case "ArrowLeft" :
                handleMoveImageLeftButtonClick();
                break;
            case "ArrowRight" :
                handleMoveImageRightButtonClick();
                break;
        }
    }

    function onMoveImgBtnClick() {
        console.log("[onMoveImgBtnClick]",  moveImageOnCanvasRef.current.value === "move" );

        //temp
        console.log(canvasRef);
        if(moveImageOnCanvasRef.current.value === "move" ){
            canvasRef.current.style.zIndex = 20;
            canvasRef.current.addEventListener("mouseup",mouseUpEvent);
            canvasRef.current.addEventListener("mousedown",mouseDownEvent);
            document.addEventListener("keydown",keyDownEvent);
        }else{
            canvasRef.current.style.zIndex = 0;
            canvasRef.current.removeEventListener("mouseup",mouseUpEvent);
            canvasRef.current.removeEventListener("mousedown",mouseDownEvent);
            document.removeEventListener("keydown",keyDownEvent);
        }
        
        //canvas말고 다른거 disable
        moveImageOnCanvasRef.current.value = moveImageOnCanvasRef.current.value === "move" ? "lock" : "move";
        setMoveImageOnCanvasBtnNm( moveImageOnCanvasRef.current.value === "move" ? "이미지 위치 조정하기" : "이미지 위치 조정 완료")
    }

    function handleMoveImageUpButtonClick() {
        console.log("[handleMoveImageUpButtonClick]")
        var ctx = canvasRef.current.getContext("2d");
        
        const imgWidth : number = imgRef.current.style.width.replace("px","");
        const imgHeight : number = imgRef.current.style.height.replace("px","");

        let currentImgLocY : number = parseInt(currentImgLocYRef.current.value);
        let currentImgLocX : number = parseInt(currentImgLocXRef.current.value);

        currentImgLocYRef.current.value = currentImgLocY - 1;

        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.drawImage(imgRef.current,currentImgLocX,currentImgLocY,imgWidth,imgHeight);
    }

    function handleMoveImageDownButtonClick() {
        console.log("[handleMoveImageDownButtonClick]")
        var ctx = canvasRef.current.getContext("2d");
        
        const imgWidth : number = imgRef.current.style.width.replace("px","");
        const imgHeight : number = imgRef.current.style.height.replace("px","");
        let currentImgLocY : number = parseInt(currentImgLocYRef.current.value);
        let currentImgLocX : number = parseInt(currentImgLocXRef.current.value);

        currentImgLocYRef.current.value = currentImgLocY + 1;

        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.drawImage(imgRef.current,currentImgLocX,currentImgLocY,imgWidth,imgHeight);
    }

    function handleMoveImageRightButtonClick() {
        console.log("[handleMoveImageRightButtonClick]")
        var ctx = canvasRef.current.getContext("2d");
        
        const imgWidth : number = imgRef.current.style.width.replace("px","");
        const imgHeight : number = imgRef.current.style.height.replace("px","");
        let currentImgLocY : number = parseInt(currentImgLocYRef.current.value);
        let currentImgLocX : number = parseInt(currentImgLocXRef.current.value);

        currentImgLocXRef.current.value = currentImgLocX + 1;

        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.drawImage(imgRef.current,currentImgLocX,currentImgLocY,imgWidth,imgHeight);
    }

    function handleMoveImageLeftButtonClick() {
        console.log("[handleMoveImageLeftButtonClick]")
        var ctx = canvasRef.current.getContext("2d");
        
        const imgWidth : number = imgRef.current.style.width.replace("px","");
        const imgHeight : number = imgRef.current.style.height.replace("px","");
        let currentImgLocY : number = parseInt(currentImgLocYRef.current.value);
        let currentImgLocX : number = parseInt(currentImgLocXRef.current.value);

        currentImgLocXRef.current.value = currentImgLocX - 1;


        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.drawImage(imgRef.current,currentImgLocX,currentImgLocY,imgWidth,imgHeight);
    }

    function resetImgLoc() {
        console.log("[resetImgLoc]")
        var ctx = canvasRef.current.getContext("2d");
        
        const imgWidth : number = imgRef.current.style.width.replace("px","");
        const imgHeight : number = imgRef.current.style.height.replace("px","");

        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.drawImage(imgRef.current,0,0,imgWidth,imgHeight);
        currentImgLocXRef.current.value = 0;
        currentImgLocYRef.current.value = 0;
    }

    function handleOnGenerateBlockClick(){
        canvasContext.setImageUploadState(ImageUploadStatusEnum.uploading);
        automaticDrawing();
        canvasContext.setImageUploadState(ImageUploadStatusEnum.uploaded);
    }

    return (
        // <div className="grow flex flex-col h-full p-6 border border-slate-500">
        <>
            <div className="flex flex-col">
                <div className="flex flex-row">
                    <MyButton onClickFunction={()=>{ canvasContext.setActionTool("draw"); actionToolRef.current.value="draw"; }} buttonName="그리기"/>
                    <MyButton onClickFunction={()=>{ canvasContext.setActionTool("erase");  actionToolRef.current.value="erase"; }}buttonName="지우기"/>
                </div>

                { canvasContext.actionTool === "draw" && <ColorPalette handleOnClickColor={handleOnClickColor} currentColorRef={currentColorRef} /> }
            </div>
            
            <hr style={{marginTop:"10px"}}/>
            <div>
                <label>이미지</label>
                <div ref={backgroundImageRef}  >
                    <input type="file" id="img" name="img" accept="image/*" onChange={handleOnLoadFile} />
                </div>
                <input type="checkbox" ref={importImageByOriginalRatioRef}/>
                <label htmlFor="horns">이미지 꽉차게 불러오기</label>
                <img ref={imgRef} className="hidden" alt="Background Image ..." />
            </div>
            
            { canvasContext.imageUploadState === ImageUploadStatusEnum.uploaded && importImageByOriginalRatioRef.current.checked === false && <>
                <hr style={{marginTop:"10px"}}/>
                <div>
                    <label>이미지 크기 </label>
                    <input id="default-range" type="range" value={imageSizeRangeValue} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" onChange={handleOnSliderChange}/>
                </div>
                <hr style={{marginTop:"10px"}}/>
                <MyButton buttonName={`${moveImageOnCanvasBtnNm}`} onClickFunction={onMoveImgBtnClick} />
                {moveImageOnCanvasBtnNm.search("완료") > -1 && <div>
                    <MyButton buttonName="이미지 원점으로" onClickFunction={resetImgLoc} />
                    <small>이미지를 클릭하여 움직일 수 있습니다</small>
                    <small>키보드를 이용하여 움직일 수 있습니다</small>
                </div>}
                {/* <hr style={{marginTop:"10px"}}/> 
                <div>
                    <label>이미지 위치 조정</label>
                    <MyButton buttonName="위" onClickFunction={handleMoveImageUpButtonClick} />
                    <MyButton buttonName="아래" onClickFunction={handleMoveImageDownButtonClick} />
                    <MyButton buttonName="오른쪽" onClickFunction={handleMoveImageRightButtonClick} />
                    <MyButton buttonName="왼쪽" onClickFunction={handleMoveImageLeftButtonClick} />

                </div> */}
            </>}

            <hr style={{marginTop:"10px"}}/>
            <div  style={{marginTop:"10px"}}> 
                <DropDown dropdownTitle="용지 설정" dropdownClickAction={handleFrameSizeDropdownClick} dropdownOptions={Object.keys(predefinedFrames)} defaultDropdownValue={"A4"} />
            </div>

            <hr style={{marginTop:"10px"}}/>
            <div  style={{marginTop:"10px"}}> 
                <small>1 px = 0.265 mm로 환산하여 계산</small>
                <DropDown dropdownTitle="블럭 크기(mm)" dropdownClickAction={handleBlockSizeDropdownClick} dropdownOptions={bizs} defaultDropdownValue={10} />
            </div>

            <><hr style={{marginTop:"10px"}}/>
             <div  style={{marginTop:"10px"}}> 
                 <button onClick={removeBlocks} className="text-white bg-blue-700 w-full hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button"> 
                     블럭 지우기
                 </button>
             </div></>

            { canvasContext.imageUploadState === ImageUploadStatusEnum.uploaded && <>
           <hr style={{marginTop:"10px"}}/>
            <div  style={{marginTop:"10px"}}> 
                <button onClick={hideCanvasDrawing} className="text-white bg-blue-700 w-full hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                    그림{ hideImageOnCanvas ? "보이기" : "숨기기" }
                </button>
            </div>
             {/* <hr style={{marginTop:"10px"}}/>
            <div  style={{marginTop:"10px"}}> 
                <button onClick={automaticallyDrawingCanvas1} className="text-white bg-blue-700 w-full hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button"> 
                    비즈 생성하기
                </button>
            </div> */}
            <hr style={{marginTop:"10px"}}/>
            <div  style={{marginTop:"10px"}}> 
                <button onClick={handleOnGenerateBlockClick} className="text-white bg-blue-700 w-full hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button"> 
                    자동으로 블럭 생성하기
                </button>
            </div> 

            <hr style={{marginTop:"10px"}}/>
            <div  style={{marginTop:"10epx"}}> 
                <button onClick={handleOnResetClick} className="text-white bg-blue-700 w-full hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button"> 전체지우기 </button>
            </div> </>}

        {/* </div> */}
        </>
    )
}