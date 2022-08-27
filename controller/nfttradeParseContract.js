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
async function nfttradeParseContract(index, nft_contract) {
  return new Promise((resolve, reject) => {


    let NftPokemon = require("../model/nft_detalii")(nft_contract, 'nftrade');
  axios
    .get(
      `https://api.nftrade.com/api/v1/tokens?contractAddress=${nft_contract}&limit=5000&skip=${
        index * 100
      }`,
      { headers: header2 }
    )
    .then((resnftrade) => {
      if (resnftrade.data.length != 0) {
        resnftrade.data.forEach(async function (value, indexs) {
          if (value?.orderId != null) {
            
            setTimeout(async ()=> {
              await Promise.all([getOrdernftrade(
                value.orderId, indexs
              )])
            }, 300*indexs)
          } else {
           
     
            let element = Object.assign({}, {
            chainId: value?.chainId,
            collectionName: value?.contractName,
            tokenId: value?.tokenID,
            collectionAddress: value?.contractAddress,
            tokenURI: value?.tokenURI,
            name: value?.name,
            image: value?.image,
            sellTime: value?.last_sell_at,
            last_sell: value?.last_sell,
            last_sell_at: value?.last_sell_at,
            thumb: value.thumb,
            price: value?.price
          
          });
          setTimeout(async () => {
            console.log('add db nftrade');
            await addDB(element, [], "nftrade", [], nft_contract)
          }, 200*indexs);
           
            
            
            // console.log('orderId == null');
          }
          if (resnftrade.data == indexs) {
            return resolve('Цикл nfttradeParseContract закончился')
          }
        });
        resnftrade.data = 0;

       
      
        
         
      }
    }).catch(function (error) {
      console.log("Show error notification nfttradeParseContract!");
      console.log(error);
      setTimeout(() => techbicaleventTelegram(index, error, `https://api.nftrade.com/api/v1/tokens?contractAddress=${nft_contract}&limit=5000&skip=${
        index * 100
      }`), 200 * index);
  
    });;
  })
}

async function getOrdernftrade(orderID, index) {
  // console.log(index);
  return new Promise((resolve, reject) => {
    axios
      .get(`https://api.nftrade.com/api/v1/orders/${orderID}`, {
        headers: header2,
      })
      .then(async (resnftrade) => {
        // if (resnftrade.status != 200) {
        //   reject(resnftrade.status);
        // }
        let element = resnftrade.data;

       

        senDataTelegram(
          element.tokens[0],
          `https://nftrade.com/assets/bsc/${element.tokens[0].contractAddress}/${element.tokens[0].tokenID}`,
          index
        );
        // console.log('element.tokens[0]');
        // console.log(element.tokens[0]);
        return resolve(await addDB(element.tokens[0], [], "nftrade", [], element.tokens[0].contractAddress))
         
      })
      .catch(function (error) {
        console.log(error);
        console.log("Show error notification nfttradeParseContract!");
        setTimeout(() => techbicaleventTelegram(index, error, 'nfttradeParseContract'), 200 * index);
      
   
      });
  });
}

module.exports = { nfttradeParseContract };
