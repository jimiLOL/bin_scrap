const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const objectTrain = require('../controller/db_train');
const Addresses = {}


function DynamicSchema(namecollection, db, db_key) {
    // console.log(db);
    if (db == undefined) {
        process.exit(1)
    };
    let ShemaNFT;
 

    if (db_key == 'binance') {
        ShemaNFT = new Schema({
            _id: mongoose.Types.ObjectId,
            marketpalce: String,
            productId: String,
            history: Array,
            total: {
                required: true,
                type: Number
            }
        })

    } else {
        ShemaNFT = new Schema({
            _id: mongoose.Types.ObjectId,
            marketpalce: String,
            productId: String,
            history: Array,
            total: Number

    
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
    if (!Addresses[`history_${prefix}`]) {
        Addresses[`history_${prefix}`] = new DynamicSchema(`history_${prefix}`, objectTrain[db_key], db_key)
    }
    return Addresses[`history_${prefix}`]


}



// const NftPokemon = mongoose.model('nfts', ShemaNftPokemon);
module.exports = getAddressModel;

