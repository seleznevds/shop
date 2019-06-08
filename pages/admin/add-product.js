import React from 'react';
import withLayout from '../../lib/withLayout';
import withAuth from "../../lib/withAuth";
import ProductForm from '../../components/ProductForm';

class AddProduct extends React.Component {
  render () {
    return (<>
        <h2>Добавить продукт</h2>
        <ProductForm  />
    </>);
  }
}

export default withAuth(withLayout(AddProduct),  { adminRequired:true });