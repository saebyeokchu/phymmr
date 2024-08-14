"use client"

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useRef, useState } from "react";

type RefContextType = [
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any
 ];

const RefContext = createContext<RefContextType>(
        [
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined
        ]
    );

export function RefContextProvider({ children }: { children: React.ReactNode }){
    const canvasRef : any = useRef(undefined);
    const guideRef : any = useRef(undefined);
    const printRef : any = useRef(undefined);

    //user select value
    const frNmRef : any = useRef(undefined);
    const blockLenRef : any = useRef(undefined);
    const colorRef : any = useRef(undefined);
    const actionToolRef : any = useRef(undefined);

    //state value
    const dragStatRef : any = useRef(undefined);
    const paperLockStatRef : any = useRef(undefined);

    return (
        <RefContext.Provider value={[ canvasRef, guideRef, printRef, frNmRef, blockLenRef, dragStatRef, paperLockStatRef, colorRef, actionToolRef ]} >
            {children}
        </RefContext.Provider>
        
    )
}

export function useRefContext() {
    const [ canvasRef, guideRef, printRef, frNmRef, blockLenRef, dragStatRef, paperLockStatRef, colorRef, actionToolRef  ] = useContext(RefContext);
    return { canvasRef, guideRef, printRef, frNmRef, blockLenRef, dragStatRef, paperLockStatRef, colorRef, actionToolRef };
}
