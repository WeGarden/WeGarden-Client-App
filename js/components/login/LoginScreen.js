import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Logo from './Logo';
import Form from './Form';
import Wallpaper from './Wallpaper';
import { AsyncStorage } from "react-native";
import ButtonSubmit from './ButtonSubmit';
import SignupSection from './SignupSection';
import Api from '../utils/ApiCalls';
import {KeyboardAvoidingView, TouchableOpacity} from "react-native";
import {Keyboard} from 'react-native';
import {Actions} from "react-native-router-flux/index";


export default class LoginScreen extends Component {

    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
        };

        this.handlePassword = this.handlePassword.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        this.login = this.login.bind(this);
    }

    /**
     * username setter
     * 
     * @param {String} text entered username
     */
    handleUsername(text) {
        this.setState({username: text})
    }

    /**
     * password setter
     * 
     * @param {String} text entered password
     */
    handlePassword(text) {
        this.setState({password: text})
    }


    /**
     * on submit button pressed f
     * 
     * @param {function} doneLoading 
     */
    login(doneLoading) {
        const user = this.state.username;
        const pass = this.state.password;

        if (LoginScreen.checkInput(user, pass)) {
            Api.authentificateUser(user, pass, LoginScreen.loginSuccess, LoginScreen.loginFailed, LoginScreen.connexionFailed).then(()=>doneLoading());
        } else {
            alert("Please enter your login Username and Password");
            doneLoading();
        }
    }

    /**
     * true if inputs are correct, false otherwise
     * @param user the username
     * @param pass the password
     * @returns true if inputs are correct, false otherwise
     */
    static checkInput(user, pass) {
        return user && pass;
    }

    /**
     * login api success callback function
     * @param res json of the api response {'accessToken':?}
     */
    static loginSuccess(res) {
        //login
        alert(res.accessToken);
        AsyncStorage.setItem("userToken",res.accessToken);
        Actions.signinScreen() // TODO change it to home page
    }


    /**
     * connexion failed callback function
     * @param error json of the api error
     */
    static connexionFailed(error) {
        alert("Connexion failed" + JSON.stringify(error));
    }

    /**
     * login failed callback function
     */
    static loginFailed() {
        alert("Wrong Username/Password");
    }

    render() {

        return (
            <TouchableOpacity activeOpacity={1} onPress={Keyboard.dismiss}>
                <Wallpaper>
                    <KeyboardAvoidingView behavior='padding' style={{flex: 1}}>
                        <Logo/>

                        <Form handleUsername={this.handleUsername} handlePassword={this.handlePassword}/>
                        <ButtonSubmit handleLogin={this.login}/>

                        <SignupSection
                            //signIngUrl={/*TODO*/} forgotPassordUrl={/*TODO*/}
                        />
                    </KeyboardAvoidingView>
                </Wallpaper>
            </TouchableOpacity>
        );
    }
}
