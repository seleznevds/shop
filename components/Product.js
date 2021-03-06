import styled from 'styled-components';
import Link from 'next/link';
import { convertToRublesFromCents } from '../lib/utils';
import { connect } from 'react-redux';
import { addToBasket, removeFromBasket } from '../actions/basket';
import Preloader from './Preloader';


let Title = styled.span`
    padding: 10px !important;
    background:gray;
`;

let ImageContaner = styled.div`
    
    max-height:250px;
    overflow:hidden;
    text-align:center;
    max-width:400px;
`;

let CardContent = styled.div`
    border-top: gray 1px solid;
`;

let ButtonContaner = styled.div`
    margin:10px 0;
    height:50px;`;

const Product = ({ product, addToBasketHandler, removeFromBasketHandler, inBasket, showPreloader}) => {
    let image = product.images.length ? <img src={product.images[0]} className="responsive-img" /> : null;
    
    
    
    let button = showPreloader ? <Preloader/> :
     (inBasket ?
     <p><a className="waves-effect waves-light btn" onClick={removeFromBasketHandler}>
         <i className="material-icons left">remove_shopping_cart</i>Убрать  из  корзины
         </a></p> :
     <p><a className="waves-effect waves-light btn" onClick={addToBasketHandler}>
         <i className="material-icons left">add_shopping_cart</i>Купить
     </a></p>);
    
    return (
        <div className="col s10 m5">
            <div className="card">
                <ImageContaner className="card-image">
                    <Link as={`/product/${product.id}`} href={`/product?productId=${product.id}`}><a>{image}</a></Link>
                    <Link as={`/product/${product.id}`} href={`/product?productId=${product.id}`}><a><Title className="card-title">{product.title}</Title></a></Link>
                </ImageContaner>
                <CardContent className="card-content">
                    <p>{convertToRublesFromCents(product.price)} руб.</p>
                    <p>{product.description}</p>
                    <ButtonContaner>{button}</ButtonContaner>                    
                </CardContent>
            </div>
        </div>
    );
}

function mapStateToProps(state, ownProps) {
    let productId = ownProps.product.id.toString();

    let inBasket = state.basket.products.find((product) => {
        return product.productId.toString() === productId;
    });

    let showPreloader = false;
    if(state.preloader && state.preloader.basket && state.preloader.basket[productId]){
        showPreloader = true;
    }


    
    return { inBasket, showPreloader };
}



const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addToBasketHandler: (event) => {
            dispatch(addToBasket({
                id: ownProps.product.id,
                quantity: 1
            }));

            event.preventDefault();
        },

        removeFromBasketHandler: (event) => {
            dispatch(removeFromBasket({
                productId: ownProps.product.id
            }));

            event.preventDefault();
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Product);