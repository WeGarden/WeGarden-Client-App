import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    TextInput,
    View,
    Button
} from 'react-native';

export default class Login extends Component {

    onLogin (email, password) {
        console.log(email, password) // user credentials
    }
       
    onResetPassword (email) {
        console.log(email)
      }

    render() {
        return    
            //   <Login
            //     onLogin={onLogin}
            //     onResetPassword={onResetPassword}
            //   />
            
    }
}