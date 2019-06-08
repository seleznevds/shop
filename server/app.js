const express = require('express');
const next = require('next');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const mongoSessionStore = require('connect-mongo');
const helmet = require('helmet');
require('dotenv').config();
const api = require('./api');
const auth = require('./googleAuth');
const config = require('./config');
const getRootUrl = require('../lib/getRootUrl');
const csrf = require('csurf');




mongoose.connect(
    process.env.MONGO_URL,
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    }
).catch(err => { });






const dev = process.env.NODE_ENV !== 'production';

const port = process.env.PORT || 8000;
const ROOT_URL = getRootUrl();


const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(async () => {
    const server = express();
    server.use(helmet());
    server.use(express.static(config.staticFolder));



    const MongoStore = mongoSessionStore(session);
    const sess = {
        name: 'shop.sid',
        secret: process.env.SESSION_SECRET,
        store: new MongoStore({
            mongooseConnection: mongoose.connection,
            ttl: 2 * 24 * 60 * 60, // save session 14 days
        }),
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            maxAge: 2 * 24 * 60 * 60 * 1000,
        },
    };

    if (!dev) {
        server.set('trust proxy', 1); // trust first proxy
        sess.cookie.secure = true; // serve secure cookies
    }

    server.use(session(sess));

    server.use(bodyParser.json());
    server.use(csrf());
    // error handler
    server.use(function (err, req, res, next) {
        if (err.code !== 'EBADCSRFTOKEN') return next(err);
    
        // handle CSRF token errors here
        res.status(403);
        res.send('form tampered with');
    })

    // Set up a whitelist and check against it:

    var corsOptions = {
        origin: [/http[s]?:\/\/localhost:.*/]
    }

    // Then pass them to cors:
    server.use(cors(corsOptions));


    auth({ server, ROOT_URL });
    api(server);

    server.get('/login', (req, res) => {
        app.render(req, res, '/login');
    });

    server.get('/profile', (req, res) => {
        app.render(req, res, '/profile');
    });

    server.get('/product/list/:page', (req, res) => {
        const { page } = req.params;
        app.render(req, res, '/product/list', { page });
    });


    server.get('/product/:productId', (req, res) => {
        const { productId } = req.params;
        app.render(req, res, '/product', { productId });
    });

    server.get('/admin/add-products', (req, res) => {
        app.render(req, res, '/admin/add-product');
    });

    server.get('/admin/edit-product/:productId', (req, res) => {
        const { productId } = req.params;
        app.render(req, res, '/admin/edit-product', { productId });
    });

    server.get('*', (req, res) => {
        if (req.path) {
            app.render(req, res, req.path);
        } else {
            handle(req, res);
        }
    });

    server.listen(port, (err) => {
        if (err) throw err;
        console.log(`> Ready on ${ROOT_URL}`);
    });
});