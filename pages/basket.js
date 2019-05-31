import React from 'react';
import withLayout from '../lib/withLayout';
import Basket from '../components/Basket';


class BasketPage extends React.Component { 
    render() {
        return  <div className="container">
           <h2>Корзина</h2>
           <Basket {...this.state} removeFromBasketHandler={this.props.removeFromBasketHandler}/>
        </div>;
    }
}


export default withLayout(BasketPage);