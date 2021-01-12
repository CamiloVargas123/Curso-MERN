import React from "react";
import {Link, withRouter} from "react-router-dom";
import {Layout, Menu} from "antd";
import {HomeOutlined, UserOutlined} from '@ant-design/icons';

import './MenuSider.scss';

function MenuSider(props){
    const {menuCollapsed, location} = props;
    const {Sider} = Layout;
    return(
        <Sider className="admin-sider" collapsed={menuCollapsed}>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={[location.pathname]} >
                <Menu.Item key="/admin" icon={<HomeOutlined />}>
                    <Link to={"/admin"} >
                        <span className="nav-text">Home</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="/admin/users" icon={<UserOutlined />}>
                    <Link to={"/admin/users"} >
                        <span className="nav-text">Usuarios</span>
                    </Link>
                </Menu.Item>
            </Menu>
        </Sider>
    )
}

export default withRouter(MenuSider);