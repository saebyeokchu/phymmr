const FilledBadge = ({
    name,
    cnProps,
    onClickFunction
} : {
    name : string,
    cnProps? : string,
    onClickFunction? : any

}) => <span onClick={onClickFunction} className={`inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-yellow-500 text-white ${cnProps}`}>{name}</span>

const OutlineBadge = ({
    name,
    cnProps,
    onClickFunction
} : {
    name : string,
    cnProps? : string,
    onClickFunction? : any
}) => <span onClick={onClickFunction} className={`inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium border border-yellow-500 text-yellow-500 ${cnProps}`}>{name}</span>

export {
    FilledBadge,
    OutlineBadge
}