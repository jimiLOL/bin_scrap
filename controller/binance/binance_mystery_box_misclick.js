// Получаем данные из фильтра бинанса, отстование api 1-2 минуты - не подходит для мисклика, но может подходить для парсинга.

const { default: axios } = require("axios");
const tunnel = require("tunnel");
const { proxy } = require("../../proxy_list");
const { UA } = require("../../ua");

const helper = require('./../helper/helper');
const { getNaemListNFT } = require("./getNftStat");
const { arrayNFTCollectionName } = require("./nftArrayData");
const {
    techbicaleventTelegram,
} = require("../sendTelegram");
let { getNewHeaders } = require('./getHeaders');
const { getProductDetail } = require('./get_productDetali');

const proxyLength = proxy.length;

// let num = 10 // итерациий
// let arrayNFT = [];



//   proxyOptions = {
//     host: proxyArray[0],
//     port: proxyArray[1],
//     proxyAuth: `${proxyArray[2] + ':' + proxyArray[3]}`,
// };
// agent = tunnel.httpsOverHttp({
//     proxy: proxyOptions,
//     rejectUnauthorized: false,
// });


let headers = {
    Host: "www.binance.com",
    "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:94.0) Gecko/20100101 Firefox/94.0",
    Accept: "*/*",
    "Accept-Encoding": "gzip",
    Referer: `https://www.binance.com/`,
    lang: "ru",
    "content-type": "application/json",
    clienttype: "web",
    Origin: "https://www.binance.com",
    Connection: "keep-alive",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
};

let header;


const arrayIterator = arr => ({
    [Symbol.asyncIterator]() {
        let i = arr.length;
        return {
            index: 0,
            next() {
                console.log('=========================== ' + this.index + ' index iterator =================================================');
                if (this.index < proxyLength) {
                    //   console.log(this.index, arr.length);
                    return awaitArray(arr[this.index++], --i);
                } else {
                    return { done: true }
                }
            }
        }
    }
})
awaitArray = (val, length) => {
    let integer = 0; // предохранитель от бесконечной рекурсии
    return new Promise((resolve) => {
        function recursion() {
            return new Promise((resolve) => {
                if (proxy.length != proxyLength && length > 0) {
                    helper.timeout(1500).then(() => {
                        integer++
                            // console.log('leng != length MeysteryBox ' + proxy.length, proxyLength);

                            if (integer > 500) {
                                console.log('leng != length ' + proxy.length, proxyLength);
                                // proxyLength = proxy.length;
    
                                console.log(proxy.length + ' > '+ proxyLength);
    
                            }
                            proxy.forEach((ele, i) => {
                                let filter = proxy.filter(x => x == ele);
                                if (filter.length > 1) {
                                    console.log(filter);
                                    // proxy.splice(i, 1);
                                    console.log('length ' + proxy.length, proxyLength);
                                    process.exit(0)

                                }
            
                            });
                        // if (proxy.length > proxyLength) {
                        //     proxy.forEach((ele, i) => {
                        //         let filter = proxy.filter(x => x == ele);
                        //         if (filter.length > 1) {
                        //             proxy.splice(i, 1);
                        //         }
                        //     });
                        // }
                        recursion().then((res) => {
                            resolve(res)
                        })
                    })
                } else if (length < 0) {
                    console.log('=========================leng < 0=========================');
                    integer = 0;
                    resolve({ done: true })
                } else {
                    console.log('=====!===!=========!===done: false====!=!=========!=======!==========');
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

async function init() {
    // arrayNFT = await getNaemListNFT();
    header = getNewHeaders(headers);
    const layerList = await axios.get('https://www.binance.com/bapi/nft/v1/public/nft/mystery-box/list?page=1&size=1000', { headers: header }).then(res => {
        return res.data.data
    });
    helper.shuffle(proxy);

    layerList.forEach(async (layer, indexLayer) => {
        console.log(layer.name);
        helper.shuffle(UA);
        let body = {
            page: 1,
            size: 100,
            params: {
                // keyword: "",
                currency: "BUSD",
                nftType: null,
                // amountFrom: "0.001",
                // amountTo: "3",
                // setStartTime: new Date().getTime(),
                // setStartTime: (function() {return new Date().getTime()})(),
                // orderBy: "list_time",
                // orderType: -1,
                serialNo: [],
                tradeType: null
            }
        };
        body.params.serialNo.push(layer.serialsNo);
        let i = 0;
        let breakSwitch = false;
        for await (const proxyVar of arrayIterator(proxy)) {
            console.log('====================INIT parsing Mystery BOX====================');
            console.log(proxyVar);
            console.log(proxy[i]);
            let indexProxy = proxy.indexOf(proxyVar);
            proxy.splice(indexProxy, 1);

            i++
            
            await getInfoBinNFTMysteryBox(helper.proxyInit(proxyVar), i, body).then(res => {
                breakSwitch = res;
            }).catch(e=> {
                console.log(e);
            });
            if (breakSwitch) {
                break
            }
            // if (i == proxy.length - 1) {
            //     console.log('!');
            //     init();
            // } // рекурсия


        }

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

function getInfoBinNFTMysteryBox({ host: proxyHost, port: portHost, proxyAuth: proxyAuth }, i, body) {
    return new Promise(async (resolve, reject) => {
        console.log('Start "getInfoBinNFTMysteryBox" Proxy length ' + proxy.length);

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

        axios.post('https://www.binance.com/bapi/nft/v1/public/nft/market-mystery/mystery-list', JSON.stringify(body), { headers: header, httpsAgent: agent }).then(res => {
            console.log(res.status + ' ' + i + ' total^ ' + res.data.data.total);
            console.log(body);
            // console.log(res.data.data.data[0]);
            let num = Math.ceil(res.data.data.total/100);
            console.log('i ' + i + ' num ' + num);
            if (res.data.data.total == 0 || i >= num) {

                breakSwitch = true
            proxy.push(`${proxyOptions.host}:${proxyOptions.port}:${proxyOptions.proxyAuth}`);
        console.log('End cycle "getInfoBinNFTMysteryBox" Proxy length ' + proxy.length);

            resolve(breakSwitch);


            } else {
        console.log('Await parsing... cycle "getInfoBinNFTMysteryBox" Proxy length ' + proxy.length);


                // if (res.data.data?.data[0]?.setStartTime != undefined) {
                //     console.log(res.data.data.data[0].productId);
    
    
                // } else {
                //     console.log(res.data.data);
    
    
                // }
    
                arrayIteration(res.data.data.data, `${proxyOptions.host}:${proxyOptions.port}:${proxyOptions.proxyAuth}`);
                resolve(breakSwitch);
    
             
                let newData = new Date().getTime();
                console.log(`Date cycle^ ${newData - data} ms`);

            }
         

          

        }).catch(e => {
            console.log('Error');
            proxy.push(`${proxyOptions.host}:${proxyOptions.port}:${proxyOptions.proxyAuth}`);
            reject()
 
          
        })

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
                process.exit(0)
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

            header = getNewHeaders(headers);
            getProductDetail(ele, agent, header).then(() => {


                proxy.push(`${proxyOptions.host}:${proxyOptions.port}:${proxyOptions.proxyAuth}`); // возвращаем прокси в обойму на дочернем цикле

                console.log('Function arrayIteration  Mystery Box END\nProxy length ' + proxy.length);






            }).catch((e) => {
                // process.exit(1)
                // let index = proxy.indexOf(`${proxyOptions.host}:${proxyOptions.port}:${proxyOptions.proxyAuth}`);
                // console.log(index);
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
                console.log('Function arrayIteration Mystery Box END\nProxy length ' + proxy.length);



                console.log(e);
            })

        }, 50 * i);


    });

    proxy.push(cloneProxySet.proxySet);// вернули прокси из глобального цикла. возвращаем именно в этот момент, что бы наш итерратор жадл весь цикл




}


function sendMessage(message) {
    console.log(message);
    techbicaleventTelegram(
        1,
        `Нашли ${message}`,
        "....."
    );
}
module.exports = { getInfoBinNFTMysteryBox, init }