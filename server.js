const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const Price = require("./model/price");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const passport = require("passport");
const app = express();
const http = require("http");

const cyrillicToTranslit = require("cyrillic-to-translit-js");
// const { Telegraf, Markup } = require("telegraf");
const { stringify } = require("query-string");
const { json } = require("body-parser");
const server = require("http").createServer(app);
const token = "2138477603:AAFdAeFSfYQ1wqey5W35j1-d8JF01xbr6iA";
const fs = require("fs");
const moment = require("moment");
const CronJob = require("cron").CronJob;
const CronTime = require("cron").CronTime;
const { default: axios } = require("axios");
const { reject } = require("core-js/fn/promise");
// const { } = require('./controller');
const {
  senDataTelegram,
  techbicaleventTelegram,
} = require("./controller/sendTelegram");
const { nftTradeGet } = require("./controller/nftrade");
const { addDB } = require("./controller/addDB");
const { getinfoLootex } = require("./controller/lootex");
const { getInfotofunft } = require("./controller/tofunft.js");
const { binTest } = require("./controller/binance_req.js");
const nftArray = require("./nft/nftalldb");
const { nfttradeParseContract } = require("./controller/nfttradeParseContract");

require("dotenv/config");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(process.env.MONGODB_URI).catch((error) => console.log(error));

let gen = "";

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

let data = {
  currency: "",
  mediaType: "",
  tradeType: "",
  amountFrom: "",
  amountTo: "",
  categorys: [],
  keyword: "",
  orderBy: "amount_sort",
  orderType: -1,
  page: 1,
  rows: 20,
  productIds: [],
};

async function delDublicate(nft_contract, count) {
  let NftPokemon = require("./model/navigationbot")(nft_contract);
  let asw = [];
  for (let index = 0; index < count; index++) {
    NftPokemon.find({}, (err, call) => {
      if (call) {
        call.forEach(function (value) {
          // value = value.trim();

          if (asw.indexOf(value.tokenId) === -1) {
            asw.push(value.tokenId);
          } else {
            NftPokemon.deleteOne({ tokenId: value.tokenId }, (err, cal) => {
              if (err) console.log("Ошибка при удалении");
              console.log("Удалили id^ " + value.tokenId);
            });
            // console.log(value.tokenId)
          }
        });
      }
    })
      .skip(20 * index)
      .limit(20);
  }
  asw = [];
}

// NftPokemon.find({attributes: {$elemMatch: {value: 0, trait_type: "Generation"}}}, {tokenId:1},(err, cal) => {
//   if (err) console.log('Err');
//   if (cal) {
//     let str = String(cal)
//     fs.writeFile("Gen_0.txt", str, function (error) {
//       if (error) throw error; // если возникла ошибка
//       console.log("Асинхронная запись HTML файла завершена.");
//       let start = new Date().getTime();
//       setTimeout(() => {
//         console.log("Ожидание записи...");
//       }, 500);
//       let end = new Date().getTime();
//       console.log(`Запись HTML: ${end - start}ms`);
//     });

//   }

// })

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function conractSet(element) {
  if (
    element.nft_contract.contract ==
    "0xc33d69a337b796a9f0f7588169cd874c3987bde9"
  ) {
    let nft_contract = "nfts";
    return nft_contract;
  } else {
    let nft_contract = element.nft_contract.contract;
    return nft_contract;
  }
}

function log(index) {
  console.log("Цикл: " + index);
}
let dataCron = new Date();
dataCron.setSeconds(dataCron.getSeconds() + 10);

function startCron() {
  let d = new Date();
  d.setSeconds(d.getSeconds() + 30);
  jobs.setTime(new CronTime(d));
  jobs.start();
  console.log(jobs.nextDates().toISOString());
}

const jobs = new CronJob(dataCron, async function () {
  setTimeout(
    () => techbicaleventTelegram(1, "Запустили CronJob", "CronJob Work....."),
    200
  );
  nftArray.forEach(async (elementNFT, index) => {
    // console.log(element.nft_contract.contract);
    let NftPokemon = require("./model/navigationbot")(conractSet(elementNFT));
    // let NftPokemon = mongoose.model('nfts');

    let count = await NftPokemon.find({}, { tokenId: 1 }, (err, call) => {
      if (err) console.log(err);
      // if (call) console.log(call);
    }).count();

    await Promise.all([
      start = new Date(),
      timeout(30000 * index).then(() => {
        log(index),
          nfttradeParseContract(index, elementNFT.nft_contract.contract);
      }),
    ])
      .then(() => {
        console.log("Work add nft...");
        if (index == nftArray.length) {
          startCron();
        }
        let end = new Date().getTime();
        console.log(`Время цикла ${index} "Work add nft...." : ${end - start}ms`);
        console.clear()
        // setTimeout(
        //   () =>
        //     techbicaleventTelegram(index, `New cycle end ${end - start}ms`, "Work add nft....."),
        //   100 * index
        // );
      })
      .catch((err) => {
        let end = new Date().getTime();
        console.log(`ОШибка в цикле ${index} "Work add nft...." - время работы: ${end - start}ms`);
        console.log("Не смогли получить контракт " + index);
        setTimeout(
          () =>
            techbicaleventTelegram(index, err, "Error in Work add nft....."),
          100 * index
        );
      });

    count = Math.ceil(count / 100);
    console.log(count);
    await delDublicate(conractSet(elementNFT), count);
    let errLoop = false;

    for (let index = 0; index < count; index++) {
      try {
        if (errLoop) {
          break
        }
     
        let contract = elementNFT.nft_contract.contract;


        await Promise.all([
          start = new Date(),
          timeout(800*index)
            .then(() => {
              sdW(contract).catch((e) => {
                console.log(e);
              });
            })
            .then((res) => {
              nftTradeGet(index, contract)
            }).catch((e) => {
              console.log(e);
              errLoop = true
              return
            }),
        ])
          .then((res) => {
          
            let end = new Date().getTime();
            console.log(`Время цикла ${index} "Work...": ${end - start}ms`);
            
            // setTimeout(
            //   () => techbicaleventTelegram(index, `New cycle end ${end - start}ms`, "Work..."),
            //   200 * index
            // );
          })
          .catch((error) => {
            
            
            console.log("Show error notification global cycle!");
            console.log(error);
            let end = new Date().getTime();
        console.log(`Ошибка в цикле ${index} "Work...." время выполнения: ${end - start}ms`);
            // setTimeout(
            //   () => techbicaleventTelegram(index, error, "Error array in Work..."),
            //   200 * index
            // );
            
          });
          

        async function sdW(contract) {
          return new Promise((resolve, reject) => {
            NftPokemon.find({}, { tokenId: 1, attributes: 1 }, (err, slug) => {
              if (err) {
                console.log(err);
              }
              if (!slug) {
                reject("Не нашли NFT в базе для контракта: " + contract);
              }
              if (slug) {
                let err = false
                console.log('Нашли ' + slug.length + ' NFT');
                (async () => {
                  for (const [index, iterator] of slug.entries()) {
                  console.log(index);
                  if (err) {
                    break
                  }
                  await Promise.all([
                    timeout(800*index).then((res)=>{
                      dsf(iterator.tokenId, iterator?.attributes, index, contract)
                      .then((res) => {
                        return resolve(res)
                      })
                      .catch(function (error) {
                        err = true
                        console.log("Show error notification dsf!");
                        console.log(error);
                        return reject(error);
                      })

                    })
                  ])
                }
              })();
               
                slug = 0;
              }
            })
              .skip(100 * index)
              .limit(100);
          });
        }

        async function dsf(slug, attributes, index, contract) {
          return new Promise((resolve, reject) => {
           
            

            axios
              .get(`https://api.mochi.market/nft/56/${contract}/${slug}`, {
                headers: header,
              })
              .then((res) => {
                if (res.status != 200) {
                  reject(res.status);
                }
                if (res.data?.sellId == null) {
                  reject('mochi sellId == null' + contract);
                  element = res.data;
                  // console.log(`https://api.nftrade.com/api/v1/tokens?contractAddress=0xc33d69a337b796a9f0f7588169cd874c3987bde9&limit=500&skip=${index*500}`);
                } else {
                  // console.log(`https://api.mochi.market/sellOrder/bySellId/56/${res.data.sellId}`);
                  axios
                    .get(
                      `https://api.mochi.market/sellOrder/bySellId/56/${res.data.sellId}`,
                      { headers: header }
                    )
                    .then(async (response) => {
                      let ctype = response.headers["content-type"];

                      if (response.data != undefined) {
                        let elementOrder = response.data;

                        if (elementOrder?.attributes[13]?.value == undefined) {
                          // console.log(element);
                        }

                        senDataTelegram(
                          elementOrder,
                          `https://app.mochi.market/token/56/${contract}`,
                          index
                        );

                        resolve(
                          await addDB(
                            elementOrder,
                            attributes,
                            "mochi",
                            element?.extraMetadata,
                            elementOrder.collectionAddress
                          )
                        );
                        // resolve();
                      } else {
                         
                       
                        resolve('Пустой массив');
                      
                      }

                     
                      // response[0].forEach(element => {
                      //   console.log(element);

                      // });
                    })
                    .catch(function (error) {
                      console.log("Show error notification! mocha");
                      console.log(error);
                      setTimeout(
                        () => techbicaleventTelegram(index, error, "mocha"),
                        200 * index
                      );
                      // console.log(error);
                      reject(error);
                    });
                }
              });
          });
        }
      } catch (e) {
        console.log(elementNFT);
        console.log(e);

      
      }
    }
  });
});

jobs.start();

let skip = 0;

const port = process.env.PORT || 5000;

server.listen(port, (err) => {
  if (err) return console.log(err);
  console.log("Подключение прошло на порт " + port);
});
