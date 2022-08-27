import {Schema, Types, Connection, Model} from 'mongoose';
// const Schema = mongoose;

import {objectTrain} from '../controller/db_train';
const Addresses: addressesModel = {};

type addressesModel = {
    [key: string]: modelHistory;

}

export type historyNFT = {
    amount: string;
    status: number;
    userId: string;
    userNickName: string;
    title: string;
    asset: string;
    setStartTime: number;
};
export type TypeHistoryModel = {
    _id: Types.ObjectId;
    marketpalce: string;
    productId: string;
    collectionId: string;
    title: string;
    collectionName: string;
    history: historyNFT[];
    total: number;
};
type modelHistory = Model<TypeHistoryModel>

function DynamicSchema(nameCollection: string, db: Connection, db_key: string): modelHistory {
    // console.log(db);
    if (db == undefined) {
        // process.exit(1)
    };
    let SchemaNFT;

    const history = new Schema<historyNFT, Model<historyNFT>>({
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
        SchemaNFT = new Schema<TypeHistoryModel, modelHistory>({
            _id: Schema.Types.ObjectId,
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

    } 
    // else {
    //     SchemaNFT = new Schema({
    //         _id: Schema.Types.ObjectId,
    //         marketpalce: String,
    //         productId: {type: String, index: true},
    //         title: String,
    //         history: Array,
    //         total: Number

    
    //     })

    // };
    return db.model(nameCollection, SchemaNFT);




}


function getHistoryModelNFT(prefix: string, db_key:string): Promise<modelHistory> {

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
                    console.log('await connect to ' +  db_key +' in nft_history ....');
                    getHistoryModelNFT(prefix, db_key).then(res=> {
                       resolve(res)
                   })
                }, 1000);
    
            } else {
                Addresses[`history_${prefix}`] =  DynamicSchema(`history_${prefix}`, objectTrain[db_key], db_key);

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
// module.exports = {getHistoryModelNFT};
export {getHistoryModelNFT}

