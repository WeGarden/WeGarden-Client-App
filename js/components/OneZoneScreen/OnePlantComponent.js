import React from 'react';
import {TouchableOpacity, StyleSheet, Image, Text, View} from 'react-native';
import {Actions} from "react-native-router-flux";

export default class OnePlantComponent extends React.Component {
    constructor() {
        super();
        this.state = {}

    }


    render() {
        return <View style={{shadowOffset:{
                width:0,
                height:3,
            },
            elevation: 1,
            shadowColor: "black",
            shadowOpacity:0.5,}}><TouchableOpacity onPress={()=>Actions.OnePlantScreen({area:this.props.area,plant:this.props.data})} style={styles.component}>
                <Image
                    resizeMode={"cover"}
                    style={{width: 170, height: 170}}
                    source={{uri: 'data:image/jpeg;base64,' + this.props.data.image}}
                />
                <View style={{flex: 1, backgroundColor: "#ffffff", padding: 5}}>
                    <Text style={{flex: 1, justifyContent: "center", fontWeight: "bold"}}>{this.props.data.name || "Plant X"}</Text>

                </View>
            </TouchableOpacity>
        </View>
    }
}

const styles = StyleSheet.create({
    component: {
        width: 170,
        margin:10,
        height: 200,
        borderRadius:10,
        backgroundColor:"white",
        //alignItems: 'center',
        justifyContent: 'center',
        overflow: "hidden"
    },


});
