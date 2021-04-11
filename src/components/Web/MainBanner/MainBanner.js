import React from "react";
import {Col, Row} from "antd";

import "./MainBanner.scss";

export default function MainBanner(){
    return(
        <div className="main-banner">
            <div className="main-banner__dark" />
            <Row>
                <Col lg={4} />
                <Col lg={16} >
                    <h2>Servicios  <br /> de Desarrollo Web</h2>
                    <h3>En manos de un buen profesional con satisfacion garantizada</h3>
                </Col>
                <Col lg={4} />
            </Row>
        </div>
    )
}