import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { predefinedColors } from "../../lib/constant/variables";
import { color } from "../../lib/constant/types";
import { getColorHexByName } from "../../lib/functions/color";
import { useRefContext } from "../../context";

export default function ColorSection() {
    // console.log(getColorHexByName("black"))
    const refContext = useRefContext();

    const [ currentColorName , setCurrentColorName ] : [ string, Dispatch<SetStateAction<string>> ] = useState<string>("");

    useEffect(()=>{
        const colorRef = refContext.colorRef;

        if(colorRef != null){
            setCurrentColorName(colorRef.current.value);
        }
    },[]);

    const handleOnClickColor = (color : color) => {
        const colorRef = refContext.colorRef;

        if(colorRef != null){
            colorRef.current.value=color.name;
            setCurrentColorName(color.name);
        }
    }

    return(
        <div>
            <label>색깔</label>
            <div className="flex flex-col space-y-1">
                {/* <CirclePicker colors={predefinedColors} onChange={handleOnClickColor} /> */}
                {predefinedColors.map(( colors : color[], index : number ) => <div key={`colors-key-${index}`} className="flex flex-row space-x-1"> 
                    { colors.map(color => 
                        <div 
                            key={`color-key-${color.hex}`}
                            className="colorPallete w-8 h-8 rounded-full border border-slate-400" 
                            style={{backgroundColor : color.hex}}
                            onClick={() => handleOnClickColor(color)}></div>) 
                    } 
                    </div>
                )}
            </div>
            { currentColorName &&
                <>
                    <label>현재색깔</label>  
                    <div 
                        key={`current-color-key-${currentColorName}`}
                        className="colorPallete w-8 h-8 rounded-full border border-slate-400" 
                        style={{backgroundColor : getColorHexByName(currentColorName)}}  />
                </>}
        </div>
    );
}