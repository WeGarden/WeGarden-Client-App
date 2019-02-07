import {Component} from 'react';
import {Image, ListView, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import {Actions} from "react-native-router-flux/";
import React from "react";
import {Ionicons} from '@expo/vector-icons';


const gardens = [
    {name: "Presence d'insectes", value: "3"},
    {name: "Sol humide", value: "80%"},
]

export default class NewObservation extends Component {

    constructor() {
        super();

        this.state = {
            isLoading: true,
            datasource: gardens,
        };

        this._errFetching = this._errFetching.bind(this);
        this._searchOK = this._searchOK.bind(this);
        this.getData = this.getData.bind(this);
        this._setName = this._setName.bind(this)
        this._setValue = this._setValue.bind(this)
        this._addLine = this._addLine.bind(this)

    }

    _setName(text) {
        this.setState({name: text})
    }

    _setValue(text) {
        this.setState({value: text})
    }

    _addLine() {
        this.setState((prevState) => ({
            datasource: [...prevState.datasource, {name: prevState.name, value: prevState.value}],
            name:null,
            value:null,

        }))
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

    getData() {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
            isLoading: false,
            dataSource: gardens,
        })
    }

    static _userOut() {
        alert("Connectez-vous pour continuer");
        Actions.loginRoot();
    }


    _errFetching() {
        alert("Erreur de chargement");
        this.setState({
            isLoading: false,
        });
    }

    render() {
        if (this.state.isLoading)
            return <View style={{alignItems: "center", justifyContent: "center"}}>
                <Text style={{flex: 1}}>Loading ...</Text>
            </View>;

        if (!this.state.dataSource || this.state.dataSource.length === 0) {
            return <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}><Text>Garden non
                trouvé!</Text></View>
        }
        return <SafeAreaView style={{flex: 1}}>
            <ScrollView>
                {this.state.datasource.map((item) => {return <View style={{
                    height: 30,
                    flex: 1,
                    flexDirection: "row",
                    alignItems:"center"
                }}><Text style={{flex:1}} >{item.name}</Text><Text style={{flex:1}} >{item.value}</Text></View>})}
                <View style={{height: 30, flex: 1, alignItems:"center", flexDirection: "row"}}>
                    <TextInput placeholder={"Enter element's name"} value={this.state.name} style={{flex:1, borderWidth: 1}} onChangeText={this._setName}/><Text>:</Text><TextInput style={{flex:1, borderWidth: 1}} value={this.state.value} placeholder={"Enter element's value"} onChangeText={this._setValue}/>
                    <Ionicons
                    onPress={this._addLine}
                    size={30} name={"ios-add-circle"}/>
                </View>
            </ScrollView>
            <TouchableOpacity style={{flex: 1, alignItems: "center", justifyContent: "center", height: 50}}><Text style={{color:"green"}}>Finish</Text></TouchableOpacity>
        </SafeAreaView>
    }
}
