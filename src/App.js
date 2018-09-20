import React, {Component} from 'react';
import{
  Text, View
} from 'react-native';
import {Provider} from 'react-redux';
import {CenaPrincipalStack} from './Rotas';
import ReduxThunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import reducers from './reducers';
import firebase from 'firebase';

class App extends Component {

componentWillMount(){
  let config = {
    apiKey: "AIzaSyA6nZQC2AR_aABDSyuYK7p2Nuac8vDBvxo",
    authDomain: "quick-mart-1c643.firebaseapp.com",
    databaseURL: "https://quick-mart-1c643.firebaseio.com",
    projectId: "quick-mart-1c643",
    storageBucket: "",
    messagingSenderId: "503526715957"
  };

  firebase.initializeApp(config);
  console.log('funfou');
}

  render(){
    return(
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <CenaPrincipalStack/>
      </Provider>
    );
  }
}

export default App;
