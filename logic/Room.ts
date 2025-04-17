import { roundToHundred, seperateNumber } from "../data/Common";
import { PriceUnit } from "../app/_data/Consts";
import { PriceType, RoomType } from "../data/Enums";
import { GetPricesData } from "../service/RoomService";

const getRemainingPrice = ( generalDateInfo : any) => {
    const deposit = generalDateInfo.deposit;
    const price = generalDateInfo.price;
    const fee = deposit / 10;

    if(deposit && price){
        return seperateNumber(deposit + price - fee);
    }
}

const makeDateList = (data : any[]) => {


    return data.map(e => {
    //퇴실일 +7일 부터 새로운 입실 가능
        var endDate = new Date(e.endDate);
        endDate.setDate(endDate.getDate() + 7);

        return { roomType : e.roomType, startDate : new Date(e.startDate), endDate : endDate }
    });

}
 
const checkIfDisabledDatesInlcuded = ( newStartDate : any , newEndDate : any , reserveList : any[]) => {

    console.log("newStartDate",newStartDate);
    console.log("newEndDate",newEndDate);
    let room1lap : any[] = [];
    let room2lap : any[] = [];

    reserveList.filter( list => {

        if( list.startDate >= newStartDate && list.endDate <= newEndDate )
        {
            if(list.roomType == RoomType.Room1){
                room1lap.push(list)
            }else{
                room2lap.push(list)
            }
            console.log("overlapped list",list);
        }

        return list.startDate >= newStartDate && list.startDate <= newEndDate && list.endDate >= newEndDate && list.endDate <= newEndDate;

    });
   
    return {room1lap,room2lap}
}

const getTotalDates = (
    dates : Period
)=>{
    if(dates.endDate && dates.startDate){
        const diffMs = dates.endDate.getTime() - dates.startDate.getTime(); // Difference in milliseconds
        const diffDays = diffMs / (1000 * 60 * 60 * 24); // Convert to days
    
        const diffMns = Math.floor(diffDays / 30);
        const remaningDays = diffDays -  ( diffMns * 30 );
    
        return{
            month : diffMns,
            day : remaningDays
        }
    }

    return null;
}

const getPriceInfo = ( priceInfo : Price[], roomType : RoomType, requestedPriceType : PriceType, diffs : DiffDates) => {
    const info : Price[] = priceInfo.filter((price : Price) => {
        return price.roomType == roomType
    });

    if(info.length == 0){
        return null;
    }else{

        let standardDays : number = requestedPriceType==PriceType.month ? 30 : 7;
        let targetPrice : number  = ( requestedPriceType==PriceType.month ? info[0].monthPrice : info[0].weekPrice ) * PriceUnit;
        let targetDeposit : number = ( requestedPriceType==PriceType.month ? info[0].monthDeposit : info[0].weekDeposit ) * PriceUnit;
        let unitPrice : number = Math.round( targetPrice / standardDays );
        let totalPrice : number = roundToHundred(unitPrice * ( 30 * diffs.month ) + unitPrice * diffs.day);
        // targetPrice = targetPrice * ( 30 * diffs.month ) + targetPrice * diffs.day;

        //예외처리
        //21일 ~ 30일
        if(diffs.month == 0 && (diffs.day >= 22 && diffs.day <= 30)){
            totalPrice = info[0].monthPrice * PriceUnit;
        }

        return { 
            deposit : targetDeposit,
            orginalPrice : targetPrice,
            totalPrice : totalPrice,
            totalMonthPrice : unitPrice * diffs.month,
            lastMonthPrice : roundToHundred(totalPrice - (unitPrice * diffs.month*30))
        };
    }
}

const doCalculatePrice = async ( dateValue : Period , selectedRoomType : RoomType) => {
    const prices = await GetPricesData();
    const diffs : DiffDates | null = getTotalDates(dateValue);//set date

    if(diffs){
        let requestedPriceType : PriceType = PriceType.All;

        if(diffs.month > 0){
            requestedPriceType = PriceType.month;
        }else if(diffs.month == 0){
            requestedPriceType = PriceType.week;
        }

        //set price
        const searchPrice = getPriceInfo(prices, selectedRoomType, requestedPriceType, diffs);

        if(searchPrice){
            return { ... searchPrice, diffs };
        }
    }
}

export {
    getRemainingPrice,
    getTotalDates,
    getPriceInfo,

    checkIfDisabledDatesInlcuded,
    makeDateList,
    doCalculatePrice
}