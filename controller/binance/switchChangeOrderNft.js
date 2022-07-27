
const { getListCollectionName } = require('../getCollectionList');
const { getAddressModel } = require("../../model/nft_detalii.cjs");

const { default: axios } = require("axios");
const tunnel = require("tunnel");
const { getProductDetail } = require('./get_productDetali');
const { proxy } = require("../../proxy_list_four");
const { UA } = require("../../ua");
const helper = require('../helper/helper');

const proxyLength = proxy.length;

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

                            resolve(res)
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
                resolve(res)
            })
        }, 50);



    })
}

function iterationCollection(arrayDocument, header) {
    return new Promise(async (resolve) => {
        if (arrayDocument.length == 0) {
            resolve()
        }
        let i = 0;
        let arrayPromise = [];
        helper.shuffle(UA);
        helper.shuffle(proxy);


        for await (const proxyVar of arrayIterator(proxy)) {
            i++
            console.log('Iteration ' + i);

            stackProxy[proxyVar].status = 'work';
            const { host: proxyHost, port: portHost, proxyAuth: proxyAuth } = helper.proxyInit(proxyVar);
            let indexProxy = proxy.indexOf(proxyVar);
            proxy.splice(indexProxy, 1);
            let proxyOptions = {
                host: proxyHost,
                port: portHost,
                proxyAuth: proxyAuth,
                headers: {
                    'User-Agent': UA[i]
                },
            };
            let agent = tunnel.httpsOverHttp({
                proxy: proxyOptions,
                rejectUnauthorized: false,
            });

            header["user-agent"] = UA[i];
            if (arrayDocument[i]?.productId != undefined) {
            arrayPromise.push(getProductDetail(arrayDocument[i], agent, header).then((res)=> {
                console.log('res ' + res);
                proxy.push(`${proxyOptions.host}:${proxyOptions.port}:${proxyOptions.proxyAuth}`);
            }).catch((e)=> {
                console.log('Error ' + e);
                proxy.push(`${proxyOptions.host}:${proxyOptions.port}:${proxyOptions.proxyAuth}`);
            }));


            } else {
                console.log('(((');
                console.log(arrayDocument[i]);
                proxy.push(`${proxyOptions.host}:${proxyOptions.port}:${proxyOptions.proxyAuth}`);

                break
                

            }


            if (arrayDocument.length - 1 == i) {
                break
            }




        }
        console.log('arrayPromise');
        console.log(arrayPromise);
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
                    for (let index = 0; index < inw; index++) {
                        let newArray = 0;
                        if (call.length > 100) {
                            newArray = call.slice((100 * index)-100, 100 * index);
                            // console.log('newArray length = ' + newArray.length);



                            await iterationCollection(newArray, header)

                        } else {
                            newArray = call.slice(0, call.length - 1);
                            // console.log('newArray length = ' + newArray.length);

                            await iterationCollection(newArray, header)

                        }
                        if (newArray.length == 0) {
                            break
                        }

                    }





                };
                iteration++
                if (iteration == arrayCollections.length - 1) {
                    console.log('Fulfuit');
                    resolve(layerList)
                }
            }).catch(e=> {
                console.log(e);
            });




        });


    })
}

function start(header) {
    return new Promise(async (resolve, reject) => {



        let arrayCollections = await getListCollectionName('binance');

        await Promise.all([getlayerList(arrayCollections, header)]).then(() => {
            resolve()
        }).catch(() => {
            reject()
        });


    })
}

function init(init_header) {
    return new Promise((resolve, reject) => {
        start(init_header).then((res) => {
            console.log('Worker switchChangeOrderNft');
            process.exit(0)

            emitter.removeAllListeners('infinity_recursion');

            resolve(res);

            // init(init_header)
        }).catch(e => {
            console.log('Worker switchChangeOrderNft');
            process.exit(0)
            emitter.removeAllListeners('infinity_recursion');

            reject(e);
            // init(init_header)
        })
    })

}


module.exports = { init }
