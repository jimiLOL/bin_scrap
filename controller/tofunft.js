const NftPokemon = require("../model/navigationbot");
const fs = require("fs");
const {
  senDataTelegram,
  techbicaleventTelegram,
} = require("../controller/sendTelegram");
const { default: axios } = require("axios");
const { addDB, updatePriceDB } = require("./addDB");
const tunnel = require("tunnel");

const agent = tunnel.httpsOverHttp({
  proxy: {
    host: "127.0.0.1",
    port: 8866,
  },
  rejectUnauthorized: false,
});
const header = {
  Host: "tofunft.com",
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:94.0) Gecko/20100101 Firefox/94.0",
  Accept: "*/*",
  "Accept-Language": "ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3",
  "Accept-Encoding": "gzip",
  Referer:
    "https://tofunft.com/collection/kryptomon/items?category=fixed-price",
  "x-tofu-signature":
    "0000001637500887hSYCL/CDR6CRdLkTerBC73BlFvUbLxLjf6iyVkTitvk=",
  "Content-Type": "application/json; charset=utf-8",
  Origin: "https://tofunft.com",
  "Content-Length": "564",
  Connection: "keep-alive",
  Cookie:
    "_ga_ERYKG9YKMT=GS1.1.1637500125.2.1.1637500150.0; _ga=GA1.1.1507123920.1637494394; __cf_bm=vrpLTmExh2FzqLYAsDinfYTQ1eGhnVP26DvRDCz6488-1637500128-0-AZBrn423yqk1j83R7mXtt6ez0epMMdtGi6WPlf0aPHyduXZ8iRFIquhyw840LoYYuvWDB2I5JND3q32+yRJYZNZcHAXGccW13QMuGbPB3ZqZ/suRGGQMCrO7gDsRcP/hog==",
  "Sec-Fetch-Dest": "empty",
  "Sec-Fetch-Mode": "cors",
  "Sec-Fetch-Site": "same-origin",
};

const header2 = {
  Host: "tofunft.com",
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:94.0) Gecko/20100101 Firefox/94.0",
  Accept: "*/*",
  "Accept-Language": "ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3",
  "Accept-Encoding": "gzip",
  Referer:
    "https://tofunft.com/collection/kryptomon/items?category=fixed-price",
  "x-tofu-signature":
    "0000001637500887hSYCL/CDR6CRdLkTerBC73BlFvUbLxLjf6iyVkTitvk=",
  "Content-Type": "application/json; charset=utf-8",
  Origin: "https://tofunft.com",
  Connection: "keep-alive",
  Cookie:
    "_ga_ERYKG9YKMT=GS1.1.1637500125.2.1.1637500150.0; _ga=GA1.1.1507123920.1637494394; __cf_bm=vrpLTmExh2FzqLYAsDinfYTQ1eGhnVP26DvRDCz6488-1637500128-0-AZBrn423yqk1j83R7mXtt6ez0epMMdtGi6WPlf0aPHyduXZ8iRFIquhyw840LoYYuvWDB2I5JND3q32+yRJYZNZcHAXGccW13QMuGbPB3ZqZ/suRGGQMCrO7gDsRcP/hog==",
  "Sec-Fetch-Dest": "empty",
  "Sec-Fetch-Mode": "cors",
  "Sec-Fetch-Site": "same-origin",
};

let body = {
  filters: {
    attributes: {},
    contracts: [
      1380, 988, 253, 1298, 1054, 966, 1110, 7, 15, 372, 64, 232, 40, 505, 1491,
      99, 774, 1418, 1062, 1608, 1435, 453, 1106, 47, 649, 262, 213, 110, 105,
      838, 670, 1080, 11, 1033, 575, 1196, 690, 1335, 397, 866, 630, 29, 990,
      94, 526, 1468, 311, 1125, 493, 1239, 585, 596, 288, 93, 553, 204, 120, 43,
      121, 37, 61, 1321, 17, 80, 1552, 1353, 36, 1052, 62, 30, 4, 1072, 113, 10,
      241, 848, 245, 1609, 925, 16, 210, 320, 70, 269, 313, 44, 92, 304, 167,
      91, 112, 34, 144, 1355, 79, 1206, 488, 570, 275,
    ],
  },
  offset: 0,
  limit: 2000,
};

//     axios.get('https://tofunft.com/_next/data/_G9VnbUq-OFYDPhY49-s8/en/collection/kryptomon/items.json?slug=kryptomon', {headers: header2}).then((response) => {
//     console.log(response.data);
function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getInfotofunft() {
  return new Promise((resolve, reject) => {
    //   res.data.pageProps.items.forEach(element => {
    //     if (body.filters.contracts.indexOf(element.nft_contract.id) === -1) {
    //         body.filters.contracts.push(element.nft_contract.id)
    //       }
    //   });
    //   let contentL = body.filters.contracts.length;
    //   console.log(contentL);
    //   header['Content-Length'] = contentL + 148; //устанавливаем длину нагрузки
    //   console.log(body.filters.contracts);  // получали id nft 1 запросом потом добавляли в body решил отказаться, т.к next генерирует уникальный путь каждый раз

    for (let index = 0; index < 5; index++) {
      body.offset = index * 2000;

      axios
        .post("https://tofunft.com/api/searchOrders", body, {
          headers: header,
          httpsAgent: agent,
        })
        .then((res) => {
          if (res.data.left == "es bad response") {
            reject();
          }

          res.data.right.data.forEach((element, index) => {
            if (element?.nft?.meta?.attributes != null) {
              let obj = Object.assign(
                {},
                {
                  attributes: element?.nft.meta.attributes,
                  price: element.price,
                  id: element.id,
                  seller: element.maker
                }
              );

              if (
                element.nft.nft_contract ==
                "0xc33d69a337b796a9f0f7588169cd874c3987bde9"
              ) {
                console.log(obj);
               
                updatePriceDB(element?.nft.token_id, obj?.price, 'tofunft', element.nft.nft_contract);
                senDataTelegram(
                  obj,
                  `https://tofunft.com/nft/bsc/${element.nft.nft_contract}/${element.nft.token_id}`,
                  index
                );
              }
            }
          });

          resolve();
        })
        .catch(function (error) {
          console.log("Show error notification getInfotofunft!");

          console.log(error);
          reject(error);
        });
    }
  });
}

module.exports = { getInfotofunft };
