import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CreateGarden from "./js/components/CreateGarden/router";



export default class App extends React.Component {
  render() {
    return (
        <CreateGarden />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
