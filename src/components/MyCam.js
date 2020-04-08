import React, { PureComponent } from 'react';
import { Text, TouchableOpacity, View, AsyncStorage } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { name as appName, imageurl as imageurl, CustomerLoggedID as CustomerLoggedID } from '../../app.json';
import CameraRoll from "@react-native-community/cameraroll";
import { styles as styles } from '../style/styles';
import axios from 'axios';
const moment = require('moment');
const RNFS = require('react-native-fs');

//move the attachment to app folder
const moveAttachment = async (filePath, newFilepath) => {
    return new Promise((resolve, reject) => {
        RNFS.moveFile(filePath, newFilepath)
            .then(() => {
                console.log('FILE MOVED', filePath, newFilepath);
                resolve(true);
            })
            .catch(error => {
                console.log('moveFile error', error);
                reject(error);
            });
    })
        .catch(err => {
            console.log('mkdir error', err);
            reject(err);
        });
};

export default class MyCam extends PureComponent {
    state = {
        cameraIsRecording: false,
        CustomerID: 0,
        photo: null,
        showMessage: false
    }

    componentDidMount() {
        this._retrieveData();
    }

    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem(CustomerLoggedID);
            if (value !== null) {
                // We have data!!
                this.setState({ CustomerID: parseInt(value) });
            }
        } catch (error) {
            // Error retrieving data
        }
    };

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
                    <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
                        <Text style={styles.loginText}> SNAP </Text>
                    </TouchableOpacity>
                </View>
                <View>
                    {!!this.state.showMessage && (
                        <Text style={styles.loginText}> Image uploaded </Text>
                    )}
                </View>
            </View>
        );
    }

    // ************************** Captur and Save Image *************************
    saveImage = async filePath => {
        try {
            // set new image name and filepath
            const newImageName = `${moment().format('DDMMYY_HHmmSSS')}.jpg`;
            const newFilepath = `${RNFS.DocumentDirectoryPath}/${appName}/Pictures/${newImageName}`;
            // move and save image to new filepath
            const imageMoved = await moveAttachment(filePath, newFilepath);
        } catch (error) {
            console.log(error);
        }
    };

    takePicture = async () => {
        if (this.camera) {
            const options = {
                quality: 0.5,
                base64: true,
                forceUpOrientation: true,
                fixOrientation: true,
            };

            const data = this.camera.takePictureAsync(options)
                .then(data => {
                    this.setState({ uri: data.uri });
                    CameraRoll.saveToCameraRoll(data.uri);
                    this.storePicture(data.base64);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    };

    storePicture(data) {
        const dataObj = JSON.stringify({
            CustomerID: this.state.CustomerID,
            ProfileImage: `data:image/png;base64,${data}`
        })
        if (this.state.uri != null) {
            axios.post(
                imageurl,
                dataObj, {
                headers: {
                    'Authorization': 'user=org3448&organizationId=3448&password=505BC82&apiKey=A79F516',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'asap_accesstoken': 'c821cba13b13468e52cb36f393fe04e6a4a90850'
                }
            })
                .then((responseData) => {
                    this.setState({ showMessage: true },
                        () => setTimeout(() => {
                            this.setState({ showMessage: false })
                        }, 5000))
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }
}
