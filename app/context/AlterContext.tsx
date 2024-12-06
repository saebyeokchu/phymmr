"use client"

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

const AlterContext = createContext<
    [
        boolean, 
        Dispatch<SetStateAction<boolean>>,
        boolean, 
        Dispatch<SetStateAction<boolean>>,
        string, 
        Dispatch<SetStateAction<string>>,
        string, 
        Dispatch<SetStateAction<string>>,
        string, 
        Dispatch<SetStateAction<string>>,
        string, 
        Dispatch<SetStateAction<string>>,
    ]>(
        [
            false,
            () => {},
            false,
            () => {},
            '',
            () => {},
            '',
            () => {},
            '',
            () => {},
            '',
            () => {},
        ]
    );

export function AlterContextProvider({ children }: { children: React.ReactNode }){
    const [ turnBanner, setTurnBanner ] : [ boolean , Dispatch<SetStateAction<boolean>>] =  useState( false );
    const [ turnAlter, setTurnAlter ] : [ boolean , Dispatch<SetStateAction<boolean>>] =  useState( false );
    const [ message, setMessage ] : [ string , Dispatch<SetStateAction<string>>] =  useState( '' );
    const [ title, setTitle ] : [ string , Dispatch<SetStateAction<string>>] =  useState( '' );
    const [ actionMessage, setActionMessage ] : [ string , Dispatch<SetStateAction<string>>] =  useState( '' );
    const [ actionLink, setActionLink ] : [ string , Dispatch<SetStateAction<string>>] =  useState( '' );
    

    return (
        <AlterContext.Provider value={[ 
            turnBanner, 
            setTurnBanner,
            turnAlter, 
            setTurnAlter , 
            message, 
            setMessage, 
            title, 
            setTitle,
            actionMessage, 
            setActionMessage,
            actionLink, 
            setActionLink
        ]} >
            {children}
        </AlterContext.Provider>
        
    )
}

export function useAlterContext() {
    const [ turnBanner, 
        setTurnBanner,
        turnAlter, 
        setTurnAlter , 
        message, 
        setMessage, 
        title, 
        setTitle,
        actionMessage, 
        setActionMessage,
        actionLink, 
        setActionLink  ] = useContext(AlterContext);
    return { turnBanner, 
        setTurnBanner,
        turnAlter, 
        setTurnAlter , 
        message, 
        setMessage, 
        title, 
        setTitle,
        actionMessage, 
        setActionMessage,
        actionLink, 
        setActionLink  };
}
