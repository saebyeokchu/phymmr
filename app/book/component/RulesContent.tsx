import Rules from "@/app/_component/rules";
import { useRoomContext } from "../../_context/RoomContext"
import { RoomType } from "../../../data/Enums"
import { Tenant } from "../../../type/RoomType"


export function RulesContent({
  shareRulesChecked,
  setShareRulesChecked,
  onCloseClick 
} : {
  shareRulesChecked : boolean,
  setShareRulesChecked : any,
  onCloseClick : any
}) {
    const roomContext = useRoomContext();

    return (
        <div className="relative ">
            <div
              id="modal"
              className="mx-3 hs-overlay fixed inset-0 z-50 flex items-center justify-center "
              role="dialog"
              aria-modal="true"
            >
              <div className="fixed inset-0 bg-black/50"></div>
      
              <div
                className="relative z-60 bg-white rounded-lg shadow-lg max-w-lg w-full p-6"
              >
                <div className="flex flex-row justify-between">
                  <h3 className="text-xl font-semibold">부동산 임대 계약 조건</h3>
                  
                  {/* close button */}
                  <button type="button" className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none " onClick={onCloseClick }>
                    <span className="sr-only">Close</span>
                    <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 6 6 18"></path>
                      <path d="m6 6 12 12"></path>
                    </svg>
                  </button>
                </div>

                <div className="p-2 mt-3 h-96 overflow-y-scroll flex flex-col space-y-3 border border-slate-300">
                  <Rules />
                </div>

                <div className="mt-3 flex flex-row space-x-1">
                  <button
                      onClick={()=>setShareRulesChecked(false)}
                      className="justify-center hover:bg-slate-100 group relative w-full items-center rounded-none border py-4 px-5  text-base focus:bg-slate-100"
                      type="button" >
                      거절하기
                  </button>
                  <button
                      onClick={()=>setShareRulesChecked(true)}
                      className={`${shareRulesChecked && 'bg-slate-100'} justify-center hover:bg-slate-100 group relative flex w-full items-center rounded-none border py-4 px-5 text-base focus:bg-slate-100`}
                      type="button" >
                      동의하기
                  </button>
                </div>
              </div>
            </div>
          </div>
    )
}