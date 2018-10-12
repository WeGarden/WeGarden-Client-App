import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Image, View, ImageBackground, KeyboardAvoidingView} from 'react-native';

import bgSrc from '../../../assets/images/wallpaper.jpg';
import Dimensions from "Dimensions";

export default class Wallpaper extends Component {
    render() {
        return (
            <ImageBackground style={styles.picture} source={bgSrc}>
                <View style={styles.whiteLayer}>
                {this.props.children}
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    picture: {
        //flex: 1,
        width: '100%',
        height: '100%',
        //resizeMode: 'cover',
    },
    whiteLayer:{
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        width: Dimensions.get('window').width,
        height:Dimensions.get('window').height
    }
});
