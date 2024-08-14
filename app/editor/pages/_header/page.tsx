import { Dispatch, SetStateAction, useState } from "react";
import { usePrintContext, useRefContext } from "../../context";

import { MyButton } from "../../component";
import { printService } from "../../service";

export default function Header( {
    tempSaveTime,
    saveDrawing
  } : {
    tempSaveTime : string,
    saveDrawing : () => void
  }) {
  const refContext : any = useRefContext();
  const printContext : any = usePrintContext();

  let [ showDropdownMenu, setShowDropdownMenu ] : [boolean, Dispatch<SetStateAction<boolean>> ] = useState(false);

  const handleOnPrintClick = () => {
    printService.printDrawing(refContext,printContext);
    setShowDropdownMenu(false);
  }
  
  return (
    <div className="nav mx-auto flex items-center justify-between p-6">
    <div>
      <a href="/">
        <img className="w-3" style={{width:'200px'}} src={`/gone-bae-high-resolution-logo-transparent.png`} alt="" />
      </a>
    </div>
    <div className="flex space-x-3">

      { tempSaveTime != '' && <div className="flex flex-row">
        <span>
          <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="m16 10 3-3m0 0-3-3m3 3H5v3m3 4-3 3m0 0 3 3m-3-3h14v-3"/>
          </svg>
        </span>
        <span>{tempSaveTime}</span>
      </div> }

      <MyButton onClickFunction={saveDrawing} buttonName="임시저장" />
      <MyButton onClickFunction={undefined} buttonName="에디터 나가기" />
      <div className="relative">
        <button id="dropdownMenuIconButton" onClick={() => setShowDropdownMenu(!showDropdownMenu)} data-dropdown-toggle="dropdownDots" className="items-center text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600" type="button">
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
            <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/>
          </svg>
        </button>
        { showDropdownMenu &&
        <div id="dropdownDots" className="z-10 absolute right-0 top-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">주문하기</a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={handleOnPrintClick}>출력하기</a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">공유하기</a>
            </li>
          </ul>
          {/* <div className="py-2">
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Separated link</a>
          </div> */}
        </div> 
        }
      </div>
    </div>




  </div>
  );
}
