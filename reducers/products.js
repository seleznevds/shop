import { RECEIVE_PRODUCTS, RECEIVE_PRODUCT_DETAIL } from '../actions/actionConstants';
import { getUniqueCollectionByProp } from '../lib/utils';




export default (state = {
    productsList: [],
    productsByPage:[],
    productsDetailList: []
}, action) => {
    switch (action.type) {

        case RECEIVE_PRODUCTS:
            let productsList = action.payload.products;
            return { ...state, productsList };

        case RECEIVE_PRODUCT_DETAIL:
            let productsDetailList = getUniqueCollectionByProp([...state.productsDetailList, action.payload.product], 'id');
            return { ...state, productsDetailList };



        default:
            return state
    }
}