import { KakaoLink } from "../library/Consts";

export default function Apply() {
    return(
        <div className="p-3 ">
            <div className="text-sm bg-slate-100 p-4">
                아래 절차는 임시절차이며 추후 100% 온라인으로 입실 및 퇴실이 가능하도록 변경될 예정입니다.
            </div>
            <div className="group relative flex gap-x-5 mt-5 mb-5">
                <div className="relative group-last:after:hidden after:absolute after:top-8 after:bottom-2 after:start-3 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-neutral-700">
                    <div className="relative z-10 size-6 flex justify-center items-center">
                        <svg fill="#000000" width="800px" height="800px" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg"><path d="M22.125 0H1.875C.839 0 0 .84 0 1.875v20.25C0 23.161.84 24 1.875 24h20.25C23.161 24 24 23.16 24 22.125V1.875C24 .839 23.16 0 22.125 0zM12 18.75c-.591 0-1.17-.041-1.732-.12-.562.396-3.813 2.679-4.12 2.722 0 0-.125.049-.232-.014s-.088-.229-.088-.229c.032-.22.843-3.018.992-3.533-2.745-1.36-4.57-3.769-4.57-6.513 0-4.246 4.365-7.688 9.75-7.688s9.75 3.442 9.75 7.688c0 4.245-4.365 7.687-9.75 7.687zM8.05 9.867h-.878v3.342c0 .296-.252.537-.563.537s-.562-.24-.562-.537V9.867h-.878a.552.552 0 0 1 0-1.101h2.88a.552.552 0 0 1 0 1.101zm10.987 2.957a.558.558 0 0 1 .109.417.559.559 0 0 1-.219.37.557.557 0 0 1-.338.114.558.558 0 0 1-.45-.224l-1.319-1.747-.195.195v1.227a.564.564 0 0 1-.562.563.563.563 0 0 1-.563-.563V9.328a.563.563 0 0 1 1.125 0v1.21l1.57-1.57a.437.437 0 0 1 .311-.126c.14 0 .282.061.388.167a.555.555 0 0 1 .165.356.438.438 0 0 1-.124.343l-1.282 1.281 1.385 1.835zm-8.35-3.502c-.095-.27-.383-.548-.75-.556-.366.008-.654.286-.749.555l-1.345 3.541c-.171.53-.022.728.133.8a.857.857 0 0 0 .357.077c.235 0 .414-.095.468-.248l.279-.73h1.715l.279.73c.054.153.233.248.468.248a.86.86 0 0 0 .357-.078c.155-.071.304-.268.133-.8l-1.345-3.54zm-1.311 2.443.562-1.596.561 1.596H9.376zm5.905 1.383a.528.528 0 0 1-.539.516h-1.804a.528.528 0 0 1-.54-.516v-3.82c0-.31.258-.562.575-.562s.574.252.574.562v3.305h1.195c.297 0 .54.231.54.515z"/></svg>
                    </div>
                </div>

                <div className="grow pb-8 group-last:pb-0">
                    <h3 className="mb-1 text-xs text-gray-600 dark:text-neutral-400">
                        공실문의
                    </h3>

                    <p className="font-semibold text-sm text-gray-800 dark:text-neutral-200">
                        카카오톡으로 입실가능일을 문의해주세요
                    </p>

                    <p className="mt-1 text-sm text-gray-600 dark:text-neutral-400">
                       <a href={KakaoLink} className="underline">여기</a>를 클릭하여 입실 가능일을 문의해주세요.
                    </p>
                </div>
            </div>

            <div className="group relative flex gap-x-5">
                <div className="relative group-last:after:hidden after:absolute after:top-8 after:bottom-2 after:start-3 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-neutral-700">
                <div className="relative z-10 size-6 flex justify-center items-center">
                    <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 10H17M7 14H12M7 3V5M17 3V5M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                </div>

                <div className="grow pb-8 group-last:pb-0">
                    <h3 className="mb-1 text-xs text-gray-600 dark:text-neutral-400">
                        쉐어하우스 규칙 확인
                    </h3>

                    <p className="font-semibold text-sm text-gray-800 dark:text-neutral-200">
                        쉐어하우스 규칙을 꼼꼼히 확인해 주세요.
                    </p>

                    <p className="mt-1 text-sm text-gray-600 dark:text-neutral-400">
                        <a href={KakaoLink} className="underline">여기</a>를 클릭하여 쉐어하우스 규칙을 확인해 주세요. 규칙에 동의해야 머무름에서 머무르실 수 있습니다.
                    </p>
                </div>
            </div>

            <div className="group relative flex gap-x-5">
                <div className="relative group-last:after:hidden after:absolute after:top-8 after:bottom-2 after:start-3 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-neutral-700">
                <div className="relative z-10 size-6 flex justify-center items-center">
                <svg width="800px" height="800px" viewBox="0 0 1024 1024" className="icon"  version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M182.88 146.2h585.14v365.71h73.14V73.06H109.74v877.71h402.28v-73.14H182.88z" fill="#0F1F3C" /><path d="M256.01 219.34h438.86v73.14H256.01zM256.01 365.63h365.71v73.14H256.01zM256.01 511.91h219.43v73.14H256.01zM731.44 545.76L548.59 646.33v201.14l182.86 100.57L914.3 847.47V646.33L731.44 545.76z m109.72 258.46l-109.71 60.34-109.71-60.34V689.58l109.71-60.34 109.71 60.34v114.64z" fill="#0F1F3C" /><path d="M731.44 746.9m-36.57 0a36.57 36.57 0 1 0 73.14 0 36.57 36.57 0 1 0-73.14 0Z" fill="#0F1F3C" /></svg>
                </div>  
                </div>

                <div className="grow pb-8 group-last:pb-0">
                    <h3 className="mb-1 text-xs text-gray-600 dark:text-neutral-400">
                        계약서 작성
                    </h3>

                    <p className="font-semibold text-sm text-gray-800 dark:text-neutral-200">
                        계약서를 꼼꼼히 읽고 서명후 신분증과 함께 전달해주세요.
                    </p>

                    <p className="mt-1 text-sm text-gray-600 dark:text-neutral-400">
                        카카오톡으로 전달된 계약서를 꼼곰히 읽고 서명해 전달해 주세요. 보안을 위해 <strong>신분증 뒷자리는 가리고</strong> 전달해주세요.
                    </p>
                </div>
            </div>

            <div className="group relative flex gap-x-5">
                <div className="relative group-last:after:hidden after:absolute after:top-8 after:bottom-2 after:start-3 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-neutral-700">
                <div className="relative z-10 size-6 flex justify-center items-center">
                <svg width="800px" height="800px" viewBox="0 0 1024 1024" className="icon"  version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M182.88 146.2h585.14v365.71h73.14V73.06H109.74v877.71h402.28v-73.14H182.88z" fill="#0F1F3C" /><path d="M256.01 219.34h438.86v73.14H256.01zM256.01 365.63h365.71v73.14H256.01zM256.01 511.91h219.43v73.14H256.01zM731.44 545.76L548.59 646.33v201.14l182.86 100.57L914.3 847.47V646.33L731.44 545.76z m109.72 258.46l-109.71 60.34-109.71-60.34V689.58l109.71-60.34 109.71 60.34v114.64z" fill="#0F1F3C" /><path d="M731.44 746.9m-36.57 0a36.57 36.57 0 1 0 73.14 0 36.57 36.57 0 1 0-73.14 0Z" fill="#0F1F3C" /></svg>
                </div>  
                </div>

                <div className="grow pb-8 group-last:pb-0">
                    <h3 className="mb-1 text-xs text-gray-600 dark:text-neutral-400">
                        계약금 입금
                    </h3>

                    <p className="font-semibold text-sm text-gray-800 dark:text-neutral-200">
                        보증금의 10%에 해당하는 금액을 계약금으로 입금해주세요.
                    </p>

                    <p className="mt-1 text-sm text-gray-600 dark:text-neutral-400">
                        계약서에 기재된 계좌로 계약금을 입금해주시면 예약이 완료됩니다. 입실일 전까지 <strong>언제든 취소가</strong> 가능하며 계약금은 <strong className="text-red-500">환불되지 않습니다.</strong>
                    </p>
                </div>
            </div>

            <div className="group relative flex gap-x-5">
                <div className="relative group-last:after:hidden after:absolute after:top-8 after:bottom-2 after:start-3 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-neutral-700">
                <div className="relative z-10 size-6 flex justify-center items-center">
                <svg width="800px" height="800px" viewBox="0 0 1024 1024" className="icon"  version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M182.88 146.2h585.14v365.71h73.14V73.06H109.74v877.71h402.28v-73.14H182.88z" fill="#0F1F3C" /><path d="M256.01 219.34h438.86v73.14H256.01zM256.01 365.63h365.71v73.14H256.01zM256.01 511.91h219.43v73.14H256.01zM731.44 545.76L548.59 646.33v201.14l182.86 100.57L914.3 847.47V646.33L731.44 545.76z m109.72 258.46l-109.71 60.34-109.71-60.34V689.58l109.71-60.34 109.71 60.34v114.64z" fill="#0F1F3C" /><path d="M731.44 746.9m-36.57 0a36.57 36.57 0 1 0 73.14 0 36.57 36.57 0 1 0-73.14 0Z" fill="#0F1F3C" /></svg>
                </div>  
                </div>

                <div className="grow pb-8 group-last:pb-0">
                    <h3 className="mb-1 text-xs text-gray-600 dark:text-neutral-400">
                        잔금 입금
                    </h3>

                    <p className="font-semibold text-sm text-gray-800 dark:text-neutral-200">
                        입실일에 남은 보증금과 사용료를 입금해주세요.
                    </p>

                    <p className="mt-1 text-sm text-gray-600 dark:text-neutral-400">
                        금액 확인 후에 입실 안내 문자를 전송해 드립니다. 머무름에 방문해주셔서 감사합니다.
                    </p>
                </div>
            </div>

        </div>
    )
}