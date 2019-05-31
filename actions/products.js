import {RECEIVE_PRODUCTS, REQUEST_PRODUCTS, RECEIVE_PRODUCT_DETAIL} from './actionConstants';


export const requestProducts = ({offset=0, limit=10} = {}) => {
    return {
        type: REQUEST_PRODUCTS,
        payload: {
            offset,
            limit
        }
    }
}

export const recieveProducts = ({ products = []} = {}) => {
    
    return {
        type: RECEIVE_PRODUCTS,
        payload: {
            products
        }
    }
}

export const recieveProductDetail = (product) => {
    
    return {
        type: RECEIVE_PRODUCT_DETAIL,
        payload: {
            product
        }
    }
}


