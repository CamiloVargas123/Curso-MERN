import React ,{useState, useEffect} from "react";
import {Menu} from "antd";
import { Link } from "react-router-dom";
import {getMenusApi} from "../../../api/menu";
import {logo1} from "../../../assets/img/index";
import SocialLinks from "../SocialLinks";

import "./MenuTopWeb.scss";

export default function MenuTop(){
    const [menuData, setMenuData] = useState([]);
    
    useEffect(() => {
        getMenusApi().then(response => {
            const arrayMenu = [];
            
            response.menusStored.forEach(item => {
                item.active && arrayMenu.push(item);
            });
            setMenuData(arrayMenu);
        })
    },[])

    return(
        <Menu className="menu-top-web" mode="horizontal">
            <Menu.Item className="menu-top-web__logo">
                <Link to={"/"}><img src={logo1} alt="Logotipo codesing" /></Link>
            </Menu.Item>
            
            <div className="menu-top-web__vacio"></div>

            {menuData.map(item => {
                const external = item.url.indexOf("http") > -1 ? true : false;
                if(external){
                    return(
                        <Menu.Item key={item._id} className="menu-top-web__item">
                            <a href={item.url} target="_blank" rel="noreferrer noopener"> {item.title} </a>
                        </Menu.Item>
                    )
                }
                return(
                    <Menu.Item key={item._id} className="menu-top-web__item">
                        <Link to={item.url}> {item.title} </Link>
                    </Menu.Item>
                )            
            })}    

            <SocialLinks />
        </Menu>
    )
}