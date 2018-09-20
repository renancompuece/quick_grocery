import{
  MODIFICA_DESCRICAO_ITEM,
  MODIFICA_MARCA_ITEM,
  MODIFICA_QUANTIDADE_ITEM,
  MODIFICA_PESO_ITEM,
  MODIFICA_CATEGORIA_ITEM,
  MODIFICA_VALOR_ITEM,
  MEDIDA_ITEM_PESO,
  MEDIDA_ITEM_QUANTIDADE,
  MOSTRA_ITEM
} from './types';

export const modificaDescricaoItem = (texto) => {
  return {
    type: MODIFICA_DESCRICAO_ITEM,
    payload: texto
  }
}

export const modificaMarcaItem = (texto) => {
  return {
    type: MODIFICA_MARCA_ITEM,
    payload: texto
  }
}
export const modificaQuantidadeItem = (texto) => {
  return {
    type: MODIFICA_QUANTIDADE_ITEM,
    payload: texto
  }
}

export const modificaPesoItem = (texto) => {
  return {
    type: MODIFICA_PESO_ITEM,
    payload: texto
  }
}

export const modificaCategoriaItem = (texto) => {
    return dispatch => {

      if(texto === 'CP' || texto === 'FV'){

        dispatch({type: MEDIDA_ITEM_PESO})
      }
      else {
        dispatch({type: MEDIDA_ITEM_QUANTIDADE})
      }

    dispatch({
      type: MODIFICA_CATEGORIA_ITEM,
      payload: texto
    })
  }
}

export const modificaValorItem = (texto) => {
  return {
    type: MODIFICA_VALOR_ITEM,
    payload: texto
  }
}
