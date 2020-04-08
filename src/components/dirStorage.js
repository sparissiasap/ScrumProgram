import { Platform } from 'react-native';
const RNFS = require('react-native-fs');
import { name as appName } from '../../app.json';

export const dirHome = Platform.select({
    ios: `${RNFS.DocumentDirectoryPath}/${appName}`,
    android: `${RNFS.ExternalStorageDirectoryPath}/${appName}`
});

export const dirPicutures = `${dirHome}/Pictures`;
export const dirAudio = `${dirHome}/Audio`;