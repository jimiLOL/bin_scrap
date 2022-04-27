// модуль парсинга маркет плейса
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




const arrayIterator = arr => ({
    [Symbol.asyncIterator]() {
        let i = arr.length;
        //   console.log(i);
        return {
            index: 0,
            async next() {
                console.log('=========================== ' + this.index + ' index iterator =================================================');
                if (this.index < proxyLength) {
                    //   console.log(this.index, arr.length);

                    return await awaitArray(arr[this.index++], --i);

                } else {
                    return { done: true }

                }

            }
        }
    }
})
awaitArray = (val, length) => {
    let integer = 0; //  
    return new Promise((resolve) => {
        function recursion() {
            return new Promise((resolve) => {
                if (proxy.length != proxyLength && length > 0) {
                    //    console.log('leng != length ' + proxy.length, proxyLength);


                    helper.timeout(2000).then(() => {
                        integer++

                        if (integer > 150) {
                            emitter.emit('infinity_recursion', {status: true, integer: integer});
                        }

                        // if (proxy.length > proxyLength) {
                        //     console.log(proxy.length + ' > '+ proxyLength);
                        //     proxy.forEach((ele, i) => {
                        //         let filter = proxy.filter(x => x == ele);
                        //         if (filter.length > 1) {
                        //             proxy.splice(i, 1);
                        //         }

                        //     });
                        //     console.log(proxy.length + ' ? '+ proxyLength);

                        // }
                        proxy.forEach((ele, i) => {
                            let filter = proxy.filter(x => x == ele);
                            if (filter.length > 1) {
                                proxy.splice(i, 1);
                            }

                        });



                        recursion().then((res) => {
                            integer = 0;

                            resolve(res)
                        })
                    })


                } else if (length < 0) {
                    // console.log('=========================leng < 0=========================');
                    integer = 0;

                    resolve({ done: true })

                } else {
                    // console.log('=====!===!=========!===done: false====!=!=========!=======!==========');
                    integer = 0;

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


function delDublicateProxy() {
    proxy.forEach((ele, i) => {
        let filter = proxy.filter(x => x == ele);
        if (filter.length > 1) {
            proxy.splice(i, 1);
        }

    });
}
async function init(init_header) {
    return new Promise(async (resolve, reject) => {
        emitter.on('infinity_recursion', (message) => {
            if (message.status) {
                console.log('infinity_recursion');
                reject({ status: 'error', name_worker: 'binance_marketplace', integer: message.integer })

            }

        });

        

        header = init_header.headers; // делаем header глобальным

        // header = getNewHeaders(headers);
        const layerList = await axios.get('https://www.binance.com/bapi/nft/v1/public/nft/layer-search?keyword=', { headers: header }).then(res => {
            return res.data.data
        }).catch(e => {
            // console.log(e);
        });

        if (Array.isArray(layerList)) {
            layerList.forEach((layer, i) => {
                console.log(`Init Global cycle ${i}`);
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
                        helper.shuffle(proxy);
    
                        console.log('====================INIT parsing nft====================');
                        index++
                        if (proxyVar == undefined) {
                            break
                        }
    
                        const { host: proxyHost, port: portHost, proxyAuth: proxyAuth } = helper.proxyInit(proxyVar);
                        console.log('Proxy lenght ' + proxy.length + ' index ' + index);
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
                        // await helper.timeout(100 * index).then(() => {
                        // if (!var_break) {
                        axios.post('https://www.binance.com/bapi/nft/v1/friendly/nft/product-list', body, { headers: header, httpsAgent: agent }).then(res => {
                            console.log(res.status + ' ' + index + ' total= ' + res.data.data.total);
    
                            console.log('Send proxyVar ' + proxyVar);
    
                            arrayIteration(res.data.data.rows, proxyVar);
                            let n = res.data.data.total / 100;
                            console.log(Math.ceil(n));
                            let newData = new Date().getTime();
                            console.log(`Date cycle^ ${newData - data} ms`);
                            if (Math.ceil(n) == index) {
                                var_break = true
                            } // останавливаем итерацию
                            console.log(`Global cycle ${i}`);
                            if (i == layerList.length - 1) {
                                resolve({ status: 'ok', name_worker: 'binance_marketplace' })
                            }
    
    
    
                            return Math.ceil(n)
                        }).catch(e => {
                            console.log('Error');
                            console.log(`Global cycle ${i}`);
    
                            proxy.push(proxyVar)
                            console.log('Proxy lenght ' + proxy.length);
    
    
                            if (e?.response?.statusText != undefined) {
                                console.log(e?.response?.statusText);
    
    
                            } else {
                                // console.log(e);
                            }
                            // var_break = true;
                            if (i == layerList.length - 1) {
                                reject({ status: 'error', name_worker: 'binance_marketplace' })
                            }
                        })
                        // } else {
                        //     proxy.push(proxyVar);
                        //     // delDublicateProxy()
    
                        // }
    
                        // });
                        if (index == 101 || var_break) {
                            console.log('===========break==============');
                            console.log(`Global cycle ${i}`);
                            // proxy.push(proxyVar);
                            // delDublicateProxy();
    
    
                            var_break = false;
                            console.log('break\nProxy length ' + proxy.length);
    
                            break
                        } // у нас в ответе максимум 100 сущностей отсюда и 101
    
    
    
                    }
                })()
    
    
    
    
    
            });
        } else {
            reject({ status: 'error', name_worker: 'binance_marketplace', info: 'layerList no Array' })


        }


      
    })






}


let cloneProxySet;
function arrayIteration(array, proxySet) {
    if (proxySet != undefined) {
        cloneProxySet = Object.assign({}, { proxySet: proxySet });

    }




    array.forEach((ele, i) => {
        setTimeout(() => {
            let randomIndex = helper.getRandomInt(0, proxy.length);
            // console.log('Proxy length ' + proxy.length + ' randomIndex ' + randomIndex + ' ' + proxy[randomIndex] + ' ' + cloneProxySet.proxySet);


            const { host: proxyHost, port: portHost, proxyAuth: proxyAuth } = proxy[randomIndex] == undefined ? helper.proxyInit(cloneProxySet.proxySet) : helper.proxyInit(proxy[randomIndex]);
            if (proxy[randomIndex] == undefined) {
                proxy.push(cloneProxySet.proxySet)
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

            // header = getNewHeaders(headers);
            getProductDetail(ele, agent, header).then(() => {


                proxy.push(`${proxyOptions.host}:${proxyOptions.port}:${proxyOptions.proxyAuth}`); // возвращаем прокси в обойму на дочернем цикле

                console.log('Function arrayIteration END MarketPlace\nProxy length ' + proxy.length);
                console.log('Worker 3');







            }).catch((e) => {
                proxy.push(`${proxyOptions.host}:${proxyOptions.port}:${proxyOptions.proxyAuth}`);

                // let index = proxy.indexOf(`${proxyOptions.host}:${proxyOptions.port}:${proxyOptions.proxyAuth}`);
                // console.log(index);
                // if (index == -1) {
                // proxy.push(`${proxyOptions.host}:${proxyOptions.port}:${proxyOptions.proxyAuth}`);


                // }
                // proxy.push(`${proxyOptions.host}:${proxyOptions.port}:${proxyOptions.proxyAuth}`);
                // proxy.forEach((ele, i) => {
                //     let filter = proxy.filter(x => x == ele);
                //     if (filter.length > 1) {
                //         proxy.splice(i, 1);
                //     }

                // });
                console.log('Function arrayIteration END MarketPlace\nProxy length ' + proxy.length);
                console.log('Worker 3');




                console.log(e);
            });
            if (array.length - 1 == i) {
                proxy.push(cloneProxySet.proxySet);// вернули прокси из глобального цикла. возвращаем именно в этот момент, что бы наш итерратор жадл весь цикл


            }

        }, 20 * i);




    });





}

module.exports = { init }