"use client"

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";
import { ImageUploadStatusEnum } from "../dictionary/types";

const CanvasContext = createContext<
    [
        number, 
        Dispatch<SetStateAction<number>>,
        string, 
        Dispatch<SetStateAction<string>>,
        string, 
        Dispatch<SetStateAction<string>>
    ]>(
        [
            0,
            () => {},
            "",
            () => {},
            "",
            () => {}
        ]
    );

export function CanvasContextProvider({ children }: { children: React.ReactNode }){
    let [ blockLength, setBlockLength ] : [ number , Dispatch<SetStateAction<number>>] =  useState(10);
    let [ imageUploadState , setImageUploadState ]  : [string , Dispatch<SetStateAction<string>> ] = useState<string>(ImageUploadStatusEnum.wait);
    let [ actionTool, setActionTool ] : [string,Dispatch<SetStateAction<string>>] = useState<string>("draw");


    return (
        <CanvasContext.Provider value={[ blockLength, setBlockLength, imageUploadState , setImageUploadState, actionTool, setActionTool ]} >
            {children}
        </CanvasContext.Provider>
        
    )
}

export function useCanvasContext() {
    const [ blockLength, setBlockLength, imageUploadState , setImageUploadState, actionTool, setActionTool  ] = useContext(CanvasContext);
    return { blockLength, setBlockLength, imageUploadState , setImageUploadState, actionTool, setActionTool  };
}
