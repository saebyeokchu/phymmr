import { ActionToolEnum, BlockDivStateEnum, Direction, DragStateEnum, PaperStateEnum } from "../lib/constant/enums";
import { rgba } from "../lib/constant/types";
import { PIXEL_TO_MILLI, predefinedColors, predefinedFrames } from "../lib/constant/variables";
import { colorFunction, commonFunction, imageFunction } from "../lib/functions";

function resetImageLocation(
    canvasRef : any,
    imgRef : any,
    startXRef : any,
    startYRef  : any
) {
    console.log("[resetImageLocation]");
    moveImageLocationOnCanvas(canvasRef, imgRef, startXRef, startYRef, undefined, [0, 0]);
    startXRef.current.value = 0, startYRef.current.value = 0;
}

function moveImageLocationOnCanvas(
    canvasRef : any,
    imgRef : any,
    startXRef : any,
    startYRef  : any,
    direction : Direction | undefined ,
    givenLocation : [ number, number ] | undefined
) {
    var ctx = canvasRef.current.getContext("2d");
    const imgWidth : number = imageFunction.getImageWidthAndHeight(imgRef.current).width;
    const imgHeight : number = imageFunction.getImageWidthAndHeight(imgRef.current).height;
    let startY : number = parseInt(startYRef.current.value);
    let startX : number = parseInt(startXRef.current.value);

    if(imgWidth > -1 && imgHeight > -1){
        if(givenLocation != undefined){
            startXRef.current.value = givenLocation[0];
            startYRef.current.value = givenLocation[1];
        }

        if(direction != undefined) {
            switch(direction){
                case Direction.up :
                    startYRef.current.value = startY - 1;
                    break;
                case Direction.down :
                    startYRef.current.value = startY + 1;
                    break;
                case Direction.left :
                    startXRef.current.value = startX - 1;
                    break;
                case Direction.right :
                    startXRef.current.value = startX + 1;
                    break;
            }
        }
        
        startY = parseInt(startYRef.current.value);
        startX = parseInt(startXRef.current.value);

        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.drawImage(imgRef.current,startX,startY,imgWidth,imgHeight);
    }
}

function drawBlocksByImageInfo(
    canvasRef : any,
    guideRef : any,
    currentBlockLengthRef : any
) {
    const ctx = canvasRef.current.getContext("2d");

    var firstXPosition =  guideRef.current.children.item(0).getBoundingClientRect().x;
    var firstYPosition =  guideRef.current.children.item(0).getBoundingClientRect().y;

    //https://stackoverflow.com/questions/2541481/get-average-color-of-image-via-javascript
    for(let child of guideRef.current.children){ 
        if(child.className.search('blockDiv') > -1){ // block 부분을 클릭했을때
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
                var rgba : rgba = {r:0,g:0,b:0,a:0};
                count++;

                rgba.r = imageData.data[j];
                rgba.g = imageData.data[j+1];
                rgba.b = imageData.data[j+2];
                rgba.a = imageData.data[j+3];

                if(colorFunction.isBlack(rgba)){
                    colorClassDictionary["black"] ++;
                }else if(colorFunction.isWhite(rgba)){
                    colorClassDictionary["white"] ++;
                }else{
                    colorClassDictionary[colorFunction.findColosestColor(rgba, child)] ++;
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
        }
    }
}

function drawBlocksByMouseEvent(
    refContext : any,
    alterContext : any,
    dragContext : any,
    mouseEvent : any
){
    if(refContext.paperLockStatRef.current.value === PaperStateEnum.lock){
        commonFunction.turnOnAlter(alterContext, "이미지 조정하기가 켜져있습니다");
        return;
    }

    let guideRef : any = refContext.guideRef.current;
    let blockLengthRef : any = refContext.blockLenRef.current;
    let colorRef : any = refContext.colorRef.current;
    let dragStateRef : any = refContext.dragStatRef.current;
    let actionToolRef : any = refContext.actionToolRef.current;
    let canvasRef : any = refContext.canvasRef.current;

    if(guideRef != null && blockLengthRef != null && colorRef != null && canvasRef != null){  
        const rect = guideRef.getBoundingClientRect();
        const x = mouseEvent.clientX - rect.left;
        const y = mouseEvent.clientY - rect.top;
    
        const blockLength : number = blockLengthRef.value / PIXEL_TO_MILLI;

        //start point
        const overlappedInPixcel : number = 7;
        const startX = ~~(( (~~(x/(blockLength - overlappedInPixcel)) * (blockLength - overlappedInPixcel)))) ;
        const startY = ~~(( (~~(y/(blockLength - overlappedInPixcel)) * (blockLength - overlappedInPixcel)))) ;
        // console.log(`${x} => ${startX}, ${y} => ${startY}`);

        //canvas 넘어가면 deny
        if(startX > canvasRef.width || startY > canvasRef.height || startX < 0 || startY < 0 ){
            return;
        }
        
        //같은 자리에 이미 있는지 찾고, 있으면 삭제하기
        const guideImageElementList : any = document.getElementsByClassName("guideImageElement");
        const [row, col] : [number, number] = mouseEvent.target.id.split("-");
        let targetImgId : string | undefined = undefined;
        let blockDivStat : BlockDivStateEnum = BlockDivStateEnum.empty;
        let color : string = colorRef.value;

        for(let guideImage of guideImageElementList){
            //src, top, left
            const thisSrc : string = guideImage.currentSrc;
            const thisTop : number = parseInt(guideImage.style.top.replace("px",""));
            const thisLeft : number = parseInt(guideImage.style.left.replace("px",""));

            // console.log(startX, thisLeft, startY, thisTop);
            const isRelavantDiv : boolean = Math.abs(startX - thisLeft) < 5 && Math.abs(startY - thisTop) < 5 ;
            if(isRelavantDiv){
                blockDivStat = thisSrc.search(color) === -1 ? BlockDivStateEnum.willColorChange : BlockDivStateEnum.alreadyFilled;
                targetImgId = guideImage.id;
                break;
            }
        }
    
        const keyName = `${row}-${col}-${color}`;
        const dragState : DragStateEnum = dragStateRef.value;

        //drag인 경우 이번 start version에서 한번도 방문을 했는지 안했는지 체크
        let blockDrawByDrag : boolean = false;
    
        if(dragState === DragStateEnum.start) { //drag event 가 어디에선가라도 출발했으면 중복체크하기
            if(dragContext.dragEventRecordSheet.length > 0 && dragContext.dragEventRecordSheet.includes(keyName)){
                blockDrawByDrag = true;
            }else{
                dragContext.dragEventRecordSheet.push(keyName);
            }
        }
        
        const imgSrc = `/block/${color}-block.png`;

        if(!blockDrawByDrag){
            const actionTool : ActionToolEnum = actionToolRef.value;
            if(targetImgId != undefined){
                const targetBlock : any = document.getElementById(targetImgId);
                if(targetBlock){
                    switch(actionTool){
                        case ActionToolEnum.erase :
                            console.log("[removeblock]");
                            targetBlock.remove();
                            break;
                        case ActionToolEnum.draw :
                            console.log("[changecolorofblock]");
                            targetBlock.src = imgSrc;
                            break;
                    }
                }
            }else if(targetImgId === undefined && actionTool === ActionToolEnum.draw){
                console.log("[createblock]");
                const imgStr : string = "<img id='" + keyName + "'  class=\"guideImageElement\" width=\""+(blockLength)+"\" src='" + imgSrc + "' style='position : absolute;top:"+startY+"px;left:"+startX+"px;z-index:6' />"
                guideRef.insertAdjacentHTML('beforeend', imgStr);
            }
    
            // if(printGuideRef.current != null){
            //     printGuideRef.current.innerHTML = guide.innerHTML;
            // }
            
        }
    }

    
}

function drawGuidelines(refContext : any, dragContext : any){
    const guideRef : any = refContext.guideRef;
    const blockLenRef : any = refContext.blockLenRef;
    const frNmRef : any = refContext.frNmRef;
    const dragStatRef : any = refContext.dragStatRef;

    const guide = guideRef.current;
    const blockLen = blockLenRef.current;
    const frNm = frNmRef.current;
    const dragState = dragStatRef.current;

    if(guide != null && blockLen != null && frNm != null && dragState != null){
        guide.innerHTML = '';
        dragContext.dragEventRecordSheet = [];

        const currentBlockLengthInMM : number = blockLen.value;
        const currentBlockLengthInPixcel : number = currentBlockLengthInMM / PIXEL_TO_MILLI - 7;
        const frWidth : number = predefinedFrames[frNm.value].width;
        const frHeight : number = predefinedFrames[frNm.value].height;
        
        // guide.style.width = `${frWidth  / PIXEL_TO_MILLI}px`;
        // guide.style.height = `${frHeight  / PIXEL_TO_MILLI}px`;
        guide.style.width = `${refContext.canvasRef.current.width}px`;
        guide.style.height = `${refContext.canvasRef.current.height}px`;

        // console.log( 210 / PIXEL_TO_MILLI /  currentBlockLength);
        //비즈 크기만큼 사각형 생성 1 px = 0.265 mm
        let blockRowCount : number = ~~( frWidth  / currentBlockLengthInMM);
        let blockColCount : number =  ~~( frHeight  / currentBlockLengthInMM);

        guide.style.gridTemplateColumns = `repeat(${blockRowCount}, ${currentBlockLengthInPixcel}px)`;
        guide.style.gridTemplateRows = `repeat(${blockColCount},  ${currentBlockLengthInPixcel}px)`;

        console.log("[blockLength, widthBizNum , heightBizNum , total biz count] : [",
            currentBlockLengthInPixcel, blockRowCount , blockColCount , blockRowCount*blockColCount , "]");

        //populate guide so div can display
        let rowIndex : number = 1;
        let colIndex : number = 1;
        
        [ ... Array(Math.floor(blockRowCount*blockColCount)) ].forEach((index) => {
            if(rowIndex > blockRowCount){
                rowIndex = 1;
                colIndex ++;
            }

            if(colIndex > blockColCount){
                colIndex = 1;
            }

            guide.insertAdjacentHTML("beforeend","<div draggable='true' id='"+rowIndex+"-"+colIndex+"' class='blockDiv'></div>");
            rowIndex ++;
        });
        
        //20240812 print drag 잠시 후에 ~

        // guideRef.current.addEventListener("dragstart",() => {
        //     dragStatRef.value = DragStateEnum.start;
        // })
        // guideRef.current.addEventListener("dragover",function(event:any){
        //     drawBlocksByMouseEvent(event);
        // })
        // guideRef.current.addEventListener("dragend",()=> {
        //     dragStatRef.value = DragStateEnum.end;
        //     dragContext.dragEventRecordSheet = [];
        // })

    //     //draw print guide
    //     if(printRef.current != null ) {
    //         // A4기준
    //         printRef.current.style.width = blockLengthInput * bizRowCount + "px";  
    //         printRef.current.style.height = blockLengthInput * bizColCount + "px";
    //     }
    }

}

export {
    resetImageLocation,
    moveImageLocationOnCanvas,
    drawBlocksByImageInfo,
    drawBlocksByMouseEvent,
    drawGuidelines
}