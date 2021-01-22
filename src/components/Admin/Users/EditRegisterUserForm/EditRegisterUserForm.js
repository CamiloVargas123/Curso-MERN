import React, {useState, useEffect, useCallback} from "react";
import {Avatar, Form, Input, Select, Button, Row, Col, notification} from "antd";
import {UserOutlined, MailOutlined, LockOutlined} from "@ant-design/icons";
import {useDropzone} from "react-dropzone";
import {getAccessTokenApi} from "../../../../api/auth";
import {getAvatarApi, uploadAvatarApi, updateUserApi, signUpApi} from "../../../../api/user";
import {noAvatar} from "../../../../assets/img";

import "./EditRegisterUserForm.scss";

export default function EditUserForm(props) {
    const {user, setIsVisibleModal, setReloadUsers, estado} = props;
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

    const updateUser = () => {
        const token = getAccessTokenApi();
        let userUpdate = userData;

        if(userUpdate.password || userUpdate.repeatPassword){
            if(userUpdate.password !== userUpdate.repeatPassword){
                notification["error"]({message: "Las contraseñas no coinciden"});
                return;
            }else{
                delete userUpdate.repeatPassword;
            }            
        }
        if(!userUpdate.name || !userUpdate.lastname || !userUpdate.email){
            notification["error"]({message: "Nombre, apellido y correo son obligatorios"});
            return;
        }
        if(typeof userUpdate.avatar === "object"){
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
            delete userUpdate.password;
            delete userUpdate.repeatPassword;
        }
    }

    const addUser = () => {      
        const token = getAccessTokenApi();  
        let userAdd = userData;
        userAdd.active = true;
        
        if(!userAdd.name || !userAdd.lastname || !userAdd.email || !userAdd.role || !userAdd.password || !userAdd.repeatPassword){
            notification["error"]({message: "Todos los campos son obligatorios"});
        }
        if(userAdd.password !== userAdd.repeatPassword){
            notification["error"]({message: "Las contraseñas no coinciden"});
        }else{
            signUpApi(token, userAdd, "-admin").then(response => {
                notification["success"]({message: "Usuario creado con exito"});
                setIsVisibleModal(false);
                setReloadUsers(true);
            }).catch(err => {
                notification["error"]({message: err.message});
            });
        }
    }

    return (
        <div className="edit-user-form">
            {estado ? null : <UploadAvatar avatar={avatar} setAvatar={setAvatar} />}            
            <EditForm userData={userData} setUserData={setUserData} updateUser={updateUser} addUser={addUser} estado={estado} />
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
    const {userData, setUserData, updateUser, addUser, estado} = props;
    return (
        <Form className="form-edit" onSubmitCapture={estado ? addUser : updateUser} >
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
                        <Input type="email" prefix={<MailOutlined />} placeholder="Correo" value={userData.email} onChange={e => setUserData({...userData, email: e.target.value})} />
                    </Form.Item>
                </Col>
                <Col span={8} >
                    <Form.Item>
                        <Select placeholder="Rol" onChange={e => setUserData({...userData, role: e})} value={userData.role}>
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
                        <Input prefix={<LockOutlined />} type="password" placeholder="Contraseña" value={userData.password} onChange={e => setUserData({...userData, password: e.target.value})} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Input prefix={<LockOutlined />} type="password" placeholder="Repetir contraseña" value={userData.repeatPassword} onChange={e => setUserData({...userData, repeatPassword: e.target.value})} />
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-submit" >
                    {estado ? "Crear Usuario" : "Actualizar Usuario"}
                </Button>
            </Form.Item>
        </Form>
    )
}