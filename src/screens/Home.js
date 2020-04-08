import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as RootNavigation from '../../RootNavigation';
import { styles as styles } from '../style/styles';

export default class Home extends Component {
  goToVideo = () => {
    RootNavigation.navigate('Video', { userName: '' });
  }

  goToAudio = () => {
    RootNavigation.navigate('Audio', { userName: '' });
  }

  goToPicture = () => {
    RootNavigation.navigate('Picture', { userName: '' });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>HeyAPP</Text>
        <TouchableOpacity style={styles.loginBtn} onPress={this.goToPicture}>
          <Text style={styles.loginText}>TAKE A PICTURE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn} onPress={this.goToAudio}>
          <Text style={styles.loginText}>RECORD AN AUDIO</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn} onPress={this.goToVideo}>
          <Text style={styles.loginText}>RECORD A VIDEO</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
