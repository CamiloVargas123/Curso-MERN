import React from "react";
import {Row, Col, Card} from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHtml5 } from '@fortawesome/free-brands-svg-icons';

import "./MySkills.scss";

export default function MySkills(){
    return(
        <Row className="my-skills">
            <Col lg={24} className="my-skills__title">
                <h2>Mis habilidades</h2>
            </Col>
            <Col lg={4} />
            <Col lg={16}>
                <Row className="row-skills">
                    <Col md={8}>
                        <CardSkills title="HTML 5" description="Conocimiento Alto" />
                    </Col>
                </Row>
            </Col>
            <Col lg={4} />
        </Row>
    )
}

function CardSkills(props){
    const {item, title, description} = props;

    return(
        <Card className="my-skills__card">
            <FontAwesomeIcon icon={faHtml5} />
            <Card.Meta title={title} description={description} />
        </Card>
    )
}