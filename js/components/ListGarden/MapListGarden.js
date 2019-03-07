import {Component} from 'react';
import {Image, ListView, SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import {Actions} from "react-native-router-flux/";
import React from "react";
import {Ionicons} from '@expo/vector-icons';
import {MapView} from 'expo';
import ApiCalls from "../../utils/ApiCalls";


const gardens = [
    {name: "Garden 1", type: "Opened"},
    {name: "Garden 2", type: "Opened"},
    {name: "Garden 3", type: "Opened"},
    {name: "Garden 4", type: "Opened"},
    {name: "Garden 5", type: "Opened"},
    {name: "Garden 6", type: "Opened"},
    {name: "Garden 7", type: "Opened"}
]

export default class ListGarden extends Component {

    constructor() {
        super();

        this.state = {
            isLoading: true,
            dataSource: null,
        };

        this._errFetching = this._errFetching.bind(this);
        this._searchOK = this._searchOK.bind(this);
        this.getData = this.getData.bind(this);

    }

    _searchOK(data) {
        this.setState({
            isLoading: false,
            dataSource: data,
        })
    }


    componentDidMount() {
        this.getData();
    }

    async getData() {
        if (this.props.userId)
            await ApiCalls.getUserGardenList(this.props.userId, this._searchOK, this._userOut, this._errFetching);
        else
            await ApiCalls.getGardenList(this._searchOK, this._userOut, this._errFetching);
    }

    static _userOut() {
        alert("Connectez-vous pour continuer");
        Actions.loginRoot();
    }


    _errFetching() {
        alert("Erreur de chargement");
        this.setState({
            isLoading: false,
            error: true
        });
    }

    render() {
        if (this.state.isLoading)
            return <View style={{alignItems: "center", justifyContent: "center"}}>
                <Text style={{flex: 1}}>Loading ...</Text>
            </View>;
        else if (this.state.error)
            return <View style={{alignItems: "center", justifyContent: "center"}}>
                <Text style={{flex: 1}}>Loading Error!</Text>
            </View>
        else if (!this.state.dataSource || this.state.dataSource.length === 0) {
            return <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}><Text>Garden non
                trouvé!</Text></View>
        }
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return <SafeAreaView style={{flex: 1}}>
            <MapView
                ref={"map"}
                provider={"google"}
                style={{flex: 1}}
                mapPadding={{
                    top: 10,
                    right: 10,
                    bottom: 10,
                    left: 10
                }}
                onLayout={this._onMapLoad}
                mapType={this.state.isSatellite ? "satellite" : "standard"}
            >
                {this.state.dataSource != null ? this.state.dataSource.map((garden, index) => <MapView.Polygon
                        onPress={() => Actions.oneGardenScreen({garden})}
                        fillColor={"rgba(" + (1 * index + 10) % 255 + "," + ((1 + index) ** index) % 255 + "," + 200 + ",0.3)"}
                        coordinates={garden.coordList}
                    />
                ) : null}

                <Ionicons onPress={() => {
                    Actions.createGardenScreen({onFinish: this.getData})
                }}
                          style={{position: "absolute", bottom: 40, right: 20}} size={50} name={"ios-add-circle"}/>
            </MapView>
        </SafeAreaView>
    }
}
