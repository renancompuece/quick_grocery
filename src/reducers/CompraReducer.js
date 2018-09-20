import {
  LIMPA_DADOS_COMPRA,
  MODIFICA_NOME_COMPRA,
  MODIFICA_ID_COMPRA,
  MODIFICA_TIPO_COMPRA,
  INCREMENTA_TOTAL_ITENS,
  MODIFICA_NOME_SUPERMERCADO,
  MODIFICA_VALOR_TOTAL,
  ADICIONA_ITEM_NA_COMPRA,
  MODIFICA_ITEM_NA_COMPRA,
  LISTA_ITENS_COMPRA,
  MOSTRA_ITEM,
  COMPRA_POSSUI_LISTA
} from '../actions/types';

const INITIAL_STATE = {
  idCompra: '',
  descricaoCompra: '',
  tipoCompra: '',
  nomeSupermercado: '',
  totalItens: 0,
  itensCompra : [],
  itemExibido: '',
  valorTotal: 0.00,
  possui_lista: false
}


export default (state = INITIAL_STATE, action) => {

    console.log('o que chega no reducer da compra: ', action)
    switch(action.type){

        case (LIMPA_DADOS_COMPRA): {
          return {...state, INITIAL_STATE}
        }
        case (MODIFICA_ID_COMPRA) :{
          return {...state, idCompra: action.payload}
        }
        case(MODIFICA_NOME_COMPRA):
          return {...state, descricaoCompra: action.payload }

        case (MODIFICA_NOME_SUPERMERCADO):
          return {...state, nomeSupermercado: action.payload}

        case (MODIFICA_TIPO_COMPRA):
          return {...state, tipoCompra: action.payload}

        case (MODIFICA_ITEM_NA_COMPRA): {
          return {...state, itensCompra: action.payload}
        }

        case (LISTA_ITENS_COMPRA): {
          return {...state, itenscompra: action.payload}
        }
        //a cada inserção de item, o total de itens é atualizado no nó 'compra'
        case(INCREMENTA_TOTAL_ITENS): {
          return {...state, totalItens: action.payload}
        }

        case (MODIFICA_VALOR_TOTAL): {
          console.log('total que chega no reducer: ', action)
          return {...state, valorTotal: action.payload}
        }

        case(MOSTRA_ITEM): {
          return {...state, itemExibido: action.payload}
        }

        case(COMPRA_POSSUI_LISTA): {
          return {...state, possui_lista: true}
        }

        default:
          return state;
    }
}
