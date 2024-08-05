import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

export default function PrintGuide({drawContents, blockWidth, showPrintDiv} : {drawContents : any[], blockWidth : number, showPrintDiv:boolean}) {
    const printGuideRef : any = useRef(null);
    
    let [ printContents, setPrintContents ] : [ any[], Dispatch<SetStateAction<any[]>> ] = useState([]);

    useEffect(() => {
        var contents : any[] = [];
        drawContents.map(content => {
            
            const printGuide = printGuideRef.current;

            if(printGuide != null){

                var thisTop : number = content.props.style.top;
                var thisLeft : number = content.props.style.left;
                // console.log(thisTop/blockWidth, thisLeft/blockWidth, blockWidth)
                
                
                const element = <img src={content.props.src} width={42} height={42} style={{position:"absolute",top:thisTop/blockWidth*37,left:thisLeft/blockWidth*37,zIndex:30}} />
                contents.push(element);
            }
        });

        setPrintContents(contents);
        // console.log(contents);
    },[drawContents])


    function handleOnPrintGuideClick(clickEvent : any) {
        console.log("[handleOnPrintGuideClick]");
        const printGuide = printGuideRef.current;

        if(printGuide != null){
            var alreadyFilled : boolean = false;
            var contentIndex : number = -1;
            // console.log(clickEvent)
            const rect = printGuide.getBoundingClientRect()
            const x = clickEvent.clientX - rect.left
            const y = clickEvent.clientY - rect.top

            //start point
            const startX = ~~(( (~~(x/37)) * 37 ));
            const startY = ~~(( (~~(y/37)) * 37 ));

            

            //같은 자리에 이미 있는지 찾고, 있으면 삭제하기
            printContents.map((content,index) => {
                const thisTop : number = content.props.style.top;
                const thisLeft : number = content.props.style.left;

                if(startX === thisLeft && startY === thisTop){
                    alreadyFilled = true;
                    contentIndex = index;
                    return;
                }
            });

            // console.log(x, y, " => ", startX, startY,alreadyFilled,contentIndex);

            if(alreadyFilled){
                setPrintContents(printContents.filter((content,index) => index !== contentIndex))
            }else{
                const element = <img src="/block/black-block.png" width={42} height={42} style={{position:"absolute",top:startY,left:startX,zIndex:30}} />;
                setPrintContents([ ... printContents, element]);
            }

        }
    }

    return (
        <div id="section-to-print" className="hidden" >
            <div id="print-content" style={{width:"210mm", height:"290mm", position:'relative'}} ref={printGuideRef}  onClick={handleOnPrintGuideClick}>
            {/* className="border-2 border-black-500"  className={showPrintDiv === false ? "hidden" : ""}*/}
                {printContents.map(content => content)}  
            </div>
        </div> 
             

    );
}

{/* { showPrintOpt && 
        <div >
            <div className="fixed z-10 inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <div className="z-20 absolute left-1/3 top-10 bg-white w-1/3 h-auto border border-slate-900 p-16 space-y-6 ">
                <h3 className="text-3xl font-bold dark:text-white">출력옵션</h3>
                <div className="grid grid-rows-3 grid-flow-col gap-4">
                    <div className="row-span-2 flex flex-col space-y-6">
                        <div>
                            <h4 className="text-2xl font-bold dark:text-white">용지크기</h4>
                            <div className="flex space-x-2">
                                { Object.keys(predefinedFrames).map(frameKey => <button key={`key-${frameKey}`} onClick={() => setSelectedFrameName(frameKey)} className={`${ selectedFrameName === frameKey ? "bg-blue-500 text-white" : "bg-white-500 hover:bg-blue-500 hover:text-white  border border-slate-3"} font-bold py-2 px-4 rounded-full`}>
                                    {frameKey}
                                </button>)}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-2xl font-bold dark:text-white">비즈 크기</h4>
                            <div className="flex space-x-2" >
                                {bizs.map(biz => <button key={`key-${biz}`} onClick={() => {setSelectedBizLength(biz)}} className={`${ selectedBizLength === biz ? "bg-blue-500 text-white" : "bg-white-500 hover:bg-blue-500 hover:text-white  border border-slate-3"} font-bold py-2 px-4 rounded-full`}>
                                    {biz}mm
                                </button>)}
                            </div>
                        </div>
                    </div>
                    <div className="row-span-1 flex align-baseline items-center space-x-2">
                        <button onClick={printDrawing} className="text-white bg-blue-700  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button"> 출력하기 </button>
                        <button onClick={cancelPrint} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button"> 취소하기 </button>
                    </div>width={canvasRef.current.width/10} height={canvasRef.current.height/10} 
                </div>
            </div>
        </div> } */}