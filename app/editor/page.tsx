"use client"
import { Dispatch, MutableRefObject, SetStateAction, useEffect, useRef, useState } from "react";

import {
  Header,
  LoadingImage
} from "./component";
import {
    EditorButtons,
    PrintPopUp
} from "./pages";
import { useAlterContext, useCanvasContext, useDragContext, usePrintContext } from "./context";

import { Alter, MyButton } from "./dictionary/templates";
import { ImageUploadStatusEnum, rgb } from "./dictionary/types";
import { AWS_IMAGE_S3_URL, PIXEL_TO_MILLI, predefinedColors, predefinedFrames } from "./dictionary/variables";

import { findColosestColor, isBlack, isWhite } from "./logic/color";
import { calculateBackgorundSize } from "./logic/size";
import ImageSizeTest from "./imageSizeTest";
import DragTest from "./dragTest";
import { turnOnAlter } from "./dictionary/functions";

export default function Home() {
    const guideRef : any | never = useRef(undefined);
    const printGuideRef : any  = useRef(undefined);
    const printRef : any = useRef(undefined);

    const alter  = useAlterContext();
    const dragContext = useDragContext();
    const canvasContext = useCanvasContext();

    const canvasRef : any = useRef(undefined);
    const imgRef : any = useRef(undefined);
    const currentColorRef : any = useRef(undefined);
    const currentBlockLengthRef  : any = useRef(undefined);
    const backgroundImageRef : any = useRef(undefined);
    const currentDragStateRef : any = useRef(undefined);
    const actionToolRef : any = useRef(undefined);
    const currentImgLocXRef : any = useRef(undefined);
    const currentImgLocYRef : any = useRef(undefined);
    const moveImageOnCanvasRef  : any = useRef("move"); //move or lock
    const canvasWrapperRef : any = useRef(undefined);
    const drawnBlockCountRef : any = useRef(undefined);
    const currentFrameNameRef : any = useRef(undefined);

    const basicBlockLength : number = 10;
    const basicFrameName : string = "A4";
    const basicColorName : string = "black";

    let [ selectedFrameName, setSelectedFrameName ] : [ string, Dispatch<SetStateAction<string>>] = useState(basicFrameName);
    let [ selectedColorName, setSelectedColorName ] : [ string, Dispatch<SetStateAction<string>> ] = useState(basicColorName);

    let [ blockWindow, setBlockWindow ] : [boolean, Dispatch<SetStateAction<boolean>> ] = useState(false);
    let [ hideImageOnCanvas, setHideImageOnCanvas ] : [boolean, Dispatch<SetStateAction<boolean>> ] = useState(false);

    useEffect(()=>{
        checkWindowSize();
        window.onresize = () => {
            checkWindowSize(); //check window size
        // console.log(canvasRef.current.width, canvasWrapperRef.current.clientWidth);
        //     canvasRef.current.width = canvasWrapperRef.current.clientWidth;
        //     canvasRef.current.height = canvasWrapperRef.current.clientHeight;
        }
        createGuideline();
    }, []);

    useEffect(()=>{
        if(!blockWindow){
            createGuideline();
        }
    },[blockWindow])

    function drawCanvas() {
        const currentBlockLength : number = currentBlockLengthRef.current.value;
        const blockLengthInput : number = currentBlockLength / PIXEL_TO_MILLI ;

        // canvasRef.current.width = `${blockLengthInput}px`;
        // canvasRef.current.height = `${blockLengthInput}px`;

        canvasRef.current.width = predefinedFrames[currentFrameNameRef.current.value].width / PIXEL_TO_MILLI;
        canvasRef.current.height =  predefinedFrames[currentFrameNameRef.current.value].height /  PIXEL_TO_MILLI;
    }

    const checkWindowSize = () => {
        setBlockWindow( window.innerHeight < 700 || window.innerWidth < 1000 )

        if(window.innerHeight < 700 || window.innerWidth < 1000 ){
            setBlockWindow(true);
        }else{
            setBlockWindow(false);
        }
    }

    function createGuideline(){
        drawCanvas();

        const currentBlockLength : number = currentBlockLengthRef.current.value;
        const blockLengthInput : number = currentBlockLength / PIXEL_TO_MILLI;

        // const [ drawingBackgroundWidth, drawingBackgroundHeight ] = calculateBackgorundSize(selectedFrameName);
        // let selectedFrame = predefinedFrames[selectedFrameName];
        const guide = guideRef.current;

        if(guide === null){
            return;
        }

        guide.innerHTML = '';
        dragContext.dragEventRecordSheet = [];

        const guideWidth : number = canvasWrapperRef.current.clientWidth;
        const guideHeight : number = canvasWrapperRef.current.clientHeight;

        //비즈 크기만큼 사각형 생성
        //1 px = 0.265 mm
        // let bizRowCount : number = Math.floor(guideWidth / blockLengthInput);
        // let bizColCount : number =  Math.floor(guideHeight / blockLengthInput);
        // let bizWidth : number = Math.floor(drawingBackgroundWidth/bizRowCount);

        
        guide.style.width = `${predefinedFrames[currentFrameNameRef.current.value].width  / PIXEL_TO_MILLI}px`;
        guide.style.height = `${ predefinedFrames[currentFrameNameRef.current.value].height  / PIXEL_TO_MILLI}px`;

        // console.log( 210 / PIXEL_TO_MILLI /  currentBlockLength);

        let bizRowCount : number = ~~( predefinedFrames[currentFrameNameRef.current.value].width  / currentBlockLength);
        let bizColCount : number =  ~~( predefinedFrames[currentFrameNameRef.current.value].height  / currentBlockLength);

        guide.style.gridTemplateColumns = `repeat(${bizRowCount}, ${blockLengthInput}px)`;
        guide.style.gridTemplateRows = `repeat(${bizColCount},  ${blockLengthInput}px)`;

        // printGuideRef.current.style.width = `${canvasWrapperRef.current.clientWidth}px`;
        // printGuideRef.current.style.height = `${ canvasWrapperRef.current.clientHeight}px`;

        // setBlockLength(bizWidth);
        //currentBlockLengthRef.current.value = bizWidth;
 
        console.log("[bizLength, bizWidth, widthBizNum , heightBizNum , total biz count] : [",
            blockLengthInput, blockLengthInput,  bizRowCount , bizColCount , bizRowCount*bizColCount , "]");

        //populate guide so div can display
        let rowIndex : number = 1;
        let colIndex : number = 1;
        [ ... Array(Math.floor(bizRowCount*bizColCount)) ].forEach((index) => {
            if(rowIndex > bizRowCount){
                rowIndex = 1;
                colIndex ++;

            }

            if(colIndex > bizColCount){
                colIndex = 1;
            }
            // console.log(rowIndex,"-",colIndex);
            guide.insertAdjacentHTML("beforeend","<div draggable='true' id='"+rowIndex+"-"+colIndex+"' class='bizDiv nonSelected'></div>");

            rowIndex ++;
    });
        
        // testDrawEvent(guide);
        addDragAndDrawListenr();

        //draw print guide
        if(printRef.current != null ) {
            // A4기준
            printRef.current.style.width = blockLengthInput * bizRowCount + "px";  
            printRef.current.style.height = blockLengthInput * bizColCount + "px";
        }

    }

    const removeBlocks = () => { //20240809 왜 이것만 누르면 안그려지지??
        console.log("[removeBlocks]");

        guideRef.current.innerHTML = '';
        createGuideline();
    }

    function reset() { //clear canvas
        removeBlocks();

        if(canvasRef.current){
            canvasRef.current.getContext("2d").clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }

        if(imgRef.current){
            imgRef.current.src = null;
        }


        //각종 참조값 정리
        currentColorRef.current.value = "black";
        currentBlockLengthRef.current.value = 10;
        // const backgroundImageRef : any = useRef(undefined);
        currentDragStateRef.current.value="end";
        actionToolRef.current.value="draw";
        currentImgLocXRef.current.value=0;
        currentImgLocYRef.current.value=0;
        moveImageOnCanvasRef.current.value="move";
    }

    function handleOnGuideMouseEvent(mouseEvent : any){

        console.log("[handleOnGuideMouseEvent]")
        if(moveImageOnCanvasRef.current.value ==="lock"){
            turnOnAlter(alter, "이미지 조정하기가 켜져있습니다");
            return;
        }

        const [row, col] : [number, number ] = mouseEvent.target.id.split("-");
        const guide = guideRef.current;
        const blockWidthInput : number = parseInt(currentBlockLengthRef.current.value) / 0.265 + 5;
        const colorInput : string = currentColorRef.current.value;

        if(guide != null){
            var alreadyFilled : boolean = false;
            var colorChanged : boolean = false;

            const rect = guide.getBoundingClientRect();
            const x = mouseEvent.clientX - rect.left;
            const y = mouseEvent.clientY - rect.top;

            //start point
            const startX = ~~(( (~~(x/(blockWidthInput-5)) * (blockWidthInput-5)))) ;
            const startY = ~~(( (~~(y/(blockWidthInput-5)) * (blockWidthInput-5)))) ;
            console.log(`${x} => ${startX}, ${y} => ${startY}`);
            
            //같은 자리에 이미 있는지 찾고, 있으면 삭제하기
            const guideImageElementList : any = document.getElementsByClassName("guideImageElement");
            let targetImgId : string | undefined = undefined;

            
            for(let guideImage of guideImageElementList){
                //src, top, left
                const thisSrc : string = guideImage.currentSrc;
                const thisTop : number = parseInt(guideImage.style.top.replace("px",""));
                const thisLeft : number = parseInt(guideImage.style.left.replace("px",""));
                console.log(startX, thisLeft, startY, thisTop);

                if(Math.abs(startX - thisLeft) < 5 && Math.abs(startY - thisTop) < 5){
                    if(thisSrc.search(colorInput) === -1){
                        colorChanged = true;
                    }else{
                        alreadyFilled = true;
                    }
                    targetImgId = guideImage.id;
                    break;
                }
            }

            const imgSrc = `/block/${colorInput}-block.png`;
            const keyName = `${row}-${col}-${colorInput}`;
            let proceed : boolean = true;
            const dragState : string = currentDragStateRef.current.value;

            //drag인 경우 이번 start version에서 한번도 방문을 했는지 안했는지 체크

            if(dragState === "start") { //drag event 가 어디에선가라도 출발했으면
                //중복체크
                if(dragContext.dragEventRecordSheet.length > 0 && dragContext.dragEventRecordSheet.includes(keyName)){
                    proceed = false;
                }else{
                    dragContext.dragEventRecordSheet.push(keyName);
                }
                // console.log("drag envet",dragContext.dragEventRecordSheet,keyName,proceed);
            }

            if(proceed){
                const actionToolNow : string = mouseEvent.type.search("drag") > -1 ? actionToolRef.current.value : canvasContext.actionTool;

                if(targetImgId != undefined){
                    //remove block && mouseEvent.type.search('drag') === -1
                    //2024 08 07 drage할때 삭제 잘 안됨
                    const targetBlock : any = document.getElementById(targetImgId);
                    if(targetBlock){
                        if(actionToolNow === "erase"){
                            console.log("target id, remove");
                            targetBlock.remove();
                            drawnBlockCountRef.current.value = parseInt(drawnBlockCountRef.current.value) - 1;

                        }else if(actionToolNow === "draw"){
                            console.log("target id, draw");
                            targetBlock.src = imgSrc;
                        }
                    }
                }else if(targetImgId === undefined && actionToolNow === "draw"){
                    console.log("target id, draw");
                    const imgStr : string = "<img id='" + keyName + "'  class=\"guideImageElement\" width=\""+(blockWidthInput)+"\" src='" + imgSrc + "' style='position : absolute;top:"+startY+"px;left:"+startX+"px;z-index:6' />"
                    guide.insertAdjacentHTML('beforeend', imgStr);
                    drawnBlockCountRef.current.value =  parseInt(drawnBlockCountRef.current.value) + 1;
                }

                // if(printGuideRef.current != null){
                //     printGuideRef.current.innerHTML = guide.innerHTML;
                // }
               
            }
            
        }

    }

    //version 1
    function automaticDrawing() {
        const ctx = canvasRef.current.getContext("2d");

        var firstXPosition =  guideRef.current.children.item(0).getBoundingClientRect().x;
        var firstYPosition =  guideRef.current.children.item(0).getBoundingClientRect().y;

        //https://stackoverflow.com/questions/2541481/get-average-color-of-image-via-javascript
        for(let child of guideRef.current.children){ 
            if(child.className.search('bizDiv') > -1){ // block 부분을 클릭했을때
                const bcr : DOMRect = child.getBoundingClientRect();
                const [row, col] : [number, number ] = child.id.split("-");

            
                if(bcr.height == 0 || bcr.width == 0 ){
                    continue;
                }

                const [ x, y, width, height ] = [ bcr.x, bcr.y, bcr.width, bcr.height ];

                const imageData : any = ctx.getImageData(x - firstXPosition, y-firstYPosition,width, height);
                var j : number = 0;
                var count : number = 1;
                
                //분류 초기화
                var colorClassDictionary : { [ colorName : string ] : number } = { };
                predefinedColors.map(colors => colors.map(color => {
                    colorClassDictionary[color.name] = 0;
                }));

                while ( (j += 4) < imageData.data.length ) { 
                    var rgba : rgb = {r:0,g:0,b:0,a:0};
                    count++;

                    rgba.r = imageData.data[j];
                    rgba.g = imageData.data[j+1];
                    rgba.b = imageData.data[j+2];
                    rgba.a = imageData.data[j+3];

                    if(isBlack(rgba)){
                        colorClassDictionary["black"] ++;
                    }else if(isWhite(rgba)){
                        colorClassDictionary["white"] ++;
                    }else{
                        colorClassDictionary[findColosestColor(rgba, child)] ++;
                    }
                }

                //find most frequent color name 
                const colorList :[string, number][] = Object.entries(colorClassDictionary);
                colorList.sort((a,b) => b[1] - a[1])

                // console.log(++childIndex, child, colorList);

                //start point
                const blockWidthInput : number = parseInt(currentBlockLengthRef.current.value)  / 0.265;
                const imgSrc = `/block/${colorList[0][0]}-block.png`;
                const keyName = `${row}-${col}-${colorList[0][0]}`;
                // const keyName = `${Math.round(x - firstXPosition)}-${Math.round(y-firstYPosition)}-${colorList[0][0]}`;

                const imgStr : string = "<img id='" + keyName + "'  class=\"guideImageElement\" width=\""+(blockWidthInput)+"\" src='" + imgSrc + "' style='position : absolute;top:"+Math.round(y-firstYPosition)+"px;left:"+Math.round(x - firstXPosition)+"px;z-index:6' />"
                console.log(keyName);
                guideRef.current.insertAdjacentHTML('beforeend', imgStr);
                
                //const element = <img key={`block-${x - firstXPosition}-${y-firstYPosition}`} src={`/block/${colorList[0][0]}-block.png`} width={blockWidth+4} height={blockWidth+4} style={{position:"absolute",top:Math.round(y-firstYPosition),left:Math.round(x - firstXPosition),zIndex:6}} />;
                //drawElementAry.push(element);
                // console.log(drawElementAry);


                // rgba.r = ~~(rgba.r/count);
                // rgba.g = ~~(rgba.g/count);
                // rgba.b = ~~(rgba.b/count);
                // rgba.a = ~~(rgba.a/count);

                
                // if(rgba.r === 0 && rgba.g === 0 && rgba.b === 0){
                //     if( rgba.a > 240 ){
                //         colorName = "black";
                //     }else if(rgba.a < 20){
                //         colorName = "white";
                //     }
                // }else if(!(rgba.r === 0 && rgba.g === 0 && rgba.b === 0) && !(rgba.r === 255 && rgba.g === 255 && rgba.b === 255)){
                //     //if it is not white or black find substitute
                //     colorName = findColosestColor(rgba);
                // }

            }
        }

        // if(printGuideRef.current != null){
        //     printGuideRef.current.innerHTML = guideRef.current.innerHTML;
        // }
    }

    function addDragAndDrawListenr() {
        guideRef.current.addEventListener("dragstart",() => {
            currentDragStateRef.current.value = "start";
        })
        guideRef.current.addEventListener("dragover",function(event:any){
            handleOnGuideMouseEvent(event);
        })
        guideRef.current.addEventListener("dragend",()=> {
            currentDragStateRef.current.value = "end";
            dragContext.dragEventRecordSheet = [];
        })
    }

    const printContext = usePrintContext();


    return (
        <div> 
           
            <PrintPopUp printGuideRef = {printGuideRef} currentBlockLengthRef={currentBlockLengthRef}/>

            <div className="flex flex-row">
                <div className="font-bold text-3xl">2024 08 12 안내내용</div>
                <ul className="border-2 border-green-500">
                    <li>drag and draw 기능 완료</li>
                    <li>비즈크기 조정 가능하도록 구현 완료</li>
                    <li>색깔 알고리즘 개선 완료</li>
                    <li>5분마다 임시저장 가능하도록 구현 완료</li>
                    <li>이미지 크기 조절하여 출력 완료</li>
                </ul>
                <ul className="border-2 border-red-500">
                    <li>출력시 비즈크기 조정하기 관련 추가 구현 필요</li>
                    <li>에디터에서 비즈크기 조정이 가능할때 현재는 이전 작업물이 모두 사라짐</li>
                    <li>현재 그려놓은 작업물을 비즈크기가 변경되어도 가능하게 할때는 추가 구현 필요</li>
                </ul>
            </div>

            <Header guideRef={guideRef} printRef={printRef} printGuideRef={printGuideRef} currentBlockLengthRef={currentBlockLengthRef} currentFrameNameRef={currentFrameNameRef}/>
            <div className="nav mx-auto flex items-center p-6">

                { canvasContext.imageUploadState === ImageUploadStatusEnum.uploading && <LoadingImage /> }

                { blockWindow ? 
                        <div>
                            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-10" aria-hidden="true"></div> 
                            <Alter message="화면 크기가 너무 작습니다. 화면 크기를 조정해주세요." />
                        </div> :
                        <div className="flex w-full flex-row space-x-10" >
                            <div className="flex w-3/4 h-screen " id="drawCanvas" ref={canvasWrapperRef}>
                                <div 
                                    id="guide"
                                    ref={guideRef} 
                                    onClick={(event) => handleOnGuideMouseEvent(event)}
                                />
                                <canvas id="canvas" className="border-2 border-red-500 absolute" ref={canvasRef} />
                            </div>
                        <div className="grow flex flex-col h-full p-6 border border-slate-500">
                            <EditorButtons 
                                canvasRef={canvasRef}
                                currentColorRef={currentColorRef}
                                currentBlockLengthRef={currentBlockLengthRef}
                                backgroundImageRef={backgroundImageRef}
                                imgRef={imgRef}
                                setSelectedColorName={setSelectedColorName}
                                createGuideline={createGuideline}
                                reset={reset}
                                automaticDrawing={automaticDrawing}
                                removeBlocks={removeBlocks}
                                actionToolRef = {actionToolRef}
                                moveImageOnCanvasRef = {moveImageOnCanvasRef}
                                currentImgLocXRef={currentImgLocXRef}
                                currentImgLocYRef={currentImgLocYRef}
                                drawnBlockCountRef={drawnBlockCountRef}
                                currentFrameNameRef={currentFrameNameRef}

                            />
                        </div>
                        <div id="editorCanvasInputs" className="hidden">
                            <input type="text" ref={currentColorRef} defaultValue={basicColorName} />
                            currentFrameNameRef : <input type="string" ref={currentFrameNameRef} defaultValue={basicFrameName} />
                            currentBlockLengthRef : <input type="number" ref={currentBlockLengthRef} defaultValue={basicBlockLength} />
                            <input type="text" ref={currentDragStateRef} defaultValue="" />
                            <input type="text" ref={actionToolRef}  defaultValue="draw" />
                            <input type="number" ref={currentImgLocXRef} defaultValue={0}/>
                            <input type="number" ref={currentImgLocYRef} defaultValue={0}/>
                            <input type="text" ref={moveImageOnCanvasRef}  defaultValue="move" />
                            <input type="number" ref={drawnBlockCountRef} defaultValue={0}/>
                        </div>


                    </div>
                }
            </div>

            { alter.turnAlter &&  <Alter message={alter.message}  />  }
            {/* style={{width:"210mm",height:"290mm"}} */} 
            <div className={`w-full h-auto relative`} id="print-content"  ref={printGuideRef} ></div>
        </div>

  );
}
 