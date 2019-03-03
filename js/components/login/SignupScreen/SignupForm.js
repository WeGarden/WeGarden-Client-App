import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';

import UserInput from '../Commun/UserInput';

import usernameImg from '../../../../assets/images/username.png';
import passwordImg from '../../../../assets/images/password.png';

export default class Form extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <View style={styles.globalContainer}>
                <View style={{padding:10}}>
                <Text>
                    Complete the following fields and submit
                </Text>
                </View>
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
                    placeholder="Password"
                    secureTextEntry={true}
                    returnKeyType={'done'}
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    handler={this.props.handlePassword}
                />

                <UserInput
                    source={passwordImg}
                    secureTextEntry={true}
                    placeholder="Confirm Password"
                    returnKeyType={'done'}
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    handler={this.props.handleConfirmPassword}
                >
                </UserInput>

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
    globalContainer: {
        //flex: 1,
        height: 200,
        alignItems: 'center'
    },
});
