import React from "react";
import {GithubOutlined, FacebookFilled} from "@ant-design/icons";

import "./SocialLinks.scss";

export default function SocialLinks(){
    return(
        <div className="social-links">
            <a href="https://facebook.com/CamiloVargas124" className="facebook" target="_blank" rel="noreferrer noopener"><FacebookFilled /></a>
            <a href="https://github.com/CamiloVargas123" className="github" target="_blank" rel="noreferrer noopener"><GithubOutlined /></a>
        </div>
    )
}