
const mongoose = require('mongoose');

// Подключения добавить в массив, в фукнуции DynamicSchema производить поиск по ключу. Для каждого выхова из функции прокидывать ключ подключения 2 аргументом.


var objectTrain = {};
(async () => {
    objectTrain['binance'] = await mongoose.createConnection('mongodb+srv://user:gBv6CPAr93ZhDrG@cluster0.1mkng.mongodb.net/binance?retryWrites=true&w=majority');
    objectTrain['mochi'] = await mongoose.createConnection('mongodb+srv://user:gBv6CPAr93ZhDrG@cluster0.1mkng.mongodb.net/mochi?retryWrites=true&w=majority');
    objectTrain['nftrade'] = await mongoose.createConnection('mongodb+srv://user:gBv6CPAr93ZhDrG@cluster0.1mkng.mongodb.net/nftrade?retryWrites=true&w=majority');
    
mongoose.connection.on('error', err => {
    console.log(err);
  });
})()


module.exports = objectTrain