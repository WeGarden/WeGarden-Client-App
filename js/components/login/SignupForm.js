import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';

import UserInput from './UserInput';

import usernameImg from '../../../assets/images/username.png';
import passwordImg from '../../../assets/images/password.png';
import eyeImg from '../../../assets/images/eye_black.png';

export default class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPass1: true,
            press1: false,
            showPass2: true,
            press2: false,
        };
        this.showPass1 = this.showPass1.bind(this);
        this.showPass2 = this.showPass2.bind(this);
    }

    showPass1() {
        this.state.press1 === false
            ? this.setState({showPass1: false, press1: true})
            : this.setState({showPass1: true, press1: false});
    }
    showPass2() {
        this.state.press2 === false
            ? this.setState({showPass2: false, press2: true})
            : this.setState({showPass2: true, press2: false});
    }

    render() {
        return (
            <View style={styles.container}>
                <UserInput
                    source={usernameImg}
                    placeholder="Username"
                    autoCapitalize={'none'}
                    returnKeyType={'done'}
                    autoCorrect={false}
                    handler={this.props.handleUsername}
                />
                <UserInput
                    source={usernameImg} //TODO change to email Image
                    placeholder="Email"
                    autoCapitalize={'none'}
                    returnKeyType={'done'}
                    autoCorrect={false}
                    handler={this.props.handleEmail}
                />
                <UserInput
                    source={passwordImg}
                    secureTextEntry={this.state.showPass1}
                    placeholder="Password"
                    returnKeyType={'done'}
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    handler={this.props.handlePassword}
                />
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.btnEye1}
                    onPress={this.showPass1}>
                    <Image source={eyeImg} style={styles.iconEye}/>
                </TouchableOpacity>
                <UserInput
                    source={passwordImg}
                    secureTextEntry={this.state.showPass2}
                    placeholder="Confirm Password"
                    returnKeyType={'done'}
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    handler={this.props.handleConfirmPassword}
                />
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.btnEye2}
                    onPress={this.showPass2}>
                    <Image source={eyeImg} style={styles.iconEye}/>
                </TouchableOpacity>
            </View>
        );
    }
}


Form.propTypes = {
    handlePassword: PropTypes.func.isRequired,
    handleUsername: PropTypes.func.isRequired,
    handleConfirmPassword: PropTypes.func.isRequired,
    handleEmail: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        height: 200,
        alignItems: 'center'
    },
    btnEye1: {
        position: 'absolute',
        top: 107,
        right: 28,
    },
    btnEye2: {
        position: 'absolute',
        top: 157,
        right: 28,
    },
    iconEye: {
        width: 25,
        height: 25,
        tintColor: 'rgba(0,0,0,0.2)',
    },
});
