import { RECEIVE_PRODUCTS, RECEIVE_PRODUCT_DETAIL, LOADING_PROCESS_START, LOADING_PROCESS_COMPLETE } from '../actions/actionConstants';
import { getUniqueCollectionByProp } from '../lib/utils';




export default (state = {
    productsList: [],
    productsByPage: [],
    productsDetailList: [], 
    loading: false
}, action) => {
    switch (action.type) {

        case RECEIVE_PRODUCTS:
            let productsList = action.payload.products;
            return { ...state, productsList };

        case RECEIVE_PRODUCT_DETAIL:
            let productsDetailList = getUniqueCollectionByProp([...state.productsDetailList, action.payload.product], 'id');
            return { ...state, productsDetailList };

        case LOADING_PROCESS_START:
            if (action.payload.resourceType === 'products') {
                return {
                    ...state,
                    loading: true
                }
            }
            return state;

        case LOADING_PROCESS_COMPLETE:
            if (action.payload.resourceType === 'products') {
                return {
                    ...state,
                    loading: false
                }
            }
            return state;


        default:
            return state
    }
}