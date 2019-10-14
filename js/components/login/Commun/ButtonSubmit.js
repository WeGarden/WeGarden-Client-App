import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    Animated,
    Easing,
    Image,
    Alert,
    View,
} from 'react-native';
import {Actions, ActionConst} from 'react-native-router-flux';

import spinner from '../../../../assets/images/loading.gif';

const BUTTONCOLOR = "#00BB55";
const BORDER_COLOR = 'rgba(32, 157, 18, 1)';
const ANIMATION_COLOR = 'rgba(32, 157, 18, 0.8)';
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;

export default class ButtonSubmit extends Component {
    constructor() {
        super();

        this.state = {
            isLoading: false,
        };

        this.buttonAnimated = new Animated.Value(0);
        this.growAnimated = new Animated.Value(0);
        this._onPress = this._onPress.bind(this);
        this.stopLoading = this.stopLoading.bind(this);
    }

    stopLoading(){
        //this.props.handleStopSubmit();
        this.setState({isLoading:false});
        Animated.timing(this.buttonAnimated, {
            toValue: 0,
            duration: 200,
            easing: Easing.linear,
        }).start();
    }

    _onPress() {
        if (this.state.isLoading) {
            this.stopLoading();
            return;
        }

        this.setState({isLoading: true});
        Animated.timing(this.buttonAnimated, {
            toValue: 1,
            duration: 200,
            easing: Easing.linear,
        }).start();
        this.props.handleSubmit(this.stopLoading);

    }




    render() {

        const changeWidth = this.buttonAnimated.interpolate({
            inputRange: [0, 1],
            outputRange: [DEVICE_WIDTH - MARGIN, MARGIN],
        });

        return (
            <View style={styles.globalContainer}>
                <Animated.View style={{width: changeWidth}}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this._onPress}
                        activeOpacity={1}>
                        {this.state.isLoading ? (
                            <Image source={spinner} style={styles.image}/>
                        ) : (
                            <Text style={styles.text}>{this.props.text}</Text>
                        )}
                    </TouchableOpacity>
                </Animated.View>
            </View>
        );
    }
}


ButtonSubmit.propsTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleStopSubmit: PropTypes.func.isRequired
}


const styles = StyleSheet.create({
    globalContainer: {
        height:40,
        //top: -95,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: BUTTONCOLOR,
        height: MARGIN,
        borderRadius: 20,
        zIndex: 100,
    },
    circle: {
        height: MARGIN,
        width: MARGIN,
        marginTop: -MARGIN,
       // borderWidth: 1,
       // borderColor: BORDER_COLOR,
        borderRadius: 100,
        alignSelf: 'center',
        zIndex: 99,
        backgroundColor: ANIMATION_COLOR,
    },
    text: {
        color: 'white',
    },
    image: {
        width: 24,
        height: 24,
    },
});
