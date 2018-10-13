import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import {StyleSheet, View, Text, Animated, Easing} from 'react-native';
import {Actions} from "react-native-router-flux/index";

export default class SignupSection extends Component {

    constructor() {
        super();

        this.growAnimated = new Animated.Value(0);
        this._onPress = this._onPress.bind(this);
        this.handleSignIn = this.handleSignIn.bind(this);
    }

    _onPress(){
        this._onGrow();


        setTimeout(() => {
            Actions.signinScreen();
            this.growAnimated.setValue(0);
        }, 1000);
    }

    _onGrow() {
        Animated.timing(this.growAnimated, {
            toValue: 1,
            duration: 250,
            easing: Easing.linear,
        }).start();
    }


    handleSignIn() {
        this._onPress();

    }

    render() {
        const changeScale = this.growAnimated.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 3000],
        });
        return (
            <View style={styles.container}>
                <Text onPress={this.handleSignIn} style={styles.text}>Create Account</Text>
                <Animated.View
                    style={[styles.growinCircle, {transform: [{scale: changeScale}]}]}
                />
                <Text style={styles.text}>Forgot Password?</Text>
            </View>
        );
    }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const ANIMATION_COLOR = 'rgba(255, 255, 255, 0.5)';

const MARGIN = 1;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        //top: 65,
        width: DEVICE_WIDTH,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    text: {
        color: 'white',
        backgroundColor: 'transparent',
    },
    growinCircle:{
            height: MARGIN,
            width: MARGIN,
            borderWidth: 1,
            borderColor: 'white',
            borderRadius: 100,
            alignSelf: 'center',
            backgroundColor: ANIMATION_COLOR
    }
});
