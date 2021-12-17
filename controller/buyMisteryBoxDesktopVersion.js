// ==UserScript==
// @name         Binance CAPTCHA
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  try to take over the world!
// @author       You
// @match        https://www.binance.com/*
// @icon         https://www.google.com/s2/favicons?domain=binance.com
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @connect      rucaptcha.com
// @connect      api.binance.com
// @connect      api.anti-captcha.com
// @connect      api.telegram.org
// ==/UserScript==

(async function() {
    'use strict';

    let number = 2;
    let captcha_n = 2; // сколько запрашивать капч
    let check_captcha = 1; // проверять капчи до использования

    let diffMS = 0; // за сколько мс начать покупать
    let buydropMS = 10; // сколько спать между покупками
    let power = 1; // множитель запросов, 1 - как обычно
    let base_url = 'https://www.binance.com/ru/nft/history'; // страница для которой запрашивать капчу
    let key = '15d44b5a18e55164829aeee3948be439'; // ключ рукапчи




    let productId;
    let requiredHeaders = [
        "lang", "X-UI-REQUEST-TRACE", "X-TRACE-ID", "BNC-UUID", "Content-Type",
        "device-info", "clienttype", "FVIDEO-ID", "csrftoken"
    ];

    function uuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    let id = Math.random();
    let sent_logs = false;
    let logs = [];
    const send_logs = () => {
        var TOKEN = "329632188:AAEe39Ss056jn4ndP0-zJU-HcqyaDpN_zAc";
        var chatID = "264145195";
        var api = "https://api.telegram.org/bot" + TOKEN + "/sendMessage?chat_id="+chatID+"&text=";
        let text = "" + id;
        while (logs.length && (text + '\n' + logs[0]).length < 4000) {
            text += '\n' + logs[0];
            logs = logs.slice(1);
        }
        GM_xmlhttpRequest({
            method: "GET",
            url: api + encodeURIComponent(text),
            onload: function(response) {
                console.log('LOGS SENT')
            }
        });
        if (logs.length) {
            setTimeout(send_logs, 1000);
        }
    }
    const log = function () {
        logs.push(Array.from(arguments).join('\t'));
    }


    let buyed = {};
    const sleep = ms => new Promise((resolve, _) => setTimeout(resolve, ms));
    let xhr = window.XMLHttpRequest;
    let fetch = window.fetch;

    delete self.fetch;
    delete globalThis.fetch;
    delete window.fetch;

    let allHeaders = false;
    let headers = {
        "accept": "*/*",
        "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6,zh;q=0.5",
        "clienttype": "web",
        "content-type": "application/json",
        "lang": "en",
        "sec-ch-ua": "\"Google Chrome\";v=\"93\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"93\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin"
    };

    const get_captcha = (_url, cb) => {
        GM_xmlhttpRequest({
            method: "POST",
            url : `https://api.anti-captcha.com/createTask`,
            headers:{
                "accept": "application/json",
                "content-type": "application/json",
            },
            data : JSON.stringify({
                "clientKey":"5cbe5e6bcd1c3e0be7a2fff12461b21d",
                "task" : {
                    "type":"RecaptchaV3TaskProxyless",
                    "websiteURL":base_url,
                    "websiteKey":"6LeUPckbAAAAAIX0YxfqgiXvD3EOXSeuq0OpO8u_",
                    "minScore": 0.9,
                    "pageAction": "submit",
                    "isEnterprise": false,
                }
            }),
            onload: function(response) {
                console.log(response.responseText);
                const id = JSON.parse(response.responseText).taskId;

                const check = (id, cb) => {
                    GM_xmlhttpRequest({
                        method: "POST",
                        url : `https://api.anti-captcha.com/getTaskResult`,
                        headers:{
                            "accept": "application/json",
                            "content-type": "application/json",
                        },
                        data : JSON.stringify({
                            "clientKey":"5cbe5e6bcd1c3e0be7a2fff12461b21d",
                            "taskId":id,
                        }),
                        onload: function(response) {
                            const res = JSON.parse(response.responseText);
                            console.log(res);
                            if (res.status === 'ready') {
                                cb(res.solution.gRecaptchaResponse);
                            } else {
                                setTimeout(() => check(id, cb), 3000);
                            }
                        }
                    });
                }
                check(id, cb);
            }
        });
    }


    const fetch_drop = async () => {
        let t = uuid();
        headers['x-ui-request-trace'] = t;
        headers['x-trace-id'] = t;
        return (await(await fetch("https://www.binance.com/bapi/nft/v1/friendly/nft/mystery-box/detail?productId=" + productId, {
            "method": "GET",
            "headers": headers,
            "credentials": "same-origin",
            "referrer": "https://www.binance.com/en/nft/blindBox/detail?productId=" + productId,
            "referrerPolicy": "origin-when-cross-origin",
            "mode": "cors",
            "body": null
        })).json()).data;
    };
    const fetch_time = () => {
        return new Promise((resolve, reject) => {
            GM_xmlhttpRequest({
                method: "GET",
                url: "https://api.binance.com/api/v3/time",
                onload: function(response) {
                    resolve(JSON.parse(response.responseText).serverTime);
                }
            });
        });
    };

    let requests = 0;
    productId = (new URLSearchParams(document.location.search)).get('productId');
    let drop = await fetch_drop();
    console.log(drop.name, drop.limitPerTime, (drop.startTime - Date.now()) / 1000 / 60 / 60);
    log(drop.name, drop.limitPerTime, (drop.startTime - Date.now()) / 1000 / 60 / 60);

    let params = {
        headers,
        "referrer": `https://www.binance.com/en/nft/blindBox/detail?number=${number}&productId=${productId}`,
        "referrerPolicy": "origin-when-cross-origin",
        "body": JSON.stringify({number, productId}),
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
    };

    const buy = async () => {
        console.log('diffMS:', diffMS);
        log('diffMS:', diffMS);

        let diff = 0;
        let n = 4;
        for (let i = 0; i < n; i++) {
            let t = Date.now();
            let server_time = await fetch_time();
            diff += server_time - t;
            console.log(t - server_time);
        }
        diff /= n;
        console.log('Diff:', diff);
        log('Diff:', diff);

        diffMS += diff;

        // drop.startTime = Math.floor((Date.now() + 9999) / 10000) * 10000;

        let ids = {};
        let tokens = [];
        const loop = () => {
            setTimeout(loop, buydropMS);
            const time = Date.now();
            if (time + diffMS + 100 * 1000 > drop.startTime && time + diffMS + 10000 < drop.startTime && tokens.length < captcha_n) {
                tokens.push(false);
                get_captcha(base_url, key => {
                //grecaptcha.execute("6LeUPckbAAAAAIX0YxfqgiXvD3EOXSeuq0OpO8u_").then((key) => {
                    console.log('Got captcha key');
                    if (check_captcha) {
                        headers['x-nft-checkbot-token'] = key;
                        fetch("https://www.binance.com/bapi/nft/v1/private/nft/mystery-box/purchase", params)
                        .then(res => res.text().then(text => {
                            if (text.indexOf('для продажи') !== -1 || text.indexOf('не существует') !== -1 || text.indexOf('not for sale') !== -1 || text.indexOf('exists') !== -1) {
                                console.log('key ok');
                                tokens[tokens.indexOf(false)] = key
                                console.log(tokens);
                            } else {
                                tokens.splice(tokens.indexOf(false), 1);
                                console.log(text);
                            }
                        }, error => {
                            console.log(error);
                            tokens.splice(tokens.indexOf(false), 1);
                        }));
                    } else {
                        tokens[tokens.indexOf(false)] = key
                    }
                });
            }
            if (time + diffMS > drop.startTime && time + diffMS < drop.startTime + 1000) {
                for (let i = 0; i < power; i++) {
                    requests++;
                    let t = uuid();
                    headers['x-ui-request-trace'] = t;
                    headers['x-trace-id'] = t;
                    headers['x-nft-checkbot-token'] = tokens[requests % tokens.length];
                    fetch('https://www.binance.com/bapi/nft/v1/private/nft/mystery-box/purchase', params)
                        .then(res => res.text().then(text => {

                        console.log(time + diffMS, Date.now(), text.slice(0, 100));
                        // console.log(time, Date.now() - drop.startTime, res.headers.get('date'), text);
                        // log(time, Date.now() - drop.startTime, res.headers.get('date').slice(20), text.slice(0, 50));

                        if (text.indexOf('"code"') !== -1) {
                            let code = parseInt(text.slice(text.indexOf('"code"') + 8));
                            ids[code] = ids[code] || 0;
                            ids[code]++;
                        } else {
                            ids['html'] = ids['html'] || 0;
                            ids['html']++;
                        }
                    }));
                }
            }
            if (time + diffMS > drop.startTime + 5000 && !sent_logs) {
                console.log(ids);
                log(JSON.stringify(ids));
                sent_logs = true;
                setTimeout(send_logs, Math.floor(Math.random() * 30000));
            }
        };

        loop();
    };

    const xhrPrototype = window.XMLHttpRequest.prototype;
    const setRequestHeader = xhrPrototype.setRequestHeader;
    xhrPrototype.setRequestHeader = function() {
        if (requiredHeaders.some(q => q.toLowerCase() === arguments[0].toLowerCase())) {
            if (arguments[0].toLocaleLowerCase() != 'content-type') {
                headers[arguments[0]] = arguments[1];
            }
            if (!allHeaders && requiredHeaders.every(header => headers[header.toLowerCase()])) {
                allHeaders = true;
                headers['x-nft-checkbot-sitekey'] = '6LeUPckbAAAAAIX0YxfqgiXvD3EOXSeuq0OpO8u_';
                console.log(headers);
                let button = document.createElement("Button");
                button.innerHTML = "Взять дроп одним запросом для теста";
                button.style = "top:250px;right:200px;position:fixed;z-index: 9999; width: 150px; height: 150px;";
                button.addEventListener('click', () => {
                    get_captcha(base_url, key => {
                        headers['x-nft-checkbot-token'] = key;
                        console.log(key);

                        fetch("https://www.binance.com/bapi/nft/v1/private/nft/mystery-box/purchase", params)
                            .then(res => res.text().then(text => button.innerHTML += JSON.parse(text).message + '\n', error => button.innerHTML += error.toString() + '\n'));
                    });
                });
                document.body.appendChild(button);
                {
                    let button = document.createElement("Button");
                    button.innerHTML = "Взять дроп через минуту для теста";
                    button.style = "top:200px;right:200px;position:fixed;z-index: 9999; width: 150px; height: 50px;";
                    button.addEventListener('click', () => {
                        drop.startTime = Date.now() + 60000;
                        sent_logs = false;
                    });
                    document.body.appendChild(button);
                }
                buy();
            }
        }
        return setRequestHeader.apply(this, arguments);
    };
})();