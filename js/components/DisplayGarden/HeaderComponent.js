import {Component} from "react";
import { Animated,StyleSheet, Text, View } from 'react-native';
import React from "react";


const HEADER_EXPANDED_HEIGHT = 300;
const HEADER_COLLAPSED_HEIGHT = 60;

export default class HeaderComponent extends Component {
    constructor() {
        super();
        this.state = {
            scrollY: new Animated.Value(0)
        }
    }
    render() {
        const headerHeight = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_EXPANDED_HEIGHT-HEADER_COLLAPSED_HEIGHT],
            outputRange: [HEADER_EXPANDED_HEIGHT, HEADER_COLLAPSED_HEIGHT],
            extrapolate: 'clamp'
        })
        return(
            <Animated.View style={{height: headerHeight}}/>
        )
    }
}