const express = require('express');
const app = express();
// for tracking logs
const morgan = require('morgan')
// parses request body
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productsRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders')
// connect mongoDB using mongoose by passing 'connection string'
mongoose.connect(
    'mongodb+srv://shubham:' + 
    process.env.MONGO_ATLAS_PW + 
    '@node-rest-shop.fpjx9lf.mongodb.net/?retryWrites=true&w=majority&appName=node-rest-shop'
)

// use morgan to write logs, & use before routes
app.use(morgan('dev'));
// parses request body
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
// append CORS headers to all request
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    req.header(
        'Access-Control-Allow-Origin',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    /** 
     * Return to browser & Show which methods are allowed when Options method request comes
     * Whenever OPTIONS req comes, this server will return with
     * 1. Above 2 headers
     * 2. Below 1 header
     * 3. Status 200
     * 4. Empty json data
    */
    if(req.method === 'OPTIONS'){
        req.header('Access-Control-Allow-Origin', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    // call next if not returning anything, so that other routes can proceed
    next();
})


// uses middleware
// app.use((req, res, next) => { // ;initial setup
//     res.status(200).json({
//         message: 'Hello world'
//     })
// });

app.use('/products', productsRoutes);
app.use('/orders', orderRoutes);

// Error Handling
app.use((req, res, next) => {
    error = new Error('Not Found');
    error.status = 404;
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app; 