const NftPokemon = require("../model/navigationbot");
const {
  senDataTelegram,
  techbicaleventTelegram,
  sendInfoTelegram,
} = require("../controller/sendTelegram");
const { default: axios } = require("axios");
const { addDB, updatePriceDB } = require("./addDB");
const binanceIdProduct = require("../model/binanceIdProduct");
const tunnel = require("tunnel");
const mongoose = require('mongoose');
const binanceMysterBoxAnons = require('../model/binanceMysterBoxAnons');

const agent = tunnel.httpsOverHttp({
  proxy: {
    host: "127.0.0.1",
    port: 8867,
  },
  rejectUnauthorized: false,
});
const header2 = {
    Host: "www.binance.com",
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:94.0) Gecko/20100101 Firefox/94.0",
    Accept: "*/*",
    "Accept-Language": "ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3",
    "Accept-Encoding": "gzip",
    Referer:
      "https://www.binance.com/ru/nft/mystery-box",
    lang: "en",
    "x-ui-request-trace": "714ef858-d125-4160-be76-5244f7f3b85e",
    "x-trace-id": "714ef858-d125-4160-be76-5244f7f3b85e",
    "bnc-uuid": "86b862f5-72a4-4496-a73d-35f1feb98850",
    "content-type": "application/json",
    "device-info":
      "eyJzY3JlZW5fcmVzb2x1dGlvbiI6Ijk2MCwxNDQwIiwiYXZhaWxhYmxlX3NjcmVlbl9yZXNvbHV0aW9uIjoiOTMwLDE0NDAiLCJzeXN0ZW1fdmVyc2lvbiI6IldpbmRvd3MgMTAiLCJicmFuZF9tb2RlbCI6InVua25vd24iLCJzeXN0ZW1fbGFuZyI6InJ1IiwidGltZXpvbmUiOiJHTVQrMyIsInRpbWV6b25lT2Zmc2V0IjotMTgwLCJ1c2VyX2FnZW50IjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzk2LjAuNDY2NC45MyBTYWZhcmkvNTM3LjM2IiwibGlzdF9wbHVnaW4iOiJQREYgVmlld2VyLENocm9tZSBQREYgVmlld2VyLENocm9taXVtIFBERiBWaWV3ZXIsTWljcm9zb2Z0IEVkZ2UgUERGIFZpZXdlcixXZWJLaXQgYnVpbHQtaW4gUERGIiwiY2FudmFzX2NvZGUiOiIxOWVhYWM5ZSIsIndlYmdsX3ZlbmRvciI6Ikdvb2dsZSBJbmMuIChBTUQpIiwid2ViZ2xfcmVuZGVyZXIiOiJBTkdMRSAoQU1ELCBBTUQgUmFkZW9uKFRNKSBWZWdhIDggR3JhcGhpY3MgRGlyZWN0M0QxMSB2c181XzAgcHNfNV8wLCBEM0QxMS0yNi4yMC4xMTAzMC4xNTAwMSkiLCJhdWRpbyI6IjEyNC4wNDM0NzUyNzUxNjA3NCIsInBsYXRmb3JtIjoiV2luMzIiLCJ3ZWJfdGltZXpvbmUiOiJFdXJvcGUvTW9zY293IiwiZGV2aWNlX25hbWUiOiJDaHJvbWUgVjk2LjAuNDY2NC45MyAoV2luZG93cykiLCJmaW5nZXJwcmludCI6IjA2MDE0ZDkzZGI1NzEyZmQ3ZDNhOThkOTZhNTk4ZTBiIiwiZGV2aWNlX2lkIjoiIiwicmVsYXRlZF9kZXZpY2VfaWRzIjoiIn0=",
    clienttype: "web",
    "fvideo-id": "320505b2e62cac90bec5f35d8e798f41a6e2e086",
    csrftoken: "d41d8cd98f00b204e9800998ecf8427e",
    Origin: "https://www.binance.com",
    Connection: "keep-alive",
    Cookie:
      "cid=QHn0L7gA; bnc-uuid=86b862f5-72a4-4496-a73d-35f1feb98850; _ga=GA1.2.402949929.1638825713; userPreferredCurrency=USD_USD; nft-init-compliance=true; source=referral; campaign=www.binance.com; _gid=GA1.2.1888363264.1639497086; BNC_FV_KEY=320505b2e62cac90bec5f35d8e798f41a6e2e086; BNC_FV_KEY_EXPIRE=1639583486709; lang=ru; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%2217d919fdd2119c-04083eca62a517-978183a-1382400-17d919fdd225c9%22%2C%22first_id%22%3A%22%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E8%87%AA%E7%84%B6%E6%90%9C%E7%B4%A2%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC%22%2C%22%24latest_referrer%22%3A%22https%3A%2F%2Fwww.google.com%2F%22%7D%2C%22%24device_id%22%3A%2217d919fdd2119c-04083eca62a517-978183a-1382400-17d919fdd225c9%22%7D; home-ui-ab=B",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "Cache-Control": "max-age=0",
  };

function getListMysterSell() {
    axios.get('https://www.binance.com/bapi/nft/v1/public/nft/mystery-box/list?page=1&size=25', {headers: header2}).then((res)=> {
        if (res.status == 200) {
        res.data.data.forEach(element => {
            binanceMysterBoxAnons.findOne({productId: element.productId}, (err, call) => {
                if (err) console.log('Ошибка поиска Box в базе');
                
                if (!call) {
                    let newbinanceMysterBoxAnons = new binanceMysterBoxAnons({
                        _id: new mongoose.Types.ObjectId(),
                        name: element.name,
                        description: element.description,
                        productId: element.productId,
                        image: element.image,
                        startTime: element.startTime, 
                        endTime: element.endTime,
                        price: element.price,
                        currency: element.currency,
                        status: element.status,
                        duration: element.duration,
                        subTitle: element.subTitle,
                        mappingStatus: element.mappingStatus, // -1 - ожидает запуска, 2 - распродано
                        store: element.store,
                        isGray: element.isGray,
                        serialsNo: element.serialsNo,
                        secondMarketSellingDelay: element.secondMarketSellingDelay
                    });
                    
                    newbinanceMysterBoxAnons.save((err, call)=> {
                        if (err) console.log('Ошибка сохранения ' + element.name);
                        if (call) console.log('Сохранили ' + element.name);
                    })
                } else {
                    let newbinanceMysterBoxAnons = new binanceMysterBoxAnons({
                        name: element.name,
                        description: element.description,
                        productId: element.productId,
                        image: element.image,
                        startTime: element.startTime, 
                        endTime: element.endTime,
                        price: element.price,
                        currency: element.currency,
                        status: element.status,
                        duration: element.duration,
                        subTitle: element.subTitle,
                        mappingStatus: element.mappingStatus, // -1 - ожидает запуска, 2 - распродано
                        store: element.store,
                        isGray: element.isGray,
                        serialsNo: element.serialsNo,
                        secondMarketSellingDelay: element.secondMarketSellingDelay
                    });
                    binanceMysterBoxAnons.findOneAndUpdate({productId: element.productId}, newbinanceMysterBoxAnons, (err, call)=> {
                        if (err) console.log(err);
                        if (call) console.log('Обновили ' + element.name);
                    })
                }
            })
        });
    }
    }).catch((e) => {
        console.log(e);
        techbicaleventTelegram(1, `Статус ответа: ${e.status}`, "Error in getListMysterSell.....")
    })
}


module.exports = { getListMysterSell };