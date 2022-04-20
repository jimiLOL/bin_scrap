
const mongoose = require('mongoose');
require("dotenv/config");

// Подключения добавить в массив, в фукнуции DynamicSchema производить поиск по ключу. Для каждого выхова из функции прокидывать ключ подключения 2 аргументом.


var objectTrain = {};
(async () => {
    objectTrain['binance'] = await mongoose.createConnection(process.env.BINANCE_DB);
    objectTrain['mochi'] = await mongoose.createConnection(process.env.MOCHI_DB);
    objectTrain['nftrade'] = await mongoose.createConnection(process.env.NFTRADE_DB);
    
mongoose.connection.on('error', err => {
    console.log(err);
  });
})()


module.exports = objectTrain