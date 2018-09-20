import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {StackNavigator, DrawerNavigator, DrawerActions} from 'react-navigation';
import CenaPrincipalScreen from './components/CenaPrincipalScreen';
import SupermercadoScreen from './components/SupermercadoScreen';
import CompraScreen from './components/CompraScreen';
import CarrinhoScreen from './components/CarrinhoScreen';
import CarrinhoListaScreen from './components/CarrinhoListaScreen';
import ItemScreen from './components/ItemScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const CenaPrincipalStack = StackNavigator(
  {

      CenaPrincipal: {
        screen: CenaPrincipalScreen,
        navigationOptions: ({navigation}) => ({
          title: 'Inicio',
          headerLeft:
          <TouchableOpacity
              style={{marginLeft: 10}}
              onPress={() => navigation.openDrawer()}>
              <Icon  name="menu" size={35} />
          </TouchableOpacity>

        })
      },

      Compra: {
        screen: CompraScreen,
        navigationOptions:{
          title: 'Nova Compra'
        }
      },

      Supermercado: {
        screen: SupermercadoScreen,
        navigationOptions: {
          title: 'Novo Supermercado'
        }
      },

      CarrinhoLista: {
        screen: CarrinhoListaScreen,
        navigationOptions: {
          title: 'Nova Compra'
        }
      },

      Carrinho: {
        screen: CarrinhoScreen,
        navigationOptions: {
          title: 'Carrinho'
        }
      },

      Item: {
        screen: ItemScreen,
        navigationOptions: {
          title: 'Novo Item'
        }
      }
    },

    {
        initialRouteName: 'Compra'
    }
);

export const NovaListaStack = StackNavigator(
  {
    NovaLista:
    {
      screen: CompraScreen,
      navigationOptions:
      {
        title: 'Nova Compra'
      }
    }
  }
);

export const DrawerMenu = DrawerNavigator(
  {
    CenaPrincipal: {
      screen: CenaPrincipalStack,
      navigationOptions: {
        drawerLabel: 'Início',
        drawerIcon: <Icon name="home" size={20}/>

      }

    },

    Supermercado: {
      screen: SupermercadoScreen,
      navigationOptions: {
        drawerLabel: 'Novo Supermercado',
        drawerIcon: <Icon name="store" size={20}/>
      }
    },



  }
);
