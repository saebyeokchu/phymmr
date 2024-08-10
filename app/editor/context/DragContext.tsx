"use client"

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

const DragContext = createContext<
    [
        boolean,
        Dispatch<SetStateAction<boolean>>,
        string,
        string[],
        string,
    ]>(
        [
            false,
            () => {},
            "",
            [],
            ""
        ]
    );

export function DragContextProvider({ children }: { children: React.ReactNode }){
    const [ dragStarted, setDragStarted ] : [ boolean , Dispatch<SetStateAction<boolean>>] =  useState( false );
    let dragStatus : string = "";
    let dragEventRecordSheet : string[] = [];
    let dragColorName : string = "";

    return (
        <DragContext.Provider value={[ dragStarted, setDragStarted, dragStatus, dragEventRecordSheet, dragColorName ]} >
            {children}
        </DragContext.Provider>
        
    )
}

export function useDragContext() {
    const [ dragStarted, setDragStarted , dragStatus, dragEventRecordSheet, dragColorName] = useContext(DragContext);
    return { dragStarted, setDragStarted, dragStatus, dragEventRecordSheet, dragColorName};
}
