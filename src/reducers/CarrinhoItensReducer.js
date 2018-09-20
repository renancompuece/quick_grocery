import {LISTA_ITENS_COMPRA} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {

  switch(action.type){

    case LISTA_ITENS_COMPRA:{
      console.log('itens da lista 1:', action)
      return action.payload
    }

    default :
      return state
  }

}
