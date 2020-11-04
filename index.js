/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import App from './src/App';
import {name as appName} from './app.json';
import {UserContextProvider} from './src/context/UserContext';
import 'react-native-gesture-handler';

export default function Main() {
  return (
    <UserContextProvider>
      <PaperProvider>
        <App />
      </PaperProvider>
    </UserContextProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
