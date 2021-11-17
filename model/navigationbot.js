const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ShemaNftPokemon = new Schema({
    _id: mongoose.Types.ObjectId,
        buyers: Array,
        buyTimes: Array,
        chainId: {
            type: String,
            default: "56"
        },
        sellId: Number,
        collectionAddress: {
            type: String,
            default: '0xc33d69a337b796a9f0f7588169cd874c3987bde9'
        },
        collectionName: {
            type: String,
            default: 'Kryptomon'
        },
        tokenId: {
            type: String || null,
            required: true
        },
        amount: Number,
        soldAmount: Number,
        seller: String,
        price: Number,
        token: {
            type: String,
            default: '0x0000000000000000000000000000000000000000'
        },
        isActive: Boolean,
        sellTime: Date,
        image: String,
        video: String,
        name: String,
        description: String,
        tokenURI: String,
        thumb: String,
        attributes: Array,
        extraMetadata: Array,
        otherSellOrders: Array
    
})





const NftPokemon = mongoose.model('nfts', ShemaNftPokemon);
module.exports = NftPokemon;

