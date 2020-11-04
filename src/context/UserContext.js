import React, {createContext, useReducer} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {storeData} from '../utils';

export const UserContext = createContext();

const initialState = {
  isLogin: false,
  user: null,
  loading: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      storeData('token', action.payload.token);
      return {
        ...state,
        isLogin: true,
        loading: false,
      };
    case 'USER_LOADED':
      return {
        ...state,
        isLogin: true,
        user: action.payload,
        loading: false,
      };
    case 'AUTH_ERROR':
    case 'LOGIN_FAIL':
      return {
        ...state,
        isLogin: false,
        user: null,
        loading: false,
      };
    case 'LOGOUT':
      AsyncStorage.removeItem('token');
      return {
        ...state,
        isLogin: false,
        user: null,
      };
    default:
      throw new Error();
  }
};

export const UserContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {props.children}
    </UserContext.Provider>
  );
};
