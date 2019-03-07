import React from 'react';
import {TouchableOpacity, Animated, SafeAreaView, ListView, FlatList, StyleSheet, Text, View} from 'react-native';
import OnePlantComponent from "./OnePlantComponent";
import {Actions} from "react-native-router-flux";
import {Ionicons} from '@expo/vector-icons';
import {MapView} from "expo";
import ApiCalls from "../../utils/ApiCalls";


const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;


export default class OneZoneScreen extends React.Component {
    constructor() {
        super();
        this.state = this.getInitialState();

        this._onMapLoad = this._onMapLoad.bind(this);

        this._searchOK = this._searchOK.bind(this);
        this._errFetching = this._errFetching.bind(this);
        this._pressAdd = this._pressAdd.bind(this);
        this._getRenderRow = this._getRenderRow.bind(this);

    }

    getInitialState() {

        return {

            isLoading:true
        };
    }


    _searchOK(data) {
        this.setState({
            isLoading: false,
            data: data,
        })
    }


    componentDidMount() {
        this.props.navigation.setParams({title: this.props.area.name});
        this.getData();
    }

    async getData() {
        await ApiCalls.getPlantList(this.props.area.id,this._searchOK,this._userOut,this._errFetching);
    }

    _userOut() {
        alert("Please connect to your account");
        Actions.loginRoot({type:"reset"});
    }


    _errFetching() {
        alert("Erreur de chargement");
        this.setState({
            isLoading: false,
        });
    }

    _pressAdd() {
        Actions.CreatePlantScreen({area:this.props.area});
    }

    _onMapLoad(){
        let coordinates = this.props.area.coordList;
        this.refs.map.fitToCoordinates(coordinates) //{coordinates:this.props.path});
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
                        {this.state.data!=null?this.state.data.map((plant,index)=><MapView.Marker
                                pinColor={"rgba("+(1*index+10)%255+","+((1+index)**index)%255+","+200+",0.3)"}
                                coordinate={plant.coord}
                            />

                        ):null}
                    </MapView>
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
                    <Ionicons style={{flex: 1}} onPress={this._pressAdd} color={"black"} name={"ios-add-circle"} size={70}/>
                </View>
            </View>
        );

    }

    _getRenderRow(rowData) {
        return <OnePlantComponent area={this.state.data} data={rowData.item} style={styles.item}/>;
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