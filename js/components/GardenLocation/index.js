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


export default class GardenLocation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            actObsName: props.actObsName,
            polygon: [],
            isDrawing: true,
            isSubmitable: false,
            address:{}
        };
        this._setGardenName = this._setGardenName.bind(this);
        this._addPointToPolygon = this._addPointToPolygon.bind(this);
        this._popLastPoint = this._popLastPoint.bind(this);
        this._setMapType = this._setMapType.bind(this);
        this._isFilled = this._isFilled.bind(this);
        this._submit = this._submit.bind(this);
        this.onGardenCreated = this.onGardenCreated.bind(this);
    }

    async componentDidMount() {
        if (this.props.location) {
            let cities = await Expo.Location.reverseGeocodeAsync({
                longitude: this.props.location.coords.longitude,
                latitude: this.props.location.coords.latitude
            });
            let city = cities[0];
            this.setState({address:city,textLocation: city.city + " - " + city.postalCode + " - " + city.isoCountryCode})
            //alert(JSON.stringify(city))
        }
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
        return !this.state.isDrawing && this.state.actObsName && this.state.actObsName.length > 3;
    }




    render() {
        return <SafeAreaView style={{flex: 1, backgroundColor:"white"}}>
            <View style={{paddingHorizontal: 10}}>
                <TextInput
                    style={{height: 50, fontSize: 20}}
                    placeholder={"Garden's name*"}
                    onChangeText={this._setGardenName}
                    showsScale={true}
                    value={this.state.actObsName}
                />
            </View>

            <View style={{flexDirection: "row", height: 50, justifyContent: "space-evenly"}}>
                {this.state.polygon && this.state.polygon.length > 0 ?
                    <TouchableOpacity
                        style={{flex: 1, borderTopWidth: 1, alignItems: "center", justifyContent: "center",}}
                        onPress={this._popLastPoint}>
                        <Text>Get back</Text>
                    </TouchableOpacity>
                    : <View style={{flex: 2, justifyContent: "center"}}>
                        <Text style={{fontSize: 18, textAlign: "center"}}>Tap on the map to draw the garden's
                            perimeter</Text>
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
                provider={"google"}
                style={{flex: 1}}
                initialRegion={{
                    latitude: this.props.location.coords.latitude,
                    longitude: this.props.location.coords.longitude,
                    latitudeDelta: 0.0500,
                    longitudeDelta: 0.0200,
                }}
                mapType={this.state.isSatellite ? "satellite" : "standard"}
                onPress={(e) => this.state.isDrawing ? this._addPointToPolygon(e.nativeEvent) : null}
            >

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


    onGardenCreated() {
        alert("Garden created!");
        Actions.reset("rootTab",{})
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
                coordList: this.state.polygon,
                description: this.props.description,
                gardenType: this.props.gardenType,
                image: "",
                location: {
                    address: this.state.address.street,
                    city: this.state.address.city,
                    country: this.state.address.country,
                    latitude: this.props.location.coords.latitude,
                    longitude: this.props.location.coords.longitude
                },
                name: this.state.actObsName,
                private: this.props.isPrivate,

            };
            ApiCalls.createGarden(data,this.onGardenCreated,this.on401,this.onErr);
    }
}