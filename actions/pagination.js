import {RECEIVE_PAGINATION_PRODUCTS_QUANTITY, RECEIVE_PAGINATION_PAGE_NUMBER} from './actionConstants';


export const recievePaginationProductsQuantity = (productsQuantity) => {
    return {
        type: RECEIVE_PAGINATION_PRODUCTS_QUANTITY,
        payload: {
            productsQuantity
        }
    }
}


export const recievePaginationPageNumber = (pageNumber) => {
    return {
        type: RECEIVE_PAGINATION_PAGE_NUMBER,
        payload: {
            pageNumber
        }
    }
}