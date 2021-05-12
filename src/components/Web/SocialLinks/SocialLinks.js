import React from "react";
//import {GithubOutlined, FacebookFilled} from "@ant-design/icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

import "./SocialLinks.scss";

export default function SocialLinks(){
    return(
        <div className="social-links">
            <a href="https://www.linkedin.com/in/camilovargas123/" className="linkedin" target="_blank" rel="noreferrer noopener"><FontAwesomeIcon icon={faLinkedin} size="lg" /></a>
            <a href="https://github.com/CamiloVargas123" className="github" target="_blank" rel="noreferrer noopener"><FontAwesomeIcon icon={faGithub} size="lg" /></a>
        </div>
    )
}