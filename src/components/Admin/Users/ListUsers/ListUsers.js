import React, {useState} from "react";
import {Switch, List, Avatar, Button} from "antd";
import {EditOutlined, StopOutlined, DeleteOutlined, CheckOutlined} from "@ant-design/icons";
import {noAvatar} from "../../../../assets/img";

import "./ListUsers.scss";

export default function ListUsers(props) {
    const {usersActive, usersInactive} = props;

    const [viewUsersActive, setViewUsersActive] = useState(true);

    return (
        <div className="list-users">
            <div className="list-users__switch">
                <Switch defaultChecked onChange={() => setViewUsersActive(!viewUsersActive)} />
                <span> {viewUsersActive  ? "Usuarios Activos" : "Usuarios Inactivos"} </span>
            </div>
            {viewUsersActive ? <UsersActive usersActive={usersActive} /> : <UsersInactive usersInactive={usersInactive} />}
        </div>
    )
}

function UsersActive(props) {
    const {usersActive} = props;
    return (
        <List
            className="users-active"
            itemLayout="horizontal"
            dataSource={usersActive}
            renderItem={user => (
                <List.Item actions={[
                    <Button type="primary" onClick={() => console.log("editar")} icon={<EditOutlined />} />,
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
    console.log(props);
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