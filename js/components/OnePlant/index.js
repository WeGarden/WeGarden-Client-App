import React from 'react';
import {
    TouchableOpacity,
    Animated,
    SafeAreaView,
    ListView,
    FlatList,
    StyleSheet,
    Text,
    View,
    Image, ScrollView
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

        this._getRenderRow = this._getRenderRow.bind(this);
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

    _onMapLoad(){
        let coordinates = this.props.area.coordList;
        this.refs.map.fitToCoordinates(coordinates) //{coordinates:this.props.path});
    }

    render() {
        console.log(this.props.plant.coord);
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
                             ref={"map"}
                             provider={"google"}
                             mapPadding={{
                                 top: 10,
                                 right: 10,
                                 bottom: 10,
                                 left: 10
                             }}
                             onLayout={this._onMapLoad}
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
                    <View style={{flexDirection: "row", justifyContent: "space-evenly"}}>
                        <TouchableOpacity onPress={() => Actions.CreateObservationScreen()}
                                          style={{flex: 1, alignItems: "center", justifyContent: "center", height: 50}}>
                            <Text style={{color: "green"}}>Observations</Text></TouchableOpacity>
                        <TouchableOpacity style={{flex: 1, alignItems: "center", justifyContent: "center", height: 50}}><Text
                            style={{color: "green"}}>Actions</Text></TouchableOpacity>
                    </View>
                </View>
                <ScrollView style={{flex:1}}>
                    <View>
                        <View style={{flexDirection:"row", padding:10}}>
                            <Text style={{flex:1,fontWeight:"bold"}}>Name:</Text>
                            <Text style={{flex:1}}>{this.props.plant.name}</Text>
                        </View>
                        <View style={{flexDirection:"row", padding:10}}>
                            <Text style={{flex:1,fontWeight:"bold"}}>Species:</Text>
                            <Text style={{flex:1}}>{this.props.plant.species}</Text>
                        </View>
                        <View style={{flexDirection:"row", padding:10}}>
                            <Text style={{flex:1,fontWeight:"bold"}}>Family:</Text>
                            <Text style={{flex:1}}>{this.props.plant.family}</Text>
                        </View>
                    </View>
                <View>
                    <Text style={{fontWeight: "bold", fontSize: 18, margin:10}}>Photo:</Text>
                </View>
                    <View style={{alignItems:"center"}}>
                    <Image style={{width: 300,height:300}} resizeMode={"cover"}
                       source={{uri: 'data:image/jpeg;base64,' + this.props.plant.image}}/>
                    </View>
                </ScrollView>

            </View>
        );

    }

    _getRenderRow(rowData) {
        return <View {...this.props} style={{...styles.component}}>
            <View style={{flex: 1}}>
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
    container: {
        flex: 1,
        backgroundColor: '#fffef6',
        //alignItems: 'center',
        justifyContent: 'flex-start',
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

    component: {
        // width: 170,
        margin: 10,
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
    },


});