// const NftPokemon = require("../model/navigationbot");


const mongoose = require('mongoose');
const Schema = mongoose.Schema;


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
    if (collectionAddress == '0xc33d69a337b796a9f0f7588169cd874c3987bde9') {
      collectionAddress = 'nfts'
  
     
    }
    let NftPokemon = require("../model/navigationbot")(collectionAddress);
   
  
  
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
           
            return resolve('Обновили данные в базе для контракта ' + collectionAddress);

          }
           
         
        }
      );

  })
  
  }
  

  async function updatePriceDB(tokenId, price, marketpalce, collectionAddress) {
    if (collectionAddress == '0xc33d69a337b796a9f0f7588169cd874c3987bde9') {
      collectionAddress = 'nfts'
    }
    let NftPokemon = require("../model/navigationbot")(collectionAddress);
    NftPokemon.findOneAndUpdate(
      { tokenId: tokenId },
      {$set: {price: price, marketpalce: marketpalce}},
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
module.exports = {addDB, updatePriceDB}  