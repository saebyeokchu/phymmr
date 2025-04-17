import { RoomType } from "@/data/Enums";
import Wrapper from "../_component/Wrapper";

export const Room1PriceChart = () => <div className="relative overflow-x-auto mx-9 mt-4">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                        <tr>
                            <th scope="col" className="px-6 py-3"></th>
                            <th scope="col" className="px-6 py-3">단기거주</th>
                            <th scope="col" className="px-6 py-3">장기거주</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b ">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                보증금
                            </th>
                            <td>30만원</td>
                            <td>100만원</td>
                        </tr>
                        <tr className="bg-white border-b ">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                사용료
                            </th>
                            <td>1주 15만원</td>
                            <td>한달 50만원</td>
                        </tr>

                    </tbody>
                </table>
            </div>

export const Room1Image = () => <div className="flex flex-col overflow-hidden">
                <div className={`mt-4 grow flex flex-col ${CenterClassName} `}>
                    <FilledBadge name={"책상"} />
                    <div className={`mt-4 grow flex ${CenterClassName} `}>
                        <img className="rounded-md object-cover h-96" src={`/room1/full1.jpg`} />
                    </div>
                    <div className={`mt-4 grow flex ${CenterClassName} `}>
                        <img className="rounded-md object-cover h-96" src={`/room1/full4.jpg`} />
                    </div>
                </div>
                <div className={`mt-10 grow flex flex-col ${CenterClassName} `}>
                    <FilledBadge name={"침대"} />
                    <div className={`mt-4 grow flex ${CenterClassName} `}>
                        <img className="rounded-md object-cover h-96" src={`/room1/full2.jpg`} />
                    </div>
                    <div className={`mt-4 grow flex ${CenterClassName} `}>
                        <img className="rounded-md object-cover h-96" src={`/room1/bed.jpg`} />
                    </div>
                </div>
                <div className={`mt-10 grow flex flex-col ${CenterClassName} `}>
                    <FilledBadge name={"수납"} />
                    <div className={`mt-4 grow flex ${CenterClassName} `}>
                        <img className="rounded-md object-cover h-96" src={`/room1/full3.jpg`} />
                    </div>
                    <div className={`mt-4 grow flex ${CenterClassName} `}>
                        <img className="rounded-md object-cover h-96" src={`/room1/closet2.jpg`} />
                    </div>
                </div>
            </div>

const Review = () => <div className="relative overflow-hidden">
  <div className="max-w-[85rem] px-4 py-12 sm:px-6 lg:px-8 lg:py-16 mx-auto">
    <div aria-hidden="true" className="flex -z-[1] absolute start-0">
      <div className="bg-purple-200 opacity-20 blur-3xl w-[1036px] h-[300px] "></div>
    </div>

    <div className="grid">
      <div className="grow">
        <blockquote>
          <p className="text-xl font-medium text-gray-800 lg:text-2xl lg:leading-normal ">
          머무름 덕분에 여름에는 시원하게 겨울에는 따뜻하게 보냈어요
          </p>

          <footer className="mt-6">
            <div className="flex items-center">
              <div className="lg:hidden shrink-0">
                <img className="size-12 rounded-full" src="https://images.unsplash.com/photo-1671726203390-cdc4354ee2eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80" alt="Avatar" />
              </div>
              <div className="ms-4 lg:ms-0">
                <p className="font-medium text-gray-800">
                  박**
                </p>
                <p className="text-sm text-gray-600">
                  6개월의 머무름
                </p>
              </div>
            </div>
          </footer>
        </blockquote>
      </div>
    </div>
  </div>
</div>

export default function BigRoom(){
    return(
        <Wrapper roomType={RoomType.Room1}>
          <div>
                            <Room1PriceChart />
                            <Review />
                            <Room1Image />
                           </div>
        </Wrapper>
    )
}