import React, {useState} from "react";
import {Switch, List, Avatar, Button} from "antd";
import {EditOutlined, StopOutlined, DeleteOutlined, CheckOutlined} from "@ant-design/icons";
import {noAvatar} from "../../../../assets/img";
import Modal from "../../../Modal";
import EditUserForm from "../EditUserForm";

import "./ListUsers.scss";

export default function ListUsers(props) {
    const {usersActive, usersInactive} = props;

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
            <UsersActive usersActive={usersActive} setIsVisibleModal={setIsVisibleModal} setModalTitle={setModalTitle} setModalContent={setModalContent} /> : 
            <UsersInactive usersInactive={usersInactive} />}

            <Modal title={modalTitle} isVisible={isVisibleModal} setIsVisible={setIsVisibleModal}>
                {modalContent}
            </Modal>
        </div>
    )
}

function UsersActive(props) {
    const {usersActive, setIsVisibleModal, setModalTitle, setModalContent} = props;

    const editUser = user => {
        setIsVisibleModal(true);
        setModalTitle(`Editar: ${user.name ? user.name : "..."} ${user.lastname ? user.lastname : "..."}`);
        setModalContent(<EditUserForm user={user} />);
    }
    return (
        <List
            className="users-active"
            itemLayout="horizontal"
            dataSource={usersActive}
            renderItem={user => (
                <List.Item actions={[
                    <Button type="primary" onClick={() => editUser(user)} icon={<EditOutlined />} />,
                    <Button type="danger" onClick={() => console.log("desactivar")} icon={<StopOutlined />} />,
                    <Button type="danger" onClick={() => console.log("Eliminar")} icon={<DeleteOutlined />} />
                ]}>
                    <List.Item.Meta 
                        avatar={<Avatar src={user.avatar ? user.avatar : noAvatar} />} 
                        title={`${user.name ? user.name : "..."} ${user.lastname ? user.lastname : "..."}`}
                        description={user.email}
                    />
                </List.Item>
            )}
        />
    )
}
function UsersInactive(props) {
    const {usersInactive} = props;
    
    return (
        <List
            className="users-active"
            itemLayout="horizontal"
            dataSource={usersInactive}
            renderItem={user => (
                <List.Item actions={[
                    <Button type="primary" onClick={() => console.log("Activar usuario")} icon={<CheckOutlined />} />,
                    <Button type="danger" onClick={() => console.log("Eliminar")} icon={<DeleteOutlined />} />
                ]}>
                    <List.Item.Meta 
                        avatar={<Avatar src={user.avatar ? user.avatar : noAvatar} />} 
                        title={`${user.name ? user.name : "..."} ${user.lastname ? user.lastname : "..."}`}
                        description={user.email}
                    />
                </List.Item>
            )}
        />
    )
}