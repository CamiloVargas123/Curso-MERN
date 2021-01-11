import React from "react";
import {Link} from "react-router-dom";
import { Button } from "antd";
import {MenuFoldOutlined, MenuUnfoldOutlined, PoweroffOutlined} from '@ant-design/icons';
import {logo1} from "../../../assets/img/index";
import {logout} from "../../../api/auth";

import './MenuTop.scss';

export default function MenuTop(props) {
    const {menuCollapsed, setmenuCollapsed} = props;

    const logoutUser = () => {
        logout();
        window.location.reload();
    }

    return (
        <div className="menu-top">
            <div className="menu-top__left">
                <Link to={"/admin"}>
                    <img 
                    className="menu-top__left-logo"
                    src={logo1}
                    alt="Logo"
                    />
                </Link>                
                <Button icon={menuCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} onClick={() => setmenuCollapsed(!menuCollapsed)} />
            </div>
            <div className="menu-top__right">
                <Button icon={<PoweroffOutlined />} onClick={() => logoutUser()} />          
            </div>
        </div>
    )
}