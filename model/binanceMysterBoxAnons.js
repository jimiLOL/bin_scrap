const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ShemaBinanceMysterBoxAnons = new Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    description: String,
    productId: String,
    image: String,
    startTime: Date, 
    endTime: Date,
    price: Number,
    currency: String,
    status: Number,
    duration: String,
    subTitle: String,
    mappingStatus: Number, // -1 - ожидает запуска, 2 - распродано
    store: Number,
    isGray: Boolean,
    serialsNo: String,
    secondMarketSellingDelay: Number
    
})


const binanceMysterBoxAnons = mongoose.model('binanceMysterBoxAnons', ShemaBinanceMysterBoxAnons);
module.exports = binanceMysterBoxAnons;


