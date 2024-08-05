import { predefinedColors } from "@/app/editor/dictionary/variables";
import { color, rgb } from "@/app/editor/dictionary/types";

function componentToHex(c : number) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex({r,g,b,a} : {r : number, g : number, b : number, a : number}) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function hexToRgb(hex : string) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
    a: 255
  } : null;
}


function isWhite(rgba : rgb) : boolean {
  return (rgba != null && rgba.r === 0 && rgba.g === 0 && rgba.b === 0 && rgba.a < 20)
}

function isBlack(rgba : rgb) : boolean{
  return (rgba != null && rgba.r === 0 && rgba.g === 0 && rgba.b === 0 && rgba.a > 240)
}


function findColosestColor (rgb : rgb, child : any) : string {
    var smallestGap : number = Number.MAX_VALUE;
    var smallestGapColorName : string = "";

    predefinedColors.map(colors => {
        colors.map( color => {
            const givenRgb : rgb = hexToRgb(color.hex);
            if(givenRgb === null || rgb === null) return;

            //sol 1 common case : color distance
            const r : number = (givenRgb.r + rgb.r) * 0.5;
            const diffR : number = Math.pow(givenRgb.r-rgb.r,2);
            const diffG : number = Math.pow(givenRgb.g-rgb.g,2);
            const diffB : number = Math.pow(givenRgb.b-rgb.b,2);
            var  thisGap : number = Math.sqrt(diffR + diffG + diffB);

            //sol 2 case for human eyes
            if(r<128){
              thisGap = Math.sqrt(2*diffR + 4*diffG + 3*diffB);
            }else{
              thisGap = Math.sqrt(3*diffR + 4*diffG + 2*diffB);
            }

            if(thisGap < smallestGap){
                smallestGap = thisGap;
                smallestGapColorName = color.name;
            }
            // console.log(givenRgb, rgb, diffR,diffG,diffB);
        })
    });

    // console.log(child, rgb, "와 가장 가까운 값은 ",smallestGapColorName);
    // console.log("*****************************************");

    return smallestGapColorName;
}

export {
    findColosestColor,
    isBlack,
    isWhite
}