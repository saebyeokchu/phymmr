import { predefinedColors } from "@/app/editor/dictionary/variables";
import { color } from "@/app/editor/dictionary/types";

export default function ColorPalette({handleOnClickColor} : {handleOnClickColor : any}) {
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
        </div>
    );
}