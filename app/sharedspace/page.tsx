import { FilledBadge } from "../_component/badge";
import { CenterClassName } from "../_data/Consts";

export default function SharedSpace(){
    return(
        <div className="flex flex-col overflow-hidden">
            <div className="px-10 pt-10">
                <p className="text-3xl font-bold ">공용공간</p>
                <p className="text-sm text-gray-600 pt-3">머무름은 일정공간을 공유하는 형태의 쉐어하우스입니다.</p>
                <p className="text-sm text-gray-600 pt-1 pb-3">공용공간인만큼 생활 소음이 있을 수 있으니 이 점을 꼭 고려하여 주세요.</p>
            </div>
            <div className={`mt-4 grow flex flex-col ${CenterClassName} `}>
                <FilledBadge name={"거실"} />
                <div className={`mt-4 grow flex ${CenterClassName} `}>
                    <img className="rounded-md object-cover h-96" src={`/shared/livingroom4.jpeg`} />
                </div>
                <div className={`mt-4 grow flex ${CenterClassName} `}>
                    <img className="rounded-md object-cover h-96" src={`/shared/livingroom5.jpeg`} />
                </div>
            </div>
            <div className={`mt-10 grow flex flex-col ${CenterClassName} `}>
                <FilledBadge name={"화장실"} />
                <div className={`mt-4 grow flex ${CenterClassName} `}>
                    <img className="rounded-md object-cover h-96" src={`/shared/bath1.jpg`} />
                </div>
                <div className={`mt-4 grow flex ${CenterClassName} `}>
                    <img className="rounded-md object-cover h-96" src={`/shared/bath2.jpg`} />
                </div>
            </div>
            <div className={`mt-10 grow flex flex-col ${CenterClassName} `}>
                <FilledBadge name={"분리수거함"} />
                <div className={`mt-4 grow flex ${CenterClassName} `}>
                    <img className="rounded-md object-cover h-96" src={`/shared/trashzone.jpeg`} />
                </div>
            </div>
            <div className={`mt-10 grow flex flex-col ${CenterClassName} `}>
                <FilledBadge name={"공용물품"} />
                <div className={`mt-4 grow flex ${CenterClassName} `}>
                    <img className="rounded-md object-cover h-96" src={`/shared/sleeper.jpeg`} />
                </div>
            </div>
        </div>

    )
}