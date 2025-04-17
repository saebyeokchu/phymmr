import { DisabledOutlineBadge, FilledBadge } from "@/app/_component/badge"

export default function UserInfoInput({
    userNameRef,
    userPhoneNumberRef,
    userAddressRef,
    userAccountRef,
    updateApplyingUser
} : {
    userNameRef : any,
    userPhoneNumberRef: any,
    userAddressRef: any,
    userAccountRef: any,
    updateApplyingUser : any
}){
    return(
        <div className="mt-2">
            <div className="max-w-sm space-y-3">
                <div className="relative">
                    <input ref={userNameRef} onChange={updateApplyingUser} type="text" className="peer py-3 block w-full bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-200 text-sm focus:border-t-transparent focus:border-x-transparent focus:border-b-blue-500 focus:ring-0 disabled:opacity-50 disabled:pointer-events-none dark:border-b-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 dark:focus:border-b-neutral-600" placeholder="계약자 이름 또는 법인명(반드시 실명을 사용하여야 합니다)" />
                </div>
                <div className="relative">
                    <p className="text-sm">계약자 성별</p>
                    <span className="font-bold text-sm ">머무름 쉐어하우스 포항역점은 <span className="text-red-600">여성</span>만 입주 가능합니다.</span>
                    <div className="flex flex-row space-x-2 mt-1">
                        <DisabledOutlineBadge name={"남성"} />
                        <FilledBadge name={"여성"} />
                    </div>
                </div>
                <div className="relative">
                    <input ref={userPhoneNumberRef} onChange={updateApplyingUser} type="text" className="peer py-3 block w-full bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-200 text-sm focus:border-t-transparent focus:border-x-transparent focus:border-b-blue-500 focus:ring-0 disabled:opacity-50 disabled:pointer-events-none dark:border-b-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 dark:focus:border-b-neutral-600" placeholder="계약자 전화번호" />
                </div>
                <div className="relative">
                    <input ref={userAddressRef} onChange={updateApplyingUser} type="text" className="peer py-3 block w-full bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-200 text-sm focus:border-t-transparent focus:border-x-transparent focus:border-b-blue-500 focus:ring-0 disabled:opacity-50 disabled:pointer-events-none dark:border-b-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 dark:focus:border-b-neutral-600" placeholder="계약자 현재주소" />
                </div>
                <div className="relative">
                    <input ref={userAccountRef} onChange={updateApplyingUser} type="text" className="peer py-3 block w-full bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-200 text-sm focus:border-t-transparent focus:border-x-transparent focus:border-b-blue-500 focus:ring-0 disabled:opacity-50 disabled:pointer-events-none dark:border-b-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 dark:focus:border-b-neutral-600" placeholder="계약자 계좌(은행 / 계좌번호 / 계좌주 순)" />
                </div>
            </div>
        </div>
    )
}