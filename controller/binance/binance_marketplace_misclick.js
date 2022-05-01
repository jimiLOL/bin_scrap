// модуль парсинга маркет плейса
'use strict';



// function delDublicateProxy() {
//     proxy.forEach((ele, i) => {
//         let filter = proxy.filter(x => x == ele);
//         if (filter.length > 1) {
//             proxy.splice(i, 1);
//         }

//     });
// }
async function start(init_header) {
    const util = require("util");
    const { getListCollectionName } = require('./../getCollectionList');
const { getAddressModel } = require("../../model/nft_detalii.cjs");


    const { default: axios } = require("axios");
    const tunnel = require("tunnel");
    const { getProductDetail } = require('./get_productDetali');
    const { proxy } = require("../../proxy_list_two");
    const { UA } = require("../../ua");
    const helper = require('./../helper/helper');
    const Emitter = require("events");
    const emitter = new Emitter();
    const proxyLength = proxy.length;
    // const {arrayIterator, setConstant} = require('./arrayiterator.js') // надо перенести итератор в отдельный модуль

    // setConstant(proxy)


    let headers = {
        accept: "*/*",
        "accept-encoding": "gzip",
        "accept-language":
            "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6,zh;q=0.5",
        clienttype: "web",
        "content-type": "application/json",
        lang: "en",
        "sec-ch-ua":
            '"Google Chrome";v="93", " Not;A Brand";v="99", "Chromium";v="93"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        Host: "www.binance.com"
    };
    let header;


    let stackProxy = {}; // этот объект для дублирования состояния задании по итерациям, счетчик\пердохранитель от рекурсии увеличивается только на ключи, который в работе сейчас. Имеет 4 статуса. init - при добавлении в список. work - начало рабооты (в этот момент счетчик предохранителя увеличивается). off - работа законечена, вернулся промис. 
    let arrayCollections;


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
                        //    // console.log('leng != length ' + proxy.length, proxyLength);


                        helper.timeout(2000).then(() => {
                            if (stackProxy[val].status == 'work') {
                                stackProxy[val].integer++

                            }

                            if (stackProxy[val].integer > 10000) {
                                emitter.emit('infinity_recursion', { status: true, integer: stackProxy[val].integer, val: val });
                            }

                            // if (proxy.length > proxyLength) {
                            //     // console.log(proxy.length + ' > '+ proxyLength);
                            //     proxy.forEach((ele, i) => {
                            //         let filter = proxy.filter(x => x == ele);
                            //         if (filter.length > 1) {
                            //             proxy.splice(i, 1);
                            //         }

                            //     });
                            //     // console.log(proxy.length + ' ? '+ proxyLength);

                            // }
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
                        // // console.log('=========================leng < 0=========================');
                        stackProxy[val].integer = 0;

                        resolve({ done: true })

                    } else {
                        // // console.log('=====!===!=========!===done: false====!=!=========!=======!==========');
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
    function getlayerList() {
        return new Promise((resolve) => {
            let layerList = []

            arrayCollections.forEach(async (collection, i) => {
                const NFT = await getAddressModel(collection, 'binance');
                NFT.find({}, {productDetail: {collection: 1}}, (err, call) => {
                    if (err) {
                        console.log(err);
                    };
                    if (call) {
                        call.forEach(ele => {
                            if (ele?.productDetail?.collection != null) {
                                if (ele?.productDetail?.collection.hasOwnProperty('collectionId')) {

                                    layerList.push({layerId: ele.productDetail.collection.collectionId})
    
                                }  
                            }
                           
                        });
                        // console.log(layerList.length);
                        layerList.forEach((ele, i) => {
                            let filter = layerList.filter(x => x.layerId == ele.layerId);
                            if (filter.length > 1) {
                                layerList.splice(i, 1);
                            }

                        });
                        // console.log(layerList.length);

                    };
                    if (i == arrayCollections.length-1) {
                        resolve(layerList)
                    }
                });
             
                


            });

        })
    }
    return new Promise(async (resolve, reject) => {
        let layerList;
        emitter.on('infinity_recursion', (message) => {
            let magicVal = 0; // что бы не долбитть в емитор по 100 раз
            if (message.status && magicVal < 2) {
                magicVal++
                stackProxy[message.val].integer = 0;
                // console.log(stackProxy);
                // console.log('infinity_recursion');
                reject({ status: 'error', name_worker: 'binance_marketplace', integer: message.integer })

            }

        });

        header = init_header.headers; // делаем header глобальным


        if (helper.getRandomInt(1,3) == 2) {
            arrayCollections = await getListCollectionName('binance');

            layerList = await getlayerList();
                        console.log('layerList = ' + layerList.length);


            
        } else {
            layerList = await axios.get('https://www.binance.com/bapi/nft/v1/public/nft/layer-search?keyword=', { headers: header }).then(res => {
                return res.data.data
            }).catch(e => {
                // // console.log(e);
            });
        }





        // header = getNewHeaders(headers);
     

        if (Array.isArray(layerList) && layerList.length != 0) {
            layerList.forEach((layer, i) => {
                // console.log(`Init Global cycle ${i}`);
                let body = {
                    currency: (function () { return "BUSD" })(),
                    mediaType: "",
                    tradeType: "",
                    // amountFrom: "0.1",
                    // amountTo: "2",
                    collectionId: '',
                    categorys: [],
                    keyword: "",
                    // orderBy: "list_time", // когда размещенно
                    // orderType: 1, // статус.
                    page: 1,
                    rows: 100,
                    productIds: []
                };
                body.collectionId = layer.layerId;
                helper.shuffle(UA);
                let var_break = false;




                (async () => {
                    let index = 0;
                    for await (const proxyVar of arrayIterator(proxy)) {
                        // helper.shuffle(proxy);
                        // // console.log(stackProxy);

                        // console.log('====================INIT parsing nft====================');
                        index++
                        if (proxyVar == undefined) {
                            if (i == layerList.length - 1) {
                                resolve({ status: 'ok', name_worker: 'binance_marketplace' })
                                // init(init_header)
                            }
                            var_break = false;
                            break
                        }

                        const { host: proxyHost, port: portHost, proxyAuth: proxyAuth } = helper.proxyInit(proxyVar);
                        // console.log('Proxy lenght ' + proxy.length + ' index ' + index);
                        let indexProxy = proxy.indexOf(proxyVar);
                        proxy.splice(indexProxy, 1);
                        // proxy.splice(index - 1, 1);
                        let proxyOptions = {
                            host: proxyHost,
                            port: portHost,
                            proxyAuth: proxyAuth,
                            headers: {
                                'User-Agent': UA[index]
                            },
                        };
                        let agent = tunnel.httpsOverHttp({
                            proxy: proxyOptions,
                            rejectUnauthorized: false,
                        });

                        body.page = index;
                        header["user-agent"] = UA[index];
                        // let t = helper.uuid();
                        // header['x-ui-request-trace'] = t;
                        // header['x-trace-id'] = t;


                        let data = new Date().getTime();
                        axios.post('https://www.binance.com/bapi/nft/v1/friendly/nft/product-list', body, { headers: header, httpsAgent: agent }).then(res => {
                            // console.log(res.status + ' ' + index + ' total= ' + res.data.data.total);

                            // console.log('Send proxyVar ' + proxyVar);
                            if (res.data.data.rows != null) {
                                stackProxy[proxyVar].status = 'work';
                                arrayIteration(res.data.data.rows, proxyVar).then(() => {
                                    stackProxy[proxyVar].status = 'off';
                                    res = null;
                                    if (i == layerList.length - 1) {
                                        resolve({ status: 'ok', name_worker: 'binance_marketplace' })
                                        // init(init_header)
                                    }
                                }).catch(e => {

                                });

                            } else {
                                stackProxy[proxyVar].status = 'off';
                                res = null;
                                if (i == layerList.length - 1) {
                                    resolve({ status: 'ok', name_worker: 'binance_marketplace' })
                                    // init(init_header)
                                }

                            };




                            let n = res.data.data.total / 100;
                            // console.log(Math.ceil(n));
                            let newData = new Date().getTime();
                            // console.log(`Date cycle^ ${newData - data} ms`);
                            if (Math.ceil(n) == index) {
                                var_break = true
                            } // останавливаем итерацию
                            // console.log(`Global cycle ${i}`);




                            return Math.ceil(n)
                        }).catch(e => {
                            // console.log('Error');
                            // console.log(`Global cycle ${i}`);

                            proxy.push(proxyVar)
                            // console.log('Proxy lenght ' + proxy.length);


                            if (e?.response?.statusText != undefined) {
                                // console.log(e?.response?.statusText);


                            } else {
                                // // console.log(e);
                            }
                            // var_break = true;
                            if (i == layerList.length - 1) {

                                reject({ status: 'error', name_worker: 'binance_marketplace' })
                            }
                        })
                      

                        if (index == 101 || var_break) {
                            var_break = false;

                            if (i == layerList.length - 1) {

                                reject({ status: 'error', name_worker: 'binance_marketplace' })
                            }


                            // console.log('break\nProxy length ' + proxy.length);

                            break
                        } // у нас в ответе максимум 100 сущностей отсюда и 101



                    }
                })()





            });
        } else {
            reject({ status: 'error', name_worker: 'binance_marketplace', info: 'layerList no Array' })
            // init(init_header)



        }



    })

    function arrayIteration(array, proxySet) {
        return new Promise((resolve, reject) => {

            let start = new Date().getTime();


            if (proxySet != undefined) {
                cloneProxySet = proxySet

            };

            let arrayPromise = [];





            array.forEach((ele, i) => {
                setTimeout(async () => {
                    let randomIndex = helper.getRandomInt(0, proxy.length);
                    // // console.log('Proxy length ' + proxy.length + ' randomIndex ' + randomIndex + ' ' + proxy[randomIndex] + ' ' + cloneProxySet);


                    const { host: proxyHost, port: portHost, proxyAuth: proxyAuth } = proxy[randomIndex] == undefined ? helper.proxyInit(cloneProxySet) : helper.proxyInit(proxy[randomIndex]);
                    if (proxy[randomIndex] == undefined) {
                        proxy.push(cloneProxySet)
                    } else {
                        proxy.splice(randomIndex, 1);

                    };

                    let proxyOptions = {
                        host: proxyHost,
                        port: portHost,
                        proxyAuth: proxyAuth,
                        headers: {
                            'User-Agent': UA[randomIndex]
                        },
                    };
                    let agent = tunnel.httpsOverHttp({
                        proxy: proxyOptions,
                        rejectUnauthorized: false,
                    });


                    arrayPromise.push(getProductDetail(ele, agent, header).then(() => {
                        proxy.push(`${proxyOptions.host}:${proxyOptions.port}:${proxyOptions.proxyAuth}`); // возвращаем прокси в обойму на дочернем цикле
                        // 
                    }).catch((e) => {

                        proxy.push(`${proxyOptions.host}:${proxyOptions.port}:${proxyOptions.proxyAuth}`);


                        // // console.log('Error: Function arrayIteration MarketPlace\nProxy length ' + proxy.length);
                        // 




                        // console.log(e);
                    }))


                    if (array.length - 1 == i) {
                        let promiseArr = arrayPromise.filter(x => util.inspect(x).includes("pending"))

                        console.log('Worker 3 -- Await Promisee array pending = ' + promiseArr.length);

                        setTimeout(() => {
                            // console.log(arrayPromise);
                            let promiseArr = arrayPromise.filter(x => util.inspect(x).includes("pending"))
                            console.log('Worker 3 -- Promisee array pending = ' + promiseArr.length);

                        }, 5000);
                        proxy.push(cloneProxySet);// вернули прокси из глобального цикла. возвращаем именно в этот момент, что бы наш итерратор жадл весь цикл
                        await Promise.allSettled(arrayPromise).then(() => {
                            console.log('Worker 3 -- Promisee array Fulfil = ' + arrayPromise.length);

                            resolve()
                        }).catch(() => {
                            resolve()
                        })

                    }

                }, 20 * i+1);




            });

        })







    }






}


var cloneProxySet;



function init(init_header) {
    return new Promise((resolve, reject) => {
        start(init_header).then((res) => {
            console.log('Worker 3');

            console.log(res);
            init(init_header)
        }).catch(e => {
            console.log('Worker 3');

            init(init_header)
        })
    })

}

module.exports = { init }