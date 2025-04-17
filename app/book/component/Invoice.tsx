import { seperateNumber } from "@/data/Common"

export default function Invoice({
    generalDateInfo
} : {
    generalDateInfo : any
}){
    
    const getRemainingPrice = () => {
        const deposit = generalDateInfo.deposit;
        const price = generalDateInfo.price;
        const fee = deposit / 10;

        if(deposit && price){
            return seperateNumber(deposit + price - fee);
        }
    }

    return(
        <>
            <div className="flex flex-row justify-between">
                <div>보증금</div>
                <div>{generalDateInfo.deposit &&  seperateNumber(generalDateInfo.deposit)}원</div>
            </div>
            <div className="flex flex-row justify-between">
                <div>총 사용료</div>
                <div>{generalDateInfo.price &&  seperateNumber(generalDateInfo.price)}원</div>
            </div>
            <div className="flex flex-row justify-between">
                <div>계약금</div>
                <div>{generalDateInfo.deposit &&  seperateNumber(generalDateInfo.deposit / 10)}원</div>
            </div>
            <div className="font-bold mt-2">
                지불 스케쥴
            </div>
            <div className="flex flex-row justify-between">
                <div>예약 확정 후</div>
                <div>계약금 입금({generalDateInfo.deposit &&  seperateNumber(generalDateInfo.deposit / 10)}원)</div>
            </div>
            <div className="flex flex-row justify-between">
                <div>입실 당일</div>
                <div>잔금 입금({getRemainingPrice()}원)</div>
            </div>
        </>
    )
       
}