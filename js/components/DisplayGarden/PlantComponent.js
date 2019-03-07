import {Component} from "react";
import React from "react";
import {Image, StyleSheet, Text, View} from "react-native";


export default class PlantComponent extends Component {


    render() {
        return <View style={styles.container}>
            <Image
                style={{width: 200, height: 200}}
                source={{uri: 'data:image/jpeg;base64,' + this.props.title}}
            />
            <View style={{flex: 1, backgroundColor: "#fffef6", padding: 5}}>
                <Text style={{flex: 1, justifyContent:"center"}}>{this.props.title || "Plant X"}</Text>

            </View>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fffef5",
        margin: 5,
        width: 200,
       // borderWidth: 1,
       // borderColor: "#1b4a19",
    }
});