import React from "react";
import MainBanner from "../components/Web/MainBanner";
import HomePages from "../components/Web/HomePages";
import MySkills from "../components/Web/MySkills";

export default function Home(){
    return(
        <>
            <MainBanner />
            <HomePages />
            <MySkills />
        </>
    )
}