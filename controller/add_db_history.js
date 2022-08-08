const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

const { getHistoryModelNFT } = require("../model/nft_history.cjs");


async function add_history_binance_db(ele, marketpalce) {

    return new Promise(async (resolve, reject) => {
        const NFT = await getHistoryModelNFT(ele.nftInfo.contractAddress, marketpalce);
        console.log('Add DB history');
        // console.log(ele);

        // const newNFT = new NFT({
        //     marketpalce: marketpalce,
        //     history: ele?.records || [],
        //     productId: ele.productId
        // })
        // process.exit(0)
        let newWeek = new Date().getTime();
        newWeek = newWeek - 7 * 24 * 60 * 60 * 1000;



        await NFT.findOne({ productId: ele.productDetail.id }).then(async (call) => {
            if (call) {
                let date = [];
                call.history.forEach(history => {
                    date.push(history.setStartTime)
                });
                const DateMax = Math.max(...date);
                const DateMin = Math.min(...date);
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
                    //


                    // let filter = ele.records.filter(x => x.setStartTime > DateMax);
                    // if (filter.length > 0) {
                    //     console.log(call.history);
                    //     console.log(filter);
                    //     // process.exit(0)
                    // }
                    // push array db
                    // if (Array.isArray(filter)) {
                    //     let arrayPromise = [];
                    //     filter.forEach(element => {
                    //        const req = NFT.findOneAndUpdate({productId: ele.productId}, {$addToSet: {history: element}}, (err, call) => {
                    //             if (err) {
                    //                 console.log(err);
                    //                 reject(err)
                    //             }
                    //             if (call) {
                    //                 console.log('Добавили данные в историю ' + ele.productId);
                    //                 resolve()

                    //             } else {
                    //                 resolve()
                    //             }
                    //         });
                    //         arrayPromise.push(req);
                    //     });
                    //  await Promise.allSettled(arrayPromise).then(()=> resolve())

                    // } else {
                    //     resolve()

                    // }

                    let newData = { setStartTime: ele.productDetail.setStartTime, amount: ele.productDetail.amount, status: ele.productDetail.status, userNickName: ele.owner?.nickName || ele.nftInfo.owner.nickName, userId: ele.owner?.userId || null, avatarUrl: ele.owner?.avatarUrl || ele.nftInfo.owner.avatarUrl, asset: ele.productDetail.currency, title: ele.productDetail.title };
                    newDataArray.push(newData);
                    // console.log(newDataArray);
                    // { $push: { "achieve": {$each : [77,49,83 ]} } }
                    // { $addToSet: { history: elementHistory } }

                    // newDataArray.forEach(elementHistory => {
                    await NFT.findOneAndUpdate({ productId: ele.productDetail.id, 'history.setStartTime': DateMax }, { $set: { 'history.$.status': 4, collectionId: ele.productDetail.collection.collectionId } }).then(async (resCallback) => {
                        // console.log(resCallback);
                        let validation
                        try {
                            validation = resCallback.history.filter(x => x.setStartTime == newData.setStartTime);

                        } catch {
                            validation = [];
                        }
                        // console.log('validation ');
                        // console.log(validation.length == 0 && resCallback?.history.length != 0);
                        // console.log(resCallback?.history.length);

                        // console.log(validation);
                        if (validation.length == 0 && resCallback?.history.length != 0) {
                            const req = await NFT.findOneAndUpdate({ productId: ele.productDetail.id }, { $push: { "history": { $each: newDataArray } } }).then((callback) => {

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
                        } else {
                            resolve(0)

                        }



                    }).catch(e => {
                        console.log(e);
                        ele = null;

                        reject(e)
                    })

                    // });

                    // status 4 -- закрытая сделка


                    //    await NFT.findOneAndUpdate({productId: ele.productId, 'history.setStartTime': DateMax}, {$set:{'history.$.status':4}}, async (err, call) => {
                    //         if (err) {
                    //             console.log(err);
                    //             reject(err)
                    //         }
                    //         if (call) {

                    //             console.log('Обновили данные в историю ' + ele.productId);
                    //             // resolve()

                    //         } else {
                    //             resolve()
                    //         }
                    //     });



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