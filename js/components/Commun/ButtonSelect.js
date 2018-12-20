import React, {Component} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons/index";


export default class ButtonSelect extends Component {

    render() {
        return <TouchableOpacity opacity={0} onPress={this.props.onPress}
                                 style={StyleSheet.flatten([
                                     this.styles.buttonSelect,
                                     {
                                         backgroundColor: this.props.checked ? "green" : "white",
                                     }])}>
            <Text style={{
                textAlign: "center",
                flex: 1,
                fontSize: 20,
                color: this.props.checked ? "white" : "green"
            }}>{this.props.text}</Text>
            <View style={{flex: 1, alignItems: "center"}}>
                <Ionicons name={this.props.checked ? "ios-checkbox-outline" : "ios-square-outline"}
                          size={35}
                          color={this.props.checked ? "white" : "green"}/>
            </View>
        </TouchableOpacity>
    }

    styles = StyleSheet.create({
        buttonSelect:
            {
                height: 40,
                width: 200,
                borderColor: "green",
                borderWidth: 1,
                borderRadius: 20,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
            }
    });

}

