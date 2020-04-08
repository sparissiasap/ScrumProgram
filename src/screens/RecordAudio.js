import React, { Component } from 'react';
import { View, Text } from 'react-native';
import * as RootNavigation from '../../RootNavigation';
import { styles as styles } from '../style/styles';
import AudioRecord from '../components/AudioRecord'

export default class RecordAudio extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>HeyAPP</Text>
        <AudioRecord />
      </View>
    );
  }
}
