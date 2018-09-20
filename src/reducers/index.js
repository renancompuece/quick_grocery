import {combineReducers} from 'redux';
import CompraReducer from './CompraReducer';
import ItemReducer from './ItemReducer';
import CarrinhoItensReducer from './CarrinhoItensReducer';
import ListaItensReducer from './ListaItensReducer';

export default combineReducers({
  CompraReducer: CompraReducer,
  ItemReducer: ItemReducer,
  CarrinhoItensReducer: CarrinhoItensReducer,
  ListaItensReducer: ListaItensReducer,
});
