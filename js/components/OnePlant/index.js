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
import {Actions, Scene} from "react-native-router-flux";
import {Ionicons} from '@expo/vector-icons';
import {MapView} from "expo";
import ListGarden from "../ListGarden";
import MapListGarden from "../ListGarden/MapListGarden";


const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;


export default class OnePlantScreen extends React.Component {
    constructor(props) {
        super();
        this.state = this.getInitialState();
        this._onMapLoad = this._onMapLoad.bind(this);

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
        this.props.navigation.setParams({title: this.props.plant.name});

    }

    _onMapLoad() {
        let coordinates = this.props.area.coordList;
        this.state.map.fitToCoordinates(coordinates) //{coordinates:this.props.path});
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{
                    position: "absolute",
                    width: Dimensions.get("screen").width,
                    top: 0,
                    flex: 1,
                    height: Dimensions.get("screen").height
                }}>
                    <MapView
                        ref={(ref) => {
                            this.state.map = ref
                        }}
                        provider={"google"}
                        style={{flex: 1}}
                        mapPadding={{
                            top: 10,
                            right: 10,
                            bottom: 450,
                            left: 10
                        }}
                        onLayout={this._onMapLoad}
                        mapType={this.state.isSatellite ? "satellite" : "standard"}
                    >
                        <MapView.Polygon
                            fillColor={"rgba(0,0,200,0.3)"}
                            coordinates={this.props.area.coordList}
                        />
                        <MapView.Marker
                            pinColor={"rgba(0,255,0,0.3)"}
                            coordinate={this.props.plant.coord}
                        />


                    </MapView>
                </View>
                <ScrollView style={{flex: 1}}>
                    <View style={{height: 300}}>
                        <View style={{
                            position: "absolute",
                            bottom: 0,
                            flexDirection: "row",
                            justifyContent: "space-evenly"
                        }}>
                            <View style={{
                                flex: 1,
                                alignItems: "center",
                                justifyContent: "center",
                                height: 60
                            }}>
                                <TouchableOpacity style={styles.button}
                                                  onPress={() => Actions.observationListScreen({plant: this.props.plant})}
                                >
                                    <Text>Observations</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{
                                flex: 1,
                                alignItems: "center",
                                justifyContent: "center",
                                height: 60
                            }}>
                                <TouchableOpacity style={styles.button}
                                                  onPress={() => Actions.actionListScreen({plant: this.props.plant})}
                                >
                                    <Text>Actions</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.addButtonCard}>
                        <View style={{flexDirection: "row", padding: 10}}>
                            <Text style={{flex: 1, fontWeight: "bold"}}>Name:</Text>
                            <Text style={{flex: 1}}>{this.props.plant.name}</Text>
                        </View>
                        <View style={{flexDirection: "row", padding: 10}}>
                            <Text style={{flex: 1, fontWeight: "bold"}}>Species:</Text>
                            <Text style={{flex: 1}}>{this.props.plant.species}</Text>
                        </View>
                        <View style={{flexDirection: "row", padding: 10}}>
                            <Text style={{flex: 1, fontWeight: "bold"}}>Family:</Text>
                            <Text style={{flex: 1}}>{this.props.plant.family}</Text>
                        </View>
                    </View>
                    <View style={styles.addButtonCard}>
                        <View>
                            <Text style={{fontWeight: "bold", fontSize: 18, margin: 10}}>Photo:</Text>
                        </View>
                        <View style={{alignItems: "center"}}>
                            <Image style={{width: 300, height: 300}} resizeMode={"cover"}
                                   source={{uri: 'data:image/jpeg;base64,' + this.props.plant.image}}/>
                        </View>
                    </View>
                </ScrollView>

            </View>
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