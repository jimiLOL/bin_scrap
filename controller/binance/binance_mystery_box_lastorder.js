// Получаем данные из фильтра бинанса, отстование api 1-2 минуты - не подходит для мисклика, но может подходить для парсинга.
'use strict';
const Emitter = require("events");
const emitter = new Emitter();

async function start(init_header, name) {
    //header - мы прокидываем при инциализации потока
    const { default: axios } = require("axios");
    const tunnel = require("tunnel");
    const { getProxy } = require("../../get_proxyInit");
    const proxy = getProxy(name);
    const { UA } = require("../../ua");
    const util = require("util");

    const { helper } = require('./../helper/helper');
    const { getNaemListNFT } = require("./getNftStat");
    // const { arrayNFTCollectionName } = require("./nftArrayData");
    const { getProductDetail } = require("./get_productDetali");


    let proxyLength = proxy.length;

    const iteration = 4;
    const num = 5; // через сколько прервать итерацию из функции getInfoBinNFTMysteryBox






    let header;
    let stackProxy = {};

    const arrayIterator = arr => ({
        [Symbol.asyncIterator]() {
            let i = arr.length;
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
                        // console.log('leng != length MeysteryBox ' + proxy.length, proxyLength);


                        helper.timeout(2000).then(() => {
                            if (stackProxy[val].status == 'work') {
                                stackProxy[val].integer++

                            }

                            if (stackProxy[val].integer > 10000) {
                                stackProxy[val].integer = 0;
                                emitter.emit('infinity_recursion', { status: true, integer: stackProxy[val].integer });
                            }
                            proxy.forEach((ele, i) => {
                                let filter = proxy.filter(x => x == ele);
                                if (filter.length > 1) {
                                    // console.log(filter);
                                    proxy.splice(i, 1);
                                    // console.log('length ' + proxy.length, proxyLength);
                                    // process.exit(0)

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
    let i = 0;


    return new Promise(async (resolve, reject) => {
        emitter.on('infinity_recursion', (message) => {
            let magicVal = 0; // что бы не долбитть в емитор по 100 раз

            if (message.status && magicVal < 2) {
                magicVal++

                reject({ status: 'error', name_worker: name, integer: message.integer })

            }

        });
        // port.on('message', async (message) => {
        //     if (Array.isArray(message)) {
        //         console.log(message.length);


        //     } else {
        //         console.log('message');

        //     }
        // }); // получаем сообщение из основного потока

        // header = getNewHeaders(headers); // поток не имеет доступа к результату этой функции;
        header = init_header; // делаем header глобальным





        for (let indexLayer = 1; indexLayer < iteration; indexLayer++) {

            // // console.log(layer.name);
            helper.shuffle(UA);
            helper.shuffle(proxy);

            let body = {
                page: 1,
                size: 16,
                params: {
                    // keyword: "",
                    currency: "BUSD",
                    nftType: null,
                    // amountFrom: "0.001",
                    // amountTo: "3",
                    setStartTime: new Date().getTime(),
                    // setStartTime: (function() {return new Date().getTime()})(),
                    orderBy: "list_time",
                    // orderType: -1,
                    serialNo: [],
                    tradeType: null
                }
            };
            // body.params.serialNo.push(layer.serialsNo);
            let breakSwitch = false;
            for await (const proxyVar of arrayIterator(proxy)) {

                // // console.log('====================INIT parsing Mystery BOX====================');
                // // console.log(proxyVar);
                // // console.log(proxy[i]);
                let indexProxy = proxy.indexOf(proxyVar);
                proxy.splice(indexProxy, 1);

                i++


                await getInfoBinNFTMysteryBox(helper.proxyInit(proxyVar), i, body).then(res => {
                    breakSwitch = res;
                    if (indexLayer >= iteration - 1 || breakSwitch) {
                        resolve({ status: 'ok', name_worker: name })
                    }
                }).catch(e => {

                    if (indexLayer >= iteration - 1) {
                        reject({ status: 'error', name_worker: name })
                    }
                    // process.exit(1)
                });
                if (breakSwitch) {
                    if (indexLayer >= iteration - 1) {
                        reject({ status: 'error', name_worker: name })
                    }


                    break
                }



            }
        };
        // resolve({ status: 'ok', name_worker: 'binance_mysteryLastOrder' })



    })


    function getInfoBinNFTMysteryBox({ host: proxyHost, port: portHost, proxyAuth: proxyAuth }, i, body) {
        return new Promise(async (resolve, reject) => {
            // console.log('Start "getInfoBinNFTMysteryBox" Proxy length ' + proxy.length);



            header["user-agent"] = UA[helper.getRandomInt(1, UA.length - 1)];
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

            let breakSwitch = false;
            // helper.getIP(agent);







            body.page = i; // смена страницы  
            body.params.setStartTime = new Date().getTime();
            body.params.orderBy = 'list_time';
            // let data = new Date().getTime();
            //    let num = 0;

            axios.post('https://www.binance.com/bapi/nft/v1/public/nft/market-mystery/mystery-list', JSON.stringify(body), { headers: header, httpsAgent: agent }).then(async res => {
                console.log('Worker 1 scan page - ' + body.page);
                console.log(res.status + ' ' + i + ' total^ ' + res.data.data.total);


                // num = Math.ceil(res.data.data.total / 16);
                // console.log('i ' + i + ' num ' + num);
                if (res.data.data.total == 0 || i >= num || res.data.code == '000002') {

                    breakSwitch = true
                    proxy.push(`${proxyOptions.host}:${proxyOptions.port}`);
                    // console.log('End cycle "getInfoBinNFTMysteryBox" Proxy length ' + proxy.length);

                    resolve(breakSwitch);


                } else {
                    // console.log('Await parsing... cycle "getInfoBinNFTMysteryBox" Proxy length ' + proxy.length);



                    stackProxy[`${proxyOptions.host}:${proxyOptions.port}`].status = 'work';

                    await arrayIteration(res.data.data.data, `${proxyOptions.host}:${proxyOptions.port}`).then(() => {
                        stackProxy[`${proxyOptions.host}:${proxyOptions.port}`].status = 'off';
                        res.data.data.rows = null;

                        // res = null;

                        // console.log('end');
                        // process.exit(0)

                        return resolve(breakSwitch);

                    }).catch(() => {
                        // stackProxy[`${proxyOptions.host}:${proxyOptions.port}:${proxyOptions.proxyAuth}`].status = 'off';

                        return resolve(breakSwitch);


                    });


                    // let newData = new Date().getTime();
                    // console.log(`Date cycle^ ${newData - data} ms`);

                }





            }).catch(e => {
                // console.log('Error');
                proxy.push(`${proxyOptions.host}:${proxyOptions.port}`);
                return reject(breakSwitch)


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
                    let randomIndex = helper.getRandomInt(0, proxy.length - 1);


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
                        return resolve();

                        // // console.log('Function arrayIteration  Mystery Box last order  END\nProxy length ' + proxy.length);

                        // console.log('Worker 1');






                    }).catch((e) => {


                        proxy.push(`${proxyOptions.host}:${proxyOptions.port}`);
                        return reject();

                        // // console.log('Error: Function arrayIteration Mystery Box last order END\nProxy length ' + proxy.length);





                        // console.log(e);
                    }))




                    if (array.length - 1 == i) {
                        let promiseArr = arrayPromise.filter(x => util.inspect(x).includes("pending"))

                        console.log('Worker 1 -- Await Promisee array pending = ' + promiseArr.length);

                        setTimeout(() => {
                            // console.log(arrayPromise);
                            let promiseArr = arrayPromise.filter(x => util.inspect(x).includes("pending"))
                            console.log('Worker 1 -- Promisee array pending = ' + promiseArr.length);

                        }, 5000);


                        await Promise.allSettled(arrayPromise).then(() => {
                            let newDate = new Date();
                        proxy.push(cloneProxySet);// вернули прокси из глобального цикла. возвращаем именно в этот момент, что бы наш итерратор жадл весь цикл


                            console.log(newDate + ' Worker 1 -- Promisee array Fulfil = ' + arrayPromise.length);



                            return resolve();
                        }).catch(() => {
                            return resolve();
                        })
                    }

                }, 100 * i + 1);


            });


        })




    }


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


var cloneProxySet;

// function init(init_header) {
//     return new Promise((resolve, reject) => {
//         start(init_header).then((res) => {
//           console.log('Worker 1');
//           emitter.removeAllListeners('infinity_recursion');

//           resolve(res);
//             // init(init_header)
//         }).catch(e => {
//             console.log('Worker 1');
//             emitter.removeAllListeners('infinity_recursion');


//             reject(e);
//             // init(init_header)
//         })
//     })

// }


// module.exports = { init };
module.exports = ({ init_header, proxyArray, name }) => {
    return new Promise((resolve, reject) => {
        console.log(`Worker ${name} init`);





        start(init_header, name).then((res) => {
            console.log(`Worker ${name} finish`);
            emitter.removeAllListeners('infinity_recursion');

            resolve(res);
            // init(init_header)
        }).catch(e => {

            console.log(`Worker ${name} error`);
            console.log(e);
            emitter.removeAllListeners('infinity_recursion');

            reject(e);
            // init(init_header)
        })
    })
};
