import { Badge } from "@/component/ui";
import { CenterClassName } from "@/data/Consts";

export default function SharedSpace(){
    return(
        <div className="flex flex-col overflow-hidden py-10">
            <div className="px-10 ">
                <p className="text-3xl font-bold ">공용공간</p>
                <p className="text-sm text-gray-600 pt-3">머무름은 일정공간을 공유하는 형태의 쉐어하우스입니다.</p>
                <p className="text-sm text-gray-600 pt-1 pb-3">공용공간인만큼 생활 소음이 있을 수 있으니 이 점을 꼭 고려하여 주세요.</p>
            </div>
            <div className={`mt-4 grow flex flex-col ${CenterClassName} `}>
                <Badge.Filled name={"거실"} />
                <div className={`mt-4 grow flex ${CenterClassName} `}>
                    <img className="rounded-md object-cover h-96" src={`/shared/livingroom4.jpeg`} />
                </div>
                <div className={`mt-4 grow flex ${CenterClassName} `}>
                    <img className="rounded-md object-cover h-96" src={`/shared/livingroom5.jpeg`} />
                </div>
                <div className={`mt-4 grow flex ${CenterClassName} `}>
                    <img className="rounded-md object-cover h-96" src={`/shared/beam1.jpg`} />
                </div>
                <div className={`mt-4 grow flex ${CenterClassName} `}>
                    <img className="rounded-md object-cover h-96" src={`/shared/beam2.jpg`} />
                </div>
                <div className={`mt-4 grow flex ${CenterClassName} `}>
                    <img className="rounded-md object-cover h-96" src={`/shared/bookshelf.jpg`} />
                </div>
            </div>
            <div className={`mt-4 grow flex flex-col ${CenterClassName} `}>
                <Badge.Filled name={"주방"} />
                <div className={`mt-4 grow flex ${CenterClassName} `}>
                    <img className="rounded-md object-cover h-96" src={`/shared/kitchen1.jpg`} />
                </div>
                <div className={`mt-4 grow flex ${CenterClassName} `}>
                    <img className="rounded-md object-cover h-96" src={`/shared/kitchen2.jpg`} />
                </div>
                <div className={`mt-4 grow flex ${CenterClassName} `}>
                    <img className="rounded-md object-cover h-96" src={`/shared/kitchen3.jpg`} />
                </div>
            </div>
            <div className={`mt-10 grow flex flex-col ${CenterClassName} `}>
                <Badge.Filled name={"화장실"} />
                <div className={`mt-4 grow flex ${CenterClassName} `}>
                    <img className="rounded-md object-cover h-96" src={`/shared/bath1.jpg`} />
                </div>
                <div className={`mt-4 grow flex ${CenterClassName} `}>
                    <img className="rounded-md object-cover h-96" src={`/shared/bath2.jpg`} />
                </div>
                <div className={`mt-4 grow flex ${CenterClassName} `}>
                    <img className="rounded-md object-cover h-96" src={`/shared/bath3.jpg`} />
                </div>
            </div>
            <div className={`mt-10 grow flex flex-col ${CenterClassName} `}>
                <Badge.Filled name={"세탁실"} />
                <div className={`mt-4 grow flex ${CenterClassName} `}>
                    <img className="rounded-md object-cover h-96" src={`/shared/laundry.jpg`} />
                </div>
            </div>
            <div className={`mt-10 grow flex flex-col ${CenterClassName} `}>
                <Badge.Filled name={"분리수거함"} />
                <div className={`mt-4 grow flex ${CenterClassName} `}>
                    <img className="rounded-md object-cover h-96" src={`/shared/trashzone.jpeg`} />
                </div>
            </div>
            <div className={`mt-10 grow flex flex-col ${CenterClassName} `}>
                <Badge.Filled name={"기타 공용공간"} />
                <div className={`mt-4 grow flex ${CenterClassName} `}>
                    <img className="rounded-md object-cover h-96" src={`/shared/sleeper.jpeg`} />
                </div>
                <div className={`mt-4 grow flex ${CenterClassName} `}>
                    <img className="rounded-md object-cover h-96" src={`/shared/aisle.jpg`} />
                </div>
                
            </div>
        </div>

    )
}