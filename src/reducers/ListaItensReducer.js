import {LISTA_ITENS_LISTA} from '../actions/types.js';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {

  switch(action.type){
    case LISTA_ITENS_LISTA: {
      return action.payload;
    }
    default:
      return state;
  }
}
