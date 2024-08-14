"use client"
import moment from "moment";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useAlterContext, useCanvasContext, usePrintContext, useRefContext } from "./context";
import { Alter, Loading } from "./component";

import {
    Notice,
    Paper,
    Header,
    Palette,
    PrintDraw
} from "./pages"

import {
    Enums,
    Types,
    Vars
} from './lib/constant';

import { commonFunction } from "./lib/functions";


const basicBlockLength : number = 10;
const basicFrameName : string = "A4";
const basicColorName : string = "black";

const RefInputs = ({refContext, canvasContext} : {refContext : any, canvasContext : Types.CanvasContextType}) => <div id="editorCanvasInputs" className="hidden">
        <input type="text" ref={refContext.colorRef} defaultValue={basicColorName} />
        <input type="string" ref={refContext.frNmRef} defaultValue={basicFrameName} />
        <input type="number" ref={refContext.blockLenRef} defaultValue={basicBlockLength} />
        <input type="string" ref={refContext.dragStatRef} defaultValue={Enums.DragStateEnum.wait} />
        <input type="string" ref={refContext.actionToolRef}  defaultValue={Enums.ActionToolEnum.draw} />
        <input type="number" ref={canvasContext.imgXRef} defaultValue={0}/>
        <input type="number" ref={canvasContext.imgYRef} defaultValue={0}/>
        <input type="string" ref={refContext.paperLockStatRef}  defaultValue={Enums.PaperStateEnum.unlock} />
    </div>

export default function Home() {
    const alterContext  = useAlterContext();
    const canvasContext = useCanvasContext();
    const refContext = useRefContext();
    const printContext = usePrintContext();

    let [ blockWindow, setBlockWindow ] : [boolean, Dispatch<SetStateAction<boolean>> ] = useState(false);
    let [ tempSaveTime, setTempSaveTime ] : [string, Dispatch<SetStateAction<string>> ] = useState('');

    useEffect(()=>{
        checkWindowSize();
        checkTemporalStorage();

        window.onresize = () => {
            checkWindowSize(); //check window size
        }
        console.log("home use effect")
    }, []);


    const checkWindowSize = () => {
        setBlockWindow( window.innerHeight < 700 || window.innerWidth < 1000 ) ;

        if(window.innerHeight < 700 || window.innerWidth < 1000 ){
            setBlockWindow(true);
        }else{
            setBlockWindow(false);
        }
    }

    const checkTemporalStorage = () => {//임시저장 확인
      if (typeof window !== 'undefined' && window.localStorage != null) {
        setInterval(saveDrawing,300000);
      }
    }

    const saveDrawing = () => {
        const guideRef = refContext.guideRef.current;
        if(guideRef.current != null && typeof window != 'undefined'){
            window?.localStorage?.setItem(Vars.TEMP_SAVED_DRAWING, "");
            window?.localStorage?.setItem(Vars.TEMP_SAVED_DRAWING, guideRef.current.innerHTML);
            commonFunction.turnOnAlter(alterContext, "임시저장 완료");
        
            const savedTime : string = moment().format('HH:mm:ss');
            setTempSaveTime(savedTime);
        }
    }

    return (
        <div> 
            <Notice hideMe={true}/>

            <Header tempSaveTime={tempSaveTime} saveDrawing={saveDrawing}/> 

            <div className="nav mx-auto flex items-center p-6">
                { canvasContext.imageUploadState === Enums.ImageUploadStatusEnum.uploading && <Loading loadingText="이미지를 불러오는 중입니다" /> }

                { blockWindow && 
                    <div>
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-10" aria-hidden="true"></div> 
                        <Alter message="화면 크기가 너무 작습니다. 화면 크기를 조정해주세요." />
                    </div>}

                <div className="flex w-full flex-row space-x-10" >
                    <Paper blockWindow={blockWindow} />
                    <Palette />
                </div>
            </div>
                
            { printContext.doPrint &&  <PrintDraw  /> }

            { alterContext.turnAlter &&  <Alter message={alterContext.message}  />}
            
            <RefInputs refContext={refContext} canvasContext={canvasContext}/>

            <div className={`w-full h-auto relative`} id="print-content"  ref={refContext.printRef} />

        </div>

  );
}
 