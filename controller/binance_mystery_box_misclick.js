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