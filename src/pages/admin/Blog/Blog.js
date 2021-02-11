import React, {useState, useEffect} from "react";
import {Button, notification} from "antd";
import Modal from "../../../components/Modal";

import "./Blog.scss";

export default function Blog(){
    const [modalTitle, setModalTitle] = useState("");
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalContent, setModalContent] = useState(null);

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