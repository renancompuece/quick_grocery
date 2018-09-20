import React, {Component} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Modal,
  TouchableHighlight,
  Picker,
  Text,
  TextInput,
  Button} from 'react-native';
import {
  modificaDescricaoCompra,
  modificaNomeSupermercado,
  modificaTipoCompra,
  cadastraCompra,
  buscaMaiorCarrinho
} from '../actions/CompraActions'
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';

class CompraScreen extends Component {

  toggleModalVisible(visible)
  {
    this.setState({modalVisible: visible});
  }

  exibeCarrinho(){
    const {descricaoCompra, tipoCompra, nomeSupermercado, totalItens} = this.props;
    this.props.cadastraCompra({descricaoCompra, tipoCompra, nomeSupermercado, totalItens}, this.props.navigation);
  }

  render()
  {
    return(
      <View style={styles.viewPrincipal}>

          <View style={{margin: 15, flex:9}}>

              <View style={styles.viewdescricaoCompra}>

                <Text style={{fontSize: 20}}>Compra :</Text>
                <TextInput
                  value = {this.props.descricaoCompra}
                  onChangeText = {(texto) => this.props.modificaDescricaoCompra(texto)}
                  placeholder = 'Ex: Mercantil do mês de Janeiro'/>

              </View>

              <View style={styles.viewDadosSuper}>
                  <View>
                      <Text style={{fontSize: 20}}>Tipo da Compra: </Text>
                  </View>
                  <View>
                      <Picker
                          style={styles.operacao}
                          selectedValue = {this.props.tipoCompra}
                          onValueChange = {(texto) => this.props.modificaTipoCompra(texto)}>
                          <Picker.Item label = "Selecione" value = "" />
                          <Picker.Item label = "Semanal" value = "1" />
                          <Picker.Item label = "Mensal" value = "2" />
                      </Picker>
                  </View>
              </View>

              <View style={styles.viewDadosSuper}>

                  <View>
                      <Text style={{fontSize: 20}}>Supermercado: </Text>
                  </View>
                  <View>
                      <Picker
                          style={styles.operacao}
                          selectedValue = {this.props.nomeSupermercado}
                          onValueChange = {(texto) => this.props.modificaNomeSupermercado(texto)}>
                          <Picker.Item label = "Compre Max" value = "compremax" />
                          <Picker.Item label = "Cometa" value = "cometa" />
                          <Picker.Item label = "Extra" value = "extra" />
                      </Picker>
                  </View>

              </View>

              <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 50}}>
                  <TouchableHighlight
                      onPress = {() => {this.props.navigation.navigate('Supermercado',{
                        descricaoCompra: this.props.descricaoCompra,
                        nomeSupermercado: this.props.nomeSupermercado
                      })}} >
                      <Text style={{fontSize: 25, textDecorationLine: 'underline'}}>Novo Supermercado</Text>
                  </TouchableHighlight>
              </View>



            </View>

            <View style={styles.viewBotao}>
                <Button
                  onPress ={() => {this.exibeCarrinho()} }
                  title="Prosseguir"
                  color="#841584"/>
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

    },

    viewBotao: {

      paddingTop: 10,
      paddingHorizontal: 20,
      flex: 1,
      backgroundColor: '#33AFFF',
    },

    viewBotao: {

      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      backgroundColor: '#33AFFF',
    },

    viewdescricaoCompra:
    {
      flexDirection: 'column',
      justifyContent: 'center'
    },

    viewDadosSuper: {
      marginTop: 20,
      flexDirection: 'column',
      justifyContent: 'center'
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

const mapStateToProps = state => (
  {
    descricaoCompra: state.CompraReducer.descricaoCompra,
    tipoCompra: state.CompraReducer.tipoCompra,
    totalItens: state.CompraReducer.totalItens,
    nomeSupermercado: state.CompraReducer.nomeSupermercado
  }
)

export default connect(
  mapStateToProps,{
    modificaDescricaoCompra,
    modificaNomeSupermercado,
    modificaTipoCompra,
    cadastraCompra,
    buscaMaiorCarrinho
  }
)(CompraScreen)
