const mongoose = require("mongoose");

const objectTrain = require('./db_train');

// mongoose.connection.on('connected', function (ref) {
//     console.log('Connected to mongo server.');
//     // trying to get collection names
//     mongoose.connection.db.listCollections().toArray(function (err, names) {
//         console.log(names); // [{ name: 'dbname.myCollection' }]
//         module.exports.Collection = names;
//     });
// })

async function getListCollection(db) {
    const collections = Object.keys(mongoose.connections[2].collections);
    // let collection = objectTrain[db];
    console.log(collections);
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