const getThousandComma = (num : number) => num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

export {
    getThousandComma
}