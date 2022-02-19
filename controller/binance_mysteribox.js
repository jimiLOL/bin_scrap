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
const binanceAdminCookies = require("../model/binanceAdminCookies");
const fs = require("fs");

// const agent = tunnel.httpsOverHttp({
//   proxy: {
//     host: "127.0.0.1",
//     port: 8867,
//   },
//   rejectUnauthorized: false,
// });

const base_url = "https://www.binance.com/ru/nft/history";
const key = "bfa0c04eae93bc8d68bd5caf2227dc37"; // ключ anti-captcha.com
const buydropMS = 100; // сколько спать между итерациями в ожидании
const number = 5; //сколько  покупать
const power = 1; // множитель запросов, 1 - как обычно
const lastTime = -10; // На сколько отложить покупку - откладываем + покупаем раньше ms
const errorVar = 1000; //Сколько не успешных попыток допускать
let cycle = 0;
let crondown = 0;

async function buyNFT(nftInfo, diffMS, cookies) {

  console.log("Работа с аккаунтом " + cookies.user);

  let start = new Date().getTime();
  let productId = nftInfo.productId;
  let body = {
    clientKey: key,
    task: {
      type: "RecaptchaV3TaskProxyless",
      websiteURL: base_url,
      websiteKey: "6LeUPckbAAAAAIX0YxfqgiXvD3EOXSeuq0OpO8u_",
      minScore: 0.9,
      pageAction: "submit",
      isEnterprise: false,
    },
  };

  let headers = {
    accept: "*/*",
    "accept-language":
      "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6,zh;q=0.5",
    clienttype: "web",
    "content-type": "application/json",
    lang: "en",
    "sec-ch-ua":
      '"Google Chrome";v="93", " Not;A Brand";v="99", "Chromium";v="93"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
  };

  let params = {
    headers,
    referrer: `https://www.binance.com/en/nft/blindBox/detail?number=${number}&productId=${productId}`,
    referrerPolicy: "origin-when-cross-origin",
    body: JSON.stringify({ number, productId }),
    method: "POST",
    mode: "cors",
    credentials: "include",
  };

  function get_captcha(_url, cb) {
    return new Promise((resolve, reject) => {
      axios
        .post("https://api.capmonster.cloud/createTask", body, {
          headers: {
            accept: "application/json",
            "content-type": "application/json",
          },
        })
        .then((res) => {
          console.log(res.data);
          let id = res.data?.taskId;
          let body = {
            clientKey: key,
            taskId: id,
          };
          if (id == undefined) {
            get_captcha();
          } else { 
            check_status(id);
            function check_status(id) {
              axios
                .post("https://api.capmonster.cloud/getTaskResult", body, {
                  headers: {
                    accept: "application/json",
                    "content-type": "application/json",
                  },
                })
                .then((res) => {
                  console.log("Status task get_captcha");
                  console.log(res.data);
                  if (res.data?.status === "ready") {
                    return resolve(res.data?.solution.gRecaptchaResponse);
                  } else {
                    console.log(res.data?.status);
                    setTimeout(() => check_status(id), 500);
                  }
                });
            }
          }
          
        })
        .catch((e) => {
          console.log(e);
          reject(e);
        });
    });
  }

  function uuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  async function buy(key) {
    console.log("diffMS:", diffMS);

    let full = "";
    let json = JSON.parse(cookies.Cookie);
    json.cookies.forEach((element) => {
      full = full + element.name + "=" + element.value + "; ";
    });
    headers["x-nft-checkbot-token"] = key;
    headers["User-Agent"] = cookies.UserAgent;
    headers["x-ui-request-trace"] = cookies.xuirequesttrace;
    headers["x-trace-id"] = cookies.xtraceid;
    headers["bnc-uuid"] = cookies.bncuuid;
    headers["device-info"] = cookies.deviceinfo;
    headers["fvideo-id"] = cookies.deviceinfo;
    headers.csrftoken = cookies.csrftoken;
    headers["x-nft-checkbot-sitekey"] =
      "6LeUPckbAAAAAIX0YxfqgiXvD3EOXSeuq0OpO8u_";
    headers.Cookie = full;
    let endCookParse = new Date().getTime();
    console.log(`endCookParse ${endCookParse - start} ms`);
    let ids = {};
    let tokens = [];
    function loop(key) {
      let time = Date.now();
      let drop = nftInfo;
     

      tokens.push(false);

      

      // ||  ((time + lastTime) - time == lastTime) && ((drop.startTime + lastTime) - drop.startTime == lastTime)

      if (time + diffMS + lastTime >= drop.startTime) {
        letlogDate = new Date();
        console.log('Init buy.. ' + letlogDate);
        for (let i = 0; i < power; i++) {
          let body = { number: number, productId: productId };
          axios
            .post(
              "https://www.binance.com/bapi/nft/v1/private/nft/mystery-box/purchase",
              body,
              { headers: headers }
            )
            .then((res) => {
              if (res.status == 200) {
                console.log(res.status);
                console.log(res.data);
                if (res.data?.message == "Token expired") {
                  get_captcha();
                } else if (res.data?.message == 'Out of stock' && lastTime < 0) {
                  setTimeout(loop(key), buydropMS);

                } else if (res.data?.message == 'Too many requests. Please try again later.') {
                  let sleep = 300;
                  setTimeout(loop(key), sleep);

                } else if (res.data?.message == 'Out of stock' && lastTime > 0) {
                  console.log('Out of stock :(')

                } else {
                  let body = {
                    orderId: res.data.data.orderId,
                  };
                  axios
                    .post(
                      "https://www.binance.com/bapi/nft/v1/private/nft/mystery-box/purchase-status",
                      body,
                      { headers: headers }
                    )
                    .then((res) => {
                      if (res.data?.data.status == 'ORDER_SUCCESS') {
  
                      }
                       if (res.data?.data.status == 'ORDER_INITIAL') {
  
                      }
  
                
                       
                      console.log(res.data);
                    });
                }

               
              } else {
                console.log(res.status);
                console.log(res.data);
                setTimeout(() => {loop(key)}, lastTime);
         
              }
              let end = new Date().getTime();
              console.log(`Скрпит работал ${end - start} - Текущие время: ${end}`);
            })
            .catch(async (e) => {
              cycle++
              if (errorVar == cycle) {
 if (e.response?.data.message == "Token expired") {
                let newCookies = await binanceAdminCookies.findOne(
                  {user: cookies.user},
                  (err, call) => {
                    if (err) console.log(err);
  
                    if (call) {
                      return call;
                    }
                  }
                );
                cookies = newCookies;
                console.log(e.response?.data);
                get_captcha()
                .then((res) => {
                  buy(res);
                })
                .catch((e) => {
                  console.log(e);
                });
              } else {
                console.log(e);
                function getRandomInt(min, max) {
                  min = Math.ceil(min);
                  max = Math.floor(max);
                  return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
                }
                let sleep = 100;
                setTimeout(loop(key), sleep);
                let ranS = getRandomInt(1233, 99992);
                fs.writeFile(`./temp/err${ranS}.html`, e, function (error) {
                  try {
                    if (error) throw error; // если возникла ошибка
                    console.log("Асинхронная запись HTML файла завершена.");
             
                  } catch {
                    console.log('Не смогли записать лог ошибки')
                  }
                  
                });
               
              }
              }
             
            });
        }
      } else {
        let newDate = new Date().getTime();
        let logDateNew = new Date();
        crondown = (drop.startTime - newDate) - (lastTime > 0 ? lastTime : (lastTime*-1) );
        crondown = crondown > 0 ? crondown : (crondown*-1);
        
        console.log('loop waite... ' + crondown + ' ms ' + 'Date: ' + logDateNew);
        setTimeout(() => {loop(key)}, crondown);
      }
    }

    loop(key);
  }
  get_captcha()
    .then((res) => {
      buy(res);
    })
    .catch((e) => {
      console.log(e);
    });
}

module.exports = { buyNFT };
