const Filled = ({
    name,
    cnProps,
    onClickFunction
} : {
    name : string,
    cnProps? : string,
    onClickFunction? : any

}) => <span onClick={onClickFunction} className={`inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-yellow-500 text-white ${cnProps}`}>{name}</span>

const Outline = ({
    name,
    cnProps,
    onClickFunction
} : {
    name : string,
    cnProps? : string,
    onClickFunction? : any
}) => <span onClick={onClickFunction} className={`cursor-pointer inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium border border-yellow-500 text-yellow-500 ${cnProps} hover:bg-yellow-500 hover:text-white`}>{name}</span>

const DisabledOutline = ({
    name,
    cnProps,
    onClickFunction
} : {
    name : string,
    cnProps? : string,
    onClickFunction? : any
}) => <span onClick={onClickFunction} className={`inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium border border-slate-500 text-slate-300 bg-slate-500 ${cnProps}`}>{name}</span>


export {
    Filled,
    Outline,
    DisabledOutline
}