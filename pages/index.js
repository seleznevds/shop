import React from 'react';
import withLayout from '../lib/withLayout';
import { recieveProducts } from '../actions/products';
import { recievePaginationProductsQuantity } from '../actions/pagination';
import { productsApi } from '../lib/products';
import ProductList from '../components/ProductList';
import Pagination from '../components/Pagination';





class Index extends React.Component {
  static async getInitialProps({ reduxStore }) {

    try {
      let { products, productsQuantity } = await productsApi.getList();
      reduxStore.dispatch(recievePaginationProductsQuantity(productsQuantity));
      reduxStore.dispatch(recieveProducts({ products }));

    } finally {
      return {};
    }
  }

  render() {
    return  <>
      <Pagination/>
      <ProductList/>
      <Pagination/>
    </>;   
  }
}

export default withLayout(Index);