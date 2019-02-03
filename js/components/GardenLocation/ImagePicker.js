import React from 'react';
import {Button, Image, Text, View} from 'react-native';
import { ImagePicker } from 'expo';

export default class ImagePickerComponent extends React.Component {
    state = {
        image: null,
    };

    render() {
        let { image } = this.state;

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Pick an image</Text>
                <Button
                    title="from camera roll"
                    onPress={this._pickImage}
                /><Button
                    title="from Camera"
                    onPress={this._takePicture}
                />
                {image &&
                <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            </View>
        );
    }

    async alertIfCameraPermissionDisabledAsync() {
        const {Permissions} = Expo;
        const {status} = await Expo.Permissions.getAsync(Expo.Permissions.CAMERA);
        if (status !== 'granted') {
            const {status} = await Expo.Permissions.askAsync(Expo.Permissions.CAMERA);
        }
    }

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });

        console.log(result);

        if (!result.cancelled) {
            this.setState({ image: result.uri });
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
            this.setState({ image: result.uri,});
        }
    };
}