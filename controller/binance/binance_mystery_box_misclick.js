// Получаем данные из фильтра бинанса, отстование api 1-2 минуты - не подходит для мисклика, но может подходить для парсинга.

'use strict';
const Emitter = require("events");
const emitter = new Emitter();
const { default: axios } = require("axios");
const tunnel = require("tunnel");
const { proxy } = require("../../proxy_list");
const { UA } = require("../../ua");
const util = require("util");

const helper = require('./../helper/helper');
const { getNaemListNFT } = require("./getNftStat");
const { arrayNFTCollectionName } = require("./nftArrayData");

const { getProductDetail } = require('./get_productDetali');

const proxyLength = proxy.length;



let header;
let stackProxy = {};

const arrayIterator = arr => ({
    [Symbol.asyncIterator]() {
        let i = arr.length;
        return {
            index: 0,
            async next() {
                if (this.index < proxyLength) {
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
                    helper.timeout(2000).then(() => {
                        if (stackProxy[val].status == 'work') {
                            stackProxy[val].integer++
                        }

                        if (stackProxy[val].integer > 10000) {
                            emitter.emit('infinity_recursion', { status: true, integer: stackProxy[val].integer });
                        }
                        proxy.forEach((ele, i) => {
                            let filter = proxy.filter(x => x == ele);
                            if (filter.length > 1) {
                                // console.log(filter);
                                proxy.splice(i, 1);
                                // console.log('length ' + proxy.length, proxyLength);
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
async function start(init_header) {

    //header - мы прокидываем при инциализации потока

    return new Promise(async (resolve, reject) => {
        emitter.on('infinity_recursion', (message) => {
            let magicVal = 0; // что бы не долбитть в емитор по 100 раз
            if (message.status && magicVal < 2) {
                magicVal++
                // console.log(stackProxy);

                reject({ status: 'error', name_worker: 'binance_mystery', integer: message.integer })

            }

        });
        // header = getNewHeaders(headers); // поток не имеет доступа к результату этой функции;
        header = init_header.headers; // делаем header глобальным

        const { host: proxyHost, port: portHost, proxyAuth: proxyAuth } = helper.proxyInit(proxy[helper.getRandomInt(1, proxy.length - 1)]);

        let proxyOptions = {
            host: proxyHost,
            port: portHost,
            proxyAuth: proxyAuth,
            headers: {
                'User-Agent': UA[helper.getRandomInt(1, UA.length - 1)]
            },
        };
        let agent = tunnel.httpsOverHttp({
            proxy: proxyOptions,
            rejectUnauthorized: false,
        });

        const layerList = await axios.get('https://www.binance.com/bapi/nft/v1/public/nft/mystery-box/list?page=1&size=100', { headers: header, httpsAgent: agent }).then(res => {
            return res.data.data
        }).catch(e => {
            console.log(e);
        });
        // console.log(layerList.length);

        if (Array.isArray(layerList)) {
            layerList.forEach(async (layer, indexLayer) => {
                // console.log(layer.name);
                helper.shuffle(UA);
                let body = {
                    page: 1,
                    size: 16,
                    params: {
                        serialNo: [],
                        currency: "BUSD",
                        nftType: null,
                        // amountFrom: "0.001",
                        // amountTo: "3",
                        // setStartTime: new Date().getTime(),
                        // setStartTime: (function() {return new Date().getTime()})(),
                        // orderBy: "list_time",
                        // orderType: -1,
                        tradeType: "",
                        currency: "",
                        amountFrom: "",
                        amountTo: "",
                        rarity: "",
                        keyword: "",
                        orderType: -1,
                    }
                };
                body.params.serialNo.push(layer.serialsNo);
                let i = 0;
                let breakSwitch = false;
                helper.shuffle(proxy);

                for await (const proxyVar of arrayIterator(proxy)) {

                    let indexProxy = proxy.indexOf(proxyVar);
                    proxy.splice(indexProxy, 1);

                    i++

                    await getInfoBinNFTMysteryBox(helper.proxyInit(proxyVar), i, body).then(res => {
                        breakSwitch = res;
                        if (indexLayer >= layerList.length - 3) {
                            resolve({ status: 'ok', name_worker: 'binance_mystery' })
                        }
                    }).catch(e => {
                        // console.log(e);
                        if (typeof e == "boolean") {
                            breakSwitch = e
                        }
                        if (indexLayer >= layerList.length - 3) {
                            reject({ status: 'error', name_worker: 'binance_mystery' })
                        }
                    });
                    if (breakSwitch) {
                        if (indexLayer >= layerList.length - 3) {
                            reject({ status: 'error', name_worker: 'binance_mystery' })
                        }
                        break
                    }
                }
            })
        } else {
            reject({ status: 'error', name_worker: 'binance_marketplace', info: 'layerList no Array' })
        }

    })


    function getInfoBinNFTMysteryBox({ host: proxyHost, port: portHost, proxyAuth: proxyAuth }, i, body) {
        return new Promise(async (resolve, reject) => {
            let num = 0;
            header["user-agent"] = UA[i];
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

            let breakSwitch = false;
            // helper.getIP(agent);

            body.page = i; // смена страницы  
            // body.params.setStartTime = (function () { return new Date().getTime() })();
            // body.params.orderBy = random();
            let data = new Date().getTime();
            axios.post('https://www.binance.com/bapi/nft/v1/public/nft/market-mystery/mystery-list', JSON.stringify(body), { headers: header, httpsAgent: agent }).then(async res => {
                console.log('Worker 2 scan serialNo - ' + body.params.serialNo[0] + ' data length ' + res.data.data.data.length + ' Page # ' + res.data?.data?.page);

                num = Math.ceil(res.data.data.total / 16);
                if (res.data.data.total == 0 || i >= num || res.data.data.data.length == 0) {
                    console.log('Worker 2 end scan serialNo ' + body.params.serialNo[0]);

                    breakSwitch = true
                    proxy.push(`${proxyOptions.host}:${proxyOptions.port}:${proxyOptions.proxyAuth}`);
                    resolve(breakSwitch);
                } else {

                    stackProxy[`${proxyOptions.host}:${proxyOptions.port}:${proxyOptions.proxyAuth}`].status = 'work';

                    await arrayIteration(res.data.data.data, `${proxyOptions.host}:${proxyOptions.port}:${proxyOptions.proxyAuth}`).then(() => {
                        stackProxy[`${proxyOptions.host}:${proxyOptions.port}:${proxyOptions.proxyAuth}`].status = 'off';
                        res = null;


                        resolve(breakSwitch);

                    }).catch(e => {
                        resolve(breakSwitch);

                    });



                }




            }).catch(e => {
                proxy.push(`${proxyOptions.host}:${proxyOptions.port}:${proxyOptions.proxyAuth}`);
                reject(breakSwitch)


            })

        })


    }


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
                        // process.exit(0)
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









                    }).catch((e) => {

                        // let index = proxy.indexOf(`${proxyOptions.host}:${proxyOptions.port}:${proxyOptions.proxyAuth}`);
                        // if (index == -1) {
                        // proxy.push(`${proxyOptions.host}:${proxyOptions.port}:${proxyOptions.proxyAuth}`);


                        // }
                        proxy.push(`${proxyOptions.host}:${proxyOptions.port}:${proxyOptions.proxyAuth}`);

                        // proxy.forEach((ele, i) => {
                        //     let filter = proxy.filter(x => x == ele);
                        //     if (filter.length > 1) {
                        //         proxy.splice(i, 1);
                        //     }

                        // });





                    }))



                    if (array.length - 1 == i) {
                        let promiseArr = arrayPromise.filter(x => util.inspect(x).includes("pending"))

                        console.log('Worker 2 -- Await Promisee array pending = ' + promiseArr.length);

                        setTimeout(() => {
                            let promiseArr = arrayPromise.filter(x => util.inspect(x).includes("pending"))
                            console.log('Worker 2 -- Promisee array pending = ' + promiseArr.length);

                        }, 5000);
                        proxy.push(cloneProxySet);// вернули прокси из глобального цикла. возвращаем именно в этот момент, что бы наш итерратор жадл весь цикл


                        await Promise.allSettled(arrayPromise).then(() => {
                            let newDate = new Date();
                            console.log(newDate + ' Worker 2 -- Promisee array Fulfil = ' + arrayPromise.length);



                            resolve()
                        }).catch(() => {
                            resolve()
                        })
                    }

                }, 20 * i + 1);



            });



        })





    }

}
var cloneProxySet;


function init(init_header) {
    return new Promise((resolve, reject) => {
        start(init_header).then((res) => {
            console.log('Worker 2');
            emitter.removeAllListeners('infinity_recursion');

            resolve(res);

            // init(init_header)
        }).catch(e => {
            console.log('Worker 2');
            emitter.removeAllListeners('infinity_recursion');

            reject(e);
            // init(init_header)
        })
    })

}

function random() {
    let min = Math.ceil(1);
    let max = Math.floor(3);
    let n = Math.floor(Math.random() * (max - min)) + min;
    if (n == 1) {
        return 'list_time'
    } else {
        return 'set_end_time'

    }
}






module.exports = { init };
