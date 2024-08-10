import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { MyButton } from "@/app/editor/dictionary/templates";
import { usePrintContext } from "@/app/editor/context/PrintContext";
import { calculateBackgorundSize } from "../../logic/size";

// document.getElementById('drawingDivForPrint')!.innerHTML 
export default function PrintPopUp({
    printGuideRef
} : {
    printGuideRef : any,
}) {
    const printContext = usePrintContext();

    useEffect(()=>{
        initPrintDivSize(); //draw guideline
    }, []);

    function initPrintDivSize() {
        const [ drawingBackgroundWidth, drawingBackgroundHeight ] = calculateBackgorundSize("A4");

        const printRef = printGuideRef.current;

        if(printRef === null){
            return;
        }

        printRef.style.width = `${drawingBackgroundWidth}px`;
        printRef.style.height = `${drawingBackgroundHeight}px`;
    }

    const handleOnButtonClick = () => {
        window.print();
    }

    return(
        <>
            {/* <div className="fixed z-35 inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div> */}
            {/* className="border-2 border-black-500"  className={showPrintDiv === false ? "hidden" : ""} ,left:'30%'*/}
            {/* <div dangerouslySetInnerHTML={{ __html:<div></div>}} /> */}
               {/*  style={{width:"210mm", height:"290mm"}} , position:'relative' */}
                                {/* {printContents.map(content => content)}  ${ !printContext.doPrint && "hidden" } ,margin:"20px",marginLeft:"30%" , position:'absolute', top:60,*/}

            <div className={`${ !printContext.doPrint && "hidden" } fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-10` } aria-hidden="true"></div>  
            <div className={`${ !printContext.doPrint && "hidden" }  flex flex-col absolute h-screen top-0 border-2 border-black-500 justify-center text-center content-center bg-white z-10` } style={{width:'600px',padding:'8px'}}> 
                <div className="flex w-full h-full">
                    <div id="print-content" className="absolute top-0" ref={printGuideRef} style={{width:"210mm", height:"290mm", border:"1px solid black"}} />

                    {/* <div className="p-8">
                        <div id="section-to-print" /> 
                    </div> */}
                </div>
                <div className="flex space-x-3">
                    <h3 className="text-3xl font-bold dark:text-white">출력</h3>
                    <MyButton onClickFunction={handleOnButtonClick} buttonName="출력하기" />
                    <MyButton onClickFunction={()=>printContext.setDoPrint(false)} buttonName="닫기" />
                </div>
            </div>

            {/* <div id="print-content" ref={printGuideRef} style={{width:"210mm", height:"290mm", position:'absolute', top:0, left : 0}} /> */}
        </>
    )
}