import React from "react";
import {Route, Switch} from "react-router-dom";
import MenuTopWeb from "../components/Web/MenuTopWeb";
import Footer from "../components/Web/Footer/Footer";

//ant desing
import {Row, Col} from "antd";

//SASS
import "./LayoutBasic.scss";



export default function LayoutBasic(props){
    const {routes} = props;
    

    return(
        <>
            <Row>
            <Col lg={4} />
            <Col lg={16}>
                <MenuTopWeb />                
            </Col>
            <Col lg={4} />
            </Row>
            <LoadRoutes routes={routes} />
            <Footer />
        </>
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