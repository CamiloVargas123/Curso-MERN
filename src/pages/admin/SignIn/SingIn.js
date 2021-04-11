import React from "react";
import {Layout, Tabs} from "antd";
import {Redirect} from "react-router-dom";
import {logo1} from "../../../assets/img/index";
import RegisterForm from "../../../components/Admin/RegisterForm";
import LoginForm from "../../../components/Admin/LoginForm";
import {getAccessTokenApi} from "../../../api/auth";
import {Helmet} from "react-helmet";

import "./SignIn.scss";

export default function SignIn() {
    const {Content} = Layout;
    const {TabPane} = Tabs;

    if(getAccessTokenApi()) {
        return <Redirect to="/admin" />
    }

    return(
        <>
            <Helmet>
                <title>CoDesing | Acceso</title>
                <meta name="description" content="Login/register user for get access to interface admin" data-react-helmet="true" />
            </Helmet>
            <Layout className="sign-in">
                <Content className="sign-in__content">
                    <h1 className="sign-in__content-logo">
                        <img src={logo1} alt="logotipo" />
                    </h1>
                    <div className="sign-in__content-tabs">
                        <Tabs type="card">
                            <TabPane tab={<span>Entrar</span>} key="1">
                                <LoginForm />
                            </TabPane>
                            <TabPane tab={<span>Nuevo usuario</span>} key="2">
                                <RegisterForm />
                            </TabPane>
                        </Tabs>
                    </div>
                </Content>
            </Layout>
        </>
    )
}