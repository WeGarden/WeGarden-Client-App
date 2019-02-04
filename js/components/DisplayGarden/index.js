import {Component} from "react";
import {StyleSheet, Animated, ListView, View, Text, RefreshControl, TouchableOpacity} from 'react-native';
import {ZoneListComponent} from './ZoneListComponent';
import React from "react";
import HeaderComponent from "./HeaderComponent";
import {MapView} from "expo";


const HEADER_EXPANDED_HEIGHT = 300;
const HEADER_COLLAPSED_HEIGHT = 50;

const zones = [
    {name: "zone1"},
    {name: "zone2"},
    {name: "zone3"},
    {name: "zone4"},
    {name: "zone5"},
    {name: "zone6"},
    {name: "zone7"},
];


export default class DisplayGarden extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            refreshing: false,
            scrollY: new Animated.Value(0)
        };

        this._onRefresh = this._onRefresh.bind(this);


    }

    componentDidMount() {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
            isLoading: false,
            dataSource: ds.cloneWithRows(zones),
        })

        // return fetch('http://172.18.13.119:3000/activity/')
        //      .then((response) => response.json())
        //      .then((responseJson) => {
        //          let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        //          this.setState({
        //              isLoading: false,
        //              dataSource: ds.cloneWithRows(responseJson.organizers),
        //          }, function() {
        //              // do something with new state
        //          });
        //      })
        //      .catch((error) => {
        //          console.error(error);
        //      });
    }


    _onRefresh() {
        this.setState({
            refreshing: true
        });

        this._refreshData();

    }

    _refreshData() {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});


        this.setState({
            refreshing: false,
            dataSource:
                ds.cloneWithRows([
                    {name: "zone2"},
                    {name: "zone4"},
                    {name: "zone5"},
                    {name: "zone6"},
                    {name: "zone7"},
                ]),
        })
    }

    _isEmpty() {
        return !this.state.dataSource || this.state.dataSource._cachedRowCount === 0;
    }

    render() {
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
                                <MapView style={styles.bar}
                                         showsMyLocationButton={false}
                                         showsPointsOfInterest={false}
                                         showsTraffic={false}
                                         zoomEnabled={false}
                                         minZoomLevel={10}
                                         zoomControlEnabled={false}
                                         scrollEnabled={false}
                                         rotateEnabled={false}
                                         toolbarEnabled={false}
                                         loadingEnabled={true}
                                         moveOnMarkerPress={false}
                                />
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
                            dataSource={this.state.dataSource}
                            renderRow={this._renderItem}
                        />
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
                    <Text>No zone found</Text>
                </View>
            }
        }
    }

    _renderItem(rowData) {
        return <ZoneListComponent
            name={rowData.name}
            category={rowData.category}
            place={rowData.place}
            date={rowData.date}
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
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
