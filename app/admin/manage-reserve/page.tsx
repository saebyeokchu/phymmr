"use client"

import { useRouter } from "next/navigation";
import { OutlineBadge } from "../../_component/badge";

export default function ManageReserve(){
    const router = useRouter();

    return(
        <div className="max-w-[85rem] px-4 py-4 mx-auto">
            <p className="cursor-pointer" onClick={()=>router.push("/admin")}>&larr; 목록으로</p>
            <div className="flex flex-row gap-3">
                <OutlineBadge name={"유효계약"} />
                <OutlineBadge name={"종료계약"} />
            </div>
        </div>
    )
}