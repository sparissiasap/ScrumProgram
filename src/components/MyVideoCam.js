import React, { PureComponent } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { name as appName } from '../../app.json';
import CameraRoll from "@react-native-community/cameraroll";
import { styles as styles } from '../style/styles';

export default class MyVideoCam extends PureComponent {
    state = {
        cameraIsRecording: false,
        texto: 'Start Record'
    }

    render() {
        return (
            <View style={styles.containerCamera}>
                <RNCamera
                    ref={ref => { this.camera = ref; }}
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.on}
                    androidCameraPermissionOptions={{
                        title: 'Permission to use camera',
                        message: 'We need your permission to use your camera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    androidRecordAudioPermissionOptions={{
                        title: 'Permission to use audio recording',
                        message: 'We need your permission to use your audio',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    onGoogleVisionBarcodesDetected={({ barcodes }) => {
                        console.log(barcodes);
                    }}
                />
                <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={this.takeVideo.bind(this)} style={styles.capture}>
                        <Text style={styles.loginText}> Video </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    takeVideo = async () => {
        if (this.state.cameraIsRecording) {
            this.setState({ cameraIsRecording: false, texto: 'Start Record' });
            this.camera.stopRecording();
        }
        else {
            this.setState({ cameraIsRecording: true, texto: 'Stop Record' });
            const data = this.camera.recordAsync()
                .then(data => {
                    CameraRoll.saveToCameraRoll(data.uri);
                })
                .catch(err => {
                    console.error('capture video error', err);
                });
        }
    };
}
