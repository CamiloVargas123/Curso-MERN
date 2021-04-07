import React from "react";
import {getAccessTokenApi} from "../../../../api/auth";
import {deletePostApi} from "../../../../api/post";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEdit, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {List, Button, Modal, notification} from "antd";
import "./PostsList.js.scss";

export default function PostsList(props) {
    const {posts, setReloadPosts, editPost} = props;

    const deletePost = post => {
        const accessToken = getAccessTokenApi();
        Modal.confirm({
            title: "Eliminando post",
            content: `¿Deseas eliminar ${post.title}?`,
            okText: "Eliminar",
            okType: "danger",
            cancelText: "Cancelar",
            onOk() {
                deletePostApi(accessToken, post._id).then(response => {
                    const typeNotification = response.code === 200 ? "success" : "warning";
                    notification[typeNotification]({message: response.message});
                    setReloadPosts(true);
                }).catch(() => {
                    notification["error"]({message: "Error del servidor"});
                })
            }
        })
    }

    return(
        <div className="posts-list">
            <List 
                dataSource={posts.docs}
                renderItem={post => <Post post={post} deletePost={deletePost} editPost={editPost} />}
                bordered
            />
        </div>
    )
}

function Post(props){
    const {post, deletePost, editPost} = props;

    return(
        <List.Item actions={[
            <Link to={`/blog/${post.url}`} target="_blank">
                <Button type="primary">
                <FontAwesomeIcon icon={faEye} />
            </Button>
            </Link>,
            <Button type="primary" onClick={() => editPost(post)}>
                <FontAwesomeIcon icon={faEdit} />
            </Button>,
            <Button type="danger" onClick={() => deletePost(post)}>
                <FontAwesomeIcon icon={faTrashAlt} />
            </Button>
        ]}>
            <List.Item.Meta title={post.title} />
        </List.Item>
    )
}