import React from "react";
import {Route, Switch} from "react-router-dom";

//ant desing
import {Layout} from "antd";

//SASS
import "./LayoutBasic.scss";



export default function LayoutBasic(props){
    const {routes} = props;
    const {Content, Footer} = Layout;

    return(
        <Layout>
            <h1>Menu</h1>
            <Layout>
                <Content>
                    <LoadRoutes routes={routes} />
                </Content>
                <Footer>
                    copyrigh
                </Footer>
            </Layout>
        </Layout>
    )
}

function LoadRoutes({routes}){

    return (
        <Switch>
            {
                routes.map((route, index) => (
                    <Route 
                        key={index}
                        path={route.path}
                        component={route.component}
                        exact={route.exact}
                    />
                ))
            }
        </Switch>
    )
}