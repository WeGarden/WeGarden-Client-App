import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import {
  StyleSheet,
  View,
} from 'react-native';

import UserInput from '../Commun/UserInput';

import usernameImg from '../../../../assets/images/username.png';
import passwordImg from '../../../../assets/images/password.png';


export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPass: true,
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
    return (
      <View style={styles.globalContainer}>
        <UserInput
          source={usernameImg}
          placeholder="Username"
          autoCapitalize={'none'}
          returnKeyType={'done'}
          autoCorrect={false}
          handler={this.props.handleUsername}
        />
        <UserInput
          source={passwordImg}
          secureTextEntry={this.state.showPass}
          placeholder="Password"
          returnKeyType={'done'}
          autoCapitalize={'none'}
          autoCorrect={false}
          handler={this.props.handlePassword}
        />
        {/*<TouchableOpacity*/}
          {/*activeOpacity={0.7}*/}
          {/*style={styles.btnEye}*/}
          {/*onPress={this.showPass}>*/}
          {/*<Image source={eyeImg} style={styles.iconEye} />*/}
        {/*</TouchableOpacity>*/}
      </View>
    );
  }
}




LoginForm.propTypes = {
    handlePassword: PropTypes.func.isRequired,
    handleUsername: PropTypes.func.isRequired
};




const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;




const styles = StyleSheet.create({
  globalContainer: {
    //flex: 1,
      height:100,
    alignItems: 'center'
  },
  btnEye: {
    position: 'absolute',
    top: 55,
    right: 28,
  },
  iconEye: {
    width: 25,
    height: 25,
    tintColor: 'rgba(0,0,0,0.2)',
  },
});
