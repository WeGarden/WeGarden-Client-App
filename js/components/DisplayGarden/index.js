import {Component} from "react";
import {Dimensions,StyleSheet, Animated, ListView, View, Text, RefreshControl, TouchableOpacity} from 'react-native';
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
            data: [],
            isLoadedMap:false,
        };

        this._onRefresh = this._onRefresh.bind(this);
        this._errFetching = this._errFetching.bind(this);
        this._searchOK = this._searchOK.bind(this);
        this.getData = this.getData.bind(this);
        this._pressAdd = this._pressAdd.bind(this);
        this._onMapLoad = this._onMapLoad.bind(this);
        this._renderHeader = this._renderHeader.bind(this);
        this._renderFooter = this._renderFooter.bind(this);
        this._renderButtonsBar = this._renderButtonsBar.bind(this);
        this._renderMap = this._renderMap.bind(this);

    }

    _searchOK(data) {
        this.setState({
            isLoading: false,
            data: data,
            refreshing: false,
        })
    }

    _renderMap() {
        let buttonsBar = this._renderButtonsBar();
        return <View style={{position:"absolute",width:Dimensions.get("screen").width,top:0,flex: 1, height: Dimensions.get("screen").height}}>
            <MapView
                ref={(ref) => {
                    this.state.map = ref
                }}
                provider={"google"}
                style={{flex:1}}
                mapPadding={{
                    top: 10,
                    right: 10,
                    bottom: Dimensions.get("screen").height - 280,
                    left: 10
                }}
                onLayout={this._onMapLoad}
                mapType={this.state.isSatellite ? "satellite" : "standard"}
            >

                <MapView.Polygon
                    fillColor={"rgba(0,0,200,0.3)"}
                    coordinates={this.props.garden.coordList}
                />
                {this.state.data != null ? this.state.data.map((area, index) => <MapView.Polygon
                        fillColor={"rgba(" + (1 * index + 10) % 255 + "," + ((1 + index) ** index) % 255 + "," + 200 + ",0.3)"}
                        coordinates={area.coordList}
                    />
                ) : null}

            </MapView>
        </View>
    }
    _renderHeader() {
        let buttonsBar = this._renderButtonsBar();
        return <View style={{flex: 1, height: 360}}>
            {buttonsBar}
        </View>
    }

    _renderButtonsBar() {
       // if (this.state.isLoadedMap)
        return <View style={{position:"absolute", bottom:10,width:Dimensions.get("screen").width,flexDirection: "row", height: 60, justifyContent: "space-evenly"}}>
            <View style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                height: 60
            }}>
                <TouchableOpacity style={{...styles.button,backgroundColor:"#00BB55"}}
                                  onPress={this._pressAdd}
                >
                    <Text style={{fontWeight:"bold",color:"white"}}>Add area</Text>
                </TouchableOpacity>
            </View>
        </View>;
    }

    _renderFooter() {
        return this._isEmpty() ? <View style={{height: 200, alignItems: "center", justifyContent: "center"}}>
            <Text>No area found</Text>
        </View> : null

    }

    componentDidMount() {
        this.props.navigation.setParams({title: this.props.garden.name});

        this.getData();
    }

    async getData() {
        await ApiCalls.getAreaList(this.props.garden.id, this._searchOK, this._userOut, this._errFetching);
    }

    _userOut() {
        alert("Please connect to your account");
        Actions.loginRoot({onFinish: this.getData});
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

    _onMapLoad() {
        console.log(this.refs);
        let coordinates = this.props.garden.coordList;
        this.state.map.fitToCoordinates(coordinates) //{coordinates:this.props.path});
        if(!this.state.isLoadedMap)
            this.setState({isLoadedMap:true});
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
            return (
                <View style={styles.container}>
                    {this._renderMap()}
                    <ListView
                        style={{shadowOffset: {
                                width: 0,
                                height: -2,
                            },
                            shadowColor: "black",
                            shadowOpacity: 0.5,
                            elevation: 2
                        }}
                        renderHeader={this._renderHeader}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh}
                            />}
                        dataSource={ds.cloneWithRows(this.state.data)}
                        renderRow={this._renderItem}
                        renderFooter={this._renderFooter}
                    />
                </View>
            );
        }
    }

    _pressAdd() {
        Actions.CreateAreaScreen({garden: this.props.garden});
    }

    _renderItem(rowData, index) {
        console.log(index);
        return <ZoneListComponent
            data={rowData}
        />;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: "#e2e2e2",
        //alignItems: 'center',
        //justifyContent: 'center',
    },
    button:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        height: 30,
        width: '85%',
        backgroundColor:"white",
        borderRadius:10,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.5,
        elevation: 2
    },

    header: {
        //  position: 'absolute',
        //  top: 0,
        //  left: 0,
        //  right: 0,
        backgroundColor: '#00BB55',
        //flex:1
        //overflow: 'hidden',
    },
    bar: {
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
