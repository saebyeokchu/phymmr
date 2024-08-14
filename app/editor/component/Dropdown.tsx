/**
 * @ 2024.07.21
 * @ 모든 파일에서 공통적으로 사용하는 템플렛들을 선언합니다
 * @ 잦은 수정이 없는 사용하는 템플렛들을 선언합니다.
 */

import { Dispatch, MouseEventHandler, SetStateAction, useState } from "react";




export function DropDown({
    dropdownTitle,
    dropdownClickAction,
    dropdownOptions,
    defaultDropdownValue
} : {
    dropdownTitle : string,
    dropdownClickAction:  (value: any) => boolean,
    dropdownOptions : any[],
    defaultDropdownValue : any
}) {
    let [dropdownClickValue, setDropdownClickValue] : [any, Dispatch<SetStateAction<any>>] = useState(defaultDropdownValue);
    let [dropdownOpened, setDropdownOpened ] : [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);

    const updateDropdownValue = ( value : any ) => {

        // if(dropdownTitle === "비즈 크기"){
        //     value = value.match(/\d/g).join("");
        // }
        // else if(dropdownTitle === "프레임 크기"){
        //     value = frames.find(e=>e.name===value);
        // }
        
        if(dropdownClickAction(value)){
            setDropdownClickValue(value);
        }
    };

    return (
        <div className="flex flex-col">
            <label>{dropdownTitle}</label>
            <button id="dropdownDefaultButton" onClick={()=>setDropdownOpened(!dropdownOpened)} data-dropdown-toggle="dropdown" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                <span>{dropdownClickValue} </span>
                { ! dropdownOpened &&
                <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7"/>
                </svg> }
                { dropdownOpened && <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m5 15 7-7 7 7"/>
                </svg> }
            </button>
            { dropdownOpened && 
            <div id="dropdown" className="z-s  bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700">
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                    {dropdownOptions.map(optionVal => 
                        <li key={`dropdown-option-${optionVal}`}>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={()=>updateDropdownValue(optionVal)}>{optionVal}</a>
                        </li>
                    )}
                </ul>
            </div> }
        </div>
    );
}