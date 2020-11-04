import React, {useState, useEffect, useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Router from './router';
import FlashMessage from 'react-native-flash-message';
import {API, setAuthToken} from './apiConfig';
import {UserContext} from './context/UserContext';
import AsyncStorage from '@react-native-community/async-storage';
import {getData} from './utils';

const getToken = getData('token');
if (getToken) setAuthToken(getToken);
console.log('Nilai data asyncStorage Home: ', getToken);

const App = () => {
  const [state, dispatch] = useContext(UserContext);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await API.get('/auth');

        dispatch({
          type: 'USER_LOADED',
          payload: res.data.data.user,
        });
      } catch (err) {
        dispatch({
          type: 'AUTH_ERROR',
        });
      }
    };

    loadUser();
  }, []);

  return (
    <>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
      <FlashMessage position="top" />
    </>
  );
};

export default App;
