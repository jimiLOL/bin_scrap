const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const objectTrain = require('../controller/db_train');
const Addresses = {}


function DynamicSchema(namecollection, db, db_key) {
    if (db == undefined) {
    console.log(db);

        // process.exit(1)
    };
    let ShemaNFT;
 

    if (db_key == 'binance') {
        ShemaNFT = new Schema({
            _id: mongoose.Types.ObjectId,
            marketpalce: String,
            buyers: Array,
            chainId: {
                type: String,
                default: "56"
            },
            collection_nft: {
                collectionName: String,
                avatarUrl: String || null,
                canView: Boolean || null,
                collectionId: String
              } || null,
            collectionAddress: {
                type: String,
                required: true
            },
            collectionName: {
                type: String
            },
            tokenId: {
                type: String || null,
                required: true,
                index: true
            },
            amount: Number,
            isActive: Boolean,
            description: String,
            productId: {type: String, index: true},
            title: String,
            coverUrl: String,
            tradeType: Number,
            nftType: Number,
            currency: String,
            setStartTime: Date,
            setEndTime: Date,
            timestamp: Date,
            status: Number,
            owner: Object,
            creator: Object,
            nftInfo: Object,
            mysteryBoxProductDetailVo: Object,
            productDetail: Object
    
        })

    } else {
        ShemaNFT = new Schema({
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
                required: true,
                index: true
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

    };
    return db.model(namecollection, ShemaNFT);




}


function getAddressModel(prefix, db_key) {

    // console.log('db_key');
    // console.log(db_key);
    // // Object.keys(objectTrain).forEach(key => {
    // //     if (key == db_key) {
        

    // //     }
    // // })
    return new Promise((resolve, reject) => {
        if (!Addresses[prefix]) {
            if (objectTrain[db_key] == undefined) {
                setTimeout(() => {
                    console.log('await connect to ' +  db_key +' ....');
                    getAddressModel(prefix, db_key).then(res=> {
                       resolve(res)
                   })
                }, 1000);
    
            } else {
                Addresses[prefix] = new DynamicSchema(prefix, objectTrain[db_key], db_key);

            resolve(Addresses[prefix])

    
            }
        } else {
            resolve(Addresses[prefix])

        }
    })
    // if (!Addresses[prefix]) {
    //     Addresses[prefix] = new DynamicSchema(prefix, objectTrain[db_key], db_key)
    // }
    // return Addresses[prefix]


}



// const NftPokemon = mongoose.model('nfts', ShemaNftPokemon);
module.exports = {getAddressModel};

