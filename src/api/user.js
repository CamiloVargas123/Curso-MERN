import {BASE_PATH, API_VERSION} from "./config";

export function signUpApi(token, data, admin){
    const url = `${BASE_PATH}/${API_VERSION}/sign-up${admin}`;
    const params = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        }
    }

    
    return fetch(url, params).then(response => {
        return response.json();
    }).then(result => {
        if(result.user){
            return true;
        }else{
            return false;
        }
    }).catch(e => {
        return e.message;
    })    
}

export function signInApi(data){
    const url = `${BASE_PATH}/${API_VERSION}/sign-in`;
    const params = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }
    
    return fetch(url, params).then(response => {
        return response.json();
    }).then(result => {
        return result;
    }).catch(e => {
        return e.message;
    })
}

export function getUsersApi(token){
    const url = `${BASE_PATH}/${API_VERSION}/get-users`;
    const params = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        }
    }

    return fetch(url, params).then(response => {
        return response.json();
    }).then(result => {
        return result;
    }).catch(err => {
        return err.message;
    })
}

export function getUsersActiveApi(token, status){
    const url = `${BASE_PATH}/${API_VERSION}/get-users-active?active=${status}`;
    const params = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        }
    }

    return fetch(url, params).then(response => {
        return response.json();
    }).then(result => {
        return result;
    }).catch(err => {
        return err.message;
    })
}

export function uploadAvatarApi(token, avatar, userId){
    const url = `${BASE_PATH}/${API_VERSION}/upload-avatar/${userId}`;
    const formData = new FormData();

    formData.append("avatar", avatar, avatar.name);
    const params = {
        method: "PUT",
        body: formData,
        headers: {
            Authorization: token
        }
    }

    return fetch(url, params).then(response => {
        return response.json();
    }).then(result => {
        return result;
    }).catch(err => {
        return err.message;
    })
}

export function getAvatarApi(avatarName){
    const url = `${BASE_PATH}/${API_VERSION}/get-avatar/${avatarName}`;
    return fetch(url).then(response => {
        return response.url;
    }).catch(err => {
        return err.message;
    })
}

export function updateUserApi(token, user, userId){
    const url = `${BASE_PATH}/${API_VERSION}/update-user/${userId}`;
    const params = {
        method: "PUT",
        body: JSON.stringify(user),
        headers:  {
            "Content-Type": "application/json",
            Authorization: token
        }
    }

    return fetch(url, params).then(response => {
        return response.json();
    }).then(result => {
        return result;
    }).catch(err => {
        return err.message;
    })
}

export function activateUserApi(token, userId, status){
    const url = `${BASE_PATH}/${API_VERSION}/activate-user/${userId}`;
    const params = {
        method: "PUT",
        body: JSON.stringify({
            active: status
        }),
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        }
    }

    return fetch(url, params).then(response => {
        return response.json();
    }).then(result => {
        return result.message;
    }).catch(err => {
        return err.message
    })
}

export function deleteUserApi(token, userId){
    const url = `${BASE_PATH}/${API_VERSION}/delete-user/${userId}`;
    const params = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        }
    }

    return fetch(url, params).then(response => {
        return response.json();
    }).then(result => {
        return result.message;
    }).catch(err => {
        return err.message;
    })
}