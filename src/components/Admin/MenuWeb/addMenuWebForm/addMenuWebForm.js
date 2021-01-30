import React, {useState} from "react";
import {Form, Input, Button, Select, notification} from "antd";
import {FontSizeOutlined} from "@ant-design/icons";

import "./addMenuWebForm.scss";

export default function addMenuWebForm(props){
    return(
        <div className="add-menu-web-form">
            <AddForm />
        </div>
    )
}

function AddForm(props){
    const selectBefore = (
        <Select defaultValue="http://" >
            <Select.Option value="http://" >http://</Select.Option>
            <Select.Option value="https://" >https://</Select.Option>
        </Select>
    )
    return(
        <Form className="form-add">
            <Form.Item>
                <Input prefix={<FontSizeOutlined />} placeholder="Titulo" /*value="" onChange={}*/ />
            </Form.Item>
            <Form.Item>
                <Input addonBefore={selectBefore} placeholder="URL" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-submit">Crear menú</Button>
            </Form.Item>
        </Form>
    )
}