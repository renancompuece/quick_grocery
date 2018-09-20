import React, {Component} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Modal,
  TouchableHighlight,
  Picker,
  Text} from 'react-native';
  import {StackNavigator} from 'react-navigation';


const btnLista = require('../imgs/botao_lista.png');

export default class CenaPrincipalScreen extends Component {
  
  render(){
    return(
      <View style={styles.viewPrincipal}>
        <View>
          <TouchableHighlight onPress = {() => this.props.navigation.navigate('NovaLista')}>
            <Image source={btnLista}/>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create(
  {
    viewPrincipal:
    {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },

    viewModal:
    {

    },

    viewDadosSuper: {
      marginTop: 20,
      flexDirection: 'column'
    },

    textoTopo: {
      fontSize: 20,
      fontWeight: 'bold'
    },

    viewTextoTopo: {
      marginTop: 30,
      flexDirection: 'row',
      justifyContent: 'center'
    },

    viewFechar: {
      marginTop: 30,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginLeft: 20,
      marginRight: 20
    },

    operacao: {
    marginTop: 10,
    marginBottom: 10
  }

  }
);
