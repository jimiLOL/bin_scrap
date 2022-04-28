const { MongoClient } = require('mongodb');
const mongoose = require("mongoose");

const objectTrain = require('./db_train');
require("dotenv/config");

const client = new MongoClient(process.env.BINANCE_DB);

async function getListCollection(db_name) {
    console.log(db_name);

    await client.connect();
    const db = client.db(db_name);
    // console.log();
    db.listCollections().toArray(function (err, names) {
        if (err) {
            console.log(err);
        }
        else {
            names.forEach(function (e, i, a) {
                console.log("--->>", e.name);
            });
        }
    });

    // mongoose.connection.on('connected', function (ref) {
    //     console.log('Connected to mongo server.');
    //     // trying to get collection names
    //     mongoose.connection.db.listCollections().toArray(function (err, names) {
    //         console.log(names); // [{ name: 'dbname.myCollection' }]
    //         module.exports.Collection = names;
    //     });
    // })

// const collections = Object.keys(mongoose.connection.collections);
// console.log(collections);

    // const collections = Object.keys(mongoose.connections[2].collections);
    // let collection = objectTrain[db];
    // console.log(collection);
    // // collection.db.listCollections.then((names) => {
    // //     console.log(names);
    // // })
    // console.log(collections);
    // await collection.connection.listCollections().toArray(function (err, names) {
    //     if (err) {
    //         console.log(err);
    //     }
    //     else {
    //         names.forEach(function (e, i, a) {
    //             mongoose.connection.db.dropCollection(e.name);
    //             console.log("--->>", e.name);
    //         });
    //     }
    // });
}

function getListCollectionName(db_key) {
    return new Promise((resolve, reject) => {
        if (!objectTrain.hasOwnProperty(db_key)) {
            setTimeout(() => {
                console.log('await connect to ' + db_key + ' ....');
                getListCollectionName(db_key).then(res => {
                    resolve(res)
                })
            }, 1000);

        } else {
            console.log('connect to ' + db_key);

            resolve(getListCollection(db_key))
        }
    })

}

module.exports = { getListCollectionName }