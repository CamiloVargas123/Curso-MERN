import Rect, {useState, useEffect} from "react";
import {Switch, List, Button, Modal as ModalAndtd, notification} from "antd";
import {EditOutlined, DeleteOutlined} from "@ant-design/icons";
import Modal from "../../../Modal";
import DragSortableList from "react-drag-sortable";

import "./MenuWebList.scss";

export default function MenuWebList(props){
    const {menu, setReloadMenuWeb} = props;
    const [listItems, setListItems] = useState([]);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    console.log(listItems);
    useEffect(() => {
        const listItems = [];
        menu.forEach(item => {
            listItems.push({
                content: (<MenuItem item={item} />)
            })
        });
        setListItems(listItems);
    }, [menu])

    const onSort = (sortedList, dropEvent) => {
        console.log(sortedList);
    }

    return (
        <div className="menu-web-list">
            <div className="menu-web-list__header">
                <Button type="primary">Menú</Button>
            </div>
            <div className="menu-web-list__items">
                <DragSortableList items={listItems} onSort={onSort} type="vertical" />
            </div>
        </div>
    )
}

function MenuItem(props){
    const {item} = props;

    return (
        <List.Item actions={[
            <Switch defaultChecked={item.active} />,
            <Button type="primary" icon={<EditOutlined />} />,
            <Button type="danger" icon={<DeleteOutlined />} />
        ]}>
            <List.Item.Meta title={item.title} description={item.url} />
        </List.Item>
    )
}