import React from 'react';
import {Button, Image, ScrollView, Text, View} from 'react-native';
import { ImagePicker } from 'expo';

export default class ImagePickerComponent extends React.Component {
    state = {
        image: null,
    };

    render() {
        let { image } = this.state;

        return (
            <View style={{ flex: 1, flexDirection:"row",alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Pick an image</Text>
                <Button
                    title="from camera roll"
                    onPress={this._pickImage}
                /><Button
                    title="from Camera"
                    onPress={this._takePicture}
                />
                </View>

                {image &&
                    <Image source={{ uri: 'data:image/jpeg;base64,' +image }} style={{ width: 200, height: 200 }} />}
            </View>
        );
    }

    async alertIfCameraPermissionDisabledAsync() {
        const {Permissions} = Expo;
        let result1 = await Expo.Permissions.getAsync(Expo.Permissions.CAMERA);
        let result2 = await Expo.Permissions.getAsync(Expo.Permissions.CAMERA_ROLL);
        if (result1.status !== 'granted' && result2.status !== 'granted') {
            const {status} = await Expo.Permissions.askAsync(Expo.Permissions.CAMERA);
        }
    }

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            base64: true
        });

        if (!result.cancelled) {
            this.setState({ image: result.base64 });
            this.props.setImage(result.base64);
        }
    };

    _takePicture = async () => {
        await this.alertIfCameraPermissionDisabledAsync();
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            base64: true
        });

        if (!result.cancelled) {
            this.setState({ image: result.base64,});
            this.props.setImage(result.base64);
        }
    };
}