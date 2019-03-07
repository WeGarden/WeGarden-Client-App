import React from 'react';
import {TouchableOpacity, StyleSheet, Image, Text, View} from 'react-native';
import {Actions} from "react-native-router-flux";

export default class OnePlantComponent extends React.Component {
    constructor() {
        super();
        this.state = {}

    }


    render() {
        console.log(this.props.data);
        return <View {...this.props} style={{...styles.component}}>
            <TouchableOpacity onPress={()=>Actions.OnePlantScreen({area:this.props.area,plant:this.props.data})} style={{flex:1}}>
                <Image
                    style={{width: 150, height: 150}}
                    source={{uri: 'data:image/jpeg;base64,' + this.props.data.image}}
                />
                <View style={{flex: 1, backgroundColor: "#ffffff", padding: 5}}>
                    <Text style={{flex: 1, justifyContent: "center"}}>{this.props.data.name || "Plant X"}</Text>

                </View>
            </TouchableOpacity>
        </View>
    }
}

const styles = StyleSheet.create({
    component: {
       // width: 170,
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
    },


});
