const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const NavigationbotShema = new Schema({
    _id: mongoose.Types.ObjectId,
    id_step: {
        type: Number
    },
    id_gen: Number
})





const Navigationbot = mongoose.model('Navigationbot', NavigationbotShema);
module.exports = Navigationbot;

