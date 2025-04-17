"use client"
import { RoomType } from "../../data/Enums";
import Wrapper from "./_component/Wrapper";

export default function Rooms() {
    return (
        <Wrapper roomType={RoomType.All} >{undefined}</Wrapper>
    )
}