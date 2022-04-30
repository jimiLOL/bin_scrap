
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const { getAddressModel } = require("../model/nft_detalii.cjs");


const ShemaNftPokemon = new Schema({
  _id: mongoose.Types.ObjectId,
  marketpalce: String,
  buyers: Array,
  buyTimes: Array,
  chainId: {
    type: String,
    default: "56"
  },
  sellId: Number,
  collectionAddress: {
    type: String,
    required: true
  },
  collectionName: {
    type: String
  },
  tokenId: {
    type: String || null,
    required: true
  },
  amount: Number,
  soldAmount: Number,
  seller: String,
  price: Number,
  token: {
    type: String,
    default: '0x0000000000000000000000000000000000000000'
  },
  isActive: Boolean,
  sellTime: Date,
  image: String,
  video: String,
  name: String,
  description: String,
  tokenURI: String,
  thumb: String,
  attributes: Array,
  extraMetadata: Array,
  otherSellOrders: Array

})




 

async function addDB(element, attributes, marketpalce, extraMetadata, collectionAddress) {
  return new Promise((resolve, reject) => {
    // if (collectionAddress == '0xc33d69a337b796a9f0f7588169cd874c3987bde9') {
    //   collectionAddress = 'nfts'


    // }
    let NftPokemon = require("../model/nft_detalii.cjs")(collectionAddress, marketpalce);




    const newNftPokemon = new NftPokemon({
      marketpalce: marketpalce,
      buyers: element?.buyers || [],
      buyTimes: element?.buyTimes || [],
      chainId: element?.chainId,
      contractName: element?.contractName,
      sellId: element?.sellId || null,
      collectionAddress:
        element?.collectionAddress || collectionAddress,
      collectionName: element?.collectionName,
      tokenId: element?.tokenId || element?.tokenID,
      amount: element?.amount,
      soldAmount: element?.soldAmount,
      seller: element?.seller || null,
      price: element?.price,
      isActive: element?.isActive,
      sellTime: element?.sellTime,
      image: element?.image,
      video: element?.video,
      name: element?.name,
      attributes: element?.attributes || attributes,
      description: element?.description,
      tokenURI: element?.tokenURI,
      thumb: element?.thumb,
      extraMetadata: element?.extraMetadata || extraMetadata,
      otherSellOrders: element?.otherSellOrders || [],
      assetData: element?.assetData,
      last_sell: element?.last_sell,
      last_sell_at: element?.last_sell_at
    });

    // if (collectionAddress != '0xc33d69a337b796a9f0f7588169cd874c3987bde9') {
    //  console.log(newNftPokemon);


    // }

    let tid = element?.tokenId || element?.tokenID
    NftPokemon.findOneAndUpdate(
      { tokenId: tid },
      newNftPokemon,
      (err, call) => {
        if (err) {
          console.log(err);
          reject("Произошла ошибка при обновлении данных");

        }
        if (!call) {
          console.log('Начали сохранять');



          const newNFT = new NftPokemon({
            _id: new mongoose.Types.ObjectId(),
            marketpalce: marketpalce,
            buyers: element?.buyers || [],
            buyTimes: element?.buyTimes || [],
            chainId: element?.chainId,
            contractName: element?.contractName,
            sellId: element?.sellId || null,
            collectionAddress:
              element?.collectionAddress || collectionAddress,
            collectionName: element?.collectionName,
            tokenId: element?.tokenId || element?.tokenID,
            amount: element?.amount,
            soldAmount: element?.soldAmount,
            seller: element?.seller || null,
            price: element?.price,
            isActive: element?.isActive,
            sellTime: element?.sellTime,
            image: element?.image,
            video: element?.video,
            name: element?.name,
            attributes: element?.attributes || attributes,
            description: element?.description,
            tokenURI: element?.tokenURI,
            thumb: element?.thumb,
            extraMetadata: element?.extraMetadata || extraMetadata,
            otherSellOrders: element?.otherSellOrders || [],
            assetData: element?.assetData
          });

          newNFT.save((err, calback) => {
            if (err) {
              console.log(err);
              reject('Ошибка добавления контракта')
            };

            if (calback) {

              return resolve('Добавили новый контракт в базу^ ' + collectionAddress);
            } else {
              return reject('Не смогли добавить контракт^ ' + collectionAddress);

            }
          })
        } else {
          console.log('Начали обнолять');

          return resolve('Обновили данные в базе для контракта ' + collectionAddress);

        }


      }
    );

  })

}


async function updatePriceDB(tokenId, price, marketpalce, collectionAddress) {
  // if (collectionAddress == '0xc33d69a337b796a9f0f7588169cd874c3987bde9') {
  //   collectionAddress = 'nfts'
  // }
  let NftPokemon = require("../model/nft_detalii.cjs")(collectionAddress, marketpalce);
  NftPokemon.findOneAndUpdate(
    { tokenId: tokenId },
    { $set: { price: price, marketpalce: marketpalce } },
    (err, call) => {
      if (err) {
        console.log("Произошла ошибка при обновлении price");
        console.log(err);
      }
      if (call) {
        console.log("Произвели обновление price");
      }


    }
  );
}


async function add_binance_db(ele, marketpalce) {

  return new Promise(async (resolve, reject) => {
    const NFT = await getAddressModel(ele.nftInfo.contractAddress, marketpalce);

    const newNFT = new NFT({
      marketpalce: marketpalce,
      buyers: ele?.records || [],
      collection_nft: ele.productDetail.collection || ele.collection,
      collectionAddress: ele.nftInfo.contractAddress, // будет участвовать в навигации 
      collectionName: ele.collection?.collectionName || null,  
      tokenId: ele.nftInfo.tokenId, // соответственно тоже участвует в навгации
      amount: ele.amount,
      isActive: ele.status == 1 ? true : false,
      description: ele.productDetail.description,
      productId: ele.productId,
      title: ele.title,
      coverUrl: ele.coverUrl,
      tradeType: ele.tradeType,
      nftType: ele.nftType,
      currency: ele.currency,
      setStartTime: ele.setStartTime,
      setEndTime: ele.setEndTime,
      timestamp: ele.timestamp,
      status: ele.status,
      owner: ele.owner,
      creator: ele.creator,
      nftInfo: ele.nftInfo,
      mysteryBoxProductDetailVo: ele.mysteryBoxProductDetailVo,
      productDetail: ele.productDetail,
  
    })
  
    NFT.findOneAndUpdate({ productId: ele.productId }, newNFT, (err, call) => {
      if (err) {
        console.log('Не удалось обновить данные ' + ele.productId + ' для биржи ' + marketpalce);
        console.log(err);
        reject()
      };
      if (call) {
        // console.log('Обновили данные ' + ele.productId + ' для биржи ' + marketpalce);
        resolve()
  
      } else {
        const binNFT = new NFT({
          _id: new mongoose.Types.ObjectId(),
          marketpalce: marketpalce,
          buyers: ele?.records || [],
          collection_nft: ele.collection,
          collectionAddress: ele.nftInfo.contractAddress, // будет участвовать в навигации 
          collectionName: ele.collection?.collectionName || null,  
          tokenId: ele.nftInfo.tokenId, // соответственно тоже участвует в навгации
          amount: ele.amount,
          isActive: ele.status == 1 ? true : false,
          description: ele.productDetail.description,
          productId: ele.productId,
          title: ele.title,
          coverUrl: ele.coverUrl,
          tradeType: ele.tradeType,
          nftType: ele.nftType,
          currency: ele.currency,
          setStartTime: ele.setStartTime,
          setEndTime: ele.setEndTime,
          timestamp: ele.timestamp,
          status: ele.status,
          owner: ele.owner,
          creator: ele.creator,
          nftInfo: ele.nftInfo,
          mysteryBoxProductDetailVo: ele.mysteryBoxProductDetailVo,
          productDetail: ele.productDetail,
      
        });
        binNFT.save((err, callback) => {
          if (err) {
            console.log('Не удалось сохранить данные');
            console.log(err);
            reject()
            // process.exit(1)
          };
          if (callback) {
            // console.log('Сохранили данные');
            // console.log(binNFT);
            // process.exit(0)
            resolve()
          } else {
            reject()
          }
        })
      }
    })
  })



}
module.exports = { addDB, updatePriceDB, add_binance_db }  