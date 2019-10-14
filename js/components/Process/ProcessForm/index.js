import {Component} from 'react';
import {
    Dimensions,
    FlatList,
    Image, KeyboardAvoidingView,
    ListView,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import {Actions} from "react-native-router-flux/";
import React from "react";
import {Ionicons} from '@expo/vector-icons';
import ApiCalls from "../../../utils/ApiCalls";


const gardens = [
    {label: "Presence d'insectes", value: "3"},
    {label: "Sol humide", value: "80%"},
]

export default class ProcessForm extends Component {
    setValueIndex(text,index){
        let count;
        count=this.state.count;
        if(this.state.values[index]!=null && this.state.values[index].value !== "" && text === ""){
            count-=1
        }else if( (this.state.values[index]==null  || this.state.values[index].value === "" )&& text !== ""){
            count+=1
        }
            this.setState((prevState)=>{
                let newValues = prevState.values;
                newValues[index] = {value:text};
                console.log(count);
                return {count,values:newValues}
            })

        console.log(this.state.values)

        // if(index<this.state.values)
        // this.setState((prevState) => {
        //     let values = prevState.values;
        //     values[index] = {value:text};
        //     return({
        //         values: values,
        //     })});
        // else
        //     this.setState((prevState) => {
        //         let values = prevState.values;
        //         values.push({value:text});
        //         return({
        //             values: values,
        //         })})
    }


    constructor() {
        super();

        this.state = {
            description: '',
            name: '',
            values: {},
            label: '',
            value: '',
            hideNameLabel: true,
            hideDescLabel: true,
            count:0,
        };

        this._errFetching = this._errFetching.bind(this);
        this._setName = this._setName.bind(this)
        this._submit = this._submit.bind(this)
        this._setValue = this._setValue.bind(this)
        this._addLine = this._addLine.bind(this)
        this._setDescription = this._setDescription.bind(this)
        this._setProtocolTitle = this._setProtocolTitle.bind(this)
        this.setValueIndex = this.setValueIndex.bind(this)
        this._isFilled = this._isFilled.bind(this)

    }

    _setDescription(text) {
        this.setState({description: text, hideDescLabel:!text.length>0})
    }

    _setName(text) {
        this.setState({label: text})
    }

    _setProtocolTitle(text) {
        this.setState({name: text, hideNameLabel:!text.length>0})
    }

    _setValue(text) {
        this.setState({value: text})
    }

    _addLine() {
        this.setState((prevState) => ({
            values: [...prevState.values, {value:prevState.value}],
            label: null,
            value: null,

        }))
    }

    _isFilled() {
        console.log(this.props.protocol.entries.length);
        return this.state.count === this.props.protocol.entries.length ;
    }

    componentDidMount() {
        if (!this.props.isNew) {
            this.props.navigation.setParams({title: this.props.protocol.name});
            this.state.labels = this.props.protocol.entries
        }

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

    _submit() {
        let data;
        console.log(this.props.onFinish);
        if(this.props.isNew) {
            data = {
                description: this.state.description,
                entries: this.state.labels,
                name: this.state.name
            };

            this.props.onFinish(data, this.state.values);
            return
        }
        let values = [];
        this.props.protocol.entries.map((item)=>values.push(this.state.values[item.name]));

        this.props.onFinish(this.props.protocol,values);
    }

    render() {
        if (this.state.isLoading)
            return <View style={{alignItems: "center", justifyContent: "center"}}>
                <Text style={{flex: 1}}>Loading ...</Text>
            </View>;
        return <SafeAreaView style={{flex: 1}}>
                    <View>
                        <View style={{margin: 5}}>
                            <ScrollView
                                style={{height: 100}}
                            >
                                <Text style={{
                                    fontSize: 20,
                                    fontWeight: "bold",
                                }}>Description</Text>
                                <Text style={{fontSize: 15}}>
                                    {this.props.protocol.description}
                                </Text>
                            </ScrollView>
                        </View></View>
            <Text style={{
                fontSize: 20,
                fontWeight: "bold",
            }}>Details</Text>
            <FlatList
                data={this.props.protocol.entries}
                renderItem={(row,index) => {
                    return <View style={{
                    height: 30,
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center"
                }}>
                    <Text style={{flex: 1}}>{row.item.name}:</Text><TextInput placeholder={"Value"}
                                                                              value={()=>this.state.values[row.item.name]===null?"":this.state.values[row.item.name].value}
                                                                              style={{flex: 1, padding:5,borderWidth: 1}}
                                                                              onChangeText={(text)=>this.setValueIndex(text,row.item.name)}/>
                </View>}
                }
                keyExtractor={(item, index) => index}
            />
            <KeyboardAvoidingView behavior={"padding"} style={{
                position: "absolute",
                bottom: 0,
                flexDirection: "row",
                justifyContent: "space-evenly"
            }}>
                <TouchableOpacity disabled={!this._isFilled()} style={{
                    flex: 2,
                    width: Dimensions.get("screen").width,
                    alignItems: "center",
                    backgroundColor: this._isFilled() ? "#00BB55" : "grey",
                    height: 50,
                    justifyContent: "center",
                }}
                                  onPress={this._submit}>
                    <Text style={{color: "white"}}>Finish</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </SafeAreaView>
    }
}
