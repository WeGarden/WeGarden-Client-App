import React from 'react';
import {TouchableOpacity, Animated, SafeAreaView, ListView, FlatList, StyleSheet, Text, View} from 'react-native';
import OnePlantComponent from "./OnePlantComponent";
import {Actions} from "react-native-router-flux";
import {Ionicons} from '@expo/vector-icons';
import {MapView} from "expo";


const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;


export default class OneZoneScreen extends React.Component {
    constructor(props) {
        super();
        this.state = this.getInitialState();


    }


    getInitialState() {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        var data = Array.apply(null, {length: 20}).map(Number.call, Number);
        return {
            dataSource: ds.cloneWithRows(data),
            data: data
        };
    }

    componentDidMount() {
        this.props.navigation.setParams({title: "haha"});
    }

    _pressAdd() {
        Actions.CreateAreaScreen();
    }

    render() {

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <MapView style={styles.bar}
                             showsMyLocationButton={false}
                             showsPointsOfInterest={false}
                             showsTraffic={false}
                             zoomEnabled={false}
                             zoomControlEnabled={false}
                             scrollEnabled={false}
                             rotateEnabled={false}
                             toolbarEnabled={false}
                             loadingEnabled={true}
                             moveOnMarkerPress={false}
                    />
                    <View style={{flexDirection: "row", justifyContent: "space-evenly"}}>
                        <TouchableOpacity style={{flex: 1, alignItems: "center", justifyContent: "center", height: 50}}><Text>Observations</Text></TouchableOpacity>
                        <View style={{backgroundColor: "black", width: 1}}/>
                        <TouchableOpacity style={{flex: 1, alignItems: "center", justifyContent: "center", height: 50}}><Text>Actions</Text></TouchableOpacity>
                    </View>
                </View>
                <FlatList
                    style={{flex: 1,}}
                    // contentContainerStyle={{alignItems:"center"}}
                    columnWrapperStyle={{justifyContent: "space-evenly",}}
                    numColumns={2}
                    //contentContainerStyle={styles.list}
                    data={this.state.data}
                    renderItem={this._getRenderRow}
                />
                <View style={{
                    position: "absolute",
                    borderRadius: 99,
                    backgroundColor: "white",
                    borderColor: "white",
                    borderWidth: 1,
                    width: 70,
                    height: 70,
                    bottom: 50,
                    right: 20,
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                    <Ionicons style={{flex: 1}} onPress={this._pressAdd} color={"black"} name={"ios-add-circle"}
                              size={70}/>
                </View>

            </View>
        );

    }

    _getRenderRow(rowData) {
        return <OnePlantComponent style={styles.item}/>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fffef6',
        //alignItems: 'center',
        justifyContent: 'center',
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
        backgroundColor: '#6fbd00',
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


});