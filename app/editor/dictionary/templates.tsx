/**
 * @ 2024.07.21
 * @ 모든 파일에서 공통적으로 사용하는 템플렛들을 선언합니다
 * @ 잦은 수정이 없는 사용하는 템플렛들을 선언합니다.
 */

import { MouseEventHandler } from "react";

export const MyButton = ({onClickFunction, buttonName} : {onClickFunction : MouseEventHandler<HTMLButtonElement> | undefined, buttonName : string}) => <div>
    <button onClick={onClickFunction} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button"> {buttonName} </button>
</div>

export const Alter =  ( { message } : {message : string} ) => <div className="absolute right-10 bottom-0 p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 z-20" role="alert">
    <span className="font-medium">{message}</span> 
</div>

export const DimBackground = ( ) => <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-10" aria-hidden="true"></div> 
// function DropDown({
//     dropdownTitle,
//     dropdownClickAction,
//     dropdownOptions,
//     defaultDropdownValue
// } : {
//     dropdownTitle : string,
//     dropdownClickAction: React.Dispatch<React.SetStateAction<any>>,
//     dropdownOptions : any[],
//     defaultDropdownValue : any
// }) {
//     let [dropdownClickValue, setDropdownClickValue] : [any, Dispatch<SetStateAction<any>>] = useState(defaultDropdownValue);
//     let [dropdownOpened, setDropdownOpened ] : [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);

//     const updateDropdownValue = ( value : any ) => {
//         setDropdownClickValue(value);

//         if(dropdownTitle === "비즈 크기"){
//             value = value.match(/\d/g).join("");
//         }else if(dropdownTitle === "프레임 크기"){
//             value = frames.find(e=>e.name===value);
//         }
        
//         dropdownClickAction(value);
//     };

//     return (
//         <div className="flex flex-col">
//             <label>{dropdownTitle}</label>
//             <button id="dropdownDefaultButton" onClick={()=>setDropdownOpened(!dropdownOpened)} data-dropdown-toggle="dropdown" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
//                 <span>{dropdownClickValue} </span>
//                 { ! dropdownOpened &&
//                 <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
//                     <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7"/>
//                 </svg> }
//                 { dropdownOpened && <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
//                     <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m5 15 7-7 7 7"/>
//                 </svg> }
//             </button>
//             { dropdownOpened && 
//             <div id="dropdown" className="z-s  bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700">
//                 <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
//                     {dropdownOptions.map(optionVal => 
//                         <li key={`dropdown-option-${optionVal}`}>
//                             <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={()=>updateDropdownValue(optionVal)}>{optionVal}</a>
//                         </li>
//                     )}
//                 </ul>
//             </div> }
//         </div>
//     );
// }