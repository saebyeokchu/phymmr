"use client";

import { AlterContextProvider } from "./AlterContext";
import { GeneralInfoContextProvider } from "./GeneralInfoContext";
import { RoomContextProvider } from "./RoomContext"; 

export default function ContextProviders({ children }: { children: React.ReactNode }) {
  return (
    <AlterContextProvider>
      <GeneralInfoContextProvider>
        <RoomContextProvider>
            {children}
        </RoomContextProvider>
      </GeneralInfoContextProvider>
    </AlterContextProvider>
  );
}