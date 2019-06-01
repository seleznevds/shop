let express = require('express');
let router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const Basket = require('../models/Basket');
const checkAuthMiddleware = require('../../lib/checkAuthMiddleware'); 


router.get('/', checkAuthMiddleware, async (req, res) => {

    if (req.query.id) {
        try {
            let order = await Order.findById(req.query.id);

            let productIds = order.products.map((product) => {
                return product.productId.toString();
            });

            let products = [];
            if (productIds.length) {
                products = await Product.find({ _id: { $in: productIds } });
            }

            if (products.length) {
                order = order.toObject();
                order.productsDetails = products;
            }

            res.status(200).json({
                status: 'success',
                order
            });
        } catch (err) {
            res.status(400).json({
                status: 'error'
            });
        }

        return;
    }

    res.status(400).json({
        status: 'error'
    });
});


router.post('/', checkAuthMiddleware, async (req, res) => {
    if (req.session.basketId) {
        try {
            
            let basket = await Basket.findById(req.session.basketId);
            let order = await Order.add({
                basketId: req.session.basketId,
                userId: req.user && req.user.id ? req.user.id : null,
                products: basket.products,
                discountPercent: basket.discountPercent,
                discountMoney: basket.discountMoney
            });
            
           delete req.session.basketId;
           console.log('test', req.session.basketId )
            res.status(200).json({
                status: 'success',
                order
            });
    
        } catch (err) {
            console.log(err);
            res.status(400).json({
                status: 'error'
            });
        }

        return;
    }

    res.status(400).json({
        status: 'error'
    });
});




module.exports = router;