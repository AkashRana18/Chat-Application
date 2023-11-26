import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const config = {
  apiKey: 'AIzaSyCw64O9KRNHVGnNeD_d4beAwq3WyNKNhyA',
  authDomain: 'chat-app-e367c.firebaseapp.com',
  databaseURL: 'https://chat-app-e367c-default-rtdb.firebaseio.com',
  projectId: 'chat-app-e367c',
  storageBucket: 'chat-app-e367c.appspot.com',
  messagingSenderId: '890091113771',
  appId: '1:890091113771:web:4fee45a940494577ed496e',
};

const app = firebase.initializeApp(config);

export const auth = app.auth();
export const database = app.database();
export const storage = app.storage();
