import {RECEIVE_PAGINATION_PRODUCTS_QUANTITY, RECEIVE_PAGINATION_PAGE_NUMBER} from '../actions/actionConstants';
export default (state = {
    pagesQuantity: 1,
    currentPage:1
}, action) => {
    switch(action.type){
        case RECEIVE_PAGINATION_PRODUCTS_QUANTITY:
            let pagesQuantity = action.payload.productsQuantity ? Math.ceil(action.payload.productsQuantity / 10) : 1;
            return {
                ...state,
                pagesQuantity
            };
        case RECEIVE_PAGINATION_PAGE_NUMBER:
                return {
                    ...state,
                    currentPage: action.payload.pageNumber > 0 ? action.payload.pageNumber : 1
                };
        default:
            return state;    
    }
}