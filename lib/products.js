import { httpTransport } from './httpTransport';

export const productsApi = {
    getList: ({offset = 0, limit = 10,  headers = {}} = {}) => {
        
        return httpTransport({
            method: "get",
            url: "/api/products",
            data: {
                offset,
                limit
            },
            headers
        }).then((response) => {
            if(! response.data  || ! response.data.products){
                console.log (response.data, 'Error in  productsApi getList:no products');
                return null;
            }
            return response.data;
        })
        .catch((err) => {
            console.log (err, 'Error in  productsApi getList');
            return null;
        });
    },

    getId: ({productId, userId=null, headers = {}} = {}) => {
        let url = `/api/products/${productId}`;
        
        return httpTransport({
            method: "get",
            url,
            headers
        }).then((response) => {
            if(! response.data  || ! response.data.product){
                console.log ('Error in  productsApi getId:no products');
                return {};
            }
            return response.data.product;
        })
        .catch((error) => {
            console.log ('Error in  productsApi getId');
            throw(error);
        });
    },

    create:(data) => {
        let url = "/api/products/create";
        
        if(data.has('id')){
            url = "/api/products/edit";
        }
        
        
        return httpTransport({
            method: "post",
            url,
            data,
            headers:{
                'Content-Type':'multipart/form-data'
            }
        }).then((response) => {
            if(response.status === 'error'){
                throw(response.message);
            }
            return response.data || {};
        })
        .catch((error) => {
            if(error.response && error.response.data){
                return error.response.data;
            }
            return {
                status: 'error',
                message: 'Неизвестная  ошибка'
            };
        });
    },
    getSignedRequest: ({name, type}) => {
        return httpTransport({
            method: "get",
            url: "/api/products/sign-s3",
            data: {
                name,
                type
            }
        }).then((response) => {
            if(response.status === 'error'){
                throw(response.message);
            }
            return response.data || {};
        })
        .catch((error) => {
            if(error.response && error.response.data){
                return error.response.data;
            }
            return {
                status: 'error',
                message: 'Неизвестная  ошибка'
            };
        });
    },

    uploadFile: ({signedRequest, file}) => {
        return httpTransport({
            method: "put",
            url: signedRequest,
            data: file
        }).then((response) => {
           if(response.status === 200){
            console.log('boom');   
            return true;              
           }
           return false;
        })
        .catch((error) => {
            return false;
        });
    }
    

};