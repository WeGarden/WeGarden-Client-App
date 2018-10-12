import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Logo from './Logo';
import Form from './Form';
import Wallpaper from './Wallpaper';
import ButtonSubmit from './ButtonSubmit';
import SignupSection from './SignupSection';
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

    login(email, pass) {
        alert('email: ' + email + ' password: ' + pass)
    }

    render() {
        return (
            <Wallpaper>
                <KeyboardAvoidingView behavior='padding' style={{flex: 1}}>
                    <Logo/>
                    <Form handleUsername={this.handleUsername} handlePassword={this.handlePassword}/>
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
