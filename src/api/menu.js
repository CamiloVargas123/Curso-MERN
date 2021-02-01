import {BASE_PATH, API_VERSION} from "./config";

export function getMenusApi(){
    const url = `${BASE_PATH}/${API_VERSION}/get-menus`;

    return fetch(url).then(response => {
        return response.json();
    }).then(result => {
        return result;
    }).catch(err => {
        return err.message;
    })
}

export function updateMenuApi(token, menuId, data){
    const url = `${BASE_PATH}/${API_VERSION}/update-menu/${menuId}`;
    const params = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify(data)
    }

    return fetch(url, params).then(response => {
        return response.json();
    }).then(result => {
        return result.message;
    }).catch(err => {
        return err;
    })
}

export function activateMenuApi(token, menuId, status){
    const url = `${BASE_PATH}/${API_VERSION}/activate-menu/${menuId}`;
    const params = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify({active: status})
    }

    return fetch(url, params).then(response => {
        return response.json();
    }).then(result => {
        return result.message;
    }).catch(err => {
        return console.log(err);
    })
}

export function addMenuAPi(token, menu){
    const url = `${BASE_PATH}/${API_VERSION}/add-menu`;
    const params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify(menu)
    }

    return fetch(url, params).then(response => response.json()).then(result => result.message).catch(err => console.log(err));
}