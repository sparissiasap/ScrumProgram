
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/screens/Login';
import Home from './src/screens/Home';
import { navigationRef } from './RootNavigation';
import RecordPicture from './src/screens/RecordPicture';
import RecordAudio from './src/screens/RecordAudio';
import RecordVideo from './src/screens/RecordVideo';

const Stack = createStackNavigator();

function App() {

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{ title: '                                 Login' }}/>
        <Stack.Screen name="Home" component={Home} options={{ title: '                     Overview' }} />
        <Stack.Screen name="Picture" component={RecordPicture} options={{ title: '                 Take a picture' }} />
        <Stack.Screen name="Audio" component={RecordAudio} options={{ title: '                 Record an audio' }} />
        <Stack.Screen name="Video" component={RecordVideo} options={{ title: '                 Record a video' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;