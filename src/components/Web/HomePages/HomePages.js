import React from "react";
import {Row, Col, Card, Button} from "antd";
import {pages} from "../../../assets/img";

import "./HomePages.scss";

export default function HomePages(){

    return(
        <Row className="home-pages">
            <Col lg={24} className="home-pages__title">
                <h2>Proyectos Personales Realizados</h2>
            </Col>
            <Col lg={4}></Col>
            <Col lg={16}>
                <Row className="row-pages">
                    {pages.map(page => {
                        return(
                            <Col md={8} key={page.title}>
                                <CardPages image={page.img} title={page.title} subtitle={page.subtitle} link={page.url} />
                            </Col>
                        )
                    })}
                </Row>
            </Col>
            <Col lg={4}></Col>
        </Row>
    )
}

function CardPages(props){
    const {image, title, subtitle, link} = props;
    
    return(
        <a href={link} target="_blank" rel="noopener noreferrer">
            <Card className="home-pages__card" cover={<img loading="eager" src={image} alt={"imagen de la pagina web "+title} />} actions={[
                <Button>VER PÁGINA</Button>
            ]}>
                <Card.Meta title={title} description={subtitle} />
            </Card>
        </a>
    )
}