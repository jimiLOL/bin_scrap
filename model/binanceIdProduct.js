const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ShemabinanceIdProduct = new Schema({
    productId: String,
    title: String,
    contractAddress: String,
    tokenId: {
        type: String,
        required: true
    },
    status: Number,
    amount: String
})


const binanceIdProduct = mongoose.model('binanceIdProduct', ShemabinanceIdProduct);
module.exports = binanceIdProduct;


