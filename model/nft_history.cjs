const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const objectTrain = require('../controller/db_train');
const Addresses = {}


function DynamicSchema(namecollection, db, db_key) {
    // console.log(db);
    if (db == undefined) {
        // process.exit(1)
    };
    let ShemaNFT;

    const history = new Schema({
        amount: {
            type: String,
           required: true
        },
        status: Number,
        userId: String,
        userNickName: {
            type: String,
           required: true
        },
        title: String,
        asset: String,
        setStartTime: {
            type: Number,
            required: true
        }
    });
 

    if (db_key == 'binance') {
        ShemaNFT = new Schema({
            _id: mongoose.Types.ObjectId,
            marketpalce: String,
            productId: {type: String, index: true},
            collectionId: String,
            title: String,
            collectionName: String,
            history: [history],
            total: {
                required: true,
                type: Number
            }
        })

    } else {
        ShemaNFT = new Schema({
            _id: mongoose.Types.ObjectId,
            marketpalce: String,
            productId: {type: String, index: true},
            title: String,
            history: Array,
            total: Number

    
        })

    };
    return db.model(namecollection, ShemaNFT);




}


function getHistoryModelNFT(prefix, db_key) {

    // console.log('db_key');
    // console.log(db_key);
    // // Object.keys(objectTrain).forEach(key => {
    // //     if (key == db_key) {
        

    // //     }
    // // })
    return new Promise((resolve, reject) => {
        if (!Addresses[`history_${prefix}`]) {
            if (objectTrain[db_key] == undefined) {
                setTimeout(() => {
                    console.log('await connect to ' +  db_key +' ....');
                    getHistoryModelNFT(prefix, db_key).then(res=> {
                       resolve(res)
                   })
                }, 1000);
    
            } else {
                Addresses[`history_${prefix}`] = new DynamicSchema(`history_${prefix}`, objectTrain[db_key], db_key);

            resolve(Addresses[`history_${prefix}`])

    
            }
        } else {
            resolve(Addresses[`history_${prefix}`])

        }
    })

    // if (!Addresses[`history_${prefix}`]) {
    //     Addresses[`history_${prefix}`] = new DynamicSchema(`history_${prefix}`, objectTrain[db_key], db_key)
    // }
    // return Addresses[`history_${prefix}`]


}



// const NftPokemon = mongoose.model('nfts', ShemaNftPokemon);
module.exports = {getHistoryModelNFT};

