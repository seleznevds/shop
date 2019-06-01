import { ADD_TO_BASKET, RECEIVE_BASKET, REMOVE_FROM_BASKET, CHANGE_PRODUCT_QUANTITY, CREATE_ORDER} from '../actions/actionConstants';
import { addToBasket, removeFromBasket, recieveBasket, receiveOrder} from '../actions/basket';
import { basketApi } from '../lib/basket';

export default ({ dispatch }) => next => action => {

    next(action);

    switch (action.type) {
        case ADD_TO_BASKET:
            basketApi.addProduct({
                product: action.payload.product
            }).then((basket) => {
                if (basket) {
                    dispatch(recieveBasket(basket));
                }
            }).catch((err) => {
                console.log(err);
            });
            return;

        case REMOVE_FROM_BASKET:
            basketApi.removeProduct({
                productId: action.payload.productId
            }).then((basket) => {
                if (basket) {
                    dispatch(recieveBasket(basket));
                }
            }).catch((err) => {
                console.log(err);
            });
            return;
        case CHANGE_PRODUCT_QUANTITY:
            basketApi.changeProductQuantity({
                productId: action.payload.productId,
                quantity: action.payload.quantity
            }).then((basket) => {
                if (basket) {
                    dispatch(recieveBasket(basket));
                }
            }).catch((err) => {
                console.log(err);
            });
            return;
        case CREATE_ORDER:
            basketApi.createOrder().then((order) => {
                if (order) {
                    dispatch(receiveOrder(order));
                    console.log(order);
                }
            }).catch((err) => {
                console.log(err);
            });
            return;
    }
};