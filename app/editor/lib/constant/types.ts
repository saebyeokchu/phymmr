/**
 * @ 2024.07.21
 * @ 모든 파일에서 공통적으로 사용하는 타입을 선언합니다
 * @ 잦은 수정이 없는 타입을 선언합니다.
 */

import { Dispatch, MutableRefObject, SetStateAction } from "react";

type CanvasContextType = {
    blockLength: number;
    setBlockLength: Dispatch<SetStateAction<number>>;
    imageUploadState: string;
    setImageUploadState: Dispatch<SetStateAction<string>>;
    drawingState : string;
    setDrawingState : Dispatch<SetStateAction<string>>;
    imgXRef : any;
    imgYRef : any;
};

type thisBiz = {
    width : number,
    height : number
}

type rgba =  {
    r:number,
    g:number,
    b:number,
    a:number
} | null

type thisColor = { displayColorPicker: false; hex: string; }

type color = {
    hex : string;
    name : string;
}

interface frame {
    width: number;
    height: number;
 }
 
export type {
    CanvasContextType,
    thisBiz,
    thisColor,
    color,
    frame,
    rgba
}