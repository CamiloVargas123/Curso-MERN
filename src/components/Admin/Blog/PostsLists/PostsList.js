import React from "react";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEdit, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {List, Button, Modal, notification} from "antd";
import "./PostsList.js.scss";

export default function PostsList(props) {
    const {posts} = props;

    return(
        <div className="posts-list">
            <List 
                dataSource={posts.docs}
                renderItem={post => <Post post={post} />}
                bordered
            />
        </div>
    )
}

function Post(props){
    const {post} = props;

    return(
        <List.Item actions={[
            <Link to={`/blog/${post.url}`} target="_blank">
                <Button type="primary">
                <FontAwesomeIcon icon={faEye} />
            </Button>
            </Link>,
            <Button type="primary">
                <FontAwesomeIcon icon={faEdit} />
            </Button>,
            <Button type="danger">
                <FontAwesomeIcon icon={faTrashAlt} />
            </Button>
        ]}>
            <List.Item.Meta title={post.title} />
        </List.Item>
    )
}