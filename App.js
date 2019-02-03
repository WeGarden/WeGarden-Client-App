import React from 'react';
import {SafeAreaView, StyleSheet, Text, View } from 'react-native';
import OneZoneScreen from "./js/components/OneZoneScreen";
import CreateAreaScreen from "./js/components/CreateAreaScreen";
import RouterS from "./js/components/OneZoneScreen/router";
//import CreateGarden from "./js/components/CreateAreaScreen";


export default class App extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
          <RouterS/>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
