import {Component,} from "react";
import {TouchableOpacity, StyleSheet, View, Text, ListView, FlatList} from "react-native";
import PlantComponent from "./PlantComponent";
import React from "react";
import {Actions} from "react-native-router-flux";
import OnePlantComponent from "../OneZoneScreen/OnePlantComponent";
import ApiCalls from "../../utils/ApiCalls";

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
        await ApiCalls.getPlantList(this.props.data.id,this._searchOK,this._userOut,this._errFetching);
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

            return (
                <View style={styles.container}>
                    <View style={styles.titleContainer}>
                        <Text style={{fontSize: 20, color: "white"}}>{this.props.data.name}</Text>
                        <TouchableOpacity onPress={()=>Actions.AreaScreen({area:this.props.data})}>
                            <Text style={{fontSize: 18, color: "white"}}>Details</Text>
                        </TouchableOpacity>
                    </View>
                    {!(this.state.data != null && this.state.data.length !== 0)?
                        <View style={{flex:1,justifyContent:"center", alignItems: "center"}}>
                            <TouchableOpacity onPress={()=>Actions.CreatePlantScreen({area:this.props.data})} style={{backgroundColor: "#406442",}}>
                                <Text style={{color:"white"}}>Add a plant</Text>
                            </TouchableOpacity>
                        </View> :
                    <FlatList
                        horizontal={true}
                        data={this.state.data}
                        renderItem={this._rowRender}
                        style={{backgroundColor: "#f2f2f2"}}

                    />
                    }
                </View>
            );
        }
    }

    _rowRender(rowData) {
        return <OnePlantComponent
            data={rowData.item}
            area={this.props.data}
            style={{margin:10,}}
        />;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: "#2f862f",
        marginVertical: 5,
        // borderWidth: 1,
        // borderColor: "#1b4a19",
        height: 300,
        justifyContent: 'center',
    },
    titleContainer: {
        padding: 10,
        backgroundColor: "#406442",
    }
});
