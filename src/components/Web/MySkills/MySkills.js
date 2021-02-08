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
            <Col lg={4} className="row" />
            <Col lg={16}>
                <Row className="row row-skills">
                    <Col md={6}>
                        <CardSkills title="HTML 5" description="Nivel: Alto" />
                    </Col>
                </Row>
            </Col>
            <Col lg={4} className="row" />
        </Row>
    )
}

function CardSkills(props){
    const {item, title, description} = props;

    return(
        <Card className="my-skills__card" cover={<FontAwesomeIcon icon={faHtml5} size="9x" className="html5" />}>
            
            <Card.Meta title={title} description={description} />
        </Card>
    )
}