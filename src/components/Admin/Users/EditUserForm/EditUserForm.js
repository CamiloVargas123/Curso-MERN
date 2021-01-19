import React, {useState, useEffect, useCallback} from "react";
import {Avatar, Form, Input, Select, Button, Row, Col, notification, Result} from "antd";
import {UserOutlined, MailOutlined, LockOutlined} from "@ant-design/icons";
import {useDropzone} from "react-dropzone";
import {getAccessTokenApi} from "../../../../api/auth";
import {getAvatarApi, uploadAvatarApi, updateUserApi} from "../../../../api/user";
import {noAvatar} from "../../../../assets/img";

import "./EditUserForm.scss";

export default function EditUserForm(props) {
    const {user, setIsVisibleModal, setReloadUsers} = props;
    const [avatar, setAvatar] = useState(null);
    const [userData, setUserData] = useState({});

    useEffect(() => {
        setUserData({
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            role: user.role,
            avatar: user.avatar
        })
    }, [user]);

    useEffect(() => {
        if(user.avatar){
            getAvatarApi(user.avatar).then(response => {
                setAvatar(response);
            })
        }else{
            setAvatar(null);
        }
    }, [user]);

    useEffect(() => {
        if(avatar){
            setUserData({...userData, avatar: avatar.file})
        }
    }, [avatar]);

    const updateUser = e => {
        const token = getAccessTokenApi();
        let userUpdate = userData;

        if(userUpdate.password || userUpdate.repeatPassword){
            if(userUpdate.password !== userUpdate.repeatPassword){
                notification["error"]({message: "Las contraseñas no coinciden"})
            }
            return;
        }
        if(!userUpdate.name || !userUpdate.lastname || !userUpdate.email){
            notification["error"]({message: "Nombre, apellido y correo son obligatorios"});
            return;
        }
        if(typeof userUpdate.avatar === "Object"){
            uploadAvatarApi(token, userUpdate.avatar, user._id).then(reponse => {
                userUpdate.avatar = reponse.avatarName;
                updateUserApi(token, userUpdate, user._id).then(result => {
                    notification["success"]({message: result.message});
                    setIsVisibleModal(false);
                    setReloadUsers(true);
                });
            });
        }else{
            updateUserApi(token, userUpdate, user._id).then(result => {
                notification["success"]({message: result.message});
                setIsVisibleModal(false);
                setReloadUsers(true);
            });
        }
    }

    return (
        <div className="edit-user-form">
            <UploadAvatar avatar={avatar} setAvatar={setAvatar} />
            <EditForm userData={userData} setUserData={setUserData} updateUser={updateUser} />
        </div>
    )
}

function UploadAvatar(props) {
    const {avatar, setAvatar} = props;
    const [avatarUrl, setAvatarUrl] = useState(null);

    useEffect(() => {
        if(avatar){
            if(avatar.preview){
                setAvatarUrl(avatar.preview)
            }else{
                setAvatarUrl(avatar);
            }
        }else{
            setAvatarUrl(null);
        }
    }, [avatar]);

    const onDrop = useCallback(
        acceptedFiles => {
            const file = acceptedFiles[0];
            setAvatar({file, preview: URL.createObjectURL(file)})
        }, 
        [setAvatar]
    );
    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        onDrop
    });

    return (
        <div className="upload-avatar" {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? <Avatar size={150} src={noAvatar} /> : 
            <Avatar size={150} src={avatarUrl ? avatarUrl : noAvatar} />}
        </div>
    )
}

function EditForm(props) {
    const {userData, setUserData, updateUser} = props;
    return (
        <Form className="form-edit" onSubmitCapture={updateUser} >
            <Row gutter={24}>
                <Col span={12} >
                    <Form.Item>
                        <Input prefix={<UserOutlined />} placeholder="Nombre" value={userData.name} onChange={e => setUserData({...userData, name: e.target.value})} />
                    </Form.Item>
                </Col>
                <Col span={12} >
                    <Form.Item>
                        <Input prefix={<UserOutlined />} placeholder="Apellido" value={userData.lastname} onChange={e => setUserData({...userData, lastname: e.target.value})} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col span={16} >
                    <Form.Item>
                        <Input prefix={<MailOutlined />} placeholder="Correo" value={userData.email} onChange={e => setUserData({...userData, email: e.target.value})} />
                    </Form.Item>
                </Col>
                <Col span={8} >
                    <Form.Item>
                        <Select placeholder="Selecciona el rol" onChange={e => setUserData({...userData, role: e})} value={userData.role}>
                            <Select.Option value="admin">Administrador</Select.Option>
                            <Select.Option value="editor">Editor</Select.Option>
                            <Select.Option value="reviewr">Revisor</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input prefix={<LockOutlined />} type="password" placeholder="Contraseña" onChange={e => setUserData({...userData, password: e.target.value})} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Input prefix={<LockOutlined />} type="password" placeholder="Repetir contraseña" onChange={e => setUserData({...userData, repeatPassword: e.target.value})} />
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-submit" >
                    Actualizar Usuario
                </Button>
            </Form.Item>
        </Form>
    )
}