// модуль парсинга маркет плейса


'use strict';

const Emitter = require("events");
const emitter = new Emitter();
let emitFunction;


async function start(init_header, name, collectionId) {
    const { default: axios } = require("axios");
const tunnel = require("tunnel");
 
const { getProductDetail } = require('./get_productDetali');
const { getProxy } = require("../../get_proxyInit");
const proxy = getProxy(name);
const { UA } = require("../../ua");
const {helper} = require('../helper/helper');

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


                            return resolve(res)
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
                return  resolve(res)
            })
        }, 502);



    })
}
 
    return new Promise(async (resolve, reject) => {
        // port.on('message', async (message) => {
        //     if (Array.isArray(message)) {
        //         console.log(message.length);
        //         // proxy = message;
        //         // proxyLength = message.length;

        //     } else { 
        //         console.log('message');

        //     }
        //     // resolve(message)
        //   }); // получаем сообщение из основного потока
        emitFunction = emitter.on('infinity_recursion', (message) => {
            let magicVal = 0; // что бы не долбитть в емитор по 100 раз
            if (message.status && magicVal < 2) {
                reject({ status: 'error', name_worker: name, integer: message.integer })

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
            limit: 200,
            network: "",
            offset: 0,
            query: "",
            type: -1,
            collectionId: ""
        };
        body.collectionId = collectionId;
        // let body = {
        //     amountFrom: "",
        //     currency: "BUSD",
        //     amountTo: "",
        //     categorys: [],
        //     // currency: "",
        //     mediaType: [],
        //     tradeType: [],
        //     collectionId: "",
        //     statusList: [
        //         1
        //     ],
        //     networks: [],
        //     page: 1,
        //     rows: 16,
        //     orderBy: "list_time",
        //     orderType: -1
        // }
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

                body.offset = (index-1)*100;
                header["user-agent"] = UA[index];
                // let t = helper.uuid();
                // header['x-ui-request-trace'] = t;
                // header['x-trace-id'] = t;


                let n = 0;

                axios.post('https://www.binance.com/bapi/nft/v1/public/nft/collection/top-activities', body, { headers: header, httpsAgent: agent }).then(async res => {
                    console.log(res.status + ' ' + index + ' total= ' + res.data.data.list.length);
                index++ // увеличиваем счетчик после прерывателя


                    // console.log('Send proxyVar ' + proxyVar);
                    if (res.data.code == '000002') {
                        resolve({ status: 'ok', name_worker: name })


                    }
                    if (res.data?.data?.list && Array.isArray(res.data.data.list) && res.data.data.list.length > 0) {
                        stackProxy[proxyVar].status = 'work';
                        await arrayIteration(res.data.data.list, proxyVar).then(() => {
                            stackProxy[proxyVar].status = 'off';
                            res = null;
                            console.log('index ' + index);

                            if (index >= 10) {
                                // stackProxy = 0;
                                // init(init_header)
                                resolve({ status: 'ok', name_worker: name, date: new Date() })
                            }
                        }).catch((err) => {
                            console.log(err);
                        });

                    } else {
                        resolve({ status: 'ok', name_worker: name })

                        // if (index >= 15) {
                        //     console.log('else');
                        //     console.log(res.data.data);
                        //     // stackProxy = 0;
                        //     // init(init_header)
                        //     resolve({ status: 'ok', name_worker: name })
                        // }


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
                    resolve({ status: 'ok', name_worker: name })

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

                        reject({ status: 'error', name_worker: name })
                    }
                    
                // if (index >= n || var_break) {
                //     // console.log('===========break==============');
                //     // init(init_header)

                //     reject({ status: 'error', name_worker: 'binance_binance_marketplace_top _lastorder' })



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
                    let randomIndex = helper.getRandomInt(0, proxy.length-1);


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

                        // console.log('Function arrayIteration END binance_marketplace_top  lastOrder\n Proxy length ' + proxy.length);
                        return resolve();








                    }).catch((e) => {
                        proxy.push(`${proxyOptions.host}:${proxyOptions.port}`);
                        return reject()



                        console.log('Error: Function arrayIteration END binance_marketplace_top  lastOrder\nProxy length ' + proxy.length);





                        console.log(e.message);
                    }))



                    if (array.length - 1 == i) {
                        let promiseArr = arrayPromise.filter(x => util.inspect(x).includes("pending"))

                        console.log('Worker binance_binance_marketplace_top _top-activities -- Await Promisee array pending = ' + promiseArr.length);

                        setTimeout(() => {
                            // console.log(arrayPromise);
                            let promiseArr = arrayPromise.filter(x => util.inspect(x).includes("pending"))
                            console.log('Worker binance_binance_marketplace_top _top-activities -- Promisee array pending = ' + promiseArr.length);

                        }, 5000);
                        await Promise.allSettled(arrayPromise).then(() => {
                        proxy.push(cloneProxySet);// вернули прокси из глобального цикла. возвращаем именно в этот момент, что бы наш итерратор жадл весь цикл

                            let newDate = new Date();

                            console.log(newDate + ' Worker binance_binance_marketplace_top _top-activities -- Promisee array Fulfil = ' + arrayPromise.length);

                            return resolve()
                        }).catch(e => resolve())

                    }

                }, 100 * i + 1);




            });

        })





    }



}


 



var cloneProxySet;

 



module.exports = ({init_header, proxyArray, name, collectionId = ""}) => {
    return new Promise((resolve, reject) => {
        console.log('Worker ' + name + ' init');
   
       

        start(init_header, name, collectionId).then((res) => {
            console.log('Finish: Worker ' + name + ' init');
            emitter.removeAllListeners('infinity_recursion');

            resolve(res);
            // init(init_header)
        }).catch(e => {

            console.log('Error: Worker ' + name + ' init');
            console.log(e.message);
            emitter.removeAllListeners('infinity_recursion');

            reject(e);
            // init(init_header)
        })
    })
  };