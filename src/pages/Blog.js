import React from "react";
import {Row, Col} from "antd";
import {useParams} from "react-router-dom";
import PostListWeb from "../components/Web/Blog/PostListWeb/PostListWeb";

export default function Blog(props) {
    const {location, history} = props;
    const {url} = useParams();
    return(
        <Row>
            <Col md={4}></Col>
            <Col md={16}>
                {url ? "postInfo" : <PostListWeb location={location} history={history} />}
            </Col>
            <Col md={4}></Col>
        </Row>
    )
}