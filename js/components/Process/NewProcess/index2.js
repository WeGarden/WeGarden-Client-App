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

export default class NewProcess extends Component {
    setValueIndex(text,index){
        this.setState((prevState) => {
            let values = prevState.values;
            values[index] = {value:text};
            return({
                values: values,
            })})
    }


    constructor() {
        super();

        this.state = {
            description: '',
            name: '',
            labels: [],
            values: [],
            label: '',
            value: '',
            hideNameLabel: true,
            hideDescLabel: true,
        };

        this._errFetching = this._errFetching.bind(this);
        this._setName = this._setName.bind(this)
        this._submit = this._submit.bind(this)
        this._setValue = this._setValue.bind(this)
        this._addLine = this._addLine.bind(this)
        this._setDescription = this._setDescription.bind(this)
        this._setProtocolTitle = this._setProtocolTitle.bind(this)
        this.setValueIndex = this.setValueIndex.bind(this)

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
            labels: [...prevState.labels, {name:prevState.label,type:0}],
            values: [...prevState.values, {value:prevState.value}],
            label: null,
            value: null,

        }))
    }

    _isFilled() {
        return !this.state.isDrawing && this.state.actObsName && this.state.actObsName.length > 3;
    }

    componentDidMount() {
        if (!this.props.isNew) {
            this.props.navigation.setParams({title: this.props.protocol.name + "'s actions"});
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
        let data
        if(this.props.isNew) {
            data = {
                description: this.state.description,
                entries: this.state.labels,
                name: this.state.name
            };

            this.props.onFinish(data, this.state.values);
        }
        this.props.onFinish(this.props.protocol,this.state.values);
    }

    render() {
        if (this.state.isLoading)
            return <View style={{alignItems: "center", justifyContent: "center"}}>
                <Text style={{flex: 1}}>Loading ...</Text>
            </View>;
        return <SafeAreaView style={{flex: 1}}>
            {
                this.props.isNew ?
                    <View>
                        <View style={{margin:5}}>
                            <Text style={{
                                fontSize: 10,
                                position: "absolute",
                                top: 0,
                                fontWeight: "bold",
                                opacity: this.state.hideNameLabel ? 0 : 1
                            }}>Name:</Text>
                            <TextInput
                                style={{height: 50, justifyContent:"flex-end", fontSize: 15}}
                                placeholder={"Name"}
                                onChangeText={this._setProtocolTitle}
                                showsScale={true}
                                value={this.state.name}
                                multiline={false}
                            />
                        </View>
                        <View style={{margin: 5}}>
                            <Text style={{

                                fontSize: 10,
                                position: "absolute",
                                top: 0,
                                fontWeight: "bold",
                                opacity: this.state.hideDescLabel ? 0 : 1
                            }}>Description:</Text>
                            <TextInput
                                style={{paddingTop:20,height: 100, fontSize: 15}}
                                placeholder={"Description"}
                                onChangeText={this._setDescription}
                                showsScale={true}
                                value={this.state.description}
                                multiline={true}
                            />
                        </View>
                    </View> :
                    <View>
                        <View style={{margin: 5}}>
                            <Text style={{
                                fontSize: 10,
                                position: "absolute",
                                top: 0,
                                fontWeight: "bold",
                            }}>Description:</Text>
                            <ScrollView
                                style={{height: 100}}
                            >
                                <Text style={{fontSize: 15}}>
                                    {this.props.protocol.description}
                                </Text>
                            </ScrollView>
                        </View></View>
            }
            <Text style={{
                fontSize: 20,
                fontWeight: "bold",
            }}>Details</Text>
            <FlatList
                ListHeaderComponent={
                    this.props.isNew ? <View style={{height: 30, flex: 1, alignItems: "center", flexDirection: "row"}}>
                        <TextInput placeholder={"Enter element's label"} value={this.state.label}
                                   style={{flex: 1,padding:5,borderWidth: 1}}
                                   onChangeText={this._setName}/>
                        <Text>:</Text>
                        <TextInput
                            style={{flex: 1,padding:5 ,borderWidth: 1}} value={this.state.value}
                            placeholder={"Enter element's value"}
                            onChangeText={this._setValue}/>
                        <Ionicons
                            onPress={this._addLine}
                            size={30} name={"ios-add-circle"}/>
                    </View> : null}
                data={this.state.labels}
                renderItem={(row,index) => <View style={{
                    height: 30,
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center"
                }}>
                    <Text style={{flex: 1}}>{row.item.name}:</Text><TextInput placeholder={"Value"}
                                                                              value={this.state.values[index]?this.state.values[index].value:''}
                                                                              style={{flex: 1, padding:5,borderWidth: 1}}
                                                                              onChangeText={this.setValueIndex}/>
                </View>}

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
