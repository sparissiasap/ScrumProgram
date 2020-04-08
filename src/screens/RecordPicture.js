import React, { Component } from 'react';
import { View, Text } from 'react-native';
import * as RootNavigation from '../../RootNavigation';
import MyCam from '../components/MyCam';
import { styles as styles } from '../style/styles';

export default class RecordPicture extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.logo}>HeyAPP</Text>
                <MyCam />
            </View>
        );
    }
}