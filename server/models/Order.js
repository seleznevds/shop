const mongoose = require('mongoose');

const { Schema } = mongoose;

const mongoSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId, 
    },
    
    basketId: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true
    },

    createdAt: {
        type: Date,
        default: Date.now(),
        required: true
    },

    products: [
        {
            productId: Schema.Types.ObjectId,
            quantity: Number,
            price: Number
        }
    ],
    discountPercent: Number,
    discountMoney: Number
});

class OrderClass {
    static async add({
        userId = null,
        products = [],
        discountPercent = 0,
        discountMoney = 0,
        basketId
    }) {
        return await this.create({
            userId,
            products,
            discountPercent,
            discountMoney,
            basketId
        });
    } 
}

mongoSchema.loadClass(OrderClass);

mongoSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
mongoSchema.set('toJSON', {
    virtuals: true
});

mongoSchema.set('toObject', {
    virtuals: true
});

const Order = mongoose.model('Order', mongoSchema);

module.exports = Order;