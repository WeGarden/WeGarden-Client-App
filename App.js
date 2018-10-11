import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './js/components/login';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text></Text>
        <Login onLoginPress={()=>{console.log()}}/>
      </View>
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
