const LongButton = ({
    name,
    onClickFunction
} : {
    name : string,
    onClickFunction : any
}) => 
    <div onClick={onClickFunction}>
        <a className="cursor-pointer w-full text-center justify-center py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-yellow-600 text-white hover:bg-yellow-700 focus:outline-none focus:bg-yellow-700 disabled:opacity-50 disabled:pointer-events-none" >
            { name }
            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </a>
    </div>

export {
    LongButton
}