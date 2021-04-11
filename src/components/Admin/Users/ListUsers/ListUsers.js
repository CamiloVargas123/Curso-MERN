import React, {useState, useEffect} from "react";
import {Switch, List, Avatar, Button, notification, Modal as ModalAntd} from "antd";
import {EditOutlined, StopOutlined, DeleteOutlined, CheckOutlined, WarningOutlined, UserAddOutlined} from "@ant-design/icons";
import {noAvatar} from "../../../../assets/img";
import Modal from "../../../Modal";
import EditUserForm from "../EditRegisterUserForm";
import {getAvatarApi, activateUserApi, deleteUserApi} from "../../../../api/user";
import {getAccessTokenApi} from "../../../../api/auth";

import "./ListUsers.scss";

export default function ListUsers(props) {
    const {usersActive, usersInactive, setReloadUsers} = props;

    const [viewUsersActive, setViewUsersActive] = useState(true);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    const showDeleteConfirm = user => {
        const accessToken = getAccessTokenApi();

        ModalAntd.confirm({
            title: "Eliminando usuario",
            icon: <WarningOutlined />,
            content: `¿Estas seguro que deseas eliminar a ${user.email}?`,
            okText: 'Eliminar',
            okType: "danger",
            cancelText: 'Cancelar',
            onOk(){
                deleteUserApi(accessToken, user._id).then(response => {
                    notification["success"]({message: response});
                    setReloadUsers(true);
                }).catch(err => {
                    notification["error"]({message: err});
                })
            }
        })
    }

    const addUserModal = user => {
        setIsVisibleModal(true);
        setModalTitle("Creando nuevo usuario");
        setModalContent(<EditUserForm user={user} setIsVisibleModal={setIsVisibleModal} setReloadUsers={setReloadUsers} estado={true} />);
    }

    return (
        <div className="list-users">
            <div className="list-users__header">
                <div className="list-users__header-switch">
                    <Switch defaultChecked onChange={() => setViewUsersActive(!viewUsersActive)} />
                    <span> {viewUsersActive  ? "Usuarios Activos" : "Usuarios Inactivos"} </span>
                </div>
                <Button type="primary" onClick={addUserModal} icon={<UserAddOutlined />}>Crear Usuario</Button>
            </div>            

            {viewUsersActive ? 
            <UsersActive usersActive={usersActive} setIsVisibleModal={setIsVisibleModal} setModalTitle={setModalTitle} setModalContent={setModalContent} setReloadUsers={setReloadUsers} showDeleteConfirm={showDeleteConfirm} /> : 
            <UsersInactive usersInactive={usersInactive} setReloadUsers={setReloadUsers} showDeleteConfirm={showDeleteConfirm} />}

            <Modal title={modalTitle} isVisible={isVisibleModal} setIsVisible={setIsVisibleModal}>
                {modalContent}
            </Modal>
        </div>
    )
}

function UsersActive(props) {
    const {usersActive, setIsVisibleModal, setModalTitle, setModalContent, setReloadUsers, showDeleteConfirm} = props;

    const editUser = user => {
        setIsVisibleModal(true);
        setModalTitle(`Editar: ${user.name ? user.name : "..."} ${user.lastname ? user.lastname : "..."}`);
        setModalContent(<EditUserForm user={user} setIsVisibleModal={setIsVisibleModal} setReloadUsers={setReloadUsers} estado={false} />);
    }
    return (
        <List
            className="users-active"
            itemLayout="horizontal"
            dataSource={usersActive}
            renderItem={user => <UserActive user={user} editUser={editUser} setReloadUsers={setReloadUsers} showDeleteConfirm={showDeleteConfirm} />}
        />
    )
}
function UserActive(props){
    const {user, editUser, setReloadUsers, showDeleteConfirm} = props;
    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        if(user.avatar){
            getAvatarApi(user.avatar).then(response => {
                setAvatar(response);
            })
        }else {
            setAvatar(null);
        }
    }, [user]);

    const desactivateUser = () => {
        const accessToken = getAccessTokenApi();

        activateUserApi(accessToken, user._id, false).then(response => {
            notification["success"]({message: response});
            setReloadUsers(true);
        }).catch(err => {
            notification["error"]({message: err});
        })
    }

    return (
        <List.Item actions={[
            <Button type="primary" onClick={() => editUser(user)} icon={<EditOutlined />} />,
            <Button type="danger" onClick={desactivateUser} icon={<StopOutlined />} />,
            <Button type="danger" onClick={() => {showDeleteConfirm(user)}} icon={<DeleteOutlined />} />
        ]}>
            <List.Item.Meta 
                avatar={<Avatar src={avatar ? avatar : noAvatar} />} 
                title={`${user.name ? user.name : "..."} ${user.lastname ? user.lastname : "..."}`}
                description={user.email}
            />
        </List.Item>
    )
}

function UsersInactive(props) {
    const {usersInactive, setReloadUsers, showDeleteConfirm} = props;
    
    return (
        <List
            className="users-active"
            itemLayout="horizontal"
            dataSource={usersInactive}
            renderItem={user => <UserInactive user={user} setReloadUsers={setReloadUsers} showDeleteConfirm={showDeleteConfirm} />}
        />
    )
}
function UserInactive(props){
    const {user, setReloadUsers, showDeleteConfirm} = props;
    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        if(user.avatar){
            getAvatarApi(user.avatar).then(response => {
                setAvatar(response);
            })
        }else {
            setAvatar(null);
        }
    }, [user]);

    const activatedUser = () => {
        const accessToken = getAccessTokenApi();

        activateUserApi(accessToken, user._id, true).then(response => {
            notification["success"]({message: response});
            setReloadUsers(true);
        }).catch(err => {
            notification["error"]({message: err});
        })
    }

    return (
        <List.Item actions={[
            <Button type="primary" onClick={activatedUser} icon={<CheckOutlined />} />,
            <Button type="danger" onClick={() => {showDeleteConfirm(user)}} icon={<DeleteOutlined />} />
        ]}>
            <List.Item.Meta 
                avatar={<Avatar src={avatar ? avatar : noAvatar} />} 
                title={`${user.name ? user.name : "..."} ${user.lastname ? user.lastname : "..."}`}
                description={user.email}
            />
        </List.Item>
    )
}