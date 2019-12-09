/**
 * Logo component of Header.js
 */
import React from 'react';
import Logo1 from '../../img/photoupload.png';

function Logo(){

    const logoStyle = {
        width: "30%",
        height: "100%",
        float: "left"
    }

    const imgStyle = {
        width: "100%",
        height: "100%",
        objectFit: "contain"

    }

    return(
        <div style = {logoStyle}>
            <img src={Logo1} alt="uploadLogo" style={imgStyle}/>
        </div>
    )
}

export default Logo