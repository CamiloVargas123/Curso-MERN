import React from "react";
import {Row, Col, Card} from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHtml5, faCss3, faNode, faGit, faJs, faSass, faReact, faMicrosoft } from '@fortawesome/free-brands-svg-icons';
import {faClipboardCheck, faDatabase} from "@fortawesome/free-solid-svg-icons";

import "./MySkills.scss";



export default function MySkills(){
    const Myskills = [
        {title: "HTML 5", nivel: "Alto", icon: faHtml5},
        {title: "CSS 3", nivel: "Alto", icon: faCss3},
        {title: "Node Js", nivel: "Alto", icon: faNode},
        {title: "Git", nivel: "Alto", icon: faGit},    
        {title: "JavaScript", nivel: "Medio", icon: faJs},
        {title: "SCSS", nivel: "Medio", icon: faSass},
        {title: "React JS", nivel: "Medio", icon: faReact},
        {title: "SCRUM", nivel: "Medio", icon: faClipboardCheck},
        {title: "Azure", nivel: "Bajo", icon: faMicrosoft},
        {title: "Mongo DB", nivel: "Bajo", icon: faDatabase}
    ]
    return(
        <Row className="my-skills">
            <Col lg={24} className="my-skills__title">
                <h2>Mis habilidades</h2>
            </Col>
            <Col lg={4} className="row" />
            <Col lg={16}>
                <Row className="row row-skills">                    
                    {Myskills.map(skill => {
                        return(
                            <Col md={6} key={skill.title}>
                                <CardSkills title={skill.title} nivel={skill.nivel} icon={skill.icon}/>
                            </Col>
                        )
                    })}                    
                </Row>
            </Col>
            <Col lg={4} className="row" />
        </Row>
    )
}

function CardSkills(props){
    const {title, nivel, icon} = props;

    return(
        <Card className="my-skills__card" cover={<FontAwesomeIcon icon={icon} size="9x" className="svgCover" />}>            
            <Card.Meta title={title} description={<div><span>Nivel: </span><strong>{nivel}</strong></div>} />
        </Card>
    )
}