import Rect from "react";

import "./MenuWebList.scss";

export default function MenuWebList(props){
    const {menu, setReloadMenuWeb} = props;

    console.log(menu);

    return (
        <div>
            {menu.map(item => (<p key={item._id}>{item.title}</p>))}
        </div>
    )
}