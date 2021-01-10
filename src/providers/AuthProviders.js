import React, {useState, useEffect, createContext} from "react";
import {getAccessTokenApi, getRefreshTokenApi, refreshAccessTokenApi, logout} from "../api/auth";
import jwtDecode from "jwt-decode";

export const AuthContext = createContext();

export default function AuthProvider(props) {
    const {children} = props;
    const [user, SetUser] = useState({
        user: null,
        isLoading: true
    });

    useEffect(() => {
        checkUserLogin(SetUser);
    }, []);

    return <AuthContext.Provider value={user} >{children}</AuthContext.Provider>
}

function checkUserLogin(SetUser) {
    const accessToken = getAccessTokenApi();

    if(!accessToken){
        const refreshToken = getRefreshTokenApi();

        if(!refreshToken){
            logout();
            SetUser({
                user: null,
                isLoading: false
            });
        }else {
            refreshAccessTokenApi(refreshToken);
        }

    }else {
        SetUser({
            user: jwtDecode(accessToken),
            isLoading: false
        })
    }
}