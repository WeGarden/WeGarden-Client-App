import {Component} from 'react';
import {Image, ListView, SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import {Actions} from "react-native-router-flux/";
import React from "react";
import {Ionicons} from '@expo/vector-icons';
import ApiCalls from "../../../utils/ApiCalls";


export default class ObservationList extends Component {

    constructor() {
        super();

        this.state = {
            isLoading: true,
            dataSource: null,
        };

        this._errFetching = this._errFetching.bind(this);
        this._searchOK = this._searchOK.bind(this);
        this.getData = this.getData.bind(this);
        this._userOut = this._userOut.bind(this);

    }

    _searchOK(data) {
        this.setState({
            isLoading: false,
            dataSource: data,
        })
    }


    componentDidMount() {
        this.props.navigation.setParams({title: (this.props.area?this.props.area.name:this.props.plant?this.props.plant.name:null)+"'s observations"});
        this.getData();
    }

    async getData() {
        if (this.props.plant)
            await ApiCalls.getPlantObservationList(this.props.plant.id, this._searchOK, this._userOut, this._errFetching);
        else if(this.props.area)
            await ApiCalls.getAreaObservationList(this.props.area.id,this._searchOK, this._userOut, this._errFetching);
    }

    _userOut() {
        alert("Please connect to your account");
        Actions.loginRoot({onFinish:this.getData});
    }


    _errFetching() {
        alert("Erreur de chargement");
        this.setState({
            isLoading: false,
        });
    }

    render() {
        if (this.state.isLoading)
            return <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                <Text>Loading ...</Text>
            </View>;

        if (!this.state.dataSource || this.state.dataSource.length === 0) {
            return <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}><Text>No observation found</Text>
                <Ionicons onPress={() => {
                    Actions.CreateObservationScreen({onFinish: this.getData,plant:this.props.plant,area:this.props.area})
                }}
                          style={{position: "absolute", bottom: 40, right: 20}} size={50} name={"ios-add-circle"}/>
            </View>
        }
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return <SafeAreaView style={{flex: 1}}>
            <ListView
                dataSource={ds.cloneWithRows(this.state.dataSource)}
                renderRow={(observation) =>
                    <TouchableOpacity onPress={() => Actions.oneObservationScreen({data: observation})}
                                      style={{height: 80, flex: 1, flexDirection: "row", justifyContent: "flex-start"}}>
                        <View style={{flex: 2, margin: 2, justifyContent: 'center'}}>
                            <Text style={{fontWeight: "bold", fontSize: 17}}>{observation.name} {observation.type}</Text>
                        </View>

                    </TouchableOpacity>
                }
                renderSeparator={() => <View style={{backgroundColor: "grey", height: 1, marginVertical: 1}}/>}
            />
            <Ionicons onPress={() => {
                Actions.CreateObservationScreen({onFinish: this.getData,plant:this.props.plant,area:this.props.area})
            }}
                      style={{position: "absolute", bottom: 40, right: 20}} size={50} name={"ios-add-circle"}/>
        </SafeAreaView>
    }


}
