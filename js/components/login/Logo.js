import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, Image, KeyboardAvoidingView} from 'react-native';

import logoImg from '../../../assets/images/logo.png';

export default class Logo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView behavior={'height'}>
        <Image source={logoImg} style={styles.image} />
        </KeyboardAvoidingView>
        <Text style={styles.text}>We Garden</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  text: {
    fontSize:50,
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: 'green',
    marginTop: 10,
      padding: 10,
      borderRadius:100

  },
});