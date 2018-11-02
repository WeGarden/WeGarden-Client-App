import React, { Component } from 'react';
import Logo from './Logo';
import Wallpaper from './Wallpaper';
import {AsyncStorage, View} from "react-native";
import ButtonSubmit from './ButtonSubmit';
import Api from '../../utils/ApiCalls';
import { KeyboardAvoidingView, TouchableOpacity } from "react-native";
import { Keyboard } from 'react-native';
import { Actions } from "react-native-router-flux/index";
import SignupForm from "./SignupForm";
import Dimensions from "Dimensions";


const MIN_PASS_LENGTH = 6;
export default class SignupScreen extends Component {

    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            email: '',
            confirmPassowrd: ''
        };

        this.handlePassword = this.handlePassword.bind(this);
        this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.signupAction = this.signupAction.bind(this);

    }

    /**
     * username setter
     * 
     * @param {String} text entered username
     */
    handleUsername(text) {
        this.setState({ username: text })
    }


    /**
     * email setter
     * 
     * @param {String} text entered username
     */
    handleEmail(text) {
        this.setState({ email: text })
    }

    /**
     * password setter
     * 
     * @param {String} text entered password
     */
    handlePassword(text) {
        this.setState({ password: text })
    }

    /**
     * confirm password setter
     * 
     * @param {String} text entered password
     */
    handleConfirmPassword(text) {
        this.setState({ confirmPassword: text })
    }

    /**
     * signup function, calls checkinput then tries to authentificate user,
     * 
     * @param {function} doneLoading 
     */
    signupAction(doneLoading) {
        let user = this.state.username;
        let pass = this.state.password;
        let passConfirm = this.state.confirmPassowrd;
        let email = this.state.email;

        if (SignupScreen.checkInput(user, pass,passConfirm, email)) {
            Api.signup(
                user,
                pass,
                this.signinSuccess,
                this.alreadyExists,
                this.connexionFailed
            ).then(() => {
                    doneLoading();
                    Actions.pop();
                });
        } else {
            alert("Please enter your login Username and Password");
            doneLoading();
        }
    }


    static checkPasswordLength(pass) {
        return pass.length >= MIN_PASS_LENGTH;
    }

    static checkPasswordConfirm(pass,passConfirm) {
        return pass === passConfirm;
    }



    /**
     * true if inputs are correct, false otherwise
     * @param user the username
     * @param pass the password
     * @param passConfirm the confirmation password
     * @param email the email address
     * @returns true if inputs are correct, false otherwise
     */
    static checkInput(user,pass,passConfirm,email) {
        if (SignupScreen.checkPasswordLength(pass)) {
            alert("Password must have at least 6 caracters");
        } if (SignupScreen.checkPasswordConfirm(pass,passConfirm)) {
            alert("Password's confirmation doesn't match");
        }

        return user && pass && email;
    }

    /**
     * sign in api success callback function
     * @param res json of the api response {'accessToken':?}
     */
    static signinSuccess(res) {
        //login
        alert(res.accessToken);
        AsyncStorage.setItem("userToken", res.accessToken);
        //Actions.signinScreen() // TODO change it to home page
    }


    /**
     * connexion failed callback function
     * @param error json of the api error
     */
    static connexionFailed(error) {
        alert("Connexion failed" + JSON.stringify(error));
    }

    render() {

        return (
            <TouchableOpacity activeOpacity={1} onPress={Keyboard.dismiss}>
                <View
                    style={{
                        width: Dimensions.get('window').width,
                        height: Dimensions.get('window').height
                    }}
                >
                    <KeyboardAvoidingView
                        behavior='padding'
                        style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'center',
                           // alignItems: 'stretch'
                        }}
                    >

                        <SignupForm handleEmail={this.handleEmail}
                            handlePassword={this.handlePassword}
                            handleConfirmPassword={this.handleConfirmPassword}
                            handleUsername = {this.handleUsername}
                        />
                        <ButtonSubmit text={"SIGNUP"} handleSubmit={this.signupAction} />

                    </KeyboardAvoidingView>
                </View>
            </TouchableOpacity>
        );
    }
}


// const styles = StyleSheet.create({
//     containerForm: {
//         //flex: 1,
//         height: 100,
//         alignItems: 'center'
//     },
//     btnEye: {
//         position: 'absolute',
//         top: 55,
//         right: 28,
//     },
//     iconEye: {
//         width: 25,
//         height: 25,
//         tintColor: 'rgba(0,0,0,0.2)',
//     },
// });