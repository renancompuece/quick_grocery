import {ToastAndroid} from 'react-native';

import {
  //types para limpar dados
  LIMPA_DADOS_ITEM,
  LIMPA_DADOS_COMPRA,
  //types abaixo são da COMPRA
  MODIFICA_ID_COMPRA,
  MODIFICA_NOME_COMPRA,
  MODIFICA_TIPO_COMPRA,
  MODIFICA_NOME_SUPERMERCADO,
  ADICIONA_ITEM_NA_COMPRA,
  MODIFICA_ITEM_NA_COMPRA,
  INCREMENTA_TOTAL_ITENS,
  LISTA_ITENS_COMPRA,
  MODIFICA_VALOR_TOTAL,
  //Types abaixo sao do item
  MOSTRA_ITEM,
  MEDIDA_ITEM_PESO,
  MEDIDA_ITEM_QUANTIDADE

} from './types';
import _ from 'lodash';
import firebase from 'firebase';

export const incrementaTotalITens = () => {
  return {
    type: INCREMENTA_TOTAL_ITENS
  }
}

export const modificaDescricaoCompra = (texto) => {
  return {
    type: MODIFICA_NOME_COMPRA,
    payload: texto
  }
}

export const modificaTipoCompra = (texto) => {
  return {
    type: MODIFICA_TIPO_COMPRA,
    payload: texto
  }
}

export const modificaNomeSupermercado = (texto) => {
  return {
    type: MODIFICA_NOME_SUPERMERCADO,
    payload: texto
  }
}

export const modificaValorTotal = (valor) => {

  return dispatch => {
    console.log('total que chega na action: ', valor)
    dispatch({
      type: MODIFICA_VALOR_TOTAL,
      payload: valor
    })
  }

}

export const cadastraCompra = (compra, navigation) => {

  return dispatch => {
    console.log(compra.tipoCompra);
    firebase.database().ref('/compra/')
        .push(compra)
        .then(res => {
            dispatch({type: MODIFICA_ID_COMPRA, payload: res.key})
            dispatch(buscaMaiorCarrinho(compra.tipoCompra, res.key));
        })
        .then(() => {
          ToastAndroid.show('Compra salva!', ToastAndroid.SHORT);
          navigation.navigate('Carrinho');
        })
  }

}

//só teste
 const buscaMaiorCarrinho = (tipoCompra, idCompra) => {
  return dispatch => {

    console.log('tipoCompra: ', tipoCompra );
    console.log('idCompra: ', idCompra );
    const firebaseRef = firebase.database().ref(`/carrinho_compra/tipo_compra_${tipoCompra}/`);

    firebaseRef.orderByChild('totalItens')
        .limitToLast(1)
        .once('value', snapshot => {
          if(snapshot.exists()){
              //recupera o nó com maior valor 'total de itens' e utiliza sua propriedade 'itens'
              console.log('valor do snap: ', snapshot.child("itens"));
              var key = Object.keys(snapshot.val())[0]
              var itensMaiorCarrinho = snapshot.val()[key].itens
              //tentar melhorar depois              
              for(var key in itensMaiorCarrinho){
                  itensMaiorCarrinho[key]['adicionado'] = false;
                  delete itensMaiorCarrinho[key].marcaItem;
                  delete itensMaiorCarrinho[key].pesoItem;
                  delete itensMaiorCarrinho[key].quantidadeItem;
                  delete itensMaiorCarrinho[key].uid;
                  delete itensMaiorCarrinho[key].valorItem;
              }

              firebase.database().ref(`/lista_compra/${idCompra}/`)
                .push(itensMaiorCarrinho)
                .then(() => {
                  dispatch({type: COMPRA_POSSUI_LISTA})
                })
          }
          else {
            console.log('não existe');
          }
        })
  }

}

export const modificaItemNaCompra = (item, idCompra, tipoCompra) => {
  return dispatch => {
    firebase.database().ref(`/carrinho_compra/tipo_compra_${tipoCompra}/${idCompra}/itens/${item.uid}`)
        .update(item)
        .then(() => {
          ToastAndroid.show('Item Alterado !', ToastAndroid.LONG);
          navigation.navigate('Carrinho');
        })
  }
}

export const adicionaItemNaCompra = (item, idCompra, tipoCompra, totalItens, navigation) => {
  console.log('total de itens: ', totalItens);
  return dispatch => {
        const firebaseRef = firebase.database().ref(`/carrinho_compra/tipo_compra_${tipoCompra}/${idCompra}/`);
        const totalIncrementado = totalItens + 1;

        firebaseRef.child("itens")
          .push(item)
          .then(() => {
            console.log('total incrementado: ', totalIncrementado);
            firebaseRef.update({totalItens: totalIncrementado});
            ToastAndroid.show('Item Adicionado na lista !', ToastAndroid.LONG);
            navigation.navigate('Carrinho');
          })
          .then(() => {
            dispatch({type: INCREMENTA_TOTAL_ITENS, payload: totalIncrementado})
          })
  }

}

export const itensCompraFetch = (idCompra, tipoCompra) => {
  return dispatch => {
    firebase.database().ref(`carrinho_compra/tipo_compra_${tipoCompra}/${idCompra}/itens`)
        .on("value", snapshot => {
          dispatch ({type: LISTA_ITENS_COMPRA, payload: snapshot.val()})
        })
  }
}

export const mostraItem = (item, navigation) => {

  return dispatch => {

    dispatch({type: MOSTRA_ITEM, payload: item});
    if(item.pesoItem === ''){
      dispatch({type: MEDIDA_ITEM_QUANTIDADE});
    }
    else {
      dispatch({type: MEDIDA_ITEM_PESO});
    }

    navigation.navigate('Item');
  }

}

export const atualizaCompra = (idCompra, item) => {
  console.log('o que chega em atualizaCompra()',  item);
  return dispatch => {
    firebase.database().ref(`/compra/${idCompra}/`)
        .update(item)
  }
}

export const limpaDadosItem = () => {
  return {
    type: LIMPA_DADOS_ITEM
  }
}

export const limpaDadosCompra = () => {
  return {
    type: LIMPA_DADOS_COMPRA
  }
}
