import React, { useState } from "react";
import {Route, Switch, Redirect} from "react-router-dom";

//Token del usuario
import useAuth from "../hooks/useAuth";

// Component
import MenuTop from "../components/Admin/MenuTop";
import MenuSider from "../components/Admin/MenuSider";
import AdminSignIn from "../pages/admin/SignIn";

//ant desing
import {Layout} from "antd";

//SASS
import "./LayoutAdmin.scss";



export default function LayoutAdmin(props){
    const {routes} = props;
    const [menuCollapsed, setmenuCollapsed] = useState(false);
    const {Header, Content, Footer} = Layout;
    const {user, isLoading} = useAuth();

    console.log(user);

    if(!user) {
        return(
            <>
                <Route path="/admin/login" component={AdminSignIn} />
                <Redirect to="/admin/login" />
            </>
        )
    }
    
    return(
        <Layout>
            <MenuSider menuCollapsed={menuCollapsed} />
            <Layout className="layout-admin" style={{marginLeft: menuCollapsed ? "80px" : "200px"}}>
                <Header className="layout-admin__header">
                    <MenuTop menuCollapsed={menuCollapsed} setmenuCollapsed={setmenuCollapsed} />
                </Header>
                <Content className="layout-admin__content">
                    <LoadRoutes routes={routes} />
                </Content>
                <Footer className="layout-admin__footer">
                    <span>Copyright</span>
                </Footer>
            </Layout>
        </Layout>
    )
}

function LoadRoutes({routes}){

    return(
        <Switch>
            {
                routes.map((route, index) => (
                    <Route 
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        component={route.component}
                    />
                ))
            }
        </Switch>
    )
}