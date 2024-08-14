"use client"

import { createContext, Dispatch, LegacyRef, MutableRefObject, ReactNode, SetStateAction, useContext, useRef, useState } from "react";
import { ImageUploadStatusEnum } from "../lib/constant/enums";
import { CanvasContextType } from "../lib/constant/types";

const CanvasContext = createContext<
    [
        number, 
        Dispatch<SetStateAction<number>>,
        string, 
        Dispatch<SetStateAction<string>>,
        string, 
        Dispatch<SetStateAction<string>>,
        any,
        any
    ]>(
        [
            0,
            () => {},
            "",
            () => {},
            "",
            () => {},
            -1,
            -1
        ]
    );

export function CanvasContextProvider({ children }: { children: React.ReactNode }){
    let [ blockLength, setBlockLength ] : [ number , Dispatch<SetStateAction<number>>] =  useState(10);
    let [ imageUploadState , setImageUploadState ]  : [string , Dispatch<SetStateAction<string>> ] = useState<string>(ImageUploadStatusEnum.wait);
    let [ drawingState , setDrawingState ]  : [string , Dispatch<SetStateAction<string>> ] = useState<string>(ImageUploadStatusEnum.wait);
    
    //image on canvas
    const imgXRef : any = useRef<number>(-1);
    const imgYRef : any = useRef<number>(-1);

    return (
        <CanvasContext.Provider value={[ blockLength, setBlockLength, imageUploadState , setImageUploadState, drawingState , setDrawingState, imgXRef, imgYRef  ]} >
            {children}
        </CanvasContext.Provider>
        
    )
}

export function useCanvasContext() : CanvasContextType {
    const [ blockLength, setBlockLength, imageUploadState , setImageUploadState,  drawingState , setDrawingState, imgXRef, imgYRef   ] = useContext(CanvasContext);
    return { blockLength, setBlockLength, imageUploadState , setImageUploadState,  drawingState , setDrawingState, imgXRef, imgYRef   };
}
