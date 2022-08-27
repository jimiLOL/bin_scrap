// модуль парсинга маркет плейса


'use strict';

const Emitter = require("events");
const emitter = new Emitter();
let emitFunction;

const { default: axios } = require("axios");
const tunnel = require("tunnel");
 
const { getProductDetail } = require('./get_productDetali');
const { getProxy } = require("../../get_proxyInit");
const proxy = getProxy('binance_marketplace_lastorder');
const { UA } = require("../../ua");
const helper = require('./../helper/helper');

let proxyLength = proxy.length;
// const {arrayIterator, setConstant} = require('./arrayiterator.js') // надо перенести итератор в отдельный модуль
const util = require("util");


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

    return new Promise((resolve) => {
        function recursion() {
            return new Promise((resolve) => {
                if (proxy.length != proxyLength && length > 0) {
                    //    // console.log('leng != length ' + proxy.length, proxyLength);


                    helper.timeout(2000).then(() => {
                        if (stackProxy[val].status == 'work') {
                            // console.log(stackProxy[val].status);
                            stackProxy[val].integer++

                        }

                        if (stackProxy[val].integer > 10000) {
                            stackProxy[val].integer = 0;
                            emitter.emit('infinity_recursion', { status: true, integer: stackProxy[val].integer });
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
async function start(init_header, port) {
 
    return new Promise(async (resolve, reject) => {
        port.on('message', async (message) => {
            if (Array.isArray(message)) {
                console.log(message.length);
                proxy = message;
                proxyLength = message.length;

            } else { 
                console.log('message');

            }
            // resolve(message)
          }); // получаем сообщение из основного потока
        emitFunction = emitter.on('infinity_recursion', (message) => {
            let magicVal = 0; // что бы не долбитть в емитор по 100 раз
            if (message.status && magicVal < 2) {
                reject({ status: 'error', name_worker: 'binance_marketplace_lastorder', integer: message.integer })

            }

        });

        header = init_header; // делаем header глобальным

        // let body = {
        //     currency: "BUSD",
        //     mediaType: "",
        //     tradeType: "",
        //     // amountFrom: "0.1",
        //     // amountTo: "2",
        //     collectionId: '',
        //     categorys: [],
        //     keyword: "",
        //     orderBy: "list_time", // когда размещенно
        //     // orderType: 1, // статус.
        //     page: 1,
        //     rows: 100,
        //     productIds: []
        // };
        let body = {
            amountFrom: "",
            currency: "BUSD",
            amountTo: "",
            categorys: [],
            // currency: "",
            mediaType: [],
            tradeType: [],
            collectionId: "",
            statusList: [
                1
            ],
            page: 1,
            rows: 16,
            orderBy: "list_time",
            orderType: -1
        }
        // body.collectionId = layer.layerId;
        helper.shuffle(UA);
        let var_break = false;
        helper.shuffle(proxy);





        (async () => {
            let index = 1;
            for await (const proxyVar of arrayIterator(proxy)) {

                // console.log('====================INIT parsing nft====================');
                if (proxyVar == undefined) {
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
                    // proxyAuth: proxyAuth,
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


                let n = 0;

                axios.post('https://www.binance.com/bapi/nft/v1/friendly/nft/mgs/product-list', body, { headers: header, httpsAgent: agent }).then(res => {
                    console.log(res.status + ' ' + index + ' total= ' + res.data.data.total);
                index++ // увеличиваем счетчик после прерывателя


                    // console.log('Send proxyVar ' + proxyVar);
                    if (res.data.code == '000002') {
                        resolve({ status: 'ok', name_worker: 'binance_marketplace_lastorder' })


                    }
                    if (res.data.data.rows != null) {
                        stackProxy[proxyVar].status = 'work';
                        arrayIteration(res.data.data.rows, proxyVar).then(() => {
                            stackProxy[proxyVar].status = 'off';
                            res = null;

                            if (index >= 15) {
                                // stackProxy = 0;
                                // init(init_header)
                                resolve({ status: 'ok', name_worker: 'binance_marketplace_lastorder', date: new Date() })
                            }
                        });

                    } else {
                        if (index >= 15) {
                            console.log(res.data.data);
                            // stackProxy = 0;
                            // init(init_header)
                            resolve({ status: 'ok', name_worker: 'binance_marketplace_lastorder' })
                        }


                    }




                    n = res.data.data.total / 16;
                    // console.log(Math.ceil(n));
                    let newData = new Date().getTime();
                    // console.log(`Date cycle^ ${newData - data} ms`);
                    if (index >= Math.ceil(n)) {
                        var_break = true
                    } // останавливаем итерацию
                    // // console.log(`Global cycle ${i}`);




                    // return Math.ceil(n)
                }).catch(e => {
                    // console.log('Error');
                    // // console.log(`Global cycle ${i}`);
                    console.log(e.message);
                    console.log('Ошибка');
                    resolve({ status: 'ok', name_worker: 'binance_marketplace_lastorder' })

                    // console.log(e);

                    proxy.push(proxyVar)
                    // console.log('Proxy lenght ' + proxy.length);


                    if (e?.response?.statusText != undefined) {
                        // console.log(e?.response?.statusText);


                    } else {
                        // // console.log(e);
                    }
                    // var_break = true;
                    if (index >= n || var_break) {
                    var_break = false;

                        reject({ status: 'error', name_worker: 'binance_marketplace_lastorder' })
                    }
                    
                // if (index >= n || var_break) {
                //     // console.log('===========break==============');
                //     // init(init_header)

                //     reject({ status: 'error', name_worker: 'binance_marketplace_lastorder' })



                //     var_break = false;
                //     // console.log('break\nProxy length ' + proxy.length);

                //     break
                // } // у нас в ответе максимум 100 сущностей отсюда и 101
                })




            }
        })()





    })


    function arrayIteration(array, proxySet) {
        return new Promise((resolve, reject) => {
            if (proxySet != undefined) {
                cloneProxySet = proxySet

            };
            let arrayPromise = [];





            array.forEach((ele, i) => {
                setTimeout(async () => {
                    let randomIndex = helper.getRandomInt(0, proxy.length);


                    const { host: proxyHost, port: portHost, proxyAuth: proxyAuth } = proxy[randomIndex] == undefined ? helper.proxyInit(cloneProxySet) : helper.proxyInit(proxy[randomIndex]);
                    if (proxy[randomIndex] == undefined) {
                        proxy.push(cloneProxySet)
                    } else {
                        proxy.splice(randomIndex, 1);

                    };

                    let proxyOptions = {
                        host: proxyHost,
                        port: portHost,
                        // proxyAuth: proxyAuth,
                        headers: {
                            'User-Agent': UA[randomIndex]
                        },
                    };
                    let agent = tunnel.httpsOverHttp({
                        proxy: proxyOptions,
                        rejectUnauthorized: false,
                    });


                    arrayPromise.push(getProductDetail(ele, agent, header).then(() => {




                        proxy.push(`${proxyOptions.host}:${proxyOptions.port}`); // возвращаем прокси в обойму на дочернем цикле

                        console.log('Function arrayIteration END MarketPlace lastOrder\nProxy length ' + proxy.length);








                    }).catch((e) => {
                        proxy.push(`${proxyOptions.host}:${proxyOptions.port}`);



                        console.log('Error: Function arrayIteration END MarketPlace lastOrder\nProxy length ' + proxy.length);





                        console.log(e.message);
                    }))



                    if (array.length - 1 == i) {
                        let promiseArr = arrayPromise.filter(x => util.inspect(x).includes("pending"))

                        console.log('Worker 4 -- Await Promisee array pending = ' + promiseArr.length);

                        setTimeout(() => {
                            // console.log(arrayPromise);
                            let promiseArr = arrayPromise.filter(x => util.inspect(x).includes("pending"))
                            console.log('Worker 4 -- Promisee array pending = ' + promiseArr.length);

                        }, 5000);
                        proxy.push(cloneProxySet);// вернули прокси из глобального цикла. возвращаем именно в этот момент, что бы наш итерратор жадл весь цикл
                        await Promise.allSettled(arrayPromise).then(() => {
                            let newDate = new Date();

                            console.log(newDate + ' Worker 4 -- Promisee array Fulfil = ' + arrayPromise.length);

                            resolve()
                        }).catch(e => resolve())

                    }

                }, 20 * i + 1);




            });

        })





    }



}


// function init(init_header) {
//     return new Promise((resolve, reject) => {
//         start(init_header).then((res) => {
//             console.log('Worker 4');
//             emitter.removeAllListeners('infinity_recursion');

//             resolve(res);
//             // init(init_header)
//         }).catch(e => {
//             console.log('Worker 4');
//             emitter.removeAllListeners('infinity_recursion');

//             reject(e);
//             // init(init_header)
//         })
//     })

// }



var cloneProxySet;


// module.exports = { init }



module.exports = ({init_header, port, proxyArray}) => {
    return new Promise((resolve, reject) => {
        console.log('Worker 4 init');
        // console.log(proxyArray);
        proxy = proxyArray;
        proxyLength = proxy.length;
        // console.log(init_header);
       

        start(init_header, port).then((res) => {
            console.log('Worker 4');
            emitter.removeAllListeners('infinity_recursion');

            resolve(res);
            // init(init_header)
        }).catch(e => {

            console.log('Worker 4');
            console.log(e.message);
            emitter.removeAllListeners('infinity_recursion');

            reject(e);
            // init(init_header)
        })
    })
  };