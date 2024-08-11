import { DropDown, MyButton } from "../../dictionary/templates";
import { usePrintContext } from "../../context/PrintContext";
import { bizs } from "../../dictionary/variables";

// document.getElementById('drawingDivForPrint')!.innerHTML 
export default function PrintPopUp({
    printGuideRef,
    currentBlockLengthRef
} : {
    printGuideRef : any,
    currentBlockLengthRef : any
}) {
    const printContext = usePrintContext();

    const handleOnButtonClick = () => {
        window.print();
    }

    const handlePrintBlockLengthChange = (value : any) : boolean => {
        console.log(printGuideRef);
        printGuideRef.current.style.transform = 'scale('+(parseInt(value)/parseInt(currentBlockLengthRef.current.value))+')'; 
        console.log(printGuideRef.current.style);

        return true;
    }

    return(
        <>
            {/* <div className="fixed z-35 inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div> */}
            {/* className="border-2 border-black-500"  className={showPrintDiv === false ? "hidden" : ""} ,left:'30%'*/}
            {/* <div dangerouslySetInnerHTML={{ __html:<div></div>}} /> */}
               {/*  style={{width:"210mm", height:"290mm"}} , position:'relative' */}
                                {/* {printContents.map(content => content)}  ${ !printContext.doPrint && "hidden" } ,margin:"20px",marginLeft:"30%" , position:'absolute', top:60,*/}

            <div className={`${ !printContext.doPrint && "hidden" } fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-10` } aria-hidden="true"></div>  

            <div className={`${ !printContext.doPrint && "hidden" }  min-h-64 min-w-64 border-2 border-black-500 bg-white z-10 absolute top-1/3 ` } style={{left : "40%"}} > 
                <h3 className="text-3xl font-bold dark:text-white p-3">출력</h3>
                <small>블럭크기 조정은 10mm일때만 가능하도록 설정</small>
                <div className="p-3 flex flex-col space-y-10">
                   { currentBlockLengthRef.current && currentBlockLengthRef.current.value==="10" && <div>
                        <DropDown 
                            dropdownTitle={"블럭 크기"} dropdownClickAction={handlePrintBlockLengthChange} dropdownOptions={bizs} defaultDropdownValue={10} />
                    </div> }
                    <div className="flex flex-row space-x-4">
                    <MyButton onClickFunction={handleOnButtonClick} buttonName="출력하기" />
                    <MyButton onClickFunction={()=>printContext.setDoPrint(false)} buttonName="닫기" />
                    </div>
                </div>
            </div>

            <div className={`w-full h-auto relative`} id="print-content"  ref={printGuideRef} ></div>

            {/* <div className="p-8">
                        <div id="section-to-print" /> 
                    </div> */}
            {/* <div id="print-content" ref={printGuideRef} style={{width:"210mm", height:"290mm", position:'absolute', top:0, left : 0}} /> */}
        </>
    )
}