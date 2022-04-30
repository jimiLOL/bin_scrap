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

        NFT.findOne({ productId: ele.productId }, async (err, call) => {
            if (err) {
                console.log(err);
                reject(err)
            }
            if (call) {
                let date = [];
                call.history.forEach(history => {
                    date.push(history.setStartTime)
                });
                let DateMax = Math.max(...date);

                // total это количество данных по истории сделок, мы опиремся на него, как на один из индикаторов изменений
                
                if (call.total < ele.total || ele.setStartTime > DateMax) {
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

                    let newData = {setStartTime:ele.setStartTime,amount:ele.amount,status:ele.status};

                    const req = NFT.findOneAndUpdate({productId: ele.productId}, {$addToSet: {history: newData}}, (err, call) => {
                        if (err) {
                            console.log(err);
                            reject(err)
                        }
                        if (call) {
                            console.log('Добавили данные в историю ' + ele.productId);
                            resolve()
                            
                        } else {
                            resolve()
                        }
                    });
                    
                } else {
                    resolve()
                }
            } else {
                const binNFT = new NFT({
                    _id: new mongoose.Types.ObjectId(),
                    marketpalce: marketpalce,
                    history: [{setStartTime:ele.setStartTime,amount:ele.amount,status:ele.status}],
                    productId: ele.productId,
                    total: ele.total

                });
                binNFT.save((err, callback) => {
                    if (err) {
                        console.log('Не удалось сохранить данные истории');
                        console.log(err);
                        reject()
                        // process.exit(1)
                    };
                    if (callback) {
                        console.log('Сохранили данные истории');
                        // console.log(binNFT);
                        // process.exit(0)
                        resolve()
                    } else {
                        reject()
                    }
                })

            }
        })

    
    })



};

module.exports = {add_history_binance_db}