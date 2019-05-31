import React from 'react';
import { connect } from 'react-redux';
import withLayout from '../lib/withLayout';
import { requestProducts, recieveProducts } from '../actions/products';
import Product from '../components/Product';
import { productsApi } from '../lib/products';





class Index extends React.Component {
  static async getInitialProps({ reduxStore }) {
    
   if(reduxStore.getState().products && reduxStore.getState().products.productsPreviewList &&
   reduxStore.getState().products.productsPreviewList.length){
     return {};
   }
    
    try{
      let { products, productsQuantity } = await productsApi.getList();

      reduxStore.dispatch(recieveProducts({ products }));
    } finally {
      return {};
    }    
  }  

  render() {
    return <div className="row">
      {this.props.products.map((product) => <Product key={product.id} product={product} />)}
    </div>;
  }
}

const mapStateToProps = (state, ownProps) => ({
  products: state.products.productsPreviewList
});



const Component = connect(
  mapStateToProps,
  null
)(Index);

export default withLayout(Component);