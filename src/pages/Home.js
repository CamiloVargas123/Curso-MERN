import React from "react";
import MainBanner from "../components/Web/MainBanner";
import HomePages from "../components/Web/HomePages";
import MySkills from "../components/Web/MySkills";
import {Helmet} from "react-helmet";

export default function Home(){
    return(
        <>
            <Helmet>
                <title>Codesing</title>
                <meta name="description" content="Home of Website to learn react-js app" data-react-helmet="true" />
            </Helmet>
            <MainBanner />
            <HomePages />
            <MySkills />
        </>
    )
}