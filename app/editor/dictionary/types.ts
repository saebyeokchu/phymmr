/**
 * @ 2024.07.21
 * @ 모든 파일에서 공통적으로 사용하는 타입을 선언합니다
 * @ 잦은 수정이 없는 타입을 선언합니다.
 */

type thisBiz = {
    width : number,
    height : number
}

// type frame = {
//     name: string,
//     width : number,
//     height : number
// }

type rgb =  {
    r:number,
    g:number,
    b:number,
    a:number
} | null

type thisColor = { displayColorPicker: false; hex: string; }

type color = {
    hex : string;
    name : string;
}

interface frame {
    width: number;
    height: number;
 }
 
export type {
    thisBiz,
    thisColor,
    color,
    frame,
    rgb
}