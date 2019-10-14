import React from 'react';
import {
    Platform,
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


export default class CreateAreaScreen extends React.Component {

    constructor() {
        super();
        this.state = {
            zoneTitle: "",
            polygon: [],
            isDrawing: true,
            isSubmitable: false,
        };
        this._setTitle = this._setTitle.bind(this);
        this._addPointToPolygon = this._addPointToPolygon.bind(this);
        this._popLastPoint = this._popLastPoint.bind(this);
        this._setMapType = this._setMapType.bind(this);
        this._isFilled = this._isFilled.bind(this);
        this._onMapLoad = this._onMapLoad.bind(this);
        this._submit = this._submit.bind(this);
        this.onAreaCreated = this.onAreaCreated.bind(this);
    }

    _setMapType() {
        this.setState((prevState) => ({isSatellite: !prevState.isSatellite}))
    }

    _setTitle(title) {
        this.setState({zoneTitle: title})
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
        return !this.state.isDrawing && this.state.zoneTitle && this.state.zoneTitle.length > 3;
    }

    _onMapLoad(){
        let coordinates = this.props.garden.coordList;
        this.refs.map.fitToCoordinates(coordinates) //{coordinates:this.props.path});
    }

    render() {
        return <SafeAreaView style={{flex: 1, backgroundColor:"white"}}>
            <View style={{paddingHorizontal: 10}}>
                <TextInput
                    style={{height: 50, fontSize: 20}}
                    placeholder={"Area's name*"}
                    onChangeText={this._setTitle}
                    showsScale={true}
                />
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
            <View style={{flexDirection: "row", height: 50, justifyContent: "space-evenly"}}>
                {this.state.polygon && this.state.polygon.length > 0 ?
                    <TouchableOpacity
                        style={{flex: 1, borderBottomWidth: 1, alignItems: "center", justifyContent: "center",}}
                        onPress={this._popLastPoint}>
                        <Text>Get back</Text>
                    </TouchableOpacity>
                    : <View style={{flex: 2, justifyContent: "center"}}>
                        <Text style={{fontSize: 18, textAlign: "center"}}>Tap on the map to draw the area's
                            perimeter</Text>
                    </View>}
                {this.state.isDrawing && this.state.polygon && this.state.polygon.length > 2 ?
                    <TouchableOpacity style={{
                        flex: 1,
                        alignItems: "center",
                        backgroundColor: "#00BB55",
                        justifyContent: "center",
                    }}
                                      onPress={() => this.setState({isDrawing: false})}>
                        <Text style={{color: "white"}}>Done</Text>
                    </TouchableOpacity>
                    : null}
            </View>
            <MapView
                ref={"map"}
                provider={"google"}
                style={{flex:1}}
                mapPadding={{
                    top: 10,
                    right: 10,
                    bottom: 10,
                    left: 10
                }}
                onLayout={this._onMapLoad}
                mapType={this.state.isSatellite ? "satellite" : "standard"}
                onPress={(e) => this.state.isDrawing ? this._addPointToPolygon(e.nativeEvent) : null}
            >
                <MapView.Polygon
                    fillColor={"rgba(0,0,200,0.3)"}
                    coordinates={this.props.garden.coordList}
                />

                {this.state.polygon &&
                this.state.polygon.length > 2 &&
                !this.state.isDrawing ?
                    <MapView.Polygon
                        fillColor={"rgba(0,200,0,0.8)"}
                        coordinates={this.state.polygon}
                    /> : this.state.polygon.length > 1 ?
                        <MapView.Polyline onPress={e => this._addPointToPolygon(e.nativeEvent)}
                                          coordinates={this.state.polygon}/> : null}

                {this.state.polygon.length && this.state.isDrawing > 0 ?
                    <MapView.Marker coordinate={this.state.polygon[this.state.polygon.length - 1]}/> :
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

    onAreaCreated() {
        alert("Area created!");
        Actions.pop({refresh:{garden:this.props.garden}});
        //this.props.onFinish();
    }

    onErr(){
        alert("Error")
    }

    _submit() {
        let data = {
            coordList: this.state.polygon,
            gardenId: this.props.garden.id,
            id: 0,
            image: "",
            name:this.state.zoneTitle
        };
        ApiCalls.createArea(this.props.garden.id,data,this.onAreaCreated,this.on401,this.onErr);
    }
}