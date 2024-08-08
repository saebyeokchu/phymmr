import { Dispatch, MutableRefObject, SetStateAction, useEffect, useState } from "react";
import { MyButton } from "../dictionary/templates";
import { useAlterContext } from "../context/AlterContext";
import { turnOnAlter } from "../dictionary/functions";
import moment from 'moment';
import { AWS_IMAGE_S3_URL } from "../dictionary/variables";
import { usePrintContext } from "../context/PrintContext";

export default function Header( {guideRef} : { guideRef: any | never }) {

  const alter  = useAlterContext();
  const printContext = usePrintContext();

  let [ showDropdownMenu, setShowDropdownMenu ] : [boolean, Dispatch<SetStateAction<boolean>> ] = useState(false);
  let [ temporaliySaveTime, setTemporaliySaveTime ] : [string, Dispatch<SetStateAction<string>> ] = useState('');
  
  useEffect(()=>{
      //임시저장 확인
      if (typeof window !== 'undefined' && window.localStorage != null) {
        setInterval(handleTemporilySave,300000);
      }
  },[]);

  const handleTemporilySave = () => {
    if(guideRef.current === null || typeof window === 'undefined'){
        return;
    }

    window?.localStorage?.setItem("bizTempSave", "");
    window?.localStorage?.setItem("bizTempSave", guideRef.current.innerHTML);
    turnOnAlter(alter, "임시저장 완료");

    const savedTime : string = moment().format('HH:mm:ss');
    setTemporaliySaveTime(savedTime);
}

const handleOnPrintClick = () => {
  printContext.setDoPrint(true);
}


  return (
    <div className="nav mx-auto flex items-center justify-between p-6">
    <div>
      <a href="/">
        <img className="w-3" style={{width:'200px'}} src={`${AWS_IMAGE_S3_URL}/gone-bae-high-resolution-logo-transparent.png`} alt="" />
      </a>
    </div>
    <div className="flex space-x-3">
      { temporaliySaveTime != '' && <div className="flex flex-row">
        <span>
          <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m16 10 3-3m0 0-3-3m3 3H5v3m3 4-3 3m0 0 3 3m-3-3h14v-3"/>
          </svg>
        </span>
        <span>{temporaliySaveTime}</span>
      </div> }
      <MyButton onClickFunction={handleTemporilySave} buttonName="임시저장" />
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