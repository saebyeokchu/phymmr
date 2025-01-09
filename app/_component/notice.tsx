const BannerNotice = ({
    title,
    message,
    actionMessage,
    actionLink
}:{
    title : string,
    message : string,
    actionMessage : string,
    actionLink : string
}) => {
    return (
        <div className="flex flex-col p-4 mb-4 text-sm  text-green-800 rounded-lg bg-green-50" role="alert">
            <div>
                <span className="text-lg font-bold">{title}</span> 
                <span> {message} </span>
            </div>
            <div>
                <a href={actionLink} className="cursor-pointer underline">{actionMessage}</a>
            </div>
        </div>
    )
}

export {
    BannerNotice
}