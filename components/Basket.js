import React, { Component } from 'react';
import styled from 'styled-components';
import { convertToRublesFromCents } from '../lib/utils';
import { connect } from 'react-redux';
import { removeFromBasket } from '../actions/basket';


let Image = styled.img`
   max-width:100px;
`;

let QuantityInput = styled.input`
max-width:50px;
text-align:center;`;

let Bold = styled.span`
font-size:1.2rem;
font-weight:600;`;

const Product = (props) => {

    return <div className="row">
        <div className="col  hide-on-small-only m2"><Image src={props.product.images[0]} alt={props.product.title} /></div>
        <div className="col s3">{props.product.title}</div>
        <div className="col s2">{convertToRublesFromCents(props.product.price)}</div>
        <div className="col s2 input-field">
            <QuantityInput required type="number"  min="1" max="100" defaultValue={props.product.quantity} />
        </div>
        <div className="col s2">{convertToRublesFromCents(props.product.price * props.product.quantity)}</div>
        <div className="col s1 ">
            <a className="btn-floating btn-small waves-effect waves-light red" onClick={props.removeFromBasketHandler}><i className="material-icons">delete</i></a>
        </div>
    </div>;
}



class Basket extends React.Component {

    render() {

        let discount = ! this.props.discount ? null :  <div className="row">
        <div className="col s2 offset-s2">Скидка:</div>
        <div className="col s2">{this.props.discountMeasure === '%' ? this.props.discount : convertToRublesFromCents(this.props.discount)} {this.props.discountMeasure}</div>

        <div className="col s3">Всего с учетом скидки:</div>
                <div className="col s3">{convertToRublesFromCents(this.props.totalPriceWhithDiscount)} руб.</div>
    </div> 


        return <div className="collection">
            <div className="row">
                <div className="col  hide-on-small-only m2"></div>
                <div className="col s3"><Bold >Продукт</Bold ></div>
                <div className="col s2"><Bold >Цена руб.</Bold ></div>
                <div className="col s2 "><Bold >Количество</Bold ></div>
                <div className="col s2 "><Bold >Стоимость руб.</Bold ></div>
            </div>

            {this.props.products.map((product) => <Product key={product.id} product={product}
                removeFromBasketHandler={(event) => { this.props.removeFromBasketHandler(product.id, event) }} />)}
            <div className="row">

                <div className="col s3 offset-s6">Всего:</div>
                <div className="col s3">{convertToRublesFromCents(this.props.totalPrice)} руб.</div>
            </div>
            {discount}   

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
        discountMeasure: state.basket.discountMoney ? 'руб.' : (state.basket.discountPercent ? '%' : '')
    };
};

const mapDispatchToProps = (dispatch) => {
    return {

        removeFromBasketHandler: (id, event) => {
            dispatch(removeFromBasket({
                productId: id
            }));

            event.preventDefault();
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Basket);