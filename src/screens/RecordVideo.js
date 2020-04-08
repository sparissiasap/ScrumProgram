import React, { Component } from 'react';
import { View, Text } from 'react-native';
import * as RootNavigation from '../../RootNavigation';
import { styles as styles } from '../style/styles';
import MyVideoCam from '../components/MyVideoCam';

export default class RecordVideo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>HeyAPP</Text>
        <MyVideoCam />
      </View>
    );
  }
}
