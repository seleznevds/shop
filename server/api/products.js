let express = require('express');
let router = express.Router();
let Product = require('../models/Product');
const uuidv4 = require('uuid/v4');
const multer = require('multer');

const path = require('path');
const fs = require('fs')
const config = require('../config.js');
const checkAuth = require('../../lib/checkAuthMiddleware');
const crypto = require('crypto');
const awsFileStorage = require('../../lib/multerAwsStorage');







let storage = awsFileStorage({
  filename: function (req, file, cb) {
    let extension = file.originalname.match(/\.[a-z]{1,4}$/i);
    cb(null, `${uuidv4()}${extension && extension.length ? extension[0] : ''}`);

  },
  bucket: process.env.S3_BUCKET,
  region: 'eu-west-3' 
});


let upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (!['image/jpeg', 'image/pjpeg', 'image/png', 'image/webp'].includes(file.mimetype)) {
      cb(new Error('Wrong mime type'), false);
      return;
    }
    cb(null, true);
  },
  limits: {
    fields: 10,
    fileSize: 1024 * 512, // max filesize  in bytes
    fieldSize: 1024 * 512,
  }
}).single('image');

let uploadError = (err, req, res, next) => {
  if (err) {
    console.log('product  create error', err);
    res.status(404).json({
      status: 'error',
      message: 'Некорректный файл. Используйте  изображения  в формате webp, png или  jpg, размером не более  512 kb'
    });

    return;
  }

  next();
}



router.post('/create', checkAuth, upload, uploadError, async (req, res) => {
  let title = req.body && req.body.title ? req.body.title.trim() : '';
  let description = req.body && req.body.description ? req.body.description.trim() : '';
  let price = req.body && req.body.price ? req.body.price.trim() : undefined;


  if (!title || !description || !price) {
    if (req.file && req.file.path) {
      //todo del files from storage
    }

    res.status(404).json({
      status: 'error',
      message: 'Необходимо  заполнить  обязательные поля'
    });

    return;
  }

  try {


    let images = req.file && req.file.destination ? [req.file.destination] : [];

    let product = await Product.add({
      title,
      description: req.body.description,
      images,
      price
    });

    if (product) {
      res.status(200).json({
        status: 'success',
        message: 'продукт  добавлен!',
        productId: product.id
      });
    }
  } catch (err) {
    console.log(err);
    if (req.file && req.file.path) {
      
    }

    res.status(404).json({
      status: 'error',
      message: 'Неизвестная  ошибка. Попробуйте повторить  через некоторое время.'
    });
  }
});


router.post('/edit', checkAuth, upload, uploadError, async (req, res) => {
  let title = req.body && req.body.title ? req.body.title.trim() : '';
  let description = req.body && req.body.description ? req.body.description.trim() : '';
  let id = req.body && req.body.id;
  let price = req.body && req.body.price ? req.body.price.trim() : undefined;

  if (!id || !title || !description || !price) {
    if (req.file && req.file.path) {
      
    }

    res.status(404).json({
      status: 'error',
      message: 'Необходимо  заполнить  обязательные поля.'
    });

    return;
  }

  let product;
  try {
    product = await Product.findById(id);
    if (!product) {
      res.status(400).json({ status: 'error', message: 'продукт не найден, либо  доступ запрещен' });
      return;
    }

    product = product.toObject();
  } catch (err) {
    res.status(400).json({ status: 'error', message: 'Неизвестная ошибка. Попробуйте  поторить через некоторое время' });
    return;
  }

  const modifier = {
    title,
    description: req.body.description,
    price: price
  };

  
  if (req.file && req.file.destination) {
    modifier.images = [req.file.destination];
  }

  try {
    await Product.updateOne({ _id: id }, { $set: modifier });

    if (product.image && req.file && req.file.path) {  // если  все ок, то удаляем старое изображение
      
    }

    res.status(200).json({
      status: 'success', message: 'продукт обновлен!',
      image: req.file && req.file.destination ? req.file && req.file.destination : null
    });

    return;

  } catch (err) {
    if (req.file && req.file.path) {
     
      res.status(400).json({ status: 'error', message: 'Неизвестная ошибка. Попробуйте  поторить через некоторое время' });
      return;
    }
  }
});


router.get('/:id', async (req, res) => {
  if (!req.params.id) {
    res.status(400).json({ status: 'error', message: 'Идентификатор продукта не указан' });
  }

  let product;
  try {
    product = await Product.findById(req.params.id);
    if (!product) {
      res.status(400).json({ status: 'error', message: 'продукт не найден' });
    }
    product = product.toObject();
  } catch (err) {
    res.status(400).json({ status: 'error', message: 'продукт не найден' });
    return;
  }

  res.send({ product });
});


router.get('/', async (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;
  limit = isNaN(limit) ? 10 : limit;

  let offset = req.query.offset ? parseInt(req.query.offset, 10) : 0;
  offset = isNaN(offset) ? 0 : offset;

  try {
    let { products, productsQuantity } = await Product.list({ offset, limit });
    res.json({ products, productsQuantity });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;