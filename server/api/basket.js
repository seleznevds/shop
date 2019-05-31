let express = require('express');
let router = express.Router();
const Basket = require('../models/Basket');
const Product = require('../models/Product');


router.get('/', async (req, res) => {

  if (req.session.basketId) {
    try {
      let basket = await Basket.findById(req.session.basketId);
      //basket = basket.toObject();       
      if (req.query.withProductDetail) {
        let productIds = basket.products.map((product) => {
          return product.productId.toString();
        });

        let products = [];
        if (productIds.length) {
          products = await Product.find({ _id: { $in: productIds } });
        }

        if (products.length) {
          basket = basket.toObject();
          basket.productsDetails = products;
        }
      }

      res.status(200).json({
        status: 'success',
        basket
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


router.post('/', async (req, res) => {
  if (!req.body.id) {
    try {
      let basket = await Basket.add({
        userId: req.user && req.user.id ? req.user.id : null,
        products: req.body && req.body.products && Array.isArray(req.body.products) ? req.body.products : [],
        discountPercent: req.body && req.body.discountPercent ? req.body.discountPercent : 0,
        discountMoney: req.body && req.body.discountMoney ? req.body.discountMoney : 0,
      });

      res.status(200).json({
        status: 'success',
        basket
      });

    } catch (err) {
      res.status(400).json({
        status: 'error'
      });
    }
    return;
  }

  try {
    let basket = await Basket.update({
      userId: req.user && req.user.id ? req.user.id : null,
      products: req.body && req.body.products && Array.isArray(req.body.products) ? req.body.products : [],
      discountPercent: req.body && req.body.discountPercent ? req.body.discountPercent : 0,
      discountMoney: req.body && req.body.discountMoney ? req.body.discountMoney : 0,
      id: req.body.id
    });

    if (basket) {
      res.status(200).json({
        status: 'success'
      });

      return;
    }

    res.status(400).json({
      status: 'error'
    });

  } catch (err) {
    res.status(400).json({
      status: 'error'
    });
  }
});

router.post('/add_product', async (req, res) => {

  if (!req.body || !req.body.product) {
    res.status(400).json({
      status: 'error'
    });

    return;
  }


  try {
    let productToAdd = await Product.findById(req.body.product.id);

    if (!productToAdd) {
      res.status(400).json({
        status: 'error'
      });

      return;
    }


    let basket;

    if (req.session.basketId) {
      basket = await Basket.findById(req.session.basketId);
    }

    if (!basket) {// корзина не создана, значит создаем  корзину
      let products = [{
        productId: req.body.product.id,
        price: productToAdd.price, //актуальная цена
        quantity: req.body.product.quantity
      }];

      let basket = await Basket.createNew({
        userId: req.user && req.user.id ? req.user.id : null,
        products
      });

      if (basket) {
        req.session.basketId = basket.id;

        res.status(200).json({
          status: 'success',
          basket
        });
      } else {
        res.status(400).json({
          status: 'error'
        });
      }


    } else {

      //корзина  существует, обновляем список  продуктов
      let products = basket.products || [];
      let updated = false;

      products.forEach((currentProduct) => {

        if (currentProduct.productId.toString() === req.body.product.id) {
          currentProduct.quantity = currentProduct.quantity + req.body.product.quantity;
          currentProduct.price = productToAdd.price;//устанавливаем актуальную цену  продукта
          updated = true;
        }
      });

      if (!updated) {
        products.push({
          productId: req.body.product.id,
          price: productToAdd.price,
          quantity: req.body.product.quantity
        });
      }

      let updatedBasket = await Basket.updateProducts({
        userId: req.user && req.user.id ? req.user.id : null,
        products,
        id: req.session.basketId
      });

      if (updatedBasket) {
        res.status(200).json({
          status: 'success',
          basket: updatedBasket
        });

      } else {
        res.status(400).json({
          status: 'error'
        });
      }
    }
  } catch (err) {
    res.status(400).json({
      status: 'error'
    });
  }
});


router.post('/remove_product', async (req, res) => {
  try {
    let basket = await Basket.findById(req.session.basketId);

    if (basket) {
      let products = basket.products || [];
      products = basket.products.filter((currentProduct) => {
        return (currentProduct.productId.toString() !== req.body.productId);
      });

      let updatedBasket = await Basket.updateProducts({
        userId: req.user && req.user.id ? req.user.id : null,
        products,
        id: req.session.basketId
      });

      if (updatedBasket) {
        res.status(200).json({
          status: 'success',
          basket: updatedBasket
        });

        return;
      }

    }

    res.status(400).json({
      status: 'error'
    });

  } catch (err) {
    res.status(400).json({
      status: 'error'
    });
  }
});

module.exports = router;