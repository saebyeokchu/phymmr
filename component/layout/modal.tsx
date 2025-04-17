import { DimBackground } from "./dimbackground";


export default function Modal() {
    return (
        <>
        <DimBackground />
        <div id="hs-cookies" className="size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto" role="dialog" aria-labelledby="hs-cookies-label">
        <div className="mt-20 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
          <div className="relative flex flex-col bg-white shadow-lg rounded-xl ">
            <div className="absolute top-2 end-2">
              <button type="button" className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none " aria-label="Close" data-hs-overlay="#hs-cookies">
                <span className="sr-only">Close</span>
                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>

            <div className="p-4 sm:p-14 text-center overflow-y-auto">

              <h3 id="hs-cookies-label" className="mb-2 text-2xl font-bold text-gray-800 ">
                해당일에 가능한 방이 없습니다
              </h3>
              <p className="text-gray-500 ">
                This website uses cookies to make your experience better.
              </p>
            </div>

            <div className="flex items-center">
              <button type="button" className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-es-xl border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none " data-hs-overlay="#hs-cookies">
                Privacy Policy
              </button>
              <button type="button" className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-ee-xl border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none" data-hs-overlay="#hs-cookies">
                Got it
              </button>
            </div>
          </div>
        </div>
      </div>
      </>
    )
}