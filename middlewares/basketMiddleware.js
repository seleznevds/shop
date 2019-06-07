import { ADD_TO_BASKET, RECEIVE_BASKET, REMOVE_FROM_BASKET, CHANGE_PRODUCT_QUANTITY, CREATE_ORDER } from '../actions/actionConstants';
import { recieveBasket, receiveOrder, showOrderError } from '../actions/basket';
import { loadingProcessStart, loadingProcessComplete } from '../actions/preloader';
import { basketApi } from '../lib/basket';

export default ({ dispatch }) => next => action => {

    next(action);

    switch (action.type) {
        case ADD_TO_BASKET:

            dispatch(loadingProcessStart({ resourceType: 'basket' }));

            basketApi.addProduct({
                product: action.payload.product
            }).then((basket) => {
                if (basket) {
                    dispatch(recieveBasket(basket));
                }
            }).catch((err) => {
                console.log(err);
            }).finally(() => {
                dispatch(loadingProcessComplete({ resourceType: 'basket' }));
            });
            return;


        case REMOVE_FROM_BASKET:

            dispatch(loadingProcessStart({ resourceType: 'basket' }));
            basketApi.removeProduct({
                productId: action.payload.productId
            }).then((basket) => {
                if (basket) {
                    dispatch(recieveBasket(basket));
                }
            }).catch((err) => {
                console.log(err);
            }).finally(() => {
                dispatch(loadingProcessComplete({ resourceType: 'basket' }));
            });;
            return;

        case CHANGE_PRODUCT_QUANTITY:
            dispatch(loadingProcessStart({ resourceType: 'basket' }));

            basketApi.changeProductQuantity({
                productId: action.payload.productId,
                quantity: action.payload.quantity
            }).then((basket) => {
                if (basket) {
                    dispatch(recieveBasket(basket));
                }
            }).catch((err) => {
                console.log(err);
            }).finally(() => {
                dispatch(loadingProcessComplete({ resourceType: 'basket' }));
            });;
            return;

        case CREATE_ORDER:

            dispatch(loadingProcessStart({ resourceType: 'basket' }));
            basketApi.createOrder().then((order) => {
                if (order) {
                    dispatch(receiveOrder(order));
                }
            }).catch((err) => {
                dispatch(showOrderError(err));
                console.log(err);
            }).finally(() => {
                dispatch(loadingProcessComplete({ resourceType: 'basket' }));
            });;
            return;
    }
};