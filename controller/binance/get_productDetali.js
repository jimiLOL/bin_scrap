const { default: axios } = require("axios");
const { add_binance_db } = require('./../addDB')
const helper = require('./../helper/helper');
require("dotenv/config");

const fs = require("fs");


function getProductDetail(productBinance, agent, header) {
  return new Promise((resolve, reject) => {
    // console.log('getProductDetail');
    const body = {
      productId: productBinance.productId
    };
    // let t = helper.uuid();
    // header['x-ui-request-trace'] = t;
    // header['x-trace-id'] = t;
    axios.post('https://www.binance.com/bapi/nft/v1/friendly/nft/nft-trade/product-detail', body, { headers: header, httpsAgent: agent }).then(res => {
      let productDetail = res.data.data;

      if (res.data.code != '000000') {
        console.log(res.data);
        helper.getIP(agent).then(() => {
          // process.exit(1)

        });


      }

      // console.log(res.data);
      // let t = helper.uuid();
      // header['x-ui-request-trace'] = t;
      // header['x-trace-id'] = t;

      header.Referer = `https://www.binance.com/ru/nft/goods/detail?productId=${productDetail.productDetail.id}&isProduct=1`

      axios.get(`https://www.binance.com/bapi/nft/v1/public/nft/nft-info/event/simple/${productDetail.nftInfo.nftId}?page=1&pageSize=10&salesOnlyFlag=false`, { headers: header, httpsAgent: agent }).then(response => {
        productDetail.records = response.data.data.records;
        // console.log('get history Product Binance');
        //   console.log(productDetail);
        //   process.exit(0)
        addDB(productBinance, productDetail).then(() => {
          resolve()
        }).catch(e => {
          reject()
        });


      }).catch(e => {
        // console.log(e);
        // console.log(header);
        console.log('catch');
        // process.exit(1)
        addDB(productBinance, productDetail).then(() => {
          resolve()
        }).catch(e => {
          reject()

        });
      })

    }).catch(e => {
      if (process.env.PROD = 'dev') {
        fs.appendFile(`./errorProxy.txt`, `\n${agent.proxyOptions.host}`, function (error) {
          if (error) throw error; // если возникла ошибка
          console.log("Ожидание записи...");
          let start = new Date().getTime();
          setTimeout(() => {
            console.log("Асинхронная запись файла завершена.");

          }, 1500);
          let end = new Date().getTime();
          console.log(`Запись: ${end - start}ms`);
          reject([e.code, agent.proxyOptions.host])

        });
      } else {
        reject([e.code, agent.proxyOptions.host])

        
      }

      // console.log(e);
      // process.exit(1)


      //   addDB(productBinance)
    })
  })


}

function addDB(productBinance, responseProductDetail = null) {
  return new Promise((resolve, reject) => {
    if (responseProductDetail != null) {
      let newProduct = Object.assign({}, productBinance, responseProductDetail);
      add_binance_db(newProduct, 'binance').then(() => {
        resolve()
      }).catch((e) => {
        reject()
      })
      // process.exit(0)

    } else {
      console.log('else');
      resolve()
      // process.exit(0)


    }
  })


};


module.exports = { getProductDetail }