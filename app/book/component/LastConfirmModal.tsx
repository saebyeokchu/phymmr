import { useEffect, useRef, useState } from "react";

import SignatureCanvas from "react-signature-canvas";
import SignaturePad from "./SignaturePad";

import { LongButton } from "@/app/_component/button";
import { requestEnroll } from "@/service/EnrollService";
import { Period, Reserve, Tenant } from "@/type/RoomType";
import { PriceType, RoomType } from "@/data/Enums";

export function LastConfirmModal({
    onCloseClick,
    newUserName,
    applyingUser,
    roomType,
    generalDateInfo,
    targetDate
} : {
    onCloseClick : any,
    newUserName : string,
    applyingUser : Tenant,
    roomType : RoomType,
    generalDateInfo : {
        deposit : number,
        price : number,
        diffs :  any
    },
    targetDate : Period
}) {
    const [ today, setToday ] = useState('');
    const [imageURL, setImageURL] = useState<string | null>(null);
    const sigCanvas = useRef<SignatureCanvas>(null);
    const [sigEnd, setSigEnd] = useState(false);

    useEffect(()=>{
        const t = new Date();
        const month = t.getMonth() + 1;

        setToday(`${t.getFullYear()}년 ${month}월 ${t.getDate()}일`);
    },[]);

    const submitRequest = () => {

        if(!sigEnd){
            window.alert("확인 서명을 진행해 주세요");
        }

        if (sigCanvas.current) {
            setImageURL(sigCanvas.current.toDataURL("image/png")); // Save as PNG
            
            const reserveInfo : Reserve = {
                id : null,
                roomType : roomType,
                priceType : generalDateInfo.diffs.month > 0 ? PriceType.month : PriceType.week,
                price : generalDateInfo.price,
                deposit : generalDateInfo.deposit,
                startDate : targetDate.startDate!,
                endDate : targetDate.endDate!,
                lastModifiedAt : new Date(),
                approved : false
            };

            requestEnroll(applyingUser, null, reserveInfo, null);
            //saveSignature();
        }
    }

    const saveSignature = () => {
        if (sigCanvas.current) {
          const dataURL = sigCanvas.current.toDataURL("image/png");
          const link = document.createElement("a");
          link.href = dataURL;
          link.download = "signature.png";
          link.click();
        }
      };

    return (
        <>
        <div className="fixed inset-0 bg-black/50"></div>

        <div className={`relative`}>
            <div
                id="modal"
                className="bg-white mx-3 hs-overlay fixed inset-0 z-50 flex flex-col items-center justify-center rounded-lg top-14 p-5"
                style={{height:'500px'}}
                role="dialog"
                aria-modal="true"
            >

                <div className="flex flex-row justify-between w-full">
                    <div className="flex flex-row space-x-2 text-xl font-bold">
                        최종확인
                    </div>
                    <div>
                    <button type="button" className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none " onClick={onCloseClick}>
                        <span className="sr-only">Close</span>
                        <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6 6 18"></path>
                        <path d="m6 6 12 12"></path>
                        </svg>
                    </button>
                    </div>
                </div>

                <div className="w-full flex flex-col space-y-2 overflow-y-scroll h-96 overflow-x-hidden mt-2">

                    {/* content */}
                    <ul className="text-sm space-y-1">
                        <li>0. 입실 요청에 있는 부동산 임대 계약 조건과 쉐어하우스 규칙을 모두 확인하였고 이를 숙지하지 않은 경우 본인에게 생기는 불이익은 본인에게 있습니다.</li>
                        <li>1. 머무름 쉐어하우스는 공용 공간(화장실, 거실, 주방, 베란다, 현관)과 공용물품(현관 신발장, 주방 하부장 등)을 사용함에 동의합니다.</li>
                        <li>2. 머무름 쉐어하우스의 세탁실의 경우 2번방 세입자의 경우 정해진 세탁시간에만 사용할 수 있으며 이를 확인함에 동의합니다. </li>
                        <li>3. 머무름 쉐어하우스의 세입자들은 계약기간을 성실히 준수하며 계약기간이 끝날때까지 사용료를 부담하여야 합니다. </li>
                        <li>4. 머무름 쉐어하우스의 세입자들은 교양 있는 세입자로써 생활하여 조화로운 쉐어하우스 생활을 하여야 합니다.</li>
                        <li>5. 머무름 쉐어하우스의 세입자들은 규칙을 준수하지 않을시 부과되는 경고제도에 동의하며 3회 경고 후 지체없이 퇴실합니다. 이때 환불은 불가능합니다.</li>
                    </ul>

                    {/* signature div */}
                    <div className="flex flex-col justify-center items-center text-center pt-5 space-y-2">
                        <div className="text-sm">{newUserName}은 신청내용을 모두 읽고 확인하였습니다.</div>
                        <div className="font-bold">{today}</div>
                    </div>

                    <SignaturePad imageURL={imageURL} setImageURL={setImageURL} sigCanvas={sigCanvas} setSigEnd={setSigEnd} />
                </div>
                
                {/* 확정버튼 */}
                <div className="pt-3 text-sm">
                    <LongButton name={"계약내용을 모두 이해하고 확인하였습니다."} onClickFunction={()=>submitRequest()}  />
                </div>
            </div>
        </div>
        </>
    )
}