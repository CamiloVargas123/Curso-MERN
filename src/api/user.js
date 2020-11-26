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
    console.log(data);
    fetch(url, params).then(response => {
        console.log(response);
    })
}