export default function UserInfolList({
    newUserName,
    newPhoneNumber,
    newAddress,
    newAccount
}:{
    newUserName : string,
    newPhoneNumber : string,
    newAddress : string,
    newAccount : string
}){
    return(
        <div className="flex flex-col mt-1">
            <div className="flex flex-row justify-between">
                <div className="font-bold">이름</div>
                <div>{newUserName}</div>
            </div>
            <div className="flex flex-row justify-between">
                <div className="font-bold">성별</div>
                <div>{'여성'}</div>
            </div>
            <div className="flex flex-row justify-between">
                <div className="font-bold">전화번호</div>
                <div>{newPhoneNumber}</div>
            </div>
            <div className="flex flex-col ">
                <div className="font-bold">주소</div>
                <div>{newAddress}</div>
            </div>
            <div className="flex flex-row justify-between">
                <div className="font-bold">계좌</div>
                <div>{newAccount}</div>
            </div>
        </div>
    )
}