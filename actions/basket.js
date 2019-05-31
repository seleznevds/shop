import { RECEIVE_BASKET, REMOVE_FROM_BASKET,  ADD_TO_BASKET, RECEIVE_BASKET_EXTENDED } from './actionConstants'

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