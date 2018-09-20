import React,  {Component} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Modal,
  TouchableHighlight,
  Picker,
  Text,
  TextInput} from 'react-native';
  import {Actions} from 'react-native-router-flux';

export default class SupermercadoScreen extends Component {

  constructor(props)
  {
    super(props);
    this.state = {supermercado: '', localizacao: ''};
  }
  render()
  {
    return(
      <View style={styles.viewPrincipal}>

        <View>
          <View style={styles.viewSupermercado}>
            <Text style={{fontSize: 20}}>Supermercado: </Text>
            <TextInput
              style={{borderColor: 'gray'}}
              placeholder='nome do supermercado'
              onChangeText = {(supermercado) => {this.setState({supermercado: supermercado})}}
              value={this.state.supermercado}/>
          </View>

          <View style={styles.viewLocalizacao}>
            <Text style={{fontSize: 20}}>Localização: </Text>
            <TextInput
              placeholder='localização ou referência'
              onChangeText = {(localizacao) => {this.setState({localizacao: localizacao})}}
              value={this.state.localizacao}/>
          </View>

          <View style={{flexDirection:'row', justifyContent:'center', marginTop: 50}}>
            <TouchableHighlight onPress = {() => this.props.navigation.navigate('CenaPrincipal')}>
              <Text style={{fontSize: 25}}>
                Cadastrar
              </Text>
            </TouchableHighlight>
          </View>
        </View>

      </View>


    );
  }
}

const styles = StyleSheet.create(
  {
      viewPrincipal: {
        flex: 1,
        margin: 15

      },

      viewSupermercado: {
        flexDirection: 'column',
        justifyContent: 'center'
      },

      viewLocalizacao: {
        marginTop: 15,
        flexDirection: 'column',
        justifyContent: 'center'
      },

  }
);
