import React, {useState, useEffect} from "react";
import {Button, notification} from "antd";
import {withRouter} from "react-router-dom"
import queryString from "query-string";
import Modal from "../../../components/Modal";
import {getPostApi} from "../../../api/post";

import "./Blog.scss";

function Blog(props){
    const {location, history} = props;
    const [posts, setPosts] = useState(null);
    const [reloadPosts, setReloadPosts] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const {page = 1} = queryString.parse(location.search);
    
    console.log(posts);
    
    useEffect(() => {
        getPostApi(12, page).then(response => {
            if(response?.code !== 200){
                notification["warning"]({message: response.message});
            }
            setPosts(response.posts)
        }).catch( () => {
            notification["error"]({message: "Error del servidor"});
        })
        setReloadPosts(false);
    }, [page, reloadPosts])

    return(
        <div className="blog">
            <div className="blog__add-post">
                <Button type="primary">
                    Nuevo Post
                </Button>
            </div>
            <h1>Post lists</h1>
            <h2>pagination</h2>
            <Modal title={modalTitle} visible={isVisibleModal} setIsVisibleModal={setIsVisibleModal} width="75%" />
        </div>
    )
}

export default withRouter(Blog)