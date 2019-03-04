import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Dimensions,StyleSheet, View, Text, Animated, Easing} from 'react-native';
import {Actions} from "react-native-router-flux";

export default class SignupSection extends Component {

    constructor() {
        super();
        this._onPress = this._onPress.bind(this);
        this.handleSignIn = this.handleSignIn.bind(this);
    }

    _onPress(){
      //  this._onGrow();


      //  setTimeout(() => {
            Actions.signupScreen();
        //    this.growAnimated.setValue(0);
       // }, 1000);
    }


    handleSignIn() {
        this._onPress();

    }

    render() {
        return (
            <View style={styles.globalContainer}>
                <Text onPress={this.handleSignIn} style={styles.text}>Create Account</Text>
                <Text style={styles.text}>Forgot Password?</Text>
            </View>
        );
    }
}

const DEVICE_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
    globalContainer: {
        flex: 1,
        paddingVertical : 10,
        //top: 65,
        width: DEVICE_WIDTH,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    text: {
        color: 'white',
        backgroundColor: 'transparent',
    },
});
