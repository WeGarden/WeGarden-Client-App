import React, {Component} from 'react';
import {Router, Scene, Actions, ActionConst} from 'react-native-router-flux';

import LoginScreen from './LoginScreen';
import SignupScreen from "./SignupScreen";

export default class LoginComponent extends Component {
    render() {
        return (
            <Router>
                <Scene key="root">
                    <Scene key="loginScreen"
                           component={LoginScreen}
                           animation='fade'
                           hideNavBar={true}
                    />
                    <Scene key="signinScreen"
                           component={SignupScreen}
                           //animation='fade'
                           direction="vertical"
                           hideNavBar={true}
                           initial={true}
                    />
                </Scene>
            </Router>
        );
    }
}