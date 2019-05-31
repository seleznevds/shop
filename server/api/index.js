const productsApi = require('./products');
const basketApi = require('./basket');

function api(server){
    server.use('/api/products', productsApi);
    server.use('/api/basket', basketApi)
}

module.exports = api; 