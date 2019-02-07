import {Component} from 'react';
import {Image, ListView, SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import {Actions} from "react-native-router-flux/";
import React from "react";
import {Ionicons} from '@expo/vector-icons';


const gardens = [
    {name:"Garden 1",type:"Opened"},
    {name:"Garden 2",type:"Opened"},
    {name:"Garden 3",type:"Opened"},
    {name:"Garden 4",type:"Opened"},
    {name:"Garden 5",type:"Opened"},
    {name:"Garden 6",type:"Opened"},
    {name:"Garden 7",type:"Opened"}
]

export default class ActionList extends Component {

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

    getData() {
        gardens.push({name:"haha", type:"blooo"});
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
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return <SafeAreaView style={{flex:1}}>
            <ListView
                dataSource={ds.cloneWithRows(this.state.dataSource)}
                renderRow={(garden) =>
                    <TouchableOpacity onPress={() => Actions.actionDetailsScreen({garden})}
                                      style={{height: 80, flex: 1, flexDirection: "row", justifyContent:"flex-start"}}>
                        <View style={{flex:2,margin: 2, justifyContent: 'center'}}>
                            <Text style={{fontWeight: "bold", fontSize: 17}}>{garden.name} {garden.type}</Text>
                        </View>

                    </TouchableOpacity>
                }
                renderSeparator={() => <View style={{backgroundColor: "green", height: 1, marginVertical: 1}}/>}
            />
            <Ionicons onPress={()=>{Actions.newActionScreen({onFinish:this.getData})}}
                      style={{position:"absolute", bottom:40,right:20}} size={50} name={"ios-add-circle"}/>
        </SafeAreaView>
    }
}
