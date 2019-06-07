import React from 'react';
import withLayout from '../../lib/withLayout';
import { recieveProducts } from '../../actions/products';
import { recievePaginationProductsQuantity, recievePaginationPageNumber} from '../../actions/pagination';
import { productsApi } from '../../lib/products';
import ProductList from '../../components/ProductList';
import Pagination from '../../components/Pagination';





class Index extends React.Component {
  static async getInitialProps({ reduxStore, req, res, query }) {


    const isServer = !!req;

    const { page } = query;
    if(isNaN(page)){
      if (isServer) {
        res.writeHead(302, { Location: `/` });
        res.end();
      } else {
        Router.push('/');
      }  
      return;
    }



    try {
      let { products, productsQuantity } = await productsApi.getList({page});
      reduxStore.dispatch(recievePaginationProductsQuantity(productsQuantity));
      reduxStore.dispatch(recieveProducts({ products }));
      reduxStore.dispatch(recievePaginationPageNumber(page)); 
      return {};     
    } catch(err){
      if (isServer) {
        res.writeHead(302, { Location: `/` });
        res.end();
      } else {
        Router.push('/');
      }        
    } 
  }

  render() {
    return <>
      <Pagination/>
      <ProductList />
      <Pagination />
    </>;
  }
}

export default withLayout(Index);