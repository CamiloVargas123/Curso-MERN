import React ,{useState, useEffect} from "react";
import {Menu} from "antd";
import { Link } from "react-router-dom";
import {logo1} from "../../../assets/img/index";

import "./MenuTopWeb.scss";

export default function MenuTop(){
    return(
        <Menu className="menu-top-web" mode="horizontal">
            <Menu.Item className="menu-top-web__logo">
                <Link to={"/"}><img src={logo1} alt="Logotipo codesing" /></Link>
            </Menu.Item>
            <Menu.Item className="menu-top-web__item">
                <Link to={"/"}>Inicio</Link>                
            </Menu.Item>
            <Menu.Item>
                <Link to={"/contact"}>Contacto</Link>
            </Menu.Item>
            <div>
                social media
            </div>
        </Menu>
    )
}