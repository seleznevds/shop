const mongoose = require('mongoose');
const escape =  require('escape-html');
const { Schema } = mongoose;


const mongoSchema = new Schema({
    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true
    }, 
    
    createdAt: {
        type: Date,
        default: Date.now(), 
        required: true       
    },  

    price: {
        type: Number, // храним  цену в копейках
        required: true
    },

    images: [String]
});

class ProductClass {
    static async list({offset = 0, limit = 10} = {}) {
        const products = await this.find({})
            .sort({ createdAt: -1 })
            .skip(offset)
            .limit(limit);

        const productsQuantity = await this.estimatedDocumentCount();
        
        return  { products, productsQuantity };
    }

    static async add({title, description, images = [], price}){
        if(price === undefined || isNaN(parseInt(price, 10))){
            throw new Error('Указана  некорректная  цена');
        }
        
        price = parseInt(price, 10);

        return this.create({
            title: escape(title.trim()),
            description: escape(description.trim()),
            images, 
            price   
        });
    }
}



mongoSchema.loadClass(ProductClass);

mongoSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
mongoSchema.set('toJSON', {
    virtuals: true
});

mongoSchema.set('toObject', {
    virtuals: true
});


const Product = mongoose.model('ShopProduct', mongoSchema);
module.exports = Product;