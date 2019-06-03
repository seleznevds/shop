import React from 'react';
import { connect } from 'react-redux';
import withLayout from '../../lib/withLayout';
import ProductForm from '../../components/ProductForm';



class AddProduct extends React.Component {
  render () {
    return (<>
        <h2>Добавить продукт</h2>
        <ProductForm  />
    </>);
  }
}

const Component = connect(
  null,
  null
)(AddProduct);

export default withLayout(Component);