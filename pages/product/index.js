import React from 'react';
import withLayout from '../../lib/withLayout';
import {  recieveProductDetail } from '../../actions/products';
import Product from '../../components/Product';
import { productsApi } from '../../lib/products';
import Router from 'next/router';





class ProductDetail extends React.Component {


    static async getInitialProps({ reduxStore, query, req, res }) {
        const isServer = !! req;

        const { productId } = query;
        let product;

        let productsDetailList = reduxStore.getState().products && reduxStore.getState().products.productsDetailList;

        if(productsDetailList){
            product = productsDetailList.find((product) => {
                if(product.id === productId){
                    return true;
                }       
            });

            if(product){
                return {product};
            }
        }   


        try {
            product = await productsApi.getId({productId});
            if(product){
                reduxStore.dispatch(recieveProductDetail(product));
                return {product};
            }            
        } catch(err){
            if(isServer){
                res.writeHead(302, { Location: `/` });
                res.end();
            } else {
                Router.push('/');
            }
        }
    }

    render() {
        return <div className="row">
            <Product key={this.props.product.id} product={this.props.product} />
        </div>;
    }
}


export default withLayout(ProductDetail);