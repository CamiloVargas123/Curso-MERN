import React from "react";
import {Link} from "react-router-dom";
import { Button } from "antd";
import {MenuFoldOutlined, MenuUnfoldOutlined, PoweroffOutlined} from '@ant-design/icons';
import Logo from "../../../assets/img/logo1.png";

import './MenuTop.scss';

export default function MenuTop(props) {
    const {menuCollapsed, setmenuCollapsed} = props;

    return (
        <div className="menu-top">
            <div className="menu-top__left">
                <Link to={"/admin"}>
                    <img 
                    className="menu-top__left-logo"
                    src={Logo}
                    alt="Logo"
                    />
                </Link>                
                <Button icon={menuCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} onClick={() => setmenuCollapsed(!menuCollapsed)} />
            </div>
            <div className="menu-top__right">
                <Button icon={<PoweroffOutlined />} onClick={() => console.log("logout off")} />          
            </div>
        </div>
    )
}