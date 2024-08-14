import { useEffect } from "react";

import { useAlterContext, useDragContext, useRefContext } from "../../context";
import { DragStateEnum, PaperStateEnum } from "../../lib/constant/enums";
import { PIXEL_TO_MILLI, predefinedFrames } from "../../lib/constant/variables";
import { commonFunction } from "../../lib/functions";
import { drawBlocksByMouseEvent, drawGuidelines } from "../../service/draw";

export default function Paper( {
    blockWindow
} : {
    blockWindow : boolean
}){
    const alterContext  = useAlterContext();
    const refContext = useRefContext();
    const dragContext = useDragContext();

    useEffect(()=>{
        drawGuidelines(refContext, dragContext);
        addDragEventListner();
    }, []);
    
    // useEffect(()=>{
    //     if(!blockWindow){
    //         setCanvasSize();
    //         drawGuidelines(refContext, dragContext);
    //     }
    // },[blockWindow])

    function setCanvasSize() {
        const canvasRef : any = refContext.canvasRef;
        const frNmRef : any = refContext.frNmRef;
        const blockLengthRef : any = refContext.blockLenRef;

        if(canvasRef.current && frNmRef.current){
            const blockLength : number = blockLengthRef.current.value;
            const blockWidthCount : number = predefinedFrames[frNmRef.current.value].width / blockLength;
            const blockHeightCount : number = predefinedFrames[frNmRef.current.value].height / blockLength;

            console.log(predefinedFrames[frNmRef.current.value]);
            console.log(blockWidthCount, blockHeightCount);
            console.log(blockLength * PIXEL_TO_MILLI);

            canvasRef.current.width = ( blockLength /PIXEL_TO_MILLI - 7 ) * blockWidthCount ;
            canvasRef.current.height =( blockLength / PIXEL_TO_MILLI - 7 ) * blockHeightCount ;

            // canvasRef.current.width = predefinedFrames[frNmRef.current.value].width / PIXEL_TO_MILLI;
            // canvasRef.current.height =  predefinedFrames[frNmRef.current.value].height /  PIXEL_TO_MILLI;
        }
    }
    
    function handleOnGuideMouseEvent(mouseEvent : any){
        console.log("[handleOnGuideMouseEvent]");
        drawBlocksByMouseEvent(
            refContext,
            alterContext,
            dragContext,
            mouseEvent
        );
    }

    function addDragEventListner() {
        const guideRef : any = refContext.guideRef;
        const dragStatRef : any = refContext.dragStatRef;

        if(guideRef != null && dragStatRef != null){
            guideRef.current.addEventListener("dragstart",() => {
                dragStatRef.value = DragStateEnum.start;
            })
            guideRef.current.addEventListener("dragover",function(event:any){
                handleOnGuideMouseEvent(event);
            })
            guideRef.current.addEventListener("dragend",()=> {
                dragStatRef.value = DragStateEnum.end;
                dragContext.dragEventRecordSheet = [];
            })
        }

    }

    return (
        <div className="flex w-3/4 h-screen " id="drawCanvas" >
            <div 
                id="guide"
                ref={refContext.guideRef} 
                onClick={(event) => handleOnGuideMouseEvent(event)}
            />
            <canvas id="canvas" className="border-2 border-red-500 absolute" ref={refContext.canvasRef} />
        </div>
    );
}