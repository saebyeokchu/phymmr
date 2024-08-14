function getImageWidthAndHeight(img : any) {
    if(img){
        return {
            width : img.style.width.replace("px",""),
            height : img.style.height.replace("px","")
        }
    }

    return {
        width : -1,
        heighth : -1
    }

}

export {
    getImageWidthAndHeight
}