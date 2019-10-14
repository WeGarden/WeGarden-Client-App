import {Component,} from "react";
import {TouchableOpacity, StyleSheet, View, Text, ListView, FlatList, Image} from "react-native";
import React from "react";
import {Actions} from "react-native-router-flux";
import OnePlantComponent from "../OneZoneScreen/OnePlantComponent";
import ApiCalls from "../../utils/ApiCalls";
import Ionicons from "@expo/vector-icons/Ionicons";

const zones = [
    {key: '1', name: "zone1"},
    {key: '2', name: "zone2"},
    {key: '3', name: "zone3"},
    {key: '4', name: "zone4"},
    {key: '5', name: "zone5"},
    {key: '6', name: "zone6"},
    {key: '7', name: "zone7"},
];


export class ZoneListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
        this._searchOK = this._searchOK.bind(this);
        this._errFetching = this._errFetching.bind(this);
        this._rowRender = this._rowRender.bind(this);
        this._addPlantRender = this._addPlantRender.bind(this);

    }


    _searchOK(data) {
        this.setState({
            isLoading: false,
            data: data,
        })
    }


    componentDidMount() {
        this.getData();
    }

    async getData() {
        await ApiCalls.getPlantList(this.props.data.id, this._searchOK, this._userOut, this._errFetching);
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

    render() {

        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => Actions.AreaScreen({area: this.props.data})}
                                  style={{flexDirection: "row",}}>
                    <View style={styles.titleContainer}>
                        <Text style={{fontSize: 20, fontWeight: "bold"}}>{this.props.data.name}</Text>
                        <Text style={{fontSize: 18, color: "#00BB55"}}>Details</Text>

                    </View>
                    <View style={{padding: 10, justifyContent: "center", alignItems: "center"}}>
                        <Ionicons name={"ios-arrow-forward"} size={40}/>
                    </View>
                </TouchableOpacity>

                {this.state.isLoading ?
                    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                        <View style={{backgroundColor: "#495A80", borderRadius: 5, padding: 20}}>
                            <Text style={{color: 'white', textAlign: 'center'}}>Loading ...</Text>
                        </View>
                    </View>
                    : <FlatList
                        horizontal={true}
                        data={this.state.data}
                        ListHeaderComponent={this._addPlantRender}
                        renderItem={this._rowRender}
                        style={{backgroundColor: "#ffffff"}}
                        keyExtractor={item => JSON.stringify(item.id)}
                        showsHorizontalScrollIndicator={false}
                    />
                }
            </View>
        );

    }

    _addPlantRender() {
        return <View style={{
            shadowOffset: {
                width: 0,
                height: 3,
            },
            shadowColor: "black",
            shadowOpacity: 0.5,
            elevation: 2,
        }}><TouchableOpacity onPress={() => Actions.CreatePlantScreen({area: this.props.data})}
                             style={styles.addButtonCard}>
            <View style={{flex: 4, justifyContent: "center"}}><Ionicons style={{}} name={'ios-add-circle'} size={100}
                                                                        color={"#00BB55"}/></View>
            <View style={{flex: 1, backgroundColor: "#ffffff", padding: 5}}>
                <Text style={{flex: 1, justifyContent: "center", fontWeight: "bold"}}>Add a plant</Text>

            </View>
        </TouchableOpacity>
        </View>
    }

    _rowRender(rowData) {
        return <OnePlantComponent
            data={rowData.item}
            area={this.props.data}
            style={{margin: 10,}}
        />;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        // borderWidth: 1,
        //borderColor: "#1b4a19",

        height: 300,
        justifyContent: 'center',
        marginBottom: 20,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowColor: "black",
        shadowOpacity: 0.3,
        elevation: 2,
    },
    titleContainer: {
        flex: 1,
        padding: 10,
//        backgroundColor: "#406442",
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
