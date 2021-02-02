import React, {useState, useEffect} from "react";
import {Input, Button, notification, Form} from "antd";
import {EditOutlined, LinkOutlined} from "@ant-design/icons";
import {updateMenuApi} from "../../../../api/menu";
import {getAccessTokenApi} from "../../../../api/auth";

import "./EditMenuWebForm.scss";

export default function EditMenuWebForm(props){
    const {setIsVisibleModal, setReloadMenuWeb, menu} = props;

    return(
        <div className="edit-menu-web-form">
            <EditForm />
        </div>
    )
}

function EditForm(props){
    const {menuWebData, setMenuWebData, editMenu, menu} = props;

    return(
        <Form className="form-edit">
            <Form.Item>
                <Input prefix={<EditOutlined />} placeholder="Titulo" />
            </Form.Item>
            <Form.Item>
                <Input prefix={<LinkOutlined />} placeholder="URL" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-submit">Actualizar menu</Button>
            </Form.Item>
        </Form>
    )
}