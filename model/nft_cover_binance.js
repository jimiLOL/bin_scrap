const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ShemabinanceNFTCover = new Schema({
    collectionId: {
        type: String,
        required: true,
        index: true
    },
    floorPrice: Object,
    dailyTradePrice: Object,
    lastTransaction: Object,
    totalAsset: Object
})




const coverModelBinance = mongoose.model('binanceNFTCover', ShemabinanceNFTCover);
module.exports = coverModelBinance;


