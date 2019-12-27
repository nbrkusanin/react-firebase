import React from 'react';
import { Link } from 'react-router-dom';
import './navigation.scss';

const Navigation =  () => {
    return (
        <div className="navBar">   
            <Link to='/uploadedImg'><button className="btn btn-dark m-3 mr-5 navBtn">Images</button></Link>
            <Link to='/uploadedVideo'><button className="btn btn-dark m-3 navBtn">Videos</button></Link>
            <Link to='/'><button className="btn btn-info m-3 ml-5 navBtnUpload">Upload</button></Link>  
        </div>
    )
}


export default Navigation