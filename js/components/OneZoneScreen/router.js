import React, {Component} from "react";
import {Router, Scene} from "react-native-router-flux";
import OneZoneScreen from "./index";
import CreateAreaScreen from "../CreateAreaScreen";


export default class RouterS extends Component {

    render() {
        return <Router>
            <Scene key={"root"} modal={true} hideNavBar={true}>
                <Scene key={"AreaScreen"} hideNavBar={false} navigationBarStyle={{backgroundColor: "#1c4c00"}}
                       titleStyle={{color: "white"}} component={OneZoneScreen} initial/>
                <Scene key={"CreateAreaScreen"} component={CreateAreaScreen}/>

            </Scene>


        </Router>
    }

}