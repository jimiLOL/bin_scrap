import {Schema, Types} from 'mongoose';
// const Schema = mongoose.Schema;

import { getHistoryModelNFT, TypeHistoryModel, historyNFT } from "../model/nft_history";
import fs from "fs";
import {productBinanceAll, orderSuccessAnnounces, productDetailAll, MysteryBox, records} from "./../controller/binance/get_productDetali";


async function add_history_binance_db<T extends (productBinanceAll | orderSuccessAnnounces) & (productDetailAll | MysteryBox)>(ele:T, marketpalce: string) {
    
    return new Promise(async (resolve, reject) => {
        const contractAddress = (e: productDetailAll | MysteryBox): string => {
            if (e.hasOwnProperty('productDetail')) {
             return (e as productDetailAll).nftInfo.contractAddress
        
            } else {
             return (e as MysteryBox).nftInfoDetailMgsVo.contractAddress
        
        
            }
          };
          const startTime = <T extends productDetailAll | MysteryBox>(e: T): number => {
            if (e.hasOwnProperty('productDetail')) {
                return (e as productDetailAll).productDetail.setStartTime
               } else {
                return (e as MysteryBox).productDetailMgsVo.setStartTime
           
           
               }
        };
        const getTitle = <T extends productDetailAll | MysteryBox>(e: T) => {
            if (e.hasOwnProperty('productDetail')) {
                return (e as productDetailAll).productDetail.title
               } else {
                return (e as MysteryBox).productDetailMgsVo.title
           
           
               }

        }
        const userId = <T extends productDetailAll | MysteryBox>(ele:T)=> ele.hasOwnProperty('productDetail')? '':(ele as MysteryBox).nftInfoDetailMgsVo.owner.userId;
          const getProductIdReqMongo = (e: productDetailAll | MysteryBox): string => {
            if (e.hasOwnProperty('productDetail')) {
             return String((e as productDetailAll).productDetail.id)
        
            } else {
             return (e as MysteryBox).productDetailMgsVo.id
        
        
            }
          };
          const newData = <T extends productDetailAll | MysteryBox>(ele:T)=> {
            if (ele.hasOwnProperty('productDetail')) {
                return { setStartTime: (ele as productDetailAll).productDetail.setStartTime, amount: (ele as productDetailAll).productDetail.amount, status: (ele as productDetailAll).productDetail.status, userNickName: (ele as productDetailAll).nftInfo.owner?.nickName || 'user not found', userId: userId(ele), avatarUrl: (ele as productDetailAll).nftInfo.owner?.avatarUrl || '', asset: (ele as productDetailAll).productDetail.currency, title: (ele as productDetailAll).productDetail.title };
               } else {
                return { setStartTime: (ele as MysteryBox).productDetailMgsVo.setStartTime, amount: (ele as MysteryBox).productDetailMgsVo.amount, status: (ele as MysteryBox).productDetailMgsVo.status, userNickName: (ele as MysteryBox).nftInfoDetailMgsVo.owner.nickName, userId: userId(ele), avatarUrl: (ele as MysteryBox).nftInfoDetailMgsVo.owner.avatarUrl, asset: (ele as MysteryBox).productDetailMgsVo.currency, title: (ele as MysteryBox).productDetailMgsVo.title };

           
           
               }

        };
        const collectionId = <T extends productDetailAll | MysteryBox>(ele:T)=> {
            if (ele.hasOwnProperty('productDetail')) {
                return (ele as productDetailAll).productDetail.collection.collectionId;

            } else {
                return (ele as MysteryBox).nftInfoDetailMgsVo.collectionId;


            }

        };
        const collectionName = <T extends productDetailAll | MysteryBox>(ele:T)=> {
            if (ele.hasOwnProperty('productDetail')) {
                return (ele as productDetailAll).productDetail.collection.collectionName;

            } else {
                return (ele as MysteryBox).nftInfoDetailMgsVo.collectionName;


            }

        };
        const amount = <T extends productDetailAll | MysteryBox>(ele:T)=> {
            if (ele.hasOwnProperty('productDetail')) {
                return (ele as productDetailAll).productDetail.amount;

            } else {
                return (ele as MysteryBox).productDetailMgsVo.amount;


            }

        };
        const status = <T extends productDetailAll | MysteryBox>(ele:T)=> {
            if (ele.hasOwnProperty('productDetail')) {
                return (ele as productDetailAll).productDetail.status;

            } else {
                return (ele as MysteryBox).productDetailMgsVo.status;


            }

        };
        const title = <T extends productDetailAll | MysteryBox>(ele:T)=> {
            if (ele.hasOwnProperty('productDetail')) {
                return (ele as productDetailAll).productDetail.title;

            } else {
                return (ele as MysteryBox).productDetailMgsVo.title;


            }

        };
        const newDataIsRecord = <T extends productDetailAll | MysteryBox, P extends records>(ele:T, record: P): historyNFT => {
            if (ele.hasOwnProperty('productDetail')) { 
                return { setStartTime: record.createTime, amount: record.amount, status: 4, userNickName: record.userNickName, asset: record.asset, title: (ele as productDetailAll).productDetail.title, userId: userId(ele) };

            } else {
                return { setStartTime: record.createTime, amount: record.amount, status: 4, userNickName: record.userNickName, asset: record.asset, title: (ele as MysteryBox).productDetailMgsVo.title, userId: userId(ele) };


            }

        }
        const NFT = await getHistoryModelNFT(contractAddress(ele), marketpalce);
        // console.log('Add DB history');

        let newWeek = new Date().getTime();
        newWeek = newWeek - 10 * 24 * 60 * 60 * 1000;

        console.log('=S');
        



        await NFT.findOne({ productId: getProductIdReqMongo(ele) }).then(async <T extends TypeHistoryModel | null>(call: T) => {
            if (call) {
                let date: Array<number> = [];
                call.history.forEach(history => {
                    date.push(history.setStartTime)
                });
                const DateMax = Math.max(...date);
                // const DateMin = Math.min(...date);
                const newDataArray: historyNFT[] = [];



                // console.log(ele.setStartTime + ' > ' + DateMax + ' ? ');
                // console.log(ele.setStartTime > DateMax);
             


                if (startTime(ele) > DateMax) {

                    if (Array.isArray(ele.records)) {
                        call.history.forEach(async oldHistory => {
                            if (!ele.records.some(x => x.createTime == oldHistory.setStartTime)) {

                                let newArray = ele.records.filter(xx => !(call as TypeHistoryModel).history.some(x => xx.createTime == x.setStartTime) && xx.eventType == 5);
                                console.log(newArray);
                                if (newArray.length != 0) {
                                    newArray.forEach(element => {
                                        if (!newDataArray.some(x => x.setStartTime == element.createTime)) {
                                            let newData: historyNFT = { setStartTime: element.createTime, amount: element.amount, status: 4, userNickName: element.userNickName, asset: element.asset, title: getTitle(ele), userId:  userId(ele)};
                                            newDataArray.push(newData)

                                        }


                                    });


                                }

                            }
                            let newArray = (call as TypeHistoryModel).history.filter(x => x.setStartTime == oldHistory.setStartTime && x.amount == oldHistory.amount);
                            if (newArray.length > 1) {

                                // удаляем если есть дубли
                                await NFT.findOneAndUpdate({ productId: getProductIdReqMongo(ele) || ele.productId }, { $pull: { history: { setStartTime: oldHistory.setStartTime } } }).then(deleteForTime => {
                                    // console.log(deleteForTime.history);
                                    // console.log('Удалили по времени ' + oldHistory.setStartTime + ' Из контрактка ' + ele?.nftInfo?.contractAddress + ' ProductID ' + ele.productDetail.id + '\n' + 'Было ордеров ' + call.history.length + ' Стало ' + deleteForTime.history.length);
                                }).catch(e => {
                                    console.log(e);
                                    console.log('Ошибка удаления по вермени');
                                })
                            }


                            if (!ele.records.some(x => x.createTime == oldHistory.setStartTime && newWeek > oldHistory.setStartTime)) {

                                if (startTime(ele) != oldHistory.setStartTime && oldHistory.status == 1) {
                                    // логика этого выражения,  чтобы удалить муссор из истории сделок


                                    await NFT.findOneAndUpdate({ productId: getProductIdReqMongo(ele) || ele.productId }, { $pull: { history: { setStartTime: oldHistory.setStartTime } } }).then(deleteForTime => {
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

                    


                    newDataArray.push(newData(ele));
 
                    // { $push: { "achieve": {$each : [77,49,83 ]} } }
                    // { $addToSet: { history: elementHistory } }

                    await NFT.findOneAndUpdate({ productId: getProductIdReqMongo(ele), 'history.setStartTime': DateMax }, { $set: { 'history.$.status': 4, collectionId: collectionId(ele) } }).then(async (resCallback) => {

                        // let validation
                        // try {
                        //     validation = resCallback.history.filter(x => x.setStartTime == newData.setStartTime);

                        // } catch {
                        //     validation = [];
                        // };



                        await NFT.findOneAndUpdate({ productId: getProductIdReqMongo(ele) }, { $push: { "history": { $each: newDataArray } } }).then((callback) => {

                            if (callback) {
                                // console.log('Добавили данные в историю ' + ele.productId);
                                // process.exit(0)
                                // call = 0;
                                // callback = 0;
                                // ele = null;
                                resolve(callback)

                            } else {
                                // call = 0;
                                // ele = null;

                                resolve(0)
                            }

                        }).catch(e => {
                            if (e) {
                                console.log(e);
                                // ele = null;

                                reject(e)
                            }
                        })




                    }).catch(e => {
                        console.log(e);
                        // ele = null;

                        reject(e)
                    })





                } else if (call.history.some(x => { amount(ele) != x.amount && startTime(ele) == x.setStartTime })) {
                    // переписываем цену, если были изменения 
                    console.log('=======\n переписываем цену \n=========');


                    await NFT.findOneAndUpdate({ productId: getProductIdReqMongo(ele), 'history.setStartTime': startTime(ele) }, { $set: { 'history.$.amount': amount(ele), 'history.$.status': status(ele), collectionId: collectionId(ele) } }).then((callback) => {

                        if (callback) {
                            // console.log('Обновили данные в историю ' + ele.productDetail.id);
                            // call = 0;
                            // callback = 0;
                            // ele = null;


                            resolve(callback)

                        } else {
                            // ele = null;

                            resolve(0)
                        }
                    }).catch(e => {
                        if (e) {
                            // ele = null;

                            console.log(e);
                            reject(e)
                        }

                    })


                } else if (call.history.length > 1) {

                    if (call.history.some(x => x.setStartTime < DateMax && x.status == 1)) {
                        // console.log('=======\n x.setStartTime < DateMax \n=========');

                        call.history.forEach(async (x, i) => {
                            if (x.setStartTime < DateMax && x.status == 1) {
                                

                                // let newData = { setStartTime: ele.productDetail.setStartTime, amount: ele.productDetail.amount, status: ele.productDetail.status, userNickName: ele.owner?.nickName || ele.nftInfo.owner.nickName, userId: ele.owner?.userId || null, avatarUrl: ele.owner?.avatarUrl || ele.nftInfo.owner.avatarUrl, asset: ele.productDetail.currency, title: ele.productDetail.title };
                                newDataArray.push(newData(ele));

                                await NFT.findOneAndUpdate({ productId: getProductIdReqMongo(ele), 'history.setStartTime': x.setStartTime }, { $set: { 'history.$.amount': 0, 'history.$.status': 4, collectionId: collectionId(ele) } }).then(async (callback) => {
                                    await NFT.findOneAndUpdate({ productId: getProductIdReqMongo(ele) }, { $push: { "history": { $each: newDataArray } } }).then(() => {
                                        resolve(callback)

                                    });


                                }).catch(e => {
                                    console.log(e);
                                    reject(e)

                                })
                            } else if (i == call.history.length - 1) {
                                resolve(0)

                            }

                        })


                    } else {
                        fs.appendFile(`./errorAddDBv3.txt`, `\n${new Date()}\n${JSON.stringify(ele)}`, function (error) {
                            if (error) throw error;
                            resolve(0)
                        });


                    }


                } else {
                    // call = 0;
                    // ele = null;
                    resolve(0)

               
                    // fs.appendFile(`./errorProxy.txt`, `\n${new Date()}\n${JSON.stringify(ele)}`, function (error) {
                    //     if (error) throw error;
                    //     call = 0;
                    //     ele = null;
                    //     resolve(0)
                    // });


                }
            } else {
                const newArrayRecords = [];
                // console.log(ele);

                if (Array.isArray(ele.records)) {
                    let recordsArray = ele.records.filter(x => x.eventType == 5);

                    recordsArray.forEach(record => {
                        // const newData = { setStartTime: record.createTime, amount: record.amount, status: 4, userNickName: record.userNickName, asset: record.asset, title: ele.productDetail.title };
                        newArrayRecords.push(newDataIsRecord(ele, record))


                    });


                };
                newArrayRecords.push(newData(ele))

                const binNFT = new NFT({
                    _id: new Types.ObjectId(),
                    marketpalce: marketpalce,
                    history: newArrayRecords,
                    productId: getProductIdReqMongo(ele),
                    collectionId: collectionId(ele),
                    title: title(ele),
                    collectionName: collectionName(ele),
                    total: ele.total || newArrayRecords.length

                });
                binNFT.save().then((callback) => {
                  
                    

                    if (callback) {
                        // console.log('Сохранили данные истории ' + ele.productId);
                        // console.log(binNFT);
                        // process.exit(0)
                        // ele = null;

                        resolve(callback)
                    } else {
                        // ele = null;


                        reject(0)
                    }
                }).catch(e => {
                    if (e) {
                        // ele = null;

                        // console.log(ele);
                        fs.appendFile(`./errorAddNft.txt`, `\n${new Date()}\n${JSON.stringify(ele)}\n${e}`, function (error) {
                            if (error) throw error;
                            resolve(0)
                        });
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
            fs.appendFile(`./globalErrorAddNftinDb.txt`, `\n${new Date()}\n${JSON.stringify(ele)}\n${e}`, function (error) {
                if (error) throw error;
                resolve(0)
            });
            // ele = null;

            reject(e)

        })



    })



};

// module.exports = { add_history_binance_db }
export {add_history_binance_db}