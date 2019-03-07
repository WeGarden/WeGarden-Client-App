import React, {Component} from 'react';
import {
    Alert,
    StyleSheet, Text, KeyboardAvoidingView, TextInput
    , CheckBox, Button, Picker, View, TouchableOpacity, PickerIOS, SafeAreaView
} from 'react-native';
import {Actions} from "react-native-router-flux";
import UserInput from "../Commun/UserInput";
import {Ionicons} from "@expo/vector-icons";
import {Location} from 'expo';
import ButtonSelect from "../Commun/ButtonSelect";
import ImagePickerComponent from "../Commun/ImagePicker";


export default class CreatePlantScreen extends Component {

    _getLocationAsync = async () => {
        let {status} = await Expo.Permissions.askAsync(Expo.Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                location: null,
            });
            return
        }

        let location = await Location.getCurrentPositionAsync({});
        this.setState({location});

    };
    _setImage(image){
        this.setState({image64:image})
    }

    constructor(props) {
        super(props);


        this.state = {
            plantName: '',
            species: '',
            family: '',
            coords: {},
            image64:null,
        };
        this.handlePress = this.handlePress.bind(this);
        this.onFinish = this.onFinish.bind(this);
        this._setImage = this._setImage.bind(this);
    }

    onCancelPress() {
        Alert.alert(
            'Create new plant',
            'Do you really want to close?',
            [
                {
                    text: 'Yes', onPress: () => {
                        Actions.pop();
                    }
                },
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            ],
            {cancelable: false}
        )
    };

    handlePress() {
        console.log(JSON.stringify(this.state));
        Actions.createPlantScreen2({
            onFinish: this.onFinish,
            family: this.state.family,
            species:this.state.species,
            plantName:this.state.plantName,
            area:this.props.area,
            image:this.state.image64
        });
    }

    onFinish() {
        this.props.onFinish();
    }
    on401() {
        alert("you must be logged in");
        Actions.loginRoot();
    }

    async componentDidMount() {
        if (this.props.location) {
            let cities = await Expo.Location.reverseGeocodeAsync({
                longitude: this.props.location.coords.longitude,
                latitude: this.props.location.coords.latitude
            });
            let city = cities[0];
            this.setState({textLocation: city.city + " - " + city.postalCode + " - " + city.isoCountryCode})
            //alert(JSON.stringify(city))
        }

    }

    render() {
        return (
            <SafeAreaView
                style={styles.container}
            >
                {null
                    //<KeyboardAvoidingView style={styles.container} behavior="padding" enabled={true}>}
                }
                <View style={{flex:1, flexDirection:"row", alignItems:"center"}}>
                    <Text style={styles.title}>New plant</Text>
                <Ionicons style={{position: "relative", top: 0, right: 0}} color="black"
                          onPress={this.onCancelPress}
                          name={"md-close"} size={40}/>
                </View>
                <View style={{flex: 1, alignItems:"center"}}>
                    <UserInput
                        source={"md-text"}
                        style={styles.input}
                        placeholder="Name"
                        autoCapitalize={'words'}
                        returnKeyType={'done'}
                        autoCorrect={false}
                        handler={(plantName) => this.setState({plantName})}
                        value={this.props.plantName}
                    />
                </View>

                <View style={{flex: 1, alignItems: "center"}}>
                    <UserInput
                        source={"md-text"}
                        style={styles.input}
                        placeholder="Specie"
                        returnKeyType={'done'}
                        autoCorrect={false}
                        handler={(specie) => this.setState({specie})}
                        value={this.props.specie}
                    />
                </View>

                <View style={{flex: 1, alignItems: "center"}}>
                    <UserInput
                        source={"md-text"}
                        style={styles.input}
                        placeholder="Family"
                        returnKeyType={'done'}
                        autoCorrect={false}
                        handler={(family) => this.setState({family})}
                        value={this.props.family}
                    />
                </View>

                <View style={{flex: 3, alignItems: "center"}}>
                    <View style={{
                        padding: 10,
                        height: 250,
                        flexDirection: "row",
                        alignItems: "center",
                        borderRadius: 20,
                        borderWidth: 1
                    }}>
                        <ImagePickerComponent setImage={this._setImage}/>
                    </View>
                </View>

                <View style={{flex: 1, justifyContent: "center"}}>
                    <TouchableOpacity style={styles.bouton}
                                      onPress={this.handlePress}
                    >
                        <Text style={{fontSize: 25, fontWeight: "bold", color: "white"}}>Next</Text>
                    </TouchableOpacity>
                </View>
                {null
                    //</KeyboardAvoidingView>
                }
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flex: 1,
        justifyContent: "space-between",
        paddingTop: 25,
    },
    input: {
        flex: 1,
    },
    title: {
        flex:1,
        marginBottom: 20,
        fontSize: 25,
        textAlign: 'center'
    },
    bouton: {
        backgroundColor: "green",
        flex: 0.5,
        justifyContent: "center",
        paddingHorizontal: 50,
        borderRadius: 30,
    }
});