const NftPokemon = require("../model/navigationbot");
// const mongoose = require("mongoose");
// mongoose.connect(process.env.MONGODB_URI).catch((error) => console.log(error));

async function addDB(element, attributes, marketpalce, extraMetadata) {
    const newNftPokemon = new NftPokemon({
      marketpalce: marketpalce,
      buyers: element?.buyers || [],
      buyTimes: element?.buyTimes || [],
      chainId: element?.chainId,
      contractName: element?.contractName,
      sellId: element?.sellId || null,
      collectionAddress:
        element?.collectionAddress ||
        "0xc33d69a337b796a9f0f7588169cd874c3987bde9",
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
      attributes: attributes,
      description: element?.description,
      tokenURI: element?.tokenURI,
      thumb: element?.thumb,
      extraMetadata: element?.extraMetadata || extraMetadata,
      otherSellOrders: element?.otherSellOrders || [],
    });
    // console.log(newNftPokemon);
    let tid = element?.tokenId || element?.tokenID
    NftPokemon.findOneAndUpdate(
      { tokenId: tid },
      newNftPokemon,
      (err, call) => {
        if (err) {
          console.log("Произошла ошибка при обновлении данных");
          console.log(err);
        }
        if (call) {
          console.log("Произвели обновление данных");
        }
         
       
      }
    );
  }
  

  async function updatePriceDB(tokenId, price) {
    NftPokemon.findOneAndUpdate(
      { tokenId: tokenId },
      {$set: {price: price}},
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