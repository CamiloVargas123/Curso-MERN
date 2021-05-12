import React from "react";
import {Helmet} from "react-helmet";

export default function Admin(){
    return(
        <>
            <Helmet>
                <title>CoDesing | Admin</title>
                <meta name="description" content="Interface admin for controller Website" data-react-helmet="true" />
            </Helmet>
            <div>
            <h1>Te encuentras en el apartado de Admin</h1>
            <p>Una breve explicación de todo el proyecto consiste en el manejo de usuarios mediante roles, cuando te registras por primera vez, 
                un usuario ya con roles de Admin debe darle permiso a ese nuevo usuario el cual tendra acceso a realizar un CRUD a todos los
                apartados que se encutran disponibles, entre ellos estan Usuarios, Menú (los que aparecen en la Raiz del proyecto "/") y los Blog </p>
            </div>
        </>
    )
}