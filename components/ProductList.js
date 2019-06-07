import React from 'react';
import { connect } from 'react-redux';
import Product from '../components/Product';


const ProductList = ({products}) => {
    return  <div className="row">
    {products.map((product) => <Product key={product.id} product={product} />)}
  </div>;
};

const mapStateToProps = (state) => ({
    products: state.products.productsList
}); 
  
export default connect(mapStateToProps)(ProductList);