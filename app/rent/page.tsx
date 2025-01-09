"use client"

import { useState } from "react"
import { FilledBadge, OutlineBadge } from "../_component/badge"
import { CenterClassName } from "../_data/Consts"
import { GusestState } from "../_data/Enums"
import DepositGraph from "./DepositGraph"

const CheckIn = () => <div className="mt-5 rounded-md p-3">
    <div className="pt-3 h-full text-center justify-center items-center content-center place-items-center justify-items-center self-center place-content-center">
    <h2 className="text-2xl text-gray-800 font-bold sm:text-2xl   ">
        입실절차
    </h2>
    </div>
    <nav className="grid bg-slate-100  gap-4 mt-5 md:mt-10" aria-label="Tabs" role="tablist" aria-orientation="vertical">
    <button type="button" className="cursor-default text-start p-4 md:p-5 rounded-xl     active" id="tabs-with-card-item-1" aria-selected="true" data-hs-tab="#tabs-with-card-1" aria-controls="tabs-with-card-1" role="tab">
        <span className="flex gap-x-6">
        <h2 className="text-2xl text-gray-800 font-bold sm:text-2xl   ">
            1
        </h2>
        <span className="grow">
            <span className="block text-lg font-semibold hs-tab-active:text-blue-600 text-gray-800">온라인 룸투어</span>
            <span className="block mt-1 text-gray-800">
            포항역 머무름 공식웹사이트(
                <a className="underline text-blue-400" href="https://www.youtube.com/watch?v=GZxUT5Jtw24">1번방</a>/
                <a className="underline text-blue-400" href="https://www.youtube.com/watch?v=GZxUT5Jtw24">2번방</a>)이나 
            유튜브(<a className="underline text-blue-400" href="https://www.youtube.com/watch?v=GZxUT5Jtw24">링크</a>)에 기재된 영상을 이용해 룸 투어를 진행합니다.
            </span>
        </span>
        </span>
    </button>

    <button type="button" className="cursor-default text-start p-4 md:p-5 rounded-xl    " id="tabs-with-card-item-2" aria-selected="false" data-hs-tab="#tabs-with-card-2" aria-controls="tabs-with-card-2" role="tab">
        <span className="flex gap-x-6">
        <h2 className="text-2xl text-gray-800 font-bold sm:text-2xl   ">
            2
        </h2>
        <span className="grow">
            <span className="block text-lg font-semibold hs-tab-active:text-blue-600 text-gray-800">입실 가능 여부 확인</span>
            <span className="block mt-1 text-gray-800">
            원하시는 기간에 포항역 머무름에 입실이 가능한지 확인할 수 있습니다
            </span>
            <span className="cursor-pointer underline text-blue-400 block mt-1 text-sm ">
            입실 가능일 확인하기 
            </span>
        </span>
        </span>
    </button>

    <button type="button" className="cursor-default text-start p-4 md:p-5 rounded-xl    " id="tabs-with-card-item-2" aria-selected="false" data-hs-tab="#tabs-with-card-2" aria-controls="tabs-with-card-2" role="tab">
        <div className="flex gap-x-6">
        <h2 className="text-2xl text-gray-800 font-bold sm:text-2xl   ">
            3
        </h2>
        <div className="grow">
            <span className="block text-lg font-semibold hs-tab-active:text-blue-600 text-gray-800">계약서 작성</span>
            <span className="block mt-1 text-gray-800">
            온라인 계약서 작성 후 입실을 진행합니다. 입실시 온라인으로 계약서를 작성하게 되며 메이트님의 안전을 위해 경우에 따라 신분증, 재직증명서를 요구할 수 있습니다.
            </span>
            <div className="border-2 rounded-lg border-slate-600 w-full mt-2 py-3 text-center">온라인 임대차 계약서 작성</div>
            <div className="w-full mt-2 py-1 flex justify-center items-center content-center place-items-center justify-items-center self-center place-content-center ">
            <svg className="w-6 h-6 text-gray-800  " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19V5m0 14-4-4m4 4 4-4"/>
            </svg>
            </div>
            <div className="border-2 rounded-lg border-slate-600 w-full mt-2 py-3 text-center">
            <p>검토 후 관련서류 요청</p>
            <p className="text-sm">(신분증, 재직증명서 등)</p>
            </div>
            <div className="w-full mt-2 py-1 flex justify-center items-center content-center place-items-center justify-items-center self-center place-content-center ">
            <svg className="w-6 h-6 text-gray-800  " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19V5m0 14-4-4m4 4 4-4"/>
            </svg>
            </div>
            <div className="border-2 rounded-lg border-slate-600 w-full mt-2 py-3 text-center">
            <p>계약금 입금</p>
            <p className="text-sm">보증금의 10%</p>
            </div>
            <div className="w-full mt-2 py-1 flex justify-center items-center content-center place-items-center justify-items-center self-center place-content-center ">
            <svg className="w-6 h-6 text-gray-800  " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19V5m0 14-4-4m4 4 4-4"/>
            </svg>
            </div>
            <div className="border-2 rounded-lg border-slate-600 w-full mt-2 py-3 text-center">
            <p>입실 당일 잔금 입금</p>
            <p className="text-sm">잔여보증금과 계약서상의 사용료</p>
            </div>
            <div className="w-full mt-2 py-1 flex justify-center items-center content-center place-items-center justify-items-center self-center place-content-center ">
            <svg className="w-6 h-6 text-gray-800  " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19V5m0 14-4-4m4 4 4-4"/>
            </svg>
            </div>
            <div className="border-2 rounded-lg border-slate-600 w-full mt-2 py-3 text-center">
            <p>머무름 홈페이지 아이디 / 비밀번호 발급</p>
            <p className="text-sm">월세, 보증금, 퇴실카운트, 연장신청, 사용법 등 확인가능</p>
            </div>
        </div>
        </div>
    </button>

    </nav>
</div>

const CheckOut = ({
    setShowDepositExample
}:{
    setShowDepositExample : any
}) => <div className="mt-5 rounded-md p-3">
    <div className="pt-3 h-full text-center justify-center items-center content-center place-items-center justify-items-center self-center place-content-center">
        <h2 className="text-2xl text-gray-800 font-bold sm:text-2xl   ">
            퇴실절차
        </h2>
    </div>
    <nav className="grid bg-slate-100 gap-4 mt-5 md:mt-10" aria-label="Tabs" role="tablist" aria-orientation="vertical">
    <button type="button" className="cursor-default text-start p-4 md:p-5 rounded-xl     active" id="tabs-with-card-item-1" aria-selected="true" data-hs-tab="#tabs-with-card-1" aria-controls="tabs-with-card-1" role="tab">
        <span className="flex gap-x-6">
        <h2 className="text-2xl text-gray-800 font-bold sm:text-2xl   ">
            1
        </h2>
        <span className="grow">
            <span className="block text-lg font-semibold hs-tab-active:text-blue-600 text-gray-800 ">퇴실 여부 공유</span>
            <span className="block mt-1 text-gray-800 ">
                마이페이지에서 설문에 응답하거나 카카오톡으로 개별 연락하여 최소 2주 전 퇴실 및 연장 여부 통보해주세요.
            </span>
            <span className="block mt-1 text-gray-800 ">
                <a className="cursor-pointer underline text-sm text-blue-400">퇴실 여부 설정하기</a>
            </span>
        </span>
        </span>
    </button>

    <button type="button" className="cursor-default text-start p-4 md:p-5 rounded-xl    " id="tabs-with-card-item-2" aria-selected="false" data-hs-tab="#tabs-with-card-2" aria-controls="tabs-with-card-2" role="tab">
        <span className="flex gap-x-6">
        <h2 className="text-2xl text-gray-800 font-bold sm:text-2xl   ">
            2
        </h2>
        <span className="grow">
            <span className="block text-lg font-semibold hs-tab-active:text-blue-600 text-gray-800 ">퇴실 청소 및 카드키 반납</span>
            <span className="block mt-1 text-gray-800 ">
            사용하신 방을 청소하고 카드키는 <strong>초인종 옆 금고</strong>에 넣고 잠궈주세요.
            </span>
        </span>
        </span>
    </button>

    <button type="button" className="cursor-default text-start p-4 md:p-5 rounded-xl    " id="tabs-with-card-item-2" aria-selected="false" data-hs-tab="#tabs-with-card-2" aria-controls="tabs-with-card-2" role="tab">
        <div className="flex gap-x-6">
        <h2 className="text-2xl text-gray-800 font-bold sm:text-2xl   ">
            3
        </h2>
        <div className="grow">
            <span className="block text-lg font-semibold hs-tab-active:text-blue-600 text-gray-800    ">보증금 송금</span>
            <span className="block mt-2 text-gray-800    ">
                <strong>사용하신 방에 문제가 없는 경우</strong> 20만원이 넘는 보증금을 입금하셨다면 전체 보증금에서 20만원을 제한 보증금은 바로 송금됩니다.
            </span>
            <span className="block mt-1 text-gray-800 ">
                남은 20만원은 공과금 정산후 다음달 25일에 <span className="text-sm underline">(예를 들어 10월에 퇴실하였다면 11월 25일)</span> 차액 반환 됩니다.
            </span>
            <span className="block mt-2 text-gray-800 ">
                <strong >사용하신 방에 문제가 <span className="text-red-500">있는</span> 경우</strong><a onClick={setShowDepositExample} className="cursor-pointer underline text-sm text-blue-400">(예시)</a> 메이트님과 상식선에서 합의하여 해당금액과 20만원을 제외하고 송금합니다.
            </span>
            <span className="block mt-1 text-gray-800 ">
                남은 20만원은 공과금 정산후 다음달 25일에 <span className="cursor-pointer text-sm underline">(예를 들어 10월에 퇴실하였다면 11월 25일)</span> 차액 반환 됩니다.
            </span>
        </div>
        </div>
    </button>

    </nav>
</div>

export default function Rent(){
    const [questionType, setQuestionType] = useState(GusestState.checkin);
    const [showDepositExample,setShowDepositExample] = useState(false);
    
    return(
        <div className="px-3 py-3">
            <div className={`flex space-x-2 ${CenterClassName}`}>
                { questionType === GusestState.checkin ? 
                    <FilledBadge cnProps="cursor-pointer" name={"입실절차"} /> : 
                    <OutlineBadge onClickFunction={()=>setQuestionType(GusestState.checkin)} cnProps="cursor-pointer" name={"입실절차"} />}
                { questionType === GusestState.checkout ? 
                <FilledBadge cnProps="cursor-pointer" name={"퇴실절차"} /> 
                : <OutlineBadge onClickFunction={()=>setQuestionType(GusestState.checkout)} cnProps="cursor-pointer" name={"퇴실절차"} />}
            </div>

            <div>
                { questionType === GusestState.checkin && <CheckIn /> }
                { questionType === GusestState.checkout && <CheckOut setShowDepositExample={()=>setShowDepositExample(true)} /> }
            </div>
            
            {showDepositExample && <DepositGraph setShowDepositExample={setShowDepositExample} />}

        </div>
    )
}