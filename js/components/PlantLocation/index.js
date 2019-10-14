import React from 'react';
import {
    Dimensions,
    Alert,
    SafeAreaView,
    KeyboardAvoidingView,
    Text,
    View,
    TextInput,
    TouchableOpacity
} from 'react-native';
import {MapView} from "expo";
import ApiCalls from "../../utils/ApiCalls";
import {Actions} from "react-native-router-flux";


export default class PlantLocationScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            polygon: [],
            plantLocation:null,
            isDrawing: true,
            isSubmitable: false,
        };
        this._setGardenName = this._setGardenName.bind(this);
        this._addPointToPolygon = this._addPointToPolygon.bind(this);
        this._popLastPoint = this._popLastPoint.bind(this);
        this._setMapType = this._setMapType.bind(this);
        this._isFilled = this._isFilled.bind(this);
        this._submit = this._submit.bind(this);
        this.onPlantCreated = this.onPlantCreated.bind(this);
        this._onMapLoad = this._onMapLoad.bind(this);
    }

    _setMapType() {
        this.setState((prevState) => ({isSatellite: !prevState.isSatellite}))
    }

    _setGardenName(title) {
        this.setState({actObsName: title})
    }

    _addPointToPolygon(event) {
        this.setState(prevState => ({polygon: [...prevState.polygon, event.coordinate]}))
    }

    _popLastPoint() {
        if (!this.state.isDrawing)
            this.setState({isDrawing: true});
        else
            this.setState(prevState => ({polygon: prevState.polygon.slice(0, -1)}))
    }

    _isFilled() {
        return !this.state.isDrawing && ((this.state.actObsName && this.state.actObsName.length > 3)|| this.state.plantLocation);
    }


    _setPlantLocation(event) {
        this.setState({plantLocation: event.coordinate, isDrawing:false})
    }

    _onMapLoad(){
        let coordinates = this.props.area.coordList;
        this.refs.map.fitToCoordinates(coordinates) //{coordinates:this.props.path});
    }

    render() {
        return <SafeAreaView style={{flex: 1, backgroundColor:"white"}}>
            <View style={{paddingHorizontal: 10}}>
                <TextInput
                    style={{height: 50, fontSize: 20}}
                    placeholder={"Plant's's name*"}
                    onChangeText={this._setGardenName}
                    showsScale={true}
                    value={this.props.plantName}
                />
            </View>

            <View style={{flexDirection: "row", height: 50, justifyContent: "space-evenly"}}>
                {this.state.polygon && this.state.polygon.length > 0 || this.state.plantLocation!=null ?
                    <TouchableOpacity
                        style={{flex: 1, borderTopWidth: 1, alignItems: "center", justifyContent: "center",}}
                        onPress={this._popLastPoint}>
                        <Text>Get back</Text>
                    </TouchableOpacity>
                    : <View style={{flex: 2, justifyContent: "center"}}>
                        <Text style={{fontSize: 18, textAlign: "center"}}>Tap on the map to set the plant's position</Text>
                    </View>}
                {this.state.isDrawing && this.state.polygon && this.state.polygon.length > 2 ?
                    <TouchableOpacity style={{
                        flex: 1,
                        alignItems: "center",
                        backgroundColor: "#00BB55",
                        justifyContent: "center",
                        borderTopWidth: 1,
                    }}
                                      onPress={() => this.setState({isDrawing: false})}>
                        <Text style={{color: "white"}}>Done</Text>
                    </TouchableOpacity>
                    : null}
            </View>
            <View style={{flexDirection: "row", height: 50, justifyContent: "space-evenly"}}>
                <TouchableOpacity style={{
                    flex: 2,
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    alignItems: "center",
                    justifyContent: "center",
                }}
                                  onPress={this._setMapType}>
                    <Text>Change map's type</Text>
                </TouchableOpacity>
            </View>
            <MapView
                ref={"map"}
                onLayout={this._onMapLoad}
                provider={"google"}
                style={{flex: 1}}
                mapType={this.state.isSatellite ? "satellite" : "standard"}
                onPress={(e) => this.state.isDrawing ? this._setPlantLocation(e.nativeEvent): null}
            >
                <MapView.Polygon
                    fillColor={"rgba(0,0,200,0.3)"}
                    coordinates={this.props.area.coordList}
                />
                {this.state.polygon &&
                this.state.polygon.length > 2 &&
                !this.state.isDrawing ?
                    <MapView.Polygon
                        fillColor={"rgba(0,200,0,0.8)"}
                        coordinates={this.state.polygon}
                    /> : this.state.polygon.length > 1 ?
                        <MapView.Polyline onPress={e => this._setPlantLocation(e.nativeEvent)}
                                          coordinates={this.state.polygon}/> : null}

                {(this.state.polygon.length && this.state.isDrawing > 0) || this.state.plantLocation!=null?
                    <MapView.Marker coordinate={this.state.plantLocation||this.state.polygon[this.state.polygon.length - 1]}/> :
                    null}
            </MapView>

            <KeyboardAvoidingView behavior={"position"} style={{
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


    onPlantCreated() {
        alert("Plant created!");
        Actions.pop();
        Actions.pop({refresh:{area:this.props.area}});
    }

    on401() {
        alert("you must be logged in");
        Actions.loginRoot({type:"reset"});
    }


    onErr() {
        alert("Erreur");
    }

    _submit() {

            let data = {
                coord: this.state.plantLocation,
                species: this.props.species,
                family: this.props.family,
                image: this.props.image,
                name: this.props.plantName,

            };
            ApiCalls.createPlant(this.props.area.id,data,this.onPlantCreated,this.on401,this.onErr);
    }
}