import {Component} from "react";
import React from "react";

import GardenRooter from "./js/components/ListGarden/router";
import {Drawer, Modal, Router, Scene, Tabs} from "react-native-router-flux";
import ListGarden from "./js/components/ListGarden";
import MapListGarden from "./js/components/ListGarden/MapListGarden";
import CreateGarden from "./js/components/CreateGarden";
import GardenLocation from "./js/components/GardenLocation";
import DisplayGarden from "./js/components/DisplayGarden";
import {Ionicons} from "@expo/vector-icons";
import OneZoneScreen from "./js/components/OneZoneScreen";
import CreateAreaScreen from "./js/components/CreateAreaScreen";
import OnePlantComponent from "./js/components/OneZoneScreen/OnePlantComponent";
import OnePlantScreen from "./js/components/OnePlant";

export default class App extends Component {

    render() {
        return <Router sceneStyle={{backgroundColor: "white"}}>
            <Tabs
                showLabel={false}
                hideNavBar={true}
            >
                <Scene
                    icon={this.tabIcon}
                    iconName={"home"}
                    tabBarLabel={"Home"}
                    tabBarLabelStyle={{color: "green"}}
                    hideNavBar={true}
                    title={"Home"}
                >
                    <Modal>
                        <Scene
                            hideNavBar={false}
                            title={"Gardens"}
                            tabs={true} legacy={true} swipeEnabled={true}>
                            <Scene key="gardensList"
                                   component={ListGarden}
                                   title={"Gardens"}
                                   hideNavBar={true}
                                   initial
                            />
                            <Scene key="gardensListMap"
                                   icon={this.tabIcon}
                                   iconName={"map"}
                                   component={MapListGarden}
                                   title={"Gardens"}
                                   hideNavBar={true}
                            />

                        </Scene>

                        <Scene key={"createGardenScreen"}
                               hideNavBar={true}
                        >
                            <Scene key="createGardenScreen1"
                                   component={CreateGarden}
                                   direction={"vertical"}
                            />

                            <Scene key="createGardenScreen2"
                                   component={GardenLocation}
                            />
                        </Scene>

                    </Modal>

                    <Scene key={"oneGardenScreen"}
                           component={DisplayGarden}
                           hideNavBar={false}
                    />

                    <Scene key={"AreaScreen"} hideNavBar={false} navigationBarStyle={{backgroundColor: "#1c4c00"}}
                           titleStyle={{color: "white"}} component={OneZoneScreen}/>
                    <Scene key={"OnePlantScreen"} hideNavBar={false} navigationBarStyle={{backgroundColor: "green"}}
                           titleStyle={{color: "white"}} component={OnePlantScreen}/>
                    <Scene key={"CreateAreaScreen"} component={CreateAreaScreen}/>
                </Scene>
            </Tabs>
        </Router>
    }

    tabIcon(props) {
        return <Ionicons textStyle={{color: props.focused ? "green" : "grey"}} color={props.focused ? "green" : "grey"}
                         size={30} name={"ios-" + props.iconName}/>;
    }
}
