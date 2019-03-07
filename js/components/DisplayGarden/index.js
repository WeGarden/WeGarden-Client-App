import {Component} from "react";
import {StyleSheet, Animated, ListView, View, Text, RefreshControl, TouchableOpacity} from 'react-native';
import {ZoneListComponent} from './ZoneListComponent';
import React from "react";
import HeaderComponent from "./HeaderComponent";
import {MapView} from "expo";
import ApiCalls from "../../utils/ApiCalls";
import {Actions} from "react-native-router-flux";
import {Ionicons} from "@expo/vector-icons";


const HEADER_EXPANDED_HEIGHT = 250;
const HEADER_COLLAPSED_HEIGHT = 50;


export default class DisplayGarden extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            refreshing: false,
            scrollY: new Animated.Value(0)
        };

        this._onRefresh = this._onRefresh.bind(this);
        this._errFetching = this._errFetching.bind(this);
        this._searchOK = this._searchOK.bind(this);
        this.getData = this.getData.bind(this);
        this._pressAdd = this._pressAdd.bind(this);
        this._onMapLoad = this._onMapLoad.bind(this);

    }

    _searchOK(data) {
        this.setState({
            isLoading: false,
            data: data,
            refreshing: false,
        })
    }


    componentDidMount() {
        this.props.navigation.setParams({title: this.props.garden.name});

        this.getData();
    }

    async getData() {
        await ApiCalls.getAreaList(this.props.garden.id,this._searchOK,this._userOut,this._errFetching);
    }

    _userOut() {
        alert("Please connect to your account");
        Actions.loginRoot();
    }


    _errFetching() {
        alert("Erreur de chargement");
        this.setState({
            isLoading: false,
        });
    }

    _onRefresh() {
        this.setState({
            refreshing: true
        });

        this.getData();
    }

    _isEmpty() {
        return !this.state.data || this.state.data.length === 0;
    }
    _onMapLoad(){
        let coordinates = this.props.garden.coordList;
        this.refs.map.fitToCoordinates(coordinates) //{coordinates:this.props.path});
    }

    render() {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                    <View style={{backgroundColor: "#495A80", borderRadius: 5, padding: 20}}>
                        <Text style={{color: 'white', textAlign: 'center'}}>Loading ...</Text>
                    </View>
                </View>
            );
        } else {
            if (!this._isEmpty()) {
                const headerHeight = this.state.scrollY.interpolate({
                    inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
                    outputRange: [HEADER_EXPANDED_HEIGHT, HEADER_COLLAPSED_HEIGHT],
                    extrapolate: 'clamp'
                });
                return (
                    <View style={styles.container}>
                        <Animated.View style={{height: headerHeight,}}>
                            <View style={{flex: 1}}>
                                <MapView
                                    ref={"map"}
                                    provider={"google"}
                                    style={{height:200}}
                                    mapPadding={{
                                        top: 10,
                                        right: 10,
                                        bottom: 10,
                                        left: 10
                                    }}
                                    onLayout={this._onMapLoad}
                                    mapType={this.state.isSatellite ? "satellite" : "standard"}
                                >
                                    <MapView.Polygon
                                        fillColor={"rgba(0,0,200,0.3)"}
                                        coordinates={this.props.garden.coordList}
                                    />
                                    {this.state.data!=null?this.state.data.map((area,index)=><MapView.Polygon
                                            fillColor={"rgba("+(1*index+10)%255+","+((1+index)**index)%255+","+200+",0.3)"}
                                            coordinates={area.coordList}
                                        />

                                    ):null}
                                </MapView>
                                <View style={{flexDirection: "row", justifyContent: "space-evenly"}}>
                                    <TouchableOpacity style={{
                                        flex: 1,
                                        alignItems: "center",
                                        justifyContent: "center",
                                        height: 50
                                    }}
                                    >
                                        <Text>Observations</Text>
                                    </TouchableOpacity>
                                    <View style={{backgroundColor: "black", width: 1}}/>
                                    <TouchableOpacity style={{
                                        flex: 1,
                                        alignItems: "center",
                                        justifyContent: "center",
                                        height: 50
                                    }}>
                                        <Text>Actions</Text>
                                    </TouchableOpacity>
                                    <View style={{backgroundColor: "black", width: 1}}/>
                                    <TouchableOpacity style={{
                                        flex: 1,
                                        alignItems: "center",
                                        justifyContent: "center",
                                        height: 50
                                    }}
                                                      onPress={this._pressAdd}
                                    >
                                        <Text>Add area</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Animated.View>
                        <ListView
                            onScroll={Animated.event(
                                [{
                                    nativeEvent: {
                                        contentOffset: {
                                            y: this.state.scrollY
                                        }
                                    }
                                }])}
                            scrollEventThrottle={16}
                            enableEmptySections
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={this._onRefresh}
                                />}
                            dataSource={ds.cloneWithRows(this.state.data)}
                            renderRow={this._renderItem}
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
            } else {
                return <View style={styles.container}
                             refreshControl={
                                 <RefreshControl
                                     refreshing={this.state.refreshing}
                                     onRefresh={this._onRefresh}
                                 />}
                >
                    <Text>No area found</Text>
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
            }
        }
    }

    _pressAdd() {
        Actions.CreateAreaScreen({garden:this.props.garden});
    }

    _renderItem(rowData) {
        return <ZoneListComponent
            data={rowData}
        />;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#e2e2e2",
        //alignItems: 'center',
        //justifyContent: 'center',
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
        height:200,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
