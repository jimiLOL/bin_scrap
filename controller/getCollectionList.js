const { MongoClient } = require('mongodb');
const mongoose = require("mongoose");

// const objectTrain = require('./db_train');
require("dotenv/config");
let obJectClient = {};
obJectClient['binance'] = new MongoClient(process.env.BINANCE_DB);
obJectClient['mochi'] = new MongoClient(process.env.MOCHI_DB);
obJectClient['nftrade'] = new MongoClient(process.env.NFTRADE_DB);
let connectClient = {};


function connect(db_name) {
    return new Promise(async (resolve) => {
        if (!connectClient.hasOwnProperty(db_name)) {
            connectClient[db_name] = await obJectClient[db_name].connect();
            resolve(connectClient[db_name])


        } else {
            resolve(connectClient[db_name])


        }


        //    const client =  await obJectClient[db_name].connect();
    })



}

async function getListCollection(db_name) {
    return new Promise(async (resolve, reject) => {
        let arrayCollections = [];



        const client = await connect(db_name);

        const db = client.db(db_name);
        // console.log();
        db.listCollections().toArray(function (err, names) {
            if (err) {
                console.log(err);
            }
            else {
                names.forEach(function (e, i, a) {

                    if (/^0x[0-9a-fA-F]{40}$/.exec(e.name)) {
                        // console.log("--->>", e.name);

                        arrayCollections.push(e.name)
                    }
                });
                resolve(arrayCollections)
            }
        });
    })



}

function getListCollectionName(db_key) {
    return new Promise(async (resolve, reject) => {
        if (!obJectClient.hasOwnProperty(db_key)) {
            setTimeout(() => {
                console.log('await connect to ' + db_key + ' in getCollection list....');
                getListCollectionName(db_key).then(res => {
                    resolve(res)
                })
            }, 1000);

        } else {
            console.log('connect to ' + db_key);

            resolve(await getListCollection(db_key))
        }
    })

}

module.exports = { getListCollectionName }