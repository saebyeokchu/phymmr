"use client"

import { useRouter } from "next/navigation";
import { OutlineBadge } from "../_component/badge";

export default function QNA(){
    const router = useRouter();
    return(
        <div className="max-w-[85rem] px-4 py-4 mx-auto">
            <div className="flex flex-row gap-3">
                <OutlineBadge name={"게약 관리하기"} onClickFunction={()=>router.push("/admin/manage-reserve")}  />
                <OutlineBadge name={"Q&A 추가하기"} onClickFunction={()=>router.push("/admin/manage-qna")} />
            </div>
        </div>
    )
}