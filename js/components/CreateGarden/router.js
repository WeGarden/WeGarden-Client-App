import React from 'react';
import {Drawer, LegacyTabs, Modal, Router, Scene, Tabs} from "react-native-router-flux";

import ListGarden from "../ListGarden";
import CreateGarden from "./index";
import GardenLocation from "../GardenLocation";
import {Ionicons} from "@expo/vector-icons"

export default class ActivityFeedRoot extends React.Component {
    render() {
        return <Router sceneStyle={{backgroundColor: "white"}}>
            <Tabs
                showLabel={false}
                hideNavBar={true}
            >
                <Modal icon={this.tabIcon}
                       iconName={"home"}
                       tabBarLabel={"Home"}
                       tabBarLabelStyle={{color: "green"}}
                       hideNavBar={false}
                        title={"Gardens"}
                >


                    <Scene tabs={true} legacy={true} swipeEnabled={true}>
                        <Scene key="gardensList"
                               component={ListGarden}
                               title={"Gardens"}
                               hideNavBar={true}
                               initial
                        />
                        <Scene key="gardensListMap"
                               icon={this.tabIcon}
                               iconName={"map"}
                                 component={GardenLocation}
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
                <Modal icon={this.tabIcon}
                       iconName={"contact"}
                >
                    <Drawer
                        hideDrawerButton={true}
                    >
                        <Scene key="gardensList"
                               component={ListGarden}
                               title={"Gardens"}
                               hideNavBar={false}
                               initial
                        />
                    </Drawer>
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
            </Tabs>
        </Router>
    }

    tabIcon(props) {
        return <Ionicons textStyle={{color: props.focused ? "green" : "grey"}} color={props.focused ? "green" : "grey"}
                         size={30} name={"ios-" + props.iconName}/>;
    }
}