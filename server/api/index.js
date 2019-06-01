const productsApi = require('./products');
const basketsApi = require('./basket');
const ordersApi = require('./order');

function api(server){
    server.use('/api/products', productsApi);
    server.use('/api/basket', basketsApi);
    server.use('/api/order', ordersApi);
}

module.exports = api; 