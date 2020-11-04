import axios from 'axios';

// Set default URL
export const API = axios.create({
  baseURL: 'http://192.168.43.13:5000/api/v1',
});

// Function set auth token
export const setAuthToken = (token) => {
  if (token) API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  else delete API.defaults.headers.common['Authorization'];
};

// Set image
export const image_url = 'http://192.168.43.13:5000/avatar/';
export const cover_url = 'http://192.168.43.13:5000/cover/';
