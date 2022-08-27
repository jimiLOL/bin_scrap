const { senDataTelegram, techbicaleventTelegram } = require("../controller/sendTelegram");
const { default: axios } = require("axios");
const { addDB } = require("./addDB");
const { count } = require("../model/price");
 

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
function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


async function nftTradeGet(index, nft_contract) {
  return new Promise((resolve, reject) => {


  try {
  let NftPokemon = require("../model/nft_detalii")(nft_contract, 'nftrade');
  axios
    .get(
      `https://api.nftrade.com/api/v1/tokens?contractAddress=${nft_contract}&limit=100&skip=${
        index * 100
      }`,
      { headers: header2 }
    )
    .then((resnftrade) => {
      if (resnftrade.status != 200) {
        console.log('resnftrade.status');
        console.log(resnftrade.status);
        reject(resnftrade.status)
        
      }
      if (resnftrade.data.length != 0) {
        let err = false;
        (async () => {
          for (const [index, iterator] of resnftrade.data.entries()) {
        
          if (err) {
            break
          }
            if (iterator?.orderId != null) {
              await NftPokemon.findOne(
                { tokenId: iterator.tokenID },
                { attributes: 1 },
                async (err, callback) => {
                  if (err) {
                    console.log("Ошибка получения attributes");
                    console.log(err);
                  }
                  if (callback) {
                   await timeout(2500).then(() => {
                      getMocha(nft_contract, iterator, callback)
                     }).catch((error) => {
                      console.log("Show error notification getMocha for nftTradeGet!");
                      console.log(error);
                      err = true
                      reject(error);
                    })
                    
                  
                  
  
                   
                  }
                }
              ).catch(error => {
                return reject(error)
            })
            }
          
          
        }
      })();

        // resnftrade.data.forEach(async function (value, index) {
        //   if (value?.orderId != null) {
        //     NftPokemon.findOne(
        //       { tokenId: value.tokenID },
        //       { attributes: 1 },
        //       async (err, callback) => {
        //         if (err) {
        //           console.log("Ошибка получения attributes");
        //           console.log(err);
        //         }
        //         if (callback) {
                  
        //          await Promise.all([timeout(2500).then(() => {
        //           getMocha(nft_contract, value, callback).catch((error) => {
        //             console.log("Show error notification getMocha for nftTradeGet!");
        //             console.log(error);
        //             reject(error);
        //           })

        //          })])
                

                 
        //         }
        //       }
        //     ).catch(error => {
        //       return Promise.reject(error)
        //   })
        //   } else {
        //     // console.log('orderId == null');
        //   }
        // });
        resnftrade.data = 0;
      }
    }).catch((e) => {
      setTimeout(() => techbicaleventTelegram(index, e, 'nftTradeGet'), 200 * index);
    });
  } catch (e) {
    console.log('Ошибка работы функции nftTradeGet');
    console.log(e);

  }
})
}

async function getMocha(nft_contract, value, callback) {
  return new Promise((resolve, reject) => {
    axios
    .get(
      `https://api.mochi.market/nft/56/${nft_contract}/${value.tokenID}`,
      { headers: header }
    )
    .then(async (resmochiNftmarket) => {
      if (resmochiNftmarket.status != 200) {
        
        reject(resmochiNftmarket.status)
      }
      return resolve(await Promise.all([getOrdernftrade(
        value.orderId,
        callback.attributes,
        resmochiNftmarket?.data?.extraMetadata
      ).catch(function (error) {
        console.log("Show error notification getMocha in 1!");
        console.log(error);
        reject(error);
      }), timeout(2500)]).then((res)=>{
        console.log(res);
      }))
     
     
    })
    .catch(function (error) {
      console.log("Show error notification getMocha in 2!");
      console.log(error);
      reject(error);
    });
  })
  

}


async function getOrdernftrade(orderID, attributes, extraMetadata, index) {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://api.nftrade.com/api/v1/orders/${orderID}`, {
        headers: header2,
      })
      .then((resnftrade) => {
        if (resnftrade.status != 200) {
          reject(resnftrade.status);
        }
        let element = resnftrade.data;

       

        senDataTelegram(
          element.tokens[0],
          `https://nftrade.com/assets/bsc/${element.tokens[0].contractAddress}/${element.tokens[0].tokenID}`,
          index
        );
        return resolve(addDB(element.tokens[0], attributes(attributes), "nftrade", extraMetadata(extraMetadata), element.tokens[0].contractAddress))
      
      })
      .catch(function (error) {
        console.log("Show error notification nftrade!");
        setTimeout(() => techbicaleventTelegram(index, error, 'nfttrade'), 200 * index);
        console.log(error);
        reject(error);
      });
  });
  function extraMetadata(extraMetadata) {
    if (extraMetadata == null) {
    return []
    } else {
    return extraMetadata
    }
    };
    function attributes(attributes) {
      if (attributes == null) {
        return []
      } else {
        return attributes
      }
    };
}



module.exports = { nftTradeGet };
