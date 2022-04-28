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

        NFT.findOne({ productId: ele.productId }, (err, call) => {
            if (err) {
                console.log(err);
                reject(err)
            }
            if (call) {
                if (call.total < ele.total) {
                    //
                    let date = [];
                    call.history.forEach(history => {
                        date.push(history.createTime)
                    });
                    let DateMax = Math.max(...date);

                    let filter = ele.records.filter(x => x.createTime > DateMax);
                    if (filter.length > 0) {
                        console.log(call.history);
                        console.log(filter);
                        // process.exit(0)
                    }
                    // push array db
                    if (Array.isArray(filter)) {
                        filter.forEach(element => {
                            NFT.findOneAndUpdate({productId: ele.productId}, {$addToSet: {history: element}}, (err, call) => {
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
                            })
                        });
                    } else {
                        resolve()

                    }
                    
                } else {
                    resolve()
                }
            } else {
                const binNFT = new NFT({
                    _id: new mongoose.Types.ObjectId(),
                    marketpalce: marketpalce,
                    history: ele?.records || [],
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