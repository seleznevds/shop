import Link from 'next/link';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getWordForm, convertToRublesFromCents } from '../lib/utils';

let ContanerEmpty = styled.div`
    padding-top:15px;`;

let Contaner = styled.div`
padding-top:15px;`;

let Price = styled.div`
white-space:nowrap;`;

let BasketViget = (props) => {
    let content = <ContanerEmpty><span>В корзине  нет товаров</span></ContanerEmpty>;

    if (props.productsQuantity) {

        let word = getWordForm(props.productsQuantity, {
            plural: 'товаров',
            genitive: 'товара',
            nominative: 'товар'
        });

        let price = convertToRublesFromCents(props.totalPriceWhithDiscount);
        content = <Contaner>
            <span> {props.productsQuantity} {word} <Price>на  {price} руб.</Price></span>
        </Contaner>;
    }

    return <>
        <Link as={`/basket`} href={`/basket`}>
            <a>
                <div>
                    <i className="material-icons left">shopping_cart</i>
                    {content}
                </div>
            </a>
        </Link>
    </>;
}

const mapStateToProps = (state) => ({
    totalPriceWhithDiscount: state.basket.totalPriceWhithDiscount,
    productsQuantity: state.basket.quantity
});

export default connect(mapStateToProps, null)(BasketViget);