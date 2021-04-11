import React from "react";
import {logo1} from "../../../../assets/img";
import SocialLink from "../../SocialLinks";

import "./MyInfo.scss";

export default function MyInfo(){
    return(
        <div className="my-info">
            <div className="my-info__logo"><img src={logo1} alt="logotipo de codesing" /> </div>      
            <h4>Soy Camilo Vargas, graduado como ingeniero multimedia, motivado por el desarrollo web y <span>Codesing</span> es mi marca personal.</h4>
            <SocialLink />
        </div>        
    )
}