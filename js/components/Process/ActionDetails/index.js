import React from 'react';
import {
    TouchableOpacity,
    Animated,
    SafeAreaView,
    ListView,
    StyleSheet,
    Text,
    View,
    Image, ScrollView, Dimensions
} from 'react-native';
78

const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;


export default class ActionDetails extends React.Component {
    constructor(props) {
        super();
    }


    componentDidMount() {
        this.props.navigation.setParams({title: this.props.data.name});
    }


    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.addButtonCard}>
                    <View>
                        <Text style={{fontWeight: "bold", fontSize: 18, margin: 10}}>Description:</Text>
                    </View>
                    <Text>{this.props.data.protocol.description}</Text>
                </View>
                <View style={styles.addButtonCard}>
                        <Text style={{fontWeight: "bold", fontSize: 18, margin: 10}}>Details:</Text>
                    {this.props.data.protocol.entries.map((item,index)=>
                        <View style={{flexDirection: "row", padding: 10}}>
                            <Text style={{flex: 1, fontWeight: "bold"}}>{item.name}:</Text>
                            <Text style={{flex: 1}}>{this.props.data.values[index].value}</Text>
                        </View>
                    )}
                </View>
            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        //alignItems: 'center',
    },
    list: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: "space-evenly"
    },
    item: {
        marginVertical: 5,
    },


    header: {
        //  position: 'absolute',
        //  top: 0,
        //  left: 0,
        //  right: 0,

        //flex:1
        //overflow: 'hidden',
    },
    bar: {
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        backgroundColor: 'transparent',
        color: 'white',
        fontSize: 18,
    },
    scrollViewContent: {
        marginTop: HEADER_MAX_HEIGHT,
    },

    addButtonCard: {
        // width: 170,
        backgroundColor: "white",
        margin: 10,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',

        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowColor: "black",
        shadowOpacity: 0.5,
        borderRadius: 20,

        elevation: 2,
    },

    button: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        height: 30,
        width: '85%',
        backgroundColor: "white",
        borderRadius: 10,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.5,

        elevation: 2
    },

});