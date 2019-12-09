/**
 *  Site title - NameOfSite component of Header.js
 */
import React from 'react';

function NameOfSite(){

    const nameStyle = {
        width: "70%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "rgb(51,49,49)",
    }
    return(
        <div style={nameStyle}>
            <h1>Upload your photo or video</h1>
        </div>
    )
}

export default NameOfSite