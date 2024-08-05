/**
 * @ 2024.07.21
 * @ 모든 파일에서 공통적으로 사용하는 변수를 선언합니다
 * @ 잦은 수정이 없는 변수를 선언합니다.
 */

import { color, frame } from "./types";

// const frames : frame[] = [
//     {
//         name : "A4",
//         width : 210,
//         height : 297
//     }, {
//         name : "A3",
//         width : 297,
//         height : 420
//     }
// ];

const predefinedFrames : { [id: string]: frame; } = {
    A4  : {
        width : 210,
        height : 297
    },
    A3 : {
        width : 297,
        height : 420
    },
}

//도안 에디터에서 사용하는 비즈의 크기들
const bizs = [10,8,6,4]; 

//생성할 수 있는 biz color는 한정되어 있다
const predefinedColors : [ color[], color[] ] = 
    [
        [ 
            {
                hex : "#000000",
                name : "black"
            },
            {
                hex : "#ffffff",
                name : "white"
            },
            {
                hex : "#73706b",
                name : "grey"
            },
            {
                hex : "#ff0100",
                name : "red"
            },{
                hex : "#fbdf00",
                name : "yellow"
            },{
                hex : "#eee3ab",
                name : "peach"
            },{
                hex : "#fe6e25",
                name : "orange"
            },{
                hex : "#ace711",
                name : "yellowish-green"
            },{
                hex : "#076b37",
                name : "green"
            }
        ],
        [
            {
                hex : "#01299a",
                name : "blue"
            },
            {
                hex : "#2e94d2",
                name : "sky-blue"
            },
            {
                hex : "#5e347e",
                name : "purple"
            },
            {
                hex : "#976cc6",
                name : "light-purple"
            },{
                hex : "#f0607b",
                name : "pink"
            },{
                hex : "#e62947",
                name : "deep-pink"
            },{
                hex : "#d26f2c",
                name : "brown"
            },{
                hex : "#dbaa65",
                name : "light-brown"
            }
        ]
    ];


export {
    // frames,
    bizs,
    predefinedColors,
    predefinedFrames
}
