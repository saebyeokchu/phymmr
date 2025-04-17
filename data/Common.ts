import moment from "moment";

const getThousandComma = (num : number) => num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

function formatDate(date: Date): string {
    return moment(date).format("YYYY-MM-DD");
    return date.toISOString().split('T')[0]; // Extracts YYYY-MM-DD part
}

function roundToHundred(num: number): number {
    return Math.round(num / 100) * 100;
}

function seperateNumber(givenNumber : number) {
    const nfObject = new Intl.NumberFormat('en-US'); 
    return nfObject.format(givenNumber); 
}

export {
    formatDate,
    getThousandComma,
    roundToHundred,
    seperateNumber
}