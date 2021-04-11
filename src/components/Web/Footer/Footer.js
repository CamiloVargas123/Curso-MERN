import React from "react";
import {Layout, Row, Col} from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCopyright} from "@fortawesome/free-solid-svg-icons";
import MyInfo from "./MyInfo/MyInfo";

import "./Footer.scss";

export default function Footer(){
    return(
        <Layout.Footer className="footer">
            <Row>
                <Col md={4} />
                <Col md={16}>
                    <Row>
                        <Col md={2}></Col>
                        <Col md={20}>
                            <MyInfo />
                        </Col>                        
                        <Col md={2}></Col>
                    </Row>
                    <Row className="footer__copyright">
                        <Col md={12}>
                            <FontAwesomeIcon icon={faCopyright} size="sm" />
                            2021 Todos los derechos reservados.
                        </Col>
                        <Col md={12}>
                            Camilo Vargas | Desarrollador Web
                        </Col>
                    </Row>
                </Col>
                <Col md={4} />
            </Row>
        </Layout.Footer>
    )
}