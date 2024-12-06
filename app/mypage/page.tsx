export default function Mypage() {
    return (
        <div className="bg-white container p-6 flex flex-col space-y-6">
            <div className="text-2xl font-bold">
                1번방 메이트님 어서오세요!
            </div>
            <div className="bg-slate-100 p-6 text-sm">
                이곳에서 남은 계약기간, 계약서, 공지사항, 경고현황, 월세납인 현황등을 확인하실 수 있습니다
            </div>
            <div className="grid grid-cols-2">
                <div className="col-span-2 text-xl font-bold">
                    머무름 생활관련
                </div>
                <div>
                    공지사항
                </div>
                <div>
                    경고현황
                </div>
                <div>
                    월세납입현황
                </div>
            </div>
            <div className="grid grid-cols-2">
                <div className="col-span-2 text-xl font-bold">
                    계약관련
                </div>
                <div>
                    계약서 확인
                </div>
                <div>
                    남은 계약기간
                </div>
            </div>
        </div>
    )
}