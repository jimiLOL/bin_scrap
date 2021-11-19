const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ShemaPrice = new Schema({
nft: String,
BNB: Number,
priceBuy_0: Number,
priceBuy_1: Number,
priceBuy_2: Number,
priceBuy_3: Number

})


const PriceDB = mongoose.model('price', ShemaPrice);
module.exports = PriceDB;


