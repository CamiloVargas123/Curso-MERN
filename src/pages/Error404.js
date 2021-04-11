import React from "react";
import {Helmet} from "react-helmet";

export default function Error404(){
    return (
        <>
            <Helmet>
                <title>No Fount</title>
                <meta name="description" content="Codesing | Error 404" data-react-helmet="true" />
            </Helmet>
            <div>
                <h1>Error 404...</h1>
            </div>
        </>
    )
}