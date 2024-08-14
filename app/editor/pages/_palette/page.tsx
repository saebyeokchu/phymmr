import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

import { useCanvasContext, useDragContext, useRefContext } from "../../context";
import { DimBackground, DropDown, MyButton } from "../../component";

import { cleanService, drawService } from "../../service";

import { Vars, Enums } from "../../lib/constant";
import { imageFunction } from "../../lib/functions";

import ColorSection from "./ColorSection";

const Component = ({innerContent} : {innerContent : React.ReactNode}) => <>
<hr style={{marginTop:"10px"}}/>
<div  style={{marginTop:"10px"}}> 
    {innerContent}
</div>
</>

export default function Palette(){

    const canvasContext = useCanvasContext();
    const dragContext = useDragContext();
    const refContext = useRefContext();

    const backgroundImageDivRef : any = useRef(undefined);
    const backgroundImageRef : any = useRef(undefined);
    const importImageByOriginalRatioRef : any = useRef(undefined);
    const moveImgBtnRef : any = useRef(undefined);

    const [ imageMovingState, setImageMovingState ] : [ Enums.ImageMovingStateEnum, Dispatch<SetStateAction<Enums.ImageMovingStateEnum>> ] = useState<Enums.ImageMovingStateEnum>(Enums.ImageMovingStateEnum.wait);
    const [ imageRatioState, setImageRatioState ] : [ Enums.ImageRatioEnum, Dispatch<SetStateAction<Enums.ImageRatioEnum>> ] = useState<Enums.ImageRatioEnum>(Enums.ImageRatioEnum.origin);
    const [ drawMode, setDrawMode ] : [ string, Dispatch<SetStateAction<string>> ] = useState<string>("");
    const [ hideImageOnCanvas, setHideImageOnCanvas ] : [ boolean, Dispatch<SetStateAction<boolean>> ] = useState<boolean>(false);
    const [ imageSizeRangeValue, setImageSizeRangeValue ] : [ number, Dispatch<SetStateAction<number>> ] = useState<number>(50);

    useEffect(()=>{
        const actionToolRef = refContext.actionToolRef;

        if(actionToolRef != null){
            setDrawMode(actionToolRef.current.value);
        }

        if(importImageByOriginalRatioRef != null){
            importImageByOriginalRatioRef.current.checked = true;
        }
    },[]);
    
    /* image movements */
    const keyDownEvent = (event: any)=>{
        const canvasRef = refContext.canvasRef;
        const imgXRef = canvasContext.imgXRef;
        const imgYRef = canvasContext.imgYRef;

        if(canvasRef != null && backgroundImageRef != null && imgXRef != null && imgYRef != null){
            event.preventDefault();

            switch(event.key){
                case "ArrowUp" :
                    console.log("[ArrowUp]");
                    drawService.moveImageLocationOnCanvas(
                        canvasRef,
                        backgroundImageRef,
                        imgXRef,
                        imgYRef,
                        Enums.Direction.up,
                        undefined
                    );
                    break;
                case "ArrowDown" :
                    console.log("[ArrowDown]")
                    drawService.moveImageLocationOnCanvas(
                        canvasRef,
                        backgroundImageRef,
                        imgXRef,
                        imgYRef,
                        Enums.Direction.down,
                        undefined
                    );
                    break;
                case "ArrowLeft" :
                    console.log("[ArrowLeft]")
                    drawService.moveImageLocationOnCanvas(
                        canvasRef,
                        backgroundImageRef,
                        imgXRef,
                        imgYRef,
                        Enums.Direction.left,
                        undefined
                    );
                    break;
                case "ArrowRight" :
                    console.log("[ArrowRight]")
                    drawService.moveImageLocationOnCanvas(
                        canvasRef,
                        backgroundImageRef,
                        imgXRef,
                        imgYRef,
                        Enums.Direction.right,
                        undefined
                    );
                    break;
            }
        }
       
    }

    const canvasMouseMoveEvent = (event : any) => {
        console.log("[canvasMouseMoveEvent]")
        const imgWidth : number = imageFunction.getImageWidthAndHeight(backgroundImageRef.current).width;
        const imgHeight : number = imageFunction.getImageWidthAndHeight(backgroundImageRef.current).height;

        const canvasRef = refContext.canvasRef;
        const imgXRef = canvasContext.imgXRef;
        const imgYRef = canvasContext.imgYRef;

        if(canvasRef != null && backgroundImageRef != null && imgXRef != null && imgYRef != null){
            if(imgWidth > -1 && imgHeight > -1){
                drawService.moveImageLocationOnCanvas(
                    canvasRef,
                    backgroundImageRef,
                    imgXRef,
                    imgYRef,
                    undefined,
                    [event.offsetX - imgWidth/2,  event.offsetY - imgHeight/2]
                );
            }
        }
    };

    const mouseUpEvent = (event : any)=> {
        console.log("[mouseUpEvent]");
        const canvasRef = refContext.canvasRef;

        if(canvasRef != null ){
            canvasRef.current.removeEventListener("mousemove",canvasMouseMoveEvent);
        }
    };

    const mouseDownEvent = (event : any)=> {
        console.log("[mouseDownEvent]");
        const canvasRef = refContext.canvasRef;

        if(canvasRef != null ){
            canvasRef.current.addEventListener("mousemove",canvasMouseMoveEvent);
        }
    }

    /* button click action */
    const handleOnLoadFile = ( imageData : any ) => {  //image upload to S3 AWS Server
        console.log("[handleOnLoadFile]"); 

        const canvasRef = refContext.canvasRef;
        const guideRef = refContext.guideRef;
        const imgXRef = canvasContext.imgXRef;
        const imgYRef = canvasContext.imgYRef;
        const blockLenRef = refContext.blockLenRef;

        if(canvasRef != null && guideRef != null && imgXRef != null && imgYRef != null && blockLenRef != null) {
            cleanService.cleanActionZone(
                guideRef,
                backgroundImageDivRef,
                handleOnLoadFile,
                backgroundImageRef,
                canvasRef
            );
            drawService.drawGuidelines(refContext, dragContext);

            const ctx = canvasRef.current.getContext("2d");
            canvasContext.setImageUploadState(Enums.ImageUploadStatusEnum.uploading);

            //draw backgorund 
            backgroundImageRef.current.src = URL.createObjectURL(imageData.target.files[0]);
    
            backgroundImageRef.current.onload = function () {
                // console.log(backgroundImageRef, backgroundImageRef.current.offsetHeight, backgroundImageRef.current.height, imageData.target.files[0], imageData.target);

                if(importImageByOriginalRatioRef.current.checked){
                    ctx.drawImage(backgroundImageRef.current,0,0,backgroundImageRef.current.naturalWidth,backgroundImageRef.current.naturalHeight,0,0, canvasRef.current.width, canvasRef.current.height); 
                    setImageRatioState(Enums.ImageRatioEnum.origin);
                }else{
                    ctx.drawImage(backgroundImageRef.current,imgXRef.current.value,imgYRef.current.value,backgroundImageRef.current.naturalWidth,backgroundImageRef.current.naturalHeight);
                    setImageRatioState(Enums.ImageRatioEnum.custom);
                }
                drawService.drawBlocksByImageInfo(canvasRef,guideRef,blockLenRef);
                canvasContext.setImageUploadState(Enums.ImageUploadStatusEnum.uploaded);
                backgroundImageRef.current.style.width = backgroundImageRef.current.naturalWidth + "px";
                backgroundImageRef.current.style.height = backgroundImageRef.current.naturalHeight + "px";
            }
        }
    }

    function handleOnMoveImgBtnClick() {
        console.log("[handleOnMoveImgBtnClick]");

        const canvasRef = refContext.canvasRef;
        const paperLockStatRef = refContext.paperLockStatRef;

        if(canvasRef != null && paperLockStatRef != null && moveImgBtnRef.current != null){
            const permitToUnsacling : boolean = imageRatioState === Enums.ImageRatioEnum.origin && window.confirm("이미지 크기를 조정하게 되면 이미지가 원래 비율로 되돌아갑니다. 진행하시겠습니까?");
            
            if(permitToUnsacling || imageRatioState === Enums.ImageRatioEnum.custom){
                canvasRef.current.style.zIndex = 20;
                moveImgBtnRef.current.style.zIndex = 20;
                canvasRef.current.addEventListener("mouseup",mouseUpEvent);
                canvasRef.current.addEventListener("mousedown",mouseDownEvent);
                document.addEventListener("keydown",keyDownEvent);
                paperLockStatRef.current.value = Enums.PaperStateEnum.lock;
                setImageMovingState(Enums.ImageMovingStateEnum.moving);
                importImageByOriginalRatioRef.current.checked=false;
                setImageRatioState(Enums.ImageRatioEnum.custom);
            }
        }
    }

    function handleOnCompleteMovingImgBtnClick() {
        console.log("[handleOnCompleteMovingImgBtnClick]");

        const canvasRef = refContext.canvasRef;
        const paperLockStatRef = refContext.paperLockStatRef;

        if(canvasRef != null && paperLockStatRef != null && moveImgBtnRef.current != null){
            canvasRef.current.style.zIndex = 0;
            moveImgBtnRef.current.style.zIndex = 0;
            canvasRef.current.removeEventListener("mouseup",mouseUpEvent);
            canvasRef.current.removeEventListener("mousedown",mouseDownEvent);
            document.removeEventListener("keydown",keyDownEvent);
            paperLockStatRef.current.value = Enums.PaperStateEnum.lock;
            setImageMovingState(Enums.ImageMovingStateEnum.wait);
        }
    }
    
    const handleOnSliderChange = (rangeEvent : any) => {
        console.log("[handleOnSliderChange]");
        const canvasRef = refContext.canvasRef;
        const imgXRef = canvasContext.imgXRef;
        const imgYRef = canvasContext.imgYRef;

        if(canvasRef != null && imgXRef != null && imgYRef != null){
            let rangeValue : number = parseInt(rangeEvent.target.value);

            //현재 0.5 ~ 2배까지 가능
            let newWidth : number = backgroundImageRef.current.width * ((rangeValue * 2 / 100));
            let newHeight : number = backgroundImageRef.current.height * ((rangeValue * 2 / 100));
    
            setImageSizeRangeValue(rangeEvent.target.value);
    
            backgroundImageRef.current.style.width = newWidth + "px";
            backgroundImageRef.current.style.height = newHeight + "px";
    
            // console.log(backgroundImageRef.current.style.height,backgroundImageRef.current.style.width)
    
            var ctx = canvasRef.current.getContext("2d");
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            ctx.drawImage(backgroundImageRef.current,imgXRef.current.value,imgYRef.current.value,backgroundImageRef.current.style.width.replace("px",""),backgroundImageRef.current.style.height.replace("px",""));
        }
        
    }

    const handleFrameSizeDropdownClick = (value : any) => {
        const frNmRef = refContext.frNmRef;
        
        if(frNmRef != null){
            if(window.confirm("용지 크기를 조정하면 현재 저장된 데이터가 모두 삭제됩니다. 진행하시겠습니까?")){
                reset();
                frNmRef.current.value = value;
                drawService.drawGuidelines(refContext, dragContext);
                setTimeout(()=>window.localStorage.removeItem("bizTempSave"),1000);
                return true;
            }
        }
       
        return false;
    }

    const handleBlockSizeDropdownClick = (value : any) => {
        const blockLenRef = refContext.blockLenRef;

        if(window.confirm("비즈크기를 조정하면 현재 저장된 데이터가 모두 삭제됩니다. 진행하시겠습니까?")){
            reset();
            blockLenRef.current.value = value;
            drawService.drawGuidelines(refContext, dragContext);
            setTimeout(()=>window.localStorage.removeItem("bizTempSave"),1000);
            return true;
        }
        return false;
    }

    function handleOnRemoveBlocksClick(){
        drawService.drawGuidelines(refContext, dragContext);
    }

    function hideCanvasDrawing(){
        const canvasRef = refContext.canvasRef;

        if( canvasRef != null ) {
            if(!hideImageOnCanvas){
                canvasRef.current.classList.add("hidden");
            }else{
                canvasRef.current.classList.remove("hidden");
            }
            setHideImageOnCanvas(!hideImageOnCanvas);
        }
    }

    function handleOnGenerateBlockClick(){
        const canvasRef = refContext.canvasRef;
        const guideRef = refContext.guideRef;
        const blockLenRef = refContext.blockLenRef;

        if(canvasRef != null && guideRef != null && blockLenRef != null){
            canvasContext.setImageUploadState(Enums.ImageUploadStatusEnum.uploading);
            setTimeout(() => {
                drawService.drawBlocksByImageInfo(canvasRef,guideRef,blockLenRef);
                canvasContext.setImageUploadState(Enums.ImageUploadStatusEnum.uploaded);
            },100);
        }
    }
    
    const handleOnDrawModeClick = () => {
        const actionToolRef = refContext.actionToolRef;

        if(actionToolRef != null){
            actionToolRef.current.value = Enums.ActionToolEnum.draw;
            setDrawMode(Enums.ActionToolEnum.draw);
        }
    }

    const handleOnEraseModeClick = () => {
        const actionToolRef = refContext.actionToolRef;

        if(actionToolRef != null){
            actionToolRef.current.value = Enums.ActionToolEnum.erase;
            setDrawMode(Enums.ActionToolEnum.erase);
        }
    }

    // /* functions */
    function resetImageLocation() {
        const canvasRef = refContext.canvasRef;
        const imgXRef = canvasContext.imgXRef;
        const imgYRef = canvasContext.imgYRef;

        if(canvasRef != null && backgroundImageRef != null && imgXRef != null && imgYRef != null){
            console.log("[resetImageLocation]");
            drawService.resetImageLocation(canvasRef, backgroundImageRef, imgXRef, imgYRef);
        }
    }

    function reset() { //clear canvas
        const guideRef = refContext.guideRef;
        const canvasRef = refContext.canvasRef;
        const colorRef = refContext.colorRef;
        const blockLenRef = refContext.blockLenRef;
        const dragStatRef = refContext.dragStatRef;
        const actionToolRef = refContext.actionToolRef;
        const paperLockStatRef = refContext.paperLockStatRef;
        const imgXRef = canvasContext.imgXRef;
        const imgYRef = canvasContext.imgYRef;


        if(guideRef != null && canvasRef != null && colorRef != null && blockLenRef != null && dragStatRef != null && actionToolRef != null && imgXRef != null && imgYRef != null && paperLockStatRef != null){
            cleanService.cleanActionZone(
                guideRef,
                backgroundImageDivRef,
                handleOnLoadFile,
                backgroundImageRef,
                canvasRef
            );
            cleanService.cleanRefs(
                canvasContext,
                colorRef,
                blockLenRef,
                dragStatRef,
                actionToolRef,
                imgXRef,
                imgYRef,
                paperLockStatRef
            );
            drawService.drawGuidelines(refContext, dragContext);
        }
    }

    return (
        // <div className="grow flex flex-col h-full p-6 border border-slate-500">
        <div className="grow flex flex-col h-full p-6 border border-slate-500">
            <div className="flex flex-col">
                <div className="flex flex-row space-x-4">
                    <MyButton onClickFunction={handleOnDrawModeClick} buttonName="그리기"/>
                    <MyButton onClickFunction={handleOnEraseModeClick} buttonName="지우기"/>
                </div>
                { drawMode === Enums.ActionToolEnum.draw && <ColorSection /> }
            </div>
            
            <Component innerContent={
                <>
                    <label>이미지</label>
                    <div ref={backgroundImageDivRef}  >
                        <input type="file" id="img" name="img" accept="image/*" onChange={handleOnLoadFile}/>
                    </div>
                    <img ref={backgroundImageRef} className="hidden" alt="Background Image ..." />
                    <input type="checkbox" ref={importImageByOriginalRatioRef} />
                    <label htmlFor="horns">이미지 꽉차게 불러오기</label>
                </>
            } />

            
             { canvasContext.imageUploadState === Enums.ImageUploadStatusEnum.uploaded && imageMovingState === Enums.ImageMovingStateEnum.wait && <MyButton buttonName="이미지 크기 / 위치 조정하기" onClickFunction={handleOnMoveImgBtnClick} /> }
             
             <div ref={moveImgBtnRef}> 
             { imageMovingState === Enums.ImageMovingStateEnum.moving && <> 
                <Component innerContent={<>
                    <MyButton buttonName="이미지 크기 / 위치 조정 완료" onClickFunction={handleOnCompleteMovingImgBtnClick} />
                    <div>
                        <label>이미지 크기 </label>
                        <input id="default-range" type="range" value={imageSizeRangeValue} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" onChange={handleOnSliderChange}/>
                    </div>
                </> } />
                <Component innerContent={<>
                    <MyButton buttonName="이미지 원점으로" onClickFunction={resetImageLocation}/>
                    <small>이미지를 클릭하여 움직일 수 있습니다</small>
                    <small>키보드를 이용하여 움직일 수 있습니다</small>
                </> } />
            </>}
            </div>

            <Component innerContent={<DropDown dropdownTitle="용지 설정" dropdownClickAction={handleFrameSizeDropdownClick} dropdownOptions={Object.keys(Vars.predefinedFrames)} defaultDropdownValue={"A4"} />} />

            <Component innerContent={<>
                <small>1 px = 0.265 mm로 환산하여 계산</small>
                <DropDown dropdownTitle="블럭 크기(mm)" dropdownClickAction={handleBlockSizeDropdownClick} dropdownOptions={Vars.bizs} defaultDropdownValue={10} />    
            </>} />

            { canvasContext.imageUploadState === Enums.ImageUploadStatusEnum.wait && <Component innerContent={<MyButton buttonName="블럭 지우기" onClickFunction={handleOnRemoveBlocksClick} />} /> }

            
            { canvasContext.imageUploadState === Enums.ImageUploadStatusEnum.uploaded && <>
                <Component innerContent={<MyButton buttonName={`그림 ${ hideImageOnCanvas ? "보이기" : "숨기기" }`} onClickFunction={hideCanvasDrawing} />} />
                <Component innerContent={<MyButton buttonName="블럭 지우기" onClickFunction={handleOnRemoveBlocksClick} />} />
                <Component innerContent={<MyButton buttonName="자동으로 블럭 생성하기" onClickFunction={handleOnGenerateBlockClick} />} />
                <Component innerContent={<MyButton buttonName="전체 지우기" onClickFunction={reset} />} />
            </> }

            { imageMovingState === Enums.ImageMovingStateEnum.moving && <DimBackground /> }

        </div>
    )
}