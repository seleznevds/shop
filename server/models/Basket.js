const mongoose = require('mongoose');

const { Schema } = mongoose;

const mongoSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId
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

class BasketClass {
    static async createNew({
        userId = null,
        products = [],
        discountPercent = 0,
        discountMoney = 0
    }) {
        return await this.create({
            userId,
            products,
            discountPercent,
            discountMoney
        });
    }

    static async update({
        userId = null,
        products = [],
        discountPercent = 0,
        discountMoney = 0,
        id
    }) {
        if (id) {
            let basket, updated;

            try {
                basket = await this.findById(id);
                if (!basket)
                    return null;

                updated = await this.updateOne({ _id: id }, {
                    userId,
                    products,
                    discountPercent,
                    discountMoney,
                });

                return updated || null;
            } catch (err) {
                return null;
            }
        }

        return null;
    }

    static async  updateProducts({
        userId = null,
        products = [],
        id
    }) {
        if (id) {
            const modifier = {  userId, products };

            try {
               let basket = await this.findOneAndUpdate( { _id: id }, { $set: modifier }, { new: true } );

                return basket || null;
            } catch (err) {
                return null;
            }
        }

        return null;
    }
}

mongoSchema.loadClass(BasketClass);

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

const Basket = mongoose.model('Basket', mongoSchema);

module.exports = Basket;