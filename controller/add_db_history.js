const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

const { getHistoryModelNFT } = require("../model/nft_history.cjs");


async function add_history_binance_db(ele, marketpalce) {

    return new Promise(async (resolve, reject) => {
        const NFT = await getHistoryModelNFT(ele.nftInfo.contractAddress, marketpalce);
        console.log('Add DB history');
       
        let newWeek = new Date().getTime();
        newWeek = newWeek - 10 * 24 * 60 * 60 * 1000;



        await NFT.findOne({ productId: ele.productDetail.id }).then(async (call) => {
            if (call) {
                let date = [];
                call.history.forEach(history => {
                    date.push(history.setStartTime)
                });
                const DateMax = Math.max(...date);
                // const DateMin = Math.min(...date);
                const newDataArray = [];

                // total это количество данных по истории сделок, мы опиремся на него, как на один из индикаторов изменений call.total < ele.total || 

                if (Array.isArray(ele.records)) {
                    call.history.forEach(async oldHistory => {
                        if (!ele.records.some(x => x.amount == oldHistory.amount)) {
                            let newArray = ele.records.filter(x => x.amount != oldHistory.amount && x.eventType == 5);
                            if (newArray.length != 0) {
                                newArray.forEach(element => {
                                    if (!newDataArray.some(x => x.setStartTime == element.createTime)) {
                                        let newData = { setStartTime: element.createTime, amount: element.amount, status: 4, userNickName: element.userNickName, asset: element.asset, title: ele.title };
                                        newDataArray.push(newData)

                                    }


                                });


                            }

                        }
                        if (!ele.records.some(x => x.createTime == oldHistory.setStartTime && newWeek > oldHistory.setStartTime)) {

                            if (ele.setStartTime != oldHistory.createTime && oldHistory.status == 1) {
                                // логика этого выражения,  чтобы удалить муссор из истории сделок
                              

                                await NFT.findOneAndUpdate({ productId: ele.productDetail.id || ele.productId }, { $pull: { history: { setStartTime: oldHistory.setStartTime } } }).then(deleteForTime => {
                                    // console.log(deleteForTime.history);
                                    // console.log('Удалили по времени ' + oldHistory.setStartTime + ' Из контрактка ' + ele?.nftInfo?.contractAddress + ' ProductID ' + ele.productDetail.id + '\n' + 'Было ордеров ' + call.history.length + ' Стало ' + deleteForTime.history.length);
                                }).catch(e => {
                                    console.log(e);
                                    console.log('Ошибка удаления по вермени');
                                })
                            }



                        }


                    })

                };
                // console.log(ele.setStartTime + ' > ' + DateMax + ' ? ');
                // console.log(ele.setStartTime > DateMax);


                if (ele.setStartTime > DateMax) {
                   

                    let newData = { setStartTime: ele.productDetail.setStartTime, amount: ele.productDetail.amount, status: ele.productDetail.status, userNickName: ele.owner?.nickName || ele.nftInfo.owner.nickName, userId: ele.owner?.userId || null, avatarUrl: ele.owner?.avatarUrl || ele.nftInfo.owner.avatarUrl, asset: ele.productDetail.currency, title: ele.productDetail.title };
                    newDataArray.push(newData);
                    // console.log(newDataArray);
                    // { $push: { "achieve": {$each : [77,49,83 ]} } }
                    // { $addToSet: { history: elementHistory } }

                    await NFT.findOneAndUpdate({ productId: ele.productDetail.id, 'history.setStartTime': DateMax }, { $set: { 'history.$.status': 4, collectionId: ele.productDetail.collection.collectionId } }).then(async (resCallback) => {
                      
                           await NFT.findOneAndUpdate({ productId: ele.productDetail.id }, { $push: { "history": { $each: newDataArray } } }).then((callback) => {

                                if (callback) {
                                    console.log('Добавили данные в историю ' + ele.productId);
                                    // process.exit(0)
                                    call = 0;
                                    callback = 0;
                                    ele = null;
                                    resolve(callback)

                                } else {
                                    call = 0;
                                    ele = null;

                                    resolve(0)
                                }

                            }).catch(e => {
                                if (e) {
                                    console.log(e);
                                    ele = null;

                                    reject(e)
                                }
                            })
                       



                    }).catch(e => {
                        console.log(e);
                        ele = null;

                        reject(e)
                    })

                    



                } else if (call.history.some(x => { ele.amount != x.amount && ele.setStartTime == x.setStartTime })) {
                    // переписываем цену, если были изменения 
                    console.log('=======\n переписываем цену \n=========');


                    await NFT.findOneAndUpdate({ productId: ele.productDetail.id, 'history.setStartTime': ele.setStartTime }, { $set: { 'history.$.amount': ele.amount, 'history.$.status': ele.status, collectionId: ele.productDetail.collection.collectionId } }).then((callback) => {

                        if (callback) {
                            console.log('Обновили данные в историю ' + ele.productDetail.id);
                            call = 0;
                            callback = 0;
                            ele = null;


                            resolve(callback)

                        } else {
                            ele = null;

                            resolve(0)
                        }
                    }).catch(e => {
                        if (e) {
                            ele = null;

                            console.log(e);
                            reject(e)
                        }

                    })


                } else if (call.history.length > 1) {

                    if (call.history.some(x => x.setStartTime < DateMax && x.status == 1)) {
                        console.log('=======\n x.setStartTime < DateMax \n=========');

                        call.history.forEach(async (x, i) => {
                            if (x.setStartTime < DateMax && x.status == 1) {

                                await NFT.findOneAndUpdate({ productId: ele.productDetail.id, 'history.setStartTime': x.setStartTime }, { $set: { 'history.$.amount': 0, 'history.$.status': 4, collectionId: ele.productDetail.collection.collectionId } }).then((callback) => {
                                    resolve(callback)


                                }).catch(e => {
                                    console.log(e);
                                    reject(e)

                                })
                            } else if (i == call.history.length - 1) {
                                resolve(0)

                            }

                        })


                    } else {
                        resolve(0)


                    }


                } else {

                    call = 0;
                    ele = null;


                    resolve(0)
                }
            } else {
                const newArrayRecords = [];
                // console.log(ele);

                if (Array.isArray(ele.records)) {
                    let recordsArray = ele.records.filter(x => x.eventType == 5);

                    recordsArray.forEach(record => {
                        const newData = { setStartTime: record.createTime, amount: record.amount, status: 4, userNickName: record.userNickName, asset: record.asset, title: ele.productDetail.title };
                        newArrayRecords.push(newData)


                    });


                };
                newArrayRecords.push({ setStartTime: ele.setStartTime, amount: ele.amount, status: ele.productDetail.status, userNickName: ele.owner?.nickName || ele.nftInfo.owner.nickName, userId: ele.owner?.userId || null, avatarUrl: ele.owner?.avatarUrl || ele.nftInfo.owner.avatarUrl, asset: ele.currency, title: ele.productDetail.title })

                const binNFT = new NFT({
                    _id: new mongoose.Types.ObjectId(),
                    marketpalce: marketpalce,
                    history: newArrayRecords,
                    productId: ele.productDetail.id,
                    collectionId: ele.productDetail.collection.collectionId,
                    title: ele.productDetail.title,
                    collectionName: ele.productDetail.collection.collectionName,
                    total: ele.total || newArrayRecords.length

                });
                binNFT.save().then((callback) => {

                    if (callback) {
                        // console.log('Сохранили данные истории ' + ele.productId);
                        // console.log(binNFT);
                        // process.exit(0)
                        ele = null;

                        resolve(callback)
                    } else {
                        ele = null;


                        reject(0)
                    }
                }).catch(e => {
                    if (e) {
                        ele = null;

                        // console.log(ele);
                        console.log('Не удалось сохранить данные истории');
                        console.log(e);
                        // process.exit(0)
                        reject(e)
                        // process.exit(1)
                    };
                })


            }

        }).catch(e => {
            console.log(e);
            ele = null;

            reject(e)

        })



    })



};

module.exports = { add_history_binance_db }