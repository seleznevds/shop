import { httpTransport } from './httpTransport'

export const basketApi = {
    get: ({headers = {},  withProductDetail}) => {
        return httpTransport({
           method: "get",
           url: "/api/basket",
           headers,
           data: {
               withProductDetail:withProductDetail || undefined
           }
        }).then((response) => {
            if(response.data  || response.data.status === 'success'){
                return response.data.basket;
            }
            return null;
        })
        .catch((err) => {            
            return null;
        });
    },   

    addProduct: ({product}) => {
        return httpTransport({
            method: "post",
            url: "/api/basket/add_product",
            data: {
                product
            }
        }).then((response) => {
            if(response.data  || response.data.status === 'success'){
                return response.data.basket;
            }
            return null;
        })
        .catch((e) => {
            console.log ('Error addProduct');
            return null;
        });           
    },

    removeProduct: ({productId}) => {
        return httpTransport({
            method: "post",
            url: "/api/basket/remove_product",
            data: {
                productId
            }
        }).then((response) => {
            if(response.data  || response.data.status === 'success'){
                return response.data.basket;
            }
            return null;
        })
        .catch((e) => {
            console.log ('Error addProduct');
            return null;
        });           
    },

    changeProductQuantity: ({
        productId,
        quantity
    }) => {
        return httpTransport({
            method: "post",
            url: "/api/basket/change_product_quantity",
            data: {
                productId,
                quantity
            }
        }).then((response) => {
            if(response.data  || response.data.status === 'success'){
                return response.data.basket;
            }
            return null;
        })
        .catch((e) => {
            console.log ('Error changeProductQuantity');
            return null;
        });     
    },

    createOrder: () => {
        return httpTransport({
            method: "post",
            url: "/api/order"
        }).then((response) => {
            if(response.data  || response.data.status === 'success'){
                return response.data.order;
            }
            throw({message: 'Незвестная ошибка'});
        })
        .catch((err) => {
            if(err.response && err.response.data){
                throw(err.response.data);
            }

            if(err.message){
                throw(err);
            }

            throw({message: 'Незвестная ошибка'});            
        });     
    }

};