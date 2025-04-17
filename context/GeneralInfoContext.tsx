"use client";

import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

// Define the type for the reservation state


// Define the type for the context
interface GeneralInfoType {
}

// Create Context with a default undefined value to enforce proper usage
const GeneralInfoContext = createContext<GeneralInfoType | undefined>(undefined);

// Provider Component
export function GeneralInfoContextProvider({ children }: { children: ReactNode }) {
  return (
    <GeneralInfoContext.Provider value={{  }}>
      {children}
    </GeneralInfoContext.Provider>
  );
}

// Custom Hook for Using Context
export function useGeneralInfoContext() {
  const context = useContext(GeneralInfoContext);
  
  if (!context) {
    throw new Error("useRoomContext must be used within a GeneralInfoContextProvider");
  }

  return context;
}