"use client"

import { Dispatch, MutableRefObject, SetStateAction, useEffect, useRef, useState } from "react";
import { useAlterContext } from "@/app/editor/context/AlterContext";

import { AWS_IMAGE_S3_URL, predefinedColors, predefinedFrames } from "@/app/editor/dictionary/variables";

import { findColosestColor, isBlack, isWhite } from "@/app/editor/pages/editor/logic/color";
import { color, rgb } from "@/app/editor/dictionary/types";
import { Alter, DimBackground, MyButton } from "@/app/editor/dictionary/templates";

import {
    ColorPalette,
    PrintGuide,
    PrintPopUp
} from "./component";


export default function Editor(  {guideRef} : { guideRef: any | never } ){
    const canvasRef : any = useRef(undefined);
    const imgRef : any = useRef(undefined);
    const inputRef : any = useRef(undefined);

    const basicBizLength : number = 10;
    const basicFrameName : string = "A4";
    const basicColorName : string = "black";

    const alter  = useAlterContext();

    let [ drawContents, setDrawContents ] : [ any[], Dispatch<SetStateAction<any[]>> ] = useState([]);

    let [ blockWidth, setBlockWidth ] : [number, Dispatch<SetStateAction<number>>] = useState(-1);
    let [ blockHeight, setBlockHeight ] : [number, Dispatch<SetStateAction<number>>] = useState(-1);

    let [ selectedBizLength, setSelectedBizLength ] : [number, Dispatch<SetStateAction<number>>] = useState(basicBizLength);
    let [ selectedFrameName, setSelectedFrameName ] : [ string, Dispatch<SetStateAction<string>>] = useState(basicFrameName);
    let [ selectedColorName, setSelectedColorName ] : [ string, Dispatch<SetStateAction<string>> ] = useState(basicColorName);

    let [ showPrintOpt, setShowPrintOpt ] : [boolean, Dispatch<SetStateAction<boolean>> ] = useState(false);
    let [ blockWindow, setBlockWindow ] : [boolean, Dispatch<SetStateAction<boolean>> ] = useState(false);
    let [ hideImageOnCanvas, setHideImageOnCanvas ] : [boolean, Dispatch<SetStateAction<boolean>> ] = useState(false);
    let [ generateOnlyBlocks, setGenerateOnlyBlocks ] : [boolean, Dispatch<SetStateAction<boolean>> ] = useState(false);
    let [ isImageUploaded, setIsImageUploaded ] : [boolean, Dispatch<SetStateAction<boolean>> ] = useState(false);
    let [ isImageUploading, setImageUploading ] : [boolean, Dispatch<SetStateAction<boolean>> ] = useState(false);

    useEffect(()=>{
        //window.onresize = () => checkWindowSize(); //check window size
        //set canvas size first
        drawCanvas();
        //calculate background size
        createGuideline(); //draw guideline
        //check 임시저장
        checkTempSave();
    }, []);

    const checkWindowSize = () => {
        setBlockWindow( window.innerHeight < 700 || window.innerWidth < 1000 )
    }

    const drawCanvas = () => {
        if(canvasRef.current===null) return;
        const [ drawingBackgroundWidth, drawingBackgroundHeight ] = calculateBackgorundSize();

        var canvas : any = canvasRef.current;
        canvas.width = drawingBackgroundWidth;
        canvas.height = drawingBackgroundHeight;
    }

    function calculateBackgorundSize(){
        let selectedFrame = predefinedFrames[selectedFrameName ]

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

    function createGuideline(){
        const [ drawingBackgroundWidth, drawingBackgroundHeight ] = calculateBackgorundSize();
        const guide = guideRef.current;

        if(guide === null){
            return;
        }

        let selectedFrame = predefinedFrames[selectedFrameName];
        guide.innerHTML = '';
        setDrawContents(drawContents);

        //비즈 크기만큼 사각형 생성
        let bizRowCount : number = Math.floor(selectedFrame.width / 10);
        let bizColCount : number =  Math.floor(selectedFrame.height / 10);
        let bizWidth : number = Math.floor(drawingBackgroundWidth/bizRowCount);
        let bizHeight : number = Math.floor(drawingBackgroundHeight/bizColCount);

        guide.style.width = `${drawingBackgroundWidth}px`;
        guide.style.height = `${drawingBackgroundHeight}px`;
        guide.style.gridTemplateColumns = `repeat(${bizRowCount}, ${bizWidth}px)`;
        guide.style.gridTemplateRows = `repeat(${bizColCount},  ${bizWidth}px)`;

        setBlockHeight(bizHeight);
        setBlockWidth(bizWidth);

        console.log("[bizLength, bizWidth, bizHeight, widthBizNum , heightBizNum , total biz count] : [",
            selectedBizLength, bizWidth, bizHeight, bizRowCount , bizColCount , bizRowCount*bizColCount , "]");

        //populate guide so div can display
        [ ... Array(Math.floor(bizRowCount*bizColCount)) ].forEach(() => guide.insertAdjacentHTML("beforeend","<div draggable='true' class='bizDiv nonSelected'></div>"));

        // guide.addEventListener("dragstart",function(event:any){handleOnGuideDrag(event, bizWidth)})
        guide.addEventListener("dragover",function(event:any){handleOnGuideDrag(event, bizWidth)})
        // guide.addEventListener("dragend",function(event:any){handleOnGuideDrag(event, bizWidth)})
        // guide.addEventListener("drop",function(event:any){handleOnGuideDrag(event, bizWidth)})
        // guide.addEventListener("dragleave",function(event:any){handleOnGuideDrag(event, bizWidth)})
        // guide.addEventListener("dragenter",function(event:any){handleOnGuideDrag(event, bizWidth)})

        
        // let index : number = 1;
        // for(const child of guide.children){
        //     console.log(child)
        //     // child.ondragstart = (event: any) => {console.log(child,"drag start ",event)};
        //     //child.addEventListner("dragstart", () => console.log(child,"drag start ",false))
        //     child.addEventListener("dragstart", (event: any) => handleDragStart(event, index, child), false);
        //     child.addEventListener("dragenter", (event: any) => handleDragEnter(event, index, child), false);
        //     child.addEventListener("dragover", (event: any) => handleDragOver(event, index, child), false);
        //     child.addEventListener("dragleave", (event: any) => handleDragLeave(event, index, child), false);
        //     child.addEventListener("drop", (event: any) => handleDragDrop(event, index, child), false);
        //     child.addEventListener("dragend", (event: any) => handleDragEnd(event, index, child), false);

        //     index++;
        // }
    }

    const handleDragStart = (event : any, index : number, child:any) => {
        console.log(index, "drag start");
        event.dataTransfer.effectAllowed = "move";
        handleOnGuideClick(event);
    }

    const handleDragEnter = (event : any, index : number, child:any) => {
        console.log(index, "dragenter");
        child.classList.add("over");
        handleOnGuideClick(event);
    }

    const handleDragOver = (event : any, index : number, child:any) => {
        console.log(index, "handleDragOver");
        if (event.preventDefault) {
            event.preventDefault();
          }
          event.dataTransfer.dropEffect = "move";
        handleOnGuideClick(event);
    }

    const handleDragLeave = (event : any, index : number, child:any) => {
        console.log(index, event, "dragleave");
        child.classList.remove("over");
        handleOnGuideClick(event);
    }

    const handleDragDrop = (event : any, index : number, child:any) => {
        console.log(index, event, "handleDragDrop");
        if (event.stopPropagation) {
            event.stopPropagation();
          }
        handleOnGuideClick(event);
    }

    const handleDragEnd = (event : any, index : number, child:any) => {
        console.log(index, event, "handleDragEnd");
        handleOnGuideClick(event);
    }

    const checkTempSave = () => {
        const savedDrawing= window.localStorage.getItem("bizTempSave");

        if(savedDrawing && savedDrawing != "" && window.confirm("저장된 데이터를 불러오시겠습니까?")){
            guideRef.current.innerHTML = '';
            guideRef.current.innerHTML = savedDrawing;
            console.log("savedDrawing", savedDrawing);
        }

        setTimeout(()=>window.localStorage.removeItem("bizTempSave"),1000);
    }

    /* EVENT HANDLER */
    function handleOnPrintClick() {
        printDrawing();
    }
    
    function handleOnGuideClick(clickEvent : any) {

        console.log("[handleOnGuideClick]");
        const guide = guideRef.current;

        if(guide != null){
            var alreadyFilled : boolean = false;
            var colorChange : boolean = false;
            var contentIndex : number = -1;
            // console.log(clickEvent)
            const rect = guide.getBoundingClientRect()
            const x = clickEvent.clientX - rect.left
            const y = clickEvent.clientY - rect.top

            //start point
            const startX = ~~(( (~~(x/blockWidth)) * blockWidth));
            const startY = ~~(( (~~(y/blockWidth)) * blockWidth ));
            console.log(`${x} => ${startX}, ${y} => ${startY}`);
            

            //같은 자리에 이미 있는지 찾고, 있으면 삭제하기
            drawContents.map((content,index) => {
                const thisTop : number = content.props.style.top;
                const thisLeft : number = content.props.style.left;

                if(startX === thisLeft && startY === thisTop){
                    if(content.props.src.search(selectedColorName) === -1){
                        colorChange = true;
                    }else{
                        alreadyFilled = true;
                    }
                    contentIndex = index;
                    return;
                }
            });

            if(alreadyFilled){
                setDrawContents(drawContents.filter((content: any,index: number) => index !== contentIndex))
            }else if(colorChange){
                const temp = drawContents.filter((content: any,index: number) => index !== contentIndex);
                const element = <img key={`${startX}-${startY}-${selectedColorName}`} src={`${AWS_IMAGE_S3_URL}/block/${selectedColorName}-block.png`} width={blockWidth+5} height={blockWidth+7} style={{position:"absolute",top:startY,left:startX,zIndex:6}} />;
                setDrawContents([ ... temp, element]);
            }else{
                const element = <img key={`${startX}-${startY}-${selectedColorName}`} src={`${AWS_IMAGE_S3_URL}/block/${selectedColorName}-block.png`} width={blockWidth+5} height={blockWidth+7} style={{position:"absolute",top:startY,left:startX,zIndex:6}} />;
                setDrawContents([ ... drawContents, element]);
            }

        }
    }

    const handleOnGuideDrag = (dragEvent : any, blockWidth : number) => {
        console.log([handleOnGuideDrag]);

        const guide = guideRef.current;

        if(guide != null){
            var alreadyFilled : boolean = false;
            var colorChange : boolean = false;
            var contentIndex : number = -1;
            // console.log(clickEvent)
            const rect = guide.getBoundingClientRect()
            const x = dragEvent.clientX - rect.left
            const y = dragEvent.clientY - rect.top

            //start point
            const startX = ~~(( (~~(x/blockWidth)) * blockWidth));
            const startY = ~~(( (~~(y/blockWidth)) * blockWidth ));

            //같은 자리에 이미 있는지 찾고, 있으면 삭제하기
            drawContents.map((content,index) => {
                const thisTop : number = content.props.style.top;
                const thisLeft : number = content.props.style.left;

                if(startX === thisLeft && startY === thisTop){
                    if(content.props.src.search(selectedColorName) === -1){
                        colorChange = true;
                    }else{
                        alreadyFilled = true;
                    }
                    contentIndex = index;
                    return;
                }
            });

            console.log(`${x} => ${startX}, ${y} => ${startY}`, colorChange, alreadyFilled);

            if(alreadyFilled){
                setDrawContents(drawContents.filter((content: any,index: number) => index !== contentIndex))
            }else if(colorChange){
                const temp = drawContents.filter((content: any,index: number) => index !== contentIndex);
                const element = <img key={`${startX}-${startY}-${selectedColorName}`} src={`${AWS_IMAGE_S3_URL}/block/${selectedColorName}-block.png`} width={blockWidth+5} height={blockWidth+7} style={{position:"absolute",top:startY,left:startX,zIndex:6}} />;
                setDrawContents([ ... temp, element]);
            }else{
                const keyName = `${startX}-${startY}-${selectedColorName}`;
                const srcName = `/block/${selectedColorName}-block.png`;
                const width = `${blockWidth+5}`;
                const height =  `${blockWidth+7}`;
 
                // const element = " <img class='gear' key='"+keyName+"' src='"+srcName+"' width=\""+width+"\" height=\""+height+"\" style=\"top:"+startY+";left:"+startY+";z-index:6;\" />";
                const element = <img key={`${startX}-${startY}-${selectedColorName}`} src={`${AWS_IMAGE_S3_URL}/block/${selectedColorName}-block.png`} width={blockWidth+5} height={blockWidth+7} style={{position:"absolute",top:startY,left:startX,zIndex:6}} />;
                setDrawContents([ ... drawContents, element]);
                // console.log( [ ... drawContents, element]);
                // [ ... drawContents, element].map(ele =>guide.insertAdjacentHTML("beforeend",ele));
                // guide.insertAdjacentHTML("beforeend","<h1>hi</h1>");

            }

        }
    }

    const handleOnClickColor = (color : color) => {
        setSelectedColorName(color.name);
        
    }

    const handleOnLoadFile = ( imageData : any ) => {
        //image upload to S3 AWS Server

        if(canvasRef.current===null) return;

        console.log("[handleOnLoadFile]");
        setImageUploading(true);

        reset();
        const ctx = canvasRef.current.getContext("2d");
        const [ drawingBackgroundWidth, drawingBackgroundHeight ] = calculateBackgorundSize();

        //draw backgorund 
        // guideRef.current.style.backgroundImage = "url("+URL.createObjectURL(imageData.target.files[0])+")";
        imgRef.current.src =   URL.createObjectURL(imageData.target.files[0]);
        imgRef.current.onload = function () {
            console.log(imgRef, imgRef.current.offsetHeight, imgRef.current.height, imageData.target.files[0], imageData.target);
            ctx.drawImage(imgRef.current,0,0,imgRef.current.naturalWidth,imgRef.current.naturalHeight,0,0, drawingBackgroundWidth, drawingBackgroundHeight); 
            automaticallyDrawingCanvas1();
            setIsImageUploaded(true);
            setImageUploading(false);

            // setDrawContents(

            // );
        }
        // img.naturalWidth,img.naturalHeight
    }

    const handleOnlyBlockGeneration = () => {
        if(generateOnlyBlocks){
            automaticallyDrawingCanvas1();
        }else{
            removeBizs();
        }

        setGenerateOnlyBlocks(!generateOnlyBlocks);
    }
    
    /* FUNCTION   */
    function hideCanvasDrawing(){
        if(!hideImageOnCanvas){
            canvasRef.current.classList.add("hidden");
        }else{
            canvasRef.current.classList.remove("hidden");
        }

        setHideImageOnCanvas(!hideImageOnCanvas);
    }

    const removeBizs = () => {
        setDrawContents([]);
    }

    function reset() { //clear canvas
        // if(inputRef.current){
        //     inputRef.current.value = null;
        // }

        removeBizs();

        if(canvasRef.current){
            canvasRef.current.getContext("2d").clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }

        if(imgRef.current){
            imgRef.current.src = null;
        }

        setIsImageUploaded(false);
    }

    function printDrawing() {
        setShowPrintOpt(true);
        //window.print();
        return;
        console.log("[printDrawing]");
        setShowPrintOpt(true);
        setTimeout(()=>{
            window.print();
            setTimeout(()=>{
                setShowPrintOpt(false);
            },500);
        },1000);
        
    }

    function cancelPrint() {
        console.log("cancelPrint");
        window?.localStorage?.removeItem("printHTML");
        setShowPrintOpt(false);
    }

    //version 1
    function automaticallyDrawingCanvas1() {
        const ctx = canvasRef.current.getContext("2d");

        var firstXPosition =  guideRef.current.children.item(0).getBoundingClientRect().x;
        var firstYPosition =  guideRef.current.children.item(0).getBoundingClientRect().y;

        var drawElementAry : any[] = [];
        var childIndex : number = 0;

        for(let child of guideRef.current.children){ //https://stackoverflow.com/questions/2541481/get-average-color-of-image-via-javascript
            const bcr : DOMRect = child.getBoundingClientRect();
            const [ x, y, width, height ] = [ bcr.x, bcr.y, bcr.width, bcr.height ];

            const imageData : any = ctx.getImageData(x - firstXPosition, y-firstYPosition,width, height);
            var j : number = 0;
            var count : number = 1;

            var colorClassDictionary : { [ colorName : string ] : number } = { };
            predefinedColors.map(colors => colors.map(color => {
                colorClassDictionary[color.name] = 0;
            }));

            while ( (j += 4) < imageData.data.length ) { 
                var rgba : rgb = {r:0,g:0,b:0,a:0};
                //console.log("data [",j,"] 번째 데이터");
                count++;
                // rgba.r += imageData.data[j];
                // rgba.g += imageData.data[j+1];
                // rgba.b += imageData.data[j+2];
                // rgba.a += imageData.data[j+3];

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

            console.log(++childIndex, child, colorList);

            //start point
            const element = <img key={`block-${x - firstXPosition}-${y-firstYPosition}`} src={`${AWS_IMAGE_S3_URL}/block/${colorList[0][0]}-block.png`} width={blockWidth+4} height={blockWidth+4} style={{position:"absolute",top:Math.round(y-firstYPosition),left:Math.round(x - firstXPosition),zIndex:6}} />;
            drawElementAry.push(element);
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

        setDrawContents(drawElementAry);
    }

    //version2
    function automaticallyDrawingCanvas2() {
        const ctx = canvasRef.current.getContext("2d");

        var firstXPosition =  guideRef.current.children.item(0).getBoundingClientRect().x;
        var firstYPosition =  guideRef.current.children.item(0).getBoundingClientRect().y;

        var drawElementAry : any[] = [];
        var childIndex : number = 0;

        for(let child of guideRef.current.children){ //https://stackoverflow.com/questions/2541481/get-average-color-of-image-via-javascript
            const bcr : DOMRect = child.getBoundingClientRect();
            const [ x, y, width, height ] = [ bcr.x, bcr.y, bcr.width, bcr.height ];

            const imageData : any = ctx.getImageData(x - firstXPosition, y-firstYPosition,width, height);
            var j : number = 0;
            var count : number = 1;
            var rgba : rgb = {r:0,g:0,b:0,a:0};
            var colorName : string = "black";

            while ( (j += 4) < imageData.data.length ) { 
                count++;
                rgba.r += imageData.data[j];
                rgba.g += imageData.data[j+1];
                rgba.b += imageData.data[j+2];
                rgba.a += imageData.data[j+3];
            }

            rgba.r = ~~(rgba.r/count);
            rgba.g = ~~(rgba.g/count);
            rgba.b = ~~(rgba.b/count);
            rgba.a = ~~(rgba.a/count);
            
            if(isBlack(rgba)){
                colorName = "black";
            }else if(isWhite(rgba)){
                colorName = "white";
            }else{
                colorName = findColosestColor(rgba, child);
            }
            
            console.log(++childIndex, child, colorName);

            //start point
            const element = <img key={`block-${x - firstXPosition}-${y-firstYPosition}`} src={`${AWS_IMAGE_S3_URL}/block/${colorName}-block.png`} width={blockWidth+4} height={blockWidth+4} style={{position:"absolute",top:Math.round(y-firstYPosition),left:Math.round(x - firstXPosition),zIndex:6}} />;
            drawElementAry.push(element);
            console.log(drawElementAry);
        }

        setDrawContents(drawElementAry);
    }

    {/* src="https://deform-gongbae.s3.us-west-2.amazonaws.com/test1-crop.png"  style={{width:"210mm", height:"297mm"}}  */}
    return <div className="nav mx-auto flex items-center p-6">

        { isImageUploading &&
            <>
                <DimBackground  />
                <div className="z-20 absolute flex flex-col w-screen justify-center content-center justify-items-center place-items-center" >
                    <div role="status" >
                        <svg aria-hidden="true" className="w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                    <div>
                        <span className="text-white font-bold ">이미지를 불러오는 중입니다</span>
                    </div>
                </div>
            </>
        }

        { blockWindow ? 
            <div>
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-10" aria-hidden="true"></div> 
                <Alter message="화면 크기가 너무 작습니다. 화면 크기를 조정해주세요." />
            </div> :
            <div className={`flex w-full `} >
                <div className="w-3/4 flex justify-center " id="drawCanvas" >
                    <div id="guide" style={{position:'relative'}} ref={guideRef} onClick={handleOnGuideClick}>
                        {drawContents.map(content => content)}  
                        {/* className="border-2 border-black-500"  */}
                    </div>
                    <canvas id="myCanvas" ref={canvasRef} className="absolute"  ></canvas> 
                    {/* border border-red-500  */}

                </div>
                <div className="grow flex flex-col h-full p-6 border border-slate-500">
                    <ColorPalette handleOnClickColor={handleOnClickColor} />
                    
                    <hr style={{marginTop:"10px"}}/>
                    <div>
                        <label>이미지</label>
                        <input type="file" id="img" name="img" accept="image/*" onChange={handleOnLoadFile} ref={inputRef}/>
                        <p>이미지 크기 조정 <strong className="red">작업중</strong></p>
                    </div>


                    { isImageUploaded && <>
                    <hr style={{marginTop:"10px"}}/>
                    <div  style={{marginTop:"10px"}}> 
                        <button onClick={hideCanvasDrawing} className="text-white bg-blue-700 w-full hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                            그림{ hideImageOnCanvas ? "보이기" : "숨기기" }
                        </button>
                    </div>
                    <hr style={{marginTop:"10px"}}/>
                    <div  style={{marginTop:"10px"}}> 
                        <button onClick={reset} className="text-white bg-blue-700 w-full hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button"> 전체지우기 </button>
                    </div> </>}
                    
                    {(drawContents.length > 0 || isImageUploaded) && <>
                    <hr style={{marginTop:"10px"}}/>
                    <div  style={{marginTop:"10px"}}> 
                        <button onClick={handleOnlyBlockGeneration} className="text-white bg-blue-700 w-full hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button"> 
                            비즈 { generateOnlyBlocks ? "생성하기" : "지우기" }
                        </button>
                    </div></> }

                    <hr style={{marginTop:"10px"}}/>
                    <div className="flex-none flex flex-row justify-between pt-32">
                        <MyButton onClickFunction={handleOnPrintClick} buttonName="출력하기" />
                    </div>
                    
                </div>
            </div>
        }
    
        <img ref={imgRef} className="hidden" alt="Uploading image" />
        {/* <PrintGuide drawContents={drawContents} blockWidth={blockWidth} showPrintDiv={showPrintOpt}/> */}
        { showPrintOpt && <PrintPopUp drawContents={drawContents} blockWidth={blockWidth} showPrintDiv={showPrintOpt} setShowPrintDiv = {setShowPrintOpt} />}


    </div>
}


