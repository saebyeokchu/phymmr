import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

import { PriceType, RoomType } from "@/data/Enums";
import { DiffDates, Period } from "@/type/DateType";
import { Price } from "@/type/PriceType";
import { checkIfDisabledDatesInlcuded } from "@/logic/Room";

//sabyeok 2025-03-16 need improvment
export function ModalDate({
  onCloseClick,
  dateValue,
  setDateValue,
  selectedRoomType,
  setGeneralDateInfo
} : {
  onCloseClick : any,
  dateValue : Period,
  setDateValue : any,
  selectedRoomType : RoomType,
  setGeneralDateInfo : any
}) {
  const [targetPrice, setTargetPrice] = useState<any | null>(null);
  const [targetPriceType, setTargetPriceType] = useState<PriceType>(PriceType.All);
  const [totalDateStr, setTotalDateStr] = useState<string>("");
  const [targetDiffs, setTargetDiffs] = useState<DiffDates | null>(null);

  const [disabledDates, setDisabledDates] = useState<any>(null);
  const [isValidDates, setIsValidDates]= useState<boolean>(false);
  const [prices, setPrices]= useState<Price[]>([]);

  const roomContext = useRoomContext();

  React.useEffect(() => {
    setReserveList();
    setGeneralInfo();
  }, []);

  const setReserveList = async () => {
    // const reserves = await GetReserveData(selectedRoomType);
    // if(reserves){
    //   setDisabledDates( makeDateList(reserves.filter(e=> e.roomType == selectedRoomType)));
    // }
  }

  const setGeneralInfo = async () => {
      // const prices = await GetPricesData();

      // if(prices){
      //   setPrices(prices);
      // }
  }

  const setDateValues = (newValue : any) => {

    if(newValue.startDate == null && newValue.endDate==null){
      return;
    }

    // const overlappedList = checkIfDisabledDatesInlcuded(newValue, disabledDates);

    //check minimum length
    const minLengthDays = 7; // Minimum length in days
    const diffInMs = newValue.endDate - newValue.startDate;
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    if (diffInDays < minLengthDays - 1) {
      window.alert("최소 계약일은 일주일입니다.");
      return;
    }

    // if(overlappedList.length > 0 ){
    //   window.alert("이미 예약된 날짜를 포함하였습니다.");
    //   return;
    // }

    setDateValue(newValue);
  }

  const onCheckAvailableClick = () => {
    const startDate = dateValue.startDate;
    const endDate = dateValue.endDate;

    console.log("[onCheckAvailableClick]",startDate, endDate);
    
    if(!startDate || !endDate){
      window.alert("입실일과 퇴실일은 모두 선택하여 주세요")
    }else{
      //data setting
      const overlappedList = checkIfDisabledDatesInlcuded( dateValue.startDate, dateValue.endDate, disabledDates);

      console.log("overlappedList",overlappedList);

      if(
        (overlappedList.room1lap.length > 0 && selectedRoomType == RoomType.Room1) ||
        (overlappedList.room2lap.length > 0 && selectedRoomType == RoomType.Room2)
      ){
        if(!window.confirm("숙박할 수 없는 날이 포함되어 있습니다. 그래도 계속 입실신청을 진행할까요?")){
          return;
        }
      } 

      //set date
      const diffs : DiffDates | null = getTotalDates(dateValue);
      console.log("diffs",diffs);

      if(diffs){
        setTargetDiffs(diffs);
        let requestedPriceType : PriceType = PriceType.All;

        if(diffs.month > 0){
            requestedPriceType = PriceType.month;
        }else if(diffs.month == 0){
            requestedPriceType = PriceType.week;
        }
        console.log("requestedPriceType",requestedPriceType);
        console.log("roomContext.prices",prices);
        

        setTargetPriceType(requestedPriceType);
        setTotalDateStr(`${diffs.month}개월 ${diffs.day}일`);

        //set price
        const searchPrice = getPriceInfo(prices, selectedRoomType, requestedPriceType, diffs);
        console.log("searchPrice",searchPrice);

        if(searchPrice){
          setTargetPrice(searchPrice);
        }else{
          setTargetPrice(null);
        }

        setIsValidDates(true);
      }
    }
  }

  const onSubmitDates = () => {
    //필요한 정보 -> 시작일, 종료일, 보증금, 총 사용료, 계산한 날짜갯수

    const isValidStartDate = dateValue.startDate;
    const isValidEndDate = dateValue.endDate;
    const isValidDeposit = targetPrice && targetPrice.deposit;
    const isValidTotalPrice = targetPrice && targetPrice.totalPrice;
    const isValidTargetDiffs = targetDiffs;

    if(!isValidStartDate){
      window.alert("유효한 입실날짜가 아닙니다.");
      return;
    }

    if(!isValidEndDate){
      window.alert("유효한 퇴실날짜가 아닙니다.");
      return;
    }

    if(!isValidDeposit){
      window.alert("유효한 보증금이 아닙니다. 계산하기 버튼을 눌러 계산결과를 확인해 주세요.");
      return;
    }

    if(!isValidTotalPrice){
      window.alert("유효한 가격이 아닙니다. 계산하기 버튼을 눌러 계산결과를 확인해 주세요.");
      return;
    }

    if(!isValidTargetDiffs){
      window.alert("유효한 계산결과가 아닙니다. 처음부터 다시 시도해주세요.");
      return;
    }

    setGeneralDateInfo({
      deposit : targetPrice.deposit,
      price : targetPrice.totalPrice,
      diffs : targetDiffs
    });
    onCloseClick();

  }

  return (
    <>
      <div className="fixed inset-0 bg-black/50"></div>

      <div className="relative ">
        <div
          id="modal"
          className="bg-white mx-3 hs-overlay fixed inset-0 z-50 flex flex-col items-center justify-center rounded-lg top-14 p-5"
          style={{height:'500px'}}
          role="dialog"
          aria-modal="true"
        >

          <div className="flex flex-row justify-between w-full">
            <div className="flex flex-row space-x-2 text-xl font-bold">
                {selectedRoomType == RoomType.Room1 ? "1번방 " : "2번방 "}
                입실 가능일
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

          <div className="w-full flex flex-col space-y-2 overflow-y-scroll"  style={{height:'400px'}}>
            <div className="mt-2">
              <Datepicker
                  i18n={"ko"}
                  primaryColor={"yellow"}
                  useRange={false}
                  value={dateValue} 
                  onChange={newValue => setDateValues(newValue)}
                  inputClassName="border border-slate-400 py-2 pr-12 w-full rounded-md focus:ring-0"
                  minDate={new Date()} // Disable dates before today
                  disabledDates={disabledDates}
              />
            </div>
            {/* <button onClick={onCheckAvailableClick} type="button" className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-yellow-500 text-white hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600 disabled:opacity-50 disabled:pointer-events-none" >
              검색
            </button> */}

            {/* 입실날짜 퇴실날짜 확인 */}
            <div className=" py-5 flex flex-col space-y-5">
              <div className="flex flex-row justify-between">
                <div>입실날짜</div>
                { dateValue["startDate"] && isValidDates ? 
                  <span> { formatDate(dateValue["startDate"]) } </span> :
                  <span className="text-sm text-slate-400">입실날짜를 선택해주세요</span>
                }
              </div>
              <div className="flex flex-row justify-between">
                <div>퇴실날짜</div>
                { dateValue["endDate"] && isValidDates ? 
                  <span>{formatDate(dateValue["endDate"])} </span> :
                  <span className="text-sm text-slate-400">퇴실날짜를 선택해주세요</span>
                }
              </div>
              <div className="flex flex-row justify-end">
                <div>
                  총 계약 일수 : { totalDateStr }</div>
              </div>
            </div>

            
            {/* 가격확인 */}
            <div className="pt-5 border-t-slate-200 border-t flex flex-col space-y-3">
                <div className="flex flex-row justify-between">
                  <div>보증금</div>
                  <div>{isValidDates && targetPrice && seperateNumber(targetPrice.deposit)}원</div>
                </div>
                <div className="flex flex-row justify-between">
                  <div>사용료</div>
                  <div className="flex flex-col">
                    <div>{ targetPriceType == PriceType.month && isValidDates && targetPrice && `월 ${seperateNumber(targetPrice.orginalPrice)}원`}</div>
                    <div>{ isValidDates && targetPrice && `총 ${seperateNumber(targetPrice.totalPrice)}원` }</div>
                  </div>
                </div> 
                {targetPriceType == PriceType.month && targetPrice.totalPrice && 
                  <div className="text-sm flex justify-end text-end">
                    <span className="text-slate-400">계약기간이 한달이 넘는 경우 월별 {seperateNumber(targetPrice.orginalPrice)}를 지급하고 마지막 달 나머지 사용료{seperateNumber(targetPrice.lastMonthPrice)}를 지불하시면 됩니다.</span>
                    {/* <span className="hover:underline text-blue-400 cursor-pointer">지불스케쥴 보러가기</span> */}
                  </div>
                }
                <div className="flex flex-row space-x-3 justify-end">
                  <div>총사용료</div>
                  <div>{isValidDates && targetPrice && seperateNumber( targetPrice.deposit + targetPrice.totalPrice )}원</div>
                </div>
                <div className="flex flex-row space-x-3 justify-end">
                  <div>계약금(보증금의 10%)</div>
                  <div>{isValidDates && targetPrice && seperateNumber( targetPrice.deposit / 10 )}원</div>
                </div>
            </div>
          </div>

          {/* 확정버튼 */}
          <div className="pt-3 w-full flex justify-center space-x-3">
            <OutlineBadge name={"계산하기"} onClickFunction={onCheckAvailableClick} />
            <OutlineBadge name={"입력하기"} onClickFunction={onSubmitDates} />
          </div>

        </div>
      </div>
    </>
  )
}