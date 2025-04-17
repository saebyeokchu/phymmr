import { useRoomContext } from "@/context";
import { formatDate, seperateNumber } from "@/data/Common";
import { RoomType } from "@/data/Enums";

import { getRemainingPrice } from "@/logic/Room";

import { Period } from "@/type/DateType";
import { Tenant } from "@/type/RoomType";

// 미래에셋증권 400854479680 추새벽

export default function ContractContent({
  onCloseClick,
  applyingUser,
  contractContentChecked,
  setContractContentChecked,
  newUserName,
  targetDate,
  generalDateInfo,
  roomType
} : {
  onCloseClick : any,
  applyingUser : Tenant,
  contractContentChecked : boolean,
  setContractContentChecked: any,
  newUserName : string,
  targetDate : Period,
  generalDateInfo : any,
  roomType : RoomType
}) {
    const roomContext = useRoomContext();

    return (
        <div className="relative ">
            <div
              id="modal"
              className="mx-3 hs-overlay fixed inset-0 z-50 flex items-center justify-center "
              role="dialog"
              aria-modal="true"
            >
              <div className="fixed inset-0 bg-black/50"></div>
      
              <div
                className="relative z-60 bg-white rounded-lg shadow-lg max-w-lg w-full p-6"
              >
                <div className="flex flex-row justify-between">
                  <h3 className="text-xl font-semibold">부동산 임대 계약 조건</h3>
                  
                  {/* close button */}
                  <button type="button" className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none " onClick={onCloseClick}>
                    <span className="sr-only">Close</span>
                    <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 6 6 18"></path>
                      <path d="m6 6 12 12"></path>
                    </svg>
                  </button>
                </div>

                <div className="p-2 mt-3 h-96 overflow-y-scroll flex flex-col space-y-3 border border-slate-300">
                  <div>
                    임대인( 추새벽 )과 임차인( {applyingUser.name} ) 은 아래와 같이 임대차 계약을 체결한다
                  </div>

                  <div className="flex flex-col m-2 space-y-1 border border-slate-300 p-3">
                    <p className="font-bold">소재지</p>
                    <p className="text-sm">(도로명주소) 경상북도 포항시 북구 달전로 291 대유아파트 101동 1913호</p>
                    <p className="font-bold">임차할부분</p>
                    <p className="text-sm"> { roomType == RoomType.Room1 && '큰방(약 4㎡)' }  { roomType == RoomType.Room2 && '작은방(약 2㎡)' }</p>
                    <p className="font-bold">계약의종류</p>
                    <p className="text-sm">신규 계약</p>
                  </div>

                  <div className="pt-5 flex flex-col space-y-3 ">
                    <div className="font-bold">[계약내용]</div>

                    <div>
                      <div>
                        <p className="font-bold">제1조(보증금과 사용료 및 관리비) </p>
                        <p className="text-sm mt-1">위 쉐어하우스의 임대차에 관하여 임대인과 임차인은 합의에 의하여 보증금과 차임 및 관리비를 아래와 같이 지불하기로 한다.</p>
                      </div>
                      <div className=" mt-1 flex flex-col space-y-2 border border-slate-300 p-3 text-sm">
                        <div className="flex flex-row justify-between ">
                          <div>
                            보증금
                          </div>
                          <div>
                            금 ₩{generalDateInfo.deposit &&  seperateNumber(generalDateInfo.deposit)}원
                          </div>
                        </div>
                        <div className="flex flex-row justify-between">
                          <div>
                           계약금
                          </div>
                          <div>
                            금 ₩{generalDateInfo.deposit &&  seperateNumber(generalDateInfo.deposit / 10)}원
                          </div>
                        </div>
                        <span className="text-xs flex text-end w-full justify-end">계약금은 계약시에 지불하고 영수함. 영수자 (인)</span>
                        <div className="flex flex-row justify-between">
                          <div>
                           잔금
                          </div>
                          <div>
                            금 ₩{getRemainingPrice(generalDateInfo)}원
                          </div>
                        </div>
                        <div className="text-xs">잔금은 <span className="font-bold">{formatDate(targetDate.startDate)}</span>에 지불한다.</div>
                        <div className="flex flex-row justify-between">
                          <div>
                           총 사용료
                          </div>
                          <div>
                            금 ₩{generalDateInfo.price &&  seperateNumber(generalDateInfo.price)}
                          </div>
                        </div>
                        <div className="text-xs">사용료는 매월(단기 계약의 경운 1회로) <span className="font-bold">{formatDate(targetDate.startDate)}</span>에 지불한다.</div>
                        <div className="flex flex-row justify-between">
                          <div>
                           관리비
                          </div>
                          <div>
                          관리비는 1조 3항과 4항에 따라 지불한다.
                          </div>
                        </div>
                      </div>
                      <div className="mt-1 text-sm">
                        <ul>
                          <li>① 본 쉐어하우스의 큰 방의 주간요금은 15만원, 월간요금은 50만원이다.</li>
                          <li>② 본 쉐어하우스의 작은 방의 주간요금은 10만원, 월간요금은 35만원이다.</li>
                          <li>③ 관리비는 매달 1회 휴대폰 문자로 통보되며 아파트 관리비, 전기료, 수도세, 가스비 등을 포함한다. 임대인은 1/2에 해당하는 금액을 지불하여야 한다.</li>
                          <li>④ 단, 단기거주의 경우 관리비는 퇴실 후 보증금에서 제한다.</li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <p className="font-bold"> 제2조(임대차기간) </p>
                      <p className="text-sm mt-1">임대인은 쉐어하우스의 임대한 방을 임대차 목적대로 사용‧수익할 수 있는 상태로 {formatDate(targetDate.startDate)}일까지 임차인에게 인도하고, 임대차기간은 인도일로부터 <span className="font-bold">{formatDate(targetDate.endDate)}</span>까지로 한다.</p>
                    </div>

                    <div>
                      <p className="font-bold"> 제3조(임차주택의 사용·관리·수선) </p>
                      <div className="mt-1 text-sm">
                        <ul className="space-y-1">
                          <li>① 임차인은 임대인의 동의 없이 쉐어하우스의 임대한 방의 구조를 변경하거나 전대나 임차권 양도를 할 수 없으며, 임대차 목적인 주거 이외의 용도로 사용할 수 없다.</li>
                          <li>② 임대인은 계약 존속 중 임차주택을 사용·수익에 필요한 상태로 유지하여야 하고, 임차인은 임대인이 임차주택의 보존에 필요한 행위를 하는 때 이를 거절하지 못한다.</li>
                          <li>
                            <p>③ 임대인과 임차인은 계약 존속 중에 발생하는 임차주택의 수리 및 비용부담에 관하여 다음과 같이 합의한다. 다만, 합의되지 아니한 기타 수선비용에 관한 부담은 민법, 판례 기타 관습에 따른다.</p>
                            <p>
                              <table className="text-xs min-w-full divide-y divide-gray-200 table-auto">
                                <thead>
                                  <tr>
                                    <th scope="col" className="w-24 px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">부담대상</th>
                                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">부담내용</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 ">
                                  <tr >
                                    <td className="px-6 py-3 text-start">임대인</td>
                                    <td className="px-6 py-3 text-start">예컨대, 난방, 상·하수도, 전기시설 등 임차주택의 주요설비에 대한 노후·불량으로 인한 수선은 민법 제623조, 판례상 임대인이 부담하는 것으로 해석됨</td>
                                  </tr>
                                  <tr>
                                    <td className="px-6 py-3 text-start">임차인</td>
                                    <td className="px-6 py-3 text-start">예컨대, 임차인의 고의·과실에 기한 파손, 전구 등 통상의 간단한 수선, 소모품 교체 비용은 민법 제623조, 판례상 임차인이 부담하는 것으로 해석됨</td>
                                  </tr>
                                </tbody>
                              </table>
                            </p>
                          </li>
                          <li>④ 임차인이 임대인의 부담에 속하는 수선비용을 지출한 때에는 임대인에게 그 상환을 청구할 수 있다.</li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <p className="font-bold"> 제4조(계약의 해제) </p>
                      <div className="mt-1 text-sm">
                      임차인이 임대인에게 잔금을 지급하기 전까지, 임대인은 계약금의 배액(2배)을 상환하고, 임차인은 계약금을 포기하고 이 계약을 해제할 수 있다.
                      </div>
                    </div>

                    <div>
                      <p className="font-bold"> 제5조(채무불이행과 손해배상) </p>
                      <div className="mt-1 text-sm">
                        <p>
                          임차인이 임대료를 1주일 이상 지연해야 하는 경우 반드시 임대인에게 구두합의하며, 그렇지 아니하면 임대차 계약은 자동으로 해지되며 즉시 퇴거해야 한다. 
                        </p>
                        <p className="mt-1">
                          이때 임대료를 1주일이상 지불하지 않은 경우 퇴거전까지 거주하는 일에 비례하여 보증금에서 임대료를 제한다.
                        </p>
                      </div>
                    </div>

                    {/* 제6조(계약의 해지) */}
                    <div>
                      <p className="font-bold"> 제6조(계약의 해지) </p>
                      <div className="mt-1 text-sm">
                        <ul className="space-y-1">
                          <li>① 임차인은 본인의 과실 없이 임차주택의 일부가 멸실 기타 사유로 인하여 임대차의 목적대로 사용할 수 없는 경우에는 계약을 해지할 수 있다. 
                          </li>
                          <li>② 임차인이 일주일 전까지 연장을 통보하지 않으면 자동으로 계약이 종료되는 것으로 갈음한다.
                          </li>
                          <li>③ 임대인은 주택매매 또는 기타사유로 인하여 공유주택사업을 폐업하거나 중단해야 할 경우, 최소 1개월 전에 폐업이나 중단사실을 임차인에게 알려야 한다
                            <p className="mt-1"> 해당월 임대료는 <span className="font-bold">월 임대료를 30등분하여 1일에 해당하는 금액</span>을 이용한 일수만큼 차감하고 나머지 금액은 반환하며, 해당월 외 선입금 받은 임대료가 있다면 100% 반환한다.</p>
                          </li>
                          <li>④ 퇴실통지는 카카오톡, 휴대폰 문자 중 하나를 이용한다.</li>
                          <li>⑤ 해당하는 사용료를 지불 후, <span className="font-bold">임차인의 자의나 과실로 계약이 해지되는 경우 환불되는 금액이 없음</span>에 동의한다.</li>
                        </ul>
                      </div>
                    </div>

                    {/* 제7조(갱신요구와 거절) */}
                    <div>
                      <p className="font-bold"> 제7조(갱신요구와 거절) </p>
                      <div className="mt-1 text-sm">임차인은 계약기간이 끝나는 날로부터 적어도 일주일전에는 임대인에게 계약 갱신을 요구해야 한다.</div>
                    </div>

                    {/* 제8조(계약의 종료) */}
                    <div>
                      <p className="font-bold"> 제8조(계약의 종료) </p>
                      <div className="mt-1 text-sm">
                        <ul className="space-y-1">
                          <li>① 임대차계약이 종료된 경우에 임차인은 임차주택을 원래의 상태로 복구하여 임대인에게 반환하고, 이와 동시에 임대인은 보증금에서 20만원을 제하고 임차인에게 반환한다. 다만, 시설물의 노후화나 통상 생길 수 있는 파손 등은 임차인의 원상복구의무에 포함되지 아니한다. </li>
                          <li>② 1항에서 미반환된 보증금은 제9조에 따른 관리비를 정산후 일할계산하여 퇴거일로부터 2개월 이내 반환한다.</li>
                        </ul>
                      </div>
                    </div>

                    {/* 제9조(비용의 정산) */}
                    <div>
                      <p className="font-bold"> 제9조(비용의 정산) </p>
                      <div className="mt-1 text-sm">
                        <ul className="space-y-1">
                          <li> ① 임차인은 퇴거하는 날까지 사용한 관리비를 정산하여야 한다. </li>
                          <li> ② 임대인은 제 8조에서 미반환된 보증금에서 관리비를 일할계산하여 공제한다. </li>
                        </ul>
                      </div>
                    </div>

                    {/* 제10조(분쟁의 해결) */}
                    <div>
                      <p className="font-bold"> 제10조(분쟁의 해결) </p>
                      <div className="mt-1 text-sm">임대인과 임차인은 본 임대차계약과 관련한 분쟁이 발생하는 경우, 당사자 간의 협의 또는 주택임대차분쟁조정위원회의 조정을 통해 호혜적으로 해결하기 위해 노력한다.</div>
                    </div>

                    {/* 제11조(쉐어하우스 생활규칙의 준수) */}
                    <div>
                      <p className="font-bold"> 제11조(쉐어하우스 생활규칙의 준수) </p>
                      <div className="mt-1 text-sm">
                        <ul className="space-y-1">
                          <li> ① 본 쉐어하우스는 다수가 거주하는 공용시설로서 임차인은 본 계약서 특약사항에 기재된 공동생활수칙을 지키기 위해 노력해야한다. 규칙위반 3회 누적시 즉시퇴실 조치 한다. </li>
                          <li> ② 타인에게 불쾌감을 줄 수 있는 말과 행동을 하지 않는다. 여성비하 또는 성희롱 발언, 성추행, 욕설, 폭력행위는 절대 금지하며, 특히 성희롱, 욕설은 적발시 바로 퇴거조치하고, 성추행, 폭력행위는 발생즉시 경찰에 고발과 동시에 퇴거조치 한다. </li>
                          <li> ③ 임차인은 본인의 욕설, 폭력 등 타인에게 불쾌감을 줄 수 있는 행위가 명백하게 반복될 경우 임대인의 판단하에 즉시퇴거조치될 수 있다. 이 때, 임차인은 해당 월을 제외한 나머지 금액을 환불받을 수 없다. </li>
                          <li>④ 즉시퇴거조치 받은 임차인은 통보를 받은 <span className="font-bold">3일</span> 이내 퇴실하여야 한다.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex flex-row space-x-1">
                  <button
                      onClick={()=>setContractContentChecked(false)}
                      className="justify-center hover:bg-slate-100 group relative w-full items-center rounded-none border py-4 px-5  text-base focus:bg-slate-100"
                      type="button" >
                      거절하기
                  </button>
                  <button
                      onClick={()=>setContractContentChecked(true)}
                      className={`${contractContentChecked && 'bg-slate-100'} justify-center hover:bg-slate-100 group relative flex w-full items-center rounded-none border py-4 px-5 text-base focus:bg-slate-100`}
                      type="button" >
                      동의하기
                  </button>
                </div>
              </div>
            </div>
          </div>
    )
}