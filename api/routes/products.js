const express = require('express');
const router = express.Router();
const Product = require('./models/product');
const { default: mongoose } = require('mongoose');

// '/' - redirects to /products
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET request to /products'
    })
});

router.post('/', (req, res, next) => {
    // const product = {
    //     name: req.body.name,
    //     price: req.body.price
    // }
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })
    product.save().then(result => {
        console.log(result)
    }).catch(err => {
        console.log(err)
    })
    res.status(201).json({
        message: 'Handling POST request to /products',
        createdProduct: product
    })
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    if(id === 'special'){
        res.status(200).json({
            id: id,
            message: 'You discovered the specail ID'
        })
    } else {
    res.status(200).json({
        message: 'You passed and ID'
    })}
});

router.patch('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Updated product'
    })
});

router.delete('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted Product'
    })
})

module.exports = router;