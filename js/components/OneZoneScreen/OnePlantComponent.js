import React from 'react';
import {ListView, StyleSheet, Image, Text, View} from 'react-native';

export default class OnePlantComponent extends React.Component {
    constructor() {
        super();
        this.state = {}

    }


    render() {
        return <View {...this.props} style={{...this.props.style,...styles.component}}>
            <View style={{flex:1}}>
                <Image
                    style={{width: 150, height: 150}}
                    source={{uri: 'https://3c1703fe8d.site.internapcdn.net/newman/gfx/news/hires/2016/howpartsofap.jpg'}}
                />
                <View style={{flex: 1, backgroundColor: "#ffffff", padding: 5}}>
                    <Text style={{flex: 1, justifyContent: "center"}}>{this.props.title || "Plant X"}</Text>

                </View>
            </View>
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
