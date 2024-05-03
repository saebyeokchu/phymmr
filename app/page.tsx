import Image from "next/image";
import Header from "./_root/header";
import MainMMRImage from "../public/room1-1.jpg"

export default function Home() {
  return (
    <div className="bg-white">
      <div className="mx-auto flex flex-col max-w-7xl p-6 space-y-6 lg:px-8">
        <div className="mx-auto flex flex-col items-center justify-items-center font-semibold text-lg inline-block mb-16 mt-16">
          <a href="/guide"
            className="font-semibold text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2">
            포항역 머무름 쉐어하우스 사용방법 바로 보러가기
          </a>
          <div className="text-2xl cursor-pointer  hover:text-indigo-600 transition duration-500 ease-in-out" aria-hidden="true"><a href="/guide">&rarr;</a></div>
        </div>
        <div className="mx-auto flex flex-col items-center justify-items-center font-semibold text-lg mb-16 mt-16 border p-10 border-gray-800">
          <a href="/inquiry"
            className="font-semibold text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2">
            단기숙박 / 장기숙박 문의하기
          </a>
          <div className="text-2xl cursor-pointer  hover:text-indigo-600 transition duration-500 ease-in-out" aria-hidden="true"><a href="/inquiry">&rarr;</a></div>
        </div>
        <div>
        <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
          <div className="rounded overflow-hidden flex flex-col max-w-xl mx-auto">

              <a href="#">
                  <img className="w-full" src="https://phymmr.s3.us-east-2.amazonaws.com/room1-1.jpg" alt="Sunset in the mountains" />
              </a>
              <div className="relative -mt-16 px-10 pt-5 pb-16 bg-white m-10">
                  <a href="#"
                      className="font-semibold text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2">
                      포항역 머무름 쉐어하우스 </a>
                  <p className="text-gray-500 text-sm">
                      포항역 머무름 쉐어하우스는 여행을 시작하기전, 여행에서 돌아가기전, 고요한 휴식이 필요할 때
                      잠시 머무르고 가실 수 있도록 평온한 머무름을 제공합니다.
                  </p>
                  <p className="mt-5 text-gray-600 text-xs">
                      By
                      <a href="#" className="text-xs text-indigo-600 transition duration-500 ease-in-out">
                        Saebyeok
                      </a> 
                  </p>
              </div>

          </div>
        </div>
        </div>
        <div className="flex flex-row ">
          <div className="basis-1/2"> <img src="https://phymmr.s3.us-east-2.amazonaws.com/livingroom.jpg" /> </div>
          <div className="basis-1/2 text-lg text-gray-700 text-right"> 
            <span className="font-semibold">포항역 머무름 쉐어하우스 거실</span>
          </div>
        </div>
        <div className="flex flex-row ">
          <div className="basis-1/2 text-lg text-gray-700 text-left"> 
            <span className="font-semibold">바로 조리가능한 주방</span>
          </div>
          <div className="basis-1/2"> <img src="https://phymmr.s3.us-east-2.amazonaws.com/kitchen.jpg" /> </div>

        </div>
        <div>
          <div className="rounded overflow-hidden flex flex-col max-w-xl mx-auto pt-20">
            <a href="#">
                <img className="w-full" src="https://phymmr.s3.us-east-2.amazonaws.com/romm1-2.jpg" alt="Sunset in the mountains" />
            </a>
            <div className="relative -mt-16 px-10 pt-5 pb-16 bg-white m-10">
                <a href="#"
                    className="font-semibold text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2">
                    1번방 </a>
                <p className="text-gray-500 text-sm">
                    1번방은 넓은 공간으로 퀸사이즈 침대가 편안한 휴식을 제공합니다. 창밖으로 보이는 시원한 풍경이 매력적입니다
                </p>
                <p className="mt-5 text-gray-600 text-xs">
                      <a href="#" className="text-xs text-indigo-600 transition duration-500 ease-in-out">
                        더 자세히보기
                      </a> 
                      <br />
                      <a href="#" className="text-xs text-indigo-600 transition duration-500 ease-in-out">
                        하우스투어 예약하기
                      </a> 
                  </p>
            </div>

            </div>
        </div>
        <div>
          <div className="rounded overflow-hidden flex flex-col max-w-xl mx-auto">
            <a href="#">
                <img className="w-full" src="https://phymmr.s3.us-east-2.amazonaws.com/room2-1.jpg" alt="Sunset in the mountains" />
            </a>
            <div className="relative -mt-16 px-10 pt-5 pb-16 bg-white m-10">
                <a href="#"
                    className="font-semibold text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2">
                    2번방 </a>
                <p className="text-gray-500 text-sm">
                    2번방은 1인실로 저렴하게 머물러 갈 수 있습니다. 침대, 수납장, 옷장, 책상으로 작지만 알찬 가구가 구비되어 있습니다.
                </p>
                <p className="mt-5 text-gray-600 text-xs">
                      <a href="#" className="text-xs text-indigo-600 transition duration-500 ease-in-out">
                        더 자세히보기
                      </a> 
                      <br />
                      <a href="#" className="text-xs text-indigo-600 transition duration-500 ease-in-out">
                        하우스투어 예약하기
                      </a> 
                  </p>
            </div>

            </div>
        </div>
      </div>
    </div>
  );
}
