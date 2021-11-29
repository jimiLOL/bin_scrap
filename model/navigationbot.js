const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Addresses = {}

function DynamicSchema(namecollection) {
const ShemaNftPokemon = new Schema({
    _id: mongoose.Types.ObjectId,
    marketpalce: String,
        buyers: Array,
        buyTimes: Array,
        chainId: {
            type: String,
            default: "56"
        },
        sellId: Number,
        collectionAddress: {
            type: String,
            required: true
        },
        collectionName: {
            type: String
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
        otherSellOrders: Array,
        assetData: Object,
        last_sell: String,
        last_sell_at: Date
    
})
return mongoose.model(namecollection, ShemaNftPokemon);
}


function getAddressModel(prefix) {
    if (!Addresses[prefix]) {
      Addresses[prefix] =  new DynamicSchema(prefix)
    }
    return Addresses[prefix]
  }
  


// const NftPokemon = mongoose.model('nfts', ShemaNftPokemon);
module.exports = getAddressModel;

