import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { MyButton } from "@/app/editor/dictionary/templates";

// document.getElementById('drawingDivForPrint')!.innerHTML 
export default function PrintPopUp({drawContents, blockWidth, showPrintDiv,setShowPrintDiv} : {drawContents : any[], blockWidth : number, showPrintDiv:boolean,setShowPrintDiv:Dispatch<SetStateAction<boolean>>}) {
    const printGuideRef : any = useRef(null);
    let [ printContents, setPrintContents ] : [ any[], Dispatch<SetStateAction<any[]>> ] = useState([]);

    useEffect(() => {
        var contents : any[] = [];
        drawContents.map(content => {
            
            const printGuide = printGuideRef.current;

            if(printGuide != null){

                var thisTop : number = content.props.style.top;
                var thisLeft : number = content.props.style.left;
                console.log(thisTop/blockWidth, thisLeft/blockWidth, blockWidth)
                
                
                const element = <img src={content.props.src} width={42} height={42} style={{position:"absolute",top:thisTop/blockWidth*37,left:thisLeft/blockWidth*37,zIndex:30}} />
                contents.push(element);
            }
        });

        setPrintContents(contents);
        console.log(contents);
    },[drawContents]);

    const handleOnButtonClick = () => {
        window.print();
    }

    return(
        <>
            {/* <div className="fixed z-35 inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div> */}
            {/* className="border-2 border-black-500"  className={showPrintDiv === false ? "hidden" : ""} ,left:'30%'*/}
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-10" aria-hidden="true"></div> 
            {/* <div dangerouslySetInnerHTML={{ __html:<div></div>}} /> */}
            <div className="absolute top-0 h-screen border-2 border-black-500 justify-center text-center content-center bg-white z-10" style={{width:'600px'}}>
                <div className="flex w-full h-full">
                    <div className="p-8">
                        <div className="flex space-x-3">
                            <h3 className="text-3xl font-bold dark:text-white">출력</h3>
                            <MyButton onClickFunction={handleOnButtonClick} buttonName="출력하기" />
                            <MyButton onClickFunction={()=>setShowPrintDiv(false)} buttonName="닫기" />
                        </div>
                        <div id="section-to-print" >
                            <div id="print-content" ref={printGuideRef} style={{width:"210mm", height:"290mm"}} className="absolute left-0 top-0">
                            {/*  style={{width:"210mm", height:"290mm"}} , position:'relative' */}
                                {printContents.map(content => content)}  
                            </div>
                        </div> 
                    </div>
                    {/* <div className=" bg-white border border-slate-900 p-16 space-y-6 ">
                        <div className="flex">
                            <h3 className="text-3xl font-bold dark:text-white">출력</h3>
                            <MyButton onClickFunction={handleOnButtonClick} buttonName="출력하기" />
                            <MyButton onClickFunction={()=>setShowPrintDiv(false)} buttonName="닫기" />
                        </div>
                        <div id="section-to-print" >
                            <div id="print-content" style={{width:"210mm", height:"290mm", position:'relative'}} ref={printGuideRef} >
                                {printContents.map(content => content)}  
                            </div>
                        </div> 
                    </div> */}
                </div>
            </div>
        </>
    )
}