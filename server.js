const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const NftPokemon = require("./model/navigationbot");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const passport = require("passport");
const app = express();
const http = require("http");

const cyrillicToTranslit = require("cyrillic-to-translit-js");
const { Telegraf, Markup } = require("telegraf");
const { stringify } = require("query-string");
const { json } = require("body-parser");
const server = require("http").createServer(app);
const token = "2138477603:AAFdAeFSfYQ1wqey5W35j1-d8JF01xbr6iA";
const fs = require("fs");
const moment = require("moment");
const CronJob = require("cron").CronJob;
const { default: axios } = require("axios");

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

mongoose.connect(process.env.MONGODB_URI).catch((error) => handleError(error));

const bot = new Telegraf(token);
const sleepS = 2000;
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

let priceBnb = 582;
let priceBuy_0 = 10000;
let priceBuy_1 = 3000;
let priceBuy_2 = 1500;
let priceBuy_3 = 1000;

function isNumber(n) {
  return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
}

bot.start((ctx) => {
  ctx.telegram.sendMessage(1552654998, "Тэкс...!");
});
const navigationButton = Markup.inlineKeyboard([
  Markup.button.callback("Ген_0🐉", "gen0"),
  Markup.button.callback("Ген_1🐉", "gen1"),
  Markup.button.callback("Ген_2🐉", "gen2"),
  Markup.button.callback("Ген_3🐉", "gen3"),
]);

bot.help((ctx) => ctx.reply("Регулирование минимальной цены - /price"));
bot.launch();
bot.on("text", async (ctx) => {
  console.log(ctx.chat);
  if (ctx?.message?.text.indexOf("цена") === 0 && data?.id_step != 0) {
    console.log("Запрос на изменение цены");
    ctx.reply("Подходим выбираем", navigationButton);
  }
  if (ctx?.message?.text.indexOf("Прайс") === 0 && data?.id_step != 0) {
    console.log("Запрос на изменение цены");
    ctx.reply(
      `Пороги: Ген_0: ${priceBuy_0}$, Ген_1: ${priceBuy_1}$, Ген_2: ${priceBuy_2}$, Ген_3: ${priceBuy_3}$`
    );
  }
  console.log(isNumber(ctx?.message?.text));

  if (isNumber(ctx?.message?.text)) {
    if (gen == "gen0") {
      priceBuy_0 = ctx?.message?.text;
    }
    if (gen == "gen1") {
      priceBuy_1 = ctx?.message?.text;
    }
    if (gen == "gen2") {
      priceBuy_2 = ctx?.message?.text;
    }
    if (gen == "gen3") {
      priceBuy_3 = ctx?.message?.text;
    }
    ctx.telegram.sendMessage(
      ctx.chat.id,
      `Все поменял значение\n Пороги: Ген_0: ${priceBuy_0}$, Ген_1: ${priceBuy_1}$, Ген_2: ${priceBuy_2}$, Ген_3: ${priceBuy_3}$`
    );
  } else if (
    ctx?.message?.text.indexOf("цена") === -1 &&
    ctx?.message?.text.indexOf("Прайс") === -1
  ) {
    ctx.telegram.sendMessage(
      ctx.chat.id,
      "Ты давай не умничай! Число БЛЯТЬ вводи. цена -> число. что не понятного"
    );
  }
});
bot.on("callback_query", async (ctx) => {
  if (ctx?.callbackQuery.data == "gen0") {
    gen = "gen0";

    ctx.telegram.sendMessage(ctx.chat.id, "Вводи в USD", {
      parse_mode: "HTML",
      ...Markup.keyboard([["Прайс", "цена"]])
        .oneTime()
        .resize(),
    });
  }
  if (ctx?.callbackQuery.data == "gen1") {
    gen = "gen1";

    ctx.telegram.sendMessage(ctx.chat.id, "Вводи в USD", {
      parse_mode: "HTML",
      ...Markup.keyboard([["Прайс", "цена"]])
        .oneTime()
        .resize(),
    });
  }
  if (ctx?.callbackQuery.data == "gen2") {
    gen = "gen2";
    ctx.telegram.sendMessage(ctx.chat.id, "Вводи в USD", {
      parse_mode: "HTML",
      ...Markup.keyboard([["Прайс", "цена"]])
        .oneTime()
        .resize(),
    });
  }
  if (ctx?.callbackQuery.data == "gen3") {
    gen = "gen2";
    ctx.telegram.sendMessage(ctx.chat.id, "Вводи в USD", {
      parse_mode: "HTML",
      ...Markup.keyboard([["Прайс", "цена"]])
        .oneTime()
        .resize(),
    });
  }
});

const jobs = new CronJob("0 */20 * * * *", async function () {
  let price = axios
    .get(
      "https://api.coingecko.com/api/v3/simple/price?ids=binancecoin,mochi-market&vs_currencies=bnb,usd"
    )
    .then((res) => {
      console.log(res.data.binancecoin);
      priceBnb = res.data.binancecoin.usd;
    });
  let count = await NftPokemon.find({}, (err, call) => {
    if (err) console.log(err);
    // if (call) console.log(call);
  }).count();
  count = Math.ceil(count / 100);
  console.log(count);

  for (let index = 0; index < count; index++) {
    console.log(index);
    // await sdW();
    // setTimeout(() => , 5000 * index);
    await sdW()
   

    async function sdW() {
    let data = await NftPokemon.find({}, {tokenId: 1}, (err, slug) => {
      if (err) {
        console.log(err);
      }
      if (!slug) {
        console.log("Не нашли post в базе");
      }
      if (slug) {
        console.log("Nнашли post в базе");
        // console.log(slug);
        slug.forEach(async (element, index) => {
          // setTimeout(() => dsf(element.tokenId), 10000 * index);
          let prom = new Promise((resolve, resect) =>{
            dsf(element.tokenId).then(resolve())
          })
          let start = new Date().getTime();
          await Promise.all([prom]);
          let end = new Date().getTime();
            console.log(`Время цикла: ${end - start}ms`);
        });
      }
    })
      .skip(100 * index)
      .limit(100);
    }

    async function dsf(slug, index) {
      return new Promise((resolve) => {
        let start = new Date().getTime();
        console.log(`https://api.mochi.market/nft/56/0xc33d69a337b796a9f0f7588169cd874c3987bde9/${slug}`);

        axios
          .get(
            `https://api.mochi.market/nft/56/0xc33d69a337b796a9f0f7588169cd874c3987bde9/${slug}`,
            { headers: header }
          )
          .then((res) => {
       
           if (res.data.sellId == null) {
            element = res.data;
            const newNftPokemon = new NftPokemon({
              buyers: element?.buyers || [],
              buyTimes: element?.buyTimes || [],
              chainId: element?.chainId,
              sellId: element?.sellId || null,
              collectionAddress: element?.collectionAddress || '0xc33d69a337b796a9f0f7588169cd874c3987bde9',
              collectionName: element?.collectionName,
              tokenId: element?.tokenId,
              amount: element?.amount,
              soldAmount: element?.soldAmount,
              seller: element?.seller || null,
              price: element?.price,
              isActive: element?.isActive,
              sellTime: element?.sellTime,
              image: element?.image,
              video: element?.video,
              name: element?.name,
              description: element?.description,
              tokenURI: element?.tokenURI,
              thumb: element?.thumb,
              attributes: element?.attributes,
              extraMetadata: element?.extraMetadata || [],
              otherSellOrders: element?.otherSellOrders || []
            });
            NftPokemon.findOneAndUpdate({tokenId: element.tokenId}, newNftPokemon, (err, call) => {
              if (err) {
                console.log('Произошла ошибка при обновлении данных');
                console.log(err);
              }
              if (call) {
                console.log('Произвели обновление данных');
              }
              let end = new Date().getTime();
              console.log(`Время от начал функции "dsf" до колбека: ${end - start}ms`);
              resolve();

            })
            

           } else {
            axios
            .get(
              `https://api.mochi.market/sellOrder/bySellId/56/${res.data.sellId}`,
              { headers: header }
            )
            .then((response) => {
              let ctype = response.headers["content-type"];

              if (response.data.length > 0) {
                console.log(response.data.attributes.length);
              } else {
                console.log("Пустой массив");
                console.log(response.data.length);
                // sendTel(
                //   "Сервер не ответил на наш запро, походу пердолбили....",
                //   2
                // );
              }

              let element = response.data;

              if (element?.attributes[13]?.value == undefined) {
                console.log(element);
              }

              if (
                element.price * priceBnb <= priceBuy_1 &&
                element.attributes[13]?.value == 1
              ) {
                console.log(element.price * priceBnb);
                console.log(element.seller);
                console.log(element.attributes[13].value);
                let msde = `Тэкс...!\n<b>Продовец: </b>${
                  element.seller
                }\n<b>Цена: </b>${
                  element.price * priceBnb
                }$\n<b>Генезис: </b>${
                  element.attributes[13].value
                }\nlink^ https://app.mochi.market/token/56/0xc33d69a337b796a9f0f7588169cd874c3987bde9/${
                  element.tokenId
                }/${element.sellId}\nТекущий курс BNB^ ${priceBnb}`;
                let start = new Date().getTime();
                setTimeout(() => sendTel(msde, start), sleepS * index);
              }
              if (
                element.price * priceBnb <= priceBuy_2 &&
                element.attributes[13]?.value == 2
              ) {
                console.log(element.price * priceBnb);
                console.log(element.seller);
                console.log(element.attributes[13].value);
                let msde = `Тэкс...!\n<b>Продовец: </b>${
                  element.seller
                }\n<b>Цена: </b>${
                  element.price * priceBnb
                }$\n<b>Генезис: </b>${
                  element.attributes[13].value
                }\nlink^ https://app.mochi.market/token/56/0xc33d69a337b796a9f0f7588169cd874c3987bde9/${
                  element.tokenId
                }/${element.sellId}\nТекущий курс BNB^ ${priceBnb}`;
                let start = new Date().getTime();

                setTimeout(() => sendTel(msde, start), sleepS * index);
              }
              if (
                element.price * priceBnb <= priceBuy_3 &&
                element.attributes[13]?.value == 3
              ) {
                console.log(element.price * priceBnb);
                console.log(element.seller);
                console.log(element.attributes[13].value);
                let msde = `Тэкс...!\n<b>Продовец: </b>${
                  element.seller
                }\n<b>Цена: </b>${
                  element.price * priceBnb
                }$\n<b>Генезис: </b>${
                  element.attributes[13].value
                }\nlink^ https://app.mochi.market/token/56/0xc33d69a337b796a9f0f7588169cd874c3987bde9/${
                  element.tokenId
                }/${element.sellId}\nТекущий курс BNB^ ${priceBnb}`;
                let start = new Date().getTime();
                setTimeout(() => sendTel(msde, start), sleepS * index);
              }
              if (
                element.price * priceBnb <= priceBuy_0 &&
                element.attributes[13]?.value == 0
              ) {
                console.log(element.price * priceBnb);
                console.log(element.seller);
                console.log(element.attributes[13].value);
                let msde = `Тэкс...!\n<b>Продовец: </b>${
                  element.seller
                }\n<b>Цена: </b>${
                  element.price * priceBnb
                }$\n<b>Генезис: </b>${
                  element.attributes[13].value
                }\nlink^ https://app.mochi.market/token/56/0xc33d69a337b796a9f0f7588169cd874c3987bde9/${
                  element.tokenId
                }/${element.sellId}\nТекущий курс BNB^ ${priceBnb}`;
                let start = new Date().getTime();
                setTimeout(() => sendTel(msde, start), sleepS * index);
                
              }
              if (element.attributes[2]?.value == 'Super') {
                
                let msde = `🚀Тэкс...! Тут Super\n<b>Продовец: </b>${
                  element.seller
                }\n<b>Цена: </b>${
                  element.price * priceBnb
                }$\n<b>Генезис: </b>${
                  element.attributes[13].value
                }\nlink^ https://app.mochi.market/token/56/0xc33d69a337b796a9f0f7588169cd874c3987bde9/${
                  element.tokenId
                }/${element.sellId}\nТекущий курс BNB^ ${priceBnb}`;
                let start = new Date().getTime();
                setTimeout(() => sendTel(msde, start), sleepS * index);
                
              }

              const newNftPokemon = new NftPokemon({
                buyers: element?.buyers || [],
                buyTimes: element?.buyTimes || [],
                chainId: element?.chainId,
                sellId: element?.sellId || null,
                collectionAddress: element?.collectionAddress || '0xc33d69a337b796a9f0f7588169cd874c3987bde9',
                collectionName: element?.collectionName,
                tokenId: element?.tokenId,
                amount: element?.amount,
                soldAmount: element?.soldAmount,
                seller: element?.seller || null,
                price: element?.price,
                isActive: element?.isActive,
                sellTime: element?.sellTime,
                image: element?.image,
                video: element?.video,
                name: element?.name,
                description: element?.description,
                tokenURI: element?.tokenURI,
                thumb: element?.thumb,
                attributes: element?.attributes,
                extraMetadata: element?.extraMetadata || [],
                otherSellOrders: element?.otherSellOrders || []
              })

              NftPokemon.findOneAndUpdate({tokenId: element.tokenId}, newNftPokemon, (err, call) => {
                if (err) {
                  console.log('Произошла ошибка при обновлении данных');
                  console.log(err);
                }
                if (call) {
                  console.log('Произвели обновление данных');
                }
                let end = new Date().getTime();
                console.log(`Время от начала функции "dsf" до колбека: ${end - start}ms`);
                resolve();

              })

              

              return response;
              // response[0].forEach(element => {
              //   console.log(element);

              // });
            }).catch(
              function (error) {
                console.log('Show error notification!')
                console.log(error);
                return Promise.reject(error)
              }
            );
           }
            
            
     

           
          });
      });
    }
  }
});
jobs.start();
async function sendTel(msg, start) {
  let end = new Date().getTime();
  console.log(`Данные: ${end - start}ms`);
  bot.telegram.sendMessage(-715760523, msg, { parse_mode: "HTML" });
}
let skip = 0;

const port = process.env.PORT || 5000;

server.listen(port, (err) => {
  if (err) return console.log(err);
  console.log("Подключение прошло на порт " + port);
});
