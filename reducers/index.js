import { combineReducers } from 'redux';
import goods from './goods';
import basket from './basket';
import pagination from './pagination';


export default combineReducers({
    goods,
    basket,
    pagination
});