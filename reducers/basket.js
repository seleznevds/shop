import { RECEIVE_BASKET, RECEIVE_BASKET_EXTENDED } from '../actions/actionConstants';

const calculateTotalAndTotalDiscount =  ({ products,
    discountPercent,
    discountMoney }) => {
        let totalPrice = 0,
        totalPriceWhithDiscount = 0;
        
        if(products.length){
            totalPrice = products.reduce((total, product) => {
                return total + (product.price || 0) * product.quantity;
            }, 0);

            if(discountMoney) {
                totalPriceWhithDiscount = Math.ceil(totalPrice - discountMoney);
            } else if(discountPercent){
                totalPriceWhithDiscount = Math.ceil(totalPrice - (totalPrice * discountPercent / 100));
            } else {
                totalPriceWhithDiscount = totalPrice;
            }
        }

        return {
            totalPrice,
            totalPriceWhithDiscount
        };
}

let totalPrice, totalPriceWhithDiscount, quantity;

export default (state = {
    products:[],
    productsDetails: [],
    totalPrice: 0,
    totalPriceWhithDiscount: 0,
    discountPercent:0,
    discountMoney:0,
    quantity: 0
}, action) => {
    switch (action.type) {
        case RECEIVE_BASKET:
            ({totalPrice,
                totalPriceWhithDiscount} = calculateTotalAndTotalDiscount(action.payload));
            
             quantity = action.payload.products.reduce((quantity, product) => {
                return quantity + product.quantity
            }, 0); 

             return {...state,
                 products: action.payload.products,
                 totalPrice,
                 totalPriceWhithDiscount,
                 discountMoney: action.payload.discountMoney,
                 discountPercent: action.payload.discountPercent,
                 quantity
             };

        case  RECEIVE_BASKET_EXTENDED:
               ({totalPrice,
                    totalPriceWhithDiscount} = calculateTotalAndTotalDiscount(action.payload));
                
                quantity = action.payload.products.reduce((quantity, product) => {
                    return quantity + product.quantity
                }, 0); 
    
                 return {
                    ...state,
                     products: action.payload.products,
                     totalPrice,
                     totalPriceWhithDiscount,
                     discountMoney: action.payload.discountMoney,
                     discountPercent: action.payload.discountPercent,
                     quantity,
                     productsDetails: action.payload.productsDetails,
                 };
                

        default:
            return state;            
    }
}