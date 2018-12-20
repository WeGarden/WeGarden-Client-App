import React, {Component} from 'react';
import {
    Alert,
    StyleSheet, Text, KeyboardAvoidingView, FormLabel, TextInput
    , CheckBox, Button, Picker, View, TouchableOpacity, PickerIOS, SafeAreaView
} from 'react-native';
import {Actions} from "react-native-router-flux";
import UserInput from "../Commun/UserInput";
import {Ionicons} from "@expo/vector-icons/";
import {Location} from 'expo';
import ButtonSelect from "../Commun/ButtonSelect";


export default class CreateGarden extends Component {

    _getLocationAsync = async () => {
        let { status } = await Expo.Permissions.askAsync(Expo.Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                location:null,
            });
            return
        }

        let location = await Location.getCurrentPositionAsync({});
        this.setState({location});
    };

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
        this.onFinish = this.onFinish.bind(this);
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
        this.onActivityCreated();
    }

    onFinish(){
        this.props.onFinish();
    }

    async onActivityCreated() {
        await this._getLocationAsync();
        Actions.createGardenScreen2({onFinish:this.onFinish,location:this.state.location});
      //  Actions.pop();
    }

    on401() {
        alert("you must be logged in");
        Actions.loginRoot();
    }


    onErr() {
        alert("Erreur");
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
            <SafeAreaView style={{flex:1}}>
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled={true}>
                <Ionicons style={{position: "absolute", top: 0, right: 10}} color="black"
                          onPress={this.onCancelPress}
                          name={"md-close"} size={40}/>
                <Text style={styles.title}>New garden</Text>

                <View style={{flex: 1, alignItems:"center"}}>
                    <UserInput
                        source={"md-text"}
                        style={styles.input}
                        placeholder="Garden name"
                        autoCapitalize={'words'}
                        returnKeyType={'done'}
                        autoCorrect={false}
                        handler={(name) => this.setState({name})}
                        value={this.props.title}
                    />
                </View>

                <View style={{flex: 1, alignItems:"center"}}>
                    <UserInput
                        source={"md-text"}
                        style={styles.input}
                        placeholder="Description"
                        returnKeyType={'done'}
                        autoCorrect={false}
                        handler={(name) => this.setState({name})}
                        value={this.props.title}
                    />
                </View>

                <View style={{flex: 3, alignItems: "center"}}>
                    <View style={{
                        padding: 10,
                        height: 200,
                        flexDirection: "row",
                        alignItems: "center",
                        borderRadius: 20,
                        borderWidth: 1
                    }}>
                        <Text style={{flex: 1,}}>Garden type:</Text>
                        <Picker
                            style={{flex: 1}}
                            selectedValue={this.state.activity}
                            onValueChange={(lang) => this.setState({activity: lang})}>
                            <Picker.Item label="Closed" value={0}/>
                            <Picker.Item label="Opened" value={1}/>
                            <Picker.Item label="Other" value={2}/>
                        </Picker>
                    </View>
                </View>

                <View style={{flex: 1, justifyContent:"center"}}>
                    <ButtonSelect text={"Private"} checked={this.state.private} onPress={() => this.setState((state, props) => {
                        return {private: !state.private};
                    })} />
                </View>
                <View style={{flex: 1, justifyContent: "center"}}>
                    <TouchableOpacity style={styles.bouton}
                                      onPress={this.handlePress}
                    >
                        <Text style={{fontSize: 25, fontWeight: "bold", color: "white"}}>Next</Text>
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