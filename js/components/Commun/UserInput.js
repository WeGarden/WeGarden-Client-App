import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Dimensions,StyleSheet, View, TextInput, TouchableOpacity} from 'react-native';
import {Ionicons} from "@expo/vector-icons";

export default class UserInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showPass: props.secureTextEntry,
            press: false,

        };
        this.showPass = this.showPass.bind(this);

    }

    showPass() {
        this.state.press === false
            ? this.setState({showPass: false, press: true})
            : this.setState({showPass: true, press: false});
    }


    render() {
        let eyeBtn;
        if(this.props.secureTextEntry)
            eyeBtn = <TouchableOpacity
                activeOpacity={0.7}
                style={styles.eye}
                onPress={this.showPass}>
                <Ionicons size={20} name={"md-eye"} style={styles.inlineImg}/>
            </TouchableOpacity>;
        return (
            <View style={styles.inputWrapper}>
                {this.props.source?<Ionicons size={25} color={"red"} name={this.props.source} style={styles.inlineImg}/>:null}
                <TextInput
                    style={styles.input}
                    placeholder={this.props.placeholder}
                    secureTextEntry={this.state.showPass}
                    autoCorrect={this.props.autoCorrect}
                    autoCapitalize={this.props.autoCapitalize}
                    returnKeyType={this.props.returnKeyType}
                    placeholderTextColor="green"
                    underlineColorAndroid='transparent'
                    onChangeText={this.props.handler}
                    value={this.props.value}
                    editable={this.props.editable!==null?this.props.editable:true}
                    multiline={this.props.multiline}
                    numberOfLines = {this.props.numberOfLines}
                />
                {eyeBtn}
            </View>
        );
    }
}

UserInput.propTypes = {
    placeholder: PropTypes.string.isRequired,
    secureTextEntry: PropTypes.bool,
    autoCorrect: PropTypes.bool,
    autoCapitalize: PropTypes.string,
    returnKeyType: PropTypes.string,
    handler: PropTypes.func.isRequired
};

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    input: {
        flex:1,
        zIndex:99,
        backgroundColor: 'rgba(255, 255, 255, 1)',
       // width: DEVICE_WIDTH - 40,
        height: 40,
        marginHorizontal: 20,
        paddingLeft: 45,
        borderWidth:1,
        borderColor: "green",
        borderRadius: 20,
        color: 'black',
    },
    inputWrapper: {
        width: DEVICE_WIDTH,

        flexDirection: 'row',
        // position: 'relative',
    },
    inlineImg: {
        position: 'absolute',
        //resizeMode:"contain",
        zIndex: 99,
        width: 22,
        height: 22,
        left: 35,
        top: 9,
    },
    eye: {
        position: 'absolute',
        zIndex: 99,
        right: 65,
        top: 0,
        width: 25,
        height: 25,
    },
});