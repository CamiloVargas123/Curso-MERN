import React from "react";
import {Row, Col} from "antd";
import {useParams} from "react-router-dom";
import PostListWeb from "../components/Web/Blog/PostListWeb/PostListWeb";
import PostInfo from "../components/Web/Blog/PostInfo/PostInfo";
import {Helmet} from "react-helmet";

export default function Blog(props) {
    const {location, history} = props;
    const {url} = useParams();
    return(
        <>
            <Helmet>
                <title>Codesing | Blog</title>
                <meta name="description" content="Website with blog false to learn react-js app" data-react-helmet="true" />
            </Helmet>
            <Row>
                <Col md={4}></Col>
                <Col md={16}>
                    {url ? <PostInfo url={url} /> : <PostListWeb location={location} history={history} />}
                </Col>
                <Col md={4}></Col>
            </Row>
        </>
    )
}