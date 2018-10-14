import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Logo from './Logo';
import Form from './Form';
import Wallpaper from './Wallpaper';
import ButtonSubmit from './ButtonSubmit';
import SignupSection from './SignupSection';
import Api from '../utils/ApiCalls';
import {KeyboardAvoidingView} from "react-native";

export default class LoginScreen extends Component {

    constructor() {
        super();
        this.state = {
            username: '',
            password: ''
        };

        this.handlePassword = this.handlePassword.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        this.login = this.login.bind(this);
    }

    handleUsername(text) {
        this.setState({username: text})
    }

    handlePassword(text) {
        this.setState({password: text})
    }

    doneLogin(func) {
        func();
    }

    login(user, pass) {
        if (this.checkInput(user, pass)) {
            Api.authentificateUser(user, pass, this.loginSuccess, this.loginFailed, this.connexionFailed);
        } else {
            alert({title: "Error", message: "Please enter your login Username and Password"});
        }
    }

    /**
     * true if inputs are correct, false otherwise
     * @param user the entered username
     * @param pass the entered password
     * @returns true if inputs are correct, false otherwise
     */
    checkInput(user, pass) {
        return user && pass;
    }

    /**
     * login success callback function
     * @param res json of the api response {'accessToken':?}
     */
    loginSuccess(res) {
//login
        alert("Welcome back!");
    }


    /**
     * connexion failed callback function
     * @param error json of the api error
     */
    connexionFailed(error) {
        alert("Connexion failed" + JSON.stringify(error))
    }

    /**
     * login failed callback function
     */
    loginFailed() {
        alert("Wrong Username/Password");
    }

    render() {
        return (
            <Wallpaper>
                <KeyboardAvoidingView behavior='padding' style={{flex: 1}}>
                    <Logo/>
                    {<Form handleUsername={this.handleUsername} handlePassword={this.handlePassword}/>}
                    <ButtonSubmit handleLogin={() => {
                        this.login(this.state.username, this.state.password)
                    }}/>

                    <SignupSection
                        //signIngUrl={/*TODO*/} forgotPassordUrl={/*TODO*/}
                    />
                </KeyboardAvoidingView>

            </Wallpaper>
        );
    }
}
