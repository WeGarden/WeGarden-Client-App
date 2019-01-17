import React from 'react';
import {Drawer, LegacyTabs, Modal, Router, Scene, Tabs} from "react-native-router-flux";

import ListGarden from "../ListGarden";

import GardenLocation from "../GardenLocation";
import {Ionicons} from "@expo/vector-icons"
import MapListGarden from "../ListGarden/MapListGarden";
import DisplayGarden from "../DisplayGarden";
import {Text} from "react-native";
import CreateGarden from "../CreateGarden";

export default class GardenRooter extends React.Component {
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
                >
                    <Modal
                    >
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

                    />
                </Scene>
                <Modal icon={this.tabIcon}
                       iconName={"contact"}
                >
                    <Drawer
                        hideDrawerButton={false}
                    >
                        <Scene key="gardensList"
                               component={ListGarden}
                               title={"Gardens"}
                               hideNavBar={false}
                               initial
                        />
                    </Drawer>
                    <Scene key={"createGardenScreen2"}
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
            </Tabs>
        </Router>
    }

    tabIcon(props) {
        return <Ionicons textStyle={{color: props.focused ? "green" : "grey"}} color={props.focused ? "green" : "grey"}
                         size={30} name={"ios-" + props.iconName}/>;
    }
}