"use client"

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

const AlterContext = createContext<
    [
        boolean, 
        Dispatch<SetStateAction<boolean>>,
        string, 
        Dispatch<SetStateAction<string>>
    ]>(
        [
            false,
            () => {},
            '',
            () => {}
        ]
    );

export function AlterContextProvider({ children }: { children: React.ReactNode }){
    const [ turnAlter, setTurnAlter ] : [ boolean , Dispatch<SetStateAction<boolean>>] =  useState( false );
    const [ message, setMessage ] : [ string , Dispatch<SetStateAction<string>>] =  useState( '' );

    

    return (
        <AlterContext.Provider value={[ turnAlter, setTurnAlter, message, setMessage ]} >
            {children}
        </AlterContext.Provider>
        
    )
}

export function useAlterContext() {
    const [ turnAlter, setTurnAlter, message, setMessage  ] = useContext(AlterContext);
    return { turnAlter, setTurnAlter, message, setMessage  };
}
