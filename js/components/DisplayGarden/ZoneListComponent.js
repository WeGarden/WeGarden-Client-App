import {Component,} from "react";
import {StyleSheet, View, Text, ListView, FlatList} from "react-native";
import PlantComponent from "./PlantComponent";
import React from "react";

const zones = [
    {key: '1',name: "zone1"},
    {key: '2',name: "zone2"},
    {key: '3',name:"zone3"},
    {key: '4',name:"zone4"},
    {key: '5',name:"zone5"},
    {key: '6',name:"zone6"},
    {key: '7',name:"zone7"},
];


export class ZoneListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }

    }

    componentDidMount() {
        this.setState({
            isLoading: false,
            //dataSource: ds.cloneWithRows(zones),
            dataSource: zones,
        })

        // return fetch('http://172.18.13.119:3000/activity/')
        //      .then((response) => response.json())
        //      .then((responseJson) => {
        //          let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        //          this.setState({
        //              isLoading: false,
        //              dataSource: ds.cloneWithRows(responseJson.organizers),
        //          }, function() {
        //              // do something with new state
        //          });
        //      })
        //      .catch((error) => {
        //          console.error(error);
        //      });
    }


    render() {
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                    <View style={{backgroundColor: "#495A80", borderRadius: 5, padding: 20}}>
                        <Text style={{color: 'white', textAlign: 'center'}}>Loading ...</Text>
                    </View>
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <View style={styles.titleContainer}>
                        <Text style={{fontSize:20,color:"white"}}>{this.props.name}</Text>
                    </View>
                    <FlatList
                        horizontal={true}
                        data={this.state.dataSource}
                        renderItem={this._rowRender}
                        style={{ backgroundColor: "#f2f2f2"}}

                    />
                </View>
            );
        }
    }

    _rowRender(rowData) {
        return<PlantComponent
                name={rowData.title}
                category={rowData.category}
                place={rowData.place}
                date={rowData.date}
            />;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: "#2f862f",
        marginVertical: 5,
       // borderWidth: 1,
       // borderColor: "#1b4a19",
        height:300,
        justifyContent: 'center',
    },
    titleContainer:{
        padding: 10,
        backgroundColor: "#406442",
    }
});
