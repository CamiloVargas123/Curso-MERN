import Rect, {useState, useEffect} from "react";
import {Switch, List, Button, Modal as ModalAndtd, notification} from "antd";
import {EditOutlined, DeleteOutlined} from "@ant-design/icons";
import Modal from "../../../Modal";
import DragSortableList from "react-drag-sortable";
import {updateMenuApi, activateMenuApi} from "../../../../api/menu";
import {getAccessTokenApi} from "../../../../api/auth";
import AddMenuWebForm from "../addMenuWebForm";

import "./MenuWebList.scss";

export default function MenuWebList(props){
    const {menu, setReloadMenuWeb} = props;
    const [listItems, setListItems] = useState([]);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    
    useEffect(() => {
        const listItems = [];
        menu.forEach(item => {
            listItems.push({
                content: (<MenuItem item={item} activateMenu={activateMenu} />)
            })
        });
        setListItems(listItems);
    }, [menu])

    const activateMenu = (menu, status) => {
        const accessToken = getAccessTokenApi();
        activateMenuApi(accessToken, menu._id, status).then(response => {
            notification["success"]({message: response})
        })
    }
    const onSort = (sortedList, dropEvent) => {
        const accessToken = getAccessTokenApi();
        
        sortedList.forEach(item => {
            const {_id} = item.content.props.item;
            const order = item.rank;

            updateMenuApi(accessToken, _id, {order});
        })
    }
    const addMenuWebModal = () =>  {
        setIsVisibleModal(true);
        setModalTitle("Creando menú");
        setModalContent(<AddMenuWebForm />)
    }

    return (
        <div className="menu-web-list">
            <div className="menu-web-list__header">
                <Button type="primary" onClick={addMenuWebModal} >Crear Menú</Button>
            </div>
            <div className="menu-web-list__items">
                <DragSortableList items={listItems} onSort={onSort} type="vertical" />
            </div>
            <Modal title={modalTitle} isVisible={isVisibleModal} seIsVisible={setIsVisibleModal} >
                {modalContent}
            </Modal>
        </div>
    )
}

function MenuItem(props){
    const {item, activateMenu} = props;

    return (
        <List>
        <List.Item actions={[
            <Switch defaultChecked={item.active} onChange={e => {activateMenu(item, e)}} />,
            <Button type="primary" icon={<EditOutlined />} />,
            <Button type="danger" icon={<DeleteOutlined />} />
        ]}>
            <List.Item.Meta title={item.title} description={item.url} />
        </List.Item>
        </List>
    )
}