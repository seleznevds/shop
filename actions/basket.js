import { RECEIVE_BASKET, REMOVE_FROM_BASKET,  ADD_TO_BASKET,
     RECEIVE_BASKET_EXTENDED, CHANGE_PRODUCT_QUANTITY, CREATE_ORDER,
      RECEIVE_ORDER, CREATE_ORDER_ERROR_OCCURED  } from './actionConstants'

export const recieveBasket = ({
    products,
    discountPercent,
    discountMoney
}) => {
    return {
        type: RECEIVE_BASKET,
        payload: {
            products,
            discountPercent,
            discountMoney
        }
    }
}

export const recieveBasketExtended= ({
    products,
    discountPercent,
    discountMoney,
    productsDetails
}) => {
    return {
        type: RECEIVE_BASKET_EXTENDED,
        payload: {
            products,
            discountPercent,
            discountMoney,
            productsDetails
        }
    }
}

export const addToBasket = (product) => {
    return {
        type: ADD_TO_BASKET,
        payload: {
            product
        }
    }
}

export const removeFromBasket = ({
    productId
}) => {
    return {
        type: REMOVE_FROM_BASKET,
        payload: {
            productId
        }
    }
}

export const changeProductQuantity = ({
    productId,
    quantity
}) => {
    if(quantity === 0){
        return removeFromBasket({productId});
    }
    
    return {
        type: CHANGE_PRODUCT_QUANTITY,
        payload: {
            productId,
            quantity
        }
    }
}


export const createOrder= () => {
       
    return {
        type: CREATE_ORDER
    }
}

export const receiveOrder = (order) => {
       
    return {
        type: RECEIVE_ORDER,
        payload: {
            order
        }
    }
}


export const showOrderError = (error) => {
       
    return {
        type: CREATE_ORDER_ERROR_OCCURED,
        payload: {
            error
        }
    }
}




