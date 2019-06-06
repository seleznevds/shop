import React, { Component } from 'react';
import styled from 'styled-components';
import _ from 'lodash'
import Link from 'next/link';
import { connect } from 'react-redux';
import { convertToRublesFromCents } from '../lib/utils';
import { removeFromBasket, changeProductQuantity, createOrder} from '../actions/basket';


let Image = styled.img`
   max-width:100px;
`;

let QuantityInput = styled.input`
max-width:50px;
text-align:center;`;

let Bold = styled.span`
font-size:1.2rem;
font-weight:600;`;

const ProductInBasket = (props) => {

    return <div className="row">
        <div className="col  hide-on-small-only m2">
        <Link as={`/product/${props.product.id}`} href={`/product?productId=${props.product.id}`}><a>
            <Image src={props.product.images[0]} alt={props.product.title} />
        </a></Link>
        </div>
        <div className="col s3">
            <Link as={`/product/${props.product.id}`} href={`/product?productId=${props.product.id}`}><a>{props.product.title}</a></Link>
        </div>
        <div className="col s2">{convertToRublesFromCents(props.product.price)}</div>
        <div className="col s2 input-field">
            <QuantityInput required type="number" min="0" max="100" defaultValue={props.product.quantity}
            onChange={(event) => {  props.changeProductQuantity(props.product.id, props.product.quantity, event.target) }}  />
        </div>
        <div className="col s2">{convertToRublesFromCents(props.product.price * props.product.quantity)}</div>
        <div className="col s1 ">
            <a className="btn-floating btn-small waves-effect waves-light red" onClick={props.removeFromBasketHandler}><i className="material-icons">delete</i></a>
        </div>
    </div>;
}



class Basket extends React.Component {

    render() {
        let discount = !this.props.discount ? null : <div className="row">
            <div className="col s2 offset-s2">Скидка:</div>
            <div className="col s2">{this.props.discountMeasure === '%' ? this.props.discount : convertToRublesFromCents(this.props.discount)} {this.props.discountMeasure}</div>

            <div className="col s3">Всего с учетом скидки:</div>
            <div className="col s3">{convertToRublesFromCents(this.props.totalPriceWhithDiscount)} руб.</div>
        </div>

        let error = this.props.error ? <div  className="error">{this.props.error.message ? this.props.error.message : this.props.error.toString()}</div> : null;



        return <div className="collection">
            <div className="row">
                <div className="col  hide-on-small-only m2"></div>
                <div className="col s3"><Bold >Продукт</Bold ></div>
                <div className="col s2"><Bold >Цена руб.</Bold ></div>
                <div className="col s2 "><Bold >Количество</Bold ></div>
                <div className="col s2 "><Bold >Стоимость руб.</Bold ></div>
            </div>

            {this.props.products.map((product) => <ProductInBasket key={product.id} product={product}
               changeProductQuantity={this.props.changeProductQuantity} removeFromBasketHandler={(event) => { this.props.removeFromBasketHandler(product.id, event) }} />)}
            <div className="row">

                <div className="col s3 offset-s6">Всего:</div>
                <div className="col s3">{convertToRublesFromCents(this.props.totalPrice)} руб.</div>
            </div>
            {discount}

            <a className="waves-effect waves-light btn" onClick={this.props.createOrder}>
                <i className="material-icons left">add_box</i>Оформить  заказ
            </a>
            {error}
        </div>;
    }
}

const mapStateToProps = (state) => {
    let products = [];

    if (state.basket.products) {
        state.basket.products.forEach((product) => {
            let detailProduct = state.basket.productsDetails.find((detail) => {
                return detail.id === product.productId;
            });

            if (detailProduct) {
                products.push({ ...product, ...detailProduct });
            }
        });
    }

    return {
        products,
        totalPriceWhithDiscount: state.basket.totalPriceWhithDiscount,
        totalPrice: state.basket.totalPrice,
        discount: state.basket.discountMoney || state.basket.discountPercent,
        discountMeasure: state.basket.discountMoney ? 'руб.' : (state.basket.discountPercent ? '%' : ''),
        error: state.basket.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        removeFromBasketHandler: (id, event) => {
            dispatch(removeFromBasket({
                productId: id
            }));

            event.preventDefault();
        },

        changeProductQuantity: _.debounce((id, prevValue, input) => {            
            
            let value = parseInt(input.value, 10);

            if(isNaN(value) || value < 0 || value > 100){
                input.value = prevValue;
                input.blur();
                return;
            }
            
            dispatch(changeProductQuantity({
                productId: id,
                quantity:value
            }));
           
        }, 1000),

        createOrder: (event) => {
            dispatch(createOrder());

            event.preventDefault();
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Basket);