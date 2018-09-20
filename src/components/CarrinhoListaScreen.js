
import React from 'react';
import { Text, View } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation';
import CarrinhoScreen from './CarrinhoScreen';
import ListaScreen from './ListaScreen';

export default createMaterialTopTabNavigator(
  {
      Lista: ListaScreen,
      Carrinho: CarrinhoScreen,
  },
  {
    tabBarOptions:
      {style: {
            elevation: 4,
            marginBottom: 6,
            backgroundColor: '#115e54',
          },
      }
  }

);
