import {BASE_PATH, API_VERSION} from "./config";

export function singUpApi(data){
    const url = `${BASE_PATH}/${API_VERSION}/sign-up`;
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
        if(result.user){
            return true;
        }else{
            return false;
        }
    }).catch(e => {
        return e.message;
    })

    
}