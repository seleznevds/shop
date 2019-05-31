import { RECEIVE_PRODUCTS, RECEIVE_PRODUCT_DETAIL } from '../actions/actionConstants';
import { getUniqueCollectionByProp } from '../lib/utils';




export default (state = {
    productsPreviewList: [],
    productsDetailList: []
}, action) => {
    switch (action.type) {

        case RECEIVE_PRODUCTS:
            let productsPreviewList = getUniqueCollectionByProp([...state.productsPreviewList, ...action.payload.products], 'id');
            return { ...state, productsPreviewList };

        case RECEIVE_PRODUCT_DETAIL:
            let productsDetailList = getUniqueCollectionByProp([...state.productsDetailList, action.payload.product], 'id');
            return { ...state, productsDetailList };



        default:
            return state
    }
}