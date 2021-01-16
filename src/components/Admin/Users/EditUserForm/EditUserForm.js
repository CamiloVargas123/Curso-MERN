import React from "react";

import "./EditUserForm.scss";

export default function EditUserForm(props) {
    const {user} = props;
    return (
        <div>
            <h2>Form of edit user</h2>
            <h2>{user.email}</h2>
        </div>
    )
}