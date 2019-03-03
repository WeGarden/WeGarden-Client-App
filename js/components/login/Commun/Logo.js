import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, Image, KeyboardAvoidingView} from 'react-native';

import logoImg from '../../../../assets/images/logo.png';

const APP_TITLE = "WeGarden";
export default class Logo extends Component {
  render() {
      return (
      <View style={styles.globalContainer}>
        <View style={{alignItems: "center", padding:10, borderWidth:3, borderColor:"green", borderRadius:30, backgroundColor: "white"}}>
        <Image source={logoImg} style={styles.image} />
        <Text style={styles.text}>{APP_TITLE}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  globalContainer: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 80,
    height: 80,
  },
  text: {
    fontSize:50,
    color: 'green',
    fontWeight: 'bold',
    marginTop: 10,
      padding: 10,
      borderRadius:100

  },
});
