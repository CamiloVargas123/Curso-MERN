import React, {useState, useEffect} from "react";
import {Row, Col, Form, Input, Button, DatePicker, notification} from "antd";
import { FontSizeOutlined, LinkOutlined } from "@ant-design/icons";
import moment from "moment";
import {Editor} from "@tinymce/tinymce-react";
import {getAccessTokenApi} from "../../../../api/auth";

import "./AddEditPostForm.scss";

export default function AddEditPostForm(props){
    const {setIsVisible, setReloadPosts, post} = props;
    const [postData, setPostData] = useState({});

    useEffect(() => {
        if(post){
            setPostData(post);
        }
        setPostData({});
    }, [post]);

    return(
        <div className="add-edit-post-form">
            <AddEditForm postData={postData} setPostData={setPostData} post={post} />
        </div>
    )
}

function AddEditForm(props) {
    const {postData, setPostData, post} = props;

    return(
        <Form className="add-edit-post-form" layout="inline">
            <Row gutter={24}>
                <Col span={8}>
                    <Input prefix={<FontSizeOutlined />} placeholder="titulo" />
                </Col>
                <Col span={8}>
                    <Input prefix={<LinkOutlined />} placeholder="url" />
                </Col>
                <Col span={8}>
                    <DatePicker style={{width: "100%"}} format="DD/MM/YYYY HH:mm:ss" placeholder="Fecha de publicación" showTime />
                </Col>
            </Row>

            <Editor
                value=""
                init={{
                height: 500,
                menubar: true,
                plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount'
                ],
                toolbar:
                    'undo redo | formatselect | bold italic backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat | help'
                }}
            />

            <div className="content-btn">
                <Button type="primary" htmlType="submit" className="btn-submit">
                    {post ? "Actualizar post" : "Crear post"}
                </Button>
            </div>
            
        </Form>
    )
}