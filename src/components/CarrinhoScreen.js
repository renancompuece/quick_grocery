import React , {Component} from 'react';
import{
  View,
  SectionList,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image
} from 'react-native';
import { TextMask } from 'react-native-masked-text'
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Actions} from 'react-native-router-flux';
import {
  mostraItem,
  modificaValorTotal,
  itensCompraFetch,
  atualizaCompra,
  limpaDadosItem,
  limpaDadosCompra
} from '../actions/CompraActions';
import {connect} from 'react-redux';
import _ from 'lodash';

class CarrinhoScreen extends Component
{

  constructor(props){
    super(props);
    this.valorTotal = 0.00;
  }

  componentWillMount(){

    this.props.itensCompraFetch(this.props.idCompra, this.props.tipoCompra);
  }

  _finalizaCompra(){

    this._limpaDados();
    navigation.navigate('Compra');
  }

  _limpaDados(){
    this.props.limpaDadosCompra();
    this.props.limpaDadosItem();
  }

  renderImgCategoria(title){


    let imagem = '';

    switch(title){
      case 'Alimentação':
        imagem = require('../imgs/icon_alimentacao.png');
        break;
      case 'Higiene Pessoal e Limpeza':
        imagem = require('../imgs/icon_higiene.png');
        break;

      case 'Frutas e Verduras':
        imagem = require('../imgs/icon_frutas_vegetais.png');
        break;

      case 'Carnes e Proteínas':
        imagem = require('../imgs/icon_carnes_e_proteinas.png');
        break;

      case 'Frios':
        imagem = require('../imgs/icon_frios.png');
        break;

      default:
      break;

    }


    return (
      <Image source={imagem}/>
    );
  }

  renderCarrinho(){
    if(this.props.itensCompra.length === 0)
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Icon name="cart-off" size={30}/>
        </View>
      );

      return(
      <SectionList
          sections={this.dataSource(this.props.itensCompra)}
          renderItem={({item, index, section}) => this._renderItem({item, index, section})}
          renderSectionHeader={({section: {title}}) => this._renderSection({section: {title}})}
          keyExtractor={(item, index) => item + index}
      />);

  }


  dataSource(items){

      let total = 0.00;

      const categoriaAlimentacao = {title: 'Alimentação', data: [null]};
      const categoriaHigieneLimpeza = {title: 'Higiene Pessoal e Limpeza', data: [null]};
      const categoriaFrutasVerduras = {title: 'Frutas e Verduras', data: [null]};
      const categoriaCarnesProteinas = {title: 'Carnes e Proteínas', data: [null]};
      const categoriaFrios = {title: 'Frios', data: [null]};

      for(const value of items){
          total += value.valorItem;

          switch(value.categoriaItem){
            case "A": {
              if(categoriaAlimentacao.data[0] === null)
                categoriaAlimentacao.data[0] = value;
              else
                categoriaAlimentacao.data.push(value);
                break;

            }

            case "HL": {
              if(categoriaHigieneLimpeza.data[0] === null){
                categoriaHigieneLimpeza.data[0] = value;
              }
              else
                categoriaHigieneLimpeza.data.push(value);
                break;
            }


            case "FV": {
              if(categoriaFrutasVerduras.data[0] === null){
                categoriaFrutasVerduras.data[0] = value;
              }
              else
                categoriaFrutasVerduras.data.push(value);
                break;
            }

            case "CP": {
              if(categoriaCarnesProteinas.data[0] === null){
                categoriaCarnesProteinas.data[0] = value;
              }
              else
                categoriaCarnesProteinas.data.push(value);
                break;
            }

            case "F": {
              if(categoriaFrios.data[0] === null){
                categoriaFrios.data[0] = value;
              }
              else
                categoriaFrios.data.push(value);
                break;
            }


          }
      }


      this.valorTotal = total;

      const sectionList = [
        categoriaAlimentacao,
        categoriaHigieneLimpeza,
        categoriaFrutasVerduras,
        categoriaCarnesProteinas,
        categoriaFrios
      ];

      return sectionList;
  }

  _renderItem({item, index, section} ){

    if(item === null)
      return(
        <View style={{alignItems: 'center', justifyContent: 'center', margin:15, padding: 10, borderWidth: 1.5, borderRadius: 6}}>
            <Text style={{color: 'red'}}>Nenhum item </Text>
        </View>
      )
    return(
      <TouchableOpacity onPress={() => this.props.mostraItem(item, this.props.navigation)}>
          <View key={index} style={{margin:15, padding: 10, borderWidth: 1.5, borderRadius: 6}}>
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                  <View style={{flexDirection:'column'}}>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>Nome: {item.descricaoItem}</Text>
                    <Text>{item.marcaItem}</Text>
                  </View>
                <TextMask type={'money'} style={{fontSize: 15}} value={item.valorItem}/>
              </View>

              <View style={{flexDirection:'row', justifyContent:'center', marginTop: 10}}>
                <Text style={{fontSize: 15}}>Quantidade: {item.quantidadeItem}</Text>
              </View>
          </View>
      </TouchableOpacity>
    );
  }

_renderSection({section: {title}}){
  return (
    <View style={styles.viewHeader}>
        <Text style={{fontWeight: 'bold', fontSize: 20, color: '#ffff'}}>{title}</Text>
        {this.renderImgCategoria(title)}
    </View>

  );
}


  render()
  {
    return(
      <View style={{flex:1}}>

          <View style={{flex: 9}}>
              {this.renderCarrinho()}
              <ActionButton
                buttonColor="rgba(231,76,60,1)"
                onPress={() => this.props.navigation.navigate('Item')}/>
          </View>

            <View style={styles.viewBotao}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <TextMask type={'money'} style={{fontSize: 20, fontWeight: 'bold', fontColor: 'red'}} value={this.valorTotal}/>
                <Button
                  onPress = {()=> {this._finalizaCompra()}}
                  title="Finalizar"
                  color="#841584"/>
              </View>
            </View>

      </View>
    );
  }
}

const mapStateToProps = state => {

  const itensCompra = _.map(state.CarrinhoItensReducer, (val, uid) => {
      return {...val, uid}
  } )

  return (
    {
      idCompra: state.CompraReducer.idCompra,
      tipoCompra: state.CompraReducer.tipoCompra,
      itensCompra,
      descricaoCompra: state.CompraReducer.descricaoCompra,
    //  totalItens: state.CompraReducer.totalItens,
      nomeSupermercado: state.CompraReducer.nomeSupermercado,
      valorTotal: state.CompraReducer.valorTotal
    }
  );

}


const styles = StyleSheet.create(
  {
    viewHeader :{
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'center',
      backgroundColor: '#33AFFF'
    },

    viewItem: {

    },

    viewBotao: {

      paddingTop: 10,
      paddingHorizontal: 20,
      flex: 1,
      backgroundColor: '#33AFFF',
    }
  }
);


export default connect(mapStateToProps, {
  mostraItem,
  modificaValorTotal,
  itensCompraFetch,
  limpaDadosItem,
  limpaDadosCompra,
  atualizaCompra})(CarrinhoScreen)
