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
    Image
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
                             zoomControlEnabled={false}
                             scrollEnabled={false}
                             rotateEnabled={false}
                             toolbarEnabled={false}
                             loadingEnabled={true}
                             moveOnMarkerPress={false}
                    />
                    <View style={{flexDirection: "row", justifyContent: "space-evenly"}}>
                        <TouchableOpacity style={{flex: 1, alignItems: "center", justifyContent: "center", height: 50}}>
                            <Ionicons name="ios-hair-cross"/>
                        <Text style={{color:"green"}}>Observations</Text></TouchableOpacity>

                        <TouchableOpacity style={{flex: 1, alignItems: "center", justifyContent: "center", height: 50}}><Text style={{color:"green"}}>Actions</Text></TouchableOpacity>
                    </View>
                </View>
                <View>
                    <Text style={{fontWeight: "bold", fontSize:1}}>Pictures</Text>
                </View>
                <View
                    style={{flex:1}}
                >
                <Scene
                    hideNavBar={false}
                    title={"Gardens"}
                    
                    tabs={true} legacy={true} swipeEnabled={true}>
                    <Scene key="gardensList"
                           component={ListGarden}
                           title={"Gardens"}
                           hideNavBar={true}
                           initial
                    />
                    <Scene key="gardensListMap"
                           icon={this.tabIcon}
                           iconName={"map"}
                           component={MapListGarden}
                           title={"Gardens"}
                           hideNavBar={true}
                    />

                </Scene>
                </View>
                <FlatList
                    horizontal={true}
                    style={{flex: 1,}}
                    // contentContainerStyle={{alignItems:"center"}}
                    //columnWrapperStyle={{justifyContent: "space-evenly",}}
                    //numColumns={2}
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
        return <View {...this.props} style={{...styles.component}}>
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
        margin:10,
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
    },


});