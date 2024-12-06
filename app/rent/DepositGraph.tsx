import { DimBackground } from "../component";
import { getThousandComma } from "../library/Common";

const CompensationItem = [
  { name : '배게' , price : 20000 },
  { name : '헤어드라이기' , price : 20000 },
  { name : '컵' , price : 30000 },
  { name : '접시' , priceRange : [30000,100000] },
  { name : '책상' , price : 50000 },
  { name : '의자' , price : 30000 },
  { name : '침대 매트리스' , price : 100000 },
  { name : '침대 프레임' , price : 150000 },
]

export default function DepositGraph({
  setShowDepositExample
}:{
  setShowDepositExample : any
}) {
    return(
        <>
        <DimBackground />
        <div id="hs-cookies" className="size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto" role="dialog" aria-labelledby="hs-cookies-label">
        <div className="mt-20 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
          <div className="relative flex flex-col bg-white shadow-lg rounded-xl dark:bg-neutral-900">
            <div className="absolute top-2 end-2">
              <button onClick={()=>setShowDepositExample(false)} type="button" className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600" aria-label="Close" data-hs-overlay="#hs-cookies">
                <span className="sr-only">Close</span>
                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>

            <div className="p-4 sm:p-14 text-center overflow-y-auto">
              <h3 id="hs-cookies-label" className="mb-2 text-2xl font-bold text-gray-800 dark:text-neutral-200">
                머무름 내부 시설 손해 시 보상금액
              </h3>
              <p className="text-gray-500 dark:text-neutral-500">
                해당 내용은 상식선에 준한것으로 상호 합의하에 금액은 변동될 수 있습니다
              </p>
            </div>

            <div className="flex flex-col h-96">
              <div className="overflow-x-hidden">
                <div className="min-w-full">
                  <div className="border overflow-hidden dark:border-neutral-700">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                      <thead>
                        <tr>
                          <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">품목</th>
                          <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">배상가액</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                        { CompensationItem.map(item => 
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                              <div>
                                <span>{item.name}</span>
                              </div>
                            </td>
                            { item.price && <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200"> { getThousandComma(item.price) } 원 </td> }
                            { item.priceRange && <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200"> { getThousandComma(item.priceRange[0]) } 원 ~ { getThousandComma(item.priceRange[1]) } 원 </td> }
                          </tr>
                        ) }
                        
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <button onClick={()=>setShowDepositExample(false)}  type="button" className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-es-xl border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-white/10 dark:hover:bg-white/20 dark:text-white dark:hover:text-white dark:focus:text-white" data-hs-overlay="#hs-cookies">
                닫기
              </button>
            </div>
          </div>
        </div>
      </div>
      </>
    )
}