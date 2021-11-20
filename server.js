const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const NftPokemon = require("./model/navigationbot");
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
const { default: axios } = require("axios");
const { reject } = require("core-js/fn/promise");
// const { } = require('./controller');
const { senDataTelegram, techbicaleventTelegram } = require('./controller/sendTelegram');
const {nftTradeGet} = require('./controller/nftrade');
const {addDB} = require('./controller/addDB');
const { getinfoLootex } = require('./controller/lootex');
const { getInfotofunft } = require('./controller/tofunft.js')


require("dotenv/config");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// let afsdf = new NftPokemon({
//   _id: new mongoose.Types.ObjectId(),
//   tokenId: 1

// })

// NftPokemon.create(afsdf, (err) => {
//   if (err) console.log(err);
// })

mongoose.connect(process.env.MONGODB_URI).catch((error) => console.log(error));

// const bot = new Telegraf(token);

let gen = "";

const header = {
  'accept': "application/json, text/plain, */*",
  "content-type": "application/json",
  "accept-encoding": "gzip",
  "accept-language":
    "ru,ru-RU;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6,zh-CN;q=0.5,zh;q=0.4",
  'dnt': "1",
  'origin': "https://app.mochi.market",
  'referer': "https://app.mochi.market/",
  "sec-ch-ua":
    '" Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"',
  "sec-ch-ua-mobile": "?0",
  "sec-ch-ua-platform": '"Windows"',
  "sec-fetch-dest": "empty",
  "sec-fetch-mode": "cors",
  "sec-fetch-site": "same-site",
  "user-agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36",
  'Host': "api.mochi.market",
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


// getInfotofunft();


async function delDublicate() {
  let asw = [];
  for (let index = 0; index < 347; index++) {
    NftPokemon.find({}, (err, call) => {
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
  return new Promise(resolve => setTimeout(resolve, ms));
}



const jobs = new CronJob("0 */20 * * * *", async function () {
   
  await delDublicate();

  let count = await NftPokemon.find({}, {tokenId:1},(err, call) => {
    if (err) console.log(err);
    // if (call) console.log(call);
  }).count();
  count = Math.ceil(count / 100);
  console.log(count);

  for (let index = 0; index < count; index++) {


   

    
    let [sa] = await Promise.all([sdW(), nftTradeGet(index), timeout(5000)])
  
 

   

    async function sdW() {
      return new Promise((resolve) => {
        NftPokemon.find(
          {},
          { tokenId: 1, attributes: 1 },
          (err, slug) => {
            if (err) {
              console.log(err);
            }
            if (!slug) {
              console.log("Не нашли post в базе");
            }
            if (slug) {
              console.log("Нашли post в базе");
              // console.log(slug);
              slug.forEach(async (element, index) => {
                // setTimeout(() => dsf(element.tokenId), 10000 * index);
                let start = new Date().getTime();
                // let prom = new Promise((resolve, reject) => {
                //   .then(resolve()).catch(reject())
      
                // });
                // let prom2 = new Promise((resolve, reject) => {
                //   .then(resolve()).catch(reject())
  
                // });
                
                let [as] = await Promise.all([dsf(element.tokenId, element.attributes, index), timeout(1000)]);
                let end = new Date().getTime();
                console.log(`Время цикла: ${end - start}ms`);
              });
              slug = 0;
              resolve()
             
            }
          }
        )
          .skip(100 * index)
          .limit(100);
      })
      
    }

    async function dsf(slug, attributes, index) {
      return new Promise((resolve, reject) => {
        let start = new Date().getTime();

        axios
          .get(
            `https://api.mochi.market/nft/56/0xc33d69a337b796a9f0f7588169cd874c3987bde9/${slug}`,
            { headers: header }
          )
          .then((res) => {
            if (res.data.sellId == null) {
              element = res.data;
              // console.log(`https://api.nftrade.com/api/v1/tokens?contractAddress=0xc33d69a337b796a9f0f7588169cd874c3987bde9&limit=500&skip=${index*500}`);

              

              
            } else {
              // console.log(`https://api.mochi.market/sellOrder/bySellId/56/${res.data.sellId}`);
              axios
                .get(
                  `https://api.mochi.market/sellOrder/bySellId/56/${res.data.sellId}`,
                  { headers: header }
                )
                .then((response) => {
                  
                  let ctype = response.headers["content-type"];

                  if (response.data != undefined) {
                   
                  let elementOrder = response.data;

                  if (elementOrder?.attributes[13]?.value == undefined) {
                    // console.log(element);
                  }

                    console.log(response.data.attributes.length);
                    senDataTelegram(element, 'https://app.mochi.market/token/56/0xc33d69a337b796a9f0f7588169cd874c3987bde9', index)

                  

                    addDB(elementOrder, attributes, 'mochi', element?.extraMetadata);
                    resolve();


                  } else {
                    console.log("Пустой массив");
                    // console.log(response);
                    // console.log(response.data.length);
                    resolve()
                    // sendTel(
                    //   "Сервер не ответил на наш запро, походу пердолбили....",
                    //   2
                    // );
                  }


                 

                  return response;
                  // response[0].forEach(element => {
                  //   console.log(element);

                  // });
              
                })
                .catch(function (error) {
                  console.log("Show error notification! mocha");
                  setTimeout(() => techbicaleventTelegram(index, error, 'mocha'), 200 * index);
                  // console.log(error);
                reject(error);
                });
            }
          });
      });
    }
  }
});
jobs.start();

let skip = 0;

const port = process.env.PORT || 5000;

server.listen(port, (err) => {
  if (err) return console.log(err);
  console.log("Подключение прошло на порт " + port);
});
