
const mongoose = require('mongoose');
require("dotenv/config");

// Подключения добавить в массив, в фукнуции DynamicSchema производить поиск по ключу. Для каждого выхова из функции прокидывать ключ подключения 2 аргументом.


var objectTrain = {};
(async () => {
 
    objectTrain['binance'] = await mongoose.createConnection(process.env.BINANCE_DB);
    objectTrain['mochi'] = await mongoose.createConnection(process.env.MOCHI_DB);
    objectTrain['nftrade'] = await mongoose.createConnection(process.env.NFTRADE_DB);

  //   objectTrain['binance'].db.listCollections().then((names) => {
  //     console.log(names);
  // })

    
mongoose.connection.on('error', err => {
    console.log(err);
  });
  mongoose.connection.on('connected', (ref) => {
    console.log('Open');
    console.log(ref);
    const collections = Object.keys(mongoose.connection.collections);
    console.log(collections);
  
    
  //   .listCollections().then((names) => {
  //     console.log(names);
  // })
  });
})()


module.exports = objectTrain