
export default function Contact(){
    return(
        <div className="relative overflow-hidden mt-10">
        <div aria-hidden="true" className="flex absolute -top-96 start-1/2 transform -translate-x-1/2">
            <div className="bg-gradient-to-r from-yellow-300/50 to-yellow-100 blur-3xl w-[25rem] h-[44rem] rotate-[-60deg] transform -translate-x-[10rem] "></div>
            <div className="bg-gradient-to-tl from-yellow-50 via-yellow-100 to-yellow-50 blur-3xl w-[90rem] h-[50rem] rounded-fulls origin-top-left -rotate-12 -translate-x-[15rem] "></div>
        </div>

        <div className="relative z-10">
            <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
            <div className="max-w-2xl text-center mx-auto">
                <p className="inline-block text-sm font-medium bg-clip-text bg-gradient-to-l from-yellow-600 to-yellow-500 text-transparent ">
                 일주일부터 경험해 보세요
                </p>

                <div className="mt-5 max-w-2xl">
                <h1 className="block font-semibold text-gray-800 text-3xl ">
                    빠르게 입실신청하기
                </h1>
                </div>

                <div className="mt-5 max-w-3xl">
                <p className="text-lg text-gray-600">
                    {/* 현재 카카오톡 문의하기를 통해 입실신청이 가능합니다. */}
                </p>
                </div>

                <div className="mt-5 gap-3 flex justify-center">
                    <a className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-yellow-600 text-white hover:bg-yellow-700 focus:outline-none focus:bg-yellow-700 disabled:opacity-50 disabled:pointer-events-none" href={"/book"}>
                        온라인 입실신청하기
                        <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                    </a>
                </div>
                {/* <a className="text-sm hover:underline text-slate-500" href="/request/tour">오프라인 투어가 필요해요</a> */}
            </div>
            </div>
        </div>
    </div>
    )
}