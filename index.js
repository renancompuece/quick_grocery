import React, {Component} from 'react';
import { AppRegistry } from 'react-native';
import App from './src/App';
import {Telas, DrawerMenu} from './src/Rotas';

const quick_mart = props => (
  <App/>
);

AppRegistry.registerComponent('quick_mart', () => quick_mart);
