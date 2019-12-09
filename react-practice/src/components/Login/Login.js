/**
 * Login component of App.js
 */
import React from 'react';
import Form from './form/Form';
import './Login.scss';

class Login extends React.Component {
    render(){
        return(
            <div className="middleSection">
                <Form />
            </div>
        )
    }
}

export default Login