import React, { Component } from 'react';
import withLayout from '../../lib/withLayout';
import withAuth from '../../lib/withAuth';
import ProductForm from '../../components/ProductForm';
import Router from 'next/router';
import { productsApi } from '../../lib/products';


class EditProduct extends Component {
    render() {
        return (<>
            <h2>Редактировать продукт</h2>
            <ProductForm product={this.props.product} />

        </>);
    }

    static async getInitialProps({ req, res, query }) {

        const { productId } = query;
        try {
            const headers = {};
            if (req && req.headers && req.headers.cookie) {
                headers.cookie = req.headers.cookie;
            }

            let product = await productsApi.getId({ productId, headers });
            return { product };

        } catch (err) {
            if (req) {
                res.writeHead(302, { Location: `/` });
                res.end();
            } else {

                Router.push(`/`);
            }
        }
    }


}

export default withAuth(withLayout(EditProduct));