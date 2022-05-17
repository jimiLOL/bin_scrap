const { default: axios } = require("axios");
const { add_binance_db, addDBCoverBinance } = require('./../addDB');
const { add_history_binance_db } = require('./../add_db_history');
const helper = require('./../helper/helper');
require("dotenv/config");

const fs = require("fs");


function getProductDetail(productBinance, agent, header) {
  return new Promise((resolve, reject) => {
    // console.log('getProductDetail');
    const body = {
      productId: productBinance.productId
    };
    let t = helper.uuid();
    header['x-ui-request-trace'] = t;
    header['x-trace-id'] = t;
 
    axios.post('https://www.binance.com/bapi/nft/v1/friendly/nft/nft-trade/product-detail', body, { headers: header, httpsAgent: agent, timeout: 5000 }).then(async res => {
      let productDetail = res.data.data;

      if (res.data.code != '000000') {
        // console.log(res.data?.message + ' для proxy: ' + agent?.proxyOptions.host + ' спим 1020 ms..');
        // await helper.timeout(1020)

        // helper.getIP(agent).then(() => {
        //   // process.exit(1)

        // });


      }
      // let reqCoverUrl = '';
      // try {
      //   if (res.data.data.hasOwnProperty('mysteryBoxProductDetailVo')) {
      //     reqCoverUrl = `https://www.binance.com/bapi/nft/v1/public/nft/mystery-box-collection-page/collection-price?collectionId=${res.data.data.productDetail.collection.collectionId}`
  
      //   } else {
      //     reqCoverUrl = `https://www.binance.com/bapi/nft/v1/public/nft/home-layer-price?collectionId=${res.data.data.productDetail.collection.collectionId}`
  
      //   }
      //   let newHeader = header;
      //   newHeader.referer = `https://www.binance.com/en/nft/collection/wonderfulday-tiger-nft-${res.data.data.productDetail.collection.collectionId}?orderBy=list_time&orderType=-1&isBack=1&id=${res.data.data.productDetail.collection.collectionId}&order=list_time%40-1`
      //    axios.get(reqCoverUrl, { headers: newHeader, httpsAgent: agent, timeout: 15000 }).then(resCover=> {
      //   resCover.data['collectionId'] = res.data.data.productDetail.collection.collectionId;
      //   addDBCoverBinance(resCover.data)

      // }).catch(e=> {
      //   console.log(e);
      // })

      // } catch (e) {
      //   // console.log(e);
      // // console.log(res.data.data);

      // }
      

     

      // console.log(res.data);
      t = helper.uuid();
      header['x-ui-request-trace'] = t;
      header['x-trace-id'] = t;

      if (productDetail != null) {
      header.Referer = `https://www.binance.com/ru/nft/goods/detail?productId=${productDetail.productDetail.id}&isProduct=1`
      axios.get(`https://www.binance.com/bapi/nft/v1/public/nft/nft-info/event/simple/${productDetail.nftInfo.nftId}?page=1&pageSize=10&salesOnlyFlag=false`, { headers: header, httpsAgent: agent, timeout: 9000 }).then(response => {
        productDetail.records = response.data.data.records;
        productDetail.total = response.data.data.total;
        // console.log('get history Product Binance');
        //   console.log(productDetail);
        //   process.exit(0)
        addDB(productBinance, productDetail).then(() => {
          productBinance = null;
          resolve({status: 'ok', proxy: agent.proxyOptions.host})
        }).catch(e => {
          productBinance = null;
          reject({status: 'error', proxy: agent.proxyOptions.host})
        });


      }).catch(e => {
        // console.log(e);
        // console.log(header);
        console.log('catch');
        // process.exit(1)
        addDB(productBinance, productDetail);
        reject({status: 'error', proxy: agent.proxyOptions.host})
      })

      } else {
        addDB(productBinance, null).then(() => {
          productBinance = null;
          resolve({status: 'ok', proxy: agent.proxyOptions.host})
        }).catch(e => {
          productBinance = null;
          reject({status: 'error', proxy: agent.proxyOptions.host})
        });


      }


    

    }).catch(e => {
      if (process.env.PROD == 'dev') {
        fs.appendFile(`./errorProxy.txt`, `\n${agent.proxyOptions.host}`, function (error) {
          if (error) throw error; // если возникла ошибка
          // console.log("Ожидание записи...");
          let start = new Date().getTime();
          let end = new Date().getTime();
          // console.log(`Запись: ${end - start}ms`);
          reject([e?.code, agent?.proxyOptions.host])

        });
      } else {
        reject([e?.code || e, agent?.proxyOptions.host])

        
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
        return add_history_binance_db(newProduct, 'binance')
      }).then(() => {
        productBinance = null;
        responseProductDetail = null;
        newProduct = null;
        resolve()
      }).catch((e) => {
        productBinance = null;
        responseProductDetail = null;
        newProduct = null;

        console.log(e);
        reject()
      })
      // process.exit(0)

    } else {
      productBinance = null;
      // console.log('else');
      resolve()
      // process.exit(0)


    }
  })


};


module.exports = { getProductDetail }