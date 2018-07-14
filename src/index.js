import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/root/App';
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Provider} from 'react-redux';
import store from './components/store';
import * as firebase from 'firebase';

const config = {
        apiKey: "AIzaSyAjaLnIEXbBwU3CQZ-Z4TcZJfCOo4Dlp0E",
        authDomain: "realtimeauction101010.firebaseapp.com",
        databaseURL: "https://realtimeauction101010.firebaseio.com",
        projectId: "realtimeauction101010",
        storageBucket: "gs://realtimeauction101010.appspot.com",
        messagingSenderId: "791550361009"
      };
      firebase.initializeApp(config);

ReactDOM.render(
<Provider store={store}>
        <MuiThemeProvider>
        <App />
        </MuiThemeProvider >
</Provider>
, document.getElementById('root'));
registerServiceWorker();
