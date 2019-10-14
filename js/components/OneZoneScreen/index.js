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
    Dimensions
} from 'react-native';
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

            isLoading: true
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
        await ApiCalls.getPlantList(this.props.area.id, this._searchOK, this._userOut, this._errFetching);
    }

    _userOut() {
        alert("Please connect to your account");
        Actions.loginRoot({type: "reset"});
    }


    _errFetching() {
        alert("Erreur de chargement");
        this.setState({
            isLoading: false,
        });
    }

    _pressAdd() {
        Actions.CreatePlantScreen({area: this.props.area});
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
                        {this.state.data != null ? this.state.data.map((plant, index) => <MapView.Marker
                                pinColor={"rgba(" + (1 * index + 10) % 255 + "," + ((1 + index) ** index) % 255 + "," + 200 + ",0.3)"}
                                coordinate={plant.coord}
                            />
                        ) : null}
                    </MapView>
                </View>
                <View style={styles.header}>
                    <View
                        style={{position: "absolute", bottom: 0, flexDirection: "row", justifyContent: "space-evenly"}}>
                        <View style={{
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "center",
                            height: 60
                        }}>
                            <TouchableOpacity style={styles.button}
                                              onPress={() => Actions.observationListScreen({area: this.props.area})}

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
                                              onPress={() => Actions.actionListScreen({area: this.props.area})}
                            >
                                <Text>Actions</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <FlatList
                    style={{flex: 1,}}
                    showsHorizontalScrollIndicator={false}
                    // contentContainerStyle={{alignItems:"center"}}
                    //columnWrapperStyle={{justifyContent: "space-between",}}
                    horizontal={true}
                    data={this.state.data}
                    ListHeaderComponent={<View style={{
                        shadowOffset: {
                            width: 0,
                            height: 3,
                        },
                        shadowColor: "black",
                        shadowOpacity: 0.5,
                        elevation: 2,
                    }}><TouchableOpacity onPress={() => Actions.CreatePlantScreen({area: this.props.data})}
                                         style={styles.addButtonCard}>
                        <View style={{flex: 4, justifyContent: "center"}}><Ionicons style={{}} name={'ios-add-circle'}
                                                                                    size={100}
                                                                                    color={"#00BB55"}/></View>
                        <View style={{flex: 1, backgroundColor: "#ffffff", padding: 5}}>
                            <Text style={{flex: 1, justifyContent: "center", fontWeight: "bold"}}>Add a plant</Text>

                        </View>
                    </TouchableOpacity>
                    </View>}
                    renderItem={this._getRenderRow}
                    keyExtractor={item => JSON.stringify(item.id)}
                />
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
        //backgroundColor: '#fffef6',
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
        height: 300,

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
        elevation: 2,

    },

    addButtonCard: {
        width: 170,
        margin: 10,
        height: 200,
        borderRadius: 10,
        backgroundColor: "white",
        alignItems: 'center',
        justifyContent: 'center',
        overflow: "hidden"
    },

});