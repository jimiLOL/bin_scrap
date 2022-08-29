import { default as axios } from "axios";
import { add_binance_db } from "./../addDB";
// const { add_binance_db } = require("./../addDB");
import { add_history_binance_db } from "./../add_db_history";
import { helper } from "./../helper/helper";
import { AxiosResponse } from "axios";

import {
  productBinanceProduct,
  resolve,
  productDetailAll,
  resData,
  historyRecord,
  productBinanceMystery,
  MysteryBox,
  productBinanceAll,
  orderSuccessAnnounces,
} from "./get_productDetali";

require("dotenv/config");

import fs from "fs";

function marketProductDetail<T extends productBinanceProduct>(
  productBinance: T,
  agent: any,
  header: any
): Promise<resolve> {
  return new Promise((resolve, reject) => {
    const body = {
      productId: productBinance.productId,
    };
    let t = helper.uuid();
    header["x-ui-request-trace"] = t;
    header["x-trace-id"] = t;

    axios
      .post(
        "https://www.binance.com/bapi/nft/v1/friendly/nft/nft-trade/product-detail",
        body,
        { headers: header, httpsAgent: agent, timeout: 5000 }
      )
      .then(
        async <T extends resData<productDetailAll>>(res: AxiosResponse<T>) => {
          let productDetail: productDetailAll = res.data.data;

          t = helper.uuid();
          header["x-ui-request-trace"] = t;
          header["x-trace-id"] = t;

          if (productDetail != null) {
            header.Referer = `https://www.binance.com/ru/nft/goods/detail?productId=${productDetail.productDetail.id}&isProduct=1`;
            axios
              .get(
                `https://www.binance.com/bapi/nft/v1/public/nft/nft-info/event/simple/${productDetail.nftInfo.nftId}?page=1&pageSize=10&salesOnlyFlag=false`,
                { headers: header, httpsAgent: agent, timeout: 9000 }
              )
              .then(
                <T extends resData<historyRecord>>(
                  response: AxiosResponse<T>
                ) => {
                  productDetail.records = response.data.data.records;
                  productDetail.total = response.data.data.total;

                  addDB(productBinance, productDetail, agent, header)
                    .then(() => {
                      return resolve({ status: "ok", proxy: agent.proxyOptions.host });
                    })
                    .catch((e) => {
                      return reject({
                        status: "error",
                        proxy: agent.proxyOptions.host,
                      });
                    });
                }
              )
              .catch((e: any) => {
                console.log("catch");
                addDB(productBinance, productDetail, agent, header)
                  .then(() => {
                    return resolve({ status: "ok", proxy: agent.proxyOptions.host });
                  })
                  .catch((e) => {
                    return reject({
                      status: "error",
                      proxy: agent.proxyOptions.host,
                    });
                  });
                // reject({ status: "error", proxy: agent.proxyOptions.host });
              });
          } else {
            addDB(productBinance, null, agent, header)
              .then(() => {
                return resolve({ status: "ok", proxy: agent.proxyOptions.host });
              })
              .catch((e) => {
                return reject({ status: "error", proxy: agent.proxyOptions.host });
              });
          }
        }
      )
      .catch((e: any) => {
        console.log(e.message);
        console.log(`${agent.proxyOptions.host}:${agent.proxyOptions.port}`);

        if (process.env.PROD == "dev") {
          fs.appendFile(
            `./errorProxy.txt`,
            `\n${agent.proxyOptions.host}:${agent.proxyOptions.port}`,
            function (error: unknown) {
              if (error) throw error; // если возникла ошибка
              // console.log("Ожидание записи...");
              let start = new Date().getTime();
              let end = new Date().getTime();
              // console.log(`Запись: ${end - start}ms`);
              return reject([e?.code, agent?.proxyOptions.host]);
            }
          );
        } else {
          return reject([e?.code || e, agent?.proxyOptions.host]);
        }
      });
  });
}

function mysteryBoxProductDetail<T extends productBinanceMystery>(
  productBinance: T,
  agent: any,
  header: any
): Promise<resolve> {
  return new Promise((resolve, reject) => {
    let t = helper.uuid();
    header["x-ui-request-trace"] = t;
    header["x-trace-id"] = t;
    // console.log('mysteryBoxProductDetail');
    // console.log(`https://www.binance.com/bapi/nft/v1/friendly/nft/nft-asset/asset-detail?nftInfoId=${productBinance.productId}`);

    try {
      axios
        .get(
          `https://www.binance.com/bapi/nft/v1/friendly/nft/nft-asset/asset-detail?nftInfoId=${productBinance.productId}`,
          { headers: header, httpsAgent: agent, timeout: 5000 }
        )
        .then(async <T extends resData<MysteryBox>>(res: AxiosResponse<T>) => {
          let productDetail: MysteryBox = res.data.data;

          // if (res.data.code != '000000') {

          // console.log(res.data);
          t = helper.uuid();
          header["x-ui-request-trace"] = t;
          header["x-trace-id"] = t;

          if (productDetail != null) {
            // header.Referer = `https://www.binance.com/ru/nft/goods/detail?productId=${productDetail.productDetail.id}&isProduct=1`;
            axios
              .get(
                `https://www.binance.com/bapi/nft/v1/public/nft/nft-info/event/simple/${productDetail.nftInfoDetailMgsVo.nftId}?page=1&pageSize=10&salesOnlyFlag=false`,
                { headers: header, httpsAgent: agent, timeout: 9000 }
              )
              .then(
                <T extends resData<historyRecord>>(
                  response: AxiosResponse<T>
                ) => {
                  productDetail.records = response.data.data.records;
                  productDetail.total = response.data.data.total;
                  // console.log('get history Product Binance');
                  //   console.log(productDetail);
                  //   process.exit(0)
                  addDB(productBinance, productDetail, agent, header)
                    .then(() => {
                      // productBinance = null;
                      return resolve({ status: "ok", proxy: agent.proxyOptions.host });
                    })
                    .catch((e) => {
                      // productBinance = null;
                      return reject({
                        status: "error",
                        proxy: agent.proxyOptions.host,
                      });
                    });
                }
              )
              .catch((e: Error) => {
                // console.log(e);
                // console.log(header);
                console.log("catch");
                // process.exit(1)
                addDB(productBinance, productDetail, agent, header)
                    .then(() => {
                      // productBinance = null;
                      return resolve({ status: "ok", proxy: agent.proxyOptions.host });
                    })
                    .catch((e) => {
                      // productBinance = null;
                      return reject({
                        status: "error",
                        proxy: agent.proxyOptions.host,
                      });
                    });
              });
          } else {
            addDB(productBinance, null, agent, header)
              .then(() => {
                // productBinance = null;
                return resolve({ status: "ok", proxy: agent.proxyOptions.host });
              })
              .catch((e) => {
                // productBinance = null;
                return reject({ status: "error", proxy: agent.proxyOptions.host });
              });
          }
        })
        .catch((e: any) => {
          console.log(`${agent.proxyOptions.host}:${agent.proxyOptions.port}`);

          if (process.env.PROD == "dev") {
            fs.appendFile(
              `./errorProxy.txt`,
              `\n${agent.proxyOptions.host}:${agent.proxyOptions.port}`,
              function (error: any) {
                if (error) throw error; // если возникла ошибка
                // console.log("Ожидание записи...");
                let start = new Date().getTime();
                let end = new Date().getTime();
                // console.log(`Запись: ${end - start}ms`);
                return reject([e?.code, agent?.proxyOptions.host]);
              }
            );
          } else {
            return reject([e?.code || e, agent?.proxyOptions.host]);
          }

          // console.log(e);
          // process.exit(1)

          //   addDB(productBinance)
        });
    } catch (e) {
      console.log(e);
      console.log(`${agent.proxyOptions.host}:${agent.proxyOptions.port}`);
    }
  });
}

function getProductDetail<T extends productBinanceAll>(
  productBinance: T,
  agent: any,
  header: any
): Promise<resolve> {
  return new Promise((resolve, reject) => {
    // console.log(productBinance);

    // console.log('getProductDetail ' + productBinance.nftType);
    if (!productBinance?.nftType) {
      console.log("====\n");

      console.log(productBinance);
      console.log("====\n");
      fs.appendFile(
        `./ErrorGet_ProductDetali_orderSuccessAnnounces.txt`,
        JSON.stringify(productBinance),
        function (error) {
          if (error) throw error;
        }
      );
    }

    if (productBinance.nftType == 1) {
      marketProductDetail(productBinance, agent, header)
        .then((res: resolve) => resolve(res))
        .catch((e) => reject(e));
    } else {
      mysteryBoxProductDetail(productBinance, agent, header)
        .then((res: resolve) => resolve(res))
        .catch((e) => reject(e));
    }
    // if (productBinance.nftType == 1) {

    //   marketProductDetail(productBinance, agent, header)
    //     .then((res: resolve) => resolve(res))
    //     .catch((e) => reject(e));
    // } else {
    //   mysteryBoxProductDetail(productBinance, agent, header)
    //     .then((res: resolve) => resolve(res))
    //     .catch((e) => reject(e));
    // }
  });
}

function addDB<
  T extends productBinanceAll,
  P extends productDetailAll | MysteryBox
>(
  productBinance: T | null,
  responseProductDetail: P | null = null,
  agent: any,
  header: any
): Promise<void> {
  return new Promise((resolve, reject) => {
    if (responseProductDetail != null) {
      const newProduct: (productBinanceAll | orderSuccessAnnounces) &
        (productDetailAll | MysteryBox) = Object.assign(
        {},
        productBinance,
        responseProductDetail
      );

      add_binance_db(newProduct, "binance")
        .then(() => {
          return add_history_binance_db(newProduct, "binance");
        })
        .then(() => {
          productBinance = null;
          responseProductDetail = null;
          // newProduct = null;
          resolve();
        })
        .catch((e: ErrorConstructor) => {
          productBinance = null;
          responseProductDetail = null;
          // newProduct = null;

          console.log(e);
          reject();
        });
      // process.exit(0)
    } else {
      //   productBinance = null;
      if ((productBinance as T).nftType == 1) {
        (productBinance as T).nftType = 2;
      } else {
        (productBinance as T).nftType = 1;
      }
      console.log("!-!");
      // resolve();

      return getProductDetail(productBinance as productBinanceAll, agent, header)
        .then(() => {
          console.log("!");
          productBinance = null;

          return resolve();
        })
        .catch((e) => {
          productBinance = null;
          return resolve();
        });
      console.log("else");
      // process.exit(0)
    }
  });
}

export { getProductDetail };
