"use client"

import { useEffect, useRef, useState } from "react"

import RoomList from "./component/RoomList"
import BookWrapper from "./component/BookWrapper"
import UserInfoInput from "./component/UserInfoInput"
import { formatDate, seperateNumber } from "../../data/Common"
import Invoice from "./component/Invoice"
import UserInfolList from "./component/UserInfoList"
import { Msg } from "../../data"
import { RulesContent } from "./component/RulesContent"
import { LastConfirmModal } from "./component/LastConfirmModal"
import { doCalculatePrice } from "../../logic/Room"
import {  RoomType } from "../../data/Enums"

import { useRoomContext } from "@/context"
import { UserInfoClass } from "@/class/UserInfoClass"



export default function Book(){
    const roomContext = useRoomContext();

    // let applyingUser = new UserInfoClass();
    const [applyingUser, setApplyingUser] = useState(new UserInfoClass());
    const [newUserName, setnewUserName] = useState<string>('');
    const [newPhoneNumber, setnewPhoneNumber] = useState('');
    const [newAddress, setnewAddress] = useState('');
    const [newAccount, setNewAccount] = useState('');

    const [roomType, setRoomType] = useState<RoomType>(roomContext.roomType);
    // const [applyingUser, setApplyingUser] = useState<Tenant>(new UserInfoClass());
    const [openContractContent, setOpenContractContent] = useState(false);
    const [contractContentChecked, setContractContentChecked] = useState(false);

    const [openShareRules, setOpenShareRules] = useState(false);
    const [shareRulesChecked, setShareRulesChecked] = useState(false);

    const userNameRef : any = useRef(null);
    const userPhoneNumberRef : any = useRef(null);
    const userAddressRef : any = useRef(null);
    const userAccountRef : any = useRef(null);

    const [openCustomDate, setOpenCustomDate] = useState(false);
    const [openLastModal, setOpenLastModal] = useState(false);

    const [generalDateInfo, setGeneralDateInfo] = useState<any>({
        deposit : null,
        price : null,
        diffs :  null
    });
    const [targetDate, setTargetDate] = useState<Period>({ 
        startDate: roomContext.requestedDate.startDate, 
        endDate: roomContext.requestedDate.endDate
    });

    useEffect(()=>{
        checkPreCondition();
    }, []);

    const checkPreCondition = async () => {
        //이미 시작과 종료날짜 / roomType이 설정된 경우 
        if(targetDate.endDate && targetDate.startDate && roomType){
            const price = await doCalculatePrice(targetDate,roomType);
            if(price){
                setGeneralDateInfo({
                    deposit : price.deposit,
                    price : price.totalPrice,
                    diffs :  price.diffs
                })
            }
        }
    }

    //방선택 -> 날짜선택 -> 계약자이름 입력 -> 규칙확인
    function checkCustomDateAvailable(open : boolean): void {
        //check if user can select date
        if(roomType == RoomType.All){
            window.alert("원하시는 방 타입을 선택해주세요.");
            return;
        }

        setOpenCustomDate(true);
    }

    const updateApplyingUser = () => {
        
        const userName = userNameRef.current;
        const userPhoneNumber = userPhoneNumberRef.current;
        const userAddress = userAddressRef.current;
        const userAccount = userAccountRef.current;

        if(userName){
            applyingUser.name = userName.value;
            setnewUserName(userName.value);
        }

        if(userPhoneNumber){
            applyingUser.phoneNumber = userPhoneNumber.value;
            setnewPhoneNumber(userPhoneNumber.value);
        }

        if(userAddress){
            applyingUser.address = userAddress.value;
            setnewAddress(userAddress.value);
        }

        if(userAccount){
            applyingUser.accountNumber = userAccount.value;
            setNewAccount(userAccount.value);
        }

        setApplyingUser(applyingUser);

    }

    const openConsentModal = (opened : boolean, targetModal : string) => {

        // applyingUser.getUser();

        if(opened){
            if(!(targetDate.startDate && targetDate.endDate)){
                window.alert(Msg.RoomMsg.NotValidDates);
                return;
            }

            if(!applyingUser.isUserInfoFilled()){
                window.alert(Msg.RoomMsg.NotValidTenantInfo);
                return;
            }
        }

        if(targetModal == "rules"){
            setOpenShareRules(opened);
        }else{
            setOpenContractContent(opened);
        }

    }

    const requestCheckIn = () => {
        //Tenant 여부 확인
        if(!applyingUser.isUserInfoFilled()){
            window.alert("입실 신청을 위한 모든 정보를 입력해 주세요.");
            return;
        }

        //계약정보, 규칙 동의 확인
        if(!contractContentChecked || !shareRulesChecked){
            window.alert("쉐어하우스 규칙과 부동산 임대 계약 조건에 모두 동의하셔야 예약을 요청하실 수 있습니다.");
            return;
        }

        //중요한 정보 알리는 모달 다시한번 보여주기
        setOpenLastModal(true);
    }

    const setRequestedRoomType = (newValue : RoomType) => {
        roomContext.roomType = newValue;
        setRoomType(newValue);
    }

    return(
        <>
            <div className="py-3">
                <div className="pt-3 h-full text-center justify-center items-center content-center place-items-center justify-items-center self-center place-content-center ">
                    <h2 className="text-2xl text-gray-800 font-bold ">
                        입실 요청
                    </h2>
                </div>

                
                <div className="mx-3">
                    
                    {/* room info */}
                    <BookWrapper sectionTitle="방 정보">
                        <a className="text-sm text-blue-400 cursor-pointer hover:underline" href="/rooms"> 방 구경하러 가기 </a>
                        <RoomList roomType={roomType} setRequestedRoomType={setRequestedRoomType} />
                    </BookWrapper>

                    {/* request info */}
                    <BookWrapper sectionTitle={"입실 정보"}>
                        {/* date action */}
                        <div className="flex flex-row justify-between">
                            <div>날짜 정보</div>
                            { targetDate.startDate && targetDate.endDate ?
                                <div>{formatDate(targetDate.startDate)} ~ {formatDate(targetDate.endDate)}(<span onClick={()=>checkCustomDateAvailable(true)} className="text-sm underline text-blue-400 cursor-pointer" >변경</span>)</div>
                                    :
                                <span onClick={()=>checkCustomDateAvailable(true)} className="underline text-blue-400 cursor-pointer">날짜 설정하기</span>
                            }
                        </div>
                        
                        {/* custom date modal */}
                        { openCustomDate && 
                            <ModalDate 
                                onCloseClick={()=>setOpenCustomDate(false)} 
                                dateValue = {targetDate}
                                setDateValue = {setTargetDate}
                                selectedRoomType = {roomType}
                                setGeneralDateInfo = {setGeneralDateInfo}
                            /> 
                        }

                        <div className="mt-3 flex flex-col justify-between">
                            <div>계약자 정보</div>
                            <UserInfoInput 
                                userNameRef={userNameRef} 
                                userPhoneNumberRef={userPhoneNumberRef} 
                                userAddressRef={userAddressRef} 
                                userAccountRef={userAccountRef} 
                                updateApplyingUser={updateApplyingUser}                            
                            />
                        </div>
                    </BookWrapper>
                    
                    {/* Consent Form */}
                    <BookWrapper sectionTitle="계약 정보" sectionSubTitle={<>머무름 쉐어하우스는 단기 임대계약입니다. 아래 규칙에 <span className="text-red-600 font-bold">동의</span> 하셔야 입실하실 수 있습니다.</>}>
                        <div className="mt-3 flex flex-row justify-between">
                            <div>부동산 임대 계약 조건</div>
                            <div>
                                { contractContentChecked ?
                                    <>
                                        <FilledBadge 
                                            name={"동의완료"}
                                        />
                                        (<span onClick={() => openConsentModal(true, "contract")} className="text-sm underline text-blue-400 cursor-pointer" >변경</span>)
                                    </>
                                :
                                    <OutlineBadge 
                                        name={"확인하기"}
                                        onClickFunction={() => openConsentModal(true, "contract")}
                                    />
                                }
                            </div>
                        </div>
                        <div className="mt-3 flex flex-row justify-between">
                            <div>쉐어하우스 규칙</div>
                            <div>{ shareRulesChecked ?
                                    <>
                                        <FilledBadge 
                                            name={"동의완료"}
                                        />
                                        (<span onClick={() => openConsentModal(true, "rules")} className="text-sm underline text-blue-400 cursor-pointer" >변경</span>)
                                    </>
                                :
                                    <OutlineBadge 
                                        name={"확인하기"}
                                        onClickFunction={() => openConsentModal(true, "rules")}
                                    />
                                }</div>
                        </div>
                        <div className="mt-3 flex flex-col ">
                            <div>게스트 정보</div>
                            <UserInfolList 
                                newUserName={newUserName} 
                                newPhoneNumber={newPhoneNumber} 
                                newAddress={newAddress} 
                                newAccount={newAccount}                            
                            />
                        </div>
                    </BookWrapper>
                                
                    {/* Payment Option */}
                    <BookWrapper sectionTitle="결제 방식">
                        <div className="flex flex-row justify-between">
                            <p className="font-bold">무통장 입금</p>
                            <p className="text-sm">{MyAccount}</p>
                        </div>
                    </BookWrapper>
                    
                    {/* 요금 세부 정보 */}
                    <BookWrapper sectionTitle="요금 세부 정보">
                        <Invoice generalDateInfo={generalDateInfo} />
                    </BookWrapper>
                    
                    {/* tenant messgae */}
                    <BookWrapper sectionTitle="메시지">
                        <textarea rows={5} className="text-sm border rounded w-full p-2" placeholder="머무름에게 전하고 싶은 이야기를 적어주세요"/>
                    </BookWrapper>
                    
                    {/* refund info */}
                    <BookWrapper sectionTitle="환불">
                        <div className="text-sm">
                            <p>
                                머무름은 단기 임대 계약으로 운영되는 부동산 임대 사업으로 월세(단기의 경우 1회성 사용료)를 지불 하신 후 <span className="font-bold text-red-600">환불되지 않습니다.</span>
                            </p>
                            <p className="mt-2">
                                단 계약금 입금후 실제 <span className="underline">입주전까지 언제든 입실을 취소</span>하실 수 있으며 이때 <span className="font-bold text-red-600">계약금은 환불되지 않습니다.</span>
                            </p>
                        </div>
                    </BookWrapper>
                    
                    {/* notice */}
                    <BookWrapper sectionTitle="">
                        <div className="text-sm">
                            머무름이 24시간 이내 계약금을 확인하고 예약 요청을 수락하기 전까지는 예약이 아직 확정된 것이 아닙니다. <strong>예약 확정 전까지는 언제든 취소</strong>하실 수 있습니다.
                        </div>
                    </BookWrapper>

                </div>

                <div className="p-3 my-3">
                    <LongButton name={"예약요청"} onClickFunction={requestCheckIn} />
                </div>

            </div>

            { openContractContent && 
                <ContractContent 
                    onCloseClick={() => setOpenContractContent(false)} 
                    applyingUser={applyingUser.getUser()}
                    contractContentChecked={contractContentChecked}
                    setContractContentChecked={setContractContentChecked}
                    newUserName = {newUserName}
                    targetDate = {targetDate}
                    generalDateInfo={generalDateInfo}
                    roomType={roomType}
                />}

            { openShareRules && 
                <RulesContent 
                    shareRulesChecked={shareRulesChecked} 
                    setShareRulesChecked={setShareRulesChecked} 
                    onCloseClick={() => setOpenShareRules(false)}                
                />
            }

            { openLastModal &&
                <LastConfirmModal 
                    onCloseClick={() => setOpenLastModal(false)}
                    newUserName={newUserName}
                    applyingUser={applyingUser.getUser()}
                    roomType={roomType}
                    generalDateInfo={generalDateInfo}
                    targetDate = {targetDate}
                />
            }
            
        </>
    )
}