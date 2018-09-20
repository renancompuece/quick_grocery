import{
  LIMPA_DADOS_ITEM,
  MODIFICA_DESCRICAO_ITEM,
  MODIFICA_CATEGORIA_ITEM,
  MODIFICA_MARCA_ITEM,
  MODIFICA_QUANTIDADE_ITEM,
  MODIFICA_PESO_ITEM,
  MODIFICA_VALOR_ITEM,
  MEDIDA_ITEM_PESO,
  MEDIDA_ITEM_QUANTIDADE,
  MOSTRA_ITEM,
  ADICIONA_ITEM_NA_COMPRA
} from '../actions/types';

const INITIAL_STATE = {
  uid: '',
  descricaoItem: '',
  marcaItem: '',
  quantidadeItem: '',
  pesoItem: '',
  valorItem: '',
  categoriaItem: '',
  medida_item_peso: false,
  mostra_item: false
}

export default (state=INITIAL_STATE, action) => {
  console.log('item reducer', action);

  switch(action.type){
      case (LIMPA_DADOS_ITEM): {
        return({...state, INITIAL_STATE})
      }
      case MODIFICA_DESCRICAO_ITEM:
          return({...state, descricaoItem: action.payload})
      case MODIFICA_MARCA_ITEM:
          return({...state, marcaItem: action.payload})
      case MODIFICA_QUANTIDADE_ITEM:
          return({...state, quantidadeItem: action.payload})
      case MODIFICA_PESO_ITEM:
          return({...state, pesoItem: action.payload})
      case MODIFICA_VALOR_ITEM:
          return({...state, valorItem: action.payload})
      case MEDIDA_ITEM_PESO:
          return({...state, medida_item_peso: true, quantidadeItem: ''})
      case MEDIDA_ITEM_QUANTIDADE:
          return({...state, medida_item_peso: false, pesoItem: ''})
      case MODIFICA_CATEGORIA_ITEM:
          return({...state, categoriaItem: action.payload})
      case MOSTRA_ITEM:{
          state = action.payload;
          return {...state, mostra_item: true};
      }
      case ADICIONA_ITEM_NA_COMPRA: {
        return {...state, mostra_item: false}
      }

      default:
          return state;
  }

}
