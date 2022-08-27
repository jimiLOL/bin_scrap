
import mongoose from 'mongoose';

// const Schema = mongoose.Schema;
const {getAddressModel} = require("../model/nft_detalii")
// import { getAddressModel } from "../model/nft_detalii";
// import coverModelBinance from "../model/nft_cover_binance.js";

import {productBinanceAll, orderSuccessAnnounces, productDetailAll, MysteryBox, collection} from "./../controller/binance/get_productDetali";


 
 
 

async function add_binance_db<T extends (productBinanceAll | orderSuccessAnnounces) & (productDetailAll | MysteryBox)>(ele: T, marketpalce: string) {
  const contractAddress = (e: productDetailAll | MysteryBox): string => {
    if (e.hasOwnProperty('productDetail')) {
     return (e as productDetailAll).nftInfo.contractAddress

    } else {
     return (e as MysteryBox).nftInfoDetailMgsVo.contractAddress


    }
  }

  return new Promise(async (resolve, reject) => {
    const NFT = await getAddressModel(contractAddress(ele), marketpalce);

    let newNFT;

    if (ele.hasOwnProperty('productDetail')) {
      newNFT = new NFT({
        marketpalce: marketpalce,
        buyers: ele?.records || [],
        collection_nft: (ele as productDetailAll).productDetail.collection,
        collectionAddress: (ele as productDetailAll).nftInfo.contractAddress, // будет участвовать в навигации 
        collectionName: (ele as productDetailAll).productDetail.collection?.collectionName || null,
        tokenId: (ele as productDetailAll).nftInfo.tokenId, // соответственно тоже участвует в навгации
        amount: (ele as productDetailAll).productDetail.amount,
        isActive: (ele as productDetailAll).productDetail.status == 1 ? true : false,
        description: (ele as productDetailAll).productDetail.description,
        productId: (ele as productDetailAll).productDetail.id,
        title: (ele as productDetailAll).productDetail.title,
        coverUrl: (ele as productDetailAll).productDetail.coverUrl,
        tradeType: (ele as productDetailAll).productDetail.tradeType,
        nftType: (ele as productDetailAll).productDetail.nftType,
        currency: (ele as productDetailAll).productDetail.currency,
        setStartTime: (ele as productDetailAll).productDetail.setStartTime,
        setEndTime: (ele as productDetailAll).productDetail.setEndTime,
        timestamp: (ele as productDetailAll).timestamp,
        status: (ele as productDetailAll).productDetail.status,
        owner: (ele as productDetailAll).nftInfo.owner,
        creator: (ele as productDetailAll).nftInfo.creator,
        nftInfo: (ele as productDetailAll).nftInfo,
        mysteryBoxProductDetailVo: (ele as productDetailAll).mysteryBoxProductDetailVo,
        productDetail: (ele as productDetailAll).productDetail,
  
      })
    } else {
      const collection_nft: collection = {
        collectionName: (ele as MysteryBox).nftInfoDetailMgsVo.serialsName,
        avatarUrl: (ele as MysteryBox).nftInfoDetailMgsVo.avatarUrl,
        canView: false,
        collectionId: (ele as MysteryBox).nftInfoDetailMgsVo.collectionId,
        verified: (ele as MysteryBox).nftInfoDetailMgsVo.verified,

      }
      newNFT = new NFT({
        marketpalce: marketpalce,
        buyers: ele?.records || [],
        collection_nft: collection_nft,
        collectionAddress: (ele as MysteryBox).nftInfoDetailMgsVo.contractAddress, // будет участвовать в навигации 
        collectionName: collection_nft.collectionName,
        tokenId: (ele as MysteryBox).nftInfoDetailMgsVo.tokenId, // соответственно тоже участвует в навгации
        amount: (ele as MysteryBox).productDetailMgsVo.amount,
        isActive: (ele as MysteryBox).productDetailMgsVo.status == 1 ? true : false,
        description: (ele as MysteryBox).productDetailMgsVo.description,
        productId: (ele as MysteryBox).productDetailMgsVo.id,
        title: (ele as MysteryBox).productDetailMgsVo.title,
        coverUrl: (ele as MysteryBox).productDetailMgsVo.coverUrl,
        tradeType: (ele as MysteryBox).productDetailMgsVo.tradeType,
        nftType: (ele as MysteryBox).productDetailMgsVo.nftType,
        currency: (ele as MysteryBox).productDetailMgsVo.currency,
        setStartTime: (ele as MysteryBox).productDetailMgsVo.setStartTime,
        setEndTime: (ele as MysteryBox).productDetailMgsVo.setEndTime,
        timestamp: (ele as MysteryBox).timestamp,
        status: (ele as MysteryBox).productDetailMgsVo.status,
        owner: (ele as MysteryBox).nftInfoDetailMgsVo.owner,
        creator: (ele as MysteryBox).nftInfoDetailMgsVo.creator,
        nftInfo: (ele as MysteryBox).productDetailMgsVo,
        mysteryBoxProductDetailVo: (ele as MysteryBox).nftInfoDetailMgsVo,
        productDetail: (ele as MysteryBox).productDetailMgsVo,

      })

    }


   console.log('eee');
   

    NFT.findOneAndUpdate({ productId: newNFT.productId }, newNFT, (err: any, call: any): any => {
      if (err) {
        console.log('Не удалось обновить данные ' + ele.productId + ' для биржи ' + marketpalce);
        console.log(err);
        call = 0;
        (ele as any) = null;

        reject()
      };
      if (call) {
        (ele as any) = null;

        // console.log('Обновили данные ' + call.productId + ' status ' + call.status);
        call = 0;

        resolve(call)

      } else {
        let binNFT;
        if (ele.hasOwnProperty('productDetail')) {
          binNFT = new NFT({
            _id: new mongoose.Types.ObjectId(),
            marketpalce: marketpalce,
            buyers: ele?.records || [],
            collection_nft: (ele as productDetailAll).productDetail.collection,
            collectionAddress: (ele as productDetailAll).nftInfo.contractAddress, // будет участвовать в навигации 
            collectionName: (ele as productDetailAll).productDetail.collection?.collectionName || null,
            tokenId: (ele as productDetailAll).nftInfo.tokenId, // соответственно тоже участвует в навгации
            amount: (ele as productDetailAll).productDetail.amount,
            isActive: (ele as productDetailAll).productDetail.status == 1 ? true : false,
            description: (ele as productDetailAll).productDetail.description,
            productId: (ele as productDetailAll).productDetail.id,
            title: (ele as productDetailAll).productDetail.title,
            coverUrl: (ele as productDetailAll).productDetail.coverUrl,
            tradeType: (ele as productDetailAll).productDetail.tradeType,
            nftType: (ele as productDetailAll).productDetail.nftType,
            currency: (ele as productDetailAll).productDetail.currency,
            setStartTime: (ele as productDetailAll).productDetail.setStartTime,
            setEndTime: (ele as productDetailAll).productDetail.setEndTime,
            timestamp: (ele as productDetailAll).timestamp,
            status: (ele as productDetailAll).productDetail.status,
            owner: (ele as productDetailAll).nftInfo.owner,
            creator: (ele as productDetailAll).nftInfo.creator,
            nftInfo: (ele as productDetailAll).nftInfo,
            mysteryBoxProductDetailVo: (ele as productDetailAll).mysteryBoxProductDetailVo,
            productDetail: (ele as productDetailAll).productDetail,
      
          })
        } else {
          const collection_nft: collection = {
            collectionName: (ele as MysteryBox).nftInfoDetailMgsVo.serialsName,
            avatarUrl: (ele as MysteryBox).nftInfoDetailMgsVo.avatarUrl,
            canView: false,
            collectionId: (ele as MysteryBox).nftInfoDetailMgsVo.collectionId,
            verified: (ele as MysteryBox).nftInfoDetailMgsVo.verified,
    
          }
          binNFT = new NFT({
            _id: new mongoose.Types.ObjectId(),
            marketpalce: marketpalce,
            buyers: ele?.records || [],
            collection_nft: collection_nft,
            collectionAddress: (ele as MysteryBox).nftInfoDetailMgsVo.contractAddress, // будет участвовать в навигации 
            collectionName: collection_nft.collectionName,
            tokenId: (ele as MysteryBox).nftInfoDetailMgsVo.tokenId, // соответственно тоже участвует в навгации
            amount: (ele as MysteryBox).productDetailMgsVo.amount,
            isActive: (ele as MysteryBox).productDetailMgsVo.status == 1 ? true : false,
            description: (ele as MysteryBox).productDetailMgsVo.description,
            productId: (ele as MysteryBox).productDetailMgsVo.id,
            title: (ele as MysteryBox).productDetailMgsVo.title,
            coverUrl: (ele as MysteryBox).productDetailMgsVo.coverUrl,
            tradeType: (ele as MysteryBox).productDetailMgsVo.tradeType,
            nftType: (ele as MysteryBox).productDetailMgsVo.nftType,
            currency: (ele as MysteryBox).productDetailMgsVo.currency,
            setStartTime: (ele as MysteryBox).productDetailMgsVo.setStartTime,
            setEndTime: (ele as MysteryBox).productDetailMgsVo.setEndTime,
            timestamp: (ele as MysteryBox).timestamp,
            status: (ele as MysteryBox).productDetailMgsVo.status,
            owner: (ele as MysteryBox).nftInfoDetailMgsVo.owner,
            creator: (ele as MysteryBox).nftInfoDetailMgsVo.creator,
            nftInfo: (ele as MysteryBox).productDetailMgsVo,
            mysteryBoxProductDetailVo: (ele as MysteryBox).nftInfoDetailMgsVo,
            productDetail: (ele as MysteryBox).productDetailMgsVo,
    
          })
    
        }
    
        binNFT.save((err: any, callback: any): any => {
          if (err) {
            console.log('Не удалось сохранить данные');
            console.log(err);
            (ele as any) = null;

            reject()
            // process.exit(1)
          };
          if (callback) {
            // console.log('Сохранили данные');
            // console.log(binNFT);
            (ele as any) = null;

            resolve(0)
          } else {
            (ele as any) = null;

            reject()
          }
        });

      }
    })
  })



}

// function addDBCoverBinance(ele) {
//   coverModelBinance.find({ collectionId: ele.collectionId }).then(call => {
//     if (call) {
//       const newCoverModelBinance = new coverModelBinance({
//         collectionId: ele.collectionId,
//         floorPrice: ele.floorPrice,
//         dailyTradePrice: ele.dailyTradePrice,
//         lastTransaction: ele.lastTransaction,
//         totalAsset: ele.totalAsset

//       });
//       coverModelBinance.findOneAndUpdate({ collectionId: ele.collectionId }, newCoverModelBinance, (err, callback) => {
//         if (err) {
//           console.log('Ошибка обновления Cover');
//           console.log(err);
//         }
//         if (callback) {
//           console.log('Обновили Cover');
//         }
//       })


//     } else {
//       const newCoverModelBinance = new coverModelBinance({
//         _id: new mongoose.Types.ObjectId(),
//         collectionId: ele.collectionId,
//         floorPrice: ele.floorPrice,
//         dailyTradePrice: ele.dailyTradePrice,
//         lastTransaction: ele.lastTransaction,
//         totalAsset: ele.totalAsset

//       });
//       newCoverModelBinance.save((err, callback) => {
//         if (err) {
//           console.log('Ошибка сохранения Cover');
//           console.log(err);
//         }
//         if (callback) {
//           console.log(' Сохранили Cover');
//         }
//       })
//     }

//   }).catch(e => {
//     console.log('Ошибка поиска Cover Binance');
//     console.log(e);
//   })

// }
// module.exports = { add_binance_db }  
export { add_binance_db }