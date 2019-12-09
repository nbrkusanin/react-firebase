/**
 *  Login form component of Login.js
 */
import React from 'react';
import './form.scss';
import {fire, storage} from '../../../configFire/Fire';

class Form extends React.Component {
    constructor(props) {
        super(props); 
        this.handleChange = this.handleChange.bind(this);
        this.login = this.login.bind(this);
        this.signUp = this.signUp.bind(this);
        
        this.state = {
            email: '',
            password: '',
            alertMsgEmail: '',
            alertMsgPassword: ''
        }
    }

    /**
     * Function for login to Firebase
     * @param {*} e - Event 
     */
    login(e) {
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch((error) => {
            this.verification(error);
        }) 
    }

    /**
     * Function for sign up to Firebase
     * @param {*} e - Event 
     */
    signUp(e) {
        e.preventDefault();
        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch((error) => {
            this.verification(error);
        })
    }

    /**
     * Function for verification email and password 
     * @param {*} error - Error - Firebase authentication
     */
    verification(error) {
        if(error.code.includes('password')) {
            this.setState((prevState) => ({alertMsgPassword: prevState.alertMsgPassword = error.message}))
        } else {
            this.setState({alertMsgPassword: ''});
        }
        if((error.code.includes('email')) || (error.code.includes('user-not-found')) ){
            this.setState((prevState) => ({alertMsgEmail: prevState.alertMsgEmail = error.message}))
        } else {
            this.setState({alertMsgEmail: ''});
        }
    }

    /**
     * Form input handlechange function
     * @param {*} e - Event 
     */
    handleChange(e) {
        const {name, value} = e.target;
        this.setState({ [name]: value})
    }

    render(){
        return(
            <div className = "container">
                <div className="row d-flex justify-content-center align-items-center formWrapp">
                    <div className="col-6 mx-auto formWrapContent">
                    <form>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input onChange={this.handleChange} type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                            {this.state.alertMsgEmail !== '' ? <div className="alertMsg">{this.state.alertMsgEmail}</div> : null}
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input value={this.state.password} onChange={this.handleChange} name="password" type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                            {this.state.alertMsgPassword !== '' ? <div className="alertMsg">{this.state.alertMsgPassword}</div> : null}
                        </div>
                        <div className="d-flex align-items-center justify-content-center formButtons">
                            <button type="submit" onClick={this.login} className="btn btn-info mr-2">Login</button>
                            <button type="submit" onClick={this.signUp} className="btn btn-success ml-2">Sign In</button>
                        </div>

                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Form