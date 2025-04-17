"use client"

import { useRouter } from "next/navigation";
import { FilledBadge, OutlineBadge } from "../../_component/badge";
import { LongButton } from "@/app/_component/button";
import { useEffect, useState } from "react";
import { GetQnaData } from "@/service/SettingService";
import { Qna } from "@/type/RoomType";

const QnaBox = ({id, q, a} : {id:number, q : string, a : string}) => <div className="grid p-3 border gap-2 shadow rounded ">
<div className="row">
    <p className="font-bold">질문</p>
    <p><input type="text"  className="w-full p-2 rounded border" value={q} /></p>
</div>
<div className="row">
    <p  className="font-bold">답변</p>
    <p><input type="text"  className="w-full p-2 rounded border" value={a} /></p>
    
</div>
<div className="row space-x-2">
    <FilledBadge cnProps="cursor-pointer" name={"수정"} />
    <FilledBadge cnProps="cursor-pointer" name={"삭제"} />
</div>
</div>

export default function ManageQna(){
    const router = useRouter();
    const [qnaList, setQnaList] = useState<any[]>([]);

    useEffect(() => {
        updateQnaList();
    }, []);
    
    const updateQnaList = async () => {
        const qnas = await GetQnaData(true);
        if(qnas){
            setQnaList(qnas);
        }
    }
    
    return(
        <div className="max-w-[85rem] px-4 py-4 mx-auto">
            <p onClick={()=>router.push("/admin")}>&larr; 목록으로</p>
            <FilledBadge cnProps="mt-3 cursor-pointer" name={"질문추가하기"} />
            <div className="flex flex-col gap-3 mt-3">
                { qnaList.length > 0 && qnaList.map((qna : Qna) => 
                    <QnaBox id={qna.id!} q={qna.question} a={qna.answer} />
                )}
            </div>
        </div>
    )
}