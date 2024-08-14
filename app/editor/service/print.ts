import { predefinedFrames } from "../lib/constant/variables";

function printDrawing(refContext : any, printContext : any){
    //printRef만 출력하기
    //row - col
    const printRef : any = refContext.printRef.current;
    const blockLengRef : any = refContext.blockLenRef.current;
    const frNmRef : any = refContext.frNmRef.current;

    if(printRef != null && blockLengRef != null && frNmRef != null) {
        const blockLength : number = blockLengRef.value;
        const frameName : string = frNmRef.value;

        printRef.innerHTML = [];

        const imageEles : any = document.getElementsByClassName("guideImageElement");
        for(let child of imageEles){
          const [row, col, color] : [number, number, string] = child.id.split("-");
          const rowBlockCount : number = ~~( predefinedFrames[frameName].width  / blockLength);
          const colBlockCount : number = ~~( predefinedFrames[frameName].height  / blockLength);
        
            if(row <=  rowBlockCount && col <= colBlockCount){
            //   console.log(child, row, col, color)
              let printChild : HTMLImageElement = new Image();
      
              printChild.src = child.src;
              printChild.style.position = child.style.position;
              printChild.style.top = child.style.top;
              printChild.style.left = child.style.left;
              printChild.style.width = blockLength + "mm";
              printChild.style.height = blockLength + "mm";
              printChild.style.zIndex = "10";
      
              printRef.appendChild(printChild);
            }
        }
        printContext.setDoPrint(true);
    }
   
  }

export {
    printDrawing
}