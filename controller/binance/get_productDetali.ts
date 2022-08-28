
import { default as axios } from "axios";
import {add_binance_db} from "./../addDB";
// const { add_binance_db } = require("./../addDB");
import { add_history_binance_db } from "./../add_db_history";
import {helper} from "./../helper/helper";
import { AxiosResponse } from "axios";
 


require("dotenv/config");

import fs from "fs";

export interface resolve {
  status: string;
  proxy: string;
}
export type productBinanceAll = productBinanceMystery | productBinanceProduct;
// type productBinance<T, P> = {
//   nftType: 1,
//   productId: number;
// } | {
//   nftType: 2 | 3,
//   productId: number;
// } & {
//   nftType: number
// }

// type price = {
//   price: string;
// } | {
//   amount: string;
// }

type productBinance<T> = {
  [Property in keyof T]: T[Property];
};

// interface CatInfo {
//   age: number;
//   breed: string;
// }

// type CatName = "miffy" | "boris" | "mordred";

type PartialProduct = Partial<productBinanceAll>; // https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html#partial-readonly-record-and-pick

// type Record<CatName, CatInfo> = {
//   miffy: { age: 10, breed: "Persian" },
//   boris: { age: 5, breed: "Maine Coon" },
//   mordred: { age: 16, breed: "British Shorthair" },
// };

export type orderSuccessAnnounces = {
  buyerName?: string;
  buyerAvatar?: null | string;
  productTitle?: string;
  orderSuccessTime?: number;
  price?: string;
  currency?: string;
  duration?: string;
  currentTimestamp?: string;
  tradeType?: number;
  nftType: number;
  productId: number;
}
export type productBinanceMystery = {
  productId: string;
  title?: string;
  coverUrl?: string;
  tradeType?: number;
  nftType: number;
  batchNum?: number;
  amount?: string;
  currency?: string;
  setStartTime?: number;
  setEndTime?: number;
  timestamp?: number;
  rarity?: number;
  status?: number;
  verified?: number;
  collectionId?: string;
  collectionName?: string;
}
interface ownerType {
  userId: string;
  avatarUrl: string;
  nickName: string;
  artist: boolean;
}
interface approveType {
  count: number;
  approve: boolean;
}
export type productBinanceProduct = {
  productId: string;
  title?: string;
  coverUrl?: string;
  tradeType?: number;
  nftType: number;
  batchNum?: number;
  amount?: string;
  currency?: string;
  setStartTime?: number;
  setEndTime?: number;
  timestamp?: number;
  rarity?: number;
  status?: number;
  owner?: ownerType;
  creator?: null | string;
  mediaType?: string;
  favorites?: number;
  network?: string;
  approve?: approveType;
  verified?: number;
  collectionId?: string;
  collectionName?: string;
};
export type productDetailAll = {
  productDetail: productDetail;
  productFee: string | null;
  nftInfo: nftInfo;
  isOwner: number;
  maxAmountUserId: string | null;
  timestamp: number;
  mysteryBoxProductDetailVo: null;
  approve: boolean | null;
  royaltyFee: number;
  platformFee: number;
  reportVo: reportVo | null;
  records: records[];
  total: number;
};

interface nftInfo {
  nftId: number;
  tokenId: string;
  rawUrl: string;
  coverUrl: string;
  contractAddress: string;
  mediaType: string;
  rawSize: number;
  specification: string;
  duration: string | null;
  rarity: number;
  creator: creator;
  owner: owner | null;
  network: string;
  itemId: string;
  numTokens: number;
  approveCount: string | null;
  properties: string | null;
}
interface owner {
  avatarUrl: string;
  nickName: string;
  description: string | null;
}
interface creator {
  avatarUrl: string;
  nickName: string;
  description: string | null;
  userId: string | null;
  artist: boolean;
}
type productDetail = {
  id: number;
  productNo: string;
  title: string;
  category: number;
  relateId: string;
  nftType: number;
  tradeType: number;
  amount: string;
  maxAmount: string;
  stepAmount: string;
  currentAmount: string;
  currency: string;
  setStartTime: number;
  setEndTime: number;
  status: number;
  batchNum: number;
  stockNum: number;
  leftStockNum: number;
  coverUrl: string;
  description: string;
  creatorId: string | null;
  listerId: string | null;
  listTime: number;
  listType: number;
  source: number;
  categoryVo: categoryVo;
  mediaType: string | null;
  tokenList: tokenList[];
  store: string | null;
  collection: collection;
  createTime: number;
  remarkType: string | null;
};
interface categoryVo {
  code: number;
  name: string;
}
interface tokenList {
  nftId: number;
  tokenId: string;
  contractAddress: string;
  listBefore: string | number;
  network: string;
  protocol: string | null;
}
export interface collection {
  collectionName: string;
  avatarUrl: string | null;
  canView: boolean;
  collectionId: string;
  verified: number;
}
export type records = {
  message: string;
  userId: string;
  userNickName: string;
  eventType: number;
  amount: string;
  asset: string;
  createTime: number;
};
export type historyRecord = {
  records: records[];
  total: number;
  size: number;
  current: number;
  orders: Array<{}>;
  searchCount: boolean;
  pages: number;
};

export type MysteryBox = {
  nftInfoDetailMgsVo: nftInfoDetailMgsVo;
  productDetailMgsVo: productDetailMgsVo;
  mysteryBoxMgsVo: mysteryBoxMgsVo;
  timestamp: string;
  royaltyFee: number;
  platformFee: number;
  adminOwner: boolean;
  records: records[];
  total: number;

};
type mysteryBoxMgsVo = {
  name: string;
  serialsNo: string;
  series: series[];
  store: number;
  startTime: number;
  endTime: number;
  secondMarketSellingDelay: string;
  aboutArtistVideo: string;
  network: string;
  image: string;
  price: string;
  currency: string;
  artist: string;
  creator: creator

};
interface series {
  itemId: string;
  name: string;
  amount: number;
  rarity: number;
  probability: string;
  coverImg: string;
  description: string
}
type productDetailMgsVo = {
  id: string;
  nftId: string;
  productNo: string;
  title: string;
  category: number;
  nftType: number;
  tradeType: number;
  amount: string;
  maxAmount: string;
  stepAmount: string;
  currency: string;
  setStartTime: number;
  setEndTime: number;
  status: number;
  batchNum: number;
  stockNum: number;
  leftStockNum: number;
  coverUrl: string;
  description: string;
  creatorId: string;
  listerId: string;
  listTime: number;
  listType: number;
  source: number;
  currentAmount: string;
  categoryVo: categoryVo | null;
  maxAmountUserId: string | null;
  tokenList: tokenList[];
  createTime: number;
  ownerId: string | null;
  adminOwner: boolean;


}
type nftInfoDetailMgsVo = {
  nftId: string;
  canBurn: boolean;
  tokenId: string;
  nftType: number;
  nftTitle: string;
  rawUrl: string;
  coverUrl: string;
  contractAddress: string;
  mediaType: string | null;
  description: string;
  nftStatus: number;
  rawSize: string | null;
  specification: string | null;
  forbiddenState: number;
  forbiddenWithdraw: boolean;
  forbiddenTrade: boolean;
  collectionId: string;
  collectionName: string;
  verified: number;
  canView: boolean;
  avatarUrl: string;
  duration: null;
  rarity: number;
  soldFor: string;
  asset: string;
  creator: creator;
  owner: ownerMysteryBox;
  network: string;
  approveCount: string;
  approve: boolean;
  isOwner: number;
  properties: Array<{}>;
  serialsNo: string;
  serialsName: string;
  chainRefDtoList: string | null;
  marketStatus: number;
  itemId: string;
  numTokens: null;
  mysteryQuantity: number;
  reportVo: reportVo;
  onChain: boolean;
  adminOwner: boolean;

}
type ownerMysteryBox = {
  avatarUrl: string;
  nickName: string;
  description: string | null;
  userId: string;
  artist: boolean
}
interface reportVo {
  canAdd: boolean;
  reported: boolean;
  leftCount: number;
  reportCount: number;
  riskCount: number;
}
export type resData<T> = {
  code: string;
  message: string | null;
  messageDetail: string | null;
  data: T;
  success: boolean;
};

function marketProductDetail<
  T extends productBinanceProduct
>(productBinance: T, agent: any, header: any): Promise<resolve> {
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
                      resolve({ status: "ok", proxy: agent.proxyOptions.host });
                    })
                    .catch((e) => {
                      reject({
                        status: "error",
                        proxy: agent.proxyOptions.host,
                      });
                    });
                }
              )
              .catch((e: any) => {
                console.log("catch");
                addDB(productBinance, productDetail, agent, header);
                reject({ status: "error", proxy: agent.proxyOptions.host });
              });
          } else {
            addDB(productBinance, null, agent, header)
              .then(() => {
                resolve({ status: "ok", proxy: agent.proxyOptions.host });
              })
              .catch((e) => {
                reject({ status: "error", proxy: agent.proxyOptions.host });
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
              reject([e?.code, agent?.proxyOptions.host]);
            }
          );
        } else {
          reject([e?.code || e, agent?.proxyOptions.host]);
        }
      });
  });
}

function mysteryBoxProductDetail<
  T extends productBinanceMystery
>(productBinance: T, agent: any, header: any): Promise<resolve> {
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
      .then(async <T extends resData<MysteryBox>>(res:AxiosResponse<T>) => {
        let productDetail: MysteryBox = res.data.data;
        console.log('Response');
        
        

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
            .then( <T extends resData<historyRecord>>(
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
                  resolve({ status: "ok", proxy: agent.proxyOptions.host });
                })
                .catch((e) => {
                  // productBinance = null;
                  reject({ status: "error", proxy: agent.proxyOptions.host });
                });
            })
            .catch((e: Error) => {
              // console.log(e);
              // console.log(header);
              console.log("catch");
              // process.exit(1)
              addDB(productBinance, productDetail, agent, header);
              reject({ status: "error", proxy: agent.proxyOptions.host });
            });
        } else {
          marketProductDetail(productBinance, agent, header)
          .then((res: resolve) => resolve({ status: "ok", proxy: agent.proxyOptions.host }))
          .catch((e) => reject({ status: "error", proxy: agent.proxyOptions.host }));
          // addDB(productBinance, null, agent, header)
          //   .then(() => {
          //     // productBinance = null;
          //     resolve({ status: "ok", proxy: agent.proxyOptions.host });
          //   })
          //   .catch((e) => {
          //     // productBinance = null;
          //     reject({ status: "error", proxy: agent.proxyOptions.host });
          //   });
        }
      })
      .catch((e: any) => {
        console.log(agent.proxyOptions);
        
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
              reject([e?.code, agent?.proxyOptions.host]);
            }
          );
        } else {
          reject([e?.code || e, agent?.proxyOptions.host]);
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
    
    console.log('getProductDetail ' + productBinance.nftType);
    if (!productBinance?.nftType) {
      console.log('====\n');
      
      console.log(productBinance);
      console.log('====\n');

      process.exit(0)
      

    }
    // productBinance.nftType = 1;
    
  
    if (productBinance.hasOwnProperty('owner') && productBinance.hasOwnProperty('approve')) {
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
>(productBinance: T | null, responseProductDetail: P | null = null, agent: any, header: any): Promise<void> {
  return new Promise((resolve, reject) => {
    if (responseProductDetail != null) {
      const newProduct: (productBinanceAll) & (productDetailAll | MysteryBox) = Object.assign({}, productBinance, responseProductDetail);
      

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
      // productBinance = null;
      // if (productBinance.nftType == 1) {
      //   productBinance.nftType = 2
      // } else {
      //   productBinance.nftType = 1

      // }
      console.log('!-!');
      resolve();


      // getProductDetail(productBinance as productBinanceAll, agent, header).then(()=> {
      //   console.log('!');
        
      // resolve();


      // }).catch(e=> {
      //   resolve()
      // })
      console.log('else get_productDetali');
      console.log(productBinance);
      
      // process.exit(0)
    }
  });
}

// module.exports = { getProductDetail };

export {getProductDetail}
