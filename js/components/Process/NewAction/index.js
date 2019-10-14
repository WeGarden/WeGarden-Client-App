import React from 'react';
import {
    Dimensions,
    FlatList,
    Alert,
    SafeAreaView,
    KeyboardAvoidingView,
    Text,
    View,
    TextInput,
    TouchableOpacity
} from 'react-native';
import {MapView} from "expo";

import {Actions} from "react-native-router-flux";
import ApiCalls from "../../../utils/ApiCalls";
import {Ionicons} from "@expo/vector-icons";



export default class NewAction extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            actObsName: "",
            protocols:[],
            hideLabel:true,
            isLoading:true,
        };
        this.setActObsName = this.setActObsName.bind(this);
        this._isFilled = this._isFilled.bind(this);
        this._submit = this._submit.bind(this);
        this.getData = this.getData.bind(this);
        this.renderProtocols = this.renderProtocols.bind(this);
        this.onActionCreated = this.onActionCreated.bind(this);
    }
    _submit(protocol,values){
        let data ={
            name: this.state.actObsName,
            protocolId: protocol.id,
            statementType: "action",
            values:values
        };
        if(this.props.plant)
            ApiCalls.createPlantAction(this.props.plant.id,data,this.onActionCreated,this.on401,this.onErr)
        else
            ApiCalls.createAreaAction(this.props.area.id,data,this.onActionCreated,this.on401,this.onErr)

    }

    async componentDidMount() {
        this.getData()
    }

    _errFetching(){
        alert("Connexion failed");
        Actions.pop()
    }

    async getData(){
        await ApiCalls.getProcessList((protocols)=>this.setState({protocols,isLoading:false}), this._userOut, this._errFetching);
    }

    setActObsName(title) {
        let hideLabel = true;
        if(title.length>0)
            hideLabel = false;
        this.setState({actObsName: title,hideLabel})
    }

    _isFilled() {
        return this.state.actObsName && this.state.actObsName.length > 3;
    }


    render() {
        return <SafeAreaView style={{flex: 1, backgroundColor: "white"}}>
            <View style={{margin: 5}}>
                <Text style={{
                    fontSize: 10,
                    position: "absolute",
                    top: 0,
                    fontWeight: "bold",
                    opacity: this.state.hideLabel ? 0 : 1
                }}>Name:</Text>
                <TextInput
                    style={{height: 50, fontSize: 20}}
                    placeholder={"Action name (required)"}
                    onChangeText={this.setActObsName}
                    showsScale={true}
                    value={this.state.actObsName}
                />
            </View>
            <View style={{paddingHorizontal: 10}}>
                <Text style={{fontWeight: "bold", fontSize: 25}}>Choose the protocol:</Text>
            </View>
            {this.renderProtocols()}
        </SafeAreaView>
    }

    renderProtocols() {
        if(this.state.isLoading)
            return <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                <Text>Loading...</Text>
            </View>;
        return <FlatList
            ListHeaderComponent={<TouchableOpacity
                style={{flex: 1, height: 50, flexDirection: "row", alignItems: "center"}}
                onPress={() => Actions.createProtocolScreen({
                    onFinish: this.getData,
                    isNew: true,
                    plant: this.props.plant,
                    area: this.props.area
                })}
            >
                <Ionicons style={{padding: 10}}
                          size={30} name={"ios-add-circle"}/>
                <Text style={{fontWeight: "bold", fontSize: 18}}>New protocol</Text>
            </TouchableOpacity>}
            data={this.state.protocols}
            renderItem={(item) => <TouchableOpacity
                style={{flex: 1, height: 50, flexDirection: "row", alignItems: "center"}}
                onPress={() => this._isFilled()?Actions.protocolFormScreen({
                    name: this.state.actObsName,
                    onFinish: this._submit,
                    protocol: item.item,
                    isNew: false,
                    plant: this.props.plant,
                    area: this.props.area
                }):alert("Title must have at least 3 characters")}
            >
                <Text style={{fontWeight: "bold", fontSize: 18}}>{item.item.name}</Text>
            </TouchableOpacity>}
            keyExtractor={item => JSON.stringify(item.id)}
        />;
    }

    on401() {
        alert("you must be logged in");
        Actions.loginRoot({type:"reset"});
    }


    onErr() {
        alert("Erreur");
    }

    onActionCreated() {
        this.props.onFinish();
        Actions.pop();
        Actions.pop()
    }
}