import {REQUEST_PRODUCTS} from '../actions/actionConstants';
import {recieveProducts} from '../actions/products';
import {productsApi} from '../lib/products';

export default  ({ dispatch }) => next => action => {
    
    next(action);    

    if(action.type === REQUEST_PRODUCTS){
        productsApi.getList({
            offset: action.payload.offset,
            limit: action.payload.limit
        }).then((data) => {
            if(data){
                let {products, productsQuantity} = data;

                dispatch(recieveProducts({products}));
            }

            
        }).catch((err) => {
            console.log(err);
        });
    }
};