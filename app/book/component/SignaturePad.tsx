"use client";

import { FilledBadge, OutlineBadge } from "@/app/_component/badge";
import { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";

export default function SignaturePad({
    imageURL, 
    setImageURL,
    sigCanvas,
    setSigEnd
}:{
    imageURL : string | null,
    setImageURL : any,
    sigCanvas : any,
    setSigEnd : any
}) {

  // Function to clear the signature
  const clearSignature = () => {
    sigCanvas.current?.clear();
    setImageURL(null);
    setSigEnd(false);
  };

  return (
    <div className="flex flex-col items-center space-y-4 relative">
        <div className="flex space-x-4 absolute right-1 bottom-3">
            {/* <button onClick={clearSignature} className="px-4 py-2 bg-red-300 text-white rounded-lg">
            Clear
            </button> */}
            <OutlineBadge cnProps="cursor-pointer" onClickFunction={clearSignature} name={"지우기"} />
        </div>
        <div className="border border-gray-300 rounded-lg bg-white w-96 h-48">
            <SignatureCanvas
                ref={sigCanvas}
                penColor="black"
                canvasProps={{
                    width: 384,
                    height: 192,
                    className: "signatureCanvas",
                }}
                onEnd ={()=>setSigEnd(true)}
            />
        </div>
        {/* {imageURL && (
            <div className="mt-4">
            <p className="text-sm text-gray-600">Saved Signature:</p>
            <img src={imageURL} alt="Saved signature" className="border border-gray-300 mt-2 w-96" />
            </div>
        )} */}
    </div>
  );
}