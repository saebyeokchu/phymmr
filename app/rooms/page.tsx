"use client"

import { useState } from "react";
import { FilledBadge, OutlineBadge } from "../_component/badge";
import { CenterClassName } from "../_data/Consts";
import { RoomType } from "../_data/Enums";
import Wrapper from "./_component/Wrapper";

export default function Rooms() {

    return (
        <Wrapper children={undefined} roomType={RoomType.All} />
    )
}