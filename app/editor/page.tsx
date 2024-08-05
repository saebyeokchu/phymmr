"use client"
import { MutableRefObject, useRef } from "react";
import { useAlterContext } from "@/app/editor/context/AlterContext";

import {
  Header
} from "@/app/editor/component";
import Editor from "./pages/editor/page";


import { Alter } from "./dictionary/templates";

export default function EditorPage() {
  const guideRef : any | never = useRef(undefined);

  const alter  = useAlterContext();
  
  return (
      <div> 
        <div>
            드래그 해서 그리기 작업중 / 이미지 크기 조절하기 작업중 / 비즈 크기 조정하기 작업중
        </div>

        <Header guideRef={guideRef}/>
        <Editor guideRef={guideRef}/>
        
        { alter.turnAlter &&  <Alter message={alter.message}  />  }
      </div>

  );
}
