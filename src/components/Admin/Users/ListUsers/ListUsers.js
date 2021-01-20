import React, {useState, useEffect} from "react";
import {Switch, List, Avatar, Button, notification} from "antd";
import {EditOutlined, StopOutlined, DeleteOutlined, CheckOutlined} from "@ant-design/icons";
import {noAvatar} from "../../../../assets/img";
import Modal from "../../../Modal";
import EditUserForm from "../EditUserForm";
import {getAvatarApi, activateUserApi} from "../../../../api/user";
import {getAccessTokenApi} from "../../../../api/auth";

import "./ListUsers.scss";

export default function ListUsers(props) {
    const {usersActive, usersInactive, setReloadUsers} = props;

    const [viewUsersActive, setViewUsersActive] = useState(true);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    return (
        <div className="list-users">
            <div className="list-users__switch">
                <Switch defaultChecked onChange={() => setViewUsersActive(!viewUsersActive)} />
                <span> {viewUsersActive  ? "Usuarios Activos" : "Usuarios Inactivos"} </span>
            </div>

            {viewUsersActive ? 
            <UsersActive usersActive={usersActive} setIsVisibleModal={setIsVisibleModal} setModalTitle={setModalTitle} setModalContent={setModalContent} setReloadUsers={setReloadUsers} /> : 
            <UsersInactive usersInactive={usersInactive} setReloadUsers={setReloadUsers} />}

            <Modal title={modalTitle} isVisible={isVisibleModal} setIsVisible={setIsVisibleModal}>
                {modalContent}
            </Modal>
        </div>
    )
}

function UsersActive(props) {
    const {usersActive, setIsVisibleModal, setModalTitle, setModalContent, setReloadUsers} = props;

    const editUser = user => {
        setIsVisibleModal(true);
        setModalTitle(`Editar: ${user.name ? user.name : "..."} ${user.lastname ? user.lastname : "..."}`);
        setModalContent(<EditUserForm user={user} setIsVisibleModal={setIsVisibleModal} setReloadUsers={setReloadUsers} />);
    }
    return (
        <List
            className="users-active"
            itemLayout="horizontal"
            dataSource={usersActive}
            renderItem={user => <UserActive user={user} editUser={editUser} setReloadUsers={setReloadUsers} />}
        />
    )
}
function UserActive(props){
    const {user, editUser, setReloadUsers} = props;
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
            <Button type="danger" onClick={() => console.log("Eliminar")} icon={<DeleteOutlined />} />
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
    const {usersInactive, setReloadUsers} = props;
    
    return (
        <List
            className="users-active"
            itemLayout="horizontal"
            dataSource={usersInactive}
            renderItem={user => <UserInactive user={user} setReloadUsers={setReloadUsers} />}
        />
    )
}
function UserInactive(props){
    const {user, setReloadUsers} = props;
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
            <Button type="danger" onClick={() => console.log("Eliminar")} icon={<DeleteOutlined />} />
        ]}>
            <List.Item.Meta 
                avatar={<Avatar src={avatar ? avatar : noAvatar} />} 
                title={`${user.name ? user.name : "..."} ${user.lastname ? user.lastname : "..."}`}
                description={user.email}
            />
        </List.Item>
    )
}