import React, {useState, useEffect} from "react";
import {Row, Col, Form, Input, Button, DatePicker, notification} from "antd";
import { FontSizeOutlined, LinkOutlined } from "@ant-design/icons";
import {Editor} from "@tinymce/tinymce-react";
import moment from "moment";
import {getAccessTokenApi} from "../../../../api/auth";
import {addPostApi, updatePostApi} from "../../../../api/post";

import "./AddEditPostForm.scss";

export default function AddEditPostForm(props){
    const {setIsVisible, setReloadPosts, post} = props;
    const [postData, setPostData] = useState({});
    
    useEffect(() => {
        if(post){
            setPostData(post);
        }else{
            setPostData({});
        }        
    }, [post]);

    const processPost = () => {
        const {title, url, description, date} = postData;

        if(!title || !url || !description || !date){
            notification["error"]({message: "Todos los campos son obligatorios"});
        }else{
            if(!post){
                addPost();
            }else{
                updatePost();
            }    
        }            
    }

    const addPost = () => {
        const token = getAccessTokenApi();

        addPostApi(token, postData).then(response => {
            const typeNotification = response.code === 200 ? "success" : "warning";
            notification[typeNotification]({message: response.message});
            setIsVisible(false);
            setReloadPosts(true);
            setPostData({});
        }).catch(() => {
            notification["error"]({message: "Error del servidor"});
        })
    }

    const updatePost = () => {
        const token = getAccessTokenApi();

        updatePostApi(token, post._id, postData).then(response => {
            const typeNotification = response.code === 200 ? "success" : "warning";
            notification[typeNotification]({message: response.message});
            setIsVisible(false);
            setReloadPosts(true);
            setPostData({});
        }).catch(() => {
            notification["error"]({message: "Error del servidor"});
        })
    }

    return(
        <div className="add-edit-post-form">
            <AddEditForm postData={postData} setPostData={setPostData} post={post} processPost={processPost} />
        </div>
    )
}

function AddEditForm(props) {
    const {postData, setPostData, post, processPost} = props;
    
    return(
        <Form className="add-edit-post-form" layout="inline" onSubmitCapture={processPost}>
            <Row gutter={24}>
                <Col span={8}>
                    <Input prefix={<FontSizeOutlined />} placeholder="titulo" value={postData.title} onChange={e => setPostData({...postData, title: e.target.value})} />
                </Col>
                <Col span={8}>
                    <Input prefix={<LinkOutlined />} placeholder="url" value={postData.url} onChange={e => setPostData({...postData, url: TransformTextUrl(e.target.value)})} />
                </Col>
                <Col span={8}>
                    <DatePicker style={{width: "100%"}} format="DD/MM/YYYY HH:mm:ss" placeholder="Fecha de publicación"
                    showTime={{ defaultValue: moment(moment(), 'HH:mm:ss') }} 
                    value={postData.date && moment(postData.date)} onChange={e => setPostData({...postData, date: moment(e, "DD/MM/YYYY HH:mm:ss").toISOString()})}
                    disabledDate={disabledDate}
                     />
                </Col>
            </Row>

            <Editor
                initialValue={postData.description ? postData.description : ""}                
                init={{
                height: 500,
                menubar: true,
                plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount'
                ],
                toolbar:
                    `undo redo | formatselect | bold italic backcolor | 
                    alignleft aligncenter alignright alignjustify | 
                    bullist numlist outdent indent | removeformat | help`
                }}
                onBlur={e => setPostData({...postData, description: e.target.getContent()})}
            />

            <div className="content-btn">
                <Button type="primary" htmlType="submit" className="btn-submit">
                    {post ? "Actualizar post" : "Crear post"}
                </Button>
            </div>
            
        </Form>
    )
}

function TransformTextUrl(text) {
    const url = text.replace(" ", "-");
    return url.toLowerCase();
}


function disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
}
