import { combineReducers } from 'redux';
import products from './products';
import basket from './basket';
import pagination from './pagination';


export default combineReducers({
    products,
    basket,
    pagination
});