import React , {Component} from 'react';
import {Text, TextInput, Button, StyleSheet, View, TouchableOpacity , Picker, Alert} from 'react-native';
import { TextInputMask } from 'react-native-masked-text'
import {
  modificaDescricaoItem,
  modificaQuantidadeItem,
  modificaValorItem,
  modificaMarcaItem,
  modificaCategoriaItem,
  modificaPesoItem
} from '../actions/ItemActions';

import {
  incrementaTotalITens,
  adicionaItemNaCompra,
  modificaItemNaCompra,
  atualizaCompra
} from '../actions/CompraActions';
import {connect} from 'react-redux';

class ItemScreen extends Component {

  constructor(props) {
    super(props);
    this.valorMask = '';
  }

  renderQuantidadeOuPeso(){
    console.log('a medida é peso ?', this.props.medida_item_peso.toString());
    if(!this.props.medida_item_peso ){
      return(
        <View style={styles.viewCampos}>
          <Text style={{fontWeight: 'bold'}}>Quantidade:</Text>
          <TextInput
              value={this.props.quantidadeItem}
              onChangeText = {(texto) => this.props.modificaQuantidadeItem(texto)}
              placeholder='Digite a quantidade'
              keyboardType='numeric'/>
        </View>
      );
    }

    return(
      <View style={styles.viewCampos}>
        <Text style={{fontWeight: 'bold'}}> Peso (em gramas):</Text>
        <TextInput
            value={this.props.pesoItem}
            onChangeText = {(texto) => this.props.modificaPesoItem(texto)}
            placeholder='Ex: 1kg de carne = 1000'
            keyboardType='numeric'/>
      </View>
    );
  }

    validaCampos(){

      let camposValidos = true;
      const {descricaoItem, categoriaItem, marcaItem, quantidadeItem, pesoItem, valorItem} = this.props;

      if(descricaoItem.trim() === ""){
        Alert.alert('Atenção','Insira a descrição do item');
        camposValidos = false;
      }

      else if(categoriaItem.trim() === ""){
        Alert.alert('Atenção','Insira a categoria do item');
        camposValidos = false;
      }

      else if(marcaItem.trim() === "" ){
        Alert.alert('Atenção','Insira a marca do item');
        camposValidos = false;
      }


      else if(quantidadeItem.trim() === "" && !this.props.medida_item_peso){
        Alert.alert('Atenção','Insira a quantidade do item');
        camposValidos = false;
      }

      else if(pesoItem.trim() === "" && this.props.medida_item_peso){
        Alert.alert('Atenção','Insira a quantidade do item');
        camposValidos = false;
      }

      else if(valorItem === ""){
        Alert.alert('Atenção','Insira o valor do item');
        camposValidos = false;
      }

      return camposValidos;

    }

    _adicionaItemNaCompra(){

        if(this.validaCampos()){
          const item = {
              uid : this.props.uid,
              descricaoItem: this.props.descricaoItem,
              categoriaItem: this.props.categoriaItem,
              marcaItem: this.props.marcaItem,
              quantidadeItem: this.props.quantidadeItem,
              pesoItem: this.props.pesoItem,
              valorItem: this.props.valorItem,
          }

          this.props.adicionaItemNaCompra(item, this.props.idCompra, this.props.tipoCompra, this.props.totalItens, this.props.navigation);
          //this.props.atualizaCompra(this.props.idCompra, {totalItens: this.props.totalItens});

        }

    }

    _modificaItemNaCompra(){

      if(this.validaCampos()){
        const item = {
            uid : this.props.uid,
            descricaoItem: this.props.descricaoItem,
            categoriaItem: this.props.categoriaItem,
            marcaItem: this.props.marcaItem,
            quantidadeItem: this.props.quantidadeItem,
            pesoItem: this.props.pesoItem,
            valorItem: this.props.valorItem,
        }

        this.props.modificaItemNaCompra(item, this.props.idCompra, this.props.tipoCompra);
        this.props.navigation.navigate('Carrinho');
      }

    }

    renderBtnAcaoItem(){
      if(!this.props.mostra_item){
        return(
            <View style={{flexDirection:'row', justifyContent:'center',  margin: 20}}>
              <Button
                  style={{width:200}} title='Adicionar' color="red"
                  onPress = {() => this._adicionaItemNaCompra()}/>
            </View>
        );
      }

      return(
        <View style={{flexDirection:'row', justifyContent:'center',  margin: 20}}>
          <Button
              style={{width:200, borderRadius: 10}} title='Alterar' color="green"
              onPress = {() => this._modificaItemNaCompra()}/>
        </View>
      );
    }


  render()
  {

    return(

         <View style={{margin:15, borderWidth: 0.6}}>
              <View>
                    <View style={styles.viewCampos}>
                       <Text style={{fontWeight: 'bold'}}> Item: </Text>
                       <TextInput
                           value={this.props.descricaoItem}
                           onChangeText = {(texto) => this.props.modificaDescricaoItem(texto)}
                           placeholder='Ex: Arroz'/>
                     </View>

                    <View style={styles.viewCampos}>
                        <Text style={{fontWeight: 'bold'}} >Categoria:</Text>
                        <Picker
                            selectedValue = {this.props.categoriaItem}
                            onValueChange = {(texto) => this.props.modificaCategoriaItem(texto)}>
                            <Picker.Item label = "Selecione ..." value = "" />
                            <Picker.Item label = "Alimentação" value = "A" />
                            <Picker.Item label = "Higiene Pessoal e Limpeza" value = "HL" />
                            <Picker.Item label = "Frutas e Verduras" value = "FV" />
                            <Picker.Item label = "Carnes e Proteínas" value = "CP" />
                            <Picker.Item label = "Frios" value = "F" />
                        </Picker>

                     </View>

                     <View style={styles.viewCampos}>
                       <Text style={{fontWeight: 'bold'}}>Marca:</Text>
                       <TextInput
                           value={this.props.marcaItem}
                           onChangeText = {(texto) => this.props.modificaMarcaItem(texto)}
                           placeholder='Ex: Itambé'/>
                     </View>
                      {this.renderQuantidadeOuPeso()}

                     <View style={styles.viewCampos}>
                       <Text style={{fontWeight: 'bold'}}>Valor (R$):</Text>
                       <TextInputMask
                           options={{ unit: null }}
                           ref={ref => this.valorMask = ref }
                           type={'money'}
                           value={this.props.valorItem}
                           onChangeText ={() => this.props.modificaValorItem(this.valorMask.getRawValue()) }
                           placeholder='Digite o valor'/>
                     </View>
              </View>
              {this.renderBtnAcaoItem()}

          </View>

    );
  }
}

const mapStateToProps = state => (
  {
    idCompra: state.CompraReducer.idCompra,
    totalItens: state.CompraReducer.totalItens,
    tipoCompra: state.CompraReducer.tipoCompra,


    uid: state.ItemReducer.uid,
    descricaoItem: state.ItemReducer.descricaoItem,
    marcaItem: state.ItemReducer.marcaItem,
    valorItem: state.ItemReducer.valorItem,
    categoriaItem: state.ItemReducer.categoriaItem,
    quantidadeItem: state.ItemReducer.quantidadeItem,
    pesoItem: state.ItemReducer.pesoItem,

    medida_item_peso: state.ItemReducer.medida_item_peso,
    mostra_item: state.ItemReducer.mostra_item

  }
)



const styles = StyleSheet.create(
  {
      viewCampos: {
        flexDirection: 'column',
        margin: 10
      }
  }
);

export default connect(mapStateToProps, {
  modificaDescricaoItem,
  modificaQuantidadeItem,
  modificaPesoItem,
  modificaValorItem,
  modificaMarcaItem,
  modificaCategoriaItem,
  adicionaItemNaCompra,
  modificaItemNaCompra,
  atualizaCompra,
  incrementaTotalITens
})(ItemScreen)
