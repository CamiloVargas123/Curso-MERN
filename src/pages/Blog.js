import React from "react";
import {Row, Col} from "antd";
import {useParams} from "react-router-dom"

export default function Blog(props) {
    const {url} = useParams();
    console.log(url);
    return(
        <div>
            <h1>Blog</h1>
        </div>
    )
}