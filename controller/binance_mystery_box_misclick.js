<<<<<<< HEAD
const { default: axios } = require("axios");
const tunnel = require("tunnel");
const size = 100;
// let agent = tunnel.httpsOverHttp({
//     proxy: {
//         host: "88.82.93.186",
//         port: 43937,
//         proxyAuth: "1765d78a21:7518c2dea1",
//     },
//     rejectUnauthorized: false,
// });

//   proxyOptions = {
//     host: proxyArray[0],
//     port: proxyArray[1],
//     proxyAuth: `${proxyArray[2] + ':' + proxyArray[3]}`,
// };
// agent = tunnel.httpsOverHttp({
//     proxy: proxyOptions,
//     rejectUnauthorized: false,
// });


let header = {
    Host: "www.binance.com",
    "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:94.0) Gecko/20100101 Firefox/94.0",
    Accept: "*/*",
    "Accept-Language": "ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3",
    "Accept-Encoding": "gzip",
    Referer: `https://www.binance.com/`,
    lang: "en",
    "x-ui-request-trace": "677b2e99-a59c-4cbd-b366-69d847cc78df",
    "x-trace-id": "677b2e99-a59c-4cbd-b366-69d847cc78df",
    "bnc-uuid": "36fb9cd7-1cb4-4381-a8c6-1d294267734f",
    "content-type": "application/json",
    "device-info":
        "eyJzY3JlZW5fcmVzb2x1dGlvbiI6Ijk2MCwxNDQwIiwiYXZhaWxhYmxlX3NjcmVlbl9yZXNvbHV0aW9uIjoiOTI5LDE0NDAiLCJzeXN0ZW1fdmVyc2lvbiI6IldpbmRvd3MgMTAiLCJicmFuZF9tb2RlbCI6InVua25vd24iLCJzeXN0ZW1fbGFuZyI6InJ1LVJVIiwidGltZXpvbmUiOiJHTVQrMyIsInRpbWV6b25lT2Zmc2V0IjotMTgwLCJ1c2VyX2FnZW50IjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NDsgcnY6OTQuMCkgR2Vja28vMjAxMDAxMDEgRmlyZWZveC85NC4wIiwibGlzdF9wbHVnaW4iOiIiLCJjYW52YXNfY29kZSI6IjA3NDg0YTBlIiwid2ViZ2xfdmVuZG9yIjoiR29vZ2xlIEluYy4gKEFNRCkiLCJ3ZWJnbF9yZW5kZXJlciI6IkFOR0xFIChSYWRlb24gUjkgMjAwIFNlcmllcyBEaXJlY3QzRDExIHZzXzVfMCBwc181XzAsIEQzRDExLTI2LjIwLjExMDMwLjE1MDAxKSIsImF1ZGlvIjoiMzUuNzM4MzI5NTkzMDkyMiIsInBsYXRmb3JtIjoiV2luMzIiLCJ3ZWJfdGltZXpvbmUiOiJFdXJvcGUvTW9zY293IiwiZGV2aWNlX25hbWUiOiJGaXJlZm94IFY5NC4wIChXaW5kb3dzKSIsImZpbmdlcnByaW50IjoiYWU1OTFiYzRlZDk5MzUyOWQxMTIwODc3YjBiZjU1NDEiLCJkZXZpY2VfaWQiOiIiLCJyZWxhdGVkX2RldmljZV9pZHMiOiIifQ==",
    clienttype: "web",
    "fvideo-id": "3223618618b2a6b6ba20a660a08d0298dffcdcde",
    csrftoken: "d41d8cd98f00b204e9800998ecf8427e",
    "Content-Length": "29",
    Origin: "https://www.binance.com",
    Connection: "keep-alive",
    Cookie:
        "cid=Y4i8bYsV; bnc-uuid=36fb9cd7-1cb4-4381-a8c6-1d294267734f; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%2217d7218bae5183-0602143e2ff1828-4c3e217e-1382400-17d7218bae6160%22%2C%22first_id%22%3A%22%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%2C%22%24latest_referrer%22%3A%22%22%7D%2C%22%24device_id%22%3A%2217d7218bae5183-0602143e2ff1828-4c3e217e-1382400-17d7218bae6160%22%7D; _ga=GA1.2.1419975887.1638296764; _gid=GA1.2.1417971414.1638296764; userPreferredCurrency=USD_USD; BNC_FV_KEY=3223618618b2a6b6ba20a660a08d0298dffcdcde; BNC_FV_KEY_EXPIRE=1638383165929; nft-init-compliance=true; source=referral; campaign=www.binance.com",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
};


let body = {
    // page: 1,
    size: 50,
    params: {
        // keyword: "",
        currency: "BUSD",
        // nftType: null,
        // amountFrom: "0.001",
        // amountTo: "3",
        // setStartTime: (function() {return new Date().getTime()})(),
        // orderBy: "list_time",
        orderType: -1,
        // serialNo: null,
        // tradeType: 0
    }
};
console.log(body);


async function getInfoBinNFTMysteryBox() {
    let num = await initNum();
    console.log(num);
    for (let index = 1; index <= num; index++) {
        body.page = index;
        let data = new Date().getTime();
        axios.post('https://www.binance.com/bapi/nft/v1/public/nft/market-mystery/mystery-list', JSON.stringify(body), { headers: header }).then(res => {
            console.log(res.status + ' ' + index);
            console.log(res.data.data.data[0].setStartTime);
            if (res.data.data.data[0].setStartTime > new Date()) {
                
            }
            arrayIteration(res.data.data.data);
            let n = res.data.data.total / size;
            // console.log(Math.ceil(n));
            let newData = new Date().getTime();
            console.log(`Date cycle^ ${newData - data} ms`);

            return Math.ceil(n)
        }).catch(e => {
            // console.log('Error');
            console.log(e?.response?.statusText);
        })

    }

}

async function initNum() {
    const number = await axios.post('https://www.binance.com/bapi/nft/v1/public/nft/market-mystery/mystery-list', JSON.stringify(body), { headers: header }).then(res => {
        let n = res.data.data.total / size;
        console.log(res.data.data.total);

        return Math.ceil(n)
    }).catch(e => {
        // console.log('Error');
        console.log(e?.response?.statusText);
    });
    return 1
}

function arrayIteration(array) {
    array.forEach(ele => {
        let da = new Date(ele.setStartTime);
        // console.log(da);

    });

}

module.exports = { getInfoBinNFTMysteryBox }
=======
const { default: axios } = require("axios");
const tunnel = require("tunnel");
const { proxy } = require("./../proxy_list");
const { UA } = require("./../ua");
const {getNaemListNFT} = require("./../controller/getNftStat");
const num = 2 // итерациий
let arrayNFT = [];



//   proxyOptions = {
//     host: proxyArray[0],
//     port: proxyArray[1],
//     proxyAuth: `${proxyArray[2] + ':' + proxyArray[3]}`,
// };
// agent = tunnel.httpsOverHttp({
//     proxy: proxyOptions,
//     rejectUnauthorized: false,
// });


let header = {
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


let body = {
    page: 1,
    size: 50,
    params: {
        // keyword: "",
        currency: "BUSD",
        // nftType: null,
        // amountFrom: "0.001",
        // amountTo: "3",
        setStartTime: new Date().getTime(),
        // setStartTime: (function() {return new Date().getTime()})(),
        // orderBy: "list_time",
        orderType: -1,
        // serialNo: null,
        tradeType: 0
    }
};
function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
async function init() {
arrayNFT = await getNaemListNFT();

    for (let i = 0; i < proxy.length; i++) {
        await getInfoBinNFTMysteryBox(proxyInit(proxy[i]), i);
        if (i == proxy.length -1) {
            console.log('!');
            init();
        }


    }
    // proxy.forEach(async (proxy, i) => {
    //     await getInfoBinNFTMysteryBox(proxyInit(proxy), i)


    // });

}


function proxyInit(proxy) {
    let proxyArray = proxy.split(":", 4);

    return { host: proxyArray[0], port: proxyArray[1], proxyAuth: `${proxyArray[2] + ':' + proxyArray[3]}` }

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

function getInfoBinNFTMysteryBox({ host: proxyHost, port: portHost, proxyAuth: proxyAuth }, i) {
    return new Promise((resolve, reject) => {
        // header["User-Agent"] = UA[i];
        // console.log(header);
        // let num = initNum();
        console.log(num);
        let proxyOptions = {
            host: proxyHost,
            port: portHost,
            proxyAuth: proxyAuth,
        };
        let agent = tunnel.httpsOverHttp({
            proxy: proxyOptions,
            rejectUnauthorized: false,
        });

        let breakSwitch = false;

        for (let index = 1; index <= num; index++) {
            if (breakSwitch) {
                break
            }

            shuffle(UA);
            header["User-Agent"] = UA[index];
            // body.page = index; // смена страницы -- не используем, просматриваем всегда первую страницу результатов
            let data = new Date().getTime();
            axios.post('https://www.binance.com/bapi/nft/v1/public/nft/market-mystery/mystery-list', JSON.stringify(body), { headers: header, httpAgent: agent }).then(res => {
                console.log(res.status + ' ' + index);
                if (index >= Math.ceil(num / 2)) {
                    resolve();
                    breakSwitch = true;
                };

                if (res.data.data?.data[0]?.setStartTime != undefined) {
                    console.log(res.data.data.data[0].productId);


                } else {
                    console.log(res.data.data);


                }

                arrayIteration(res.data.data.data);
                // let n = res.data.data.total / 100;
                // console.log(Math.ceil(n));
                let newData = new Date().getTime();
                console.log(`Date cycle^ ${newData - data} ms`);

                // return Math.ceil(n)
            }).catch(e => {
                // console.log('Error');
                breakSwitch = true;
                // header.lang = 'ru';
            
                timeout(10000*index).then(()=> resolve())
                // reject();
                console.log(e);
            })

        }
    })


}

function initNum() {
    // const number = await axios.post('https://www.binance.com/bapi/nft/v1/public/nft/market-mystery/mystery-list', JSON.stringify(body), { headers: header }).then(res => {
    //     let n = res.data.data.total / 100;
    //     console.log(res.data.data.total);

    //     return Math.ceil(n)
    // }).catch(e => {
    //     // console.log('Error');
    //     console.log(e?.response?.statusText);
    // }); изначально я хотел перебрать все значения в базе @total@ теперь используем констануту num
    return 100
}

function arrayIteration(array) {
    array.forEach(ele => {
        // let da = new Date(ele.setStartTime);
        // console.log(ele);

       let wd = arrayNFT.filter(x=> x.title == ele.title && (x.minimum - x.minimum*0) >= ele.amount);
       if (wd.length > 0) {
        console.log(wd);
        console.log(ele);
       }
      

    });

}

module.exports = { getInfoBinNFTMysteryBox, init }
>>>>>>> 1bbc3e2cd3cff69eb9c0a86ec82700be4e0e6973
