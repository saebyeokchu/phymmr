export default function Notice({hideMe} : {hideMe : boolean}) {
    return (
        <div className={`${hideMe ? "hidden" : ""} flex flex-row`}>
            <div className="font-bold text-3xl">2024 08 12 안내내용</div>
            <ul className="border-2 border-green-500">
                <li>drag and draw 기능 완료</li>
                <li>비즈크기 조정 가능하도록 구현 완료</li>
                <li>색깔 알고리즘 개선 완료</li>
                <li>5분마다 임시저장 가능하도록 구현 완료</li>
                <li>이미지 크기 조절하여 출력 완료</li>
            </ul>
            <ul className="border-2 border-red-500">
                <li>출력시 비즈크기 조정하기 관련 추가 구현 필요</li>
                <li>에디터에서 비즈크기 조정이 가능할때 현재는 이전 작업물이 모두 사라짐</li>
                <li>현재 그려놓은 작업물을 비즈크기가 변경되어도 가능하게 할때는 추가 구현 필요</li>
            </ul>
        </div>
    );
}