const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

const { getHistoryModelNFT } = require("../model/nft_history.cjs");


async function add_history_binance_db(ele, marketpalce) {

    return new Promise(async (resolve, reject) => {
        const NFT = await getHistoryModelNFT(ele.nftInfo.contractAddress, marketpalce);

        // const newNFT = new NFT({
        //     marketpalce: marketpalce,
        //     history: ele?.records || [],
        //     productId: ele.productId
        // })
        // process.exit(0)

        await NFT.findOne({ productId: ele.productId }).then(async (call) => {
            if (call) {
                let date = [];
                call.history.forEach(history => {
                    date.push(history.setStartTime)
                });
                let DateMax = Math.max(...date);
                let newDataArray = [];

                // total это количество данных по истории сделок, мы опиремся на него, как на один из индикаторов изменений call.total < ele.total || 

                if (Array.isArray(ele.records)) {
                    call.history.forEach(oldHistory => {
                        if (!ele.records.some(x => x.amount == oldHistory.amount)) {
                            let newArray = ele.records.filter(x => x.amount != oldHistory.amount && x.eventType == 5);
                            if (newArray.length != 0) {
                                newArray.forEach(element => {
                                    if (!newDataArray.some(x => x.setStartTime == element.createTime)) {
                                        let newData = { setStartTime: element.createTime, amount: element.amount, status: 4, userNickName: element.userNickName, asset: element.asset };
                                        newDataArray.push(newData)

                                    }


                                });


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

                    let newData = { setStartTime: ele.setStartTime, amount: ele.amount, status: ele.status, userNickName: ele.owner?.nickName || ele.nftInfo.owner.nickName, userId: ele.owner?.userId || null, avatarUrl: ele.owner?.avatarUrl || ele.nftInfo.owner.avatarUrl, asset: ele.currency };
                    newDataArray.push(newData);
                    // { $push: { "achieve": {$each : [77,49,83 ]} } }
                    // { $addToSet: { history: elementHistory } }

                    // newDataArray.forEach(elementHistory => {
                    await NFT.findOneAndUpdate({ productId: ele.productId, 'history.setStartTime': DateMax }, { $set: { 'history.$.status': 4 } }).then(async () => {
                        const req = await NFT.findOneAndUpdate({ productId: ele.productId }, { $push: { "history": { $each: newDataArray } } }).then((callback) => {
                            if (callback) {
                                console.log('Добавили данные в историю ' + ele.productId);
                                // process.exit(0)
                                call = 0;
                                callback = 0;
                                ele = null;
                                resolve()

                            } else {
                                call = 0;
                                ele = null;

                                resolve()
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



                } else if (ele.amount != call?.history[call.history - 1]?.amount && ele.setStartTime == call?.history[call.history - 1]?.setStartTime) {
                    await NFT.findOneAndUpdate({ productId: ele.productId, 'history.setStartTime': ele.setStartTime }, { $set: { 'history.$.amount': ele.amount, 'history.$.status': ele.status } }).then((callback) => {

                        if (callback) {
                            console.log('Обновили данные в историю ' + ele.productId);
                            call = 0;
                            callback = 0;
                            ele = null;


                            resolve()

                        } else {
                            ele = null;

                            resolve()
                        }
                    }).catch(e => {
                        if (e) {
                            ele = null;

                            console.log(e);
                            reject(e)
                        }

                    })


                } else {

                    call = 0;
                    ele = null;


                    resolve()
                }
            } else {
                let newArrayRecords = [];
                // console.log(ele);

                if (Array.isArray(ele.records)) {
                    let recordsArray = ele.records.filter(x => x.eventType == 5);

                    recordsArray.forEach(record => {
                        let newData = { setStartTime: record.createTime, amount: record.amount, status: 4, userNickName: record.userNickName, asset: record.asset };
                        newArrayRecords.push(newData)


                    });


                };
                newArrayRecords.push({ setStartTime: ele.setStartTime, amount: ele.amount, status: ele.status, userNickName: ele.owner?.nickName || ele.nftInfo.owner.nickName, userId: ele.owner?.userId || null, avatarUrl: ele.owner?.avatarUrl || ele.nftInfo.owner.avatarUrl, asset: ele.currency })

                const binNFT = new NFT({
                    _id: new mongoose.Types.ObjectId(),
                    marketpalce: marketpalce,
                    history: newArrayRecords,
                    productId: ele.productId,
                    total: ele.total || newArrayRecords.length

                });
                binNFT.save().then((callback) => {

                    if (callback) {
                        console.log('Сохранили данные истории ' + ele.productId);
                        // console.log(binNFT);
                        // process.exit(0)
                        ele = null;

                        resolve()
                    } else {
                        ele = null;


                        reject()
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

        // NFT.findOne({ productId: ele.productId }, async (err, call) => {
        //     if (err) {
        //         console.log(err);
        //         reject(err)
        //     }
        //     if (call) {
        //         let date = [];
        //         call.history.forEach(history => {
        //             date.push(history.setStartTime)
        //         });
        //         let DateMax = Math.max(...date);

        //         // total это количество данных по истории сделок, мы опиремся на него, как на один из индикаторов изменений

        //         if (call.total < ele.total || ele.setStartTime > DateMax) {
        //             //


        //             // let filter = ele.records.filter(x => x.setStartTime > DateMax);
        //             // if (filter.length > 0) {
        //             //     console.log(call.history);
        //             //     console.log(filter);
        //             //     // process.exit(0)
        //             // }
        //             // push array db
        //             // if (Array.isArray(filter)) {
        //             //     let arrayPromise = [];
        //             //     filter.forEach(element => {
        //             //        const req = NFT.findOneAndUpdate({productId: ele.productId}, {$addToSet: {history: element}}, (err, call) => {
        //             //             if (err) {
        //             //                 console.log(err);
        //             //                 reject(err)
        //             //             }
        //             //             if (call) {
        //             //                 console.log('Добавили данные в историю ' + ele.productId);
        //             //                 resolve()

        //             //             } else {
        //             //                 resolve()
        //             //             }
        //             //         });
        //             //         arrayPromise.push(req);
        //             //     });
        //             //  await Promise.allSettled(arrayPromise).then(()=> resolve())

        //             // } else {
        //             //     resolve()

        //             // }

        //             let newData = {setStartTime:ele.setStartTime,amount:ele.amount,status:ele.status};

        //             // status 4 -- закрытая сделка
        //             await NFT.updateOne({productId: ele.productId, 'history.setStartTime': DateMax}, {$set:{'history.$.status':4}}).then(async () => {
        //                 const req = await NFT.findOneAndUpdate({productId: ele.productId}, {$addToSet: {history: newData}}, (err, call) => {
        //                     if (err) {
        //                         console.log(err);
        //                         reject(err)
        //                     }
        //                     if (call) {
        //                         console.log('Добавили данные в историю ' + ele.productId);
        //                         resolve()

        //                     } else {
        //                         resolve()
        //                     }
        //                 });

        //             }).catch(e=> {
        //                 console.log(e);
        //                 reject(err)
        //             })

        //         //    await NFT.findOneAndUpdate({productId: ele.productId, 'history.setStartTime': DateMax}, {$set:{'history.$.status':4}}, async (err, call) => {
        //         //         if (err) {
        //         //             console.log(err);
        //         //             reject(err)
        //         //         }
        //         //         if (call) {

        //         //             console.log('Обновили данные в историю ' + ele.productId);
        //         //             // resolve()

        //         //         } else {
        //         //             resolve()
        //         //         }
        //         //     });



        //         } else {
        //             resolve()
        //         }
        //     } else if(ele.amount != call?.history[call.history-1]?.amount && ele.setStartTime == call?.history[call.history-1]?.setStartTime) {
        //         const req = NFT.findOneAndUpdate({productId: ele.productId, 'history.setStartTime': ele.setStartTime}, {$set:{'history.$.amount':ele.amount, 'history.$.status':ele.status}}, (err, call) => {
        //             if (err) {
        //                 console.log(err);
        //                 reject(err)
        //             }
        //             if (call) {
        //                 console.log('Обновили данные в историю ' + ele.productId);
        //                 resolve()

        //             } else {
        //                 resolve()
        //             }
        //         });

        //     } else {
        //         const binNFT = new NFT({
        //             _id: new mongoose.Types.ObjectId(),
        //             marketpalce: marketpalce,
        //             history: [{setStartTime:ele.setStartTime,amount:ele.amount,status:ele.status}],
        //             productId: ele.productId,
        //             total: ele.total

        //         });
        //         binNFT.save((err, callback) => {
        //             if (err) {
        //                 console.log('Не удалось сохранить данные истории');
        //                 console.log(err);
        //                 reject()
        //                 // process.exit(1)
        //             };
        //             if (callback) {
        //                 // console.log('Сохранили данные истории');
        //                 // console.log(binNFT);
        //                 // process.exit(0)
        //                 resolve()
        //             } else {
        //                 reject()
        //             }
        //         })

        //     }
        // }).clone()


    })



};

module.exports = { add_history_binance_db }