
const { getListCollectionName } = require('../getCollectionList');
const { getAddressModel } = require("../../model/nft_detalii");

const { default: axios } = require("axios");
const tunnel = require("tunnel");
const { getProductDetail } = require('./get_productDetali'); 
const { getProxy } = require("../../get_proxyInit");
const proxy = getProxy('switchChangeOrderNft');
const { UA } = require("../../ua");
const {helper} = require('../helper/helper');

const Emitter = require("events");
const emitter = new Emitter();
let emitFunction;

let proxyLength = proxy.length;

let stackProxy = {};

const arrayIterator = arr => ({
    [Symbol.asyncIterator]() {
        let i = arr.length;
        //   // console.log(i);
        return {
            index: 0,
            async next() {
                // console.log('=========================== ' + this.index + ' index iterator =================================================');
                if (this.index < proxyLength) {
                    //   // console.log(this.index, arr.length);

                    return await awaitArray(arr[this.index++], --i);

                } else {
                    return { done: true }

                }

            }
        }
    }
})
const awaitArray = (val, length) => {
  
    stackProxy[val] = { status: 'init', integer: 0 };
    // let integer = 0; //  
    return new Promise((resolve) => {
        function recursion() {
            return new Promise((resolve) => {
                if (proxy.length != proxyLength && length > 0) {
                    //    console.log('leng != length ' + proxy.length, proxyLength);


                    helper.timeout(2000).then(() => {
                        if (stackProxy[val].status == 'work') {
                            stackProxy[val].integer++

                        }

                        if (stackProxy[val].integer > 10000) {
                            stackProxy[val].integer = 0;
                            emitter.emit('infinity_recursion', { status: true, integer: stackProxy[val].integer, val: val });
                        }


                        proxy.forEach((ele, i) => {
                            let filter = proxy.filter(x => x == ele);
                            if (filter.length > 1) {
                                proxy.splice(i, 1);
                            }

                        });



                        recursion().then((res) => {
                            stackProxy[val].integer = 0;

                            return resolve(res)
                        })
                    })


                } else if (length < 0) {
                    stackProxy[val].integer = 0;

                    resolve({ done: true })

                } else {
                    stackProxy[val].integer = 0;

                    resolve({ value: val, done: false })
                }
            })


        };
        setTimeout(() => {
            recursion().then((res) => {
                return resolve(res)
            })
        }, 502);



    })
}

function iterationCollection(arrayDocument, header) {
    console.log('Worker cycle Change Order NFT');
    return new Promise(async (resolve) => {
        if (arrayDocument.length == 0) {
            resolve()
        }
        
        let arrayPromise = [];
        helper.shuffle(UA);
        helper.shuffle(proxy);
        arrayDocument.forEach((element, i) => {
            let pIndex = helper.getRandomInt(1, proxy.length - 1);
            const { host: proxyHost, port: portHost, proxyAuth: proxyAuth } = helper.proxyInit(proxy[pIndex]);


            


            let proxyOptions = {
                host: proxyHost,
                port: portHost,
                // proxyAuth: proxyAuth,
                headers: {
                    'User-Agent': UA[helper.getRandomInt(1, UA.length - 1)]
                },
            };
            let agent = tunnel.httpsOverHttp({
                proxy: proxyOptions,
                rejectUnauthorized: false,
            });

            proxy.splice(pIndex, 1);
            header["user-agent"] = UA[helper.getRandomInt(1, UA.length - 1)];

            if (element?.productId != undefined) {
                arrayPromise.push(getProductDetail(element, agent, header).then((res) => {
                    console.log('res ' + res);
                    proxy.push(`${proxyOptions.host}:${proxyOptions.port}`);
                    return resolve()
                }).catch((e) => {
                    console.log('Error ' + e);
                    proxy.push(`${proxyOptions.host}:${proxyOptions.port}`);
                    return reject()

                }));


            } else {
                console.log('(((');
                console.log(element);
                proxy.push(`${proxyOptions.host}:${proxyOptions.port}`);

                 


            }


        });
 


        
        await Promise.allSettled(arrayPromise).then((result) => {
            let newDate = new Date();
            console.log(newDate + ' Worker Change Order Status NFT -- Promisee array Fulfil = ' + arrayPromise.length);
            console.log(result);

            resolve()
        }).catch(() => {
            resolve()
        })

    })
}

function getlayerList(arrayCollections, header) {
    return new Promise((resolve) => {
        let layerList = [];
        let iteration = 0;

        arrayCollections.forEach(async (collection) => {
            const NFT = await getAddressModel(collection, 'binance');
            await NFT.find({ status: 1 }, { productId: 1 }).then(async (call) => {

                if (call) {
                    let inw = Math.ceil(call.length / 100);
                    let index = 0;
             
                        let newArray = 0;
                        for await (const proxyVar of arrayIterator(proxy)) {
                            index++

                            stackProxy[proxyVar].status = 'work';

                            if (call.length > 100) {
                                newArray = call.slice((100 * index) - 100, 100 * index);
                                // console.log('newArray length = ' + newArray.length);
    
    
    
                                await iterationCollection(newArray, header)
    
                            } else {
                                newArray = call.slice(0, call.length - 1);
                                // console.log('newArray length = ' + newArray.length);
    
                                await iterationCollection(newArray, header)
    
                            }
                            if (newArray.length == 0 || index > inw) {
                                    stackProxy[proxyVar].status = 'off';

                                break
                            }


                        }

                       

              





                };
                iteration++
                if (iteration == arrayCollections.length - 1) {
                    console.log('Fulfuit');
                    resolve(layerList)
                }
            }).catch(e => {
                console.log(e);
            });




        });


    })
}

function start(header) {
    return new Promise(async (resolve, reject) => {
        emitFunction = emitter.on('infinity_recursion', (message) => {
            let magicVal = 0; // что бы не долбитть в емитор по 100 раз
            if (message.status && magicVal < 2) {
                reject({ status: 'error', name_worker: 'binance_marketplace_lastorder', integer: message.integer })
    
            }
    
        });
        // port.on('message', async (message) => {
        //     if (Array.isArray(message)) {
        //         console.log(message.length);
       

        //     } else { 
        //         console.log('message');

        //     }
        //   }); // получаем сообщение из основного потока



        let arrayCollections = await getListCollectionName('binance');

        await Promise.all([getlayerList(arrayCollections, header)]).then(() => {
            resolve()
        }).catch(() => {
            reject()
        });


    })
}

// function init(init_header) {
//     return new Promise((resolve, reject) => {
//         start(init_header).then((res) => {
//             console.log('Worker switchChangeOrderNft');
//             console.log(res);
      

//             emitter.removeAllListeners('infinity_recursion');

//             resolve(res);

//             // init(init_header)
//         }).catch(e => {
//             console.log('Error Worker switchChangeOrderNft');
 
//             emitter.removeAllListeners('infinity_recursion');

//             reject(e);
//             // init(init_header)
//         })
//     })

// }


// module.exports = { init }



module.exports = ({init_header, proxyArray}) => {
    return new Promise((resolve, reject) => {
        console.log('Worker switchChangeOrderNft init');
  
    
 
       

        start(init_header).then((res) => {
            console.log('Worker switchChangeOrderNft finish');
            emitter.removeAllListeners('infinity_recursion');

            resolve(res);
            // init(init_header)
        }).catch(e => {

            console.log('Worker switchChangeOrderNft');
            console.log(e);
            emitter.removeAllListeners('infinity_recursion');

            reject(e);
            // init(init_header)
        })
    })
  };

