const token = "2138477603:AAFdAeFSfYQ1wqey5W35j1-d8JF01xbr6iA";
const { Telegraf, Markup } = require("telegraf");
const bot = new Telegraf(token);
const CronJob = require("cron").CronJob;
const { default: axios } = require("axios");

const sleepS = 1000;


let priceBnb = 582;
let priceBuy_0 = 10000;
let priceBuy_1 = 3000;
let priceBuy_2 = 1500;
let priceBuy_3 = 1000;
let priceBuy_4 = 190;
let priceBuy_5 = 190;
let priceBuy_6 = 190;
let priceBuy_7 = 190;
let priceBuy_8 = 190;
let priceBuy_9 = 190;
let priceBuy_10 = 190;
let price = {
  priceBnb: priceBnb,
  priceBuy_0: priceBuy_0,
  priceBuy_1: priceBuy_1,
  priceBuy_2: priceBuy_2,
  priceBuy_3: priceBuy_3,
  priceBuy_4: priceBuy_4,
  priceBuy_5: priceBuy_5,
  priceBuy_6: priceBuy_6,
  priceBuy_7: priceBuy_7,
  priceBuy_8: priceBuy_8,
  priceBuy_9: priceBuy_9,
  priceBuy_10: priceBuy_10
}


const jobss = new CronJob("0 */2 * * * *", async function () {
  let prices = axios
  .get(
    "https://api.coingecko.com/api/v3/simple/price?ids=binancecoin,mochi-market&vs_currencies=bnb,usd"
  )
  .then((res) => {
    console.log(res.data.binancecoin);
    price.priceBnb = res.data.binancecoin.usd;
  });
})
jobss.start()


async function senDataTelegram(element, link, index) {
for (let index = 0; index < 11; index++) {
  if (
    element.price * price.priceBnb <= price['priceBuy_' + index] &&
    element.attributes[13]?.value == index
  ) {
    console.log(element.price * price.priceBnb);
    console.log(element.seller);
    console.log(element.attributes[13].value);
    let msde = `Тэкс...!\n<b>Продовец: </b>${
      element.seller
    }\n<b>Цена: </b>${
      element.price * price.priceBnb
    }$\n<b>Генезис: </b>${
      element.attributes[13].value
    }\nlink^ ${lingene(link)}\nТекущий курс BNB^ ${price.priceBnb}`;
   
    setTimeout(() => sendTel(msde), sleepS * index);
  }
  
  
}
  

    if (
      element.price * price.priceBnb <= price.priceBuy_1 &&
      element.attributes[13]?.value == 1
    ) {
      console.log(element.price * price.priceBnb);
      console.log(element.seller);
      console.log(element.attributes[13].value);
      let msde = `Тэкс...!\n<b>Продовец: </b>${
        element.seller
      }\n<b>Цена: </b>${
        element.price * price.priceBnb
      }$\n<b>Генезис: </b>${
        element.attributes[13].value
      }\nlink^ ${lingene(link)}\nТекущий курс BNB^ ${price.priceBnb}`;
     
      setTimeout(() => sendTel(msde), sleepS * index);
    }
    if (
      element.price * price.priceBnb <= price.priceBuy_2 &&
      element.attributes[13]?.value == 2
    ) {
      console.log(element.price * price.priceBnb);
      console.log(element.seller);
      console.log(element.attributes[13].value);
      let msde = `Тэкс...!\n<b>Продовец: </b>${
        element.seller || 'ХЗ'
      }\n<b>Цена: </b>${
        element.price * price.priceBnb
      }$\n<b>Генезис: </b>${
        element.attributes[13].value
      }\nlink^ ${lingene(link)}\nТекущий курс BNB^ ${price.priceBnb}`;
 
  
      setTimeout(() => sendTel(msde), sleepS * index);
    }
    if (
      element.price * price.priceBnb <= price.priceBuy_3 &&
      element.attributes[13]?.value == 3
    ) {
      console.log(element.price * price.priceBnb);
      console.log(element.seller);
      console.log(element.attributes[13].value);
      let msde = `Тэкс...!\n<b>Продовец: </b>${
        element.seller || 'ХЗ'
      }\n<b>Цена: </b>${
        element.price * price.priceBnb
      }$\n<b>Генезис: </b>${
        element.attributes[13].value
      }\nlink^ ${lingene(link)}\nТекущий курс BNB^ ${price.priceBnb}`;
  
      setTimeout(() => sendTel(msde), sleepS * index);
    }
    if (
      element.price * price.priceBnb <= price.priceBuy_0 &&
      element.attributes[13]?.value == 0
    ) {
      console.log(element.price * price.priceBnb);
      console.log(element.seller);
      console.log(element.attributes[13].value);
      let msde = `Тэкс...!\n<b>Продовец: </b>${
        element.seller || 'ХЗ'
      }\n<b>Цена: </b>${
        element.price * price.priceBnb
      }$\n<b>Генезис: </b>${
        element.attributes[13].value
      }\nlink^ ${lingene(link)}\nТекущий курс BNB^ ${price.priceBnb}`;
     
      setTimeout(() => sendTel(msde), sleepS * index);
    }
    if (
      element.price * price.priceBnb <= 5000 &&
      element.attributes[2]?.value == "Super"
    ) {
      let msde = `🚀Тэкс...! Тут Super\n<b>Продовец: </b>${
        element.seller || 'ХЗ'
      }\n<b>Цена: </b>${
        element.price * price.priceBnb
      }$\n<b>Генезис: </b>${
        element.attributes[13].value
      }\nlink^ ${lingene(link)}\nТекущий курс BNB^ ${price.priceBnb}`;
     
      setTimeout(() => sendTel(msde), sleepS * index);
    }
    if (
      element.price * price.priceBnb <= 180 &&
      element.attributes[13]?.value == 10
    ) {
      let msde = `🚀Тэкс...!\n<b>Продовец: </b>${
        element.seller || 'ХЗ'
      }\n<b>Цена: </b>${
        element.price * price.priceBnb
      }$\n<b>Генезис: </b>${
        element.attributes[13].value
      }\nlink^ ${lingene(link)}\nТекущий курс BNB^ ${price.priceBnb}`;
     
      setTimeout(() => sendTel(msde), sleepS * index);
    }
    if (
      element.price == 15 &&
      element.attributes[13]?.value == 7
    ) {
      let msde = `Тест...! Тут \n<b>Продовец: </b>${
        element.seller || 'ХЗ'
      }\n<b>Цена: </b>${
        element.price * price.priceBnb
      }$\n<b>Генезис: </b>${
        element.attributes[13].value
      }\nlink^ ${lingene(link)}\nТекущий курс BNB^ ${price.priceBnb}`;
      let start = new Date().getTime();
      setTimeout(() => sendTel(msde), sleepS * index);
    }
    function lingene(link) {
      if (element.tokenId != undefined) {
        return `${link}/${element.tokenId}/${element.sellId}`
      }
      if (element.tokenId == undefined) {
        return `${link}`
  
      }
    }
  }

  async function sendTel(msg) {
    bot.telegram.sendMessage(-715760523, msg, { parse_mode: "HTML" });
  }


  
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
        `Пороги: Ген_0: ${price.priceBuy_0}$, Ген_1: ${price.priceBuy_1}$, Ген_2: ${price.priceBuy_2}$, Ген_3: ${price.priceBuy_3}$`
      );
    }
    console.log(isNumber(ctx?.message?.text));
  
    if (isNumber(ctx?.message?.text)) {
   
      
      if (gen == "gen0") {
        price.priceBuy_0 = ctx?.message?.text;
      }
      if (gen == "gen1") {
        price.priceBuy_1 = ctx?.message?.text;
      }
      if (gen == "gen2") {
        price.priceBuy_2 = ctx?.message?.text;
      }
      if (gen == "gen3") {
        price.priceBuy_3 = ctx?.message?.text;
      }
      ctx.telegram.sendMessage(
        ctx.chat.id,
        `Все поменял значение\n Пороги: Ген_0: ${price.priceBuy_0}$, Ген_1: ${price.priceBuy_1}$, Ген_2: ${price.priceBuy_2}$, Ген_3: ${price.priceBuy_3}$`
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
  module.exports = {senDataTelegram};