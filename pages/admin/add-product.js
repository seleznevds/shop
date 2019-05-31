import React from 'react';
import { connect } from 'react-redux';
import withLayout from '../../lib/withLayout';
import ProductForm from '../../components/ProductForm';



class AddProduct extends React.Component {
  static getInitialProps ({ req }) {
    const isServer = !!req
    // DISPATCH ACTIONS HERE ONLY WITH `reduxStore.dispatch`
    //reduxStore.dispatch(serverRenderClock(isServer));
    //reduxStore.dispatch(incrementCount());

    return {}
  }

  componentDidMount () {
    // DISPATCH ACTIONS HERE FROM `mapDispatchToProps`
    // TO TICK THE CLOCK
   // this.timer = setInterval(() => this.props.startClock(), 1000)
  }

  componentWillUnmount () {
    
  }

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