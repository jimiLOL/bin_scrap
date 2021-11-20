const NftPokemon = require("../model/navigationbot");
const { senDataTelegram, techbicaleventTelegram } = require("../controller/sendTelegram");
const { default: axios } = require("axios");
const { addDB } = require("./addDB");

const header2 = {
  accept: "application/json, text/plain, */*",
  "accept-encoding": "gzip",
  "accept-language":
    "ru,ru-RU;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6,zh-CN;q=0.5,zh;q=0.4",
  dnt: "1",
  "if-none-match": 'W/"28a2-lLp05LSjxWN5r6vjxVCK9IzTWNw"',
  origin: "https://nftrade.com",
  referer: "https://nftrade.com/",
  "sec-ch-ua":
    '" Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"',
  "sec-ch-ua-mobile": "?0",
  "sec-ch-ua-platform": '"Windows"',
  "sec-fetch-dest": "empty",
  "sec-fetch-mode": "cors",
  "sec-fetch-site": "same-site",
  "user-agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36",
};
const header = {
  accept: "application/json, text/plain, */*",
  "content-type": "application/json",
  "accept-encoding": "gzip",
  "accept-language":
    "ru,ru-RU;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6,zh-CN;q=0.5,zh;q=0.4",
  dnt: "1",
  origin: "https://app.mochi.market",
  referer: "https://app.mochi.market/",
  "sec-ch-ua":
    '" Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"',
  "sec-ch-ua-mobile": "?0",
  "sec-ch-ua-platform": '"Windows"',
  "sec-fetch-dest": "empty",
  "sec-fetch-mode": "cors",
  "sec-fetch-site": "same-site",
  "user-agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36",
  Host: "api.mochi.market",
  "Content-Length": "0",
};
async function nftTradeGet(index) {
  axios
    .get(
      `https://api.nftrade.com/api/v1/tokens?contractAddress=0xc33d69a337b796a9f0f7588169cd874c3987bde9&limit=500&skip=${
        index * 100
      }`,
      { headers: header2 }
    )
    .then((resnftrade) => {
      if (resnftrade.data.length != 0) {
        resnftrade.data.forEach(async function (value, index) {
          if (value?.orderId != null) {
            NftPokemon.findOne(
              { tokenId: value.tokenID },
              { attributes: 1 },
              (err, callback) => {
                if (err) {
                  console.log("Ошибка получения attributes");
                  console.log(err);
                }
                if (callback) {
                  axios
                    .get(
                      `https://api.mochi.market/nft/56/0xc33d69a337b796a9f0f7588169cd874c3987bde9/${value.tokenID}`,
                      { headers: header }
                    )
                    .then((resmochiNftmarket) => {
                      setTimeout(
                        async () =>
                          await getOrdernftrade(
                            value.orderId,
                            callback.attributes,
                            resmochiNftmarket.data.extraMetadata
                          ),
                        100 * index
                      );
                    })
                    .catch(function (error) {
                      console.log("Show error notification nftrade Array!");
                      console.log(error);
                      return Promise.reject(error);
                    });
                }
              }
            );
          } else {
            // console.log('orderId == null');
          }
        });
        resnftrade.data = 0;
      }
    });
}

async function getOrdernftrade(orderID, attributes, extraMetadata, index) {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://api.nftrade.com/api/v1/orders/${orderID}`, {
        headers: header2,
      })
      .then((resnftrade) => {
        if (resnftrade.status == 500 || resnftrade.status == 404) {
          reject();
        }
        let element = resnftrade.data;

       

        senDataTelegram(
          element.tokens[0],
          `https://nftrade.com/assets/bsc/0xc33d69a337b796a9f0f7588169cd874c3987bde9/${element.tokens[0].tokenID}`,
          index
        );
        addDB(element.tokens[0], attributes, "nftrade", extraMetadata);
      
        resolve();
      })
      .catch(function (error) {
        console.log("Show error notification nftrade!");
        setTimeout(() => techbicaleventTelegram(index, error, 'nfttrade'), 200 * index);
        console.log(error);
        return Promise.reject(error);
      });
  });
}

module.exports = { nftTradeGet };
