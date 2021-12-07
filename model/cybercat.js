const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ShemaCybercat = new Schema({
    id: {
        type: Number,
        required: true
    },
    image: String,
    battleClass: String,
    name: String,
    genes: String,
    owner: String,
    birthDate: Date,
    bodyShape: String,
    sireId: Number,
    matronId: Number,
    stage: Number,
    title: String,
    breedCount: Number,
    figure: Object,
    parts: Array,
    children: Array,
    parent: Array,
    hp: Number,
    morale: Number,
    skill: Number,
    speed: Number,
    eyesId: String,
    earsId: String,
    hornId: String,
    backId: String,
    tailId: String,
    mouthId: String,
    currentPrice: String,
    suggestedPrice: String,
    mystic: Number

})


const Cybercat = mongoose.model('Cybercat', ShemaCybercat);
module.exports = Cybercat;


