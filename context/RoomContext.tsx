"use client";
import { createContext, useContext, ReactNode } from "react";

import { PriceType, RoomType } from "@/data/Enums";
import { Price } from "@/type/PriceType";
import { Reserve } from "@/type/RoomType";

// Define the type for the reservation state
interface ReserveState {
  startDate: any;
  endDate: any;
}

// Define the type for the context
interface RoomContextType {
  requestedDate: any;
  requestedPriceType : PriceType;
  roomType:RoomType;
  reserveList : Reserve[];
  prices : Price[];
}

// Create Context with a default undefined value to enforce proper usage
const RoomContext = createContext<RoomContextType | undefined>(undefined);

// Provider Component
export function RoomContextProvider({ children }: { children: ReactNode }) {
  const roomType = RoomType.All;
  const requestedDate = {
    startDate : null,
    endDate : null
  };
  const reserveList : Reserve[] = [];
  const prices : Price[] = []; 
  const requestedPriceType : PriceType = PriceType.All;
  

  return (
    <RoomContext.Provider value={{ requestedDate, roomType, reserveList, prices, requestedPriceType }}>
      {children}
    </RoomContext.Provider>
  );
}

// Custom Hook for Using Context
export function useRoomContext() {
  const context = useContext(RoomContext);
  
  if (!context) {
    throw new Error("useRoomContext must be used within a RoomContextProvider");
  }

  return context;
}