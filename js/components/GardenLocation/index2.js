import React, {Component} from 'react';
import {
    Alert,
    StyleSheet, Text, KeyboardAvoidingView, FormLabel, TextInput
    , CheckBox, Button, Picker, View, TouchableOpacity, PickerIOS, SafeAreaView
} from 'react-native';
import {Actions} from "react-native-router-flux";
import UserInput from "../Commun/UserInput";
import {Ionicons} from "@expo/vector-icons/";

import ImagePickerComponent from "../Commun/ImagePicker";
import ButtonSelect from "../Commun/ButtonSelect";
import ApiCalls from "../../utils/ApiCalls";


export default class GardenLocation2 extends Component {
    constructor(props) {
        super(props);


        this.state = {
            title: props.title,
            place: '',
            time: props.time,
            private: false,
            activity: 1,
            location: props.location,
            textLocation: ''
        };
        this.handlePress = this.handlePress.bind(this);
    }


    onCancelPress() {
        Alert.alert(
            'Create new garden',
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
        let data = {
            coordList: this.state.coordList,
            description: this.props.description,
            gardenType: this.props.gardenType,
            image: data.image,
            location: {
                address: "string",
                city: "string",
                country: "string",
                latitude: 0,
                longitude: 0
            },
            name: data.name,
            private: data.private,
        };
        ApiCalls.createGarden(data,this.onPlantCreated,this.on401,this.onErr);
        this.onPlantCreated();
    }



    on401() {
        alert("you must be logged in");
        Actions.loginRoot();
    }


    onErr() {
        alert("Erreur");
    }

    async alertIfRemoteNotificationsDisabledAsync() {
        const {Permissions} = Expo;
        const {status} = await Expo.Permissions.getAsync(Expo.Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
            const {status} = await Expo.Permissions.askAsync(Expo.Permissions.CAMERA_ROLL);
        }
    }


    async componentDidMount() {
        this.alertIfRemoteNotificationsDisabledAsync();
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

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <KeyboardAvoidingView style={styles.container} behavior="padding" enabled={true}>
                    <Ionicons style={{position: "absolute", top: 0, right: 10}} color="black"
                              onPress={this.onCancelPress}
                              name={"md-close"} size={40}/>
                    <Text style={styles.title}>New garden</Text>

                    <View style={{flex: 1, alignItems: "center"}}>
                        <UserInput
                            source={"md-text"}
                            style={styles.input}
                            placeholder="Location"
                            autoCapitalize={'words'}
                            returnKeyType={'done'}
                            autoCorrect={false}
                            handler={(name) => this.setState({name})}
                            value={this.state.textLocation}
                        />
                    </View>

                    <View style={{flex: 1}}>
                        <Text style={{fontWeight: "bold", color: "green"}}>Garden plan</Text>
                        <Text style={{color: "green"}}>Please picture or pick from your device the plan of your
                            garden:</Text>
                    </View>

                    <View style={{flex: 3}}>
                        <ImagePickerComponent/>
                    </View>

                    <View style={{flex: 1}}>
                        <ButtonSelect text={"Private"} checked={this.state.private} onPress={() => this.setState((state, props) => {
                            return {private: !state.private};
                        })} />
                    </View>
                    <View style={{flex: 1, justifyContent: "center"}}>
                        <TouchableOpacity style={styles.bouton}
                                          onPress={this.handlePress}
                        >
                            <Text style={{fontSize: 25, fontWeight: "bold", color: "white"}}>Create</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flex: 1,
        justifyContent: "space-between",
        paddingHorizontal: 25,
    },
    input: {
        flex: 1,
    },
    title: {
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