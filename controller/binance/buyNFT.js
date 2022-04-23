const { default: axios } = require("axios");
const { get_captcha } = require('./binance_mysteribox');
const { fakeArrayNFT } = require('./fakeData/fackeDataNFT');
const binanceAdminCookies = require("../../model/binanceAdminCookies");
const { UA } = require("../../ua");
const { proxy } = require("../../proxy_list");
const tunnel = require("tunnel");


let dateCaptcha;
let captchaKey;
let cycle = 0;
const errorVar = 2; //Сколько не успешных попыток допускать


async function buyInit(cookies) {
    await initCaptcha().then(() => {
        // console.log(captchaKey);
        buy(captchaKey, cookies)
    });


}

function initCaptcha() {
    return new Promise((resolve, reject) => {
        // console.log(dateCaptcha);
        // console.log((new Date().getTime() - 1.5 * 60 * 1000));
        if (dateCaptcha <= (new Date().getTime() - 1.5 * 60 * 1000) || dateCaptcha == undefined) {
            get_captcha().then(res => {
                dateCaptcha = new Date().getTime();
                // console.log(res);
                captchaKey = res;
                resolve();

            })
        } else {
            console.log('Captcha key actual');
            resolve();
        };
    })

}

async function buy(key, cookies) {
    let headers = {
        accept: "*/*",
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
    };



    let full = "";
    let json = JSON.parse(cookies.Cookie);
    json.cookies.forEach((element) => {
        full = full + element.name + "=" + element.value + "; ";
    });
    headers["x-nft-checkbot-token"] = key;
    headers["User-Agent"] = cookies.UserAgent;
    headers["x-ui-request-trace"] = cookies.xuirequesttrace;
    headers["x-trace-id"] = cookies.xtraceid;
    headers["bnc-uuid"] = cookies.bncuuid;
    headers["device-info"] = cookies.deviceinfo;
    headers["fvideo-id"] = cookies.deviceinfo;
    headers.csrftoken = cookies.csrftoken;
    headers["x-nft-checkbot-sitekey"] =
        "6LeUPckbAAAAAIX0YxfqgiXvD3EOXSeuq0OpO8u_";
    headers.Cookie = full;
    // let endCookParse = new Date().getTime();
    // console.log(`endCookParse ${endCookParse - start} ms`);
    let ids = {};
    let tokens = [];
    function loop(key) {
        let time = Date.now();
        // let drop = nftInfo;


        tokens.push(false);

        for (let index = 0; index < fakeArrayNFT.length; index++) {
            const element = fakeArrayNFT[index];
            // orderInit(element['amount'] - element['amount']*0.7, element["productId"], headers);
            shuffle(UA);
            shuffle(proxy);
            let { host: proxyHost, port: portHost, proxyAuth: proxyAuth } = proxyInit(proxy[0]);
            let proxyOptions = {
                host: proxyHost,
                port: portHost,
                proxyAuth: proxyAuth,
                headers: {
                    'User-Agent': UA[index]
                },
            };
            // console.log(proxyOptions);
            let agent = tunnel.httpsOverHttp({
                proxy: proxyOptions,
                rejectUnauthorized: false,
            });

            headers["User-Agent"] = UA[index];
            headers.referer = `https://www.binance.com/en/nft/goods/mystery-box/detail?productId=${element["productId"]}&isOpen=true&isProduct=1`
 
            let body = { amount: element['amount'] - element['amount'] * 0.9, productId: element["productId"], tradeType: 0 };
            axios
                .post(
                    "https://www.binance.com/bapi/nft/v1/private/nft/nft-trade/order-create",
                    body,
                    { headers: headers, httpsAgent: agent }
                )
                .then((res) => {
                    if (res.status == 200) {
                        console.log(res.status);
                        if (res.data?.message == "Token expired") {
                            get_captcha();
                        } else if (res.data?.message == 'Too many requests. Please try again later.') {
                            console.log('! Too many requests. Please try again later. !');
                            console.log(res.data);


                            let sleep = 200;
                            setTimeout(() => {loop(key)}, sleep);

                        } else if (res.data?.message == 'Out of stock') {
                            console.log('Out of stock')

                        } else if (res.data.code == '10000222') {
                            console.log(res.data);
                            // console.log(headers);
                            // process.exit(0)
                            dateCaptcha = new Date().getTime() - 2*60*1000;
                            buyInit(cookies);


                        } else {
                            console.log(res.data);
                            // process.exit(0)
                            let body = {
                                orderId: res.data.data.orderId,
                            };
                            // axios
                            //     .post(
                            //         "https://www.binance.com/bapi/nft/v1/private/nft/mystery-box/purchase-status",
                            //         body,
                            //         { headers: headers, httpsAgent: agent }
                            //     )
                            //     .then((res) => {
                            //         if (res.data?.data.status == 'ORDER_SUCCESS') {

                            //         }
                            //         if (res.data?.data.status == 'ORDER_INITIAL') {

                            //         }



                            //         console.log(res.data);
                            //     });
                        }


                    } else {
                        console.log(res.status);
                        console.log(res.data);
                        //   setTimeout(() => {loop(key)}, lastTime);

                    }
                    let end = new Date().getTime();
                    // console.log(`Скрпит работал ${end - start} - Текущие время: ${end}`);
                })
                .catch(async (e) => {
                    cycle++
                    // console.log(e);
                    if (errorVar == cycle) {
                        if (e.response?.data.message == "Token expired") {
                            console.log('new Error Token expired');
                            let newCookies = await binanceAdminCookies.findOne(
                                { user: cookies.user },
                                (err, call) => {
                                    if (err) console.log(err);

                                    if (call) {
                                        return call;
                                    }
                                }
                            );
                            cookies = newCookies;
                            console.log(e.response?.data);
                            buyInit(cookies);

                            // get_captcha()
                            //     .then((res) => {
                            //         buy(res);
                            //     })
                            //     .catch((e) => {
                            //         console.log(e);
                            //     });
                        } else if (e?.response?.data.code == "000002") {
                            console.log(e?.response?.data.message);
                        } else if (e?.response?.data.code == '10000222') {
                            console.log(e?.response?.data);
                            buyInit(cookies);


                        } else {
                            console.log(e);
                            let sleep = 100;
                            setTimeout(() => {loop(key)}, sleep);
                            let ranS = getRandomInt(1233, 99992);
                            fs.writeFile(`./temp/err${ranS}.html`, e, function (error) {
                                try {
                                    if (error) throw error; // если возникла ошибка
                                    console.log("Асинхронная запись HTML файла завершена.");

                                } catch {
                                    console.log('Не смогли записать лог ошибки')
                                }

                            });

                        }
                    }

                });

        }




        // if (time + diffMS + lastTime >= drop.startTime) {
        //     letlogDate = new Date();
        //     console.log('Init buy.. ' + letlogDate);
        //     for (let i = 0; i < power; i++) {
        //         let body = { number: number, productId: productId };
        //         axios
        //             .post(
        //                 "https://www.binance.com/bapi/nft/v1/private/nft/mystery-box/purchase",
        //                 body,
        //                 { headers: headers }
        //             )
        //             .then((res) => {
        //                 if (res.status == 200) {
        //                     console.log(res.status);
        //                     console.log(res.data);
        //                     if (res.data?.message == "Token expired") {
        //                         get_captcha();
        //                     } else if (res.data?.message == 'Out of stock' && lastTime < 0) {
        //                         setTimeout(loop(key), buydropMS);

        //                     } else if (res.data?.message == 'Too many requests. Please try again later.') {
        //                         let sleep = 300;
        //                         setTimeout(loop(key), sleep);

        //                     } else if (res.data?.message == 'Out of stock' && lastTime > 0) {
        //                         console.log('Out of stock :(')

        //                     } else {
        //                         let body = {
        //                             orderId: res.data.data.orderId,
        //                         };
        //                         axios
        //                             .post(
        //                                 "https://www.binance.com/bapi/nft/v1/private/nft/mystery-box/purchase-status",
        //                                 body,
        //                                 { headers: headers }
        //                             )
        //                             .then((res) => {
        //                                 if (res.data?.data.status == 'ORDER_SUCCESS') {

        //                                 }
        //                                 if (res.data?.data.status == 'ORDER_INITIAL') {

        //                                 }



        //                                 console.log(res.data);
        //                             });
        //                     }


        //                 } else {
        //                     console.log(res.status);
        //                     console.log(res.data);
        //                     setTimeout(() => { loop(key) }, lastTime);

        //                 }
        //                 let end = new Date().getTime();
        //                 console.log(`Скрпит работал ${end - start} - Текущие время: ${end}`);
        //             })
        //             .catch(async (e) => {
        //                 cycle++
        //                 if (errorVar == cycle) {
        //                     if (e.response?.data.message == "Token expired") {
        //                         let newCookies = await binanceAdminCookies.findOne(
        //                             { user: cookies.user },
        //                             (err, call) => {
        //                                 if (err) console.log(err);

        //                                 if (call) {
        //                                     return call;
        //                                 }
        //                             }
        //                         );
        //                         cookies = newCookies;
        //                         console.log(e.response?.data);
        //                         get_captcha()
        //                             .then((res) => {
        //                                 buy(res);
        //                             })
        //                             .catch((e) => {
        //                                 console.log(e);
        //                             });
        //                     } else {
        //                         console.log(e);
        //                         function getRandomInt(min, max) {
        //                             min = Math.ceil(min);
        //                             max = Math.floor(max);
        //                             return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
        //                         }
        //                         let sleep = 100;
        //                         setTimeout(loop(key), sleep);
        //                         let ranS = getRandomInt(1233, 99992);
        //                         fs.writeFile(`./temp/err${ranS}.html`, e, function (error) {
        //                             try {
        //                                 if (error) throw error; // если возникла ошибка
        //                                 console.log("Асинхронная запись HTML файла завершена.");

        //                             } catch {
        //                                 console.log('Не смогли записать лог ошибки')
        //                             }

        //                         });

        //                     }
        //                 }

        //             });
        //     }
        // } else {
        //     let newDate = new Date().getTime();
        //     let logDateNew = new Date();
        //     crondown = (drop.startTime - newDate) - (lastTime > 0 ? lastTime : (lastTime * -1));
        //     crondown = crondown > 0 ? crondown : (crondown * -1);

        //     console.log('loop waite... ' + crondown + ' ms ' + 'Date: ' + logDateNew);
        //     setTimeout(() => { loop(key) }, crondown);
        // }
    }

    loop(key);
}


// function orderInit(amount, productId, headers) {
//     let body = { amount: amount, productId: productId, tradeType: 0 };

//     axios
//         .post(
//             "https://www.binance.com/bapi/nft/v1/private/nft/mystery-box/purchase",
//             body,
//             { headers: headers }
//         )
//         .then((res) => {
//             if (res.status == 200) {
//                 console.log(res.status);
//                 console.log(res.data);
//                 if (res.data?.message == "Token expired") {
//                     get_captcha();
//                 }
//                 //   else if (res.data?.message == 'Out of stock' && lastTime < 0) {
//                 //       console.log('! Out of stock !');
//                 //     setTimeout(loop(key), buydropMS);

//                 //   }
//                 else if (res.data?.message == 'Too many requests. Please try again later.') {
//                     console.log('! Too many requests. Please try again later. !');

//                     let sleep = 300;
//                     setTimeout(loop(key), sleep);

//                 } else if (res.data?.message == 'Out of stock') {
//                     console.log('Out of stock :(')

//                 } else {
//                     let body = {
//                         orderId: res.data.data.orderId,
//                     };
//                     axios
//                         .post(
//                             "https://www.binance.com/bapi/nft/v1/private/nft/mystery-box/purchase-status",
//                             body,
//                             { headers: headers }
//                         )
//                         .then((res) => {
//                             if (res.data?.data.status == 'ORDER_SUCCESS') {

//                             }
//                             if (res.data?.data.status == 'ORDER_INITIAL') {

//                             }



//                             console.log(res.data);
//                         });
//                 }


//             } else {
//                 console.log(res.status);
//                 console.log(res.data);
//                 //   setTimeout(() => {loop(key)}, lastTime);

//             }
//             let end = new Date().getTime();
//             console.log(`Скрпит работал ${end - start} - Текущие время: ${end}`);
//         })
//         .catch(async (e) => {
//             cycle++
//             console.log(e);
//             if (errorVar == cycle) {
//                 if (e.response?.data.message == "Token expired") {
//                     console.log('new Error Token expired');
//                     let newCookies = await binanceAdminCookies.findOne(
//                         { user: cookies.user },
//                         (err, call) => {
//                             if (err) console.log(err);

//                             if (call) {
//                                 return call;
//                             }
//                         }
//                     );
//                     cookies = newCookies;
//                     console.log(e.response?.data);
//                     buyInit();
//                     // get_captcha()
//                     //     .then((res) => {
//                     //         buy(res);
//                     //     })
//                     //     .catch((e) => {
//                     //         console.log(e);
//                     //     });
//                 } else {
//                     console.log(e);
//                     let sleep = 100;
//                     setTimeout(loop(key), sleep);
//                     let ranS = getRandomInt(1233, 99992);
//                     fs.writeFile(`./temp/err${ranS}.html`, e, function (error) {
//                         try {
//                             if (error) throw error; // если возникла ошибка
//                             console.log("Асинхронная запись HTML файла завершена.");

//                         } catch {
//                             console.log('Не смогли записать лог ошибки')
//                         }

//                     });

//                 }
//             }

//         });
// }

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i

        // поменять элементы местами
        // мы используем для этого синтаксис "деструктурирующее присваивание"
        // подробнее о нём - в следующих главах
        // то же самое можно записать как:
        // let t = array[i]; array[i] = array[j]; array[j] = t
        [array[i], array[j]] = [array[j], array[i]];
    }
}
function proxyInit(proxy) {
    let proxyArray = proxy.split(":", 4);

    return { host: proxyArray[0], port: proxyArray[1], proxyAuth: `${proxyArray[2] + ':' + proxyArray[3]}` }

}
module.exports = { buyInit }