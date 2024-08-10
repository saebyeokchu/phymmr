"use client"

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

const PrintContext = createContext<
    [
        boolean, 
        Dispatch<SetStateAction<boolean>>
    ]>(
        [
            false,
            () => {}
        ]
    );

export function PrintContextProvider({ children }: { children: React.ReactNode }){
    const [ doPrint, setDoPrint ] : [ boolean , Dispatch<SetStateAction<boolean>>] =  useState( false );

    return (
        <PrintContext.Provider value={[ doPrint, setDoPrint ]} >
            {children}
        </PrintContext.Provider>
        
    )
}

export function usePrintContext() {
    const [ doPrint, setDoPrint  ] = useContext(PrintContext);
    return { doPrint, setDoPrint  };
}
