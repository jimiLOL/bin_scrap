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
const cookie = require('cookie');

const agent = tunnel.httpsOverHttp({
  proxy: {
    host: "127.0.0.1",
    port: 8867,
  },
  rejectUnauthorized: false,
});

let header2 = {
  "Host":"www.binance.com",
"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:94.0) Gecko/20100101 Firefox/94.0",
"Accept":"*/*",
"Accept-Language":"ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3",
"Accept-Encoding":"gzip",
"Referer":"https://www.binance.com/ru",
"lang":"ru",
"x-ui-request-trace":"8d6ea50e-ec0e-4064-8f03-fa3810f377b0",
"x-trace-id":"8d6ea50e-ec0e-4064-8f03-fa3810f377b0",
"bnc-uuid":"be2d3683-ac8d-4d3c-b2b8-ad99fded683f",
"content-type":"application/json",
"device-info":"eyJzY3JlZW5fcmVzb2x1dGlvbiI6Ijk2MCwxNDQwIiwiYXZhaWxhYmxlX3NjcmVlbl9yZXNvbHV0aW9uIjoiOTI5LDE0NDAiLCJzeXN0ZW1fdmVyc2lvbiI6IldpbmRvd3MgMTAiLCJicmFuZF9tb2RlbCI6InVua25vd24iLCJzeXN0ZW1fbGFuZyI6InJ1LVJVIiwidGltZXpvbmUiOiJHTVQrMyIsInRpbWV6b25lT2Zmc2V0IjotMTgwLCJ1c2VyX2FnZW50IjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NDsgcnY6OTQuMCkgR2Vja28vMjAxMDAxMDEgRmlyZWZveC85NC4wIiwibGlzdF9wbHVnaW4iOiIiLCJjYW52YXNfY29kZSI6IjA3NDg0YTBlIiwid2ViZ2xfdmVuZG9yIjoiR29vZ2xlIEluYy4gKEFNRCkiLCJ3ZWJnbF9yZW5kZXJlciI6IkFOR0xFIChSYWRlb24gUjkgMjAwIFNlcmllcyBEaXJlY3QzRDExIHZzXzVfMCBwc181XzAsIEQzRDExLTI2LjIwLjExMDMwLjE1MDAxKSIsImF1ZGlvIjoiMzUuNzM4MzI5NTkzMDkyMiIsInBsYXRmb3JtIjoiV2luMzIiLCJ3ZWJfdGltZXpvbmUiOiJFdXJvcGUvTW9zY293IiwiZGV2aWNlX25hbWUiOiJGaXJlZm94IFY5NC4wIChXaW5kb3dzKSIsImZpbmdlcnByaW50IjoiYWU1OTFiYzRlZDk5MzUyOWQxMTIwODc3YjBiZjU1NDEiLCJkZXZpY2VfaWQiOiIiLCJyZWxhdGVkX2RldmljZV9pZHMiOiIxNjM5NTA1NDg3ODQ4YjlaWjFKZzFCUzVSWUdCaFhOcCJ9",
"clienttype":"web",
"fvideo-id":"32e38798a172a877bcdfb694d226f1b417de2453",
"csrftoken":"d41d8cd98f00b204e9800998ecf8427e",
"Connection":"keep-alive",
"Cookie":'cid=F6VL9WgB; home-ui-ab=A; bnc-uuid=be2d3683-ac8d-4d3c-b2b8-ad99fded683f; source=organic; campaign=yandex.ru; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%2217dba0909d2154-01452493b180d78-4c3e217e-1382400-17dba0909d452e%22%2C%22first_id%22%3A%22%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%2C%22%24latest_referrer%22%3A%22%22%7D%2C%22%24device_id%22%3A%2217dba0909d2154-01452493b180d78-4c3e217e-1382400-17dba0909d452e%22%7D; _ga=GA1.2.395577563.1639503695; _gid=GA1.2.2095482365.1639503695; userPreferredCurrency=USD_USD; BNC_FV_KEY=32e38798a172a877bcdfb694d226f1b417de2453; BNC_FV_KEY_EXPIRE=1639590096465; fiat-prefer-currency=USD; nft-init-compliance=true; lang=ru; logined=y; isAccountsLoggedIn=y; __BINANCE_USER_DEVICE_ID__={"7f9767285c71f65bc20d132c650b42ce":{"date":1639505488102,"value":"1639505487848b9ZZ1Jg1BS5RYGBhXNp"}}',
"Sec-Fetch-Dest":"empty",
"Sec-Fetch-Mode":"cors",
"Sec-Fetch-Site":"same-origin"
};

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getData(body, index) {
  return new Promise((resolve, reject) => {
    axios
      .post(
        "https://www.binance.com/bapi/nft/v1/friendly/nft/layer-product-list",
        body,
        { headers: header2 }
      )
      .then(async (res) => {
        if (res.data.data.rows != null) {
          console.log(
            "В массиве объектов " +
              res.data.data?.rows.length +
              " Цикл " +
              index
          );
          res.data.data.rows.forEach(async (element, index) => {
            await timeout(4200 * index).then(() => {
              binTest(element.productId);
            });
            if (res.data.data.rows.length == index) {
              resolve(res.status);
            }
          });
        } else {
          console.log(res.data);
          return Promise.resolve("break");
        }
      })
      .catch((e) => {
        console.log(e);
        reject(e);
      });
  });
}

async function getDataTest(body, index, cookies) {
  let start = new Date().getTime();
//   let full = ''
// let json = JSON.parse(cookies.Cookie);
//  json.cookies.forEach(element => {
 
//    full = full + element.name + '=' + element.value + '; '
//  });
//  console.log(full);
 

  // header2['User-Agent'] = cookies.UserAgent;
  // header2['x-ui-request-trace'] = cookies.xuirequesttrace;
  // header2['x-trace-id'] = cookies.xtraceid;
  // header2['bnc-uuid'] = cookies.bncuuid;
  // header2['device-info'] = cookies.deviceinfo;
  // header2['fvideo-id'] = cookies.deviceinfo;
  // header2.csrftoken = cookies.csrftoken;
  // header2.Cookie = full;
   return new Promise((resolve, reject) => {
    axios
      .post(
        "https://www.binance.com/bapi/nft/v1/friendly/nft/layer-product-list", body,
        { headers: header2, httpsAgent: agent }
      )
      .then(async (res) => {
        if (res.data.data.rows != null) {
          console.log(
            "В массиве объектов " +
              res.data.data?.rows.length +
              " Цикл " +
              index
          );
          let end = new Date().getTime();
          console.log(`Время запроса ${end-start} ms`);
          resolve();
         
        } else {
          console.log(res.data);
          return Promise.resolve("break");
        }
      })
      .catch((e) => {
        console.log(e);
        // process.exit(0)
        reject(e);
      });
  });
}

async function getBinanceProductList() {
  binanceIdProduct.find({ status: 1 }, (err, callback) => {
    if (err) console.log("Ошибка получения ");
    if (callback) {
      callback.forEach((element) => {
        binanceIdProduct.findOneAndRemove(
          { productId: element.productId },
          (err, call) => {
            if (err) console.log("Ошибка удаления " + element.productId);
            if (call) {
              console.log("Удалили " + element.productId);
            }
          }
        );
      });
    }
  });

  let breakFor = false;
  for (let index = 1; index < 20; index++) {
    const body = {
      page: index,
      rows: 50,
      collectionId: "516264134522363905",
    };
    if (breakFor) {
      break;
    }

    await timeout(2500 * index)
      .then(() => {
        getData(body, index);
      })
      .then((res) => {
        if (res == "break") {
          breakFor = true;
        }
      });
    if (index == 28) {
      console.log("End");
      return Promise.resolve();
    }
  }
}

async function binTest(productId) {
  console.log(productId);
  let header = {
    Host: "www.binance.com",
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:94.0) Gecko/20100101 Firefox/94.0",
    Accept: "*/*",
    "Accept-Language": "ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3",
    "Accept-Encoding": "gzip",
    Referer: `https://www.binance.com/en/nft/goods/detail?productId=${productId}&isProduct=1`,
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
  let start = new Date().getTime();
  let body = {
    productId: productId,
  };

  axios
    .post(
      `https://www.binance.com/bapi/nft/v1/friendly/nft/nft-trade/product-detail`,
      body,
      { headers: header, httpsAgent: agent }
    )
    .then((res) => {
      let end = new Date().getTime();

      if (res.status != 200) {
        console.log("Ответ сервера");
        console.log(res.status);
      } else {
        console.log(
          "Status " + res.data.data?.productDetail.status + " ID " + productId
        );

        if (res.data.data?.nftInfo?.tokenId != null) {
          console.log(
            `Запрос ID ${
              res.data.data?.productDetail.tokenList[0].nftId
            } Статус ответа: ${res.status} Время цикла: ${end - start}ms`
          );
          binanceIdProduct.findOne(
            { tokenId: res.data.data.nftInfo.tokenId },
            (err, call) => {
              if (err) console.log("ОШибка поиска ID");
              if (call) {
                binanceIdProduct.findOneAndUpdate(
                  { tokenId: res.data.data.nftInfo.tokenId },
                  {
                    $set: {
                      title: res.data.data.productDetail.title,
                      tokenId: res.data.data.nftInfo.tokenId,
                      contractAddress: res.data.data.nftInfo.contractAddress,
                      productId: productId,
                      amount: res.data.data?.productDetail?.amount,
                      status: res.data.data?.productDetail.status,
                    },
                  },
                  (err, call) => {
                    if (err) console.log("Ошибка обнволения");
                    if (call) {
                      console.log("Обновили данные");
                    }
                  }
                );
              } else {
                const newbinanceIdProduct = new binanceIdProduct({
                  title: res.data.data.productDetail.title,
                  tokenId: res.data.data.nftInfo.tokenId,
                  contractAddress: res.data.data.nftInfo.contractAddress,
                  amount: res.data.data?.productDetail?.amount,
                  productId: productId,
                  status: res.data.data?.productDetail.status,
                });
                newbinanceIdProduct.save((err, callback) => {
                  if (err) console.log("Ошибка при сохранении ID бинанс");
                  if (callback) console.log("Сохранили ID");
                });
              }
            }
          );
        } else {
          console.log(body);
          console.log(res.data);
        }
      }
    })
    .catch(function (error) {
      console.log("Show error notification binTest!");
      console.log(error);

      // setTimeout(() => techbicaleventTelegram(index, error, 'lootex'), 200*index);
      // console.log(error);
      // reject(error);
    });
}

module.exports = { binTest, getBinanceProductList, getDataTest };
