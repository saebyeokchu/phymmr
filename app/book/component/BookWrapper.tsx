export default function BookWrapper({
    children,
    sectionTitle,
    sectionSubTitle
    }: Readonly<{
    children: React.ReactNode;
    sectionTitle : string;
    sectionSubTitle? : string | React.ReactNode;
}>){
    return(
        <div className="mt-5 pt-5 border-t border-t-slate-200">
            <p className="text-xl "> {sectionTitle} </p>
            <span className="text-sm"> { sectionSubTitle } </span>
            <div className="mt-3">
                {children}
            </div>
        </div>
)
}